import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SimpleLineIcons } from '@expo/vector-icons';
import { data } from './Data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const Main = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar hidden />
            {/* Header */}
            <View style={{ marginTop: 10, marginBottom: 20, paddingHorizontal: 20 }}>
                <Text style={{ color: '#888', textTransform: 'uppercase' }}>
                    Saturday 9 January
                </Text>
                <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>
                    Today
                </Text>
            </View>
            {/* Scrollable Content*/}
            <View style={{ flex: 1, paddingBottom: 20 }}>
                <ScrollView
                    indicatorStyle='white'
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {data.map(item => (
                        <View key={item.id}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ marginBottom: 14 }}
                                onPress={() => navigation.navigate('Detail', { item })}
                            >
                                <SharedElement id={`item.${item.id}.image_url`}>
                                    <Image
                                        style={{
                                            borderRadius: 14,
                                            width: ITEM_WIDTH,
                                            height: ITEM_HEIGHT
                                        }}
                                        source={{ uri: item.image_url }}
                                        resizeMode='cover'
                                    />
                                </SharedElement>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: 10
                                    }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <SharedElement id={`item.${item.id}.iconName`}>
                                            <SimpleLineIcons size={40} color='white' name={item.iconName} />
                                        </SharedElement>
                                        <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
                                            <SharedElement id={`item.${item.id}.title`}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 24,
                                                        fontWeight: 'bold',
                                                        lineHeight: 28
                                                    }}
                                                >
                                                    {item.title}
                                                </Text>
                                            </SharedElement>
                                            <SharedElement id={`item.${item.id}.description`}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        lineHeight: 18
                                                    }}
                                                >
                                                    {item.description}
                                                </Text>
                                            </SharedElement>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: '#f5f5f5',

    },
});
