import { Injectable } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';

@Injectable()
export class RankingService {
  constructor(private readonly playersService: PlayersService) {}

  async updateElo(winnerId: string, loserId: string): Promise<void> {
    const winner = await this.playersService.findOne(winnerId);
    const loser = await this.playersService.findOne(loserId);

    if (!winner || !loser) return;

    const kFactor = 32;
    const expectedWinnerScore =
      1 / (1 + Math.pow(10, (loser.rank - winner.rank) / 400));
    const expectedLoserScore =
      1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));

    winner.rank = Math.round(winner.rank + kFactor * (1 - expectedWinnerScore));
    loser.rank = Math.round(loser.rank + kFactor * (0 - expectedLoserScore));

    await this.playersService.updateElo(winner.id, winner.rank);
    await this.playersService.updateElo(loser.id, loser.rank);
  }

  async getAllPlayersSortedByElo(): Promise<Player[]> {
    return this.playersService.findAllSortedByElo();
  }
}
