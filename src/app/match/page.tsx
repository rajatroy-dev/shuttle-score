'use client'

import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import DoublesMatch from "@/app/ui/doubles/match";
import SinglesMatch from "@/app/ui/singles/match";

export default function Match() {
  const {
    matchType,
  } = useAppStore((state: IAppStore) => state);

  const searchParams = useSearchParams();
  const type = searchParams.get('type')

  return (
    <div>
      {matchType === 'doubles' || type === 'doubles'
        ? <DoublesMatch />
        : <SinglesMatch />}
    </div>
  );
}
