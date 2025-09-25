import cron from 'node-cron';
let cache = [];

async function refreshCache() {
  cache = await getParkings();
  console.log('Cache actualisé :', new Date());
}

cron.schedule('*/30 * * * * *', refreshCache); // toutes les 30 s
app.get('/parkings', (req, res) => res.json(cache));
