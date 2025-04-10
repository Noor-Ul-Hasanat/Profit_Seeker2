import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const Welcome = ({navigation}) => {
    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err));
      };
  return (

    <View style={tw`bg-blue-400 h-full items-center`}>
    <View style={tw`mt-32`}>
        <Image style={tw`w-20 h-20`}source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8tW9_oqwh2JO1XztUaLKUTUXvgO2ujvddZlIpZOeTtrl5-OItRwd_EtpZz0vHbjnnNfg&usqp=CAU'}}/>
    </View>
    <View style={tw`mt-16 w-full items-center`}>
        <Text style={tw`text-3xl text-white mb-4`}>WELCOME</Text>
        <TouchableOpacity style={tw`w-3/4 py-2 m-2 border-white border-2 rounded-3xl`}><Text style={tw`text-center text-white text-lg`}
         onPress={() =>
          navigation.navigate('SignIn', {name: 'Signin'})
        }>SIGN IN</Text></TouchableOpacity>
        <TouchableOpacity style={tw`w-3/4 py-2 m-2 border-white border-2 rounded-3xl`}><Text style={tw`text-center text-white text-lg`}
         onPress={() =>
          navigation.navigate('SignUp', {name: 'Signup'})
        }>SIGN UP</Text></TouchableOpacity>
    </View>
    <View style={tw`mt-16 `}>
        <Text style={tw`text-white text-lg`}>login with social Media</Text>
        <View style={tw`flex-row justify-center p-2`}>
        <TouchableOpacity onPress={() => openURL('https://facebook.com')}>
          <Icon style={tw`p-2`} name="facebook" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL('https://twitter.com')}>
          <Icon style={tw`p-2`} name="twitter" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL('https://google.com')}>
          <Icon style={tw`p-2`} name="google" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default Welcome;
