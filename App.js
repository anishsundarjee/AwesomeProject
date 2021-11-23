import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';
import FlashMessage from "react-native-flash-message";

import { Provider } from 'react-redux';
import {store, persistor} from './src/redux/stores/store';

// Add
import { PersistGate } from 'redux-persist/integration/react';

const App = props => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <View style={[styles.container]}>
                {Platform.OS === 'ios' && <StatusBar barStyle="dark" />}
                <AppNavigator/>
                <FlashMessage position="top" /> 
            </View>
        </PersistGate>
    </Provider>
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
