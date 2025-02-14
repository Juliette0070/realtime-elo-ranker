import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { NotFoundException } from '@nestjs/common';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        MatchService,
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createMatch on service and return a success message', async () => {
    const createMatchDto: CreateMatchDto = { winner: '1', loser: '2', draw: false };
    const result = { message: 'Match terminé, Elo mis à jour' };

    jest.spyOn(service, 'createMatch').mockResolvedValue(result);

    expect(await controller.createMatch(createMatchDto)).toEqual(result);
    expect(service.createMatch).toHaveBeenCalledWith('1', '2', false);
  });

  it('should throw NotFoundException if player not found', async () => {
    const createMatchDto: CreateMatchDto = { winner: '1', loser: '2', draw: false };
    
    jest.spyOn(service, 'createMatch').mockRejectedValue(new NotFoundException('Les joueurs doivent exister pour enregistrer un match'));

    try {
      await controller.createMatch(createMatchDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Les joueurs doivent exister pour enregistrer un match');
    }
  });
});
