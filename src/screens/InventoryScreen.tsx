import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InventoryScreen = ({ navigation }: any) => {
    const inventoryItems = useSelector((state: any) => state.inventory);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date' | 'alphabetical'

    // Filter and Sort Data
    const displayData = useMemo(() => {
        // 1. Filter by Search Query
        let filtered = inventoryItems.filter((item: any) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 2. Sort Data
        if (sortBy === 'alphabetical') {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'date') {
            // Assuming newer items are pushed to the end of the array, we reverse it to show newest first.
            // Note: True Date-sorting would require a timestamp added to the Redux Store item payload.
            filtered = [...filtered].reverse();
        }

        return filtered;
    }, [inventoryItems, searchQuery, sortBy]);

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`p-4 border-b border-gray-200 flex-row justify-between items-center`}>
                <Text style={tw`text-2xl font-bold text-gray-800`}>Inventory</Text>
                <Text style={tw`text-gray-500 font-semibold`}>Total: {inventoryItems.length}</Text>
            </View>

            {/* Search and Sort Toolbar */}
            <View style={tw`p-4 border-b border-gray-100 bg-gray-50`}>
                <View style={tw`flex-row items-center bg-white border border-gray-300 rounded-lg px-3 py-2 mb-3 shadow-sm`}>
                    <Icon name="magnify" size={24} color="#888" />
                    <TextInput
                        style={tw`flex-1 ml-2 text-base text-gray-800 p-0`}
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Icon name="close-circle" size={20} color="#888" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Sort Toggle */}
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-sm font-semibold text-gray-600`}>Sort By:</Text>
                    <View style={tw`flex-row bg-white rounded-lg overflow-hidden border border-gray-300`}>
                        <TouchableOpacity
                            style={tw`px-4 py-2 ${sortBy === 'date' ? 'bg-blue-100' : 'bg-transparent'}`}
                            onPress={() => setSortBy('date')}
                        >
                            <Text style={tw`text-sm ${sortBy === 'date' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>Newest</Text>
                        </TouchableOpacity>
                        <View style={tw`w-px bg-gray-300`} />
                        <TouchableOpacity
                            style={tw`px-4 py-2 ${sortBy === 'alphabetical' ? 'bg-blue-100' : 'bg-transparent'}`}
                            onPress={() => setSortBy('alphabetical')}
                        >
                            <Text style={tw`text-sm ${sortBy === 'alphabetical' ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>A-Z</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* List */}
            {displayData.length === 0 ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Icon name="archive-search-outline" size={64} color="#ccc" />
                    <Text style={tw`text-center text-gray-500 mt-4 text-lg`}>No items found</Text>
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={tw`p-4 pb-24`}
                    data={displayData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={tw`flex-row bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-3 items-center`}>
                            {item.image ? (
                                <Image
                                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                                    style={tw`w-16 h-16 rounded mr-4 bg-gray-100`}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={tw`w-16 h-16 rounded mr-4 bg-gray-200 items-center justify-center`}>
                                    <Icon name="image-outline" size={30} color="#999" />
                                </View>
                            )}

                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg font-bold text-gray-800`} numberOfLines={1}>{item.name}</Text>
                                <Text style={tw`text-sm text-gray-500 mb-1 font-mono`}>ID: {item.id}</Text>
                                <View style={tw`flex-row justify-between mt-1 items-center`}>
                                    <Text style={tw`text-sm font-bold text-green-600`}>Rs: {item.price}</Text>
                                    <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                                        <Text style={tw`text-xs font-bold text-blue-700`}>Qty: {item.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Floating Action Button */}
            <TouchableOpacity
                style={[
                    tw`absolute bottom-6 right-6 bg-blue-500 rounded-full items-center justify-center shadow-lg`,
                    { width: 60, height: 60, elevation: 5 }
                ]}
                onPress={() => navigation.navigate('AddInventory')}
            >
                <Icon name="plus" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default InventoryScreen;
