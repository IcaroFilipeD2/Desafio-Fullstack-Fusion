import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  abilities: string[];

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
