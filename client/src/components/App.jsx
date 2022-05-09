import React from "react";

import { Autocomplete, TextField, Typography } from "@mui/material";

import axios from "axios";

import Ability from "./Ability";

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
    <div style={{ padding: "1em", width: "600px" }}>
      <Typography variant="h1" style={{ fontSize: "3em", textAlign: "center" }}>Z.gg</Typography>

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
        style={{ marginTop: "1em" }}

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
                <Typography variant="h5">{championData.name}, {championData.title}</Typography>
                <div style={{ alignSelf: "center", fontSize: "1.25em", fontFamily: "Roboto" }}>
                  {championData.tags.join(" - ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {championData && 
        <Ability 
          spell={championData.passive} 
          abilityButton="P" />}

      {championData && 
        championData.spells.map((spell, key) => 
          <Ability 
            spell={spell}
            abilityButton={{ 0: 'Q', 1: 'W', 2: 'E', 3: 'R' }[key]} 
            key={spell.id} />)}

      <div>
        {championData && (
          <Typography variant="body1">{championData.lore}</Typography>
        )}
      </div>

    </div>
  );  
}
