import React from 'react';
import {
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SONG_HEIGHT} from './constants';
import SONGS from './Songs';
import MovableSong from './MovableSong';

function listToObject(list) {
    const values = Object.values(list);
    const object = {};
  
    for (let i = 0; i < values.length; i++) {
      object[values[i].id] = i;
    }
  
    return object;
}

const SortableScrollView = () => {
    const positions = useSharedValue(listToObject(SONGS));
    const scrollY = useSharedValue(0);
    //animated scroll ref
    const scrollViewRef = useAnimatedRef();

    //get scroll height value from scrollview
    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })

    //go to scroll location
    useAnimatedReaction(
        () => scrollY.value,
        (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
    );

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaProvider>
                <SafeAreaView style={{flex:1}}>
                    <Animated.ScrollView 
                        ref={scrollViewRef}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        style={{flex:1, position: 'relative', backgroundColor: 'white'}}
                        contentContainerStyle={{height: SONGS.length * SONG_HEIGHT, }}
                    >
                        {
                            SONGS.map((song) => (
                                <MovableSong
                                    key={song.id}
                                    id={song.id}
                                    artist={song.artist}
                                    cover={song.cover}
                                    title={song.title}
                                    positions={positions}
                                    songsCount={SONGS.length}
                                    scrollY={scrollY}
                                />
                            ))
                        }

                    </Animated.ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

export default SortableScrollView;
