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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("../players/players.service");
let RankingService = class RankingService {
    constructor(playersService) {
        this.playersService = playersService;
        this.rankings = {};
    }
    async updateElo(winnerId, loserId) {
        const winner = await this.playersService.findOne(winnerId);
        const loser = await this.playersService.findOne(loserId);
        if (!winner || !loser)
            return;
        const kFactor = 32;
        const expectedWinnerScore = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
        const expectedLoserScore = 1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400));
        winner.elo = Math.round(winner.elo + kFactor * (1 - expectedWinnerScore));
        loser.elo = Math.round(loser.elo + kFactor * (0 - expectedLoserScore));
        await this.playersService.updateElo(winner.id, winner.elo);
        await this.playersService.updateElo(loser.id, loser.elo);
    }
    getRanking(playerId) {
        return this.rankings[playerId] ?? null;
    }
    updateRanking(playerId, newScore) {
        this.rankings[playerId] = newScore;
    }
    getAllRankings() {
        return this.rankings;
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map