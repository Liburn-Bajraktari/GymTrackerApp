import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function HomeScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('workouts')
      .where('userId', '==', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const workouts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkouts(workouts);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GymTracker</Text>
      <Button title="Start Workout" onPress={() => navigation.navigate('Workout')} />
      <Button title="Friends" onPress={() => navigation.navigate('Friends')} />
      <FlatList
        data={workouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>{item.name}</Text>
            <Button
              title="Track"
              onPress={() => navigation.navigate('Exercise', { workoutId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  workoutItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  workoutText: {
    fontSize: 18,
  },
});
