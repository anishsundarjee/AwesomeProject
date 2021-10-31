import React from "react";
import Animated, {
    interpolate,
    interpolateColor, 
    useAnimatedProps,
} from "react-native-reanimated";
import { Circle, G, Svg } from "react-native-svg";
import { View } from "react-native";
import {clamp} from './clamp';
import Colors from "../constants/Colors";

/**
 * Make SVG Circle animatable.
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({progress, sliderWidth, radius, strokeWidth}) => {
    // Derived values
    const CIRCUMFERENCE = 2 * Math.PI * radius;
    const HALF_WIDTH = radius + strokeWidth;

    /**
     * Animated progress props. Animate strokeDashOffset to handle animation
     */
    const animatedProgressProps = useAnimatedProps (() => {
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        return {
            strokeDashoffset: (1 - percentComplete) * CIRCUMFERENCE,
        };
    })

    /**
     * Animated BG props. Animate color/opacity.
    */
    const animatedBgProps = useAnimatedProps(() => {
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        return {
            fillOpacity: interpolate(percentComplete, [0, 1], [0.2, 0.75]),
        };
    });
    

    return (
        <View>
                <Svg
                    width={radius * 2}
                    height={radius * 2}
                    viewBox={`${-HALF_WIDTH} ${-HALF_WIDTH} ${2 * HALF_WIDTH} ${
                        2 * HALF_WIDTH
                    }`}
                >
                    <G rotation="-90">
                        {/* Progress */}
                        <AnimatedCircle
                            cx={0}
                            cy={0}
                            r={radius}
                            fill= {Colors.TRANSPARENT}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={CIRCUMFERENCE}
                            animatedProps={animatedProgressProps}
                            stroke={Colors.HINT_COLOR}
                        />
                        {/* Background */}
                        <AnimatedCircle
                            cx={0}
                            cy={0}
                            r={radius}
                            stroke={Colors.ACCENT_COLOR}
                            strokeWidth={2}
                            strokeLinejoin="round"
                            strokeOpacity="0.1"
                            animatedProps={animatedBgProps}
                            fill={Colors.ACCENT_COLOR}
                        />
                    </G>
                </Svg>
        </View>
    )
}

export default CircularProgress;