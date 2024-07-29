// screens/Settings.jsx
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Settings = () => {
  const { resetTasks } = useTaskContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleResetData = async () => {
    await resetTasks();
    alert('App data has been reset.');
  };

  return (
    <SafeAreaProvider className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <Text className="text-2xl font-bold text-center py-4 text-blue-600">Settings</Text>

        <View className="bg-white rounded-lg mx-4 my-2 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg">Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg">Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          </View>
        </View>

        <View className="bg-white rounded-lg mx-4 my-2 p-4">
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-2 px-4"
            onPress={handleResetData}
          >
            <Text className="text-white text-center font-bold">Reset App Data</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-lg mx-4 my-2 p-4">
          <Text className="text-lg font-semibold mb-2">About</Text>
          <Text>Task Manager App</Text>
          <Text>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Settings;