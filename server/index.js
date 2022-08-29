const express = require('express');
const app = express();

const util = require('util');
const favicon = require('serve-favicon')
const path = require('path');

const axios = require('axios');
var cron = require('node-cron');

// const db = require('./db/database');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(express.static(__dirname + '/../client/dist'));

let currentVersion;


const updateCurrentVersion = () => {
  require('./util/getLatestVersion')
      .then(version => currentVersion = version)
      .then(() => console.log(`Current version: ${currentVersion}`));
}

updateCurrentVersion();
cron.schedule('0 12 * * *', updateCurrentVersion);


app.get('/champions/:champion', (req, res) => {
  const champion = req.params.champion;
  const version = req.query.version || currentVersion;
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champion}.json`;
  axios.get(url)
    .then(response => res.send(response.data.data[champion]))
    .catch(err => res.status(500).send(err));
});

app.get('/champions', (req, res) => {
  const version = req.query.version || currentVersion;
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  axios.get(url)
    .then(response => res.send(Object.keys(response.data.data)
      .map(key => ({ label: response.data.data[key].name, name: key }))))
    .catch(err => res.status(500).send(err));
});

app.get('/version', (req, res) => res.send(currentVersion));

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}/`);
});
