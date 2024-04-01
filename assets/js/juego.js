// 2C = Two of Clubs (Treboles)
// 2D = Two of Diamons (Diamante)
// 2H = Two of Hearts (Corazones)
// 2S = Two of spades (Espadas)

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;

let puntosComputadora = 0;

// Referecnias de HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const smalls = document.querySelectorAll("small");

//Esta función crea una nueva baraja
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (let especial of especiales) {
    for (let tipo of tipos) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);

  return deck;
};

crearDeck();

//Esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay carta en el deck";
  }
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    if (
      puntosComputadora > 10 &&
      carta.substring(0, carta.length - 1) === "A"
    ) {
      puntosComputadora = puntosComputadora + 1;
    } else {
      puntosComputadora = puntosComputadora + valorCarta(carta);
    }

    smalls[1].textContent = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.alt = "carta";
    imgCarta.classList.add("carta");
    divCartasComputadora.appendChild(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Empate");
    } else if (puntosMinimos > 21) {
      alert("computadora Gana");
    } else if (puntosComputadora <= 21 && puntosComputadora > puntosMinimos) {
      alert("computadora Gana");
    } else {
      alert("Jugador Gana");
    }
  }, 100);
};

// Eventos

btnPedir.addEventListener("click", (e) => {
  const carta = pedirCarta();
  if (puntosJugador > 10 && carta.substring(0, carta.length - 1) === "A") {
    puntosJugador = puntosJugador + 1;
  } else {
    puntosJugador = puntosJugador + valorCarta(carta);
  }

  smalls[0].textContent = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `./assets/cartas/${carta}.png`;
  imgCarta.alt = "carta";
  imgCarta.classList.add("carta");

  divCartasJugador.appendChild(imgCarta);

  if (puntosJugador > 21) {
    console.log("Perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.log("ganaste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

//Detener el pedido de cartas
btnDetener.addEventListener("click", (e) => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", (e) => {
  deck = [];
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";
  smalls[0].innerHTML = "0";
  smalls[1].innerHTML = "0";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

console.log(deck);
