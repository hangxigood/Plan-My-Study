import { View, Text, TouchableOpacity } from 'react-native';

// TaskItem component: Renders an individual task with options to toggle completion and delete the task
const TaskItem = ({ task, onToggleComplete, onDelete }) => (
  <View className="flex-row justify-between items-center bg-white p-4 mb-2">
    {/* TouchableOpacity to handle task completion toggle */}
    <TouchableOpacity onPress={() => onToggleComplete(task.id)} className="flex-1">
      {/* Display the task title with conditional styling based on its completion status */}
      <Text className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
        {task.title}
      </Text>
    </TouchableOpacity>

    {/* TouchableOpacity to handle task deletion */}
    <TouchableOpacity onPress={() => onDelete(task.id)} className="ml-4">
      <Text className="text-red-500">Delete</Text>
    </TouchableOpacity>
  </View>
);

export default TaskItem;
