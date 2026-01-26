import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation.jsx'
import './global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  return (
<GestureHandlerRootView style={{ flex: 1 }}>

  <Navigation/>
</GestureHandlerRootView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default App;
