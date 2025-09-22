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
    currentRound: 0,
    servingSide: 'teamA',
    setWinner: (value: ITeam) => set({ winner: teamNames[value] }),
    setNoOfRounds: (value: number) => set({ noOfRounds: value }),
    setScore: (value: IScore) => set({ score: value }),
    setCurrentRound: () => set((state: IAppState) => ({ currentRound: state.currentRound + 1 })),
    setServingSide: (value: ITeam) => set({ servingSide: value })
    // removeAllBears: () => set({ bears: 0 }),
}));

export default useAppStore;

export type ITeam = 'teamA' | 'teamB';

export type IScore = {
    teamA: number;
    teamB: number;
    winner?: 'teamA' | 'teamB';
};

export type IAppState = {
    winner: ITeam;
    noOfRounds: number;
    score: IScore;
    currentRound: number;
    servingSide: ITeam;
};