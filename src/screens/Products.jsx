import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
const products = [
  {
    id: '2402224351',
    name: 'Dr Teal\'s Shea Sugar Body Scrub with Pomegranate & Black Currant Oils Essential Oil Blend, 19 oz',
    price: '$10.59',
    image: product1,
  },
  {
    id: '2409312852',
    name: 'Dr Teal\'s Shea Sugar Body Scrub with Pomegranate & Black Currant Oils Essential Oil Blend, 19 oz',
    price: '$12.42',
    image: product2,
  },
  {
    id: '2408235353',
    name: 'Dr Teal\'s Shea Sugar Body Scrub with Pomegranate & Black Currant Oils Essential Oil Blend, 19 oz',
    price: '$14.66',
    image: product3,
  },
];

const Products = () => {
    return (
        <ScrollView style={tw`bg-white p-4`}>
        {products.map((item, id) => (
          <View
            key={id}
            style={tw`flex-row bg-white rounded-lg shadow-sm mb-4 p-3 border border-gray-200`}
          >
            {/* Product Image */}
            <Image
              source={item.image}
              style={tw`w-20 h-32 rounded mr-4`}
              resizeMode="contain"
            />

            {/* Product Info */}
            <View style={tw`flex-1`}>
              <Text style={tw`text-xs  text-gray-800 mb-1`}>
                {item.name}
              </Text>
              <Text style={tw`text-sm text-gray-600`}>Price: <Text style={tw`font-bold`}>{item.price}</Text></Text>
              <Text style={tw`text-sm text-gray-600`}>Item Id: <Text style={tw`font-bold`}>{item.id}</Text></Text>

              {/* Buttons */}
              <View style={tw`flex-row mt-2`}>
                <TouchableOpacity style={tw`bg-blue-500 px-3 py-1 rounded-full mr-2`}>
                  <Text style={tw`text-white text-xs `}>Select</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-yellow-500 px-3 py-1 rounded-full`}>
                  <Text style={tw`text-white text-xs `}>Visit Walmart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      );
};

export default Products;
