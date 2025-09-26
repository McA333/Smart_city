import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchParkings } from '../api/parkings';

export default function ParkingMapScreen({ navigation }) {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchParkings()
      .then((data) => setParkings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Erreur : {error}</Text>;

  const filtered = parkings.filter((p) =>
    (p.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const getMarkerColor = (available) => {
    if (available > 50) return 'green';
    if (available > 20) return 'orange';
    return 'red';
  };

  return (
    <View style={{ flex: 1 }}>
      {/* --- Carte principale --- */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {filtered.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lon }}
            pinColor={getMarkerColor(p.available)}
            onPress={() => navigation.navigate('ParkingDetail', { parking: p })}
          />
        ))}
      </MapView>

      {/* --- Bandeau bas recherche + liste --- */}
      <View style={styles.bottomPanel}>
        <TextInput
          placeholder="Recherche Parking"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#888"
        />

        <FlatList
          data={filtered.slice(0, 5)} // limite à 5 résultats pour l'affichage
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate('ParkingDetail', { parking: item })
              }
            >
              <Text style={styles.listName}>{item.name || 'Nom inconnu'}</Text>
              <Text style={styles.listDistance}>
                {item.available ?? 0} places libres
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  listDistance: {
    color: '#666',
    marginTop: 2,
  },
});
