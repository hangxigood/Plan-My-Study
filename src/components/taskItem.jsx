import { Button, SafeAreaView, Text, View } from "react-native";
import styles from '../styles/styles';

const TaskItem = ({ taskObj, onCompletion, onDeletion, onEdit }) => {
  let {completed, date, title, description} = taskObj;

  return (
    <SafeAreaView>
      <View>
        {/* date, title, completed status */}
        <Text>{date}</Text>
        <Text>{title}</Text>
        <Text style={completed ? styles.completedTask : styles.incomplete}>
          {completed ? 'Completed' : 'Incomplete'}
        </Text>
      </View>
      <View>
        {/* edit the completed status & delete the current task */}
        <Button
          title={completed ? 'Undo' : 'Complete'}
          onPress={() => onCompletion(id)}
        />
        <Button title="Delete" color="red" onPress={() => onDeletion(id)} />
        <Button title="Edit" onPress={() => onEdit(id)} />
      </View>
    </SafeAreaView>
  );
};

export default TaskItem;
