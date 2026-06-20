// Variaveis para coletar dados de usuario para rodar o Add_ToDo
let User_Input = document.getElementById("Search")
let Add_Line = document.getElementById("Add")
let Content_Container = document.querySelector(".Content_OnUserView")
// Funcionalidade Add ToDo após clique
Add_Line.addEventListener("click", Add_ToDo)

function Add_ToDo(e){
    e.preventDefault();
    console.log("Valor do input:", User_Input.value);
    // 1. Cria o container <nav> da nova tarefa e adiciona a classe
    let Nav = document.createElement("nav");
    Nav.classList.add('List');
    
    // 2. Cria os elementos internos
    let p = document.createElement("p");
    let Input = document.createElement("input");
    Input.type = "checkbox"; // Configura o input como um checkbox

    // 3. Captura o VALOR digitado pelo usuário no input de texto
    p.textContent = User_Input.value; 

    // 4. Monta a estrutura (Insere o checkbox e o parágrafo dentro do <nav>)
    Nav.appendChild(Input);
    Nav.appendChild(p);

    // 5. Adiciona o <nav> completo com a nova tarefa na tela
    Content_Container.appendChild(Nav);
    Notification();
    // Opcional: Limpa o campo de texto depois de adicionar a tarefa
    User_Input.value = "";
}
function Notification(){
let Inform = document.createElement("div")
Inform.classList.add('Notification')

Inform.innerHTML = "Notificação"
document.body.appendChild(Inform)
setTimeout(() => {
        Inform.classList.add('hide');
    }, 2500);
    
setTimeout(() => {
    Inform.remove()
}, 3000)
}