"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../players/player.entity");
let MatchService = class MatchService {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    calculateElo(winnerElo, loserElo, draw) {
        const k = 64;
        const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));
        console.log(expectedWinner, expectedLoser);
        console.log(winnerElo, loserElo);
        let newWinnerElo = winnerElo;
        let newLoserElo = loserElo;
        if (draw) {
            newWinnerElo = winnerElo + k * (0.5 - expectedWinner);
            newLoserElo = loserElo + k * (0.5 - expectedLoser);
        }
        else {
            newWinnerElo = winnerElo + k * (1 - expectedWinner);
            newLoserElo = loserElo + k * (0 - expectedLoser);
        }
        console.log(newWinnerElo, newLoserElo);
        return [Math.round(newWinnerElo), Math.round(newLoserElo)];
    }
    async createMatch(winnerId, loserId, draw) {
        const winner = await this.playerRepository.findOne({ where: { id: winnerId } });
        const loser = await this.playerRepository.findOne({ where: { id: loserId } });
        if (!winner || !loser) {
            throw new common_1.NotFoundException('Les joueurs doivent exister pour enregistrer un match');
        }
        const [newWinnerElo, newLoserElo] = this.calculateElo(winner.rank, loser.rank, draw);
        await this.playerRepository.update(winnerId, { rank: newWinnerElo });
        await this.playerRepository.update(loserId, { rank: newLoserElo });
        return { message: 'Match terminé, Elo mis à jour' };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MatchService);
//# sourceMappingURL=match.service.js.map