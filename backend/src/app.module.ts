import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './heroes/entities/hero.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ncPC0JoJ0kc',
      database: 'heroes_db',
      entities: [Hero],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Hero]),
  ],
})
export class AppModule {}
