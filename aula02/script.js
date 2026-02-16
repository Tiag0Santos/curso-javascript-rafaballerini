 function adicionarTarefa() {  
    let mensagem = "Tarefa adicionada com sucesso!"
    
    //essa variavel pega o elemento input
    let inputTarefa = document.getElementById("inputTarefa")
    
    //essa variavel pega o que ta escrito no input
    let tarefa = inputTarefa.value

    //essa parte pega o elemento p e adiciona a mensagem após o botão
    document.getElementById("mensagem").textContent = mensagem;

    //essa variavel pega o elemento ul para criar uma lista
    let listaTarefas = document.getElementById("listaTarefas")
    
    //essa variavel cria os elementos li na lista
    let novaTarefa = document.createElement("li")
    
    //nessa parte ele pega o texto digitado na tarefa
    novaTarefa.textContent = tarefa

    //cria um elemento filho li na ul
    listaTarefas.appendChild(novaTarefa)

    //limpa o input
    inputTarefa.value = ""
    }