import { create } from 'zustand';

const useAppStore = create<IAppState>()((set) => ({
    winner: '',
    noOfRounds: 3,
    score: [{
        teamA: 0,
        teamB: 0
    }],
    currentRound: 0,
    servingSide: 'teamA',
    setWinner: (value: string) => set({ winner: value }),
    setNoOfRounds: (value: number) => set({ noOfRounds: value }),
    setScore: (value: IScore[]) => set({ score: value }),
    incrementRound: () => set((state: IAppState) => ({ currentRound: state.currentRound + 1 })),
    setServingSide: (value: ITeam) => set({ servingSide: value }),
    resetCurrentRound: () => set({ currentRound: 0 }),
    resetScore: () => set({
        score: [{
            teamA: 0,
            teamB: 0
        }]
    })
}));

export default useAppStore;

export type ITeam = 'teamA' | 'teamB';

export type IScore = {
    teamA: number;
    teamB: number;
    winner?: 'teamA' | 'teamB';
};

export type IAppState = {
    winner: string;
    noOfRounds: number;
    score: IScore[];
    currentRound: number;
    servingSide: ITeam;
    setWinner: (value: string) => void;
    incrementRound: () => void;
    resetCurrentRound: () => void;
    setServingSide: (value: ITeam) => void;
    setScore: (value: IScore[]) => void;
    resetScore: () => void;
};