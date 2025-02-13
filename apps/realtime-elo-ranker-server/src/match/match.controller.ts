import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('api/match') // La route commence par '/api/match'
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }
}
