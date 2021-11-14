import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withTiming,
    interpolateColor,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const AnimateColor = ({navigation}) => {
    const panY = useSharedValue(0);
    const panX = useSharedValue(0);

    const panGestureHandler = useAnimatedGestureHandler({
        onStart (_, context) {
            context.startY = panY.value;
            context.starX = panX.value;
        }, 
        onActive(event, context) {
            panY.value = event.translationY;
            panX.value = event.translationX;
        },
        onEnd() {
            panY.value = withSpring(0);
            panX.value = withSpring(0);
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: panX.value},
                {translateY: panY.value},
            ],
        };
    });

    const backgroundColorInterpolateStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                panY.value, 
                [-100, 0, 100], 
                ['blue', 'red', 'green'],
                'RGB'
            ),
        };
    });

    return (
        <Animated.View style={[StyleSheet.absoluteFill, styles.container, backgroundColorInterpolateStyle]}>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
                <Animated.View style={[styles.viewStyle, animatedStyle]} />
            </PanGestureHandler>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center',
    },
    viewStyle: {
        height:100,
        width: 100, 
        backgroundColor: '#1D3540',
        borderRadius: 50,
    },
})



export default AnimateColor;
