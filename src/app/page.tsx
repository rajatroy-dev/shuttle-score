'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    teamA,
    teamAPlayerA,
    teamAPlayerB,
    setTeamA,
    setTeamAPlayerA,
    setTeamAPlayerB,
    teamB,
    teamBPlayerA,
    teamBPlayerB,
    setTeamB,
    setTeamBPlayerA,
    setTeamBPlayerB
  } = useAppStore((state: IAppStore) => state);

  const router = useRouter();

  return (
    <div className="container mx-auto px-8">
      <div className="flex flex-row">
        <div className="mt-8 mb-4 border-2 rounded p-6 basis-full md:basis-1/2">
          {/* <h2 className="text-center text-xl font-bold">FIRST TEAM</h2> */}
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
      <div className="flex flex-row">
        <div className="hidden md:block basis-1/2"></div>
        <div className="my-4 border-2 rounded p-6 basis-full md:basis-1/2">
          {/* <h2 className="text-center text-xl font-bold">SECOND TEAM</h2> */}
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
              value={teamBPlayerA}
              onChange={(event) => setTeamBPlayerA(event.target.value)}
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
              value={teamBPlayerB}
              onChange={(event) => setTeamBPlayerB(event.target.value)}
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
          router.push('/match');
        }}
        className={`
          block text-center my-4 w-full border-2 rounded py-2 font-bold
          bg-slate-200 dark:bg-slate-800
        `}>
        START MATCH
      </a>
    </div>
  );
}
