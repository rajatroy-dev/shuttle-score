'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    setMatchType,
  } = useAppStore((state: IAppStore) => state);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        onClick={(e) => {
          e.preventDefault();
          setMatchType('singles');
          router.push('/setup?type=singles');
        }}
        className={`
            block my-4 py-2 w-full h-64
            text-center font-bold
            bg-slate-200 dark:bg-slate-800
            shadow-md cursor-pointer
            rounded
            flex flex-row justify-center items-center
        `}>
        SINGLES
      </div>
      <p className={`
          text-center text-xl font-bold 
          my-2`
      }>
        &#11835;
        OR
        &#11835;
      </p>
      <div
        onClick={(e) => {
          e.preventDefault();
          setMatchType('doubles');
          router.push('/setup?type=doubles');
        }}
        className={`
            block my-4 py-2 w-full h-64
            text-center font-bold
            bg-slate-200 dark:bg-slate-800
            shadow-md cursor-pointer
            rounded
            flex flex-row justify-center items-center
        `}>
        DOUBLES
      </div>
    </div>
  );
}
