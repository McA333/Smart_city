export async function fetchParkings() {
  const url =
    'https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-en-ouvrage&rows=500';

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur API Paris: ${res.status}`);
  const data = await res.json();

  return (data.records || [])
    .map((r) => {
      const f = r.fields || {};
      return {
        id: r.recordid,
        source: 'ouvrage',

        // Identité
        name: f.nom || f.nom_parking || f.libelle || 'Parking',
        address:
          f.adresse ||
          f.adresse_postale ||
          [f.numero_voie, f.type_voie, f.nom_voie].filter(Boolean).join(' ') ||
          '',
        arrondissement: f.arrondissement || f.arrond || null,
        operator: f.gestionnaire || f.exploitant || f.operateur || null,

        // Capacités / équipements
        capacity:
          f.capacite_totale || f.capacite || f.nb_places || f.capacite_tot || null,
        car_spaces: f.nb_places_auto || f.nb_places_voiture || null,
        moto_spaces: f.nb_places_deux_roues_motorises || f.nb_places_moto || null,
        bike_spaces: f.nb_places_velo || f.nb_places_velos || null,
        pmr_spaces: f.nb_places_pmr || f.nb_places_handicapes || null,
        ev_chargers:
          f.nb_places_electriques ||
          f.nb_bornes_recharge ||
          f.irve_nb ||
          null,
        height_max: f.hauteur_max || f.hauteur_limite || null,

        // Services / accès / tarifs
        website: f.site_web || f.url || null,

        // Géoloc
        lat: f.geo_point_2d?.[0] ?? f.geo?.[0],
        lon: f.geo_point_2d?.[1] ?? f.geo?.[1],

        // Métadonnées
        updated_at: r.record_timestamp,
      };
    })
    // garde seulement ceux qui ont une géolocalisation
    .filter((p) => typeof p.lat === 'number' && typeof p.lon === 'number');
}
