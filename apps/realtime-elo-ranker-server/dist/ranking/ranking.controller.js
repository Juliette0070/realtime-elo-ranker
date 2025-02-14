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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ranking_service_1 = require("./ranking.service");
let RankingController = class RankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    async getRanking() {
        return this.rankingService.getAllPlayersSortedByElo();
    }
    async updateElo(winnerId, loserId) {
        await this.rankingService.updateElo(winnerId, loserId);
    }
    events() {
        return (0, rxjs_1.interval)(5000).pipe((0, operators_1.switchMap)(() => (0, rxjs_1.from)(this.rankingService.getAllPlayersSortedByElo())), (0, operators_1.concatMap)((ranking) => (0, rxjs_1.from)(ranking).pipe((0, operators_1.map)((player) => ({
            id: Date.now().toString(),
            event: 'message',
            data: JSON.stringify({
                type: "RankingUpdate",
                player: {
                    id: player.id,
                    rank: player.rank
                }
            })
        })))));
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)('winnerId')),
    __param(1, (0, common_1.Body)('loserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "updateElo", null);
__decorate([
    (0, common_1.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "events", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map