import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {SafeAreaView} from 'react-native-safe-area-context';

const exampleData = [...Array(20)].map((d, index) => ({
        key: `item-${index}`, // For example only -- don't use index as your key!
        label: index,
        backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));

const DragableFlatlist = ({navigation}) => {
    const [data, setData] = React.useState(exampleData);

    const renderItem = ({ item, index, drag, isActive }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    backgroundColor: isActive ? "blue" : item.backgroundColor,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onLongPress={()=>drag()}
            >
                <Text
                    style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 32
                    }}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={data}
                    renderItem={(item, index) => renderItem(item, index)}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    onDragEnd={({ data }) => setData(data)}
                    numColumns={3}
                />
            </View>
        </SafeAreaView>
    );
};

export default DragableFlatlist;
