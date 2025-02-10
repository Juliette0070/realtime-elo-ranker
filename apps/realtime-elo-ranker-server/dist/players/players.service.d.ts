import { Repository } from 'typeorm';
import { Player } from './player.entity';
export declare class PlayersService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    create(name: string): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: number): Promise<Player | null>;
    updateElo(id: number, newElo: number): Promise<void>;
    findAllSortedByElo(): Promise<Player[]>;
}
