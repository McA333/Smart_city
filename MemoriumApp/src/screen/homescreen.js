import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Parking Paris</Text>
      <Button
        title="Voir la carte"
        onPress={() => navigation.navigate('ParkingMap')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // occupe tout l'écran
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff', // fond blanc
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
