import { useState }  from 'react';
import marvelApi from '../services/marvelApi';

interface MarvelHero {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

export const useMarvel = () => {
    const [marvelHeroes, setMarvelHeroes] = useState<MarvelHero[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const searchMarvelHeroes = async (name: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await marvelApi.get('/characters', {
                params: { nameStartsWith: name },
            });
            const results = response.data.data.results;
            setMarvelHeroes(results);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch Marvel heroes');
        } finally {
            setLoading(false);
        }
    };

    return {
        marvelHeroes,
        loading,
        error,
        searchMarvelHeroes,
    };
};