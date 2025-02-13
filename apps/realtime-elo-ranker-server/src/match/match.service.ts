import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchService {
  async create(createMatchDto: CreateMatchDto) {
    // Logique pour enregistrer le match dans la base de données
    console.log(createMatchDto);
    return { message: 'Match créé avec succès', data: createMatchDto };
  }
}
