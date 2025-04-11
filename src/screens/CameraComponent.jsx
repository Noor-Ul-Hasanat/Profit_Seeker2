import React, { useEffect, useRef, useState } from 'react';
import { Text, Button, Alert, View, Pressable } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import tw from 'tailwind-react-native-classnames';
import { Linking } from 'react-native'; // Add this import
const CameraScreen = () => {
  const isScanned = useRef(false);
  const [isActive, setIsActive] = useState(true);
  const [scannedValue, setScannedValue] = useState('');

  const codeScanner = useCodeScanner({
      codeTypes: ['qr', 'ean-13', 'code-128'],
      onCodeScanned: (codes) => {
          if (!isScanned.current && codes.length > 0) {
              isScanned.current = true;
              setIsActive(false);
              const value = codes[0].value;
              setScannedValue(value);
              Alert.alert('Scan Successful!', `Scanned code: ${value}`);
          }
      },
  });

  const handleRescan = () => {
      isScanned.current = false;
      setIsActive(true);
      setScannedValue('');
  };

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
      if (!hasPermission) {
          requestPermission();
      }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
      return (
          <Text style={tw`text-center p-4`}>
              Camera permission required. <Button title="Grant Permission" onPress={requestPermission} />
          </Text>
      );
  }

  if (device == null) {
      return <Text style={tw`text-center p-4`}>No camera device found</Text>;
  }

    return (
        <View style={tw`flex-1 relative justify-center items-center bg-white`}>
            {/* Camera Container */}
            <View style={tw`relative h-60 w-80 mb-10`}>
                <View style={tw`absolute inset-0 rounded-3xl overflow-hidden border-2 border-blue-400`}>
                    <Camera
                        style={tw`flex-1`}
                        device={device}
                        isActive={isActive}
                        codeScanner={codeScanner}
                        zoom={0}
                        enableZoomGesture={true}
                    />
                </View>

                {/* Scan Barcode Text */}

            </View>
            {isActive && (
                    <Text style={tw`w-full  text-center text-black text-lg `}>
                        Scan the Product Barcode or
                    </Text>
                )}
            {/* Scan Again Button & Results */}
            {!isActive && (
                <View style={tw`absolute bottom-10 w-full items-center gap-4`}>
                    <Pressable
                        onPress={handleRescan}
                        style={({ pressed }) => tw`bg-blue-600 py-3 px-6 rounded-lg ${pressed ? 'opacity-60' : 'opacity-100'}`}
                    >
                        <Text style={tw`text-white font-semibold`}>Scan Again</Text>
                    </Pressable>

                    <Pressable
  onPress={() => {
    if(scannedValue) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(scannedValue)}`;
      Linking.openURL(searchUrl);
    }
  }}
  style={tw`mt-4`}
>
  <Text style={tw`text-white text-base bg-black bg-opacity-50 p-2 rounded-lg underline`}>
    Search : {scannedValue || 'None'}
  </Text>
</Pressable>
                </View>
            )}
        </View>
    );
};

export default CameraScreen;
