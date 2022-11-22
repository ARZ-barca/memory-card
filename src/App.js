import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  function addCurrentScore() {
    setCurrentScore(currentScore + 1);
  }

  function newBestScore() {
    setBestScore(currentScore);
  }

  return (
    <div>
      {/* <Head /> */}
      <Main></Main>
    </div>
  );
}

export default App;
