const db = require("../config/database");

exports.rota = async (req, res) => {

    class Grafo {
        constructor() {
          this.nos = [];
          this.arestas = [];
          this.distancia = [];
        }
      
        addNo(no) {
          this.nos.push(no);
        }
      
        addAresta(no1, no2) {
          this.arestas.push([no1, no2]);
        }

        addDistancia(distancia){
            this.distancia.push(distancia)
        }
    }

    let lat = [0]
    let long = [0]
    let empresasArray = ['Empresa']
    let visitados = []
    let valorAnalisado = 0
    // o numero de distancias é sempre 1 valor menor que a quantidade de empresas
    const grafo = new Grafo();

    // busca empresas no banco 
    try{
        const response  = await db.query(
            "SELECT * FROM tb_endereco_clientes"
          );
    
          var buscaRotas = response.rows;

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Erro: " + err.message
        })
    }

    // preparação dos dados para análise
    for (let prep = 0; prep < buscaRotas.length; prep++) {
        empresasArray.push(buscaRotas[prep].nome)
        lat.push(buscaRotas[prep].lat)
        long.push(buscaRotas[prep].long)
    }
    console.log(empresasArray)

    // distancia entre dois pontos  = √(xb - xa)ˆ2 + (yb -ya)ˆ2
    // primeira visita sempre partindo de A
    for (let empresa = 0; empresa < empresasArray.length - 1; empresa++) {
        let distanciaMenor = Infinity;
        let noDistanciaMenor;
        if (empresa == 0) {
            let valorAnalisado = 0;
        }

        let noAnterior = valorAnalisado
        

        for (let index = 0; index < empresasArray.length; index++) {
            if (valorAnalisado !== index && !visitados.includes(index)) {
                const tempDistancia = Math.sqrt(Math.pow((lat[valorAnalisado] - lat[index]), 2) + Math.pow((long[valorAnalisado] - long[index]), 2));

                if (tempDistancia < distanciaMenor) {
                    distanciaMenor = tempDistancia;
                    noDistanciaMenor = empresasArray[index];
                    valorAnalisado = index;
                }
            }
        }

        // insere primeiro ponto
        if (empresa == 0) {
            visitados.push(0)
        }

        visitados.push(valorAnalisado);
        grafo.addNo(empresasArray[valorAnalisado]);
        grafo.addAresta(empresasArray[noAnterior], noDistanciaMenor);
        grafo.addDistancia(distanciaMenor);
    }


    res.status(200).send(
        {
        OrdemDosNos: grafo.nos,
        OrdemArestas: grafo.arestas,
        OrdemDistancias: grafo.distancia
        })
         
  };