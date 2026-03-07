let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
let filtroAtual = "todas"

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
            tarefas.push({
                texto: tarefa,
                concluida: false
            })
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

    let tarefasFiltradas = tarefas

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(t => !t.concluida)
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(t => t.concluida)
    }
    
    const botaoLimparLista = document.getElementById("botaoLimparLista")
    botaoLimparLista.classList.toggle("oculto", tarefas.length === 0)

    for(let i = 0; i < tarefasFiltradas.length; i++){

        let novaTarefa = document.createElement("li")
        
        let acoes = document.createElement("div")
        acoes.classList.add ("acoes")

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = tarefasFiltradas[i].concluida

        let span = document.createElement("span")
        span.textContent = tarefasFiltradas[i].texto
        
        if(tarefas[i].concluida){
            span.classList.add("concluida")
        }

        checkbox.addEventListener("change", () => {

            tarefas[i].concluida = checkbox.checked

            salvarTarefas()

            if(checkbox.checked){
                span.classList.add("concluida")
            } else {
                span.classList.remove("concluida")
            }

            localStorage.setItem("tarefas", JSON.stringify(tarefas))
        })

        let botaoRemover = document.createElement("button")
        botaoRemover.classList.add ("button.remover")
        botaoRemover.className = "remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "button-editar"
        botaoEditar.classList.add ("button-editar")
        botaoEditar.onclick = () => editarTarefa(i)
        
        novaTarefa.appendChild(checkbox)
        novaTarefa.appendChild(span)
        novaTarefa.appendChild(acoes)

        acoes.appendChild(botaoEditar)
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
    abrirModal(tarefas[i].texto, i)}

function salvarEdicao(){
    if (inputEditar.value.trim() !== "") {
        tarefas[tarefaEditada].texto =
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

document.getElementById("todas").addEventListener("click", () => {
    filtroAtual = "todas"
    renderizarTarefas()
})

document.getElementById("pendentes").addEventListener("click", () => {
    filtroAtual = "pendentes"
    renderizarTarefas()
})

document.getElementById("concluidas").addEventListener("click", () => {
    filtroAtual = "concluidas"
    renderizarTarefas()
})

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