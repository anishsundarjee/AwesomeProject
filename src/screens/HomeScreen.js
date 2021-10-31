import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import Button from '../components/Button';

const HomeScreen = ({navigation}) => {
    return (
        <View style={[styles.container, styles.center]}>
            <Button
                title="Reanimated"
                onPress={() => navigation.push('AnimationParent')}
            />
        </View>
    );
};

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

export default HomeScreen;
