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

  async create(id: string): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOne({ where: { id } });
    if (existingPlayer) {
      throw new Error("Player ID already exists");
    }
    const player = this.playerRepository.create({ id });
    return this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async updateElo(id: string, newElo: number): Promise<void> {
    await this.playerRepository.update(id, { rank: newElo });
  }

  async findAllSortedByElo(): Promise<Player[]> {
    return this.playerRepository.find({ order: { rank: 'DESC' } });
  }
}
