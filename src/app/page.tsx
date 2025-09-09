'use client'

import { useState } from "react";

export default function Home() {
  const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
  };

  const [score, setScore] = useState({
    teamA: 0,
    teamB: 0
  });

  const [servingSide, setservingSide] = useState<ITeam>('teamA');

  const handleScore = (scoringTeam: ITeam) => {
    setScore({ ...score, [scoringTeam]: score[scoringTeam] + 2 });
    setservingSide(scoringTeam);
  }

  return (
    <div>
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