import "./App.css";
import React, { useState } from "react";
import Main from "./components/Main";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  function addCurrentScore() {
    setCurrentScore(currentScore + 1);
  }

  function checkBestScore() {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
  }

  return (
    <div>
      <header>
        <div className="heading">
          <h1>Digimon Memory Game</h1>
        </div>

        <div className="scores">
          <span className="current-score">Current Score : {currentScore}</span>{" "}
          | <span className="best-score">Best Score: {bestScore}</span>
        </div>
      </header>
      <Main
        addCurrentScore={addCurrentScore}
        checkBestScore={checkBestScore}
      ></Main>
    </div>
  );
}

export default App;
