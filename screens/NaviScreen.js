import React, { useLayoutEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import LoginScreen, {LoginInput} from './LoginScreen';
import VideoScreen from './VideoScreen';
import MetaScreen from './MetaScreen';
import EditScreen from './EditScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ModalPortal } from 'react-native-modals';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor: 'darkslateblue'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};
const NaviScreen = () => {
  return (
    <React.Fragment>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions}>
          <Stack.Screen name='Home' component={HomeScreen} initialParams={{ privateKey: 'None' }}/>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Video' component={VideoScreen} />
          <Stack.Screen name='Meta' component={MetaScreen} />
          <Stack.Screen name='Edit' component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal/>
    </React.Fragment>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
})

export default NaviScreen
