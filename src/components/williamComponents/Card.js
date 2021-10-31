import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const assets = [
    require("./assets/card1.png"),
    require("./assets/card2.png"),
    require("./assets/card3.png"),
    require("./assets/card4.png"),
    require("./assets/card5.png"),
    require("./assets/card6.png"),
];

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
    },
});

export const cards = [
    1,
    2,
    3,
    4,
    5,
    6,
];

const Card = ({ card }) => {
    return <Image style={styles.card} source={assets[card]} />;
};

export default Card;
