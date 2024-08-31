import { useState, useEffect, useMemo } from "react";
import { ToastContainer } from 'react-toastify';
import Card from "./components/Card";
import NextCard from "./components/NextCard";
import "./App.css";

function navigateStats(num) {
  switch (num) {
    case "1":
      return { next: "2", prev: "8" };
    case "2":
      return { next: "3", prev: "1" };
    case "3":
      return { next: "4", prev: "2" };
    case "4":
      return { next: "5", prev: "3" };
    case "5":
      return { next: "6", prev: "4" };
    case "6":
      return { next: "7", prev: "5" };
    case "7":
      return { next: "8", prev: "6" };
    case "8":
      return { next: "1", prev: "7" };
    default:
      throw "What Happened, Chief"
  }
}

function App() {
  const localStoreCache = localStorage.getItem("TurnHackCache")
  const stratCards = {
    "1": { num: "1", strat: "Leadership", border: "border-red-600" },
    "2": { num: "2", strat: "Diplomacy", border: "border-orange-500" },
    "3": { num: "3", strat: "Politics", border: "border-yellow-400" },
    "4": { num: "4", strat: "Construction", border: "border-green-500" },
    "5": { num: "5", strat: "Trade", border: "border-cyan-400" },
    "6": { num: "6", strat: "Warfare", border: "border-blue-500" },
    "7": { num: "7", strat: "Technology", border: "border-blue-800" },
    "8": { num: "8", strat: "Imperial", border: "border-purple-600" }
  }
  const [state, setState] = useState(
    localStoreCache
      ? JSON.parse(localStoreCache)
      : {
        currentNum: Object.keys(stratCards)[0],
        assignmentCache: {},
        passedCache: {},
      }
  );
  const stateString = JSON.stringify(state);
  useEffect(() => {
    localStorage.setItem("TurnHackCache", stateString);
  }, [stateString]);


  const crawlForNextUnpassed = (index) => {
    const nextNum = navigateStats(index).next
    const hasPassed = !!state.passedCache[nextNum]

    if(hasPassed) {
      return crawlForNextUnpassed(nextNum)
    }
    return nextNum
  }

  const crawlForPrevUnpassed = (index) => {
    const nextNum = navigateStats(index).prev
    const hasPassed = !!state.passedCache[nextNum]

    if(hasPassed) {
      return crawlForPrevUnpassed(nextNum)
    }
    return nextNum
  }

  const nextTurn = (e) => {
    e.preventDefault();
    setState(cache => ({ ...cache, currentNum: crawlForNextUnpassed(cache.currentNum) }))
  };

  const prevTurn = (e) => {
    e.preventDefault();
    setState(cache => ({ ...cache, currentNum: crawlForPrevUnpassed(cache.currentNum) }))
  };

  const clearPlayers = (e) => {
    e.preventDefault();
    const confirmation = confirm("Are you sure you want to clear all players?");
    if (confirmation) {
      setAssignmentCache({});
      setPassedCache({});
      setTurnIndex(0);
    }
  }

  const setName = (num, name) => {
    setState(state => {
      const newAssignmentCache = {
        ...state.assignmentCache,
        [num]: name,
      }
      const newCurrentNum = Object.keys(newAssignmentCache).length === 8 ? "1" : navigateStats(state.currentNum).next
      return {
        ...state,
        currentNum: newCurrentNum,
        assignmentCache: newAssignmentCache,
      }
    })
  }

  const isFullyAssigned = Object.keys(state.assignmentCache).length === 8;
  const unPass = (index) => {
    setState(cache => ({ ...cache, passedCache: { ...cache.passedCache, [index]: false } }))
  }

  return (
    <div className="w-full flex flex-row gap-12">
      <div style={{alignSelf: 'flex-start', flexDirection: 'column', gap: 20, display: 'flex'}}>
        <p>THE PASSED</p>
        {Object.entries(state.passedCache).map(([index, value]) => (
          value && (
            <div key={index} style={{ cursor: 'pointer' }} onClick={() => unPass(index)}>
              <p>{state.assignmentCache[index]} ({index})</p>
            </div>
          )
        ))}
      </div>
      {isFullyAssigned && (
        <button onClick={prevTurn} className="w-full text-center outline min-w-72">
          prev turn
        </button>
      )}
      <div className="flex flex-col gap-4 min-w-96">
        <Card num={state.currentNum} stratCards={stratCards} state={state} setState={setState} setName={setName} />
        <NextCard crawlForNextUnpassed={crawlForNextUnpassed}  num={state.currentNum} stratCards={stratCards} state={state} />
        <div className="flex flex-row gap-4 justify-center w-full">
        </div>
        <div className="flex flex-row gap-4 justify-center w-full">
          <button onClick={clearPlayers} className="w-1/2 text-center outline">
            clear player assignments
          </button>
        </div>
      </div>
      {isFullyAssigned && (
        <button onClick={nextTurn} className="w-full text-center outline min-w-72">
          next turn
        </button>
      )}
      <ToastContainer />
    </div>
  )
}

export default App;
