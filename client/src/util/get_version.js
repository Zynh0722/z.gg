import axios from 'axios';

export async function get_version() {
  const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

  return response.data[0];
};
