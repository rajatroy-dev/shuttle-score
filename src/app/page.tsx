'use client'

import { useState } from "react";
import { IScore, ITeam } from "./_store/useAppStore";

export default function Home() {
  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [winner, setWinner] = useState('');

  const [noOfRounds, setNoOfRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(0);

  const [score, setScore] = useState<IScore[]>([{
    teamA: 0,
    teamB: 0
  }]);

  const [servingSide, setservingSide] = useState<ITeam>('teamA');

  const [playHistory, setPlayHistory] = useState<IHistory[]>([]);

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = { ...score[currentRound], [scoringTeam]: score[currentRound][scoringTeam] + 1 };
    const scoreCopy = [...score];

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] >= 30) {
        localScore.winner = scoringTeam;
        scoreCopy.push({
          teamA: 0,
          teamB: 0
        });
        handleNewRound();
      } else if (Math.abs(localScore.teamA - localScore.teamB) >= 2) {
        localScore.winner = scoringTeam;
        scoreCopy.push({
          teamA: 0,
          teamB: 0
        });
        handleNewRound();
      }
    } else if (localScore[scoringTeam] === 21) {
      localScore.winner = scoringTeam;
      scoreCopy.length <= 3 && scoreCopy.push({
        teamA: 0,
        teamB: 0
      });
      handleNewRound();
    }
    scoreCopy[currentRound] = localScore;
    setScore(scoreCopy);
    setservingSide(scoringTeam);
    console.log(winner);
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

    findWinner();

    setCurrentRound(newRound);
    setservingSide(newRound % 2 === 0 ? 'teamB' : 'teamA');
  }

  const findWinner = () => {
    let teamA = 0;
    let teamB = 0;

    score.forEach(it => {
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