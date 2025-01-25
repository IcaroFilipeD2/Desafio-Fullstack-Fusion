import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import axios from 'axios';

interface MarvelApiResponse {
  data: {
    results: any[];
  };
}
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
    const hero = await this.heroRepository.findOne({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }

  async findByName(name: string): Promise<Hero> {
    return await this.heroRepository.findOne({
      where: { name },
    });
  }

  async update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const hero = await this.findOne(id);
    if(!hero) {
      throw new NotFoundException('Hero not found');
    }

    await this.heroRepository.update(id, updateHeroDto);
    return await this.heroRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const hero = await this.findOne(id);
    if (!hero) {
      throw new NotFoundException('Hero not found');
    }
    await this.heroRepository.delete(id);
  }

  async validateMarvelHero(name: string): Promise<boolean> {
    const publicKey = '3da57c9ca3b5a4bd4000440271c7058c';
    const privateKey = '0bdc140027e90a8b0552046d02a05cd5cae322b2';
    const ts = new Date().getTime().toString();
    const hash = require('crypto')
     .createHash('md5')
     .update(ts + privateKey + publicKey)
     .digest('hex');

     try {
      const response = await axios.get<MarvelApiResponse>(
        `https://gateway.marvel.com/v1/public/characters`,
        {
          params: {
            name,
            apikey: publicKey,
            ts,
            hash,
          },
        },
      );

      const results = response.data.data.results;
      return results && results.length > 0;
     } catch (error) {
      console.error('Error vallidating Marvel hero:', error.message);
      return false;
     }
  }

  async findOrFail(id: number): Promise<Hero> {
    const hero = await this.findOne(id);
    if (!hero) {
      throw new NotFoundException('Hero not found');
    }
    return hero;
  }
}