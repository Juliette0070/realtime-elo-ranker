import {
    Controller,
    Get,
    Sse,
    MessageEvent,
  } from '@nestjs/common';
  import { Observable, interval, map } from 'rxjs';
  import { RankingService } from './ranking.service';
  
  @Controller('api/ranking')
  export class RankingController {
    constructor(private readonly rankingService: RankingService) {}
  
    @Get()
    async getRanking() {
      return this.rankingService.getAllPlayersSortedByElo();
    }
  
    @Sse('events')
    events(): Observable<MessageEvent> {
      return interval(5000).pipe(
        map(() => ({
          data: { ranking: this.rankingService.getAllPlayersSortedByElo() },
        })),
      );
    }
  }
  