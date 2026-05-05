import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import picture from '../assets/profile.jpg';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const Dashboard = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };
  return (
    <View style={tw`bg-white rounded-lg shadow-lg h-full p-6`}>
      {/* Header Section */}
      <View style={tw`mb-6 flex justify-center items-center mt-8`}>
        <Image source={picture} style={tw`w-28 h-28 rounded-full mb-4 `} />
        <Text style={tw`text-lg font-bold`}>Muhammad Mustafa</Text>
      </View>

      {/* Status Section */}
      <View style={tw`mt-6 border border-gray-200 rounded-lg px-6 py-4`}>
        <View style={tw`flex-row justify-between`}>
          <View>
            <Text style={tw`font-bold`}>Membership</Text>
            <Text>Assembly</Text>
          </View>
          <View>
            <Text style={tw`font-bold`}>Status</Text>
            <Text>Active</Text>
          </View>
          <View>
            <Text style={tw`font-bold`}>Dates</Text>
            <Text>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
          </View>
        </View>
      </View>


      {/* Divider */}
      <View style={tw` my-4`} />

      {/* Quick Actions Section */}
      <View style={tw`mt-6 flex-row justify-between`}>
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-lg p-4 w-[48%] items-center justify-center`}
          onPress={() => navigation.navigate('Inventory')}
        >
          <Icon name="package-variant" size={32} color="white" />
          <Text style={tw`text-white font-bold mt-2 text-center`}>Manage Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-green-500 rounded-lg p-4 w-[48%] items-center justify-center`}
          onPress={() => navigation.navigate('AddInventory')}
        >
          <Icon name="plus-box" size={32} color="white" />
          <Text style={tw`text-white font-bold mt-2 text-center`}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Section */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-sm text-gray-500`}>Email</Text>
        <Text style={tw`font-medium `}>{user?.email || 'N/A'}</Text>
      </View>
      {/* Footer Section */}
      <View style={tw`flex justify-between mt-10`}>
        <Text style={tw`text-sm text-gray-500`}>Version <Text style={tw`text-black font-bold`}>1.1.3</Text></Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={tw`text-red-600 font-medium mt-10`}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Dashboard;
