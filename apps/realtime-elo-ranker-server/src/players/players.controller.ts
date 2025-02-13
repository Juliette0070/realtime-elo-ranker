import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';

@Controller('api/player')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body('id') id: string): Promise<Player> {
    return this.playersService.create(id);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Player | null> {
    return this.playersService.findOne(id);
  }
}
