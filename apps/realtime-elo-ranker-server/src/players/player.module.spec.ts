import { Test, TestingModule } from '@nestjs/testing';
import { PlayersModule } from './players.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlayersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        PlayersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',  // Utilisation d'une base en mémoire pour les tests
          entities: [Player],
          synchronize: true,
        }),
      ],
    }).compile();
  });

  it('should be defined', () => {
    const playersService = module.get<PlayersService>(PlayersService);
    const playersController = module.get<PlayersController>(PlayersController);

    expect(playersService).toBeDefined();
    expect(playersController).toBeDefined();
  });

  it('should have Player entity registered', () => {
    const repository = module.get(getRepositoryToken(Player));
    expect(repository).toBeDefined();
  });
});
