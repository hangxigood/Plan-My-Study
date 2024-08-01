// database.js

import SQLite from 'react-native-sqlite-storage';

// Enable promises for SQLite operations
SQLite.enablePromise(true);
// Enable debugging for SQLite operations
SQLite.DEBUG(true);

// Define database name and encryption key
const database_name = "TasksApp.db";
const database_key = "your_secure_key_here"; // Replace with a secure key

// Variable to hold the database instance
let db = null;

// Function to open or return the existing database connection
export const openDatabase = async () => {
  if (db) {
    return db;
  }
  try {
    // Open the database with encryption
    db = await SQLite.openDatabase({
      name: database_name,
      location: 'default',
      key: database_key,
    });
    console.log("Database open successful");
    // Initialize the database schema
    await initDatabase();
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
    return null;
  }
};

// Function to initialize the database schema
export const initDatabase = async () => {
  const query = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    dueDate TEXT,
    completed INTEGER DEFAULT 0
  )`;

  try {
    await db.executeSql('DROP TABLE IF EXISTS tasks');
    await db.executeSql(query);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Function to add a new task to the database
export const addTask = async (title, dueDate) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tasks (title, dueDate, completed) VALUES (?, ?, 0)',
        [title, dueDate],
        (_, result) => {
          console.log("Task added successfully");
          resolve(result);
        },
        (_, error) => {
          console.error("Error adding task:", error);
          reject(error);
        }
      );
    });
  });
};

// Function to update a task's completion status
export const updateTask = async (id, completed) => {
  try {
    await db.executeSql('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Function to delete a task from the database
export const deleteTask = async (id) => {
  try {
    // Ensure id is a number
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      throw new Error('Invalid task ID');
    }
    
    await db.executeSql('DELETE FROM tasks WHERE id = ?', [taskId]);
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

// Function to fetch all tasks from the database
export const fetchAllTasks = async () => {
  try {
    const [results] = await db.executeSql('SELECT * FROM tasks ORDER BY dueDate ASC, id ASC');
    return results.rows.raw();
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    return [];
  }
};

// Function to reset the tasks table (for testing purposes)
export const resetTable = async () => {
  try {
    await db.executeSql('DROP TABLE IF EXISTS tasks');
    console.log("Tasks deleted successfully");
    await initDatabase(); // Re-initialize the database schema
  } catch (error) {
    console.error("Error resetting tasks:", error);
  }
};