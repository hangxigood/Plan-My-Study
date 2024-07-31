// screens/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Calendar component: Screen displaying a calendar view with task markers and task list
const Calendar = () => {
  const { tasks } = useTaskContext(); // Use the TaskContext to access tasks
  const [selectedDate, setSelectedDate] = useState(''); // State to store the currently selected date
  const [markedDates, setMarkedDates] = useState({}); // State to store dates with task markers

  // useEffect to mark dates with tasks whenever the tasks list changes
  useEffect(() => {
    const marked = {};
    tasks.forEach(task => {
      // Check if the date already has a marker, if so, add a new dot
      if (marked[task.dueDate]) {
        marked[task.dueDate].dots.push({ color: 'blue' });
      } else {
        // If no marker exists for the date, create a new marker with a blue dot
        marked[task.dueDate] = { dots: [{ color: 'blue' }] };
      }
    });
    setMarkedDates(marked); // Update the markedDates state
  }, [tasks]); // Dependency array to re-run the effect when tasks change

  // Function to handle day press events on the calendar
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Set the selected date state to the pressed date
  };

  // Filter tasks to get tasks for the currently selected date
  const tasksForSelectedDate = tasks.filter(task => task.dueDate === selectedDate);

  return (
    <SafeAreaProvider className="flex-1 bg-gray-100">
      {/* Header text */}
      <Text className="text-2xl font-bold text-center py-4 text-blue-600">Calendar</Text>
      
      {/* Calendar component to display dates and handle date selection */}
      <RNCalendar
        onDayPress={handleDayPress} // Function to handle day press
        markedDates={{
          ...markedDates, // Spread existing marked dates
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          }
        }}
        markingType={'multi-dot'} // Type of marking to support multiple dots
      />

      {/* TaskList component to display tasks for the selected date */}
      <TaskList 
        tasks={tasksForSelectedDate} 
        selectedDate={selectedDate} 
      />
    </SafeAreaProvider>
  );
};

export default Calendar;
