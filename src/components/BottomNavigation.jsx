// components/BottomNavigation.jsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// BottomNavigation component: Provides navigation buttons to switch between different screens
const BottomNavigation = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      {/* View container for the bottom navigation bar */}
      <View className="flex-row justify-around bg-white py-2 border-t border-gray-200">
        {/* Navigation button to go to the Home screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Navigate to the Home screen
          className="flex items-center"
        >
          <Text className="text-blue-500">Home</Text>
        </TouchableOpacity>

        {/* Navigation button to go to the Calendar screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Calendar')} // Navigate to the Calendar screen
          className="flex items-center"
        >
          <Text className="text-blue-500">Calendar</Text>
        </TouchableOpacity>

        {/* Navigation button to go to the Settings screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')} // Navigate to the Settings screen
          className="flex items-center"
        >
          <Text className="text-blue-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default BottomNavigation;