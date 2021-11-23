import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Button, Avatar } from 'react-native-paper';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const AuthCenter = ({navigation}) => {
    const animateHeaderOpacity = useSharedValue(0);
    const animateButtonsOpacity = useSharedValue(0);

    const headerAnimatedStyle = useAnimatedStyle(()=> {
        return {
            opacity: withTiming(animateHeaderOpacity.value,{duration: 1500})
        }
    })

    const buttonAnimatedStyle = useAnimatedStyle(()=> {
        return {
            opacity: withTiming(animateButtonsOpacity.value,{duration: 1000})
        }
    })

    React.useEffect(()=>{
        animateHeaderOpacity.value = 1;
        animateButtonsOpacity.value = 1;
    },[])

    return (
        <View style={{flex:1,backgroundColor: 'grey'}}>
            <Image
                source={require('../../../assets/appbackground.jpg')}
                style = {{resizeMode: 'cover', height: height, width: width}}
            />
            <Animated.View style={[buttonAnimatedStyle,{position:'absolute', top: height / 10, alignSelf:'center'}]}>
                <Avatar.Icon size={100} icon="account" />
            </Animated.View>
            <Animated.View style={[headerAnimatedStyle,{position:'absolute', top: height / 4, alignSelf:'center'}]}>
                <Text style={{fontSize: 16, fontWeight:'600', color: 'white'}}>Welcome to our wonderful app.</Text>
            </Animated.View>
            <View>
                <Button
                    icon="login"
                    mode="contained"
                    onPress={() => navigation.push('Login')}
                    style={{ bottom: 20, left: 0,right: 0, position:'absolute' }}
                >
                    Log - in
                </Button>
            </View>
            <View>
                <Button
                    icon="account"
                    mode="contained" 
                    onPress={() => navigation.push('SignUp')}
                    style={{ bottom: -25, left: 0,right: 0, position:'absolute', backgroundColor: 'grey'}}
                >
                    Sign - Up
                </Button>
            </View>
        </View>
    )
}

export default AuthCenter;

const styles = StyleSheet.create({

})
