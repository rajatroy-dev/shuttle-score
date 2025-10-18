import { createStore } from 'zustand/vanilla';

export type IAppState = {
    matchType: IMatchType;
    playerA: string;
    playerB: string;
    teamA: string;
    teamAPlayerA: string;
    teamAPlayerB: string;
    teamB: string;
    teamBPlayerC: string;
    teamBPlayerD: string;
    winner: string;
    noOfRounds: number;
    score: IScore[];
    currentRound: number;
    servingSide: ITeam;
};

export type IAppActions = {
    setMatchType: (value: IMatchType) => void,
    setPlayerA: (value: string) => void,
    setPlayerB: (value: string) => void,
    setTeamA: (value: string) => void,
    setTeamAPlayerA: (value: string) => void,
    setTeamAPlayerB: (value: string) => void,
    setTeamB: (value: string) => void,
    setTeamBPlayerC: (value: string) => void,
    setTeamBPlayerD: (value: string) => void,
    setWinner: (value: string) => void;
    incrementRound: () => void;
    resetCurrentRound: () => void;
    setCurrentRound: (value: number) => void;
    setServingSide: (value: ITeam) => void;
    setScore: (value: IScore[]) => void;
    resetScore: () => void;
};

export type IAppStore = IAppState & IAppActions;

export const initAppStore = (): IAppState => {
    return {
        matchType: 'singles',
        playerA: 'Player A',
        playerB: 'Player B',
        teamA: 'Team A',
        teamAPlayerA: 'Player A',
        teamAPlayerB: 'Player B',
        teamB: 'Team B',
        teamBPlayerC: 'Player C',
        teamBPlayerD: 'Player D',
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

export const appInitialState: IAppState = {
    matchType: 'singles',
    playerA: 'Player A',
    playerB: 'Player B',
    teamA: 'Team A',
    teamAPlayerA: 'Player A',
    teamAPlayerB: 'Player B',
    teamB: 'Team B',
    teamBPlayerC: 'Player C',
    teamBPlayerD: 'Player D',
    winner: '',
    noOfRounds: 3,
    score: [{
        teamA: 0,
        teamB: 0
    }],
    currentRound: 0,
    servingSide: 'teamA'
};

export const createAppStore = (initState: IAppState = appInitialState) => {
    return createStore<IAppStore>()((set) => ({
        ...initState,
        setMatchType: (value: IMatchType) => set({ matchType: value }),
        setPlayerA: (value: string) => set({ playerA: value }),
        setPlayerB: (value: string) => set({ playerB: value }),
        setTeamA: (value: string) => set({ teamA: value }),
        setTeamAPlayerA: (value: string) => {
            console.log('Store', value);
            set({ teamAPlayerA: value });
        },
        setTeamAPlayerB: (value: string) => set({ teamAPlayerB: value }),
        setTeamB: (value: string) => set({ teamA: value }),
        setTeamBPlayerC: (value: string) => set({ teamBPlayerC: value }),
        setTeamBPlayerD: (value: string) => set({ teamBPlayerD: value }),
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

export type IMatchType = 'singles' | 'doubles';

export type IScore = {
    teamA: number;
    teamB: number;
    winner?: 'teamA' | 'teamB';
};
