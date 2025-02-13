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
    username: "postgres",
    password: "3424",
    database: "elo_ranker",
    schema: "public",
    synchronize: false,
    logging: true,
    entities: [player_entity_1.Player],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Connexion à la base de données réussie");
})
    .catch((error) => {
    console.error("Erreur de connexion à la base de données", error);
});
//# sourceMappingURL=data-source.js.map