// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { openDatabase, fetchTasks, addTask, updateTask, deleteTask } from './database';

import TaskItem from './src/components/taskItem';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  useEffect(() => {
    const setupDatabase = async () => {
      await openDatabase();
      refreshTasks();
    };
    setupDatabase();
  }, []);

  const refreshTasks = async () => {
    const fetchedTasks = await fetchTasks();
    console.log('Fetched tasks:', fetchedTasks);
    setTasks(fetchedTasks);
  };

  const handleAddTask = async () => {
    if (!title) return;
    console.log('Adding task with date:', date);
    await addTask(title, description, date);
    setTitle('');
    setDescription('');
    setDate(new Date());
    refreshTasks();
  };

  const handleUpdateTask = async (id, completed) => {
    await updateTask(id, completed);
    refreshTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    refreshTasks();
  };
  
  const handleEditTask = async (id, title, date) => {
    await updateTask(id, title, date);
    refreshTasks();
  }

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      if (currentDate instanceof Date) {
        setDate(currentDate);
      }
      setShowDatePicker(false); 
    } else if (event.type === 'dismissed') {
      setShowDatePicker(false); 
    }
  };

  const handleTextInputFocus = () => {
    setShowDatePicker(true);
  };

  // const renderTask = ({ item }) => (
  //   <View style={styles.taskItem}>
  //     <Text style={item.completed ? styles.completedTask : null}>{item.title}</Text>
  //     <View style={styles.taskActions}>
  //       <Button title={item.completed ? "Undo" : "Complete"} onPress={() => handleUpdateTask(item.id, item.completed)} />
  //       <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="red" />
  //     </View>
  //   </View>
  // );

  const renderTask = ({ item }) => (
    <TaskItem
      taskObj={item}
      onCompletion={handleUpdateTask}
      onDeletion={handleDeleteTask}
      onEdit={handleEditTask}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Selected date"
        value={date.toLocaleDateString()}
        onFocus={handleTextInputFocus}
        editable={true}
      />
      <View style={styles.datePickerContainer}>
        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskActions: {
    flexDirection: 'row',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white', 
  },
});

export default App;