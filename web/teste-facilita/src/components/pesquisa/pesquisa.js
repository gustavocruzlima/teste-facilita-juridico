import React, { useState } from 'react';
import './pesquisa.css';

function Pesquisa() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState('');
  const [selectValue, setSelectValue] = useState('nome');
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePesquisar = () => {
    // Monta a URL da API com base na seleção e no valor do input
    const apiUrl = `http://localhost:3001/api/busca${selectValue}/${inputValue}`;

    console.log(apiUrl)

    // Chama a API
    fetch(apiUrl,{
        method: 'GET'
    })
    .then((response) => {
        if (!response.ok) {
            if (response.status === 404) {
                let erro404 = {message: "Cliente não encontrado"}
                return erro404
            }else{
                throw new Error(`Erro na resposta da API: ${response.statusText}`);
            }
          
        }
        return response.json();
      })
      .then((data) => {
        // Verifique se a estrutura da resposta está correta
        const buscaNome = data?.cliente?.buscaNome;

        if (buscaNome && buscaNome.length > 0) {
          // A resposta contém dados válidos
          let nome = buscaNome[0].nome
          let email = buscaNome[0].email
          let telefone = buscaNome[0].telefone
          let resposta = `Cliente encontrado:\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}`;
          setResultadoPesquisa(resposta);
          
        } else {
          // A resposta não contém dados válidos
          setResultadoPesquisa('Nenhum resultado encontrado.');
        }
      })
      .catch((error, data) => {
        console.error('Erro ao chamar a API:', error.message)
        console.log('Erro que veio: ', data)
      })
  };

  return (
    <div className="Pesquisa">
      <div className="box">
        <form name="search">
          <div className="container">
            <span className="busca">Buscar por:</span>
            <div className="select">
              <select id="selectPesquisa" value={selectValue} onChange={handleSelectChange}>
                <option value="nome">Nome</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone</option>
              </select>
            </div>

            <div className="inputPesquisa">
              <input
                type="text"
                className="input"
                onBlur={(e) => {
                  e.target.value = '';
                  e.target.blur();
                }}
                value={inputValue}
                onChange={handleInputChange}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="container">
            <button type="button" onClick={handlePesquisar}>
              Pesquisar
            </button>
          </div>

          <div className="container">
            <p>{resultadoPesquisa}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pesquisa;
