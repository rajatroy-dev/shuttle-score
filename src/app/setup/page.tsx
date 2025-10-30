'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppState, IAppStore } from "@/app/_stores/app-store";
import { useSearchParams } from "next/navigation";
import DoublesSetup from "@/app/ui/doubles/setup";
import SinglesSetup from "@/app/ui/singles/setup";
import { useEffect, useState } from "react";

export default function Setup() {
  const {
    matchType,
  } = useAppStore((state: IAppStore) => state);

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const matchId = searchParams.get('id');

  const [state, setState] = useState<IAppState | undefined>(undefined);

  useEffect(() => {
    const currentMatchStr = matchId ? localStorage.getItem(matchId) : null;
    if (currentMatchStr) {

      setState(JSON.parse(currentMatchStr));
    }
  }, []);

  return (
    <>
      {matchType === 'doubles' || type === 'doubles'
        ? <DoublesSetup state={state} />
        : <SinglesSetup state={state} />}
    </>
  );
}
