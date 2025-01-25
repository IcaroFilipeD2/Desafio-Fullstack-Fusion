import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface Hero {
    id: number;
    name: string;
    abilities: string[];
    origin: string;
    imageUrl?: string;
    description?: string; // Opcional, caso seja necessário para Marvel API
    thumbnail?: {
        path: string;
        extension: string;
    };
}

interface HeroContextType {
    heroes: Hero[];
    setHeroes: (heroes: Hero[]) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [heroes, setHeroes] = useState<Hero[]>([]);

    return (
        <HeroContext.Provider value={{ heroes, setHeroes}}>
            {children}
        </HeroContext.Provider>
    );
};

export const useHeroContext = (): HeroContextType => {
    const context = useContext(HeroContext);
    if (!context) {
        throw new Error('useHeroContext must be used within a HeroProvider');
    }
    return context;
};