import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDarkMode } from '../contexts/DarkModeContext';

const TaskList = ({ selectedDate }) => {
  const { tasks, updateTaskStatus, removeTask } = useTaskContext();
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const { darkMode } = useDarkMode();

  // Determine the date to use (either selectedDate or today's date)
  const dateToUse = selectedDate || dayjs().format('YYYY-MM-DD');

  // Filter tasks based on the dateToUse
  const filteredTasks = useMemo(() => tasks.filter(task => task.dueDate === dateToUse), [tasks, dateToUse]);

  // Function to handle the press event for adding a new task
  const onAddTaskPress = () => {
    setAddModalVisible(true);
  };

  // Function to toggle the completion status of a task
  const handleToggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      updateTaskStatus(id, !task.completed);
    }
  };

  // Function to handle deleting a task
  const handleDelete = (id) => {
    removeTask(id);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 55, backgroundColor: darkMode ? '#1f2937' : '#f3f4f6' }}>
      <ScrollView>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              darkMode={darkMode}  // Pass darkMode prop to TaskItem
            />
          ))
        ) : (
          <Text style={{ padding: 16, color: darkMode ? '#ffffff' : '#000000' }}>No tasks for this date</Text>
        )}
      </ScrollView>

      <TouchableOpacity onPress={onAddTaskPress}>
  <View
    style={{
      backgroundColor: darkMode ? '#374151' : 'white',
      padding: 16,
      marginVertical: 8,
      borderRadius: 80, 
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text style={{ fontSize: 18, color: darkMode ? '#ffffff' : 'gray' }}>
      Add New task for {dateToUse}
    </Text>
  </View>
</TouchableOpacity>


      <AddTaskModal
        isVisible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        defaultDate={dateToUse}
        darkMode={darkMode}  // Pass darkMode prop to AddTaskModal
      />
    </SafeAreaView>
  );
};

export default React.memo(TaskList);
