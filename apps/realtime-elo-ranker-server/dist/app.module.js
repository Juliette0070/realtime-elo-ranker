"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const ranking_service_1 = require("./ranking/ranking.service");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("./players/player.entity");
const players_module_1 = require("./players/players.module");
const ranking_module_1 = require("./ranking/ranking.module");
const match_module_1 = require("./match/match.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '3424',
                database: 'elo_ranker',
                entities: [player_entity_1.Player],
                synchronize: true,
            }),
            players_module_1.PlayersModule,
            ranking_module_1.RankingModule,
            match_module_1.MatchModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ranking_service_1.RankingService],
        exports: [ranking_service_1.RankingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map