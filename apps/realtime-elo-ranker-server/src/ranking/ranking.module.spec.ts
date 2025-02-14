import { Test, TestingModule } from '@nestjs/testing';
import { RankingModule } from './ranking.module';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PlayersModule } from '../players/players.module';

describe('RankingModule', () => {
  let rankingController: RankingController;
  let rankingService: RankingService;

  beforeEach(async () => {
    // Création du module de test avec toutes ses dépendances
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlayersModule, RankingModule], // Importation du module Ranking et des autres dépendances
    }).compile();

    // Initialisation des composants à tester
    rankingController = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    // Vérification que le module, le contrôleur et le service sont correctement définis
    expect(rankingController).toBeDefined();
    expect(rankingService).toBeDefined();
  });

  it('should call updateElo when ranking is updated', async () => {
    const winnerId = '1';
    const loserId = '2';

    // Mocking de la méthode updateElo
    jest.spyOn(rankingService, 'updateElo').mockResolvedValue();

    // Appel de la méthode du contrôleur
    await rankingController.updateElo(winnerId, loserId);

    // Vérification que la méthode updateElo du service a bien été appelée avec les bons arguments
    expect(rankingService.updateElo).toHaveBeenCalledWith(winnerId, loserId);
  });

});
