import React, { useEffect, useState } from "react";
import "./assets/styles/Cards.css";

function Cards(props) {
  return (
    <div className="cards-container">
      {props.digimons.map((digimon) => {
        return (
          <div className="card" onClick={() => props.selectDigimon(digimon)}>
            <img src={digimon.img} alt={digimon.name}></img>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
