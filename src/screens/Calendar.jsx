import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDarkMode } from '../contexts/DarkModeContext';

const Calendar = () => {
  const { tasks } = useTaskContext();
  const { darkMode } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const marked = {};
    tasks.forEach(task => {
      if (marked[task.dueDate]) {
        marked[task.dueDate].dots.push({ color: 'blue' });
      } else {
        marked[task.dueDate] = { dots: [{ color: 'blue' }] };
      }
    });
    setMarkedDates(marked);
  }, [tasks]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const tasksForSelectedDate = tasks.filter(task => task.dueDate === selectedDate);

  return (
    <SafeAreaProvider className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Text className={`text-2xl font-bold text-center py-4 ${darkMode ? 'text-white' : 'text-blue-600'}`}>Calendar</Text>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          }
        }}
        theme={{
          calendarBackground: darkMode ? 'black' : 'white',
          dayTextColor: darkMode ? 'white' : 'black',
          textDisabledColor: darkMode ? 'gray' : '#d9e1e8',
        }}
        markingType={'multi-dot'}
      />
      <TaskList 
        tasks={tasksForSelectedDate} 
        selectedDate={selectedDate} 
      />
    </SafeAreaProvider>
  );
};

export default Calendar;
