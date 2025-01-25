import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  async create(@Body() createHeroDto: CreateHeroDto) {
    const heroExists = await this.heroesService.findByName(createHeroDto.name);
    if (heroExists) {
      throw new BadRequestException('Hero with this name already exists');
    }

    const isValidMarvelHero = await this.heroesService.validateMarvelHero(
      createHeroDto.name,
    );
    if (!isValidMarvelHero) {
      throw new BadRequestException(
        `The hero "${createHeroDto.name}" is not part of the Marvel universe.`
      );
    }
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const hero = await this.heroesService.findOne(+id);
    if (!hero) {
      throw new NotFoundException(`Hero with id ${id} not found`);
    }
    return hero;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateHeroDto: UpdateHeroDto
  ) {
    const hero = await this.heroesService.findOne(+id);

    if (updateHeroDto.name) {
      const heroExists = await this.heroesService.findByName(updateHeroDto.name);
      if (heroExists && heroExists.id !== hero.id) {
        throw new BadRequestException('Hero with this name already exists');
      }
    }
    return this.heroesService.update(hero.id, updateHeroDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.heroesService.remove(+id);
  }
}
