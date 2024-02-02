const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: "postgres",
    password: "p0stgr3$",
    host : "postgres-arete.postgres.database.azure.com",
    port: 5432,
    database: "postgres",
    ssl: true
});

pool.on('connect', () => {
  console.log('Postgres conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};