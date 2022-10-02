import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";

function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{ 
            });
        } catch (error){
            setErrorMessage(error.message)
        }
    }
  
    const loginButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };

    const signUpButton = () => {
        return <Button onPress={() => navigation.navigate("Sign Up")} title="New user? Sign up here :D" />;
    };

    return (
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {loginButton()}
            <Text>{'\n'}</Text>
            {signUpButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});

export default Login;