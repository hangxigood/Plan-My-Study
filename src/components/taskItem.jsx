import { Button, SafeAreaView, Text, View } from "react-native";
import styles from '../styles/styles';

export default function TaskItem({ taskObj, onCompletion, onDeletion, onEdit }) {
  let { completed, date, title, id } = taskObj;

  // Format date to a readable string
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <SafeAreaView>
      <View style={styles.taskItem}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={completed ? styles.completedTask : styles.uncompletedTask}>{title}</Text>
        <Text style={styles.statusText}>
          {completed ? 'Completed' : 'Incomplete'}
        </Text>
      </View>
      <View style={styles.taskActions}>
        <Button
          title={completed ? 'Undo' : 'Complete'}
          onPress={() => onCompletion(id)}
        />
        <Button title="Edit" onPress={() => onEdit(id)} />
        <Button title="Delete" color="red" onPress={() => onDeletion(id)} />
      </View>
    </SafeAreaView>
  );
}
