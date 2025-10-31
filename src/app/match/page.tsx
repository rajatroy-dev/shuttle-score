'use client'

import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/app/_providers/app-provider";
import { IAppState, IAppStore } from "@/app/_stores/app-store";
import DoublesMatch from "@/app/ui/doubles/match";
import SinglesMatch from "@/app/ui/singles/match";
import { useEffect, useState } from "react";

export default function Match() {
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
    <div>
      {matchType === 'doubles' || type === 'doubles'
        ? <DoublesMatch state={state} />
        : <SinglesMatch state={state} />}
    </div>
  );
}
