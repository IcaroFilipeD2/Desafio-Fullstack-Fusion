import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHeroContext } from '../context/HeroContext';
import HeroList from '../components/HeroList';
import CreateHeroModal from '../components/CreateHeroModal';
import { FaPlus } from 'react-icons/fa'; // Importando ícones de lixeira e edição
import './HomePage.css';

const HomePage = () => {
  const { heroes, setHeroes } = useHeroContext();
  const [filteredHeroes, setFilteredHeroes] = useState(heroes);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  

  // Fetch heróis do banco de dados ao carregar a página
  useEffect(() => {
    axios
      .get('http://localhost:3000/heroes')
      .then((response) => {
        setHeroes(response.data);
        setFilteredHeroes(response.data); // Inicialmente, todos os heróis
      })
      .catch((error) => console.error('Erro ao buscar heróis do banco:', error));
  }, [setHeroes]);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    const filtered = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(search)
    );
    setFilteredHeroes(filtered);
  }, [searchTerm, heroes]);

  const deleteHero = (heroId: string) => {
    axios
      .delete(`http://localhost:3000/heroes/${heroId}`)
      .then(() => {
        setHeroes(heroes.filter((hero) => String(hero.id) !== heroId)); // Atualizar a lista de heróis
        setFilteredHeroes(filteredHeroes.filter((hero) => String(hero.id) !== heroId)); // Atualizar a lista filtrada
      })
      .catch((error) => console.error('Erro ao deletar herói:', error));
  };

  const editHero = (heroId: string) => {
    console.log(`Editar herói com ID: ${heroId}`);
  };

  return (
    <div className="home-container">
      <h1 className="page-title">Heróis Criados</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar herói..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredHeroes.length > 0 ? (
        <div className="hero-list">
          <HeroList 
            heroes={filteredHeroes} 
            onDelete={deleteHero} 
            onEdit={editHero} 
          />
        </div>
      ) : (
        <div className="empty-state" onClick={() => setShowModal(true)}>
          <span><FaPlus /></span>
          <p>Criar um novo herói</p>
        </div>
      )}
      <div className="create-hero-icon" onClick={() => setShowModal(true)}>
        <FaPlus />
      </div>
      {showModal && <CreateHeroModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
