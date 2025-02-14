import { CreateMatchDto } from './create-match.dto';
import { validate } from 'class-validator';

describe('CreateMatchDto', () => {
  it('should be valid when all properties are correct', async () => {
    const createMatchDto = new CreateMatchDto();
    createMatchDto.winner = 'player1';
    createMatchDto.loser = 'player2';
    createMatchDto.draw = false;

    const errors = await validate(createMatchDto);

    expect(errors.length).toBe(0); // Aucune erreur si les données sont valides
  });

  it('should be invalid if winner is missing', async () => {
    const createMatchDto = new CreateMatchDto();
    createMatchDto.loser = 'player2';
    createMatchDto.draw = false;

    const errors = await validate(createMatchDto);

    expect(errors.length).toBeGreaterThan(0); // Il devrait y avoir des erreurs de validation
    expect(errors[0].property).toBe('winner');
  });

  it('should be invalid if loser is missing', async () => {
    const createMatchDto = new CreateMatchDto();
    createMatchDto.winner = 'player1';
    createMatchDto.draw = false;

    const errors = await validate(createMatchDto);

    expect(errors.length).toBeGreaterThan(0); // Il devrait y avoir des erreurs de validation
    expect(errors[0].property).toBe('loser');
  });

  it('should be invalid if draw is not a boolean', async () => {
    const createMatchDto = new CreateMatchDto();
    createMatchDto.winner = 'player1';
    createMatchDto.loser = 'player2';
    createMatchDto.draw = 'true' as unknown as boolean; // Valeur invalide

    const errors = await validate(createMatchDto);

    expect(errors.length).toBeGreaterThan(0); // Il devrait y avoir des erreurs de validation
    expect(errors[0].property).toBe('draw');
  });
});
