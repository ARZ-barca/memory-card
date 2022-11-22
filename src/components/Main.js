import React, { useState, useEffect } from "react";
import Cards from "./Cards";

function Main(props) {
  const [round, setRound] = useState(1);
  const [digimons, setDigimons] = useState([]);
  const [allDigimons, setAllDigimons] = useState([]);
  const [selectedDigimons, setSelectedDigimons] = useState([]);
  const initialCards = 5;
  const addedCardsPerRound = 3;

  // function restart() {
  //   setRound(1);
  //   pickRandomDigimons(initialCards, allDigimons);
  //   setSelectedDigimons([]);
  // }

  // pick given number of random digimons from all digimons
  function pickRandomDigimons(n, all) {
    const shuffled = [...all].sort(() => {
      return 0.5 - Math.random();
    });
    setDigimons(shuffled.slice(0, n));
  }

  function shuffleDigimons() {
    setDigimons(
      [...digimons].sort(() => {
        return 0.5 - Math.random();
      })
    );
  }

  // when user clicks on a degimon
  function selectDigimon(digimon) {
    if (selectedDigimons.includes(digimon)) {
      // digimon was selected before and game is lost

      // TODO

      console.log("restart");
    } else {
      const tempSelectedDigimons = [...selectedDigimons, digimon];
      console.log(tempSelectedDigimons, digimons);
      if (tempSelectedDigimons.length >= digimons.length) {
        // round is clear
        pickRandomDigimons(
          initialCards + round * addedCardsPerRound,
          allDigimons
        );
        setSelectedDigimons([]);
        setRound(round + 1);
      } else {
        // selection was correct
        setSelectedDigimons(tempSelectedDigimons);
        shuffleDigimons();
      }
    }
  }

  // start effect
  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon").then((response) => {
      response.json().then((value) => {
        setAllDigimons(value);
        pickRandomDigimons(initialCards, value);
      });
    });
  }, []);

  return (
    <main>
      <Cards digimons={digimons} selectDigimon={selectDigimon} />
    </main>
  );
}

export default Main;
