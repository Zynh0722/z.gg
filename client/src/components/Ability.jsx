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
            backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/${version}/img/${abilityButton === 'P' ? 'passive' : 'spell'}/${spell.image.full})`, 
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
          <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
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
          {spell.description.split('<br>').map((line, index) => (
            <Typography
              key={index}
              variant="caption"
              component="p"
              style={{
                marginTop: "0.5em",
                marginBottom: "0.5em"
              }}
              dangerouslySetInnerHTML={{ __html: line.replace(/<font color='(.*?)'>(.*?)<\/font>/, '<span style=\'color:$1; background-color:#171717; border-radius:2px;\'>$2</span>') }}
              >
            </Typography>
          ))}
        </div>
      </div>
      
  );
}

Ability.propTypes = {
  spell: PropTypes.object.isRequired,
  abilityButton: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
}
