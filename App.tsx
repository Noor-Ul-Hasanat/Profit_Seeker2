import React from 'react';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src//navigation/AppNavigation';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default App;
