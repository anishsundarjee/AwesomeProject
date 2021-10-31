
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withTiming,
    withSpring
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const BottomSheet = ({panY}) => {
    const { height } = useWindowDimensions();

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startY = panY.value;
        },
        onActive(event, context) {
            panY.value = context.startY + event.translationY;
        },
        onEnd() {
            //snap to point bottom sheet
            if (panY.value < -height * 0.3) {
                panY.value = withSpring(-(height * 0.6));
            } else {
                panY.value = withTiming(0);
            }
        },
    },[height]);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                {
                    translateY: interpolate(panY.value, [-1, 0], [-1, 0], { //to control scroll limits for top and bottom with bottom sheet
                        extrapolateLeft: Extrapolate.EXTEND, //Allows the bottom sheet to be extendable to the top
                        extrapolateRight: Extrapolate.CLAMP //prevents bottom sheet scrolling below bottom limit 
                    }),
                }
            ]
        }
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.container, {top: height * 0.9}, animatedStyle]}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Maison Paul Bocuse</Text>
                        <View style={styles.fakeContent}/>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </PanGestureHandler>
    );
}

export default BottomSheet;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            height: -6,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    wrapper: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontWeight: '400',
        fontSize: 22,
    },
    fakeContent: {
        flex: 1,
        height: 1000,
    },
});
