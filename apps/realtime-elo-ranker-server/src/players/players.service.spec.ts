import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';

describe('PlayersService', () => {
  let service: PlayersService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player', async () => {
    const player = new Player();
    player.id = '1';
    player.rank = 1000;

    jest.spyOn(playerRepository, 'save').mockResolvedValue(player);

    const result = await service.create('1');
    expect(result).toEqual(player);
  });

  it('should throw error if player already exists', async () => {
    const player = new Player();
    player.id = '1';
    player.rank = 1000;

    jest.spyOn(playerRepository, 'findOneBy').mockResolvedValue(player);

    await expect(service.create('1')).rejects.toThrowError('Player ID already exists');
  });

  it('should find all players', async () => {
    const players = [{ id: '1', rank: 1000 }, { id: '2', rank: 1200 }];
    jest.spyOn(playerRepository, 'find').mockResolvedValue(players);

    const result = await service.findAll();
    expect(result).toEqual(players);
  });

  it('should find one player by id', async () => {
    const player = { id: '1', rank: 1000 };
    jest.spyOn(playerRepository, 'findOneBy').mockResolvedValue(player);

    const result = await service.findOne('1');
    expect(result).toEqual(player);
  });

  it('should update a player elo', async () => {
    jest.spyOn(playerRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    await service.updateElo('1', 1100);

    expect(playerRepository.update).toHaveBeenCalledWith('1', { rank: 1100 });
  });

  it('should return players sorted by elo', async () => {
    const players = [{ id: '2', rank: 1200 }, { id: '1', rank: 1000 }];
    jest.spyOn(playerRepository, 'find').mockResolvedValue(players);

    const result = await service.findAllSortedByElo();
    expect(result).toEqual(players);
  });
});
