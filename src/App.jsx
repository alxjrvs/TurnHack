import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";
import NextCard from "./components/NextCard";
import "./App.css";


function App() {
  const [turnIndex, setTurnIndex] = useState(0);
  const [assignmentCache, setAssignmentCache] = useState({});
  const stratCards = useMemo(() => [
    { num: "1", strat: "Leadership", border: "border-red-600" },
    { num: "2", strat: "Diplomacy", border: "border-orange-500" },
    { num: "3", strat: "Politics", border: "border-yellow-400" },
    { num: "4", strat: "Construction", border: "border-green-500" },
    { num: "5", strat: "Trade", border: "border-cyan-400" },
    { num: "6", strat: "Warfare", border: "border-blue-500" },
    { num: "7", strat: "Technology", border: "border-blue-800" },
    { num: "8", strat: "Imperial", border: "border-purple-600" },
  ]);

  useEffect(() => {
    const turn = JSON.parse(localStorage.getItem("turn"));
    if (turn) {
      console.log('loading turn')
      setTurnIndex(turn);
    }

    const assignment = JSON.parse(localStorage.getItem("assignment"));
    if(assignment) {
      console.log('loading assignment', assignment)
      setAssignmentCache(assignment);
    }
  }, []);

  const turnString = JSON.stringify(turnIndex);
  useEffect(() => {
    localStorage.setItem("turn", turnString);
  }, [turnString]);

  const assignmentString = JSON.stringify(assignmentCache, null, 2);
  useEffect(() => {
    if (Object.keys(assignmentCache).length > 0) {
      localStorage.setItem("assignment", assignmentString);
    }
  }, [assignmentString, assignmentCache]);

  const nextTurn = (e) => {
    e.preventDefault();
    setTurnIndex(index => index < 7 ? index + 1 : 0)
  };

  const prevTurn = (e) => {
    e.preventDefault();
    setTurnIndex(index => index > 0 ? index - 1 : 7)
  };

  const clearPlayers = (e) => {
    e.preventDefault();
    const confirmation = confirm("Are you sure you want to clear all players?");
    if (confirmation) {
      setAssignmentCache({});
      setTurnIndex(0);
    }
  }


  const setName = (name) => {
    setAssignmentCache({
      ...assignmentCache,
      [turnIndex]: name,
    });
  }


  return (
    <div className="flex flex-col gap-4 min-w-96">
      <Card stratCards={stratCards}  turnIndex={turnIndex} assignmentCache={assignmentCache} setName={setName} />
      <NextCard stratCards={stratCards} turnIndex={turnIndex} assignmentCache={assignmentCache} setName={setName} />
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
