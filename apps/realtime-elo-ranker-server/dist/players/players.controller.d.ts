import { PlayersService } from './players.service';
import { Player } from './player.entity';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(body: {
        name: string;
    }): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
}
