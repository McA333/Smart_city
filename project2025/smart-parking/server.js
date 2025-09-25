import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Fonction qui récupère et nettoie les données des parkings parisiens
async function getParisParkings() {
  const url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=parking-public&rows=200';
  const response = await fetch(url);
  const json = await response.json();

  return json.records
    .filter(r => r.fields?.geo_point_2d && r.fields?.places_disponibles !== undefined)
    .map(r => ({
      id: r.recordid,
      name: r.fields.nom,
      address: r.fields.adresse || '',
      total: r.fields.places,
      available: r.fields.places_disponibles,
      lat: r.fields.geo_point_2d[0],
      lon: r.fields.geo_point_2d[1],
      updated_at: r.record_timestamp
    }));
}

// Endpoint principal
app.get('/parkings', async (req, res) => {
  try {
    const parkings = await getParisParkings();
    res.json(parkings);
  } catch (err) {
    console.error('Erreur récupération parkings:', err);
    res.status(500).json({ error: 'Impossible de récupérer les données' });
  }
});

app.get('/', (req, res) => {
  res.send('Smart Parking API – Paris');
});

app.listen(PORT, () => {
  console.log(` Smart Parking API en ligne sur port ${PORT}`);
});
