const images = {
  bg: './grafs/BG.png ',
  buzo: './grafs/buzoP1.png',
  pez: './grafs/fishP2.png  ',
  mina: './grafs/mina.png  ',
  enemy: './grafs/enemyfish.png'
};

// variables
// variables auxiliares
// clases
// instancias
// funciones auxiliares
// funciones main // update
// listeners

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Interval esta todo nuestro intervalo del juego, es para poderlo parar o seguir
let interval;
// ES una variable auxiliar para tener nocion del tiempo o cuanto frames han pasado
let frames = 0;
console.log(frames)
// Es un array donde vamos ir guardando los obstacles
// Buena practica, deberiamos de splicear el obstacle que ya no sirve
const obstacles = [];

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
    // decrementamos x para que vaya haciendo el efecto de movimiento
    this.x--;
    // preguntamos si la primer imagen ya esta fuera del canvas
    if (this.x < -canvas.width) this.x = 0;
    // dibujamos la imagen normal
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // dibujamos la otra imagen, despues de la primer imagen, para que ocupe el espacio en blanco, cuando la primer imagen esta fuera
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
}

class Flappy {
  constructor() {
    // tamaño y ubicacion
    this.x = 30;
    this.y = 150;
    this.width = 150;
    this.height = 150;
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
    this.y++;
    if (this.animate > 7) {
      this.animate = 0
    }
    this.animate++

    ctx.drawImage(
      // imagen de fuente
      this.img,
      // posición de x en la imagen (fuente, sx)
      (this.animate * 560) / 7,
      // posición de y en la imagen (fuente, sy)
      this.position * 80,
      // ancho desde la posición de x (sw)
      560 / 7,
      // alto desde la posición de y (sw)
      80,
      // posición de x en canvas (destino, dx)
      this.x,
      // posición de y en canvas (destino, dy)
      this.y,
      // ancho desde la posición de x en canvas (dw)
      this.width,
      // alto desde la posición de y en canvas (dh)
      this.height)
  }

  fly() {
    this.y -= 20;
  }
  // isTouching(obstacle) {
  //   return (
  //     this.x < obstacle.x + obstacle.width &&
  //     this.x + this.width > obstacle.x &&
  //     this.y < obstacle.y + obstacle.height &&
  //     this.y + this.height > obstacle.y
  //   );
  // }
}

class Mina {
  constructor() {
    this.x = 200;
    this.y = 200;
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


// class Enemy {
//   constructor() {
//     this.x =  y;
//     this.y = x;
//     this.height = 50;
//     this.width = 50;
//     this.img = new Image();
//     this.img.src = images.enemy;
//     this.type = type;
//   }
//   draw() {
//     this.x--;
//     ctx.drawImage(this.img, this.x, this.y, this.width, this.height;
//     
//     }
//   }
// }



// class Obstacle {
//   constructor(y, height, type) {
//     this.x = canvas.width + 50;
//     this.y = y;
//     this.height = height;
//     this.width = 50;
//     this.imgTop = new Image();
//     this.imgTop.src = images.topPipe;
//     this.imgBot = new Image();
//     this.imgBot.src = images.bottomPipe;
//     this.type = type;
//   }
//   draw() {
//     this.x--;
//     if (this.type) {
//       ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
//     } else {
//       ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
//     }
//   }
// }

const board = new Board();
const flappy = new Flappy();
const mina = new Mina();

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  this.frames++;
  clearCanvas();
  board.draw();
  flappy.draw();

  //checkCollition();
}

function checkCollition() {
  obstacles.forEach((pipe) => {
    if (flappy.isTouching(pipe)) {
      gameOver();
    }
    if (flappy.y <= 0 || flappy.y >= canvas.height - flappy.height) {
      gameOver();
    }
  });
}

function gameOver() {
  ctx.font = '30px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);

  clearInterval(interval);
}

// function generatePipes() {
//   // maximo de un pipe
//   const max = canvas.height - 100;
//   // minimo de un pipe
//   const min = 50;
//   // espacio calculado a traves de mucho research para saber donde si quepo, sin albur
//   const ventanita = 100;
//   // expresion matematica, hecha por los dioses, e Isaac Newton, para calcular max o min
//   const randomHeight = Math.floor(Math.random() * (max - min));
//   if (frames % 300 === 0) {
//     obstacles.push(new Obstacle(0, randomHeight, true));
//     obstacles.push(
//       new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false)
//     );
//   }
// }

// function drawPipes() {
//   generatePipes();
//   obstacles.forEach((pipe) => pipe.draw());
// }

function start() {
  // si ya se habia ejecutado el juego, no lo dejes entrar despues
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}

function restart() {
  interval = false;
  flappy.x = 30;
  flappy.y = 70;
  start();
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 32:
      flappy.fly();
      break;

    case 13:
      start();
      break;

    case 82:
      restart();
      break;

    default:
      break;
  }
};