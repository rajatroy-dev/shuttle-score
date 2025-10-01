'use client'

import { useState } from "react";
import useAppStore, { IAppState, IScore, ITeam } from "@/app/_store/useAppStore";

export default function Home() {
  const currentRound = useAppStore((state: IAppState) => state.currentRound);
  const incrementRound = useAppStore((state: IAppState) => state.incrementRound);
  const resetCurrentRound = useAppStore((state: IAppState) => state.resetCurrentRound);
  const setCurrentRound = useAppStore((state: IAppState) => state.setCurrentRound);

  const servingSide = useAppStore((state: IAppState) => state.servingSide);
  const setServingSide = useAppStore((state: IAppState) => state.setServingSide);

  const score = useAppStore((state: IAppState) => state.score);
  const setScore = useAppStore((state: IAppState) => state.setScore);
  const resetScore = useAppStore((state: IAppState) => state.resetScore);

  const winner = useAppStore((state: IAppState) => state.winner);
  const setWinner = useAppStore((state: IAppState) => state.setWinner);

  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [playerPosition, setPlayerPosition] = useState({
    'teamA': {
      0: 'playerA',
      1: 'playerB'
    },
    'teamB': {
      2: 'playerA',
      3: 'playerB'
    }
  });

  const [currentServePositon, setCurrentPosition] = useState(0);

  const [playHistory, setPlayHistory] = useState<IHistory[]>([]);

  const declareRoundWinner = (
    latestScore: IScore,
    roundScores: IScore[],
    scoringTeam: ITeam
  ) => {
    latestScore.winner = scoringTeam;
    roundScores.length < 3 && roundScores.push({
      teamA: 0,
      teamB: 0
    });
    roundScores[currentRound] = latestScore;
    handleNewRound(roundScores);
  }

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = {
      ...score[currentRound],
      [scoringTeam]: score[currentRound][scoringTeam] + 1
    };
    const scoreCopy = [...score];
    const playHistoryCopy = [...playHistory];

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] >= 30) {
        declareRoundWinner(localScore, scoreCopy, scoringTeam);
      } else if (Math.abs(localScore.teamA - localScore.teamB) >= 2) {
        declareRoundWinner(localScore, scoreCopy, scoringTeam);
      }
    } else if (localScore[scoringTeam] === 21) {
      declareRoundWinner(localScore, scoreCopy, scoringTeam);
    }
    scoreCopy[currentRound] = localScore;
    setScore(scoreCopy);
    setServingSide(scoringTeam);
    playHistoryCopy.push({
      scoringTeam: scoringTeam,
      roundNumber: currentRound,
      score: scoreCopy
    });
    handleCurrentPlayer(scoringTeam, localScore);
    setPlayHistory(playHistoryCopy);
  }

  const startNewGame = () => {
    setWinner('');
    resetCurrentRound();
    resetScore();
    setServingSide('teamA');
  }

  const handleNewRound = (latestRoundScores: IScore[]) => {
    const newRound = currentRound + 1;
    determineMatchWinner(latestRoundScores);
    incrementRound();
    setServingSide(latestRoundScores[currentRound].winner!);
  }

  const determineMatchWinner = (latestRoundScores: IScore[]) => {
    let teamA = 0;
    let teamB = 0;

    latestRoundScores.forEach(it => {
      if (it.winner === 'teamA') ++teamA;
      else if (it.winner === 'teamB') ++teamB;
    });

    if (teamB === 0 && (teamA - teamB === 2)) setWinner(teamNames.teamA);
    else if (teamA === 0 && (teamB - teamA === 2)) setWinner(teamNames.teamB);
    else if (teamB !== 0 && (teamA - teamB === 1)) setWinner(teamNames.teamA);
    else if (teamA !== 0 && (teamB - teamA === 1)) setWinner(teamNames.teamB);
  }

  const handleUndo = () => {
    const previousRally = playHistory[playHistory.length - 2];
    const playHistoryCopy = [...playHistory];
    setCurrentRound(previousRally.roundNumber);
    setServingSide(previousRally.scoringTeam);
    setScore(previousRally.score);
    setWinner('');
    playHistoryCopy.pop();
    setPlayHistory(playHistoryCopy);
  }

  const handleCurrentPlayer = (
    scoringTeam: ITeam,
    currentScore: IScore
  ) => {
    if (scoringTeam === 'teamA') {
      const playerPositionCopy = { ...playerPosition };
      if (currentServePositon <= 1) {
        if (currentServePositon === 0) {
          playerPositionCopy.teamA[0] = 'playerB';
          playerPositionCopy.teamA[1] = 'playerA';
          setCurrentPosition(1);
        } else {
          playerPositionCopy.teamA[0] = 'playerA';
          playerPositionCopy.teamA[1] = 'playerB';
          setCurrentPosition(0);
        }
        setPlayerPosition(playerPositionCopy);
      } else {
        if (currentScore.teamA % 2 === 0) {
          setCurrentPosition(0);
        } else {
          setCurrentPosition(1);
        }
      }
    } else if (scoringTeam === 'teamB') {
      const playerPositionCopy = { ...playerPosition };
      if (currentServePositon >= 2) {
        if (currentServePositon === 2) {
          playerPositionCopy.teamB[2] = 'playerB';
          playerPositionCopy.teamB[3] = 'playerA';
          setCurrentPosition(3);
        } else {
          playerPositionCopy.teamB[2] = 'playerA';
          playerPositionCopy.teamB[3] = 'playerB';
          setCurrentPosition(2);
        }
        setPlayerPosition(playerPositionCopy);
      } else {
        if (currentScore.teamA % 2 === 0) {
          setCurrentPosition(2);
        } else {
          setCurrentPosition(3);
        }
      }
    }
  };

  return (
    <div>
      {winner.length > 0
        ? <div>
          <p>Winner: {winner}</p>
          <button onClick={startNewGame}>New Game</button>
        </div>
        : <></>}
      {winner.length <= 0
        ? <div>
          <p>Serving Team: {teamNames[servingSide]}</p>
          <p>Current Position: {currentServePositon}</p>
        </div>
        : <></>}
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
        <button onClick={handleUndo}>Undo</button>
      </div>
    </div>
  );
}

type IHistory = {
  scoringTeam: 'teamA' | 'teamB';
  roundNumber: number;
  score: IScore[];
};