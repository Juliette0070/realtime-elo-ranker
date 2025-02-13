import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    createMatch(createMatchDto: CreateMatchDto): Promise<{
        message: string;
        data: CreateMatchDto;
    }>;
}
