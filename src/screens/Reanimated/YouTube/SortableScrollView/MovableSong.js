import React, { useState } from 'react';
import {
  Platform,
  useWindowDimensions,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { clamp } from 'react-native-redash';
import Song from './Song';
import {SONG_HEIGHT, SCROLL_HEIGHT_THRESHOLD} from './constants';

const MovableSong = ({id, artist, cover, title, positions, songsCount ,scrollY}) => {
    const dimension = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [moving, setMoving] = useState(false);
    const top = useSharedValue(positions.value[id] * SONG_HEIGHT)

    //for moving relative elements
    useAnimatedReaction(
        () => positions.value[id],
        (currentPosition, previousPosition) => {
            //Do Something
            if(currentPosition !== previousPosition) {
                if(!moving) {
                    top.value = withSpring(currentPosition * SONG_HEIGHT);
                }
            }
        },[moving],
    );

    function objectMove(object, from, to) {
        'worklet';
        const newObject = Object.assign({}, object);
        for (const id in object) {
            if (object[id] === from) {
                newObject[id] = to;
            }
            if (object[id] === to) {
                newObject[id] = from;
            }
        }
        return newObject;
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart() {
            runOnJS(setMoving)(true);
            //give haptic feedback when selecting element
            if(Platform.OS==="ios") {
                runOnJS(Haptics.impactAsync)(
                    Haptics.ImpactFeedbackStyle.Medium
                );
            }
        },
        onActive(event) {
            const positionY = event.absoluteY + scrollY.value;

            //to handle ut of bounds scrolling
            if(positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
                //scroll back up
                scrollY.value = withTiming(0, {duration: 1500});
            } else if(positionY >= scrollY.value + dimension.height - SCROLL_HEIGHT_THRESHOLD) {
                //scroll down to end of list
                const contentHeight = songsCount * SONG_HEIGHT;
                const containerHeight = dimension.height - insets.top - insets.bottom; // used because we have safeareaview which impacts the size and scroll of scrollview
                const maxScroll = contentHeight - containerHeight;
                scrollY.value = withTiming(maxScroll, {duration: 500}); //note: in case of large list 1500 milliseconds is too small of a time, calculate duration using element height and elements currently hidden to get optimum results
            } else {
                //cancel scroll animation
                cancelAnimation(scrollY);
            }

            //to simulate touch event and put image above finger when selected by touch event.
            top.value = withTiming(positionY - SONG_HEIGHT, {duration: 16})

            //to move the elements relative to the element chosen and in focus 
            const newPosition = clamp(
                Math.floor(positionY / SONG_HEIGHT),
                0,
                songsCount - 1
            );
            //when scrolling past elements in list
            if(newPosition !== positions.value[id]){
                positions.value = objectMove(
                    positions.value,
                    positions.value[id],
                    newPosition,
                );
                if(Platform.OS==="ios") {
                    runOnJS(Haptics.impactAsync)(
                        Haptics.ImpactFeedbackStyle.Medium
                    );
                }
            }
        },
        onFinish() {
            top.value = positions.value[id] * SONG_HEIGHT;
            runOnJS(setMoving)(false);
        },
    });

    const animatedStyle = useAnimatedStyle(()=> {
        return {
            position: 'absolute',
            left: 0,
            right: 0,
            top: top.value,
            zIndex: moving ? 1 : 0,
            shadowColor: 'black',
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowOpacity: withSpring(moving ? 0.2 : 0),
            shadowRadius: 10,
        }
    }, [moving])

    return (
        <Animated.View
            style={animatedStyle}
        >
            <BlurView intensity={moving ? 100 : 0} tint='light'>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={{maxWidth: '80%'}}>
                        <Song artist={artist} cover={cover} title={title} />
                    </Animated.View>
                </PanGestureHandler>
            </BlurView>
        </Animated.View>
    )
}

export default MovableSong;