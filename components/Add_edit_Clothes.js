import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import firebase from "firebase/compat";

function Add_edit_Clothes({navigation,route}) {
    const initialState = { Produkt: '', Pris: '', Sælger: '', Størrelse: '' }
    const [newClothes,setNewClothes] = useState(initialState);
    const isEditClothes = route.name === "Edit Clothes"

    const changeTextInput = (name,event) => {
        setNewClothes({...newClothes, [name]: event});
    }
    const handleSave = () => {
        const { Produkt, Pris, Sælger, Størrelse } = newClothes;
        if(Produkt.length === 0 || Pris.length === 0 || Sælger.length === 0 || Størrelse.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditClothes){
            const id = route.params.Clothes[0];
            try {
                firebase
                    .database()
                    .ref(`/Clothess/${id}`)
                    .update({ Produkt, Pris, Sælger, Størrelse });
                Alert.alert("Din info er nu opdateret");
                const Clothes = [id,newClothes]
                navigation.navigate("Clothes Details",{Clothes});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }else{
            try {
                firebase
                    .database()
                    .ref('/Clothess/')
                    .push({ Produkt, Pris, Sælger, Størrelse });
                Alert.alert(`Saved`);
                setNewClothes(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newClothes[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                <Button title={ isEditClothes ? "Save changes" : "Add Clothes"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});

export default Add_edit_Clothes