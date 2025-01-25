// src/redux/heroesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Hero {
  id: string;
  name: string;
  abilities: string[];
  origin: string;
  imageUrl: string;
}

interface HeroesState {
  heroes: Hero[];
}

const initialState: HeroesState = {
  heroes: [],
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<Hero[]>) => {
      state.heroes = action.payload;
    },
    addHero: (state, action: PayloadAction<Hero>) => {
      state.heroes.push(action.payload);
    },
    removeHero: (state, action: PayloadAction<string>) => {
      state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
    },
    updateHero: (state, action: PayloadAction<Hero>) => {
      const index = state.heroes.findIndex(hero => hero.id === action.payload.id);
      if (index !== -1) {
        state.heroes[index] = action.payload;
      }
    },
  },
});

export const { setHeroes, addHero, removeHero, updateHero } = heroesSlice.actions;

export default heroesSlice.reducer;
