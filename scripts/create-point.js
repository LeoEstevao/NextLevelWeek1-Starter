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
    
    const ufValue = event.target.value;
    
    // Índice (do select) do estado selecionado
    const indexOfSelectedState = event.target.selectedIndex;
    
    // Altera o valor do input oculto atráves do índice da opção correta
    inputState.value = event.target.options[indexOfSelectedState].text;
    // console.log(event.target.options[indexOfSelectedState].innerHTML)
    
    // TODO:Confirmar se está funcionando
    selectCity.disabled = true;
    // console.log(selectCity.disabled);
    
    selectCity.innerHTML = "<option value='' > Escolha uma cidade </option>";
    
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    // fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`).
    fetch(url).
    // O primeiro parâmetro (res), seria a resposta/retorno do 'fetch'?
    then( res => res.json() ).
    // O primeiro parâmetro (cities), seria a resposta/retorno do 'then anterior'?
    then( cities => {
        for (city of cities ){
            selectCity.innerHTML += `<option value="${city.nome}" > ${city.nome} </option>`;
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


// Itens de coleta

// Selecionar todas as li's
const itemsToCollect = document.querySelectorAll(".items-grid li");
// Se a li for clicada
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    // Item selecionado
    const itemLi = event.target;

    // Id do Item
    const itemId = itemLi.dataset.id;

    // Adiciona/Remove a classe
    itemLi.classList.toggle("selected");
    // console.log(event.target.dataset.id);


    // Verificar se existem itens selecionados, caso sim:
    // Lógica: Quando um item for clicado, esse o loop abaixo será executado, varrendo todos os itens do array "selectedItems", que procurará se o item clicado está ou não salvo. (VIA dataset/data-id) 
    const alreadySelected = selectedItems.findIndex( item => {
        // Caso esteja, ele retornará o ÌNDICE do item no array, caso contrário, retornará -1
        const itemFound = item == itemId;
        return itemFound; // Retornará TRUE ou False
    });


    // Se o item clicado já estava selecionado
    if( alreadySelected != -1 ){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;

        })
        
        selectedItems = filteredItems;
        console.log(selectedItems);
    // Se o item clicado não estava selecionado
    }else{
        selectedItems.push(parseInt(itemId));
        console.log(selectedItems);
    }

    collectedItems.value = selectedItems;
    // console
    // console.log(alreadySelected);
    

    // Pegar os itens selecionados

    // Caso ja esteja selecionado, remover da selecao

    // Se nao estiver selecionado, entao adicionar a selecao

    // Atualizar o input hidden com os itens selecionados
}











