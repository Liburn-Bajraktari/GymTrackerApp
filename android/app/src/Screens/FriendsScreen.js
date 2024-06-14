import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('friends')
      .onSnapshot(querySnapshot => {
        const friends = querySnapshot.docs.map(doc => doc.data());
        setFriends(friends);
      });

    return () => unsubscribe();
  }, []);

  const addFriend = () => {
    if (email) {
      firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const friendId = querySnapshot.docs[0].id;
            firestore()
              .collection('users')
              .doc(auth().currentUser.uid)
              .collection('friends')
              .doc(friendId)
              .set({ email })
              .then(() => {
                setEmail('');
              });
          } else {
            Alert.alert('Friend not found');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <TextInput
        style={styles.input}
        placeholder="Friend's Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Add Friend" onPress={addFriend} />
      <FlatList
        data={friends}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendText}>{item.email}</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  friendItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  friendText: {
    fontSize: 18,
  },
});
