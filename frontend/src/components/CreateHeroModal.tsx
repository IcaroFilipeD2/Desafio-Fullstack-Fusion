import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import backendApi from '../services/backendApi';
import { useDispatch } from 'react-redux';
import { addHero } from '../redux/heroesSlice'; // Importe a ação do heroesSlice
import './CreateHeroModal.css';

interface MarvelHero {
  name: string;
  imageUrl: string;
}

const CreateHeroModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [abilities, setAbilities] = useState('');
  const [searchResults, setSearchResults] = useState<MarvelHero[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [nameError, setNameError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // Usando o dispatch do Redux

  const fetchMarvelImages = () => {
    if (!name) {
      setNameError('O campo nome é obrigatório.');
      return;
    }
    setNameError('');
    setIsLoading(true);

    const publicKey = '3da57c9ca3b5a4bd4000440271c7058c';
    const privateKey = '0bdc140027e90a8b0552046d02a05cd5cae322b2';
    const timestamp = new Date().getTime().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(CryptoJS.enc.Hex);

    axios
      .get('https://gateway.marvel.com/v1/public/characters', {
        params: {
          apikey: publicKey,
          ts: timestamp,
          hash: hash,
          nameStartsWith: name,
        },
      })
      .then((response) => {
        setSearchResults(
          response.data.data.results.map((hero: any) => ({
            name: hero.name,
            imageUrl: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
          }))
        );
      })
      .catch((error) => {
        console.error('Erro ao buscar imagens:', error);
        setSearchResults([]);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCreateHero = () => {
    if (!selectedImage) {
      alert('Selecione uma imagem para o herói.');
      return;
    }

    const newHero = {
      name,
      origin,
      abilities: abilities.split(',').map((ability) => ability.trim()),
      imageUrl: selectedImage,
    };

    backendApi
      .post('/heroes', newHero)
      .then((response) => {
        dispatch(addHero(response.data)); // Ação do Redux automaticamente criada pelo createSlice
        alert('Herói criado com sucesso!');
        onClose();
      })
      .catch((error) => console.error('Erro ao criar herói:', error));
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Criar Herói</h2>
        <input
          type="text"
          placeholder="Nome do herói"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        <button onClick={fetchMarvelImages}>Buscar Imagens</button>
        <input
          type="text"
          placeholder="Origem do herói"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Habilidades (separadas por vírgula)"
          value={abilities}
          onChange={(e) => setAbilities(e.target.value)}
        />
        <div className="image-results">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : searchResults.length === 0 ? (
            <p>Nenhuma imagem encontrada ou faça uma busca com um nome válido.</p>
          ) : (
            searchResults.map((result, index) => (
              <img
                key={index}
                src={result.imageUrl}
                alt={result.name}
                className={selectedImage === result.imageUrl ? 'selected' : ''}
                onClick={() => setSelectedImage(result.imageUrl)}
              />
            ))
          )}
        </div>
        <button onClick={handleCreateHero} disabled={!selectedImage}>
          Criar Herói
        </button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CreateHeroModal;
