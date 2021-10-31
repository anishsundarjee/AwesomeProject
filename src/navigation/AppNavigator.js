import React from 'react';
import {Dimensions, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Stack screens
import HomeScreen from '../screens/HomeScreen';
import AnimationParent from '../screens/Reanimated/AnimationParent';
import FirstAnimation from '../screens/Reanimated/FirstAnimation';
import snapToCorner from '../screens/Reanimated/snapToCorner';
import SliderAnimation from '../screens/Reanimated/SliderAnimation';
import CardTransition from '../screens/Reanimated/YouTube/CardTransition';
import Accordion from '../screens/Reanimated/YouTube/Accordion/Accordion';
import SortableScrollView from '../screens/Reanimated/YouTube/SortableScrollView/SortableScrollView';
import MapView from '../screens/Reanimated/YouTube/GoogleMapsAnimation/MapView';

const {height, width} = Dimensions.get('window');

const ReanimatedStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const AppNavigator = () => {
    const navigationRef = React.useRef();

    const ReanimatedStackScreen = () => (
        <ReanimatedStack.Navigator initialRouteName="Home">
            <ReanimatedStack.Screen
                name="Home"
                component={HomeScreen}
                options={({navigation}) => ({
                    title: 'Home Screen',
                })}
            />
            <ReanimatedStack.Screen
                name="AnimationParent"
                component={AnimationParent}
                options={({navigation}) => ({
                    title: 'Guide to all animation',
                })}
            />
            <ReanimatedStack.Screen
                name="FirstAnimation"
                component={FirstAnimation}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="snapToCorner"
                component={snapToCorner}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="SliderAnimation"
                component={SliderAnimation}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="CardTransition"
                component={CardTransition}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="Accordion"
                component={Accordion}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="SortableScrollView"
                component={SortableScrollView}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="MapView"
                component={MapView}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
        </ReanimatedStack.Navigator>
    );

    return (
        <NavigationContainer ref={navigationRef}>
            <ReanimatedStackScreen />
        </NavigationContainer>
    );
};

export default AppNavigator;
