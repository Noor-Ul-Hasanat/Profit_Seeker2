import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';
import { USBPrinter } from 'react-native-thermal-receipt-printer';

export const Invoice = () => {
  const cartItems = useSelector(state => state.cart);
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState(null);

  // Initialize printer
  useEffect(() => {
    if (Platform.OS === 'android') {
      USBPrinter.init()
        .then(() => USBPrinter.getDeviceList())
        .then(setPrinters)
        .catch(error => console.error('Printer init error:', error));
    }
  }, []);

  // Auto-connect to first available printer
  const connectFirstPrinter = async () => {
    if (printers.length > 0 && !currentPrinter) {
      try {
        await USBPrinter.connectPrinter(printers[0].vendor_id, printers[0].product_id);
        setCurrentPrinter(printers[0]);
      } catch (error) {
        Alert.alert('Connection Failed', error.message);
      }
    }
  };

  // Modified print handler
  const handlePrint = async () => {
    if (!currentPrinter) {
      await connectFirstPrinter();
    }

    if (!currentPrinter) {
      Alert.alert('No Printer', 'No printer connected');
      return;
    }

    try {
      const printContent = `
        <C>مظہر آٹوز</C>
        <C>ہمارا ہے ہر قسم کا ٹریکٹر پارٹس</C>
        <C>اور آئل دستیاب ہے</C>
        <C>پتہ: مین جی ٹی روڈ جہانگیرہ</C>
        <C>نزد جہانگیرہ بس اسٹاپ</C>
        
        Date: ${new Date().toLocaleDateString()}
        Time: ${new Date().toLocaleTimeString()}
        
        <B>موبائل فون:</B> 0340-9026378
        <B>موبائل فون:</B> 0342-9653355
        
        ---------------------------------
        <CB>INVOICE SUMMARY</CB>
        ---------------------------------
        
        ${cartItems.map(item => `
        ${item.name.slice(0, 15).padEnd(15)} 
        x${item.quantity.toString().padEnd(3)} 
        Rs${item.price.toString().padEnd(5)} 
        Rs${(item.quantity * item.price).toString().padEnd(5)}
        `).join('\n')}
        
        ---------------------------------
        <B>Total: Rs ${cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)}</B>
        ---------------------------------
        
        <C>Thank you for your business!</C>
      `;

      await USBPrinter.printText(printContent);
      Alert.alert('Success', 'Receipt printed successfully');
    } catch (error) {
      Alert.alert('Print Error', error.message);
    }
  };

  return (
    <ScrollView style={tw`bg-white`}>
      {/* Existing header remains unchanged */}
      <View style={tw`flex justify-between border-b px-2`}>
        <View style={tw`items-end border-b border-gray-400 py-2`}>
          <Text style={tw`text-xl font-bold`}>مظہر آٹوز</Text>
          <Text style={tw`text-sm text-right`}>
            ہمارا ہے ہر قسم کا ٹریکٹر پارٹس اور آئل دستیاب ہے
          </Text>
          <Text style={tw`text-sm text-right`}>
            پتہ: مین جی ٹی روڈ جہانگیرہ، نزد جہانگیرہ بس اسٹاپ
          </Text>
        </View>
        <View style={tw`my-1 flex-row justify-between`}>
          <View style={tw`p-2`}>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
            <Text>Time: {new Date().toLocaleTimeString()}</Text>
          </View>
          <View style={tw`items-end py-2`}>
            <Text style={tw`text-sm`}>موبائل فون: 0340-9026378</Text>
            <Text style={tw`text-sm`}>موبائل فون: 0342-9653355</Text>
          </View>
        </View>
      </View>

      {/* Existing table remains unchanged */}
      <View style={tw`flex-row bg-gray-500 mt-4 p-2`}>
        <Text style={tw`flex-1 text-white text-center`}>Item</Text>
        <Text style={tw`flex-1 text-white text-center`}>Quantity</Text>
        <Text style={tw`flex-1 text-white text-center`}>Price</Text>
        <Text style={tw`flex-1 text-white text-center`}>Amount</Text>
      </View>

      {cartItems.map((item, index) => (
        <View key={index} style={tw`flex-row p-2 border-b`}>
          <Text style={tw`flex-1 text-center`}>{item.name}</Text>
          <Text style={tw`flex-1 text-center`}>{item.quantity}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.price}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.quantity * item.price}</Text>
        </View>
      ))}

      {/* Add printer status */}
      <Text style={tw`text-center mt-4 ${currentPrinter ? 'text-green-500' : 'text-red-500'}`}>
        {currentPrinter ? 'Printer Connected' : 'No Printer Connected'}
      </Text>

      {/* Existing print button remains unchanged */}
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-full self-center mt-4 mb-8`}
        onPress={handlePrint}
      >
        <MaterialIcons name="print" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};
