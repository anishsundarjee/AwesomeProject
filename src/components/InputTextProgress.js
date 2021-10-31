import React from "react";
import Animated, {
    interpolateColor, 
    useAnimatedProps,
} from "react-native-reanimated";
import { StyleSheet, TextInput, View } from "react-native";
import {clamp} from './clamp';
import Colors from "../constants/Colors";

/**
 * Make TextInput animatable!.
 * TextInput is not animatable by default.
 */
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const TextInputProgress = ({progress, sliderWidth, radius}) => {
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

    return (
        <View>
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
    )
}

export default TextInputProgress;