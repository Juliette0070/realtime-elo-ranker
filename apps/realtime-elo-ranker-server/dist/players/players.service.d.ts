import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayersService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    create(id: string): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    updateElo(id: string, newElo: number): Promise<void>;
    findAllSortedByElo(): Promise<Player[]>;
}
