import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import picture from '../assets/profile.jpg';
const Dashboard = () => {
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
      <Text>25 Aug. 2004</Text>
    </View>
  </View>
</View>


          {/* Divider */}
          <View style={tw` my-4`} />

          {/* Contact Section */}
          <View style={tw`mt-6`}>
            <Text style={tw`text-sm text-gray-500`}>Email</Text>
            <Text style={tw`font-medium `}>muhammadmustafa@gmail.com</Text>
          </View>
          {/* Footer Section */}
          <View style={tw`flex justify-between mt-10`}>
            <Text style={tw`text-sm text-gray-500`}>Version <Text style={tw`text-black font-bold`}>1.1.3</Text></Text>
            <TouchableOpacity>
              <Text style={tw`text-red-600 font-medium mt-10`}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
};
export default Dashboard;
