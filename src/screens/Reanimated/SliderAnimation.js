import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    interpolateColor,
    useAnimatedProps,
    useSharedValue,
    withSpring,
  } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import CircularProgress from '../../components/CircularProgress';

const HANDLE_WIDTH = 20;

/**
 * Custom slider control that uses gesture handlers
*/
const SliderAnimation = () => {
    //shared values
    const sliderWidth = useSharedValue(0);
    const progress = useSharedValue(0);

    /**
     * Animated style for handle, translated based on progress.
     */
    const panGestureHandler = useAnimatedGestureHandler ({
        // On start, make note of the progress value at start of gesture.
        onStart: (_, ctx) => {
            ctx.startProgress = progress.value;
        },
        // On pan, new progress is the starting progress plus change in position
        onActive: (event, ctx) => {
            progress.value = ctx.startProgress + event.translationX;
        },
        // On pan-end, snap back to 0 or sliderWidth if out of bounds.
        onEnd: () => {
            if(progress.value > sliderWidth.value) {
                progress.value = withSpring(sliderWidth.value);
            } else if(progress.value < 0) {
                progress.value = withSpring(0);
            }
        },
    });

    const animatedHandleStyle = useAnimatedStyle(()=>{
        return {
            width: HANDLE_WIDTH,
            backgroundColor: Colors.HINT_COLOR,
            borderRadius: 10,
            position: "absolute",
            top: -20,
            bottom: -20,
            transform: [{ translateX: progress.value - HANDLE_WIDTH / 2}],
        };
    });

    return (
        <View
            style={{flex:1, margin: 20}}
        >
            <View
                style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}
            >
                <CircularProgress 
                    progress = {progress}
                    sliderWidth = {sliderWidth}
                    radius = {50}
                    strokeWidth = {10}
                />
            </View>
            <View
                style={{
                    flex:1,
                    backgroundColor: Colors.LIGHT_BORDER,
                    justifyContent: 'flex-end',
                    borderRadius: 20,
                }}
                onLayout={(e) => {
                    sliderWidth.value = e.nativeEvent.layout.width;
                }}
            >
                <PanGestureHandler onGestureEvent={panGestureHandler}>
                    <Animated.View
                        style={[
                            animatedHandleStyle,
                        ]}
                    />
                </PanGestureHandler>
            </View>
        </View>
    )
}

export default SliderAnimation;