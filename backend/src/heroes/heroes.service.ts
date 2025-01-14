import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const newHero = this.heroRepository.create(createHeroDto);
    return await this.heroRepository.save(newHero);
  }

  async findAll(): Promise<Hero[]> {
    return await this.heroRepository.find();
  }

  async findOne(id: number): Promise<Hero> {
    return await this.heroRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    await this.heroRepository.update(id, updateHeroDto);
    return await this.heroRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.heroRepository.delete(id);
  }
}
