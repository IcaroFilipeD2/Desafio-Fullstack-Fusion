import { useState, useEffect } from 'react';
import backendApi from '../services/backendApi';
import { Hero } from '../types/Hero';

export const useHeroes = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHeroes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await backendApi.get<Hero[]>('/');
            const heroesWithImage = response.data.map((hero) => ({
                ...hero,
                description: hero.description || 'No description available', // Valor padrão
                thumbnail: hero.thumbnail || { path: '', extension: '' },
            }));
            setHeroes(heroesWithImage);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch heroes');
        } finally {
            setLoading(false);
        }
    };
    

    const addHero = async (hero: Omit<Hero, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await backendApi.post<Hero>('/', hero);
            setHeroes((prevHeroes) => [...prevHeroes, response.data]);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add hero');
        } finally {
            setLoading(false);
        }
    };

    const updateHero = async (id: number, updatedHero: Partial<Hero>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await backendApi.patch<Hero>(`/${id}`, updatedHero);
            setHeroes((prevHeroes) =>
                prevHeroes.map((hero) => (hero.id === id ? response.data : hero))
            );
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update hero');
        } finally {
            setLoading(false);
        }
    };

    const deleteHero = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await backendApi.delete(`/${id}`);
            setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete hero');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    return {
        heroes,
        loading,
        error,
        fetchHeroes,
        addHero,
        updateHero,
        deleteHero,
    };
};
