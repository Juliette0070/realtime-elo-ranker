import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn() // On le met en clé primaire mais sans auto-incrément
  id: string;


  @Column({ default: 1000 }) // Score de base ELO
  rank: number;
}
