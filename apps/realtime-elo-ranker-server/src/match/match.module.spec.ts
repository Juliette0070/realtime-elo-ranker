import { Test, TestingModule } from '@nestjs/testing';
import { MatchModule } from './match.module';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Player } from '../players/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MatchModule', () => {
  let module: TestingModule;
  let service: MatchService;
  let controller: MatchController;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Player])],
      controllers: [MatchController],
      providers: [MatchService],
    }).compile();

    service = module.get<MatchService>(MatchService);
    controller = module.get<MatchController>(MatchController);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should have MatchService as provider', () => {
    expect(service).toBeInstanceOf(MatchService);
  });

  it('should have MatchController as controller', () => {
    expect(controller).toBeInstanceOf(MatchController);
  });

  it('should inject player repository into service', () => {
    expect(playerRepository).toBeDefined();
  });
});
