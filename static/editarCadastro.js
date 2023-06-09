window.onload = function(){
    requerindoDadoFuncionario()
}

function pegarFuncionarioID(){
    const urlParams = new URLSearchParams(window.location.search);
    let funcionarioID = urlParams.get('ID')
    return funcionarioID
}

function requerindoDadoFuncionario(){
    try{
        fetch(`https://acmeltda-production.up.railway.app/funcionario/${pegarFuncionarioID()}`)
            .then(response => response.json())
            .then(data => posicionandoDados(data.success.results[0]))
    }catch(e){
        console.error(e)
    }
}

function posicionandoDados(dados){
    document.getElementById('nome').value = `${dados.nome}`
    document.getElementById('nome-titulo').innerHTML = `${dados.nome}`
    document.getElementById('CPF').value = `${dados.CPF}`
    document.getElementById('cargo').value = `${dados.cargo}`
    document.getElementById('salario').value = `${dados.salario}`
}

const formularioAtualizado = document.getElementById('formulario-cadastro')
function requerindoAtualizacaoDados(){
    const formData = new FormData(formularioAtualizado)

    try{
        fetch(`https://acmeltda-production.up.railway.app/funcionario/${pegarFuncionarioID()}`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => window.location.href = "index.html")
    } catch(e){
        console.error(e)
    }
}

formularioAtualizado.addEventListener("submit", function(e){
    e.preventDefault()
    requerindoAtualizacaoDados()
})