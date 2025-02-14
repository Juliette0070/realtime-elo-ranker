import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { of } from 'rxjs';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getAllPlayersSortedByElo: jest.fn(),
            updateElo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get ranking', async () => {
    const players = [{ id: '1', rank: 1200 }, { id: '2', rank: 1300 }];
    jest.spyOn(service, 'getAllPlayersSortedByElo').mockResolvedValue(players);

    const result = await controller.getRanking();
    expect(result).toEqual(players);
  });

  it('should update Elo of players', async () => {
    const winnerId = '1';
    const loserId = '2';
    jest.spyOn(service, 'updateElo').mockResolvedValue();

    await controller.updateElo(winnerId, loserId);

    expect(service.updateElo).toHaveBeenCalledWith(winnerId, loserId);
  });
});
