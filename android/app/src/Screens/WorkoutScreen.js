import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export default function WorkoutScreen({ navigation }) {
  const [workoutName, setWorkoutName] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);

  const addExercise = () => {
    if (exercise) {
      setExercises([...exercises, exercise]);
      setExercise('');
    }
  };

  const saveWorkout = () => {
    if (workoutName && exercises.length > 0) {
      firestore()
        .collection('workouts')
        .add({
          userId: auth().currentUser.uid,
          name: workoutName,
          exercises: exercises.map(ex => ({ name: ex, sets: [] })),
        })
        .then(() => {
          setWorkoutName('');
          setExercises([]);
          navigation.navigate('Home');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <TextInput
        style={styles.input}
        placeholder="Exercise"
        value={exercise}
        onChangeText={setExercise}
      />
      <Button title="Add Exercise" onPress={addExercise} />
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{item}</Text>
          </View>
        )}
      />
      <Button title="Save Workout" onPress={saveWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  exerciseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  exerciseText: {
    fontSize: 18,
  },
});
