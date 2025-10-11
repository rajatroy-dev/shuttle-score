'use client'

import { createAppStore, IAppStore, initAppStore } from "@/app/_stores/app-store";
import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
    children: ReactNode
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
    const storeRef = useRef<AppStoreApi | null>(null);

    if (storeRef.current === null) {
        storeRef.current = createAppStore(initAppStore());
    }

    return (
        <AppStoreContext.Provider value={storeRef.current}>
            {children}
        </AppStoreContext.Provider>
    );
};

export const useAppStore = <T,>(selector: (store: IAppStore) => T,): T => {
    const appStoreContext = useContext(AppStoreContext);

    if (!appStoreContext) {
        throw new Error(`useApptore must be used within AppStoreProvider`);
    }

    return useStore(appStoreContext, selector);
};