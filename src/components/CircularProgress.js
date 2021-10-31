import React from "react";
import Animated, {
    interpolate,
    interpolateColor, 
    useAnimatedProps,
} from "react-native-reanimated";
import { Circle, G, Svg } from "react-native-svg";
import { StyleSheet, TextInput, View } from "react-native";
import {clamp} from './clamp';
import Colors from "../constants/Colors";

/**
 * Make TextInput animatable!.
 * TextInput is not animatable by default.
 */
const AnimatedInput = Animated.createAnimatedComponent(TextInput);
/**
 * Make SVG Circle animatable.
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({progress, sliderWidth, radius, strokeWidth}) => {
    // Derived values
    const CIRCUMFERENCE = 2 * Math.PI * radius;
    const HALF_WIDTH = radius + strokeWidth;
    /**
     * Animated input props
     */
    const animatedInputProps = useAnimatedProps (() => {
        // Determine the percent complete.
        const percentComplete = clamp(progress.value / sliderWidth.value, 0, 1);
        return {
            // The text value
            text: `${Math.round(100 * percentComplete)}`,
            // The color of the text.
            color: interpolateColor (
                percentComplete,
                [0, 0.5, 1],
                [Colors.BLACK, Colors.HINT_COLOR, Colors.WHITE]
            ),
        };
    });

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
            <View style={{ width: radius * 2, height: radius * 2 }}>
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
                <AnimatedInput 
                    editable={false}
                    defaultValue="0"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            fontSize: radius / 2,
                            fontWeight: "500",
                            textAlign: "center",
                            textShadowColor: "black",
                            textShadowOffset: { width: 2, height: 2 },
                            textShadowRadius: 4,
                        }
                    ]}
                    animatedProps={animatedInputProps}
                />
            </View>
        </View>
    )
}

export default CircularProgress;