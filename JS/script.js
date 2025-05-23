const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoImput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pausar = new Audio('/sons/pause.mp3')
const beep = new Audio('/sons/beep.mp3')
const startPauseBt = document.getElementById('start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const btnContador = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoImput.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click',()=>{
    zerar()
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active')
    
})

curtoBt.addEventListener('click',()=>{
    zerar()
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click',()=>{
    zerar()
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
})


function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
        break;
        case "descanso-curto":
                titulo.innerHTML = ` Que tal dar uma respirada,<br>
                    <strong class="app__title-strong">Faça uma pausa curto.</strong>
                    `
        break            
        case "descanso-longo":
            titulo.innerHTML = ` Hora de voltar á supervice,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
        default:
        break;
    }
}


const contagemRegressiva = ()=>{
   
   if(tempoDecorridoEmSegundos <= 0){
    zerar()
    return
   }
    tempoDecorridoEmSegundos -= 1

    mostrarTempo()
    
    if(tempoDecorridoEmSegundos > 0 & tempoDecorridoEmSegundos < 7){
        beep.play()
    }
}

startPauseBt.addEventListener('click',iniciarOuPausar);


function iniciarOuPausar(){

    
    if(intervaloId){
        btnContador.setAttribute("src","/imagens/pause.png")
        
        zerar()
        return
    }
    btnContador.setAttribute("src","/imagens/play_arrow.png")
    play.play()
    
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar";
    
    
}


function zerar(){
    beep.pause()
    pausar.play()
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent = "Começar";
}


function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pr-br', {minute: '2-digit', second:'2-digit'})

    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()