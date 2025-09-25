import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ParkingDetailScreen({ route }) {
  const { parking } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{parking.name}</Text>
      <Text>Type: {parking.type}</Text>
      <Text>Places disponibles: {parking.available}</Text>
      <Text>Accès: {parking.access_hours}</Text>
      <Text>Mise à jour: {new Date(parking.updated_at).toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
