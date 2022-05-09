import React from "react";
import { Typography } from "@mui/material";

export default function ChampionSummary({ championData }) {
  return (
    <div style={{
      padding: "0.5em",
    }}>
      <div style={{ display: "flex"}}>

        <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${championData.image.full}`} alt={championData.name} style={{boxShadow: "0px 0px 5px #333"}} />

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
  );
}