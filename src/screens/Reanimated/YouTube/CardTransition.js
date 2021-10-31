import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
useAnimatedStyle,
useSharedValue,
useDerivedValue,
withSpring,
withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../../../components/williamComponents/index";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: "flex-end",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        padding: StyleGuide.spacing * 4,
    },
});
const origin = { x: -(width / 2 - StyleGuide.spacing * 2), y: 0 };

const useTimingTransition = (state, config) => {
    const value = useSharedValue(0);
    useEffect(()=> {
        value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
    },[value, state])
    const transition = useDerivedValue(()=> {
        return withTiming(value.value, config); // eg: withTiming(value.value, {duration: 1000});
    })
    return transition;
}

const useSpringTransition = (state, config) => {
    const value = useSharedValue(0);
    useEffect(()=> {
        value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
    },[value, state])
    const transition = useDerivedValue(()=> {
        return withSpring(value.value, config); //eg: withSpring(value.value, {damping: 10});
    })
    return transition;
}

const UseTransition = () => {
    const [toggled, setToggle] = useState(false);
    // const transition = useSpringTransition(toggled);
    const transition = useTimingTransition(toggled, {duration: 1000});

    return (
        <View style={styles.container}>
            {cards.slice(0, 4).map((card, index) => {
                const style = useAnimatedStyle(() => {
                    const rotate = mix(transition.value, 0, ((index - 2) * Math.PI / 10));
                    return {
                        transform: [
                            { translateX: origin.x },
                            { rotate: `${rotate}rad` },
                            { translateX: -origin.x },
                        ],
                    };
                })
            return (
                <Animated.View 
                    key={card} 
                    style={[
                        styles.overlay, 
                        style
                    ]}
                >
                    <Card {...{ card }} />
                </Animated.View>
            );
            })}
            <Button
                label={toggled ? "Reset" : "Start"}
                onPress={() => setToggle((prev) => !prev)}
                primary
            />
        </View>
    );
};

export default UseTransition;
