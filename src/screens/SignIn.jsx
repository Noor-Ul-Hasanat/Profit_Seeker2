import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={tw`h-full bg-blue-500 justify-center `}>

      {/* Sign In Header */}
      <Text style={tw`text-white text-3xl mt-36 mb-5 ml-4`}>SIGN IN</Text>

      {/* Sign In Container */}
      <View style={tw`w-full bg-white rounded-t-2xl p-6 mt-6 shadow-lg flex-1`}>

        {/* Email Input */}
        <Text style={tw`text-blue-500 font-semibold mb-1`}>Username or Email</Text>
        <View style={tw`flex-row items-center border-b border-gray-300 mb-4`}>
          <TextInput
            style={tw`flex-1 text-lg text-gray-700 p-2`}
            placeholder="johndoe@gmail.com"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        {/* Password Input */}
        <Text style={tw`text-blue-500 font-semibold mb-1 mt-4`}>Password</Text>
        <View style={tw`flex-row items-center border-b border-gray-300 mb-2`}>
          <TextInput
            style={tw`flex-1 text-lg text-gray-700 p-2`}
            placeholder="••••••••"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={tw`text-gray-500 text-right mb-4 mt-6`}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={tw`bg-blue-500 py-3 rounded-full mt-12`}>
          <Text style={tw`text-white text-center  text-lg`}>SIGN IN</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={tw`self-end mt-32`}>
          <Text style={tw`text-gray-500`}>Don’t Have an Account?</Text>
          <TouchableOpacity>
            <Text style={tw`text-blue-500 font-bold `}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default SignIn;
