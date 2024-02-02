import React, { useState } from 'react';
import './cadastro.css';

function Pesquisa() {
  const [nomeValue, setNomeValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [telefoneValue, setTelefoneValue] = useState('');
  const [resultadoPesquisa, setResultadoPesquisa] = useState('');

  const handleNomeChange = (event) => {
    setNomeValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefoneValue(event.target.value);
  };

  const handlePesquisar = () => {
    // Monta o objeto JSON com os dados do formulário
    const dadosCliente = {
      nome: nomeValue,
      email: emailValue,
      telefone: telefoneValue,
    };

    // Monta a URL da API
    const apiUrl = 'http://localhost:3001/api/cadastro';

    // Chama a API com o método POST e o JSON como corpo da requisição
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosCliente),
    })
      .then((response) => {
        if (response.status === 201) {
          // Cliente cadastrado com sucesso
          setResultadoPesquisa('Cliente cadastrado com sucesso');
        } else if (response.status === 500) {
          // Erro ao cadastrar cliente
          setResultadoPesquisa('Erro ao cadastrar cliente');
        } else {
          // Outro status de resposta não tratado
          setResultadoPesquisa(`Erro desconhecido: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Erro ao chamar a API:', error.message);
        setResultadoPesquisa('Erro ao cadastrar cliente');
      });
  };

  return (
    <div className="Cadastro">
      <div className="box">
        <form name="search">
          <div className="containerPesquisa">
            <span className="busca">Cadastrar Usuário:</span>
          </div>

          <div className="containerPesquisa">
            <p>Nome</p>
            <div className="inputPesquisa">
              <input
                type="text"
                className="input"
                onBlur={(e) => {
                  e.target.value = '';
                  e.target.blur();
                }}
                value={nomeValue}
                onChange={handleNomeChange}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="containerPesquisa">
            <p>E-mail</p>
            <div className="inputPesquisa">
              <input
                type="text"
                className="input"
                onBlur={(e) => {
                  e.target.value = '';
                  e.target.blur();
                }}
                value={emailValue}
                onChange={handleEmailChange}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="containerPesquisa">
            <p>Telefone</p>
            <div className="inputPesquisa">
              <input
                type="text"
                className="input"
                onBlur={(e) => {
                  e.target.value = '';
                  e.target.blur();
                }}
                value={telefoneValue}
                onChange={handleTelefoneChange}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="containerPesquisa">
            <button type="button" onClick={handlePesquisar}>
              Cadastrar
            </button>
          </div>

          <div className="containerPesquisa">
            <p>{resultadoPesquisa}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pesquisa;
