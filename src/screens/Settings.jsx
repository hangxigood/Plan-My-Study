// Settings.jsx
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from '../contexts/DarkModeContext';

const Settings = () => {
  const { resetTasks } = useTaskContext();
  const { darkMode, setDarkMode, notificationsEnabled, setNotificationsEnabled } = useDarkMode(); // 추가된 부분

  const handleResetData = async () => {
    await resetTasks();
    alert('App data has been reset.');
  };

  return (
    <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView className="flex-1">
        <Text className={`text-2xl font-bold text-center py-4 ${darkMode ? 'text-white' : 'text-blue-600'}`}>Settings</Text>

        <View className={`bg-white rounded-lg mx-4 my-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </View>
        </View>

        <View className={`bg-white rounded-lg mx-4 my-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-2 px-4"
            onPress={handleResetData}
          >
            <Text className="text-white text-center font-bold">Reset App Data</Text>
          </TouchableOpacity>
        </View>

        <View className={`bg-white rounded-lg mx-4 my-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>About</Text>
          <Text className={darkMode ? 'text-white' : 'text-black'}>Task Manager App</Text>
          <Text className={darkMode ? 'text-white' : 'text-black'}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Settings;
