const express = require('express');
const ewelink = require('ewelink-api');

const app = express();
const port = process.env.PORT || 3000;

// Pour lire les données JSON dans les requêtes POST
app.use(express.json());

// Configuration eWeLink (remplace avec tes infos)
const email = 'joven@orange.fr';
const password = 'Aqw12zsx*';
const region = 'eu'; // ou 'us', selon ton compte
const deviceId = '10023ef9f7';

let connection;

// Connexion eWeLink à l'ouverture du serveur
(async () => {
  try {
    connection = new ewelink({
      email,
      password,
      region
    });

    const auth = await connection.getCredentials();
    console.log('Connecté à eWeLink ✔️');
  } catch (err) {
    console.error('Erreur de connexion à eWeLink ❌:', err.message);
  }
})();

// Exemple d’API pour allumer un appareil
app.get('/on/:deviceid', async (req, res) => {
  try {
    const response = await connection.setDevicePowerState(req.params.deviceid, 'on');
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exemple d’API pour éteindre un appareil
app.get('/off/:deviceid', async (req, res) => {
  try {
    const response = await connection.setDevicePowerState(req.params.deviceid, 'off');
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vérification de l’état
app.get('/status/:deviceid', async (req, res) => {
  try {
    const response = await connection.getDevicePowerState(req.params.deviceid);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serveur en écoute
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
