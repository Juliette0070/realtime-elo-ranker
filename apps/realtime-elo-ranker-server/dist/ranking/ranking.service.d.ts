export declare class RankingService {
    private rankings;
    getRanking(playerId: string): number | null;
    updateRanking(playerId: string, newScore: number): void;
    getAllRankings(): {
        [playerId: string]: number;
    };
}
