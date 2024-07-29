import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import dayjs from 'dayjs';

// Home component: The main screen of the task management app
const Home = () => {
  // Use the TaskContext to access tasks and addNewTask function
  const { tasks } = useTaskContext();

  /**
   * Function to group tasks by their due date.
   * @param {Array} tasks - The list of tasks to group.
   * @returns {Object} - An object with dates as keys and arrays of tasks as values.
   */
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

  // Group the tasks by date
  const groupedTasks = groupTasksByDate(tasks);
  
  // Ensure there's an entry for today, even if it's empty
  const today = dayjs().format('YYYY-MM-DD');
  if (!groupedTasks[today]) {
    groupedTasks[today] = [];
  }
  
  /**
   * Create an array of sections for the FlatList, each representing a date.
   * The array elements have a title (date) and data (tasks for that date).
   */
  const taskSections = Object.entries(groupedTasks).map(([date, dateTasks]) => ({
    title: date,
    data: dateTasks
  }));

  /**
   * Function to render each section (date) in the FlatList.
   * @param {Object} item - The section item containing title and data.
   * @returns {JSX.Element} - The rendered section component.
   */
  const renderSection = ({ item }) => (
    <View className="mb-4">
      {/* Display the date as the section header */}
      <Text className="text-lg font-bold p-2 bg-blue-100 text-blue-900">{item.title}</Text>
      
      {/* Render the list of tasks for this date */}
      <TaskList
        tasks={item.data}
        selectedDate={item.title}
      />
    </View>
  );

  return (
    <SafeAreaProvider className="flex-1 bg-gray-100">
      {/* Main container */}
      <View className="flex-1">
        {/* Header text */}
        <Text className="text-2xl font-bold text-center p-4 text-blue-900">My Tasks</Text>
        
        {/* FlatList to render the grouped tasks */}
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
