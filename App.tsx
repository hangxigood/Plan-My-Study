import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importing the navigation container to manage the app's navigation state
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importing bottom tab navigator for tab-based navigation
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Importing safe area provider to handle safe area insets for devices with notches or rounded corners
import Home from './src/screens/Home'; // Importing the Home screen component
import Calendar from './src/screens/Calendar'; // Importing the Calendar screen component
import Settings from './src/screens/Settings'; // Importing the Settings screen component
import { TaskProvider } from './src/contexts/TaskContext'; // Importing the TaskProvider to manage global task state

// Creating a bottom tab navigator
const Tab = createBottomTabNavigator();

// Main App component
const App = () => {
  return (
    // Wrapping the app with TaskProvider to provide global task state
    <TaskProvider>
      {/* SafeAreaProvider ensures that the content avoids the notches, status bars, etc. */}
      <SafeAreaProvider>
        {/* NavigationContainer is the root component for navigation */}
        <NavigationContainer>
          {/* Configuring the bottom tab navigator */}
          <Tab.Navigator
            screenOptions={{
              // Hiding the header for all screens
              headerShown: false,
            }}
            // Setting the initial screen to be displayed when the app launches
            initialRouteName="Home"
          >
            {/* Defining the screens in the bottom tab navigator */}
            <Tab.Screen name="Home" component={Home} /> 
            <Tab.Screen name="Calendar" component={Calendar} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </TaskProvider>
  );
};

export default App; // Exporting the App component as the default export
