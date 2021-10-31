import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

const SimpleAnimation = ({navigation}) => {
    return (
            <ScrollView 
                contentContainerStyle={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}
            >
                <Button
                    title="First Animation"
                    onPress={() => navigation.push('FirstAnimation')}
                />
                <Button
                    title="Snap To Corner"
                    onPress={() => navigation.push('snapToCorner')}
                />
                <Button
                    title="Slider Animation"
                    onPress={() => navigation.push('SliderAnimation')}
                />
                <Button
                    title="Card Transition Animation"
                    onPress={() => navigation.push('CardTransition')}
                />
                <Button
                    title="Accordion Animation"
                    onPress={() => navigation.push('Accordion')}
                />
                <Button
                    title="Sortable ScrollView Animation"
                    onPress={() => navigation.push('SortableScrollView')}
                />
                <Button
                    title="Google Maps Animation"
                    onPress={() => navigation.push('MapView')}
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
        flex: 1,
        backgroundColor: Colors.PRIMARY_BG_COLOR,
    },
});

export default SimpleAnimation;
