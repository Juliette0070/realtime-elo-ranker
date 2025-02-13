import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';
export declare class RankingService {
    private readonly playersService;
    constructor(playersService: PlayersService);
    updateElo(winnerId: string, loserId: string): Promise<void>;
    getAllPlayersSortedByElo(): Promise<Player[]>;
}
