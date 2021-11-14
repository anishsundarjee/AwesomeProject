import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Button from '../../components/Button';

const ListParent = ({navigation}) => {
    return (
            <ScrollView 
                contentContainerStyle={styles.container}
            >
                <Button
                    title="Multi list drag"
                    onPress={() => navigation.push('DragableList')}
                />
                <Button
                    title="Flatlist Drag"
                    onPress={() => navigation.push('DragableFlatlist')}
                />
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center',
    },
});

export default ListParent;
