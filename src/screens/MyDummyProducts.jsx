// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
// import { useSelector } from 'react-redux';
// import tw from 'tailwind-react-native-classnames';

// const MyDummyProducts = ({navigation}) => {
//   const cartItems = useSelector(state => state.cart);

//   return (
//     <View style={tw`p-4`}>

//       {cartItems.length === 0 ? (
//         <Text style={tw`text-center text-gray-500`}>Your cart is empty</Text>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View
//             key={item.id}
//             style={tw`flex-row bg-white rounded-lg shadow-sm mb-4 p-3 border border-gray-200`}
//           >
//             {/* Product Image */}
//             <Image
//               source={item.image}
//               style={tw`w-20 h-32 rounded mr-4`}
//               resizeMode="contain"
//             />

//             {/* Product Info */}
//             <View style={tw`flex-1`}>
//               <Text style={tw`text-xs  text-gray-800 mb-1`}>
//                 {item.name}
//               </Text>
//               <Text style={tw`text-sm text-gray-600`}>Price: <Text style={tw`font-bold`}>{item.price}</Text></Text>
//               <Text style={tw`text-sm text-gray-600`}>Item Id: <Text style={tw`font-bold`}>{item.id}</Text></Text>

//               {/* Buttons */}
//               <View style={tw`flex-row mt-2`}>
//                 <TouchableOpacity style={tw`bg-blue-500 px-3 py-1 rounded-full mr-2`}
//                   onPress={() => navigation.navigate('ProductDetail', {name: 'ProductDetail'})}>
//                   <Text style={tw`text-white text-xs `}>Select</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={tw`bg-yellow-500 px-3 py-1 rounded-full`}>
//                   <Text style={tw`text-white text-xs `}>Visit Walmart</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };
// export default MyDummyProducts;


import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Entypo from 'react-native-vector-icons/Entypo';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../Store/ReduxStore';

const Products = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const renderItem = ({ item }) => {
    const itemTotal = (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2);

    return (

      <View style={tw`flex-row bg-white rounded-lg shadow-sm mb-4 p-3 border border-gray-200`}>

        <Image
          source={item.image}
          style={tw`w-20 h-32 rounded mr-4`}
          resizeMode="contain"
        />
        <View style={tw`flex-1`}>

          <View style={tw`flex-row justify-between items-start mb-2`}>

            <Text style={tw`text-base font-semibold text-gray-800`}>{item.name}</Text>
            <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: item.id }))}>
              <Entypo name="cross" size={20} color="red" />
            </TouchableOpacity>
          </View>


          <Text style={tw`text-sm text-gray-600 mb-1`}>
            Price: <Text style={tw`font-bold`}>{item.price}</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-1`}>
            Total: <Text style={tw`font-bold`}>${itemTotal}</Text>
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            ID: <Text style={tw`font-mono`}>{item.id}</Text>
          </Text>


          <View style={tw`flex-row items-center justify-between`}>

            <TouchableOpacity
              style={tw`bg-blue-500 px-4 py-2 rounded-lg`}
              onPress={() => navigation.navigate('ProductDetail')}
            >
              <Text style={tw`text-white text-sm`}>View Details</Text>
            </TouchableOpacity>

            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                style={tw`bg-yellow-500 w-8 h-8 items-center justify-center rounded-l`}
                onPress={() => dispatch(decrementQuantity(item.id))}
              >
                <Text style={tw`text-white text-xl`}>-</Text>
              </TouchableOpacity>
              <Text style={tw`w-10 text-center text-lg`}>{item.quantity}</Text>
              <TouchableOpacity

                style={tw`bg-yellow-500 w-8 h-8 items-center justify-center rounded-r`}

                onPress={() => dispatch(incrementQuantity(item.id))}
              >
                <Text style={tw`text-white text-xl`}>+</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={tw`p-4`}
      data={cartItems}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={tw`text-center text-gray-500 mt-10 text-lg`}>
          Your cart is empty

        </Text>
      }
      ListFooterComponent={
        cartItems.length > 0 && (
          <View style={tw`mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200`}>
            <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>
              Order Summary
            </Text>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-gray-600`}>Total Items:</Text>
              <Text style={tw`font-bold`}>{cartItems.length}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Total Price:</Text>
              <Text style={tw`font-bold`}>${calculateTotal()}</Text>
            </View>
          </View>
        )
      }
    />
  );
};

export default Products;
