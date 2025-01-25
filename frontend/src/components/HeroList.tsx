import React from 'react';
import { Hero } from '../types/Hero';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Importar os ícones

interface HeroListProps {
  heroes: Hero[];
  onDelete: (heroId: string) => void; // Passar a função de deletar como prop
  onEdit: (heroId: string) => void; // Passar a função de editar como prop
}

const HeroList: React.FC<HeroListProps> = ({ heroes, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Hero List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {heroes.map((hero: Hero) => (
          <div
            key={hero.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px',
              width: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3>{hero.name}</h3>
            {hero.imageUrl ? (
              <img
                src={hero.imageUrl}
                alt={`${hero.name} thumbnail`}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>
              <strong>Abilities:</strong> {hero.abilities?.join(', ') || 'No abilities'}
            </p>
            <p>
              <strong>Origin:</strong> {hero.origin || 'Unknown origin'}
            </p>
            {/* Adicionando os ícones de edição e exclusão */}
            <div className="hero-actions-icons">
              <button
                onClick={() => onEdit(String(hero.id))}
                className="edit-icon"
                title="Editar herói"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(String(hero.id))}
                className="delete-icon"
                title="Deletar herói"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroList;
