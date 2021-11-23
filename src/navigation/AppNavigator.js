import React from 'react';
import {Dimensions, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import {authUser} from '../redux/actions/authAction'

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
import AnimateColor from '../screens/Reanimated/YouTube/AnimateColor';
import ListParent from '../screens/ListAnimations/ListParent';
import DragableList from '../screens/ListAnimations/DragableList/DragableList';
import DragableFlatlist from '../screens/ListAnimations/DragableList/DragableFlatlist';
//AuthStack
import Login from '../screens/Auth/Login'
import AuthCenter from '../screens/Auth/AuthCenter'
import SignUp from '../screens/Auth/SignUp'
import Main from '../screens/sharedElementAnimations/Basic/Main';
import Detail from '../screens/sharedElementAnimations/Basic/Detail';

const {height, width} = Dimensions.get('window');

const ReanimatedStack = createSharedElementStackNavigator();
const AuthStack = createSharedElementStackNavigator();
const Tabs = createBottomTabNavigator();

const AppNavigator = () => {
    const navigationRef = React.useRef();
    const LoggedInUser = useSelector(state => state.authReducer.loggedInUser);

    const SharedElementsOptions = {
        headerBackTitleVisible: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress
            }
          };
        }
      };

    const ReanimatedStackScreen = () => (
        <ReanimatedStack.Navigator initialRouteName="Home" headerMode="none">
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
            <ReanimatedStack.Screen
                name="AnimateColor"
                component={AnimateColor}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="ListParent"
                component={ListParent}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="DragableList"
                component={DragableList}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="DragableFlatlist"
                component={DragableFlatlist}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            {/* Shared Element Transitions */}
            <ReanimatedStack.Screen
                name="Main"
                component={Main}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <ReanimatedStack.Screen
                name="Detail"
                component={Detail}
                options={() => SharedElementsOptions}
            />
        </ReanimatedStack.Navigator>
    );

    const AuthStackScreen = () => (
        <AuthStack.Navigator initialRouteName='AuthCenter'>
            <AuthStack.Screen 
                name="AuthCenter"
                component={AuthCenter}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <AuthStack.Screen 
                name="Login"
                component={Login}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
            <AuthStack.Screen 
                name="SignUp"
                component={SignUp}
                options={({navigation}) => ({
                    headerMode: 'none'
                })}
            />
        </AuthStack.Navigator>
    )

    React.useState(()=> {
        if(LoggedInUser === null) {
            console.log('user : ',LoggedInUser);
        }
    },[]);

    return (
        <NavigationContainer ref={navigationRef}>
            {
                LoggedInUser === null ? <AuthStackScreen /> : <ReanimatedStackScreen />
            }
        </NavigationContainer>
    );
};

export default AppNavigator;
