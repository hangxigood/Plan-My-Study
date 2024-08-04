// TaskContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  openDatabase,
  fetchAllTasks,
  addTask,
  updateTask,
  deleteTask,
  resetTable,
} from '../database';

// Create a context for managing tasks
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTaskContext = () => useContext(TaskContext);

// Provider component to wrap the app and provide task-related functionality
export const TaskProvider = ({children}) => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the database instance
  const [db, setDb] = useState(null);

  // Effect to initialize the database when the component mounts
  useEffect(() => {
    const loadDatabase = async () => {
      try {
        const database = await openDatabase();
        setDb(database);
        loadTasks(database); // Load initial tasks after database initialization
      } catch (error) {
        console.error('Error opening or initializing database:', error);
      }
    };
    loadDatabase();
  }, []);

  // Function to load tasks from the database
  const loadTasks = async database => {
    try {
      const fetchedTasks = await fetchAllTasks(database);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Function to add a new task
  const addNewTask = async newTask => {
    try {
      await addTask(newTask.title, newTask.dueDate, db);
      loadTasks(db); // Reload tasks after adding
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error; // Propagate the error up
    }
  };

  // Function to update a task's status
  const updateTaskStatus = async (id, completed) => {
    try {
      await updateTask(id, completed, db);
      loadTasks(db); // Reload tasks after updating
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Function to remove a task
  const removeTask = async id => {
    try {
      await deleteTask(id, db);
      loadTasks(db); // Reload tasks after deleting
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Function to reset tasks (for testing purposes)
  const resetTasks = async () => {
    try {
      await resetTable();
      loadTasks(db); // Reload tasks after resetting
    } catch (error) {
      console.error('Failed to reset tasks:', error);
    }
  };

  // Provide the context value to children components
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addNewTask,
        updateTaskStatus,
        removeTask,
        resetTasks,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
