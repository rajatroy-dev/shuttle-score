import { create } from 'zustand';

const teamNames = {
    'teamA': 'Team A',
    'teamB': 'Team B'
};

const useAppStore = create((set) => ({
    winner: '',
    noOfRounds: 3,
    score: [{
        teamA: 0,
        teamB: 0
    }],
    setWinner: (value: ITeam) => set({ winner: value }),
    setNoOfRounds: (value: number) => set({ noOfRounds: value }),
    // increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
}));

export default useAppStore;

export type ITeam = 'teamA' | 'teamB';

export type IAppState = {
    winner: ITeam;
    noOfRounds: number;
};

export type IScore = {
    teamA: number;
    teamB: number;
    winner?: 'teamA' | 'teamB';
};