import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import dayjs from 'dayjs'; // Ensure you have dayjs installed
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskList = ({ selectedDate }) => {
  const { tasks, updateTaskStatus, removeTask } = useTaskContext();
  const [isAddModalVisible, setAddModalVisible] = useState(false);

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
    <SafeAreaView style={{ flex: 1, paddingBottom: 55 }}>
      <ScrollView>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Text style={{ padding: 16}}>No tasks for this date</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 16, marginVertical: 8 }}
        onPress={onAddTaskPress}
      >
        <Text style={{ fontSize: 18, color: 'gray' }}>New task for {dateToUse}</Text>
      </TouchableOpacity>

      <AddTaskModal
        isVisible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        defaultDate={dateToUse}
      />
    </SafeAreaView>
  );
};

export default React.memo(TaskList);
