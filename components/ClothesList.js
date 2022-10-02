import React, {useEffect, useState} from 'react';
import {Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import firebase from "firebase/compat";
import { FlatList } from 'react-native-gesture-handler';

function ClothesList({navigation}) {
    const [Clothess,setClothess] = useState();
    useEffect(() => {
        if(!Clothess){
            firebase
            .database()
            .ref('/Clothess')
            .on('value', snapshot => {
                setClothess(snapshot.val())
    });
        }
    }, []
    )
    if (!Clothess){
        return <Text>Loading...</Text>
    }

    const handleSelectClothes = id => {
        const Clothes = Object.entries(Clothess).find( Clothes => Clothes[0] === id)
        navigation.navigate('Clothes Details', { Clothes });
    }

    const ClothesArray = Object.values(Clothess); 
    const ClothesKeys = Object.keys(Clothess);


    return (
        <FlatList 
            style={styles.background}
            data={ClothesArray} 
            keyExtractor={(item, index) => ClothesKeys[index]} 
            renderItem={({item,index}) => { 
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectClothes(ClothesKeys[index])}> 
                        <Text style={styles.text}>
                            Produkt: {item.Produkt}
                            {'\n'}
                            Pris: {item.Pris}
                            {'\n'}
                            Størrelse: {item.Størrelse}
                            {'\n'}
                            Udlejer: {item.Sælger}
                        </Text> 
                    </TouchableOpacity>) }}/>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 100,
        justifyContent:'center',
        backgroundColor: '#f8b195'
    },
    label: { fontWeight: 'bold' },
    text: {
        textAlign: 'center',
    }
});

export default ClothesList