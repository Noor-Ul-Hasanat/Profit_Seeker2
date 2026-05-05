import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, Settings } from 'react-native-fbsdk-next';

const Welcome = ({navigation}) => {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);
    const webClientId = '733682474573-gm96lrtqitj9s7r4d2hs85n0v54tej11.apps.googleusercontent.com';

    useEffect(() => {
      GoogleSignin.configure({
        webClientId,
      });
      Settings.initializeSDK();
    }, []);

    const handleSocialPress = (provider) => {
      Alert.alert(
        `${provider} sign in`,
        `${provider} login is not configured yet. Please use email/password sign in for now.`,
      );
    };

    const handleGoogleSignIn = async () => {
      setGoogleLoading(true);
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();
        const idToken = signInResult?.data?.idToken || signInResult?.idToken;

        if (!idToken) {
          throw new Error('No ID token returned from Google Sign-In');
        }

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          return;
        }
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Error', 'Google Play Services not available on this device.');
          return;
        }
        Alert.alert('Google sign in failed', `${error.code || 'unknown-error'}: ${error.message}`);
      } finally {
        setGoogleLoading(false);
      }
    };

    const handleFacebookSignIn = async () => {
      setFacebookLoading(true);
      try {
        const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (loginResult.isCancelled) {
          return;
        }

        const data = await AccessToken.getCurrentAccessToken();
        if (!data?.accessToken) {
          throw new Error('No access token returned from Facebook login');
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        await auth().signInWithCredential(facebookCredential);
      } catch (error) {
        Alert.alert('Facebook sign in failed', `${error.code || 'unknown-error'}: ${error.message}`);
      } finally {
        setFacebookLoading(false);
      }
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
        <TouchableOpacity onPress={handleFacebookSignIn} disabled={facebookLoading}>
          {facebookLoading ? (
            <ActivityIndicator style={tw`p-2`} color="white" />
          ) : (
            <Icon style={tw`p-2`} name="facebook" size={30} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialPress('Twitter')}>
          <Icon style={tw`p-2`} name="twitter" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleSignIn} disabled={googleLoading}>
          {googleLoading ? (
            <ActivityIndicator style={tw`p-2`} color="white" />
          ) : (
            <Icon style={tw`p-2`} name="google" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

export default Welcome;
