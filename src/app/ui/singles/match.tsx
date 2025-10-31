'use client'

import { PropsWithChildren, useEffect, useState } from "react";
import { useAppStore } from "@/app/_providers/app-provider";
import { IAppState, IAppStore, IPlayer, IScore } from "@/app/_stores/app-store";

export default function SinglesMatch(props: PropsWithChildren<ILocalState>) {
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

  useEffect(() => {
    if (props.state) {
      setCurrentRound(props.state.currentRound);
      setServingSide(props.state.servingSide);
      setScore(props.state.score);
      setWinner(props.state.winner);
    }
  }, []);

  const playerNames = {
    'playerA': playerA,
    'playerB': playerB
  };

  const [playerPosition, setPlayerPosition] = useState<IPlayerPosition>({
    0: 'playerA',
    1: 'playerB'
  });

  const [playHistory, setPlayHistory] = useState<ISinglesHistory[]>([]);

  const handleScore = (scoringPlayer: IPlayer) => {
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
      scoringPlayer: scoringPlayer,
      roundNumber: currentRound,
      score: scoreCopy,
    });
    setPlayHistory(playHistoryCopy);
  }

  const declareRoundWinner = (
    latestScore: IScore,
    roundScores: IScore[],
    scoringPlayer: IPlayer
  ) => {
    latestScore.winner = scoringPlayer;
    roundScores.length < 3 && roundScores.push({
      playerA: 0,
      playerB: 0
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
    let playerA = 0;
    let playerB = 0;

    latestRoundScores.forEach(it => {
      if (it.winner === 'playerA') ++playerA;
      else if (it.winner === 'playerB') ++playerB;
    });

    if ((playerA - playerB === 2 && playerB === 0)
      || (playerA - playerB === 1 && playerB !== 0)) {
      setWinner(playerNames.playerA);
    } else if ((playerB - playerA === 2 && playerA === 0)
      || (playerB - playerA === 1 && playerA !== 0)) {
      setWinner(playerNames.playerB);
    }
  }

  const handleUndo = () => {
    const playHistoryCopy = [...playHistory];
    if (playHistory.length <= 1) {
      setCurrentRound(0);
      setServingSide('playerA');
      setScore([{
        teamA: 0,
        teamB: 0,
        playerA: 0,
        playerB: 0
      }]);
    } else {
      const previousRally = playHistory[playHistory.length - 2];
      setCurrentRound(previousRally.roundNumber);
      setServingSide(previousRally.scoringPlayer);
      setScore(previousRally.score);
    }
    setWinner('');
    playHistoryCopy.pop();
    setPlayHistory(playHistoryCopy);
  }

  const startNewGame = () => {
    setWinner('');
    resetCurrentRound();
    resetScore();
    setServingSide('playerA');
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
            onClick={() => handleScore('playerA')}>
            Score
          </button>
        </div>
      </div>
      <div>
        <h3>{playerB}</h3>
        <div>
          <button
            disabled={winner.length > 0}
            onClick={() => handleScore('playerB')}>
            Score
          </button>
        </div>
      </div>
      {score.map((it, index) =>
        <div key={index}>
          <p>Round: {index + 1}</p>
          <p>Player A score: {it.playerA}</p>
          <p>Player B score: {it.playerB}</p>
        </div>
      )}
      <div>
        <button onClick={handleUndo}>Undo</button>
      </div>
    </div>
  );
}

type ISinglesHistory = {
  scoringPlayer: IPlayer;
  roundNumber: number;
  score: IScore[];
};

type IPlayerPosition = {
  [player in 0 | 1]: { [key: number]: string; };
};

type ILocalState = {
  state?: IAppState;
};
