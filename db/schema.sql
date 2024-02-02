-- Criação do banco de dados
CREATE DATABASE db_teste_facilita;

-- Conecta ao banco de dados recém-criado
\c db_teste_facilita;

-- Criação da tabela tb_clientes
CREATE TABLE tb_clientes (
    nome VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    telefone VARCHAR(20)
);

-- Criação da tabela tb_endereco_clientes
CREATE TABLE tb_endereco_clientes (
    nome VARCHAR(255),
    lat FLOAT,
    long FLOAT,
    PRIMARY KEY (nome),
    FOREIGN KEY (nome) REFERENCES tb_clientes(nome)
);

-- Criação de índices em tb_endereco_clientes para lat e long
CREATE INDEX idx_lat ON tb_endereco_clientes(lat);
CREATE INDEX idx_long ON tb_endereco_clientes(long);
