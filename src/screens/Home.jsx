import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from '../contexts/DarkModeContext';
import dayjs from 'dayjs';

const Home = () => {
  const { tasks } = useTaskContext();
  const { darkMode } = useDarkMode();

  const groupTasksByDate = (tasks) => {
    const grouped = {};
    tasks.forEach(task => {
      if (!grouped[task.dueDate]) {
        grouped[task.dueDate] = [];
      }
      grouped[task.dueDate].push(task);
    });
    return grouped;
  };

  const groupedTasks = groupTasksByDate(tasks);

  const today = dayjs().format('YYYY-MM-DD');
  if (!groupedTasks[today]) {
    groupedTasks[today] = [];
  }

  const taskSections = Object.entries(groupedTasks).map(([date, dateTasks]) => ({
    title: date,
    data: dateTasks
  }));

  const renderSection = ({ item }) => (
    <View className="mb-4">
      <Text className={`text-lg font-bold p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-900'}`}>{item.title}</Text>
      <TaskList
        tasks={item.data}
        selectedDate={item.title}
      />
    </View>
  );

  return (
    <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="flex-1">
        <Text className={`text-2xl font-bold text-center p-4 ${darkMode ? 'text-white' : 'text-blue-900'}`}>My Tasks</Text>
        <FlatList
          data={taskSections}
          keyExtractor={(item) => item.title}
          renderItem={renderSection}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Home;
