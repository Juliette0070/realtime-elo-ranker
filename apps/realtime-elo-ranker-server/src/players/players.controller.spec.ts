import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { NotFoundException } from '@nestjs/common';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateElo: jest.fn(),
            findAllSortedByElo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a player', async () => {
    const player = new Player();
    player.id = '1';
    player.rank = 1000;

    jest.spyOn(service, 'create').mockResolvedValue(player);

    const result = await controller.createPlayer("1");
    expect(result).toEqual(player);
  });

  it('should find all players', async () => {
    const players = [{ id: '1', rank: 1000 }, { id: '2', rank: 1200 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(players);

    const result = await controller.findAll();
    expect(result).toEqual(players);
  });

  it('should find one player by id', async () => {
    const player = { id: '1', rank: 1000 };
    jest.spyOn(service, 'findOne').mockResolvedValue(player);

    const result = await controller.findOne('1');
    expect(result).toEqual(player);
  });

  it('should return 404 if player not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(null);

    await expect(controller.findOne('1')).rejects.toThrowError(NotFoundException);
  });
});
