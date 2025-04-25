import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Scanner = ({navigation}) => {
    return (
        <View style={tw` bg-white justify-center items-center px-6 h-full`}>
          {/* Scan Button */}
          <TouchableOpacity
            style={tw`bg-blue-400 px-6 py-3 rounded-full mb-6 items-center flex-row w-2/4 justify-center`}
            onPress={() => navigation.navigate('scanner', {name: 'scanner'})}
          >
          <Icon name="barcode-scan" size={24} color="#fff" />
            <Text style={tw`text-white ml-2`}>SCAN</Text>
          </TouchableOpacity>

          {/* Input Field */}
          <TextInput
            style={tw`border  rounded-full px-5 py-3 text-center text-base w-full mb-6`}
            placeholder="Enter Barcode Code"
            placeholderTextColor="#6b7280"
          />

          {/* Search Button */}
          <TouchableOpacity
            style={tw`bg-blue-400 px-6 py-3 rounded-full items-center w-2/4 justify-center`}
            onPress={() => console.log('Search pressed')}
          >
            <Text style={tw`text-white `}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      );
};

export default Scanner;
