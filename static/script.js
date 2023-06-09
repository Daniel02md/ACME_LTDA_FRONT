function requerindoDadosFuncionarios(){
    try{
        fetch('https://acmeltda-production.up.railway.app/funcionario')
            .then(response => response.json())
            .then(data => mostrandoDados(data.success.results))
    }catch(e){
        console.error(e)
    }
}

function mostrandoDados(dados){
    const funcionariosLista = document.getElementsByClassName('funcionarios')[0];
    funcionariosLista.innerHTML = '';
    criandoTitulo()

    dados.forEach(arrays => {
        arrays.forEach(funcionario =>
            criandoElementos(funcionario)
        )
    });
    redirecionarPorID()
    deletarRegistro()
}

function criandoTitulo(){
    const funcionariosLista = document.getElementsByClassName('funcionarios')[0]
    const funcionariosCadastrados = document.createElement('h1')
    funcionariosCadastrados.textContent = "Funcionários cadastrados"
    funcionariosCadastrados.classList.add("titulo-cadastrados")
    funcionariosLista.appendChild(funcionariosCadastrados)
}

function criandoElementos(element){
    const funcionariosLista = document.getElementsByClassName('funcionarios')[0]
    funcionariosLista.style.display = 'flex'
        
    const registroFuncionario = document.createElement('div')
    registroFuncionario.classList.add("registro-funcionario")
    funcionariosLista.appendChild(registroFuncionario)

    const nomeFuncionario = document.createElement('h2')
    nomeFuncionario.textContent = `${element.nome} - `
    nomeFuncionario.classList.add("nome-funcionario")
    registroFuncionario.appendChild(nomeFuncionario)

    const idFuncionario = document.createElement('span')
    idFuncionario.textContent = `${element.ID}`
    idFuncionario.setAttribute("id", "id-funcionario")
    nomeFuncionario.appendChild(idFuncionario)

    const funcoes = document.createElement('div')
    
    const lixeira = document.createElement('i')
    lixeira.className = "fa-solid fa-trash"
    lixeira.style.color = "#fe4834"
    lixeira.setAttribute("id", "lixeira")
    funcoes.appendChild(lixeira)

    const editar = document.createElement('i')
    editar.className = "fa-regular fa-pen-to-square"
    editar.style.color = " #fbff00"
    editar.setAttribute("id", "editar")
    funcoes.appendChild(editar)

    registroFuncionario.appendChild(funcoes)
}

const formularioCadastro = document.getElementById('formulario-cadastro')
function inserindoDadosFuncionario(){
    const formData = new FormData(formularioCadastro)

    try {
        fetch('https://acmeltda-production.up.railway.app/funcionario', {
            method: "POST",
            body: formData
        })
            .then((x) => requerindoDadosFuncionarios())
    } catch (e) {
        console.error(e)
    }
}

formularioCadastro.addEventListener("submit", function(e){
    e.preventDefault()
    inserindoDadosFuncionario()
    esvaziandoValores()
})

function esvaziandoValores(){
    document.getElementById('nome').value = ""
    document.getElementById('CPF').value = ""
    document.getElementById('cargo').value = ""
    document.getElementById('salario').value = ""
}

function redirecionarPorID (){
    const lapisEditar = document.getElementsByClassName('fa-regular fa-pen-to-square')
    for (let index = 0; index < lapisEditar.length; index++) {
        const element = lapisEditar[index]

        element.addEventListener("click", function(){
            const funcionarioRegistro = element.parentElement.parentNode
            const funcionarioID = funcionarioRegistro.firstChild.lastChild.innerText
            window.location.href = `editarCadastro.html?ID=${funcionarioID}`
        })
    }
}

const verRegistros = document.getElementById("ver")
verRegistros.addEventListener("click", function(){
    requerindoDadosFuncionarios()
})

function deletarRegistro(){
    const lixeiras = document.getElementsByClassName('fa-solid fa-trash')
    for (let index = 0; index < lixeiras.length; index++) {
        const element = lixeiras[index];
        element.addEventListener("click", function(){
            const funcionarioRegistro = element.parentElement.parentNode
            const funcionarioID = funcionarioRegistro.firstChild.lastChild.innerText
            apagandoRegistro(funcionarioID)
            funcionarioRegistro.remove()
        })
    }
}

function apagandoRegistro(funcionarioID){
    fetch(`https://acmeltda-production.up.railway.app/funcionario/${funcionarioID}`, {
        method: "DELETE"
    })
        .then(response => response.json())
}