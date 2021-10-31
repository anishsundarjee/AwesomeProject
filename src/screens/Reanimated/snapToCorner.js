import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {
    PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import Colors from '../../constants/Colors';

const SIZE = 75;
const {width, height} = Dimensions.get('screen');

const snapPointsX = [0, width - (SIZE + 10)];
const snapPointsY = [0, height - (SIZE * 2)];

const snapToCorner = ({navigation}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onGestureEvent = useAnimatedGestureHandler(
        {
            onStart: (_event, ctx) => {
                // triggered at the start of the pan gesture
                ctx.x = translateX.value; // store the current translate value in the context object
                ctx.y = translateY.value;
            },
            onActive: ({translationX, translationY}, ctx) => {
                // triggered on every frame of the pan gesture
                translateX.value = ctx.x + translationX; // add the offset on every frame of the animation
                translateY.value = ctx.y + translationY;
            },
            onEnd: ({translationY, translationX, velocityX, velocityY}) => {
                // triggered at the end of the pan gesture
                const snapPointX = snapPoint(translationX, velocityX, snapPointsX);
                const snapPointY = snapPoint(translationY, velocityY, snapPointsY);

                translateX.value = withSpring(snapPointX, {velocity: velocityX});
                translateY.value = withSpring(snapPointY, {velocity: velocityY});
            },
        },
    );

    const style = useAnimatedStyle(() =>({
        width: SIZE,
        height: SIZE,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        aspectRatio: 1,
        borderRadius: SIZE / 2,
        position: 'absolute',
        transform: [
            {translateX: translateX.value}, 
            {translateY: translateY.value},
        ],
    }));

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <Animated.View
                        style={style}
                    />
            </PanGestureHandler>
        </View>
    )
};

export default snapToCorner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  Colors.BLACK,
    },
  });
