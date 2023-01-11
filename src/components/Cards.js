import React from "react";
import uniqid from "uniqid";

function Cards(props) {
  return (
    <div className="cards-container">
      {props.digimons.map((digimon) => {
        // to calculate the classname of the card
        let classNameAddOn = [];

        if (props.roundOver) {
          // add "over" to the class list
          classNameAddOn.push("over");

          if (props.selectedDigimons.includes(digimon)) {
            classNameAddOn.push("selected");
          }
        }

        // to remove click event listener when round is over or player is lost
        let onClickEvent = () => {};
        if (!props.roundOver) {
          onClickEvent = () => props.selectDigimon(digimon);
        }

        return (
          <div
            className={"card " + classNameAddOn.join(" ")}
            key={uniqid()}
            onClick={onClickEvent}
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
