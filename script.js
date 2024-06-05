let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]; //conteúdo das cartas
let cartasViradas = []; //as cartas que foram viradas virão para esse array
let jogoIniciado = false; //variável de controle para verificar se o jogo começou
let jogadorAtual = 1; //controla o turno do jogador (o jogador 1 começa jogando)
let pontuacaoJogador1 = 0; // Pontuação inicial do jogador 1
let pontuacaoJogador2 = 0; // Pontuação inicial do jogador 2
let corJogador1 = "DeepSkyBlue"; //cor para os pares corretos do jogador 1
let corJogador2 = "SkyBlue"; //cor para os pares corretos do jogador 2

function embaralharCartas() { //ativada quando clicar no botão "Começar"
  cards.sort(() => Math.random() - 0.5);
  jogoIniciado = true;
  jogadorAtual = 1; //definindo o jogador que começará o jogo
  pontuacaoJogador1 = 0; //reiniciando a pontuação do jogador 1
  pontuacaoJogador2 = 0; //reiniciando a pontuação do jogador 2
  corJogador1 = "DeepSkyBlue"; //reinicianndo a cor dos pares corretos do jogador 1
  corJogador2 = "SkyBlue"; //reiniciando a cor dos pares corretos do jogador 2

  atualizarPlacar(); //atualizando a pontuacao
  atualizarCartas();
}

function atualizarCartas() {
  document.querySelectorAll('.card').forEach((card) => { //garantindo que todas as cartas terão a mesma cor quando o jogo começar
    card.style.backgroundColor = 'rgb(41, 187, 206)'; 
  });
  document.querySelectorAll('.card').forEach((card) => { //selecionando todos os elementos html que tem a classe card e executando uma função para cada um deles
    card.textContent = ''; //após clicar no botão iniciar as cartas estarão viradas
  });
}

function virarCarta(indice) { //ativada quando alguma carta for clicada (a função será executada para a carta pressionada)
  if (jogoIniciado && !cartasViradas.includes(indice) && cartasViradas.length < 2 && document.querySelectorAll('.card')[indice].textContent === '') { //se o jogo foi iniciado e se o indíce não está presente no array cartasViradas e se o número de cartas viradas é menor que 2 e se a carta clicada ainda não está virada
    const card = document.querySelectorAll('.card')[indice]; //acessando a carta clicada pelo seu índice e adicionando seu valor na variável "card"
    card.textContent = cards[indice]; //definindo o texto da carta virada a partir do seu indice no array cards
    card.classList.remove('virada'); //removendo a animação de flip antes de adicioná-la para garantir que ocorra sempre que uma carta for clicada
    setTimeout(() => {
      card.classList.add('virada'); //adicionando a animação de flip com um delay de 50 milissegundos
    }, 50);
    cartasViradas.push(indice); //adicionando o indice da carta virada ao array "cartasViradas" (o push adiciona itens a um array existente)
    if (cartasViradas.length === 2) { //se o duas cartas forem viradas, ativar a funcao checkMatch em meio segundo
      setTimeout(verificarPar, 500); //setTimout(code, delay)
    }
  }
}

function verificarPar() {
  const indice1 = cartasViradas[0]; //colocando a primeira carta virada dentro da variavel indice1
  const indice2 = cartasViradas[1]; //colocando a segunda carta virada dentro da variavel indice2

  if (cards[indice1] !== cards[indice2]) { //se as cartas forem diferentes
    setTimeout(() => {
      //"virando" a carta novamente
      document.querySelectorAll('.card')[indice1].textContent = ''; //"virando" a carta novamente
      document.querySelectorAll('.card')[indice2].textContent = ''; 
      cartasViradas = []; //limpando o array cartasViradas
      proximoJogador(); //chama a função para passar para o próximo jogador
    }, 500);
  } else { //se as cartas forem iguais
    if (jogadorAtual === 1) {
      pontuacaoJogador1++; //adicionando 1 ponto para o jogador 1
      //definindo uma cor diferente para o par acertado pelo jogador 1
      document.querySelectorAll('.card')[indice1].style.backgroundColor = corJogador1; 
      document.querySelectorAll('.card')[indice2].style.backgroundColor = corJogador1;
    } else { //se for o jogador 2
      //definindo uma cor diferente para o par acertado pelo jogador 2
      pontuacaoJogador2++; //adicionando 1 ponto para o jogador 2
      document.querySelectorAll('.card')[indice1].style.backgroundColor = corJogador2;
      document.querySelectorAll('.card')[indice2].style.backgroundColor = corJogador2;
    }
    cartasViradas = []; //limpando o array cartasViradas
  }

  if (pontuacaoJogador1 + pontuacaoJogador2 === cards.length / 2) { //se todos os pares forem acertados
    mostrarVencedor();
  }

  atualizarPlacar(); //chamando a função para atualizar o placar
}

function proximoJogador() {
  //mudando turno
  if (jogadorAtual === 1) {
    jogadorAtual = 2;
  } else {
    jogadorAtual = 1;
  }
}

function atualizarPlacar() {
  document.getElementById('pontuacaoJogador1').textContent = pontuacaoJogador1; //definindo o conteudo do elemento com o id "pontuacaoJogador1" com o valor da variável pontuacaoJogador1
  document.getElementById('pontuacaoJogador2').textContent = pontuacaoJogador2; //definindo o conteudo do elemento com o id "pontuacaoJogador2" com o valor da variável pontuacaoJogador2
}

function mostrarVencedor(){
  if (pontuacaoJogador1 > pontuacaoJogador2){
    alert('O jogador 1 é o vencedor!');
  }
  else if (pontuacaoJogador1 < pontuacaoJogador2){
    alert('O jogador 2 é o vencedor!');
  }
  else {
    alert ('Houve um empate!!');
  }
}

