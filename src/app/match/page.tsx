'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import DoublesMatch from "../ui/doubles/match";
import SinglesMatch from "../ui/singles/match";

export default function Match() {
  const {
    matchType,
  } = useAppStore((state: IAppStore) => state);


  return (
    <div>
      {matchType === 'doubles'
        ? <DoublesMatch />
        : <SinglesMatch />}
    </div>
  );
}
