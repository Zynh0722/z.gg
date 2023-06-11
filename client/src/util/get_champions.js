import axios from 'axios';

export function get_champions(version) {
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  return axios.get(url)
    .then(response => Object.keys(response.data.data)
      .map(key => ({ label: response.data.data[key].name, name: key })))
    .catch(err => err);
}
