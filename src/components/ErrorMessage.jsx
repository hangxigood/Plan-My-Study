// components/ErrorMessage.jsx
import React from 'react';
import { View, Text } from 'react-native';

const ErrorMessage = ({ message }) => (
  <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4">
    <Text className="font-bold">Error</Text>
    <Text>{message}</Text>
  </View>
);

export default ErrorMessage;