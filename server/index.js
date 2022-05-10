const express = require('express');
const app = express();

const util = require('util');
const favicon = require('serve-favicon')
const path = require('path');

const axios = require('axios');

// const db = require('./db/database');

app.use(express.json());
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(express.static(__dirname + '/../client/dist'));

let currentVersion;

require('./util/getLatestVersion')
    .then(version => currentVersion = version)
    .then(() => console.log(`Current version: ${currentVersion}`));

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

app.listen(3000, () => {
  console.log(`App listening on http://localhost:${3000}/`);
});