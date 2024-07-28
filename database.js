import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
SQLite.DEBUG(true);

const database_name = 'TasksApp.db';
const database_key = 'scold by wife'; // secure key

let db = null;

export const openDatabase = async () => {
  if (db) {
    return db;
  }
  try {
    db = await SQLite.openDatabase({
      name: database_name,
      location: 'default',
      key: database_key,
    });
    console.log('Database open successful');
    await initDatabase();
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    return null;
  }
};

const initDatabase = async () => {
  //delete previous table if exists(only for testing)
  await db.executeSql('DROP TABLE IF EXISTS tasks');

  const query = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date DATE,
    completed INTEGER DEFAULT 0
  )`;

  try {
    await db.executeSql(query);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

export const fetchTasks = async () => {
  try {
    const [results] = await db.executeSql('SELECT * FROM tasks');
    return results.rows.raw();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

//add date to task table
export const addTask = async (title, description, date) => {
  try {
    await db.executeSql(
      'INSERT INTO tasks (title, description, date) VALUES (?, ?, ?)',
      [title, description, date.toISOString()],
    );
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = async (id, completed) => {
  try {
    await db.executeSql('UPDATE tasks SET completed = ? WHERE id = ?', [
      completed ? 1 : 0,
      id,
    ]);
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = async id => {
  try {
    await db.executeSql('DELETE FROM tasks WHERE id = ?', [id]);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
