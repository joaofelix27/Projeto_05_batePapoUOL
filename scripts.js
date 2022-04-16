let dados
let statusCode=0
const containertopo=document.querySelector(".container_topo")
const containerinferior=document.querySelector(".container_inferior")
const conteudogeral=document.querySelector(".conteudo_geral")
const containerentrada=document.querySelector(".container_entrada")
const tratarSucesso = resposta => { 
    statusCode = resposta.status;
    setInterval(() => {
        axios.post ("https://mock-api.driven.com.br/api/v6/uol/status",dados);
    },4000);
    containertopo.style.display="flex"
    containerinferior.style.display="flex"
    conteudogeral.style.display="inherit"
    containerentrada.style.display="none"
    if (statusCode ==200){
       setInterval(recebemensagens,3000)
    } else {
        requisição();
    }
};
let tratarErro= erro => {
    statusCode=erro.response.status
    alert("nome inválido")
}
let nome=""
function requisição () {
    nome=document.querySelector(".input_entrada").value
     dados = {
        name: nome
      }
    const requisição= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",dados)
    requisição.then(tratarSucesso);
    requisição.catch(tratarErro);
 
}
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
                <p class=tempo>(${conteudoelemento[i].time})</p><p class="texto"><strong>${conteudoelemento[i].from}</strong></p> ${conteudoelemento[i].text} 
                </div>`
                
            break;
            case 'message':
                conteudogeral.innerHTML+=`<div class="mensagem message">
                <p class="tempo">(${conteudoelemento[i].time})</p><p class="texto"><strong>${conteudoelemento[i].from}</strong> para <strong>${conteudoelemento[i].to}</strong>:</p> ${conteudoelemento[i].text} 
                </div>`
            break;
            case 'private_message':
                conteudogeral.innerHTML+=`<div class="mensagem private_message">
               <p class="tempo">(${conteudoelemento[i].time})<p class="texto"><strong>${conteudoelemento[i].from}</strong> reservadamente para <strong>${conteudoelemento[i].to}</strong>:</p> ${conteudoelemento[i].text} 
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
  let tratarErro2= () => {
    alert("deu ruim")
    window.location.reload()
}

let recebemensagens = () => {
    console.log("ta indo")
    const requisição= axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    requisição.then(tratarSucesso1);
    requisição.catch(tratarErro1);
}

let enviarmensagens = () => {
    let texto_mensagem=document.querySelector(".input_inferior")
    let mensagem= {from: nome,
    to: "Todos",
    text: texto_mensagem.value ,
    type: "message"}
    const promisse= axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagem);
    texto_mensagem.value=""
    promisse.then(recebemensagens);
    promisse.catch(tratarErro2);
}