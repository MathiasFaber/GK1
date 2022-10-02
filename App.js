import React from 'react';
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ClothesList from "./components/ClothesList";
import Add_edit_Clothes from "./components/Add_edit_Clothes";
import ClothesDetails from "./components/ClothesDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from './components/Profile';
import Message from './components/Message';
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyAFZPd_IS2hMcwhwjHBr1ENANA9Z4GXInA",
    authDomain: "fir-db-a0f52.firebaseapp.com",
    projectId: "fir-db-a0f52",
    storageBucket: "fir-db-a0f52.appspot.com",
    messagingSenderId: "564638001504",
    appId: "1:564638001504:web:b96751196fd9ba9b695605",
    measurementId: "G-EQDNHME0ZG"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Clothes List'} component={ClothesList}/>
          <Stack.Screen name={'Clothes Details'} component={ClothesDetails}/>
          <Stack.Screen name={'Edit Clothes'} component={Add_edit_Clothes}/>
          <Stack.Screen name={'Login'} component={Login}/>
          <Stack.Screen name={'Sign Up'} component={SignUp}/>
          <Stack.Screen name={'My Profile'} component={Profile}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Lej tøj'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="pricetags-outline" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Udlej tøj'} component={Add_edit_Clothes} options={{tabBarIcon: () => ( <Ionicons name="pricetag-outline" size={20} />)}}/>
          <Tab.Screen name={'Besked'} component={Message} options={{tabBarIcon: () => ( <Ionicons name="mail-open-outline" size={20} />)}}/>
          <Tab.Screen name={'Min profil'} component={Profile} options={{tabBarIcon: () => ( <Ionicons name="person-outline" size={20} />)}}/>
          <Tab.Screen name={'Login'} component={Login} options={{tabBarIcon: () => ( <Ionicons name="person-outline" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}
