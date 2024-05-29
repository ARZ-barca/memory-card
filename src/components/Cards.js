import React from "react";
import uniqid from "uniqid";

function Cards(props) {
  return (
    <div className="cards-container">
      {props.pokemons.map((pokemon) => {
        // to calculate the classname of the card
        let classNameAddOn = [];

        if (props.roundOver) {
          // add "over" to the class list
          classNameAddOn.push("over");

          if (props.selectedPokemons.includes(pokemon)) {
            classNameAddOn.push("selected");
          }
        }

        // to remove click event listener when round is over or player is lost
        let onClickEvent = () => {};
        if (!props.roundOver) {
          onClickEvent = () => props.selectPokemon(pokemon);
        }

        return (
          <div
            className={"card " + classNameAddOn.join(" ")}
            key={uniqid()}
            onClick={onClickEvent}
          >
            <img src={pokemon.img} alt={pokemon.name}></img>
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
