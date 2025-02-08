"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const player_entity_1 = require("./players/player.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "elo_ranker",
    synchronize: true,
    logging: true,
    entities: [player_entity_1.Player],
});
//# sourceMappingURL=data-source.js.map