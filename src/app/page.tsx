'use client'

import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState({
    teamA: 0,
    teamB: 0
  });

  const [servingSide, setservingSide] = useState<'teamA' | 'teamB'>('teamA');

  const handleScore = () => {
    setScore({ ...score, [servingSide]: score[servingSide] + 2 });
  }

  return (
    <div>
      <div>
        <h3>Team A</h3>
        <p>Player A1</p>
        <p>Player A2</p>
        <p>Score: {score.teamA}</p>
        <div>
          <button onClick={handleScore}>Score</button>
        </div>
      </div>
      <div>
        <h3>Team B</h3>
        <p>Player B1</p>
        <p>Player B2</p>
        <p>Score: {score.teamB}</p>
        <div>
          <button onClick={handleScore}>Score</button>
        </div>
      </div>
      <div>
        <button>Undo</button>
      </div>
    </div>
  );
}
