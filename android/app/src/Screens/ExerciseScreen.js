import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { firestore } from '@react-native-firebase/firestore';

export default function ExerciseScreen({ route }) {
  const { exercise, workoutId } = route.params;
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState([]);
  const [description, setDescription] = useState('');
  const [tutorial, setTutorial] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('workouts')
      .doc(workoutId)
      .onSnapshot(doc => {
        const workout = doc.data();
        const exerciseData = workout.exercises.find(ex => ex.name === exercise);
        if (exerciseData) {
          setSets(exerciseData.sets);
        }
      });

    const fetchExerciseDetails = async () => {
      const exerciseDoc = await firestore().collection('exercises').doc(exercise).get();
      if (exerciseDoc.exists) {
        const { description, tutorial } = exerciseDoc.data();
        setDescription(description);
        setTutorial(tutorial);
      }
    };

    fetchExerciseDetails();

    return () => unsubscribe();
  }, []);

  const addSet = () => {
    if (reps && weight) {
      const newSet = { reps, weight };
      firestore()
        .collection('workouts')
        .doc(workoutId)
        .update({
          exercises: firestore.FieldValue.arrayUnion({
            name: exercise,
            sets: firestore.FieldValue.arrayUnion(newSet),
          }),
        })
        .then(() => {
          setReps('');
          setWeight('');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.tutorial}>{tutorial}</Text>
      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Add Set" onPress={addSet} />
      <FlatList
        data={sets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.setItem}>
            <Text style={styles.setText}>Set {index + 1}: {item.reps} reps, {item.weight} kg</Text>
          </View>
        )}
      />
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
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  tutorial: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  setItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  setText: {
    fontSize: 18,
  },
});
