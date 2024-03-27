// 2C = Two of Clubs (Treboles)
// 2D = Two of Diamons (Diamante)
// 2H = Two of Hearts (Corazones)
// 2S = Two of spades (Espadas)

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
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
  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

console.log(deck);
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
  // let puntos = 0;

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  // if (isNaN(valor)) {
  //   puntos = valor === "A" ? 11 : 10;
  // } else {
  //   puntos = valor * 1;
  // }
  // console.log(puntos);
};

console.log(valorCarta(pedirCarta()));
