"use client"

import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from "react-native";
import TaskItem from "./taskItem";
import styles from '../styles/styles';

export default function TaskItemList({tasks, onCompletion, onDeletion}) {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const handleSelectTask = (id) => {
        setSelectedTaskId(id);
      };
    
  const renderTaskItem = ({ item }) => (
    <TaskItem
      taskObj={item}
      onCompletion={onCompletion}
      onDeletion={onDeletion}
      selected={item.id === selectedTaskId}
      onSelect={() => handleSelectTask(item.id)}
    />
  );

  return (
    <SafeAreaView>
      {tasks.length === 0 ? (
        <View style={styles.taskItem}>
          <Text style={styles.uncompletedTask}>No tasks found</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}