// import React, { useState } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import { useTaskContext } from '../contexts/TaskContext';
// import TaskList from '../components/TaskList';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useDarkMode } from '../contexts/DarkModeContext';
// import dayjs from 'dayjs';

// const Home = () => {
//   const { tasks } = useTaskContext();
//   const { darkMode } = useDarkMode();

//   const groupTasksByDate = (tasks) => {
//     const grouped = {};
//     tasks.forEach(task => {
//       if (!grouped[task.dueDate]) {
//         grouped[task.dueDate] = [];
//       }
//       grouped[task.dueDate].push(task);
//     });
//     return grouped;
//   };

//   const groupedTasks = groupTasksByDate(tasks);

//   const today = dayjs().format('YYYY-MM-DD');
//   if (!groupedTasks[today]) {
//     groupedTasks[today] = [];
//   }

//   const taskSections = Object.entries(groupedTasks).map(([date, dateTasks]) => ({
//     title: date,
//     data: dateTasks
//   }));

//   const renderSection = ({ item }) => (
//     <View className="mb-4">
//       <Text className={`text-lg font-bold p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-900'}`}>{item.title}</Text>
//       <TaskList
//         tasks={item.data}
//         selectedDate={item.title}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//       <View className="flex-1">
//         <Text className={`text-2xl font-bold text-center p-4 ${darkMode ? 'text-white' : 'text-blue-900'}`}>My Tasks</Text>
//         <FlatList
//           data={taskSections}
//           keyExtractor={(item) => item.title}
//           renderItem={renderSection}
//         />
//       </View>
//     </SafeAreaProvider>
//   );
// };


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
      setShowAlert(true);  // Always show alert if notifications are enabled
    } else {
      setShowAlert(false);
    }
  }, [tasks, notificationsEnabled]);

  return (
    <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="flex-1">
        <Text className={`text-2xl font-bold text-center p-4 ${darkMode ? 'text-white' : 'text-blue-900'}`}>My Tasks</Text>

        {showAlert && (
          <View className={`bg-yellow-100 border border-yellow-400 p-4 rounded mb-4 mx-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <View className="flex-row justify-between items-center">
              <Text className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                {getAlertMessage()}
              </Text>
              <TouchableOpacity onPress={handleAlertClose}>
                <Text className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList
          data={taskSections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View className="mb-4">
              <Text className={`text-lg font-bold p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-100 text-blue-900'}`}>{item.title}</Text>
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
