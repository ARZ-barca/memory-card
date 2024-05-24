import React, { useState, useEffect } from "react";
import Cards from "./Cards";

function Main(props) {
  const [round, setRound] = useState(1);
  const [digimons, setDigimons] = useState([]);
  const [allDigimons, setAllDigimons] = useState([]);
  const [selectedDigimons, setSelectedDigimons] = useState([]);
  const [roundOver, setRoundOver] = useState(undefined);
  const [lost, setLost] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialCards = 5;
  const addedCardsPerRound = 3;

  // pick given number of random digimons from all digimons
  function pickRandomDigimons(n, allDigimons) {
    const shuffled = [...allDigimons].sort(() => {
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

  // called after player has finished the round and clicks next round
  function nextRound() {
    pickRandomDigimons(initialCards + round * addedCardsPerRound, allDigimons);
    setSelectedDigimons([]);
    setRoundOver(false);
    setRound(round + 1);
  }

  // called after player has lost and clicks play again
  function restart() {
    pickRandomDigimons(initialCards, allDigimons);
    setSelectedDigimons([]);
    setRound(1);
    setLost(false);
    setRoundOver(false);
    props.setCurrentScore(0);
  }

  // when user clicks on a degimon
  function selectDigimon(digimon) {
    if (selectedDigimons.includes(digimon)) {
      // digimon was selected before and game is lost
      setRoundOver(true);
      setLost(true);
    } else {
      // selection was correct
      props.addCurrentScore();
      const tempSelectedDigimons = [...selectedDigimons, digimon];
      // it wont update in this render so we should use a temporary variable
      setSelectedDigimons(tempSelectedDigimons);
      if (tempSelectedDigimons.length >= digimons.length) {
        // round is clear
        setRoundOver(true);
      } else {
        // selection was correct but round isn't over yet
        shuffleDigimons();
      }
    }
  }

  // start effect
  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon", { mode: "cors" })
      .then((response) => {
        response.json().then((value) => {
          setAllDigimons(value);
          pickRandomDigimons(initialCards, value);
          setLoading(false);
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
      {loading && (
        <div className="loading">Loading (refresh if takes too long)</div>
      )}
      <Cards
        digimons={digimons}
        selectDigimon={selectDigimon}
        roundOver={roundOver}
        selectedDigimons={selectedDigimons}
      />
      {lost && (
        <div className="restart">
          your score was{" "}
          <span className="over-score">{props.currentScore}</span>{" "}
          <button onClick={restart}>restart</button>
        </div>
      )}
      {roundOver && !lost && (
        <div className="next-round">
          round is clear <button onClick={nextRound}>next</button>
        </div>
      )}
    </main>
  );
}

export default Main;
