import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Player } from '../players/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('MatchService', () => {
  let service: MatchService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate Elo correctly for a draw', () => {
    const winner = new Player();
    winner.rank = 1500;
    const loser = new Player();
    loser.rank = 1400;

    const [newWinnerElo, newLoserElo] = service['calculateElo'](winner.rank, loser.rank, true);

    expect(newWinnerElo).toBeGreaterThan(winner.rank);
    expect(newLoserElo).toBeGreaterThan(loser.rank);
  });

  it('should throw NotFoundException if player not found', async () => {
    jest.spyOn(playerRepository, 'findOne').mockResolvedValueOnce(null);

    try {
      await service.createMatch('1', '2', false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Les joueurs doivent exister pour enregistrer un match');
    }
  });

  it('should update Elo for both players on match completion', async () => {
    const winner = new Player();
    winner.rank = 1500;
    winner.id = '1';
    const loser = new Player();
    loser.rank = 1400;
    loser.id = '2';

    jest.spyOn(playerRepository, 'findOne').mockResolvedValueOnce(winner).mockResolvedValueOnce(loser);
    jest.spyOn(playerRepository, 'update').mockResolvedValue({ affected: 1 } as any);

    const result = await service.createMatch('1', '2', false);

    expect(result).toEqual({ message: 'Match terminé, Elo mis à jour' });
    expect(playerRepository.update).toHaveBeenCalledWith('1', { rank: expect.any(Number) });
    expect(playerRepository.update).toHaveBeenCalledWith('2', { rank: expect.any(Number) });
  });
});
