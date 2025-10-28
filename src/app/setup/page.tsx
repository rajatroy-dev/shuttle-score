'use client'

import { useAppStore } from "@/app/_providers/app-provider";
import { IAppStore } from "@/app/_stores/app-store";
import { useSearchParams } from "next/navigation";
import DoublesSetup from "@/app/ui/doubles/setup";
import SinglesSetup from "@/app/ui/singles/setup";

export default function Setup() {
  const {
    matchType,
  } = useAppStore((state: IAppStore) => state);

  const searchParams = useSearchParams();
  const type = searchParams.get('type')

  return (
    <>
      {matchType === 'doubles' || type === 'doubles'
        ? <DoublesSetup />
        : <SinglesSetup />}
    </>
  );
}
