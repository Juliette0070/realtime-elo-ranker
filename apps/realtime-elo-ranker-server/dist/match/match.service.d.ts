import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchService {
    create(createMatchDto: CreateMatchDto): Promise<{
        message: string;
        data: CreateMatchDto;
    }>;
}
