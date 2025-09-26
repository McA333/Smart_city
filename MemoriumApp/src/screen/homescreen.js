import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#ffffff', '#e8f0ff']}  
      style={styles.container}
    >
      {/* Zone centrale : titre + sous-titre + bouton */}
      <View style={styles.centerBlock}>
        <Text style={styles.title}>SmartCity Parking</Text>
        <Text style={styles.subtitle}>
          Trouvez une place libre en temps réel à Paris
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ParkingMap')}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>

      {/* Pied de page */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Données temps réel – Saemes & Paris
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',  
  },
  centerBlock: {
    flex: 1,
    justifyContent: 'center',   
    alignItems: 'center',             
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0000FF',             
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#4a6572',
    textAlign: 'center',
    marginBottom: 40,                
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0000FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#4a6572',
    textAlign: 'center',
  },
});
