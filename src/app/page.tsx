'use client'

import { useState } from "react";

export default function Home() {
  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [winner, setWinner] = useState('');

  const [noOfRounds, setNoOfRounds] = useState(1);

  const [score, setScore] = useState({
    teamA: 0,
    teamB: 0
  });

  const [servingSide, setservingSide] = useState<ITeam>('teamA');

  const handleScore = (scoringTeam: ITeam) => {
    const localScore = { ...score, [scoringTeam]: score[scoringTeam] + 1 };
    setScore(localScore);

    // https://www.olympics.com/en/news/badminton-guide-how-to-play-rules-olympic-history
    if (localScore.teamA >= 20 && localScore.teamB >= 20) {
      if (localScore[scoringTeam] === 30) {
        setWinner(teamNames[scoringTeam]);
        return;
      } else if (Math.abs(localScore.teamA - localScore.teamB) === 2) {
        setWinner(teamNames[scoringTeam]);
        return;
      }
    } else if (localScore[scoringTeam] === 21) {
      setWinner(teamNames[scoringTeam]);
      return;
    }
    setservingSide(scoringTeam);
  }

  return (
    <div>
      {winner.length > 0
        ? <div>
          <p>Winner: {winner}</p>
          <button>New Game</button>
        </div>
        : <></>}
      <div>Serving Team: {teamNames[servingSide]}</div>
      <div>
        <h3>Team A</h3>
        <p>Player A1</p>
        <p>Player A2</p>
        <p>Score: {score.teamA}</p>
        <div>
          <button onClick={() => handleScore('teamA')}>Score</button>
        </div>
      </div>
      <div>
        <h3>Team B</h3>
        <p>Player B1</p>
        <p>Player B2</p>
        <p>Score: {score.teamB}</p>
        <div>
          <button onClick={() => handleScore('teamB')}>Score</button>
        </div>
      </div>
      <div>
        <button>Undo</button>
      </div>
    </div>
  );
}

type ITeam = 'teamA' | 'teamB';