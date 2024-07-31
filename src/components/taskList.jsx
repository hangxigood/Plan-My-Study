import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import dayjs from 'dayjs';

// TaskList component: Displays a list of tasks for a selected date and allows adding new tasks
const TaskList = ({ tasks, selectedDate }) => {
  const { updateTaskStatus, removeTask } = useTaskContext(); // Use the TaskContext to access functions for updating and removing tasks
  const [isAddModalVisible, setAddModalVisible] = useState(false); // State to manage the visibility of the AddTaskModal

  // Function to handle the press event for adding a new task
  const onAddTaskPress = () => {
    console.log("Adding new task for date:", selectedDate);
    setAddModalVisible(true); // Show the AddTaskModal
  };

  // Function to toggle the completion status of a task
  const handleToggleComplete = (id) => {
    const task = tasks.find(task => task.id === id); // Find the task by ID
    if (task) {
      updateTaskStatus(id, !task.completed); // Update the task's completion status
    }
  };

  // Function to handle deleting a task
  const handleDelete = (id) => {
    removeTask(id); // Remove the task by ID
  };

  // If there are no tasks and no selected date, set selectedDate to today's date
  if (tasks.length === 0 && selectedDate === '') {
    console.log("No tasks found for date:", selectedDate);
    selectedDate = dayjs().format('YYYY-MM-DD'); // Set selectedDate to today's date

    // Return a view with a button to add a new task and the AddTaskModal
    return (
      <View>
        <TouchableOpacity
          className="bg-white p-4 my-2"
          onPress={onAddTaskPress} // Handle adding a new task
        >
          <Text className="text-lg text-gray-500">New task for {selectedDate}</Text>
        </TouchableOpacity>

        {/* AddTaskModal to add a new task */}
        <AddTaskModal
          isVisible={isAddModalVisible}
          onClose={() => setAddModalVisible(false)} // Close the modal
          defaultDate={selectedDate} // Default date for the new task
        />
      </View>
    );
  }

  // Return the main view with the task list and button to add a new task
  return (
    <View className="flex-1">
      {/* FlatList to render the list of tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={handleToggleComplete} // Handle toggling task completion
            onDelete={handleDelete} // Handle deleting a task
          />
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure unique key for each item
        contentContainerStyle={{ paddingHorizontal: 16 }} // Add horizontal padding to the list
      />

      {/* Button to add a new task */}
      <TouchableOpacity
        className="bg-white p-4 my-2"
        onPress={onAddTaskPress} // Handle adding a new task
      >
        <Text className="text-lg text-gray-500">New task for {selectedDate}</Text>
      </TouchableOpacity>

      {/* AddTaskModal to add a new task */}
      <AddTaskModal
        isVisible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)} // Close the modal
        defaultDate={selectedDate} // Default date for the new task
      />
    </View>
  );
};

export default TaskList;