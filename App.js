import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import MyCart from './src/screens/MyCart';
import ProductoInfo from './src/screens/ProductoInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Items } from './src/data/Index';

import { openDatabase } from 'react-native-sqlite-storage';
import Inventario from './src/screens/Inventario';

const db = openDatabase({
  name: "db_products"
});

const Stack = createNativeStackNavigator();
const App = () => {

  useEffect(() => {
    storeData(Items);
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log('DATABASE ', jsonValue);
      await AsyncStorage.setItem('database', jsonValue);
    } catch (e) {
      // saving error
      console.log('Error', e);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MyCart' component={MyCart} />
        <Stack.Screen name='ProductoInfo' component={ProductoInfo} />
        <Stack.Screen name='Inventario' component={Inventario} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default React.memo(App);

const styles = StyleSheet.create({})