import { Player } from './player.entity';

describe('Player Entity', () => {
  it('should create a new player', () => {
    const player = new Player();
    player.id = '1';
    player.rank = 1000;

    expect(player.id).toBe('1');
    expect(player.rank).toBe(1000);
  });
});
