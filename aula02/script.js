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
        
            //cria novo item li e insere na lista ul
            const listaTarefas = document.getElementById("listaTarefas")
            let novaTarefa = document.createElement("li")
            novaTarefa.textContent = tarefa
            listaTarefas.appendChild(novaTarefa)        
        } 

    //limpa o input do usuário
    inputTarefa.value = ""
}