import React from "react";
import { StyleSheet, Text, View, ScrollView, SectionList } from "react-native";
import List from "./List";
import data from './data';

const list = {
    name: "Total Points",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" },
        { name: "Jesus Lewis", points: "$3.45" },
        { name: "Johnny Marr", points: "$2.57" },
    ],
};

const list2 = {
    name: "Total Points",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" },
    ],
};

const list3 = {
    name: "Total Points",
    items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    ],
};



const Accordion = () => {
    return (
        // <ScrollView style={styles.container}>
        //     <Text style={styles.title}>Markets</Text>
        //     <List {...{ list }} />
        //     <List list={list2} />
        //     <List list={list3} />
        //     <List {...{ list }} />
        //     <List {...{ list }} />
        //     <List {...{ list }} />
        // </ScrollView>
        <>
            <Text style={styles.title}>Markets</Text>
            <SectionList
                sections={data}
                renderItem={({ item, index }) => (<List {...{ item }} /> )}
                keyExtractor={(item, index) => item + index}
                stickySectionHeadersEnabled= {true}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f6",
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
    },
});

export default Accordion;
