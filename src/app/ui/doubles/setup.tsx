'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import { useRouter } from "next/navigation";

export default function DoublesSetup() {
  const {
    teamA,
    teamAPlayerA,
    teamAPlayerB,
    setTeamA,
    setTeamAPlayerA,
    setTeamAPlayerB,
    teamB,
    teamBPlayerC,
    teamBPlayerD,
    setTeamB,
    setTeamBPlayerC,
    setTeamBPlayerD,
    setServingSide
  } = useAppStore((state: IAppStore) => state);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-row w-full">
        <div className="mt-8 mb-4 border-2 rounded p-6 basis-full md:basis-1/2">
          <div className="mb-6">
            <input
              type="text"
              id="teamA"
              value={teamA}
              onChange={(event) => setTeamA(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Team A" />
          </div>
          <div className="my-6 ms-8">
            <input
              type="text"
              id="teamA-playerA"
              value={teamAPlayerA}
              onChange={(event) => setTeamAPlayerA(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Player A" />
          </div>
          <div className="mt-6 ms-8">
            <input
              type="text"
              id="teamA-playerB"
              value={teamAPlayerB}
              onChange={(event) => setTeamAPlayerB(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Player B" />
          </div>
        </div>
        <div className="hidden md:block basis-1/2"></div>
      </div>
      <p className="text-center text-xl font-bold my-2">
        &#11835;
        VS
        &#11835;
      </p>
      <div className="flex flex-ro w-full">
        <div className="hidden md:block basis-1/2"></div>
        <div className="my-4 border-2 rounded p-6 basis-full md:basis-1/2">
          <div className="mb-6">
            <input
              type="text"
              id="teamB"
              value={teamB}
              onChange={(event) => setTeamB(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Team B" />
          </div>
          <div className="my-6 ms-8">
            <input
              type="text"
              id="teamB-playerA"
              value={teamBPlayerC}
              onChange={(event) => setTeamBPlayerC(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Player A" />
          </div>
          <div className="mt-6 ms-8">
            <input
              type="text"
              id="teamB-playerB"
              value={teamBPlayerD}
              onChange={(event) => setTeamBPlayerD(event.target.value)}
              className={`
              bg-slate-200 dark:bg-slate-800
              placeholder:text-slate-500 dark:placeholder:text-slate-400
              rounded px-3 py-2 w-full shadow-md
            `}
              placeholder="Player B" />
          </div>
        </div>
      </div>

      <a
        onClick={(e) => {
          e.preventDefault();
          setServingSide('teamA');
          router.push('/match');
        }}
        className={`
          block text-center my-4 w-full rounded py-2 font-bold
          bg-slate-200 dark:bg-slate-800 shadow-md cursor-pointer
        `}>
        START MATCH
      </a>
    </div>
  );
}
