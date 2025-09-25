'use client'

import { useState } from "react";
import useAppStore, { IAppState, IScore, ITeam } from "@/app/_store/useAppStore";

export default function Home() {
  const winner = useAppStore((state: IAppState) => state.winner);
  const setWinner = useAppStore((state: IAppState) => state.setWinner);
  const currentRound = useAppStore((state: IAppState) => state.currentRound);
  const resetCurrentRound = useAppStore((state: IAppState) => state.resetCurrentRound);
  const setCurrentRound = useAppStore((state: IAppState) => state.setCurrentRound);
  const servingSide = useAppStore((state: IAppState) => state.servingSide);
  const setServingSide = useAppStore((state: IAppState) => state.setServingSide);
  const score = useAppStore((state: IAppState) => state.score);
  const setScore = useAppStore((state: IAppState) => state.setScore);

  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [playHistory, setPlayHistory] = useState<IHistory[]>([]);

  const declareWinner = (
    latestScore: IScore, 
    allScores: IScore[], 
    scoringTeam: ITeam
  ) => {
    latestScore.winner = scoringTeam;
    allScores.length < 3 && allScores.push({
      teamA: 0,
      teamB: 0
    });
    allScores[currentRound] = latestScore;
  }

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = {
      ...score[currentRound],
      [scoringTeam]: score[currentRound][scoringTeam] + 1
    };
    const scoreCopy = [...score];

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] >= 30) {
        declareWinner(localScore, scoreCopy, scoringTeam);
        handleNewRound(scoreCopy);
      } else if (Math.abs(localScore.teamA - localScore.teamB) >= 2) {
        declareWinner(localScore, scoreCopy, scoringTeam);
        handleNewRound(scoreCopy);
      }
    } else if (localScore[scoringTeam] === 21) {
      declareWinner(localScore, scoreCopy, scoringTeam);
      handleNewRound(scoreCopy);
    }
    scoreCopy[currentRound] = localScore;
    setScore(scoreCopy);
    setServingSide(scoringTeam);
  }

  const startNewGame = () => {
    setWinner('');
    resetCurrentRound();
    setScore([{
      teamA: 0,
      teamB: 0
    }]);
    setServingSide('teamA');
  }

  const handleNewRound = (latestScore: IScore[]) => {
    const newRound = currentRound + 1;

    findWinner(latestScore);

    setCurrentRound();
    setServingSide(newRound % 2 === 0 ? 'teamB' : 'teamA');
  }

  const findWinner = (latestScore: IScore[]) => {
    let teamA = 0;
    let teamB = 0;

    latestScore.forEach(it => {
      if (it.winner === 'teamA') ++teamA;
      else if (it.winner === 'teamB') ++teamB;
    });

    if (teamB === 0 && (teamA - teamB === 2)) setWinner(teamNames.teamA);
    else if (teamA === 0 && (teamB - teamA === 2)) setWinner(teamNames.teamB);
    else if (teamB !== 0 && (teamA - teamB === 1)) setWinner(teamNames.teamA);
    else if (teamA !== 0 && (teamB - teamA === 1)) setWinner(teamNames.teamB);
  }

  return (
    <div>
      {winner.length > 0
        ? <div>
          <p>Winner: {winner}</p>
          <button onClick={startNewGame}>New Game</button>
        </div>
        : <></>}
      <div>Serving Team: {teamNames[servingSide]}</div>
      <div>
        <h3>Team A</h3>
        <p>Player A1</p>
        <p>Player A2</p>
        <div>
          <button
            disabled={winner.length > 0}
            onClick={() => handleScore('teamA')}>
            Score
          </button>
        </div>
      </div>
      <div>
        <h3>Team B</h3>
        <p>Player B1</p>
        <p>Player B2</p>
        <div>
          <button
            disabled={winner.length > 0}
            onClick={() => handleScore('teamB')}>
            Score
          </button>
        </div>
      </div>
      {score.map((it, index) =>
        <div key={index}>
          <p>Round: {index + 1}</p>
          <p>Team A score: {it.teamA}</p>
          <p>Team B score: {it.teamB}</p>
        </div>
      )}
      <div>
        <button>Undo</button>
      </div>
    </div>
  );
}

type IHistory = {
  scoringTeam: 'teamA' | 'teamB';
  currentRound: number;
  score: IScore;
};