const axios = require('axios');

module.exports = axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => response.data[0]);