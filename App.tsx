// App.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import Calendar from './src/screens/Calendar';
import Settings from './src/screens/Settings';
import { TaskProvider } from './src/contexts/TaskContext';
import { DarkModeProvider, useDarkMode } from './src/contexts/DarkModeContext';
import BottomNavigation from './src/components/BottomNavigation';

const Tab = createBottomTabNavigator();

// Create a new component that uses the useDarkMode hook
const AppContent = () => {
  const { darkMode } = useDarkMode();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
          tabBar={(props) => <BottomNavigation {...props} />}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Calendar" component={Calendar} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Main App component
const App = () => {
  return (
    <TaskProvider>
      <DarkModeProvider>
        <AppContent />
      </DarkModeProvider>
    </TaskProvider>
  );
};

export default App;
