const express = require('express');
const app = express();

const util = require('util');

const axios = require('axios');

const db = require('./db/database');

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

let currentVersion;

axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => currentVersion = response.data[0])
    .then(() => {
      axios.get(`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion/Aatrox.json`)
        .then(response => console.log(util.inspect(response.data.data, false, null, true)));
    });

    

app.listen(3000, () => {
  console.log(`App listening on http://localhost:${3000}/`);
});