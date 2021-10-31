import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/Colors';

const {height, width} = Dimensions.get('window');

const Button = ({title, onPress}) => (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonStyle: {
        width: width - 50,
        backgroundColor: Colors.HINT_COLOR,
        height: 50,
        borderRadius: 15,
        shadowColor: Colors.LIGHT_BORDER,
        shadowOpacity: 0.3,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center',
        color: Colors.PRIMARY_BG_COLOR,
    },
});

export default Button;
