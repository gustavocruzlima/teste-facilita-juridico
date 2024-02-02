const router = require('express-promise-router')();
const clienteController = require('../controllers/clientes.controller');
const rotasController = require('../controllers/rotas.controller');

// cadastra clientes
router.post('/cadastro', clienteController.cadastrarCliente);

// busca clientes por nome
router.get('/buscanome/:nome', clienteController.buscaPorNome);

// busca clientes por email
router.get('/buscaemail/:email', clienteController.buscaPorEmail);

// busca clientes por telefone
router.get('/buscatelefone/:telefone', clienteController.buscaPorTelefone);

// faz o cálculo e devolve ordem da menor rota para visitação de clientes
router.get('/rotas', rotasController.rota);

module.exports = router;