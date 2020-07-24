// Caminho bom = then()         // Caminho Ruim = catch()
function populateUf() {
    const selectUf = document.querySelector("select[name=uf]");
    // console.log(selectUf);
    // Inicia uma "promessa", que vai tentar retornar o valor da API
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").
    // E quando der certo, passe a resposta como parâmetro para a arrow function, para que a mesma seja transformada em JSON e retornada
    // then( (res) => { return console.log(res.json()) }); \/ Maneira mais enxuta
    then( res => res.json()).
    // O primeiro parâmetro passado (states), seria a resposta/retorno do 'then anterior'?
    then ( (states) => { 
        // innerHTML é uma propriedade de elementos html
        for ( state of states ){
            // Podemos rodar o array do obj JSON, e buscar o valor de uma pripriedade
            selectUf.innerHTML += `<option value="${state.id}"> ${state.nome} </option> `;
        }
    })
} 
populateUf();

// passar o evento como parâmetro no navegador
function getCities(event) {
    const selectCity = document.querySelector("[name=city]");
    // Pegando o valor do elemento selecionado pelo evento
    const inputState = document.querySelector("[name=state]");
    
    // Índice (do select) do estado selecionado
    indexOfSelectedState = event.target.selectedIndex;
    
    // Altera o valor do input oculto atráves do índice da opção correta
    inputState.value = event.target.options[indexOfSelectedState].text;
    // console.log(event.target.options[indexOfSelectedState].innerHTML)
    
    // selectCity.innerHTML = "<option value='' > Escolha uma cidade </option>";

    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    // fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`).
    fetch(url).
    // O primeiro parâmetro (res), seria a resposta/retorno do 'fetch'?
    then( res => res.json() ).
    // O primeiro parâmetro (cities), seria a resposta/retorno do 'then anterior'?
    then( cities => {
         for (city of cities ){
             selectCity.innerHTML += `<option value="${city.id}" > ${city.nome} </option>`;
        }
    }
    )
    selectCity.disabled = false;
}

document.querySelector("select[name=uf]").
addEventListener("change", getCities);


// MINHA TENTATIVA ANTES DE VER A SOLUÇÃO

// function populateCity(uf) {
//     selectCity = document.querySelector("select[name=city]");
//     selectCity.innerHTML = "<option value='' > Escolha uma cidade </option>";
//     fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).
//     then( res => res.json()).
//     then( (cities) => {
//         for ( city of cities ){
//             selectCity.innerHTML += `<option value="${city.id}" > ${city.nome} </option>`;
//         }
//     })
//     selectCity.disabled = false;
// }


// // Função que "ouve" eventos, e assim que o mesmo for realizado, realiza uma função anônima
// document.querySelector("select[name=uf]").
// addEventListener("change", () => {
//     populateCity(document.querySelector("select[name=uf]").value);
// });
