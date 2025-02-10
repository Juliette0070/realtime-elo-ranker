import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./players/player.entity";

export const AppDataSource = new DataSource({
  type: "postgres", // ou "mysql" selon ton SGBD
  host: "localhost",
  port: 5432, // 3306 pour MySQL
  username: "postgres",
  password: "3424",
  database: "elo_ranker",
  schema: "public",
  synchronize: false, // Toujours "false" en production
  logging: true,
  entities: [Player], // Ajoute tes entités ici
});


AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données", error);
  });