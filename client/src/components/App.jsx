import { useEffect, useState } from "react";

import { Autocomplete, TextField, Typography } from "@mui/material";

import axios from "axios";

import ChampionSummary from "./ChampionSummary";
import Ability from "./Ability";
import { get_version } from "../util/get_version";
import { get_champions } from "../util/get_champions";
import { get_champion } from "../util/get_champion";

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default function App() {
  const [champions, setChampions] = useState([]);
  const [champion, setChampion] = useLocalStorage("champion", "");
  const [championData, setChampionData] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    get_version().then(setVersion);
  }, []);

  useEffect(() => {
    if (version) {
      get_champions("13.11.1").then(setChampions);
    }
  }, [version])

  useEffect(() => {
    if (champion && version) {
      get_champion(champion, version).then(setChampionData);
      // axios.get(`/champions/${champion}`)
      //   .then(({ data }) => { setChampionData(data); console.log(data) });
    }
  }, [champion, version]);

  const handleChampionChange = (event, { name }) => {
    setChampion(name);
  }

  return (
    <>
      <Typography
        style={{
          position: "absolute",
          padding: "1em",
        }}
        variant="body2">Version: {version}</Typography>
      <div style={{ padding: "1em", maxWidth: "600px" }}>
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
          groupBy={(option) => option.name[0]}
          onChange={handleChampionChange}
          style={{ marginTop: "1em" }}
        />

        {championData &&
          <ChampionSummary
            championData={championData}
            version={version} />}

        {championData &&
          <Ability
            spell={championData.passive}
            abilityButton="P"
            version={version} />}

        {championData &&
          championData.spells.map((spell, key) =>
            <Ability
              spell={spell}
              abilityButton={{ 0: 'Q', 1: 'W', 2: 'E', 3: 'R' }[key]}
              version={version}
              key={spell.id} />)}

        {championData && (
          <div>
            <Typography variant="body1">{championData.lore}</Typography>
          </div>
        )}

      </div>
    </>
  );
}
