import { Injectable } from '@nestjs/common';
import { PlayersService } from '../players/players.service';

@Injectable()
export class RankingService {
  private rankings: { [playerId: string]: number } = {}; // Stocke le classement en cache

  constructor(private readonly playersService: PlayersService) {}

  async updateElo(winnerId: number, loserId: number): Promise<void> {
    const winner = await this.playersService.findOne(winnerId);
    const loser = await this.playersService.findOne(loserId);

    if (!winner || !loser) return;

    const kFactor = 32;
    const expectedWinnerScore =
      1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const expectedLoserScore =
      1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400));

    winner.elo = Math.round(winner.elo + kFactor * (1 - expectedWinnerScore));
    loser.elo = Math.round(loser.elo + kFactor * (0 - expectedLoserScore));

    await this.playersService.updateElo(winner.id, winner.elo);
    await this.playersService.updateElo(loser.id, loser.elo);
  }

  getRanking(playerId: string): number | null {
    return this.rankings[playerId] ?? null;
  }

  updateRanking(playerId: string, newScore: number): void {
    this.rankings[playerId] = newScore;
  }

  getAllRankings(): { [playerId: string]: number } {
    return this.rankings;
  }
}
