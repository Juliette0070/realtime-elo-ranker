import { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Promise<import("../players/player.entity").Player[]>;
    updateElo(winnerId: string, loserId: string): Promise<void>;
    events(): Observable<MessageEvent>;
}
