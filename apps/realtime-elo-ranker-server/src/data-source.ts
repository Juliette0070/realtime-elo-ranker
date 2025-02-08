import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./players/player.entity";

export const AppDataSource = new DataSource({
  type: "postgres", // ou "mysql" selon ton SGBD
  host: "localhost",
  port: 5432, // 3306 pour MySQL
  username: "user",
  password: "password",
  database: "elo_ranker",
  synchronize: true, // Toujours "false" en production
  logging: true,
  entities: [Player], // Ajoute tes entités ici
});
