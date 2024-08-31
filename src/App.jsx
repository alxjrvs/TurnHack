import { useState, useEffect } from "react";
import Card from "./components/Card";
import NextCard from "./components/NextCard";
import "./App.css";

const turnsArray = [
  { num: "1", strat: "Leadership", border: "border-red-600" },
  { num: "2", strat: "Diplomacy", border: "border-orange-500" },
  { num: "3", strat: "Politics", border: "border-yellow-400" },
  { num: "4", strat: "Construction", border: "border-green-500" },
  { num: "5", strat: "Trade", border: "border-cyan-400" },
  { num: "6", strat: "Warfare", border: "border-blue-500" },
  { num: "7", strat: "Technology", border: "border-blue-800" },
  { num: "8", strat: "Imperial", border: "border-purple-600" },
];

function App() {
  const [turnIndex, setTurnIndex] = useState(0);
  const [assignmentCache, setAssignmentCache] = useState({});


  useEffect(() => {
    const turn = JSON.parse(localStorage.getItem("turn"));
    if (turn) {
      setTurnIndex(turn);
    }
  }, []);

  const nextTurn = (e) => {
    e.preventDefault();
    turnIndex < 7 ? setTurnIndex(turnIndex + 1) : setTurnIndex(0);
  };

  const prevTurn = (e) => {
    e.preventDefault();
    turnIndex > 0 ? setTurnIndex(turnIndex - 1) : setTurnIndex(7);
  };

  const clearPlayers = (e) => {
    e.preventDefault();
    const confirmation = confirm("Are you sure you want to clear all players?");
    if (confirmation) {
      setAssignmentCache({});
      setTurnIndex(0);
    }
  }

  const turnString = JSON.stringify(turnIndex);
  useEffect(() => {
    localStorage.setItem("turn", turnString);
  }, [turnString]);


  const setName = (name) => {
    setAssignmentCache({
      ...assignmentCache,
      [turnIndex]: name,
    });
  }

  const nextTurnIndex = turnIndex < 7 ? turnIndex + 1 : 0;

  return (
    <div className="flex flex-col gap-4 min-w-96">
      <Card name={assignmentCache[turnIndex]} setName={setName} num={turnsArray[turnIndex].num} borderColor={turnsArray[turnIndex].border} />
      <NextCard name={assignmentCache[nextTurnIndex]} setName={setName} num={turnsArray[nextTurnIndex].num} borderColor={turnsArray[nextTurnIndex].border} />
      <div className="flex flex-row gap-4 justify-center w-full">
        <button onClick={prevTurn} className="w-1/2 text-center outline">
          prev turn
        </button>
        <button onClick={nextTurn} className="w-1/2 text-center outline">
          next turn
        </button>
      </div>
      <div className="flex flex-row gap-4 justify-center w-full">
        <button onClick={clearPlayers} className="w-1/2 text-center outline">
          clear player assignments
        </button>
      </div>
    </div>
  )
}

export default App;
