
// User input elements
var text_input = document.getElementById("pokemonName");

// User input elements for displaying results
var name_result = document.getElementById("pokemonNameResult");
var image_result = document.getElementById("pokemonImage");
var hp_result = document.getElementById("hp");
var attack_result = document.getElementById("attack");
var defense_result = document.getElementById("defense");
var speed_result = document.getElementById("speed");

//Event listener for form submission
document.getElementById("searchForm").addEventListener("submit", CatchName);

function CatchName(){
     event.preventDefault(); // impede o recarregamento da página
    var pokemonName = text_input.value.toLowerCase();
    LoadAnimation();
    fetchpokemonData(pokemonName);
}

renderHistory();

//fetch function

function fetchpokemonData(pokemonName){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
if (!response.ok) {
throw new Error(`Erro: ${response.status}`);
}
return response.json(); // Converte o corpo da resposta para JSON
})
    .then(data => {
        // Update the results on the page
        SaveHistory(data.name);
        name_result.textContent = data.name;
        image_result.src = data.sprites.front_default;
        hp_result.textContent = `HP: ${data.stats[0].base_stat}`;
        attack_result.textContent = `Attack: ${data.stats[1].base_stat}`;
        defense_result.textContent = `Defense: ${data.stats[2].base_stat}`;
        speed_result.textContent = `Speed: ${data.stats[5].base_stat}`;
    })
    .catch(error => {
        console.error("Error fetching Pokemon data:", error);
        // Display an error message to the user
    });
}

// Criando um histórico de buscas com limite a até 5 buscas anteriores

function SaveHistory(pokemonName){
    //Pega o histórico salvo no local storage, ou gera um array vazio se não houver nada.
    let pokemonhistory = JSON.parse(localStorage.getItem("pokemonHistory")) || [];

    // Remove o nome se ele já estiver na lista (para não duplicar)
    pokemonhistory = pokemonhistory.filter(name => name !== pokemonName);

    //adiciona um novo nome ao inicio da lista similar a uma stack
    pokemonhistory.unshift(pokemonName);

    //limite de 5 componentes para a lista atual
    pokemonhistory = pokemonhistory.slice(0, 5);

    //salva de volta (!!!! precisa virar string pois array não dá)
    localStorage.setItem("pokemonHistory", JSON.stringify(pokemonhistory));

    renderHistory();
};

function renderHistory(){
    let pokemonHistory = JSON.parse(localStorage.getItem("pokemonHistory")) || [];
    let historyList = document.getElementById("historyList");

    historyList.innerHTML = "";

    pokemonHistory.forEach(name => {
        let li = document.createElement("li");
        li.textContent = name;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            text_input.value = name;
            fetchpokemonData(name);
        });

        historyList.appendChild(li);
    });
}

// Animation

function LoadAnimation(){
    name_result.textContent = "Loading"
    hp_result.textContent = "Loading"
    defense_result.textContent = "Loading"
    speed_result.textContent = "Loading"
}

var themeToggle = document.getElementById("themeToggle");
console.log("Botão encontrado:", themeToggle);

themeToggle.addEventListener("click", () => {
    console.log("Clique detectado!");
    document.body.classList.toggle("dark-mode");
    console.log("Classes do body agora:", document.body.className);
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
