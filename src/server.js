// Funcao que vai "pedir" (ou chamar(?)) o express, e que sera salvo na variavel
// Valor recebido pelo express e uma funcao
const express = require("express");

// Executar a funcao recebida, que retornara um objeto de servidor com diversas funcoes e etc
const server = express();

// Pegando o banco de dados PS: Ele reconhece mesmo que falte a extensão (.js)
// PS2: Aqui está sendo criado uma Constant nomeada 'db', enquanto no database, o 'db' é um objeto. Por isso nao ha conflito
const db = require("./database/db");

// HABILITAR O USO DO req.body
server.use(express.urlencoded( {extended: true} ))

// Utilizando template engine
const nunjucks = require("nunjucks");
// Pasta onde os arquivos htmls que terão nunjucks se encontram
nunjucks.configure("src/views", {
// configuração através de um objeto
    express: server, // Ligando nunjucks ao express
    noCache: true // 'no'Cache = true significa que o cache está desabilitado. 
})

// Configurar pasta pública, para torna-la "visível" pelo servidor.
// Irá a partir da pasta raiz, e essa pasta será a pasta inicial pelo caminho
// server.use(express.static("public/assets/img"));
server.use(express.static("public"));


// Configurar caminho/rotas da minha aplicacao
// HOME/INDEX
// req = pergunta/pedido
// res = resposta/resultado
// Caminho atraves do metodo GET
server.get("/", (req, res) => {
    // variável global dirname (retorna o caminho atual) concatenada com o caminho do arquivo index
    // res.sendFile(__dirname + "./");
    // res.sendFile(__dirname + "/views/index.html");
    
    // Renderizando com o nunjucks.
    // Como já configuramos a pasta padrão do html via nunjucks, vamos indicar diretamente o arquivo html
    // Ps: O return não é necessário em todos os casos, porém é recomendável sempre utiliza-lo nos render
    return res.render("index.html"/*, {
        title: "Seu marketplace de coleta de resíduos"
    }*/);
})

// Rota que recebe os dados do formulario
// Metodo GET
server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html");

    // 'req.query' e as Query Strings recebidas pela url (funciona APENAS com GET)
    console.log(res.query);

    return res.render("create-point.html");//, { saved: true });
})

// Metodo POST
server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso formulario 
    // Ps: O express nao esta habilitado por padrao, para receber o body. Devemos habilitar antes (Linha 12/13)
    // return console.log(req.body);
    // return res.send(req.body);

    // inserir dados no banco de dados

    // QUERY de insert
    const query = `
    INSERT INTO PLACES (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
        )VALUES(?,?,?,?,?,?,?)
    `;
        
    // Valores do INSERT
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items //, Poderia ter essa virgula
    ];
    
    // Funcao que retorna MSG de Erro ou Sucesso
    function afterInsertData(err){
        if(err){
            // console.log(err);
            return res.send("Erro no cadastro");
        }
        // return res.send("Cadastrado com sucesso");
        return res.render("create-point.html", { saved: true })
    };
    // Rodar Query
    // db.run(query, values, afterInsertData);
    db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
    // res.sendFile(__dirname + "/views/search-results.html");
   const search = req.query.search;
   if(search == ''){
       return res.render("search-results.html", { total: 0 });
   } 
    // 3 - Consultar os dados da tabela
    // CONDICAO 'WHERE' APENAS PARA DEBUGAR
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%';`, function(err, rows){
        if(err){
            return console.log(err);
        }

        const total = rows.length;

        // Chamando a pagina, e passando a consulta por parametro via objeto Literal(?) '{ places: rows }'
        return res.render("search-results.html", { places: rows, total: total  });// Poderia usar apenas o 'total' ao inves de 'total: total', pois se aplica a regra do objeto literal
    });
    // return res.render("search-results.html");
})
// Após essas alterações, configurar as páginas, pois não usaremos mais o HTML, então devemos remover este formato (html) de arquivo dos href


// ouca a porta 3000, e ligue o servidor na determinada porta, assim que esse arquivo for executado
server.listen(3000);

// Agora no terminal/bash, execute este proprio script via node:
// node src/server.js
// Acesse o servidor 'localhost:3000' via navegador


// Agora para automatizar o processo acima, podemos ir no package.json, e criar um script para execucao do mesmo (como uma shortkey:
    // "scripts": {
    //     "start": "node src/server.js"
    // })
// e dps rodar com "npm start"

// Instalar dependencia NODEMON, que monitora o servidor o atualiza automaticamente, pois caso contrario, teriamos que reiniciar o servidor manualmente a cada alteracao no codigo.
    // npm install nodemon -D
// PS: Instalar com '-D' significa que a dependencia so funcionara em desenvolvimento

// Apos isso, alterar a shortkey acima para "nodemon" ao inves de "node":
    // nodemon src/server.js