import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Player } from '../players/player.entity'; // Assure-toi que l'entité Player est bien importée

@Module({
  imports: [TypeOrmModule.forFeature([Player])], // Injecte le repository Player
  controllers: [MatchController], // Expose le contrôleur
  providers: [MatchService], // Enregistre le service
})
export class MatchModule {}
