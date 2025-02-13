import { Controller, Get, Sse, MessageEvent, Post, Body } from '@nestjs/common';
import { Observable, interval, from } from 'rxjs';
import { switchMap, map, concatMap } from 'rxjs/operators';
import { RankingService } from './ranking.service';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking() {
    return this.rankingService.getAllPlayersSortedByElo();
  }

  // Mettre à jour le classement après un match
  @Post('update')
  async updateElo(
    @Body('winnerId') winnerId: string,
    @Body('loserId') loserId: string,
  ): Promise<void> {
    await this.rankingService.updateElo(winnerId, loserId);
  }

  @Sse('events')
  events(): Observable<MessageEvent> {
    return interval(5000).pipe(
      switchMap(() => from(this.rankingService.getAllPlayersSortedByElo())),
      concatMap((ranking: any) => 
        from(ranking).pipe(
          map((player: { id: string, rank: number }) => ({
            id: Date.now().toString(),
            event: 'message',
            data: JSON.stringify({
              type: "RankingUpdate",
              player: {
                id: player.id,
                rank: player.rank
              }
            })
          }))
        )
      )
    );
  }
}