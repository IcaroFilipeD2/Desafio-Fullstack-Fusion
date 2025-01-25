import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  abilities: string[];

  @Column()
  origin: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  description?: string;
}
