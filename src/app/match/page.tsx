'use client'

import { useState } from "react";
import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore, IScore, ITeam } from "@/app/_stores/app-store";

export default function Match() {
  const {
      teamA,
      teamAPlayerA,
      teamAPlayerB,
      teamB,
      teamBPlayerA,
      teamBPlayerB,
      currentRound,
      incrementRound,
      resetCurrentRound,
      setCurrentRound,
      servingSide,
      setServingSide,
      score,
      setScore,
      resetScore,
      winner,
      setWinner
    } = useAppStore((state: IAppStore) => state);

  const teamNames = {
    'teamA': teamA,
    'teamB': teamB
  };

  const [playerPosition, setPlayerPosition] = useState<IPlayerPosition>({
    'teamA': {
      0: 'playerA',
      1: 'playerB'
    },
    'teamB': {
      2: 'playerA',
      3: 'playerB'
    }
  });

  const [currentServePositon, setCurrentServePosition] = useState(0);

  const [playHistory, setPlayHistory] = useState<IHistory[]>([]);

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = {
      ...score[currentRound],
      [scoringTeam]: score[currentRound][scoringTeam] + 1
    };
    const scoreCopy = [...score];
    const playHistoryCopy = [...playHistory];
    let isRoundOver = false;

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] >= 30) {
        isRoundOver = true;
        declareRoundWinner(localScore, scoreCopy, scoringTeam);
      } else if (Math.abs(localScore.teamA - localScore.teamB) >= 2) {
        isRoundOver = true;
        declareRoundWinner(localScore, scoreCopy, scoringTeam);
      }
    } else if (localScore[scoringTeam] === 21) {
      isRoundOver = true;
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
    handleCurrentPlayer(scoringTeam, localScore, isRoundOver);
    setPlayHistory(playHistoryCopy);
  }

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

  const handleNewRound = (latestRoundScores: IScore[]) => {
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

    if ((teamA - teamB === 2 && teamB === 0)
      || (teamA - teamB === 1 && teamB !== 0)) {
      setWinner(teamNames.teamA);
    } else if ((teamB - teamA === 2 && teamA === 0)
      || (teamB - teamA === 1 && teamA !== 0)) {
      setWinner(teamNames.teamB);
    }
  }

  const handleCurrentPlayer = (scoringTeam: ITeam, currentScore: IScore, isRoundOver: boolean) => {
    const playerPositionCopy = { ...playerPosition };

    // team config: serve indices & score reference
    const teamConfig = {
      teamA: { positions: [0, 1], score: currentScore.teamA },
      teamB: { positions: [2, 3], score: currentScore.teamB },
    };

    const { positions, score } = teamConfig[scoringTeam];
    const [even, odd] = positions;

    if (isRoundOver) {
      setCurrentServePosition(even);
    } else if (positions.includes(currentServePositon)) {
      // Toggle positions if serving inside this team’s zone
      if (currentServePositon === even) {
        playerPositionCopy[scoringTeam][even] = "playerB";
        playerPositionCopy[scoringTeam][odd] = "playerA";
        setCurrentServePosition(odd);
      } else {
        playerPositionCopy[scoringTeam][even] = "playerA";
        playerPositionCopy[scoringTeam][odd] = "playerB";
        setCurrentServePosition(even);
      }
      setPlayerPosition(playerPositionCopy);
    } else {
      // Decide serve side based on even/odd score
      setCurrentServePosition(score % 2 === 0 ? even : odd);
    }
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

  const startNewGame = () => {
    setWinner('');
    resetCurrentRound();
    resetScore();
    setServingSide('teamA');
  }

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
          <p>Current Serve Position: {currentServePositon}</p>
        </div>
        : <></>}
      <div>
        <h3>Team A</h3>
        <p>{teamAPlayerA}</p>
        <p>{teamAPlayerB}</p>
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
        <p>{teamBPlayerA}</p>
        <p>{teamBPlayerB}</p>
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

type IPlayerPosition = {
  [team in ITeam]: { [key: number]: string; };
};
