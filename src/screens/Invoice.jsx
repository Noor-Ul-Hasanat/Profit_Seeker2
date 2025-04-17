import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';

export const Invoice = () => {
    const cartItems = useSelector(state => state.cart);
//   const ghakname = useSelector((state) => state.cash.customerName);
//   const Calculation = useSelector((state) => state.cash.calculation);
//   const purchaseData = useSelector((state) => state.cash.list) || [];
//   const latestPurchase = purchaseData[purchaseData.length - 1] || {};
//   const items = latestPurchase.items || [];

  const handlePrint = () => {
    Alert.alert('Print', 'Print functionality would be implemented here');
  };

//   const renderTableRow = (label, value, style = {}) => (
//     <View style={[tw`flex-row justify-between py-1`, style]}>
//       <Text style={tw`font-bold`}>{label}</Text>
//       <Text>{value}</Text>
//     </View>
//   );

  return (
    <ScrollView style={tw` bg-white`}>
      {/* Header */}
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
        <View style={tw`items-end py-2`}>
          <Text style={tw`text-sm`}>موبائل فون: 0340-9026378</Text>
          <Text style={tw`text-sm`}>موبائل فون: 0342-9653355</Text>
        </View>
      </View>

      {/* Customer Details */}
      <View style={tw`mt-4 flex-row justify-between`}>
        {/* <Text style={tw`text-lg font-bold`}>{ghakname}</Text> */}
        <View>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
          <Text>Time: {new Date().toLocaleTimeString()}</Text>
        </View>
      </View>

      {/* Table Header */}
      <View style={tw`flex-row bg-gray-500 mt-4 p-2`}>
        <Text style={tw`flex-1 text-white text-center`}>Item</Text>
        <Text style={tw`flex-1 text-white text-center`}>Quantity</Text>
        <Text style={tw`flex-1 text-white text-center`}>Price</Text>
        <Text style={tw`flex-1 text-white text-center`}>Amount</Text>
      </View>

      {/* Table Rows */}
      {cartItems.map((item, index) => (
        <View key={index} style={tw`flex-row p-2 border-b`}>
          <Text style={tw`flex-1 text-center`}>{item.name}</Text>
          <Text style={tw`flex-1 text-center`}>{item.quantity}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.price}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.quantity * item.price}</Text>
        </View>
      ))}

      {/* Summary */}
      {/* <View style={tw`mt-4 p-2 border`}>
        {renderTableRow('Total:', `Rs ${Calculation.totalAmount}`)}
        {renderTableRow('Received:', `Rs ${Calculation.receivedAmount}`)}
        {renderTableRow('Discount:', 'Rs 0.00')}
        {renderTableRow('Remaining:', `Rs ${Calculation.remainingAmount}`, tw`border-t pt-2`)}
      </View> */}

      <Text style={tw`text-right mt-4`}>
        {/* This Invoice is made by {user.name} */}
      </Text>

      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-full self-center mt-4`}
        onPress={handlePrint}
      >
        <MaterialIcons name="print" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};


