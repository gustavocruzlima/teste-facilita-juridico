const db = require("../config/database");

// cadastra novos clientes baseado em nome, email e telefone
exports.cadastrarCliente = async (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { telefone } = req.body;

  try{
    const rows  = await db.query(
        "INSERT INTO tb_clientes (nome, email, telefone) VALUES ($1, $2, $3)",
        [nome, email, telefone]
      );
    
        res.status(201).send({
            message: "Cliente cadastrado com sucesso!",
            body: {
              cliente: { nome, email, telefone }
            },
          });
  }catch(err){
    console.log(err)
    res.status(500).send({
        message: "Erro: " + err.message
    })
  }

};

// busca cliente por nome
exports.buscaPorNome = async (req, res) => {
  const nome  = req.params.nome;

  try{
    const response  = await db.query(
        "SELECT * FROM tb_clientes WHERE nome = $1",
        [nome]
      );

      let buscaNome = response.rows;

        if (buscaNome.length > 0){
          res.status(200).send(
            {
              message: "Cliente encontrado com sucesso!",
              cliente: { buscaNome }
            })
        }else{
          res.status(404).send({
            message: "Cliente não encontrado"
          })
        }
        
  }catch(err){
    console.log(err)
    res.status(500).send({
        message: "Erro: " + err.message
    })
  }
};

// busca cliente por email
exports.buscaPorEmail = async (req, res) => {
  const email  = req.params.email;

  try{
    const response  = await db.query(
        "SELECT * FROM tb_clientes WHERE email = $1",
        [email]
      );

      let buscaEmail = response.rows;

        if (buscaEmail.length > 0){
          res.status(200).send(
            {
              message: "Cliente encontrado com sucesso!",
              cliente: { buscaEmail }
            })
        }else{
          res.status(404).send({
            message: "Cliente não encontrado"
          })
        }
        
  }catch(err){
    console.log(err)
    res.status(500).send({
        message: "Erro: " + err.message
    })
  }
};

// busca cliente por telefone
exports.buscaPorTelefone = async (req, res) => {
  const telefone  = req.params.telefone;

  try{
    const response  = await db.query(
        "SELECT * FROM tb_clientes WHERE telefone = $1",
        [telefone]
      );

      let buscaTelefone = response.rows;

        if (buscaTelefone.length > 0){
          res.status(200).send(
            {
              message: "Cliente encontrado com sucesso!",
              cliente: { buscaTelefone }
            })
        }else{
          res.status(404).send({
            message: "Cliente não encontrado"
          })
        }
        
  }catch(err){
    console.log(err)
    res.status(500).send({
        message: "Erro: " + err.message
    })
  }
};