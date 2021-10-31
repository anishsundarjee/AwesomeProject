import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';

const App = props => (
    <View style={[styles.container]}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark" />}
        <AppNavigator screenProps={{navigation: props.navigation}} />
    </View>
);

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_BG_COLOR,
    },
});

export default App;
