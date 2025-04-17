import React,{useMemo} from 'react';
import { View, Text, FlatList, TouchableOpacity,Image, ScrollView } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Entypo from 'react-native-vector-icons/Entypo';
import {incrementQuantity, decrementQuantity, removeFromCart} from '../Store/ReduxStore';

const Products = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);


  // Memoized total calculation
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }, [cartItems]);

  // Memoized item count
  const totalItems = useMemo(() => cartItems.length, [cartItems]);
  return (
    <ScrollView style={tw`p-2`}>

      {cartItems.length === 0 ? (
        <Text style={tw`text-center text-gray-500`}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
            key={item.id}
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

<View style={tw`flex-row justify-between items-start`}>

  <Text style={tw`text-base font-semibold text-gray-800`}>{item.name}</Text>
  <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: item.id }))} style={tw`border border-blue-500 rounded-full bg-blue-200 justify-center items-center`}>
    <Entypo name="cross" size={20} color="red" />
  </TouchableOpacity>
</View>


<Text style={tw`text-sm text-gray-600`}>
  Price: <Text style={tw`font-bold text-green-500`}>Rs: {item.price}</Text>
</Text>
<Text style={tw`text-sm text-gray-600 mt-1`}>
  Total: <Text style={tw`font-bold text-yellow-500`}> Rs:{(item.price * item.quantity)}</Text>
</Text>
<Text style={tw`text-sm text-gray-600 mb-2`}>
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
          )}
        />
      )}

            {/* Individual Items Summary */}
            <View style={tw` bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-6`}>
            <Text style={tw`text-lg font-semibold text-center text-gray-700 mb-2`}>
              Order Summary
            </Text>
            {cartItems.map(item => (
              <View>
              <View key={item.id} style={tw`flex-row justify-between mb-1 border-b border-gray-200`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base text-gray-800`}>{item.name}</Text>
                  <Text style={tw`text-sm text-gray-500`}>
                    {item.quantity} × Rs{item.price} = <Text style={tw`text-green-500`}>Rs {(item.price * item.quantity)}
                    </Text></Text>
                </View>
                <Text style={tw`text-base text-yellow-500 font-bold`}>
                  Rs: {(item.price * item.quantity)}
                </Text>
              </View>
              </View>
            ))}

               <View style={tw`flex-row justify-between mt-3`}>
              <Text style={tw`text-gray-600 font-bold`}>Total Items:</Text>
              <Text style={tw`font-bold`}>{totalItems}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600 font-bold`}>Total Price:</Text>
              <Text style={tw`font-bold`}>Rs: {totalPrice}</Text>
            </View>
            </View>

       {/* {cartItems.length !== 0 ? (
                <View style={tw`mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200`}>
            <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>
              Order Summary
            </Text>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-gray-600`}>Total Items:</Text>
              <Text style={tw`font-bold`}>{totalItems}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-gray-600`}>Total Price:</Text>
              <Text style={tw`font-bold`}>Rs: {totalPrice}</Text>
            </View>
          </View>) : null} */}
    </ScrollView>

  );
};

export default Products;
