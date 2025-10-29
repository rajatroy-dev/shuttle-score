'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppState, IAppStore } from "@/app/_stores/app-store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function SinglesSetup(props: PropsWithChildren<ILocalState>) {
  const {
    playerA,
    setPlayerA,
    playerB,
    setPlayerB,
    setServingSide
  } = useAppStore((state: IAppStore) => state);

  useEffect(() => {
    if (props.state) {
      setPlayerA(props.state.playerA);
      setPlayerB(props.state.playerB);
    }
  }, []);

  const router = useRouter();

  const [isTossed, setTossed] = useState(false);
  const [tossWinner, setTossWinnner] = useState('TOSS');
  const [startMatch, setStartMatch] = useState('START MATCH');

  const coinToss = () => {
    console.log(Math.random());
    return Math.floor(Math.random() * 100) + 1
  }

  const handleToss = () => {
    setTossWinnner(playerA);

    const intervalOne = setInterval(() => setTossWinnner(playerB), 100);
    const intervalTwo = setInterval(() => setTossWinnner(playerA), 200);

    const tossResult = coinToss();
    console.log(tossResult);

    setTimeout(() => {
      clearInterval(intervalOne);
      clearInterval(intervalTwo);

      if (tossResult % 2 === 0) {
        setPlayerA(playerB);
        setPlayerB(playerA);
      }
      setTossWinnner(tossResult % 2 !== 0 ? playerA : playerB);
      setStartMatch(`TOSS WINNER: ${tossResult % 2 !== 0 ? playerA : playerB} !`);

      setTimeout(() => setStartMatch('START MATCH'), 5000);

      setTossed(true);
    }, 5000);

  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-row w-full">
        <div className={`
          mt-8 mb-4 p-6 
          basis-full md:basis-1/2
        `}>
          <div className="mb-6">
            <input
              type="text"
              id="playerA"
              value={playerA}
              onChange={(event) => setPlayerA(event.target.value)}
              className={`
                bg-slate-200 dark:bg-slate-800 placeholder:text-slate-500 dark:placeholder:text-slate-400
                rounded 
                px-3 py-2 w-full
                shadow-md
              `}
              placeholder="Team A" />
          </div>
        </div>
        <div className={`
          hidden md:block 
          basis-1/2  
        `}></div>
      </div>
      <p className="text-center text-xl font-bold my-2">
        &#11835;
        VS
        &#11835;
      </p>
      <div className="flex flex-row w-full">
        <div className={`
          hidden md:block 
          basis-1/2  
        `}></div>
        <div className={`
          mt-8 mb-4 p-6 
          basis-full md:basis-1/2
        `}>
          <div className="mb-6">
            <input
              type="text"
              id="playerB"
              value={playerB}
              onChange={(event) => setPlayerB(event.target.value)}
              className={`
                bg-slate-200 dark:bg-slate-800 placeholder:text-slate-500 dark:placeholder:text-slate-400
                rounded 
                px-3 py-2 w-full
                shadow-md
              `}
              placeholder="Team B" />
          </div>
        </div>
      </div>

      {isTossed ?
        <a
          onClick={(e) => {
            e.preventDefault();
            setServingSide('playerA');
            router.push('/match');
          }}
          className={`
          block my-4 w-full py-2 
          bg-slate-200 dark:bg-slate-800 
          text-center font-bold
          shadow-md cursor-pointer
          rounded
        `}>
          {startMatch}
        </a> :
        <a
          onClick={(e) => {
            e.preventDefault();
            handleToss();
          }}
          className={`
          block my-4 w-full py-2 
          bg-slate-200 dark:bg-slate-800 
          text-center font-bold
          shadow-md cursor-pointer
          rounded
        `}>
          {tossWinner}
        </a>}
    </div>
  );
}

type ILocalState = {
  state?: IAppState;
};
