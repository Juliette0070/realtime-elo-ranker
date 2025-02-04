import { PlayersService } from '../players/players.service';
export declare class RankingService {
    private readonly playersService;
    private rankings;
    constructor(playersService: PlayersService);
    updateElo(winnerId: number, loserId: number): Promise<void>;
    getRanking(playerId: string): number | null;
    updateRanking(playerId: string, newScore: number): void;
    getAllRankings(): {
        [playerId: string]: number;
    };
}
