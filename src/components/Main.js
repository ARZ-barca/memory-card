import React, { useState, useEffect } from "react";
import Cards from "./Cards";

function Main(props) {
  const [round, setRound] = useState(1);
  const [digimons, setDigimons] = useState([]);
  const [allDigimons, setAllDigimons] = useState([]);
  const [selectedDigimons, setSelectedDigimons] = useState([]);
  const initialCards = 5;
  const addedCardsPerRound = 3;

  // pick given number of random digimons from all digimons
  function pickRandomDigimons(n, all) {
    const shuffled = [...all].sort(() => {
      return 0.5 - Math.random();
    });
    setDigimons(shuffled.slice(0, n));
  }

  // shuffles corrent digimons
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
      pickRandomDigimons(initialCards, allDigimons);
      setSelectedDigimons([]);
      setRound(1);
      props.newBestScore();
    } else {
      const tempSelectedDigimons = [...selectedDigimons, digimon];
      // console.log(tempSelectedDigimons, digimons);
      if (tempSelectedDigimons.length >= digimons.length) {
        // round is clear
        pickRandomDigimons(
          initialCards + round * addedCardsPerRound,
          allDigimons
        );
        setSelectedDigimons([]);
        setRound(round + 1);
        props.addCurrentScore();
      } else {
        // selection was correct
        setSelectedDigimons(tempSelectedDigimons);
        shuffleDigimons();
        props.addCurrentScore();
      }
    }
  }

  // start effect
  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then((response) => {
        response.json().then((value) => {
          setAllDigimons(value);
          pickRandomDigimons(initialCards, value);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <main>
      <div className="info">
        <div className="round">Round: {round}</div> -{" "}
        <div className="round-scores">
          {selectedDigimons.length} / {digimons.length}
        </div>
      </div>
      <Cards digimons={digimons} selectDigimon={selectDigimon} />
    </main>
  );
}

export default Main;
