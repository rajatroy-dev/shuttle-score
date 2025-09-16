'use client'

import { useState } from "react";

export default function Home() {
  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [winner, setWinner] = useState('');

  const [noOfRounds, setNoOfRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);

  const [score, setScore] = useState<IScore[]>([{
    teamA: 0,
    teamB: 0
  }]);

  const [servingSide, setservingSide] = useState<ITeam>('teamA');

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = { ...score[currentRound], [scoringTeam]: score[currentRound][scoringTeam] + 1 };
    const scoreCopy = [...score];
    scoreCopy[currentRound] = localScore;

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] === 30) {
        localScore.winner = scoringTeam;
        handleNewRound();
      } else if (Math.abs(localScore.teamA - localScore.teamB) === 2) {
        localScore.winner = scoringTeam;
        handleNewRound();
      }
    } else if (localScore[scoringTeam] === 21) {
      localScore.winner = scoringTeam;
      handleNewRound();
    }
    setScore(scoreCopy);
    setservingSide(scoringTeam);
  }

  const startNewGame = () => {
    setWinner('');
    setCurrentRound(0);
    setScore([{
      teamA: 0,
      teamB: 0
    }]);
    setservingSide('teamA');
  }

  const handleNewRound = () => {
    const newRound = currentRound + 1;

    if (newRound >= noOfRounds) {
      findWinner();
      return;
    }

    setCurrentRound(newRound);
    setScore([
      ...score,
      {
        teamA: 0,
        teamB: 0
      }
    ]);
    setservingSide(newRound % 2 === 0 ? 'teamB' : 'teamA');
  }

  const findWinner = () => {
    let teamA = 0;
    let teamB = 0;

    score.forEach(it => it.winner === 'teamA' ? ++teamA : ++teamB);

    if (teamA - teamB === 2) setWinner('teamA');
    else if (teamB - teamA === 2) setWinner('teamB');
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
        <p>Score: {score[currentRound].teamA}</p>
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
        <p>Score: {score[currentRound].teamB}</p>
        <div>
          <button
            disabled={winner.length > 0}
            onClick={() => handleScore('teamB')}>
            Score
          </button>
        </div>
      </div>
      <div>
        <button>Undo</button>
      </div>
    </div>
  );
}

type ITeam = 'teamA' | 'teamB';
type IScore = {
  teamA: number;
  teamB: number;
  winner?: 'teamA' | 'teamB';
};