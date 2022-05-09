import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

export default function Ability({ spell, abilityButton, version }) {
  if ([...new Set(spell.cooldown)].length === 1) {
    spell.cooldown = [spell.cooldown[0]];
  }

  return (
      <div style={{ padding: "0.5em", display: "flex", flexDirection: "row" }}>
        <div style={{
            backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/${version}/img/${abilityButton === 'P' ? 'passive' : 'spell'}/${spell.image.full})`, 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center",
            flex: "none", 
            width: "75px", 
            height: "75px",
            padding: "0.5em",
            boxShadow: "0px 0px 5px #333",
            border: "5px solid #111"
          }} />

        <div style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "1rem"
        }}>
          <div style={{ display: "inline-flex" }}>
            <Typography variant="h6">{abilityButton} - {spell.name}</Typography>
            <Typography 
              variant="h6"
              style={{
                fontWeight: "normal",
                color: "#777",
                marginLeft: "0.5em"
              }}>
              {spell.cooldown && spell.cooldown.join(" / ")}
            </Typography>
          </div>
          <Typography variant="caption">{spell.description}</Typography>
        </div>
      </div>
      
  );
}

Ability.propTypes = {
  spell: PropTypes.object.isRequired,
  abilityButton: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}