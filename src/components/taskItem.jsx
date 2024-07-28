import React from 'react';
import { Text, View, Button, TouchableOpacity } from "react-native";
import styles from '../styles/styles';

export default function TaskItem({ taskObj, onCompletion, onDeletion, onSelect, selected }) {
  let { completed, date, title, id } = taskObj;

  // Format date to a readable string
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => onSelect(id)}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={completed ? styles.completedTask : styles.uncompletedTask}>{title}</Text>
        <Text style={styles.statusText}>
          {completed ? 'Completed' : 'Incomplete'}
        </Text>
      </TouchableOpacity>
      {selected && (
        <View style={styles.taskActions}>
          <Button
            title={completed ? 'Undo' : 'Complete'}
            onPress={() => onCompletion(id, !completed)}
          />
          <Button title="Delete" color="red" onPress={() => onDeletion(id)} />
        </View>
      )}
    </View>
  );
}