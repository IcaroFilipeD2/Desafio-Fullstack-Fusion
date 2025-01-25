import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ncPC0JoJ0kc',
      database: 'heroes_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Busca automática
      synchronize: true,
    }),
    HeroesModule, // Importa o módulo de heróis
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
