import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchParkings } from '../api/fetchParkings';

const { height } = Dimensions.get('window');

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

  return (
    <View style={styles.container}>
      {/* --- Carte --- */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filtered.map((p) =>
          p.lat && p.lon ? (
             <ion-icon name="car-outline">
            <Marker
              key={p.id}
              coordinate={{ latitude: p.lat, longitude: p.lon }}
              pinColor="#0000FF"
              title={p.name}
              description="Stationnement en ouvrage"
              onPress={() =>
                navigation.navigate('ParkingDetail', { parking: p })
              }
            />
            </ion-icon>
          ) : null
        )}
      </MapView>

      {/* --- Bandeau liste/search semi-transparent au-dessus --- */}
      <View style={styles.bottomPanel}>
        <TextInput
          placeholder="Recherche parking"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <FlatList
          data={filtered.slice(0, 20)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate('ParkingDetail', { parking: item })
              }
            >
              <Text style={styles.listName}>{item.name}</Text>
              <Text style={styles.listDistance}>Stationnement en ouvrage</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1, 
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.35,
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
