import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from "react";

import Loadingscreen from './screens/Loadingscreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='loading' component={Loadingscreen} />
        <Stack.Screen name='home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
