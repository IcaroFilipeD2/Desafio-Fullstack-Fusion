import React, { useState } from 'react';

interface MarvelSearchProps {
    onSearch: (query: string) => void;
    loading: boolean;
    error: string | null;
}

const MarvelSearch: React.FC<MarvelSearchProps> = ({ onSearch, loading, error }) => {
    const [search, setSearch] = useState('');

    const handlerSearch = () => {
        onSearch(search);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search Marvel Heroes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handlerSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MarvelSearch;