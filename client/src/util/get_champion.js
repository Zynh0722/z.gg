import axios from 'axios';

export function get_champion(champion, version) {
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champion}.json`;
  return axios.get(url)
    .then(response => response.data.data[champion])
    .catch(err => err);
}
