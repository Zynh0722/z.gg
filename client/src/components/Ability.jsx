import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export default function Ability({ spell, abilityButton }) {
  return (
      <div style={{ padding: "0.5em", display: "flex", flexDirection: "row" }}>
        <div style={{
            backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/12.8.1/img/${abilityButton === 'P' ? 'passive' : 'spell'}/${spell.image.full})`, 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center",
            flex: "none", 
            width: "75px", 
            height: "75px",
            padding: "0.5em"
          }} />

        <div style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "1rem"
        }}>
          <Typography variant="h6">{abilityButton} - {spell.name}</Typography>
          <Typography variant="caption">{spell.description}</Typography>
        </div>
      </div>
      
  );
}

Ability.propTypes = {
  spell: PropTypes.object.isRequired,
  abilityButton: PropTypes.string.isRequired
}