import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';

describe('RankingService', () => {
  let service: RankingService;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: PlayersService,
          useValue: {
            findOne: jest.fn(),
            updateElo: jest.fn(),
            findAllSortedByElo: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update Elo after a match', async () => {
    const winner: Player = { id: '1', rank: 1200 };
    const loser: Player = { id: '2', rank: 1300 };

    jest.spyOn(playersService, 'findOne').mockResolvedValueOnce(winner).mockResolvedValueOnce(loser);
    jest.spyOn(playersService, 'updateElo').mockResolvedValue();

    await service.updateElo('1', '2');

    expect(playersService.findOne).toHaveBeenCalledTimes(2);
    expect(playersService.updateElo).toHaveBeenCalledTimes(2);
    expect(playersService.updateElo).toHaveBeenCalledWith('1', expect.any(Number));
    expect(playersService.updateElo).toHaveBeenCalledWith('2', expect.any(Number));
  });

  it('should return all players sorted by Elo', async () => {
    const players: Player[] = [{ id: '1', rank: 1200 }, { id: '2', rank: 1300 }];
    jest.spyOn(playersService, 'findAllSortedByElo').mockResolvedValue(players);

    const result = await service.getAllPlayersSortedByElo();
    expect(result).toEqual(players);
  });
});
