import { Repository } from 'typeorm';
import { Player } from '../players/player.entity';
export declare class MatchService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    private calculateElo;
    createMatch(winnerId: string, loserId: string, draw: boolean): Promise<{
        message: string;
    }>;
}
