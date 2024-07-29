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

// Kai 0729 remember (npm install react-native-gesture-handler)

// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { useTaskContext } from '../contexts/TaskContext';
// import TaskList from '../components/TaskList';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import dayjs from 'dayjs';

// const Home = () => {
//   const { tasks } = useTaskContext();
//   const [expandedSection, setExpandedSection] = useState(null);

//   // Function to group tasks by their due date
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

//   // Group the tasks by date
//   const groupedTasks = groupTasksByDate(tasks);

//   // Ensure there's an entry for today, even if it's empty
//   const today = dayjs().format('YYYY-MM-DD');
//   if (!groupedTasks[today]) {
//     groupedTasks[today] = [];
//   }

//   // Create an array of sections for the FlatList
//   const taskSections = Object.entries(groupedTasks).map(([date, dateTasks]) => ({
//     title: date,
//     data: dateTasks
//   }));

//   // Toggle the expanded state for a section
//   const toggleSection = (title) => {
//     setExpandedSection(prev => (prev === title ? null : title));
//   };

//   // Render each section (date) in the FlatList
//   const renderSection = ({ item }) => (
//     <View className="mb-4">
//       {/* TouchableOpacity to handle section expansion */}
//       <TouchableOpacity
//         onPress={() => toggleSection(item.title)}
//         className="p-2 bg-blue-100"
//       >
//         <Text className="text-lg font-bold text-blue-900">{item.title}</Text>
//       </TouchableOpacity>
      
//       {/* Conditionally render TaskList based on expanded state */}
//       {expandedSection === item.title && (
//         <TaskList
//           tasks={item.data}
//           selectedDate={item.title}
//         />
//       )}
//     </View>
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider style={{ flex: 1 }}>
//         <View className="flex-1">
//           <Text className="text-2xl font-bold text-center p-4 text-blue-900">My Tasks</Text>
//           <FlatList
//             data={taskSections}
//             keyExtractor={(item) => item.title}
//             renderItem={renderSection}
//           />
//         </View>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default Home;

