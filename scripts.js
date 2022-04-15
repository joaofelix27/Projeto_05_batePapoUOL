let dados
let statusCode=0
let tratarSucesso = resposta => { 
    statusCode = resposta.status;
    setInterval(() => {
        axios.post ("https://mock-api.driven.com.br/api/v6/uol/status",dados);
    },4000);
        
    if (statusCode ==200){
       setInterval(recebemensagens,3000)
    } else {
        requisição();
    }
};
let tratarErro= erro => {
    statusCode=erro.response.status
    requisição()
}

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
let tratarSucesso1 = elemento => { 
    const conteudoelemento =elemento.data
    const conteudogeral = document.querySelector(".conteudo_geral")
    conteudogeral.innerHTML=""
    console.log(conteudoelemento.length)
    for (let i=0;i<conteudoelemento.length;i++){
        switch (conteudoelemento[i].type){
            case 'status':
                conteudogeral.innerHTML+=`<div class="mensagem status">
                ${conteudoelemento[i].time} ${conteudoelemento[i].from} ${conteudoelemento[i].text} 
                </div>`
                
            break;
            case 'message':
                conteudogeral.innerHTML+=`<div class="mensagem message">
                ${conteudoelemento[i].time} ${conteudoelemento[i].from} para ${conteudoelemento[i].to}: ${conteudoelemento[i].text} 
                </div>`
            break;
            case 'private_message':
                conteudogeral.innerHTML+=`<div class="mensagem private_message">
                ${conteudoelemento[i].time} ${conteudoelemento[i].from} reservadamente para ${conteudoelemento[i].to}: ${conteudoelemento[i].text} 
                </div>`
            break;
            
        }
       
    }
    const total = document.querySelectorAll(".mensagem")
    console.log(total)
    total[conteudoelemento.length-1].classList.add("ultimo")
    const ultimo = document.querySelector(".ultimo")
    console.log(ultimo)
    ultimo.scrollIntoView()
  };
  let tratarErro1= () => {
      requisição()
  }

let recebemensagens = () => {
    console.log("ta indo")
    const requisição= axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    requisição.then(tratarSucesso1);
    requisição.catch(tratarErro1);
}

