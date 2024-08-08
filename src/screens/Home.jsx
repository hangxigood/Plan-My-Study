import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from '../contexts/DarkModeContext';
import dayjs from 'dayjs';

const Home = () => {
  const { tasks } = useTaskContext();
  const { darkMode, notificationsEnabled } = useDarkMode();
  const [showAlert, setShowAlert] = useState(false);

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

  // Check task
  const getAlertMessage = () => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) {
      return 'You currently have 0 task.';
    } else if (totalTasks === 1) {
      return 'You currently have 1 task.';
    } else {
      return `You currently have ${totalTasks} tasks.`;
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (notificationsEnabled) {
      setShowAlert(true); // Always show alert if notifications are enabled
    } else {
      setShowAlert(false);
    }
  }, [tasks, notificationsEnabled]);

  const alertBackgroundColor = darkMode ? '#424242' : '#c5cae9'; // Background color for alert
  const alertTextColor = darkMode ? '#fff' : '#000'; // Text color for alert

  return (
    <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="flex-1">
        <Text className={`text-2xl font-bold text-center p-4 ${darkMode ? 'text-white' : 'text-blue-600'}`}>My Tasks</Text>

        {showAlert && (
          <View style={{ backgroundColor: alertBackgroundColor, borderColor: alertTextColor, borderWidth: 1, padding: 16, borderRadius: 8, marginHorizontal: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: alertTextColor }}>
                {getAlertMessage()}
              </Text>
              <TouchableOpacity onPress={handleAlertClose}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: alertTextColor }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList
          data={taskSections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 8, backgroundColor: darkMode ? '#424242' : '#e3f2fd', color: darkMode ? '#fff' : '#000' }}>
                {item.title}
              </Text>
              <TaskList
                tasks={item.data}
                selectedDate={item.title}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Home;
