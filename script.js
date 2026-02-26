 let tarefas = []
 
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
            renderizarTarefas()    
        } 

    inputTarefa.value = ""
}

function renderizarTarefas() {
    
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""
    
    const botaoLimparLista = document.getElementById("botaoLimparLista")
    botaoLimparLista.classList.toggle("oculto", tarefas.length === 0)

    for(let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]

        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarTarefa(i)        

        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        listaTarefas.appendChild(novaTarefa)
    }

}

function removerTarefa(i) {
    tarefas.splice(i, 1)
    renderizarTarefas()
    const mensagem = document.getElementById("mensagem")
    mensagem.textContent = "Tarefa excluida com sucesso!"
    mensagem.style.color= "#28a745"
}

function editarTarefa(i) {
    let tarefaEditada = prompt("Edite a tarefa:")
    if (tarefaEditada !== null && tarefaEditada.trim() !== "") {
        tarefas[i] = tarefaEditada
        renderizarTarefas()

        const mensagem = document.getElementById("mensagem")
        mensagem.textContent = "Tarefa editada com sucesso!"
        mensagem.style.color = "#28a745"
    }
}

function limparLista(){    
    
    if (tarefas.length !== 0){        
        tarefas.length = 0        
        renderizarTarefas()        
        const mensagem = document.getElementById("mensagem")
        mensagem.textContent = "Lista excluida com sucesso!"
    }
}