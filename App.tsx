import React from 'react';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src//navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/Store/ReduxStore';

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[]);
  return (
<Provider store={store}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </Provider>
  );
};
export default App;
