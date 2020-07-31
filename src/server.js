// Funcao que vai "pedir" (ou chamar(?)) o express, e que sera salvo na variavel
// Valor recebido pelo express e uma funcao
const express = require("express");

// Executar a funcao recebida, que retornara um objeto de servidor com diversas funcoes e etc
const server = express();

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
server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html");
    return res.render("create-point.html");
})
server.get("/search", (req, res) => {
    // res.sendFile(__dirname + "/views/search-results.html");
    return res.render("search-results.html");
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