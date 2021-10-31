import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const FirstAnimation = ({navigation}) => {
    const randomNumber = useSharedValue(100);

    const style = useAnimatedStyle(()=>{
        return {
            width: withSpring(randomNumber.value),
            height: withSpring(randomNumber.value, { stiffness: 10 }),
        };
    })
    
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: Colors.HINT_COLOR,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    randomNumber.value = Math.random() * 350;
                }}
            >
                <Animated.Image
                    source={require('../../../assets/logo.png')}
                    resizeMode="contain"
                    style={style}
                />
            </TouchableOpacity>
        </View>
    )
}

export default FirstAnimation;
