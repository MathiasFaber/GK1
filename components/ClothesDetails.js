import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ClothesDetails = ({route,navigation}) => {
    const [Clothes,setClothes] = useState({});

    useEffect(() => {
        setClothes(route.params.Clothes[1]);
        return () => {
            setClothes({})
        }
    });

    if (!Clothes) {
        return <Text>No data</Text>;
    }
    return (
        <View style={styles.container}>
            {
                Object.entries(Clothes).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{item[0]} </Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ClothesDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});