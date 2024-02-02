// Rotas.js
import React, { useState } from 'react';
import Modal from './modal';
import './rotas.css';

function Rotas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [resultadoRotas, setResultadoRotas] = useState([]);

  const handleBuscarRotas = () => {
    // Chama a API
    fetch('http://localhost:3001/api/rotas', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        // Atualiza o estado com os dados relevantes para as rotas
        setResultadoRotas(data.OrdemArestas);
        // Abre o modal
        setModalOpen(true);
      })
      .catch((error) => {
        console.error('Erro ao chamar a API:', error.message);
      });
  };

  const handleCloseModal = () => {
    // Fecha o modal
    setModalOpen(false);
  };

  return (
    <div className="containerRotas">
      <button type="button" onClick={handleBuscarRotas}>
        Buscar rotas
      </button>

      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          {/* Conteúdo do modal */}
          <h2>Rotas Encontradas</h2>
          {resultadoRotas.map((rota, index) => (
            <p key={index}>{`Rota ${index + 1}: ${rota[0]} para ${rota[1]}`}</p>
          ))}
        </Modal>
      )}
    </div>
  );
}

export default Rotas;
