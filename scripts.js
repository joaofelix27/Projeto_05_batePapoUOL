let dados
let statusCode=0
function requisição () {
    let nome_prompt = prompt("Qual o nome do usuário?")
     dados = {
        name: nome_prompt
      }
    const requisição= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",dados)
    requisição.then(tratarSucesso);
    requisição.catch(tratarErro);
 
}
requisição ()
//O programa ta saindo do while antes da respota do sucesso ou catch

function tratarSucesso(resposta) { 
    statusCode = resposta.status;
    alert(statusCode)
    alert("DEU BOM")
    setInterval(online,3000)
    if (statusCode !==200){
        requisição()
    }
}

function tratarErro(erro) {
    statusCode=erro.response.status
    alert(statusCode)
    alert("DEU RUIM")
    requisição()
//   alert("Status code: " + erro.response.status); // Ex: 404
// 	alert("Mensagem de erro: " + erro.response.data); // Ex: Not Found
}
 function online () {
    const online = axios.post ("https://mock-api.driven.com.br/api/v6/uol/status",dados)
    alert("acho que foi!")
 }