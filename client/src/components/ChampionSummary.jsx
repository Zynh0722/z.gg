import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

export default function ChampionSummary({ championData, version }) {
  return (
    <div style={{
      padding: "0.5em",
    }}>
      <div style={{ display: "flex"}}>

        <img 
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championData.image.full}`} 
          alt={championData.name} 
          style={{boxShadow: "0px 0px 5px #333"}} />

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

ChampionSummary.protoTypes = {
  championData: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired
}