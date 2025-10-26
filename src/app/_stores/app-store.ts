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
    servingSide: ITeam | IPlayer;
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
    setServingSide: (value: ITeam | IPlayer) => void;
    setScore: (value: IScore[]) => void;
    resetScore: () => void;
};

export type IAppStore = IAppState & IAppActions;

export const initAppStore = (): IAppState => {
    const defaultValues: IAppState = {
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
            teamB: 0,
            playerA: 0,
            playerB: 0
        }],
        currentRound: 0,
        servingSide: 'teamA'
    };

    const currentMatchId = localStorage.getItem('currentMatchId');
    const history: {[key: string]: IAppState} = localStorage.getItem('history') && JSON.parse(localStorage.getItem('history')!);
    const currentMatch = currentMatchId && history ? history[currentMatchId] : null;

    if (currentMatch) {
        defaultValues.matchType = currentMatch.matchType;
        defaultValues.playerA = currentMatch.playerA;
        defaultValues.playerB = currentMatch.playerB;
        defaultValues.teamA = currentMatch.teamA;
        defaultValues.teamAPlayerA = currentMatch.teamAPlayerA;
        defaultValues.teamAPlayerB = currentMatch.teamAPlayerB;
        defaultValues.teamB = currentMatch.teamB;
        defaultValues.teamBPlayerC = currentMatch.teamBPlayerC;
        defaultValues.teamBPlayerD = currentMatch.teamBPlayerD;
        defaultValues.winner = currentMatch.winner;
        defaultValues.noOfRounds = currentMatch.noOfRounds;
        defaultValues.score = currentMatch.score;
        defaultValues.currentRound = currentMatch.currentRound;
        defaultValues.servingSide = currentMatch.servingSide;

    }

    return defaultValues;
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
        teamB: 0,
        playerA: 0,
        playerB: 0
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
        setTeamAPlayerA: (value: string) => set({ teamAPlayerA: value }),
        setTeamAPlayerB: (value: string) => set({ teamAPlayerB: value }),
        setTeamB: (value: string) => set({ teamB: value }),
        setTeamBPlayerC: (value: string) => set({ teamBPlayerC: value }),
        setTeamBPlayerD: (value: string) => set({ teamBPlayerD: value }),
        setWinner: (value: string) => set({ winner: value }),
        setNoOfRounds: (value: number) => set({ noOfRounds: value }),
        setScore: (value: IScore[]) => set({ score: value }),
        incrementRound: () => set((state: IAppState) => ({ currentRound: state.currentRound + 1 })),
        setCurrentRound: (value: number) => set({ currentRound: value }),
        setServingSide: (value: ITeam | IPlayer) => set({ servingSide: value }),
        resetCurrentRound: () => set({ currentRound: 0 }),
        resetScore: () => set({
            score: [{
                teamA: 0,
                teamB: 0,
                playerA: 0,
                playerB: 0
            }]
        })
    }));
}

export type ITeam = 'teamA' | 'teamB';

export type IPlayer = 'playerA' | 'playerB';

export type IMatchType = 'singles' | 'doubles';

export type IScore = {
    teamA?: number;
    teamB?: number;
    playerA?: number;
    playerB?: number;
    winner?: 'teamA' | 'teamB' | 'playerA' | 'playerB';
};
