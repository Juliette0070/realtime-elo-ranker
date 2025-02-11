import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(name: string): Promise<Player> {
    if (name !== "") {
      throw new Error("Name should not be empty");
    }
    const player = this.playerRepository.create({ name });
    return this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: number): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async updateElo(id: number, newElo: number): Promise<void> {
    await this.playerRepository.update(id, { elo: newElo });
  }

  async findAllSortedByElo(): Promise<Player[]> {
    return this.playerRepository.find({ order: { elo: 'DESC' } });
  }
}
