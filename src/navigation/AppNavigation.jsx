import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import CameraComponent from '../screens/CameraComponent';
import ProductDetail from '../screens/ProductDetail';
// import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
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
    </Stack.Navigator>
  );
}
