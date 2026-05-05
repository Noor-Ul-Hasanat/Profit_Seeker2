import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setUser } from '../Store/ReduxStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import CameraComponent from '../screens/CameraComponent';
import ProductDetail from '../screens/ProductDetail';
import InventoryScreen from '../screens/InventoryScreen';
import AddInventory from '../screens/AddInventory';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ uid: firebaseUser.uid, email: firebaseUser.email }));
      } else {
        dispatch(setUser(null));
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="rgb(107, 170, 252)" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
      {/* Add other screens here if needed */}
      <Stack.Screen name="scanner" component={CameraComponent}
        options={{
          headerShown: true,
          headerTitle: 'Scanning',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'rgb(107, 170, 252)',
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins',
            fontSize: 22,
            marginLeft: 10,
            marginTop: 10,
            fontWeight: '600',
          },
        }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: true,
          headerTitle: 'Product Details',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'rgb(107, 170, 252)',
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins',
            fontSize: 22,
            marginLeft: 10,
            marginTop: 10,
            fontWeight: '600',
          },
        }}
      />
      <Stack.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          headerShown: true,
          headerTitle: 'Manage Inventory',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'rgb(107, 170, 252)', elevation: 0, shadowOpacity: 0, height: 60 },
          headerTitleStyle: { fontFamily: 'Poppins', fontSize: 22, marginLeft: 10, marginTop: 10, fontWeight: '600' },
        }}
      />
      <Stack.Screen
        name="AddInventory"
        component={AddInventory}
        options={{
          headerShown: true,
          headerTitle: 'Add Product',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'rgb(107, 170, 252)', elevation: 0, shadowOpacity: 0, height: 60 },
          headerTitleStyle: { fontFamily: 'Poppins', fontSize: 22, marginLeft: 10, marginTop: 10, fontWeight: '600' },
        }}
      />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
