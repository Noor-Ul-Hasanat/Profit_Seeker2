import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Store/ReduxStore';

const Scanner = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('1');
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);

  const handleSearch = () => {
    if (!barcode.trim()) {
      Alert.alert('Error', 'Please enter a barcode');
      return;
    }

    const reqQty = parseInt(quantity, 10) || 1;
    const product = inventory.find(item => item.id === barcode.trim());
    if (product) {
      dispatch(addToCart({ ...product, cartQuantity: reqQty }));
      Alert.alert('Success', `${reqQty}x ${product.name} added to cart!`);
      setBarcode(''); // clear input after success
      setQuantity('1'); // reset quantity 
    } else {
      Alert.alert('Not Found', 'Product not found in inventory.');
    }
  };

  return (
    <View style={tw` bg-white justify-center items-center px-6 h-full`}>
      {/* Scan Button */}
      <TouchableOpacity
        style={tw`bg-blue-400 px-6 py-3 rounded-full mb-6 items-center flex-row w-2/4 justify-center`}
        onPress={() => navigation.navigate('scanner', { isInventoryMode: false })}
      >
        <Icon name="barcode-scan" size={24} color="#fff" />
        <Text style={tw`text-white ml-2`}>SCAN</Text>
      </TouchableOpacity>

      {/* Input Field Barcode */}
      <TextInput
        style={tw`border border-gray-300 rounded-full px-5 py-3 text-center text-base w-full mb-4 text-black`}
        placeholder="Enter Barcode Code"
        placeholderTextColor="#6b7280"
        value={barcode}
        onChangeText={setBarcode}
      />

      {/* Input Field Quantity */}
      <TextInput
        style={tw`border border-gray-300 rounded-full px-5 py-3 text-center text-base w-full mb-6 text-black`}
        placeholder="Enter Quantity"
        placeholderTextColor="#6b7280"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* Search Button */}
      <TouchableOpacity
        style={tw`bg-blue-400 px-6 py-3 rounded-full items-center w-2/4 justify-center`}
        onPress={handleSearch}
      >
        <Text style={tw`text-white font-bold`}>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Scanner;
