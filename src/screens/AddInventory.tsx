import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { addInventoryItem } from '../Store/ReduxStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const AddInventory = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const scannedBarcode = (route.params as any)?.scannedBarcode || '';

    // If no scanned barcode is present, generate a random ID to prevent items from merging
    const [id, setId] = useState(scannedBarcode || Date.now().toString());
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleTakePhoto = async () => {
        const result = await launchCamera({ mediaType: 'photo', quality: 0.5 });
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleChoosePhoto = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5 });
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            setImageUri(result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (scannedBarcode) {
            setId(scannedBarcode);
        }
    }, [scannedBarcode]);

    const handleAdd = () => {
        if (!id || !name || !price || !quantity) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        dispatch(addInventoryItem({
            id,
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            image: imageUri,
        }));

        Alert.alert('Success', 'Item added to inventory successfully');
        setId(Date.now().toString());
        setName('');
        setPrice('');
        setQuantity('1');
        setImageUri(null);
        navigation.goBack();
    };

    return (
        <ScrollView style={tw`bg-white flex-1 p-6`}>
            <Text style={tw`text-2xl font-bold mb-6 text-center text-gray-800`}>Add to Inventory</Text>

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-1 font-semibold`}>Barcode / ID</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50`}
                    placeholder="Enter or scan ID"
                    value={id}
                    onChangeText={setId}
                />
            </View>

            {/* Image Picker Section */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-2 font-semibold`}>Product Image (Optional)</Text>
                <View style={tw`flex-row items-center justify-between`}>
                    <TouchableOpacity
                        style={tw`bg-blue-100 flex-1 py-3 mr-2 rounded-lg items-center flex-row justify-center border border-blue-300`}
                        onPress={handleTakePhoto}
                    >
                        <Icon name="camera" size={20} color="#1d4ed8" />
                        <Text style={tw`text-blue-800 ml-2 font-semibold`}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`bg-green-100 flex-1 py-3 ml-2 rounded-lg items-center flex-row justify-center border border-green-300`}
                        onPress={handleChoosePhoto}
                    >
                        <Icon name="image" size={20} color="#15803d" />
                        <Text style={tw`text-green-800 ml-2 font-semibold`}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                {imageUri && (
                    <View style={tw`mt-4 items-center`}>
                        <Image source={{ uri: imageUri }} style={tw`w-32 h-32 rounded-lg border border-gray-300`} />
                        <TouchableOpacity style={tw`mt-2`} onPress={() => setImageUri(null)}>
                            <Text style={tw`text-red-500 font-semibold`}>Remove Image</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={tw`bg-blue-400 px-6 py-3 rounded-lg mb-6 items-center flex-row justify-center`}
                onPress={() => (navigation as any).navigate('scanner', { isInventoryMode: true })}
            >
                <Icon name="barcode-scan" size={20} color="#fff" />
                <Text style={tw`text-white ml-2 font-semibold`}>SCAN BARCODE</Text>
            </TouchableOpacity>

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-1 font-semibold`}>Product Name</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50`}
                    placeholder="Enter product name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 mb-1 font-semibold`}>Price (Rs)</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50`}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-gray-600 mb-1 font-semibold`}>Quantity</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg px-4 py-3 text-base bg-gray-50`}
                    placeholder="1"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                />
            </View>

            <TouchableOpacity
                style={tw`bg-green-500 px-6 py-4 rounded-lg items-center mb-4`}
                onPress={handleAdd}
            >
                <Text style={tw`text-white font-bold text-lg`}>SAVE ITEM</Text>
            </TouchableOpacity>

            {/* Go to Manage Inventory Button */}
            <TouchableOpacity
                style={tw`bg-gray-800 px-6 py-4 rounded-lg items-center flex-row justify-center mb-10`}
                onPress={() => (navigation as any).navigate('Inventory')}
            >
                <Icon name="format-list-bulleted" size={24} color="#fff" />
                <Text style={tw`text-white font-bold text-lg ml-2`}>GO TO INVENTORY</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddInventory;
