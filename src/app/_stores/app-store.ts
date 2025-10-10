import { createStore } from 'zustand/vanilla';

export type IIAppState = {
    teamA: string;
    teamAPlayerA: string;
    teamAPlayerB: string;
    teamB: string;
    teamBPlayerA: string;
    teamBPlayerB: string;
    winner: string;
    noOfRounds: number;
    score: IScore[];
    currentRound: number;
    servingSide: ITeam;
};

export type IAppActions = {
    setTeamA: (value: string) => void,
    setTeamAPlayerA: (value: string) => void,
    setTeamAPlayerB: (value: string) => void,
    setTeamB: (value: string) => void,
    setTeamBPlayerA: (value: string) => void,
    setTeamBPlayerB: (value: string) => void,
    setWinner: (value: string) => void;
    incrementRound: () => void;
    resetCurrentRound: () => void;
    setCurrentRound: (value: number) => void;
    setServingSide: (value: ITeam) => void;
    setScore: (value: IScore[]) => void;
    resetScore: () => void;
};

export type IAppStore = IIAppState & IAppActions;

export const initAppStore = (): IIAppState => {
    return {
        teamA: 'Team A',
        teamAPlayerA: 'Player A',
        teamAPlayerB: 'Player B',
        teamB: 'Team B',
        teamBPlayerA: 'Player A',
        teamBPlayerB: 'Player B',
        winner: '',
        noOfRounds: 3,
        score: [{
            teamA: 0,
            teamB: 0
        }],
        currentRound: 0,
        servingSide: 'teamA'
    }
}

export const appInitialState: IIAppState = {
    teamA: 'Team A',
    teamAPlayerA: 'Player A',
    teamAPlayerB: 'Player B',
    teamB: 'Team B',
    teamBPlayerA: 'Player A',
    teamBPlayerB: 'Player B',
    winner: '',
    noOfRounds: 3,
    score: [{
        teamA: 0,
        teamB: 0
    }],
    currentRound: 0,
    servingSide: 'teamA'
};

export const createAppStore = (initState: IIAppState = appInitialState) => {
    return createStore<IAppStore>()((set) => ({
        ...initState,
        setTeamA: (value: string) => set({ teamA: value }),
        setTeamAPlayerA: (value: string) => {
            console.log('Store', value);
            set({ teamAPlayerA: value });
        },
        setTeamAPlayerB: (value: string) => set({ teamAPlayerB: value }),
        setTeamB: (value: string) => set({ teamA: value }),
        setTeamBPlayerA: (value: string) => set({ teamBPlayerA: value }),
        setTeamBPlayerB: (value: string) => set({ teamBPlayerB: value }),
        setWinner: (value: string) => set({ winner: value }),
        setNoOfRounds: (value: number) => set({ noOfRounds: value }),
        setScore: (value: IScore[]) => set({ score: value }),
        incrementRound: () => set((state: IAppState) => ({ currentRound: state.currentRound + 1 })),
        setCurrentRound: (value: number) => set({ currentRound: value }),
        setServingSide: (value: ITeam) => set({ servingSide: value }),
        resetCurrentRound: () => set({ currentRound: 0 }),
        resetScore: () => set({
            score: [{
                teamA: 0,
                teamB: 0
            }]
        })
    }));
}

export type ITeam = 'teamA' | 'teamB';

export type IScore = {
    teamA: number;
    teamB: number;
    winner?: 'teamA' | 'teamB';
};

export type IAppState = {
    teamA: string;
    teamAPlayerA: string;
    teamAPlayerB: string;
    teamB: string;
    teamBPlayerA: string;
    teamBPlayerB: string;
    winner: string;
    noOfRounds: number;
    score: IScore[];
    currentRound: number;
    servingSide: ITeam;
    setTeamA: (value: string) => void,
    setTeamAPlayerA: (value: string) => void,
    setTeamAPlayerB: (value: string) => void,
    setTeamB: (value: string) => void,
    setTeamBPlayerA: (value: string) => void,
    setTeamBPlayerB: (value: string) => void,
    setWinner: (value: string) => void;
    incrementRound: () => void;
    resetCurrentRound: () => void;
    setCurrentRound: (value: number) => void;
    setServingSide: (value: ITeam) => void;
    setScore: (value: IScore[]) => void;
    resetScore: () => void;
};