// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { openDatabase, fetchTasks, addTask, updateTask, deleteTask } from './database';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const setupDatabase = async () => {
      await openDatabase();
      refreshTasks();
    };
    setupDatabase();
  }, []);

  const refreshTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const handleAddTask = async () => {
    if (!title) return;
    await addTask(title, description);
    setTitle('');
    setDescription('');
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

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={item.completed ? styles.completedTask : null}>{item.title}</Text>
      <View style={styles.taskActions}>
        <Button title={item.completed ? "Undo" : "Complete"} onPress={() => handleUpdateTask(item.id, item.completed)} />
        <Button title="Delete" onPress={() => handleDeleteTask(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    </View>
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
});

export default App;