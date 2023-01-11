import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main";

// local storage test from mdn
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const storageIsAvailable = storageAvailable("localStorage");

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function addCurrentScore() {
    setCurrentScore(currentScore + 1);
  }

  // use browser storage for the best score
  useEffect(() => {
    if (storageIsAvailable) {
      // Yippee! We can use localStorage awesomeness
      let score = localStorage.getItem("bestScore");
      if (score) {
        setBestScore(score);
      }
    }
  }, []);

  // store the best score to the storage eachtime it changes
  useEffect(() => {
    if (storageIsAvailable) {
      // Yippee! We can use localStorage awesomeness
      localStorage.setItem("bestScore", bestScore);
    }
  }, [bestScore]);

  // everytime current score changes check to see if it is the ebst score
  useEffect(() => {
    // bestScore === null is for my code mistake (ignore it, it is useless)
    if (currentScore > bestScore || bestScore === null) {
      setBestScore(currentScore);
    }
  }, [currentScore, bestScore]);

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
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
      ></Main>
    </div>
  );
}

export default App;
