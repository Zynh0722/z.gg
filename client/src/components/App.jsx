import React from "react";

import { Autocomplete, TextField, Typography } from "@mui/material";

import axios from "axios";

export default function App() {
  const [champions, setChampions] = React.useState([]);
  const [champion, setChampion] = React.useState("");
  const [championData, setChampionData] = React.useState("");

  React.useEffect(() => {
    axios.get("/champions")
      .then(({ data }) => setChampions(data));
  }, []);

  React.useEffect(() => {
    if (champion) {
      axios.get(`/champions/${champion}`)
        .then(({ data }) => setChampionData(data));
    }
  }, [champion]);

  const handleChampionChange = (event, { name }) => {
    setChampion(name);
  }

  return (
    <div>
      <h1>Z.gg</h1>

      <Autocomplete
        disablePortal
        openOnFocus
        selectOnFocus
        autoHighlight
        id="champion-autocomplete"
        options={champions}
        value={champion.name}
        getOptionLabel={(option) => option.label || ""}
        renderInput={(params) => <TextField {...params} label="Champion" />}
        onChange={handleChampionChange}
      />

      <div>
        {championData && (
          <div>
            <div style={{ display: "flex"}}>

              <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${championData.image.full}`} alt={championData.name} />

              <div style={{ 
                marginLeft: "1rem", 
                display: "flex", 
                flexDirection: "column", 
                alignSelf: "center" 
              }}>
                <h2>{championData.name}, {championData.title}</h2>
                <div style={{ alignSelf: "center", fontSize: "1.5em" }}>
                  {championData.tags.join(", ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {championData && (
          <div>
            <h3>Q, {championData.spells[0].name}</h3>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${championData.spells[0].image.full}`} alt={championData.name} />
          </div>
        )}
      </div>

      <div>
        {championData && (
          <div>
            <h3>W, {championData.spells[1].name}</h3>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${championData.spells[1].image.full}`} alt={championData.name} />
          </div>
        )}
      </div>

      <div>
        {championData && (
          <div>
            <h3>E, {championData.spells[2].name}</h3>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${championData.spells[2].image.full}`} alt={championData.name} />
          </div>
        )}
      </div>

      <div>
        {championData && (
          <div>
            <h3>R, {championData.spells[3].name}</h3>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${championData.spells[3].image.full}`} alt={championData.name} />
          </div>
        )}
      </div>  

      <div>
        {championData && (
          <div>
            <h3>Passive, {championData.passive.name}</h3>
            <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/passive/${championData.passive.image.full}`} alt={championData.name} />
          </div>
        )}
      </div>

      <div>
        {championData && (
          <Typography variant="caption">{championData.lore}</Typography>
        )}
      </div>

    </div>
  );  
}
