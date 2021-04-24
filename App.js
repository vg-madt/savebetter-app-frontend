
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyTabs from './components/Nav';
import Home from './screens/Home';
import Login from './screens/Login';

export default function App() {
  return (
    <MyTabs/>
      
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
