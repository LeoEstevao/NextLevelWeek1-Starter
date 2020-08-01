// Dependência do sqlite3
// verbose é um método que configura o sqlite3 para aparecer mensagens no terminal
const sqlite3 = require("sqlite3").verbose();

// Iniciar o objeto que irá fazer operações no banco de dados (queries?)
// Executando um construtor/classe e atribuindo o retorno à constante db
const db = new sqlite3.Database("./src/database/database.db");

// Exportando o objeto 'db'. 
// PS: O metodo require() so e possivel apos utilizar o 'module.exports'
module.exports = db;

// Executando o comando 'node src/database/db.js', executará este arquivo, e criará um banco de dados (vazio) via Node

// Utilizar o objeto de banco de dados para realizar nossas operações (queries)
// db.serialize( () => {
//     // 1 - Criar uma Tabela
//     // run() é um método que executa uma queria de um bd
//     db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         image TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//     );
//     `);

//     // 2 - Inserir dados em uma tabela
//     // Query de inserção de dados
//     const query = `
//     INSERT INTO places (
//         name,
//         image,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
//     `;// Trocar os '?' via 2° parâmetro da run query, com um array

//     // Query dos valores inseridos (estarão substituindo os '?' da query acima)
//     // const values = [
//     //     "Colectoria",
//     //     "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     //     "Guilherme Gemballa, Jardim América",
//     //     "N° 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Resíduos Eletrônicos, Lâmpadas"
//     // ];
    
//     const values = [
//         "Paperside",
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ];

//     // Função que será executada após a query ser executada
//     // err = passando um erro como parâmetro
//     function afterInsertData (err) {
//         // Se existir um erro
//         if(err){
//             // Mate a função, dando o console.log do erro
//             return console.log(err);
//         }
//         console.log(this);
//         console.log("Cadastrado com sucesso");
//         // O 'this' nesse contexto, está referênciando a resposta que o run() está nos retornando
//         // PS: Quando utilizamos o 'this', não podemos utilizar arrow function
//     }    

//     // Rode essa query, e só após finalizar a query, rode a última função callback
//     // PS: O callback só funciona como função anônima passada por parâmetro, ou passando a referência de uma função (Sem os '()')
//     // db.run(query, values, afterInsertData);
    
//     // 3 - Consultar os dados da tabela
//     db.all(`SELECT * FROM places;`, function(err, rows){
//         if(err){
//             return console.log(err);
//         }

//         console.log("Aqui estão seus registros");
//         console.log(rows);
//     });


//     // 4 - Deletar dados da tabela
//     // db.run(`DELETE FROM place WHERE id = ?`, [2], function (err){
//     //     if(err){
//     //         return console.log(err);
//     //     }
//     //     console.log("Registro deletado com sucesso");
//     //     console.log(this);
//     // });
// });
