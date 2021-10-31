import React from 'react';
import {
  Image,
  Text,
  View,
  ScrollView
} from 'react-native';
import {SONG_HEIGHT} from './constants';

const Song = ({artist, cover, title}) => {
    return (
        <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                height: SONG_HEIGHT,
                padding: 10
            }}
        >
            <Image 
                source={{uri: cover}}
                style={{height: 50, width: 50, borderRadius: 4}}
            />
            <View
                style={{marginLeft: 10}}
            >
                <Text
                    style={{fontSize: 16, fontWeight: '600', marginBottom: 4}}
                >
                    {title}
                </Text>
                <Text
                    style={{fontSize: 12,color: 'grey',}}
                >
                    {artist}
                </Text>
            </View>
        </View>
    )
}

export default Song;