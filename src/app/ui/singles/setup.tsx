'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import { useRouter } from "next/navigation";

export default function SinglesSetup() {
  const {
    playerA,
    setPlayerA,
    playerB,
    setPlayerB,
  } = useAppStore((state: IAppStore) => state);

  const router = useRouter();

  return (
    <div className="container mx-auto px-8">
      <div className="flex flex-row">
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
      <div className="flex flex-row">
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

      <a
        onClick={(e) => {
          e.preventDefault();
          router.push('/match');
        }}
        className={`
          block my-4 w-full py-2 
          bg-slate-200 dark:bg-slate-800 
          text-center font-bold
          shadow-md cursor-pointer
          rounded
        `}>
        START MATCH
      </a>
    </div>
  );
}
