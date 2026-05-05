import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Scanner from '../screens/Scanner';
import Products from '../screens/Products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Invoice } from '../screens/Invoice';
// import Histry from '../screens/Histry';
// import MyDummyProducts from '../screens/MyDummyProducts';

const Tab = createBottomTabNavigator();
const renderTabBarIcon = (route, focused, color, size) => {
    // Determine which icon to show based on route name
    switch (route.name) {
      case 'Dashboard':
        return (
          <Icon
            name={focused ? 'view-dashboard' : 'view-dashboard-outline'}
            size={size}
            color={color}
          />
        );
      case 'Scanner':
        return (
          <Icon
            name={focused ? 'barcode-scan' : 'barcode-scan'}
            size={size}
            color={color}
          />
        );
      case 'Cart':
        return (
          <Icon
            name={focused ? 'shopping' : 'shopping-outline'}
            size={size}
            color={color}
          />
        );
        case 'Histry':
            return <Icon name={focused ? 'history' : 'history'} size={size} color={color} />;
      default:
        return (
          <Icon
            name="help-circle"
            size={size}
            color={color}
          />
        );
    }
  };

export default function MainTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      // Tab bar styling
      tabBarIcon: ({ focused, color, size }) =>
        renderTabBarIcon(route, focused, color, size),
      tabBarActiveTintColor: 'white', // Active tab text/icon color
      tabBarInactiveTintColor: 'rgba(255,255,255,0.6)', // Inactive tab color
      tabBarStyle: {
        backgroundColor: 'rgb(107, 170, 252)', // Tab bar background color
        borderTopWidth: 0, // Remove top border
        height: 60, // // Tab bar height
      },

      // Header styling
      headerShown: true,
      headerBackTitleVisible: true,
      headerTintColor: '#ffffff', // Back button and title color
      headerStyle: {
        backgroundColor: 'rgb(107, 170, 252)',
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
      },
      headerTitleStyle: {
        fontFamily: 'Poppins',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: '600', // Added for better readability
      },
      // Optional: Label styling
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5, // Space between icon and label
        fontFamily: 'Poppins', // Match your header font
      },
    })}
  >
      <Tab.Screen name="Dashboard" component={Dashboard}  />
      <Tab.Screen name="Scanner" component={Scanner}  />
      <Tab.Screen name="Cart" component={Products} />
      <Tab.Screen name="Histry" component={Invoice} />
      {/* <Tab.Screen name="scanner" component={CameraComponent} /> */}
    </Tab.Navigator>
  );
}
