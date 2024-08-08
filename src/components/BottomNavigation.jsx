import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeIcon from './assets/home.png';
import calendarIcon from './assets/calendar.png';
import settingsIcon from './assets/settings.png';

// BottomNavigation component: Provides navigation buttons to switch between different screens
const BottomNavigation = ({ state, navigation, activeScreen }) => {
  const getTextStyle = (screenName) => {
    return {
      color: activeScreen === screenName ? '#3B82F6' : '#9CA3AF',
      fontWeight: activeScreen === screenName ? 'bold' : 'normal',
    };
  };

  return (
    <SafeAreaView className="flex-row justify-around bg-white py-2 border-t border-gray-200 absolute bottom-0 w-full">
      
        {/* Navigation button to go to the Home screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')} // Navigate to the Home screen
        className="flex items-center"
      >
        <Image source={homeIcon} className="w-6 h-6 mb-1" />
        <Text style={getTextStyle('Home')}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Calendar')} // Navigate to the Calendar screen
        className="flex items-center"
      >
        <Image source={calendarIcon} className="w-6 h-6 mb-1" />
        <Text style={getTextStyle('Calendar')}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')} // Navigate to the Settings screen
        className="flex items-center"
      >
        <Image source={settingsIcon} className="w-6 h-6 mb-1" />
        <Text style={getTextStyle('Settings')}>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BottomNavigation;