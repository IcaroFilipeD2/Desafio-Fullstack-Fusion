import React from "react";
import { useMarvel } from '../hooks/useMarvel';
import MarvelSearch from '../components/MarvelSearch';

const SearchPage = () => {
    const { searchMarvelHeroes, marvelHeroes, loading, error } = useMarvel();

    return (
        <div>
            <h1>Search Marvel Heroes</h1>
            <MarvelSearch onSearch={searchMarvelHeroes} loading={loading} error={error} />

            <div>
                {marvelHeroes?.length ? (
                    marvelHeroes.map((hero) => (
                        <div
                            key={hero.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '8px',
                                width: '200px',
                                marginBottom: '16px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <h3>{hero.name}</h3>
                            <img
                                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                                alt={hero.name}
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No heroes found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
