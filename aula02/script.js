 let tarefas = []
 
 function adicionarTarefa() {      
   
    //recebe o valor do input do usuário
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById("mensagem")
        
        //se o valor do input for vazio mostre uma mensagem de erro
        if (tarefa == "") {
            //mostre uma mensagem de erro
            let mensagemErro = "Campo vazio, escreva uma tarefa válida!"
            mensagem.textContent = mensagemErro
            mensagem.style.color = "#A34743"
        } else { 
            //mensagem de tarefa adicionada com sucesso
            let mensagemSucesso = "Tarefa adicionada com sucesso!"
            mensagem.textContent = mensagemSucesso
            mensagem.style.color= "#28a745"
            tarefas.push(tarefa)
            renderizarTarefas()    
        } 

    //limpa o input do usuário
    inputTarefa.value = ""
}

function renderizarTarefas() {
    //cria novo item li e insere na lista ul
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""

    let i = 0 
    for(i; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]

        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa()

        novaTarefa.appendChild(botaoRemover)
        listaTarefas.appendChild(novaTarefa) 
    }      
}