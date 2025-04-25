import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform, PermissionsAndroid, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const Invoice = () => {
  const cartItems = useSelector(state => state.cart);
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const checkBluetooth = async () => {
    const state = await BluetoothStateManager.getState();
    if (state !== 'PoweredOn') {
      Alert.alert('Bluetooth Required', 'Please turn on Bluetooth manually in your device settings before scanning for printers.');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const initializePrinter = async () => {
      try {
        if (!BLEPrinter) {
          Alert.alert('Error', 'Printer module not found');
          return;
        }

        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        if (granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED) {
          await BLEPrinter.init();
          console.log('Printer initialized');
        }
      } catch (err) {
        console.error('Initialization error:', err);
        Alert.alert('Init Error', 'Failed to initialize printer module');
      }
    };

    if (Platform.OS === 'android') {
      initializePrinter();
    }
  }, []);

  const scanPrinters = async () => {
    setIsScanning(true);
    try {
      const devices = await BLEPrinter.getDeviceList();
      setPrinters(devices);
      setModalVisible(true); // Show modal when devices found
    } catch (error) {
      Alert.alert('Scan Error', error.message || 'Make sure Bluetooth is ON and permissions are granted');
    }
    setIsScanning(false);
  };

  const connectPrinter = async (printer) => {
    try {
      await BLEPrinter.connectPrinter(printer.inner_mac_address);
      setCurrentPrinter(printer);
      setModalVisible(false); // Close modal after connecting
      Alert.alert('Connected', `Connected to ${printer.device_name}`);
    } catch (error) {
      Alert.alert('Connection Failed', error.message);
    }
  };

  const handlePrint = async () => {
    if (!currentPrinter) {
      Alert.alert('No Printer', 'Please select a printer first');
      return;
    }

    try {
      const printContent = `
        <C>مظہر آٹوز</C>
        <C>ہمارا ہے ہر قسم کا ٹریکٹر پارٹس</C>
        <C>اور آئل دستیاب ہے</C>
        <C>پتہ: مین جی ٹی روڈ جہانگیرہ</C>
        <C>نزد جہانگیرہ بس اسٹاپ</C>

        Date: ${new Date().toLocaleDateString()}
        Time: ${new Date().toLocaleTimeString()}

        <B>موبائل فون:</B> 0340-9026378
        <B>موبائل فون:</B> 0342-9653355

        ---------------------------------
        <CB>INVOICE SUMMARY</CB>
        ---------------------------------

        ${cartItems.map(item => `
        ${item.name.slice(0, 15).padEnd(15)} 
        x${item.quantity.toString().padEnd(3)} 
        Rs${item.price.toString().padEnd(5)} 
        Rs${(item.quantity * item.price).toString().padEnd(5)}
        `).join('\n')}

        ---------------------------------
        <B>Total: Rs ${cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)}</B>
        ---------------------------------

        <C>Thank you for your business!</C>
      `;

      await BLEPrinter.printText(printContent);
      Alert.alert('Success', 'Receipt printed successfully');
    } catch (error) {
      Alert.alert('Print Error', error.message);
    }
  };

  return (
    <ScrollView style={tw`bg-white`}>
      {/* Header */}
      <View style={tw`flex justify-between border-b px-2`}>
        <View style={tw`items-end border-b border-gray-400 py-2`}>
          <Text style={tw`text-xl font-bold`}>مظہر آٹوز</Text>
          <Text style={tw`text-sm text-right`}>
            ہمارا ہے ہر قسم کا ٹریکٹر پارٹس اور آئل دستیاب ہے
          </Text>
          <Text style={tw`text-sm text-right`}>
            پتہ: مین جی ٹی روڈ جہانگیرہ، نزد جہانگیرہ بس اسٹاپ
          </Text>
        </View>
        <View style={tw`my-1 flex-row justify-between`}>
          <View style={tw`p-2`}>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
            <Text>Time: {new Date().toLocaleTimeString()}</Text>
          </View>
          <View style={tw`items-end py-2`}>
            <Text style={tw`text-sm`}>موبائل فون: 0340-9026378</Text>
            <Text style={tw`text-sm`}>موبائل فون: 0342-9653355</Text>
          </View>
        </View>
      </View>

      {/* Printer Connection Button */}
      <View style={tw`p-4 border-b`}>
        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded mb-4`}
          onPress={async () => {
            const isBluetoothReady = await checkBluetooth();
            if (isBluetoothReady) {
              scanPrinters();
            }
          }}
          disabled={isScanning}
        >
          <Text style={tw`text-white text-center`}>
            {isScanning ? 'Scanning...' : 'Scan Bluetooth Printers'}
          </Text>
        </TouchableOpacity>

        <Text style={tw`text-center ${currentPrinter ? 'text-green-500' : 'text-red-500'}`}>
          {currentPrinter
            ? `Connected to: ${currentPrinter.device_name}`
            : 'No printer connected'}
        </Text>
      </View>

      {/* Invoice Table */}
      <View style={tw`flex-row bg-gray-500 mt-4 p-2`}>
        <Text style={tw`flex-1 text-white text-center`}>Item</Text>
        <Text style={tw`flex-1 text-white text-center`}>Quantity</Text>
        <Text style={tw`flex-1 text-white text-center`}>Price</Text>
        <Text style={tw`flex-1 text-white text-center`}>Amount</Text>
      </View>

      {cartItems.map((item, index) => (
        <View key={index} style={tw`flex-row p-2 border-b`}>
          <Text style={tw`flex-1 text-center`}>{item.name}</Text>
          <Text style={tw`flex-1 text-center`}>{item.quantity}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.price}</Text>
          <Text style={tw`flex-1 text-center`}>Rs {item.quantity * item.price}</Text>
        </View>
      ))}

      {/* Print Button */}
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded-full self-center mt-4 mb-8`}
        onPress={handlePrint}
      >
        <MaterialIcons name="print" size={24} color="white" />
      </TouchableOpacity>

      {/* Printer Selection Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-lg p-4 w-5/6 h-3/5`}>
            <Text style={tw`text-lg font-bold mb-4 text-center border-blue-600 border-b pb-2`}>Available Printers</Text>
            <ScrollView>
              {printers.map((printer) => (
                <TouchableOpacity
                  key={printer.inner_mac_address}
                  style={tw`p-3 border rounded mb-2 border-blue-600 ${currentPrinter?.inner_mac_address === printer.inner_mac_address ? 'bg-blue-100' : ''}`}
                  onPress={() => connectPrinter(printer)}
                >
                  <Text>{printer.device_name}</Text>
                  <Text style={tw` text-xs`}>{printer.inner_mac_address}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={tw`bg-red-500 p-2 rounded mt-4`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
