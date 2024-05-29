import React, { useState, useEffect } from "react";
import Cards from "./Cards";

// they do what they say
const initialCards = 5;
const addedCardsPerRound = 3;
// i like this number even id there are moe pokemons
const pokemonCount = 999;

function getRandomIds(number) {
  let pokemonIds = [];
  for (let i = 0; i < number; i++) {
    // pokemon ids start at 1 in the api
    pokemonIds.push(Math.floor(Math.random() * pokemonCount) + 1);
  }
  return pokemonIds;
}

function getPokemons(pokemonIds, setPokemons, setLoading) {
  setLoading(true);
  const pokemonFetches = [];
  pokemonIds.forEach((id) => {
    pokemonFetches.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`));
  });

  Promise.all(pokemonFetches).then((pokemonFetches) => {
    const pokemonsData = [];

    pokemonFetches.forEach((data) => {
      pokemonsData.push(data.json());
    });

    Promise.all(pokemonsData).then((pokemonsData) => {
      setPokemons(pokemonsData);
      setLoading(false);
    });
  });
}

// shuffles current pokemons
function shufflePokemons(pokemons, setPokemons) {
  setPokemons(
    [...pokemons].sort(() => {
      return 0.5 - Math.random();
    })
  );
}

// when user clicks on a pokemon
function selectPokemon(
  pokemon,
  selectedPokemons,
  setSelectedPokemons,
  setRoundOver,
  setLost,
  addCurrentScore,
  pokemons,
  setPokemons
) {
  if (selectedPokemons.includes(pokemon)) {
    // pokemon was selected before and game is lost
    setRoundOver(true);
    setLost(true);
  } else {
    // selection was correct
    addCurrentScore();
    const tempSelectedDigimons = [...selectedPokemons, pokemon];
    // it wont update in this render so we should use a temporary variable
    setSelectedPokemons(tempSelectedDigimons);
    if (tempSelectedDigimons.length >= pokemons.length) {
      // round is clear
      setRoundOver(true);
    } else {
      // selection was correct but round isn't over yet
      shufflePokemons(pokemons, setPokemons);
    }
  }
}

// called after player has finished the round and clicks next round
function nextRound(
  setPokemons,
  setLoading,
  setSelectedPokemons,
  round,
  setRound,
  setRoundOver
) {
  setPokemons([]);
  const pokemonIds = getRandomIds(initialCards + round * addedCardsPerRound);
  getPokemons(pokemonIds, setPokemons, setLoading);
  setSelectedPokemons([]);
  setRoundOver(false);
  setRound(round + 1);
}

// called after player has lost and clicks play again
function restart(
  setPokemons,
  setLoading,
  setRound,
  setLost,
  setRoundOver,
  setCurrentScore,
  setSelectedPokemons
) {
  const pokemonIds = getRandomIds(initialCards);
  setPokemons([]);
  getPokemons(pokemonIds, setPokemons, setLoading);
  setSelectedPokemons([]);
  setRound(1);
  setLost(false);
  setRoundOver(false);
  setCurrentScore(0);
}

function Main(props) {
  const [round, setRound] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [roundOver, setRoundOver] = useState(undefined);
  const [lost, setLost] = useState(false);
  const [loading, setLoading] = useState(true);

  // start effect
  useEffect(() => {
    const pokemonsIds = getRandomIds(initialCards);
    getPokemons(pokemonsIds, setPokemons, setLoading);
  }, []);

  return (
    <main>
      <div className="info">
        <div className="round">Round: {round}</div> -{" "}
        <div className="round-scores">
          {selectedPokemons.length} / {pokemons.length}
        </div>
      </div>
      {loading && <div className="loading">Loading</div>}
      <Cards
        pokemons={pokemons}
        selectPokemon={(pokemon) => {
          selectPokemon(
            pokemon,
            selectedPokemons,
            setSelectedPokemons,
            setRoundOver,
            setLost,
            props.addCurrentScore,
            pokemons,
            setPokemons
          );
        }}
        roundOver={roundOver}
        selectedPokemons={selectedPokemons}
      />
      {lost && (
        <div className="restart">
          your score was{" "}
          <span className="over-score">{props.currentScore}</span>{" "}
          <button
            onClick={() => {
              restart(
                setPokemons,
                setLoading,
                setRound,
                setLost,
                setRoundOver,
                props.setCurrentScore,
                setSelectedPokemons
              );
            }}
          >
            restart
          </button>
        </div>
      )}
      {roundOver && !lost && (
        <div className="next-round">
          round is clear{" "}
          <button
            onClick={() =>
              nextRound(
                setPokemons,
                setLoading,
                setSelectedPokemons,
                round,
                setRound,
                setRoundOver
              )
            }
          >
            next
          </button>
        </div>
      )}
    </main>
  );
}

export default Main;
