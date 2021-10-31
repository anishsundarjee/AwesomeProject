import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";

const size = 30;

const Chevron = ({ progress }) => {
    const style = useAnimatedStyle(() => ({
        backgroundColor: mixColor(progress.value, "#525251", "#e45645"),
        transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
    }));
    
    return (
        <Animated.View style={[styles.container, style]}>
            <Svg
                width={25}
                height={25}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M6 9l6 6 6-6" />
            </Svg>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: size,
        width: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#525251",
    },
});

export default Chevron;
