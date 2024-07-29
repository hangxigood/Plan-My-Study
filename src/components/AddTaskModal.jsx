import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTaskContext } from '../contexts/TaskContext';
import dayjs from 'dayjs';

// AddTaskModal component: Modal for adding a new task
const AddTaskModal = ({ isVisible, onClose, defaultDate }) => {
  // Initialize the local date with the default date
  const localDate = new Date();
  localDate.setFullYear(new Date(defaultDate).getUTCFullYear());
  localDate.setMonth(new Date(defaultDate).getUTCMonth());
  localDate.setDate(new Date(defaultDate).getUTCDate());

  const { addNewTask } = useTaskContext(); // Use the TaskContext to access the addNewTask function
  const [title, setTitle] = useState(''); // State for the task title
  const [dueDate, setDueDate] = useState(localDate); // State for the due date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage the visibility of the date picker

  // useEffect to update the due date whenever the default date changes
  useEffect(() => {
    setDueDate(new Date(localDate));
  }, [defaultDate]);

  // Function to handle adding a new task
  const handleAddTask = async () => {
    if (!title) {
      alert('Please enter a task title.');
      return;
    }
    try {
      // Format the due date to 'YYYY-MM-DD' string
      const formattedDueDate = dueDate ? dayjs(dueDate.toUTCString()).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
      console.log("Formatted due date:", formattedDueDate);
      // Add the new task
      await addNewTask({
        title: title.trim(), // Trim any whitespace and ensure it's a string
        dueDate: formattedDueDate
      });
      // Reset the input fields
      setTitle('');
      setDueDate(new Date(localDate));
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Failed to add task. Please try again.');
    }
  };

  // Function to handle date change from the date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate); // Update the due date state
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose} // Handle request to close the modal
    >
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        {/* Modal content container */}
        <View className="bg-white p-4 rounded-t-3xl">
          <Text className="text-2xl font-bold mb-4">Add New Task</Text>
          {/* TextInput for task title */}
          <TextInput
            className="border border-gray-400 p-2 rounded-lg mb-4"
            placeholder="Task title"
            value={title}
            onChangeText={setTitle} // Update the title state
          />
          {/* Button to show date picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-400 p-2 rounded-lg mb-4"
          >
            {/* Display the selected due date */}
            <Text>{dueDate.toDateString()}</Text> 
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={handleDateChange} // Handle date change
            />
          )}
          <View className="flex-row justify-end">
            {/* Cancel button */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-400 py-2 px-4 rounded-lg mr-2"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Add Task button */}
            <TouchableOpacity
              onPress={handleAddTask}
              className="bg-blue-500 py-2 px-4 rounded-lg"
            >
              <Text className="text-white">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    </Modal>
  );
};

export default AddTaskModal;
