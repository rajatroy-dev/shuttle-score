'use client'

import { useState } from "react";
import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore, IPlayer, IScore, ITeam } from "@/app/_stores/app-store";

export default function SinglesMatch() {
  const {
    playerA,
    playerB,
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

  const playerNames = {
    'playerA': playerA,
    'playerB': playerB
  };

  const [playerPosition, setPlayerPosition] = useState<IPlayerPosition>({
    0: 'playerA',
    1: 'playerB'
  });

  const [playHistory, setPlayHistory] = useState<ISinglesHistory[]>([]);

  const handleScore = (scoringPlayer: ITeam) => {
    const localScore = {
      ...score[currentRound],
      [scoringPlayer]: score[currentRound][scoringPlayer]! + 1
    };
    const scoreCopy = [...score];
    const playHistoryCopy = [...playHistory];
    let isRoundOver = false;

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.playerA! >= 20 && localScore.playerB! >= 20) {
      if (localScore[scoringPlayer]! >= 30) {
        isRoundOver = true;
        declareRoundWinner(localScore, scoreCopy, scoringPlayer);
      } else if (Math.abs(localScore.playerA! - localScore.playerB!) >= 2) {
        isRoundOver = true;
        declareRoundWinner(localScore, scoreCopy, scoringPlayer);
      }
    } else if (localScore[scoringPlayer] === 21) {
      isRoundOver = true;
      declareRoundWinner(localScore, scoreCopy, scoringPlayer);
    }
    scoreCopy[currentRound] = localScore;
    setScore(scoreCopy);
    setServingSide(scoringPlayer);
    playHistoryCopy.push({
      scoringTeam: scoringPlayer,
      roundNumber: currentRound,
      score: scoreCopy,
    });
    handleCurrentPlayer(scoringPlayer, localScore, isRoundOver, playHistoryCopy);
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
      setWinner(playerNames.playerA);
    } else if ((teamB - teamA === 2 && teamA === 0)
      || (teamB - teamA === 1 && teamA !== 0)) {
      setWinner(playerNames.playerB);
    }
  }

  const handleCurrentPlayer = (scoringTeam: ITeam, currentScore: IScore, isRoundOver: boolean, playHistory: IHistory[]) => {
    const playerPositionCopy = { ...playerPosition };

    // team config: serve indices & score reference
    const teamConfig = {
      teamA: { positions: [0, 1], score: currentScore.teamA },
      teamB: { positions: [2, 3], score: currentScore.teamB },
    };

    const { positions, score } = teamConfig[scoringTeam];
    const [even, odd] = positions;

    if (isRoundOver) {
      playHistory[playHistory.length - 1].servePosition = even;
    } else if (positions.includes(currentServePositon)) {
      // Toggle positions if serving inside this team’s zone
      if (currentServePositon === even) {
        playerPositionCopy[scoringTeam][even] = "playerB";
        playerPositionCopy[scoringTeam][odd] = "playerA";
        playHistory[playHistory.length - 1].servePosition = odd;
      } else {
        playerPositionCopy[scoringTeam][even] = "playerA";
        playerPositionCopy[scoringTeam][odd] = "playerB";
        playHistory[playHistory.length - 1].servePosition = even;
      }
      setPlayerPosition(playerPositionCopy);
    } else {
      // Decide serve side based on even/odd score
      const spos = score! % 2 === 0 ? even : odd;
      playHistory[playHistory.length - 1].servePosition = spos;
    }

    setPlayHistory(playHistory);
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
          <p>Serving Player: {playerNames[servingSide as IPlayer]}</p>
        </div>
        : <></>}
      <div>
        <h3>{playerA}</h3>
        <div>
          <button
            disabled={winner.length > 0}
            onClick={() => handleScore('teamA')}>
            Score
          </button>
        </div>
      </div>
      <div>
        <h3>{playerB}</h3>
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

type ISinglesHistory = {
  scoringTeam: 'teamA' | 'teamB';
  roundNumber: number;
  score: IScore[];
};

type IPlayerPosition = {
  [team in 0 | 1]: { [key: number]: string; };
};
