import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
// Assurez-vous d'avoir installé : npm install react-native-vector-icons

export default function ParkingDetail({ route }) {
    const parking = route.params?.parking || {};

    const openMaps = () => {
        if (parking.lat && parking.lon) {
            // Lien universel pour ouvrir dans Google Maps ou Apple Maps
            const url = `http://maps.apple.com/?daddr=${parking.lat},${parking.lon}`;
            Linking.openURL(url);
        }
    };
    const DetailRow = ({ icon, label, value }) =>
        (value !== null && value !== 0 && value !== '') ? (
            <View style={styles.detailRow}>
                <Ionicons name={icon} size={20} color="#007AFF" style={styles.detailIcon} />
                <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>{label}</Text>
                    <Text style={styles.detailValue}>{String(value)}</Text>
                </View>
            </View> ) : null;
    //MES DONNES TYPES COMMMMMPACTTTT
    const capacityData = [
        { label: "Capacité Totale", value: parking.capacity, icon: "cube-outline" },
        { label: "Places Voiture", value: parking.car_spaces, icon: "car-outline" },
        { label: "Places Moto", value: parking.moto_spaces, icon: "bicycle-outline" },
        { label: "Places PMR", value: parking.pmr_spaces, icon: "accessibility-outline" },];
    const serviceData = [
        { label: "Hauteur max", value: parking.height_max, icon: "resize-outline" },
        { label: "Bornes Électriques", value: parking.ev_chargers, icon: "flash-outline" },
        { label: "Horaires", value: parking.access_hours, icon: "time-outline" },
        { label: "Gestionnaire", value: parking.operator, icon: "people-outline" },
        { label: "Téléphone", value: parking.phone, icon: "call-outline" },
        { label: "Site web", value: parking.website, icon: "globe-outline" }, ];
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{parking.name || 'Détails du Parking'}</Text>
            <Text style={styles.subtitle}>{parking.address} ({parking.arrondissement})</Text>

            {/* SECTION: PLACES ET CAPACITÉ */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Capacité et Aménagements</Text>
                {capacityData.map((item, index) => <DetailRow key={index} {...item} />)}
            </View>
            {/* SECTION: INFOS PRATIQUES */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informations Pratiques</Text>
                {serviceData.map((item, index) => <DetailRow key={index} {...item} />)}
                {/* Ligne Mise à Jour séparée */}
                <DetailRow
                    icon="refresh-outline"
                    label="Dernière Mise à Jour"
                    value={parking.updated_at ? new Date(parking.updated_at).toLocaleString('fr-FR') : null}
                />
            </View>

            {/* BOUTON D'ACTION */}
            <TouchableOpacity style={styles.cta} onPress={openMaps}>
                <Text style={styles.ctaText}>Itinéraire </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#ffffffd3', minHeight: '100%' },
    title: { 
        fontSize: 24, 
        fontWeight: '900', 
        color: '#000000ff', 
        marginBottom: 4 
    },
    subtitle: {
        fontSize: 16,
        color: '#607297ff',
        marginBottom: 20,
    },
    
    // --- Styles de section ---
    section: {
        backgroundColor: '#f9f9f9ff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        borderBottomWidth: 1,
        borderBottomColor: '#030404ff',
        paddingBottom: 10,
        marginBottom: 10,
    },
    
    // --- Styles de ligne détaillée (Row) ---
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2c44a3ff',
    },
    detailIcon: {
        marginRight: 15,
        width: 20,
    },
    detailContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: { 
        fontSize: 15, 
        color: '#6b7280', 
    },
    detailValue: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#111827',
        maxWidth: '50%',
        textAlign: 'right',
    },
    cta: {
        marginTop: 24,
        backgroundColor: '#0000ff', // Bleu Apple moderne
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#3d4098ff',
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    ctaText: { 
        color: '#ffffffff', 
        fontSize: 18, 
        fontWeight: '700' 
    },
});