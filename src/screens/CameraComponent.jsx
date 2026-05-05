import React, { useEffect, useRef, useState } from 'react';
import { Text, Button, Alert, View, Pressable } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import tw from 'tailwind-react-native-classnames';
import LinearGradient from 'react-native-linear-gradient';
import { Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Store/ReduxStore';
import { useNavigation, useRoute } from '@react-navigation/native';

const CameraScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const inventory = useSelector((state) => state.inventory);

    // Check if we navigated here specifically to scan into inventory
    const isInventoryMode = route.params?.isInventoryMode || false;

    const isScanned = useRef(false);
    const [isActive, setIsActive] = useState(true);
    const [scannedValue, setScannedValue] = useState('');

    const processScan = (value) => {
        if (isInventoryMode) {
            // Provide an alert and navigate back to AddInventory to preserve user input
            Alert.alert(
                'Barcode Scanned',
                `Code: ${value}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate({
                                name: 'AddInventory',
                                params: { scannedBarcode: value },
                                merge: true,
                            });
                        }
                    }
                ]
            );
        } else {
            const product = inventory.find((item) => item.id === value);
            if (product) {
                dispatch(addToCart(product));
                Alert.alert('Success', `${product.name} added to cart!`, [
                    { text: 'OK', onPress: () => handleRescan() }
                ]);
            } else {
                Alert.alert('Not Found', 'Product not found in inventory. Please add it to inventory first.');
            }
        }
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13', 'code-128'],
        onCodeScanned: (codes) => {
            if (!isScanned.current && codes.length > 0) {
                isScanned.current = true;
                setIsActive(false);
                const value = codes[0].value;
                setScannedValue(value);
                processScan(value);
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
        <LinearGradient
            colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.2)']}
            style={tw`flex-1 relative justify-center items-center bg-blue-500 bg-opacity-80`}
        >
            <View style={tw`relative h-40 w-96 mb-10`}>
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
            </View>
            {isActive && (
                <Text style={tw`w-full text-center text-white text-lg`}>
                    Scan {isInventoryMode ? 'to Add to Inventory' : 'to Add to Bill'}
                </Text>
            )}
            {!isActive && (
                <View style={tw`absolute bottom-10 w-full items-center gap-4`}>
                    <Pressable
                        onPress={handleRescan}
                        style={({ pressed }) => tw`bg-blue-600 py-3 px-8 rounded-lg ${pressed ? 'opacity-60' : 'opacity-100'}`}
                    >
                        <Text style={tw`text-white font-semibold text-lg`}>Scan Again</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            if (scannedValue) {
                                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(scannedValue)}`;
                                Linking.openURL(searchUrl);
                            }
                        }}
                        style={tw`mt-4`}
                    >
                        <Text style={tw`text-white text-base bg-black bg-opacity-50 p-2 rounded-lg underline`}>
                            Search:  {scannedValue || 'None'}
                        </Text>
                    </Pressable>
                </View>
            )}
        </LinearGradient>
    );
};

export default CameraScreen;
