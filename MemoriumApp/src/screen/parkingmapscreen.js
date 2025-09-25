import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchParkings } from '../api/parkings';

export default function ParkingMapScreen({ navigation }) {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParkings()
      .then((data) => setParkings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Erreur: {error}</Text>;

  const getMarkerColor = (available) => {
    if (available > 50) return 'green';
    if (available > 20) return 'orange';
    return 'red';
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {parkings.map((p) => (
        <Marker
          key={p.id}
          coordinate={{ latitude: p.lat, longitude: p.lon }}
          pinColor={getMarkerColor(p.available)}
          onPress={() => navigation.navigate('ParkingDetail', { parking: p })}
        />
      ))}
    </MapView>
  );
}
