import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingService } from './ranking/ranking.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/player.entity';
import { PlayersModule } from './players/players.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '3424',
      database: 'elo_ranker',
      entities: [Player],
      synchronize: true, // ⚠️ En prod, remplacer par migrations
    }),
    PlayersModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService, RankingService],
  exports: [RankingService],
})
export class AppModule {}
