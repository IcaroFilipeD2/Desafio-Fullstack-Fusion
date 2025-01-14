import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
