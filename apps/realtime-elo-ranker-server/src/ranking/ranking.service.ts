import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingService {
  private rankings: { [playerId: string]: number } = {}; // Stocke le classement en cache

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
