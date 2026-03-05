let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const modalOverlay = document.getElementById("modal-overlay")
const inputEditar = document.getElementById("inputEditar")

let tarefaEditada = null
 
 function adicionarTarefa() {    
   
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()
    const mensagem = document.getElementById("mensagem")        
        
        if (tarefa == "") {
            
            let mensagemErro = "Campo vazio, escreva uma tarefa válida!"
            mensagem.textContent = mensagemErro
            mensagem.style.color = "#A34743"
        } else { 
            
            let mensagemSucesso = "Tarefa adicionada com sucesso!"
            mensagem.textContent = mensagemSucesso
            mensagem.style.color= "#28a745"
            tarefas.push(tarefa)
            salvarTarefas()
            renderizarTarefas()    
        } 

    inputTarefa.value = ""
}

function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function renderizarTarefas() {
    
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""
    
    const botaoLimparLista = document.getElementById("botaoLimparLista")
    botaoLimparLista.classList.toggle("oculto", tarefas.length === 0)

    for(let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]
        let acoes = document.createElement("div")
        acoes.classList.add ("acoes")

        let botaoRemover = document.createElement("button")
        botaoRemover.classList.add ("button.remover")
        botaoRemover.className = "remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "button-editar"
        botaoEditar.classList.add ("button-editar")
        botaoEditar.onclick = () => editarTarefa(i)
        
        novaTarefa.appendChild(acoes)
        acoes.appendChild(botaoEditar)
        novaTarefa.appendChild(acoes)
        acoes.appendChild(botaoRemover)
        listaTarefas.appendChild(novaTarefa)
    }

}

function removerTarefa(i) {
    tarefas.splice(i, 1)
    salvarTarefas()
    renderizarTarefas()
    const mensagem = document.getElementById("mensagem")
    mensagem.textContent = "Tarefa excluida com sucesso!"
    mensagem.style.color= "#28a745"
}

function editarTarefa(i) {
    abrirModal(tarefas[i], i)}

function salvarEdicao(){
    if (inputEditar.value.trim() !== "") {
        tarefas[tarefaEditada] =
        inputEditar.value.trim()
        salvarTarefas()
        renderizarTarefas()
        fecharModal()

        const mensagem = document.getElementById("mensagem")
        mensagem.textContent = "Tarefa editada com sucesso!"
        mensagem.style.color = "#28a745"
    }
}

function abrirModal(textoAtual, index){
    modalOverlay.style.display = "flex";
    inputEditar.value = textoAtual;
    tarefaEditada = index;
}

function fecharModal(){
    modalOverlay.style.display = "none";
    inputEditar.value = "";
    tarefaEditada = null;
}

function limparLista(){    
    
    if (tarefas.length !== 0){        
        tarefas.length = 0
        salvarTarefas()        
        renderizarTarefas()       
        const mensagem = document.getElementById("mensagem")
        mensagem.textContent = "Lista excluida com sucesso!"
        mensagem.style.color = "#28a745"
    }
}

renderizarTarefas()

const inputTarefa = document.getElementById("inputTarefa")

inputTarefa.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        adicionarTarefa()
    }
})

modalOverlay.addEventListener("click", function(event){
    if(event.target === modalOverlay){
        fecharModal()
    }
})

inputEditar.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        salvarEdicao()
    }
})