import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import picture from '../assets/product1.jpg';

const ProductDetail = () => {
  const offers = [
    { new: 523, used: 415, fba: 615 },
    { new: 525, used: 417, fba: 627 },
    { new: 525, used: 417, fba: 627 }];

  return (
    <ScrollView style={tw`bg-gray-50 p-4`}>
      {/* Product Header */}
      <View style={tw`w-full mb-6 flex-row`}>
        <View style={tw`w-2/5 flex justify-center items-center`} >
          <Image source={picture} style={tw`w-32 h-32  rounded-lg shadow-lg`} />
          <Text style={tw`text-yellow-600`}>UID 09237562527</Text>
        </View>
      <View style={tw`w-3/5 ml-2`}>
        <Text style={tw`text-md font-bold text-gray-800 mb-2`}>
          HP 15.6 inch Windows Laptop Intel Core i7-N305 8GB RAM 256GB SSD Natural Silver
        </Text>
        <View style={tw`space-y-1`}>
          <Text style={tw`text-sm text-gray-600 font-bold`}>UPC: <Text style={tw`text-yellow-600`}>8025792823972197</Text></Text>
          <Text style={tw`text-sm text-gray-600 font-bold text-xs`}>Dimensions (L x W x H):</Text>
          <Text style={tw`text-sm text-yellow-600`}>11 × 2201 × 10.98 inches</Text>
          <Text style={tw`text-xl font-bold mt-2`}>Price:<Text style={tw`text-yellow-600`}> $592.00</Text></Text>
        </View>
      </View>
      </View>

      {/* WFS Calculator */}
      <View style={tw`bg-white p-4 border border-blue-400 rounded-lg mb-6 w-full`}>
        <Text style={tw`text-lg font-bold mb-4 text-yellow-600 border-b border-blue-400 `}>WFS Calculator</Text>
        <View style={tw` w-full flex-row`}>
          {/* Left */}
          <View style={tw`w-1/2`}>
          {/* Left-left */}
         <View style={tw`flex-row justify-between`}>
         <Text style={tw`text-xs text-gray-600 mb-3 self-center`}>Dimensions  </Text>
         <TextInput style={tw`text-xs text-gray-600 border border-black px-3 py-2  mb-2 rounded-md`}>7.14 In</TextInput>
         </View>
         <View style={tw`flex-row justify-between`}>
         <Text style={tw`text-xs text-gray-600 mb-3 self-center`}>Unit Weight </Text>
         <TextInput style={tw`text-xs text-gray-600 border border-black px-3 py-2 mb-2 rounded-md`}>5.32 lb</TextInput>
         </View>
         <View style={tw`flex-row justify-between`}>
         <Text style={tw`text-xs text-gray-600 mb-3 self-center`}>Selling Price</Text>
         <TextInput style={tw`text-xs text-gray-600 border border-black px-3 py-2  mb-2 rounded-md`}>22.03 $</TextInput>
         </View>
         <View style={tw`flex-row justify-between`}>
         <Text style={tw`text-xs text-gray-600 mb-3 self-center`}>Buy Cost </Text>
         <TextInput style={tw`text-xs text-gray-600 border border-black px-3 py-2  mb-2 rounded-md`}>30.00 $</TextInput>
         </View>
         <View style={tw`flex-row justify-between`}>
         <Text style={tw`text-xs text-gray-600 mb-3 self-center`}>Shipping</Text>
         <TextInput style={tw`text-xs text-gray-600 border border-black px-3 py-2  mb-2 rounded-md`}>22.12 $</TextInput>
         </View>
          </View>

          {/* Right */}
          <View style={tw`w-1/2 ml-2`}>
          {/* Upper */}
        <View >
         <View style={tw`flex-row justify-between mx-2`}> <Text style={tw`text-xs text-gray-600 mb-3 `}>Referral fees  </Text><Text style={tw`text-yellow-600`}>$5.29</Text> </View>
         <View style={tw`flex-row justify-between mx-2`}> <Text style={tw`text-xs text-gray-600 mb-3 `}>Fulfilment fees  </Text><Text style={tw`text-yellow-600`}>$5.77</Text></View>
         <View style={tw`flex-row justify-between mx-2`}> <Text style={tw`text-xs text-gray-600 mb-3 `}>Storage fees  </Text><Text style={tw`text-yellow-600`}>$2.03</Text></View>
          </View>
          {/* Lower */}
          <View style={tw`bg-blue-400 py-4  rounded-lg `}>
         <View style={tw`flex-row justify-between mx-2 `}> <Text style={tw`text-xs text-gray-600 mb-3 text-white`}>Net Profit  </Text><Text style={tw`text-white `}>$5.29</Text> </View>
         <View style={tw`flex-row justify-between mx-2 `}> <Text style={tw`text-xs text-gray-600 mb-3 text-white`}>Net Margin  </Text><Text style={tw`text-white `}>$5.77</Text></View>
         <View style={tw`flex-row justify-between mx-2 `}> <Text style={tw`text-xs text-gray-600 mb-3 text-white`}>ROI  </Text><Text style={tw`text-white `}>$2.03</Text></View>
          </View>
          </View>

        </View>
      </View>

      {/* Offers Section */}
      <View style={tw`bg-white  rounded-lg border border-blue-500 mb-6 flex-row justify-between`}>
        <TouchableOpacity style={tw`text-lg font-semibold  text-blue-500 border-r border-blue-400`}><Text style={tw`text-blue-400 py-3 px-4 font-bold text-md`}>4 Offers</Text></TouchableOpacity>
        <TouchableOpacity style={tw`text-lg font-semibold  text-blue-500 `}><Text style={tw`text-blue-400 py-3 px-4 font-bold text-md`}>Profitability</Text></TouchableOpacity>
        <TouchableOpacity style={tw`text-lg font-semibold  text-blue-500 border-l border-blue-400`}><Text style={tw`text-blue-400 py-3 px-4 font-bold text-md`}>History</Text></TouchableOpacity>
      </View>

        {/* Offers Table */}
        <View>
        <View style={tw`border border-blue-400 rounded-xl`}>
          <View style={tw`flex flex-row bg-gray-100 justify-between rounded-t-xl`}>
            <Text style={tw`flex-1 font-semibold  border-r border-blue-400 text-center py-2`}>New</Text>
            <Text style={tw`flex-1 font-semibold text-center py-2`}>Used</Text>
            <Text style={tw`flex-1 font-semibold  border-l border-blue-400 text-center py-2`}>FBA</Text>
          </View>
          {offers.map((offer, index) => (
            <View key={index} style={tw`flex flex-row justify-between `}>
              <Text style={tw`flex-1 font-semibold  border-r border-t border-blue-400 text-center py-2 `}>${offer.new}</Text>
              <Text style={tw`flex-1 font-semibold text-center py-2 border-t border-blue-400`}>${offer.used}</Text>
              <Text style={tw`flex-1 font-semibold  border-l border-t border-blue-400 text-center py-2`}>${offer.fba}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={tw`flex-row   mb-6 mt-3 `}>
          <TouchableOpacity style={tw`bg-blue-400 py-2 px-3 rounded-3xl flex-1 items-center  mr-2`}>
            <Text style={tw`text-white font-semibold`}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-yellow-600 py-2 px-3 rounded-3xl flex-1 items-center `}>
            <Text style={tw`text-white font-semibold`}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default ProductDetail;
