export async function fetchParkings() {
  const url =
    'https://opendata.saemes.fr/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes&rows=200';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur API Saemes: ${response.status}`);
    }

    const data = await response.json();

    return (data.records || []).map((r) => ({
      id: r.recordid,
      name: r.fields.nom_parking,
      type: r.fields.countertype,
      available: r.fields.counterfreeplaces,
      lat: r.fields.geo?.[0],
      lon: r.fields.geo?.[1],
      updated_at: r.record_timestamp,
      access_hours:
        r.fields.horaires_d_acces_au_public_pour_les_usagers_non_abonnes || '',
    }));
  } catch (error) {
    console.error('fetchParkings error:', error);
    throw error;
  }
}
