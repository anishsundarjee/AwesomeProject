import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle
} from 'react-native-reanimated';

const Overlay = ({panY}) => {
    const {height} = useWindowDimensions();
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                panY.value, //value of pan
                [0, -height], //input range is from 0 to height. note : - height means scroll up
                [0, 1], //output range : opacity
                Extrapolate.CLAMP
            ),
        };
    });

    return (
        <Animated.View 
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, styles.container, animatedStyle]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
})

export default Overlay;
