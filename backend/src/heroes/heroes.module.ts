import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])], // Entidade Hero
  controllers: [HeroesController], // Controller de Heróis
  providers: [HeroesService], // Service de Heróis
})
export class HeroesModule {}
