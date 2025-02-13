import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../players/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  private calculateElo(winnerElo: number, loserElo: number, draw: boolean): [number, number] {
    const k = 64; // Facteur K pour l'ajustement Elo
    const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));
  
    console.log(expectedWinner, expectedLoser);
    console.log(winnerElo, loserElo);
  
    let newWinnerElo = winnerElo;
    let newLoserElo = loserElo;
  
    if (draw) {
      // Si égalité, ajustement léger pour les deux joueurs
      newWinnerElo = winnerElo + k * (0.5 - expectedWinner); // Gain ou perte modéré
      newLoserElo = loserElo + k * (0.5 - expectedLoser);   // Gain ou perte modéré
    } else {
      // Si victoire, on applique les gains et pertes normaux
      newWinnerElo = winnerElo + k * (1 - expectedWinner); // Augmenter pour le gagnant
      newLoserElo = loserElo + k * (0 - expectedLoser);   // Diminuer pour le perdant
    }
  
    console.log(newWinnerElo, newLoserElo);
  
    return [Math.round(newWinnerElo), Math.round(newLoserElo)];
  }
  

  async createMatch(winnerId: string, loserId: string, draw: boolean): Promise<{ message: string }> {
    const winner = await this.playerRepository.findOne({ where: { id: winnerId } });
    const loser = await this.playerRepository.findOne({ where: { id: loserId } });

    if (!winner || !loser) {
      throw new NotFoundException('Les joueurs doivent exister pour enregistrer un match');
    }

    const [newWinnerElo, newLoserElo] = this.calculateElo(winner.rank, loser.rank, draw);
    await this.playerRepository.update(winnerId, { rank: newWinnerElo });
    await this.playerRepository.update(loserId, { rank: newLoserElo });

    return { message: 'Match terminé, Elo mis à jour' };
  }
}
