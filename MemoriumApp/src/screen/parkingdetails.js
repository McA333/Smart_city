import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function ParkingDetail({ route }) {
  const p = route.params?.parking || {};

  const openMaps = () => {
    if (p.lat && p.lon) {
      const url = `http://maps.apple.com/?daddr=${p.lat},${p.lon}`;
      Linking.openURL(url);
    }
  };

  const Row = ({ label, value }) =>
    value ? (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{String(value)}</Text>
      </View>
    ) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{p.name}</Text>

      <Row label="Adresse" value={p.address} />
      <Row label="Arrondissement" value={p.arrondissement} />
      <Row label="Gestionnaire" value={p.operator} />
      <Row label="Horaires" value={p.access_hours} />
      <Row label="Capacité totale" value={p.capacity} />
      <Row label="Places auto" value={p.car_spaces} />
      <Row label="Places moto" value={p.moto_spaces} />
      <Row label="Places vélo" value={p.bike_spaces} />
      <Row label="Places PMR" value={p.pmr_spaces} />
      <Row label="Bornes électriques" value={p.ev_chargers} />
      <Row label="Hauteur max" value={p.height_max} />
      <Row label="Tarifs" value={p.prices} />
      <Row label="Téléphone" value={p.phone} />
      <Row label="Site web" value={p.website} />
      <Row
        label="Mise à jour"
        value={p.updated_at ? new Date(p.updated_at).toLocaleString() : null}
      />

      <TouchableOpacity style={styles.cta} onPress={openMaps}>
        <Text style={styles.ctaText}>Y aller</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 16 },
  row: { marginBottom: 10 },
  label: { fontSize: 13, color: '#6b7280' },
  value: { fontSize: 16, fontWeight: '600', color: '#111827' },
  cta: {
    marginTop: 24,
    backgroundColor: '#0000FF',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
