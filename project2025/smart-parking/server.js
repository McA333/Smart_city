import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Récupère et structure les données Saemes
async function getParisParkings() {
  const url =
    'https://opendata.saemes.fr/api/records/1.0/search/?dataset=places-disponibles-parkings-saemes&rows=200';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Saemes error: ${response.status}`);
  }
  const json = await response.json();

  return json.records.map(r => ({
    id: r.recordid,
    name: r.fields.nom_parking || 'Parking',
    type: r.fields.countertype,                     // type d’emplacement
    available: r.fields.counterfreeplaces,          // places libres en temps réel
    lat: r.fields.geo?.[0],
    lon: r.fields.geo?.[1],
    updated_at: r.record_timestamp,
    access_hours: r.fields.horaires_d_acces_au_public_pour_les_usagers_non_abonnes || ''
  }));
}

// Endpoint racine → renvoie directement les parkings en temps réel
app.get('/', async (req, res) => {
  try {
    const parkings = await getParisParkings();
    res.json(parkings);
  } catch (err) {
    console.error('Erreur récupération parkings:', err);
    res.status(500).json({ error: 'Impossible de récupérer les données en temps réel' });
  }
});

// Endpoint alternatif (optionnel)
app.get('/parkings', async (req, res) => {
  try {
    const parkings = await getParisParkings();
    res.json(parkings);
  } catch (err) {
    console.error('Erreur récupération parkings:', err);
    res.status(500).json({ error: 'Impossible de récupérer les données en temps réel' });
  }
});

app.listen(PORT, () => {
  console.log(` http://localhost:${PORT}`);
});
