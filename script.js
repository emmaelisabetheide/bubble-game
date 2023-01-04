/***** VARIABLER *****/
/*** Lagre HTML-elementer du trenger i variabler ***/
//Spillområde
const område = document.querySelector("#spill-område");
//Score-tekst
const scoreDisplay = document.querySelector("#score");
//Game-over plakat
const gameOver = document.querySelector("#game-over");

/*** Lag globale variabler ***/
//Hastighet
let hastighet = 0.02;
//Score
let score = 0;
//Set interval
let interval;


/***** FUNKSJONER *****/
/*** Bobble-objekt ***/
function Bobble() {
  //Lage bobble-element
  this.ball = document.createElement("div");
  this.ball.classList.add("bobble");
  //Posisjon
  this.posisjon = [Math.random() * 80, Math.random() * 80];
  //Størrelse
  this.størrelse = 20;
  this.ball.style.position = "absolute";
  this.ball.style.top = this.posisjon[0] + "%";
  this.ball.style.left = this.posisjon[1] + "%";
  this.ball.style.width = this.størrelse + "vw";
  this.ball.style.height = this.størrelse + "vw";
  //Metode for endre størrelsen
  this.krymp = function(hastighet) {
    this.størrelse -= hastighet;
    this.ball.style.width = this.størrelse + "vw";
    this.ball.style.height = this.størrelse + "vw";
    return this.størrelse;
  }
  //Eventlistener for når brukeren klikker bobblen
  this.ball.addEventListener("click", sprengBobble);
}

/*** Funksjon for å feste en ny bobble til spillområdet ***/
function lagBobble() {
  //Lag bobble
  const bobble = new Bobble();
  //Fest bobble til spillområde
  område.appendChild(bobble.ball);
  //Krymp bobble
  krymp(bobble);
}

/*** Funksjon for å krympe bobblen ***/
function krymp(bobble) {
  //Bruk endre størrelse-metoden på bobblen i et jevnt temp.
  interval = setInterval(function() {
    if (bobble.krymp(hastighet) < 0) {
      clearInterval(interval);
      gameIsOver();
    };
  }, 10);
}



/*** Funksjon for når spilleren sprenger bobblen ***/
function sprengBobble(event) {
  clearInterval(interval);
  //Gi poeng
  scoreDisplay.innerHTML = ++score;
  // Fjern bobblen fra spillområde
  område.removeChild(event.target);
  hastighet *= 1.2;
  // Lag ny bobble
  lagBobble();
}


//Funksjon som viser game-over teksten.
function gameIsOver() {
  //Vis Game-over elementet fra HTML-filen.
  gameOver.classList.remove("invisible");
}



/***** PROGRAM *****/
/*** Start programmet ***/
//Gi brukeren en bobble å sprenge.
lagBobble();
