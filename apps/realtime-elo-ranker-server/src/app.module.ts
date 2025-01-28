import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [PlayersModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
