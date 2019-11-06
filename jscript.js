// variables
// variables auxiliares
// clases
// instancias
// funciones auxiliares
// funciones main // update
// listeners

/////////////////////////////////////////////////////////////////////////////////
//////   VARIABLES Y VARIABLES SECUNDARIAS
/////////////////////////////////////////////////////////////////////////////

const images = {
  bg: './grafs/BG.png ',
  buzo: './grafs/buzoP1.png',
  pez: './grafs/fishP2.png  ',
  mina: './grafs/mina.png  ',
  enemy: './grafs/enemyfish1.png',
  plastic: './algo ',
  seafood: './algomas'
};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval; // Interval esta todo nuestro intervalo del juego, es para poderlo parar o seguir
let frames = 0; // ES una variable auxiliar para tener nocion del tiempo o cuanto frames han pasado
const obstacles = []; // Es un array donde vamos ir guardando los obstacles
// Buena practica, deberiamos de splicear el obstacle que ya no sirve

///////////////////////////////////////////////
//////   CLASES
/////////////////////////////////////////////
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = images.bg;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    this.x--; // decrementamos x para que vaya haciendo el efecto de movimiento
    if (this.x < -canvas.width) this.x = 0; // preguntamos si la primer imagen ya esta fuera del canvas
    // dibujamos la imagen normal
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
}

class Buzo {
  constructor() {
    // tamaño y ubicacion
    this.x = 30;
    this.y = 150;
    this.width = 200;
    this.height = 200;
    this.vx = 0;
    this.vy = 0;
    // vida
    this.hp = 3;
    //  animacion
    this.animate = 0;
    this.position = 0;
    // el grafico
    this.img = new Image();
    this.img.src = images.buzo;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    //metodo dibujo del buzo
    // efecto de gravedad
    this.y++;
    // limites verticales del buzo
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > 700) {
      this.y = 700;
    }
    //loop de la animacion del buzo
    if (frames % 3 === 0) {
      if (this.animate > 6) {
        this.animate = 0;
      }
      this.animate++;
    }
    // sprite del buzo
    ctx.drawImage(
      this.img, // imagen de fuente
      (this.animate * 560) / 7, // posición de x en la imagen (fuente, sx)
      this.position * 80, // posición de y en la imagen (fuente, sy)
      560 / 7, // ancho desde la posición de x (sw)
      80, // alto desde la posición de y (sw)
      this.x, // posición de x en canvas (destino, dx)
      this.y, // posición de y en canvas (destino, dy)
      this.width, // ancho desde la posición de x en canvas (dw)
      this.height // alto desde la posición de y en canvas (dh)
    );
  }

  nadar() {
    this.y -= 20;
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
  moveLeft() {
    if (-30 < this.vx) this.vx -= 3;
    else this.vx = 0;

    if (this.x - 60 < 0) this.x = 0;
  }

  moveRight() {
    if (this.vx < 30) this.vx += 3;
    else this.vx = 0;

    if (this.x + 150 > canvas.width) this.x = canvas.width - this.width;
  }
}

class Pez {
  //player 2- El PEZ
  constructor() {
    // tamaño y ubicacion
    this.x = 30;
    this.y = 350;
    this.width = 230;
    this.height = 40;
    this.vx = 0;
    this.vy = 0;
    // vida
    this.hp = 3;
    //  animacion
    this.animate = 0;
    this.position = 0;
    // el grafico
    this.img = new Image();
    this.img.src = images.pez;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    //metodo dibujo del buzo
    // efecto de gravedad
    this.y++;
    // limites verticales del buzo
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > 700) {
      this.y = 700;
    }
    //loop de la animacion del buzo
    if (frames % 3 === 0) {
      if (this.animate > 3) {
        this.animate = 0;
      }
      this.animate++;
    }
    // sprite del pez
    ctx.drawImage(
      this.img, // imagen de fuente
      (this.animate * 156) / 4, // posición de x en la imagen (fuente, sx)
      this.position * 20, // posición de y en la imagen (fuente, sy)
      156 / 4, // ancho desde la posición de x (sw)
      20, // alto desde la posición de y (sw)
      this.x, // posición de x en canvas (destino, dx)
      this.y, // posición de y en canvas (destino, dy)
      this.width, // ancho desde la posición de x en canvas (dw)
      this.height // alto desde la posición de y en canvas (dh)
    );
  }

  nadar() {
    this.y -= 25;
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
  moveLeft() {
    if (-30 < this.vx) this.vx -= 3;
    else this.vx = 0;

    if (this.x - 60 < 0) this.x = 0;
  }

  moveRight() {
    if (this.vx < 30) this.vx += 3;
    else this.vx = 0;

    if (this.x + 150 > canvas.width) this.x = canvas.width - this.width;
  }
}

class Mina {
  constructor(y) {
    this.x = canvas.width;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.img = new Image();
    this.img.src = images.mina;
    // this.type = type;
  }
  draw() {
    this.x--;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
// clase pez Enemigo
class Enemy {
  constructor(y) {
    // tamaño y ubicacion
    this.x = canvas.width;
    this.y = y;
    this.height = 80;
    this.width = 80;
    //animacion
    this.animate = 0;
    this.position = 0;
    // el grafico
    this.img = new Image();
    this.img.src = images.enemy;
    this.img.onload = () => {
      this.draw();
    };
    //this.type = "";
  }
  draw() {
    //avance en x
    this.x--;
    //loop de la animacion pez
    if (frames % 4 === 0) {
      if (this.animate > 3) {
        this.animate = 0;
      }
      this.animate++;
    }
    // imagenes para sprite
    //    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      // imagen de fuente
      this.img,
      // posición de x en la imagen (fuente, sx)
      (this.animate * 216) / 4,
      // posición de y en la imagen (fuente, sy)
      this.position * 49,
      // ancho desde la posición de x (sw)
      216 / 4,
      // alto desde la posición de y (sw)
      49,
      // posición de x en canvas (destino, dx)
      this.x,
      // posición de y en canvas (destino, dy)
      this.y,
      // ancho desde la posición de x en canvas (dw)
      this.width,
      // alto desde la posición de y en canvas (dh)
      this.height
    );
  }
}

///////////////////////////////////////////////
//////    INSTANCIAS
/////////////////////////////////////////////
const board = new Board();
const buzo = new Buzo();
const mina = new Mina();
const enemy = new Enemy();
const pez = new Pez();

///////////////////////////////////////////////
//////   FUNCIONES
///////////////////////////////////////////

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// en check collition añadir dinamica de puntos
function checkCollition() {
  //para el buzo
  obstacles.forEach((enemy, i) => {
    if (buzo.isTouching(enemy)) {
      obstacles.splice(i, 1);
      buzo.hp--;
      console.log(buzo.hp);
    }
  });
  obstacles.forEach((mina, i) => {
    if (buzo.isTouching(mina)) {
      obstacles.splice(i, 1);
      buzo.hp--;
      console.log(buzo.hp);
    }
  });

  ///Para al pez
  obstacles.forEach((enemy, i) => {
    if (pez.isTouching(enemy)) {
      obstacles.splice(i, 1);
      pez.hp--;
      console.log(pez.hp + 'vida pez');
    }
  });
  obstacles.forEach((mina, i) => {
    if (pez.isTouching(mina)) {
      obstacles.splice(i, 1);
      pez.hp--;
      console.log(pez.hp + 'vida pez');
    }
  });
}

function generarminas() {
  if (frames % 400 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50;
    const mina = new Mina(randomPosition);
    obstacles.push(mina);
  }
}

function generarPezenemy() {
  if (frames % 400 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50;
    const enemy = new Enemy(randomPosition);
    obstacles.push(enemy);
  }
}

function drawObstacles() {
  obstacles.forEach((mina) => mina.draw());
  obstacles.forEach((enemy) => enemy.draw());
}

function start() {
  // si ya se habia ejecutado el juego, no lo dejes entrar despues
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}

function restart() {
  interval = false;
  buzo.x = 30;
  buzo.y = 70;
  buzo.hp = 3;
  pez.x = 30;
  pez.y = 100;
  pez.hp = 3;
  start();
}

function showlives() {
  //  texto buzo
  ctx.font = '25px Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('buzo', 45, 30); // (texto ,x y )
  //  vida de buzo
  ctx.font = '20px Courier';
  ctx.fillStyle = 'white';
  ctx.fillText(buzo.hp, 110, 30);
  //  texto pez
  ctx.font = '25px Courier';
  ctx.fillStyle = 'white';
  ctx.fillText(' Pez', 800, 30);
  //  hp de pez
  ctx.font = '20px Courier';
  ctx.fillStyle = 'white';
  ctx.fillText(pez.hp, 880, 30);
}

function gameOver() {
  // texto de game over
  if (buzo.hp <= 0 || pez.hp <= 0) {
    clearInterval(interval);
    ctx.font = '90px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', canvas.width / 3, canvas.height / 2);
    ctx.font = '28px Courier';
    ctx.fillText('  Back Space para jugar', canvas.width / 3, (canvas.height + 130) / 2);
    clearInterval(interval);
  }
}

function update() {
  frames++;
  clearCanvas();
  board.draw();
  showlives();
  ///
  buzo.draw();
  buzo.x += buzo.vx;
  buzo.y += buzo.vy;
  console.log(buzo.vx, buzo.vy);
  ///
  pez.draw();
  pez.x += pez.vx;
  pez.y += pez.vy;
  console.log(pez.vx, pez.vy);
  ///
  mina.draw();
  enemy.draw();
  checkCollition();
  drawObstacles();
  generarminas();
  generarPezenemy();
  gameOver();
}

///////////////////////////////////////////////
//////   LISTENERS
/////////////////////////////////////////////

document.onkeydown = (e) => {
  e.preventDefault();
  switch (e.keyCode) {
    case 13:
      // case 13 -> enter
      start();
      break;

    case 8:
      // case 8 -> backspace
      restart();
      break;

    // movimientos teclado- buzo
    case 87:
      // case 87 -> tecla W
      buzo.nadar();
      break;

    case 65:
      // case 65 -> tecla A
      buzo.moveLeft();
      break;

    case 68:
      // case 68 -> tecla D
      buzo.moveRight();
      break;
    // movimientos teclado- pez
    case 38:
      // case 38 -> flecha arriba
      pez.nadar();
      break;

    case 37:
      // case 37 -> flecha izq.
      pez.moveLeft();
      break;

    case 39:
      // case 39 ->  flecha derecha
      pez.moveRight();
      break;

    default:
      break;
  }
};
document.onkeyup = (e) => {
  buzo.vx = 0;
  pez.vx = 0;
};
