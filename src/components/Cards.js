import React from "react";
import uniqid from "uniqid";

function Cards(props) {
  return (
    <div className="cards-container">
      {props.digimons.map((digimon) => {
        return (
          <div
            className="card"
            key={uniqid()}
            onClick={() => props.selectDigimon(digimon)}
          >
            <img src={digimon.img} alt={digimon.name}></img>
            <div className="digimon-name">{digimon.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
