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
  enemy: './grafs/enemyfish1.png'
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

class Flappy {
  constructor() {
    // tamaño y ubicacion
    this.x = 30;
    this.y = 150;
    this.width = 150;
    this.height = 150;
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
  draw() { //metodo dibujo del buzo
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

  fly() {
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
}

class Mina {
  constructor() {
    this.x = 800;
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
// clase pez Enemigo
class Enemy {
  constructor() {
    // tamaño y ubicacion
    this.x = 800;
    this.y = 300;
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
    }
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
const flappy = new Flappy();
const mina = new Mina();
const enemy = new Enemy();

///////////////////////////////////////////////
//////   FUNCIONES
///////////////////////////////////////////

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollition() {
  obstacles.forEach((enemy, i) => {
    if (flappy.isTouching(enemy)) {
      obstacles.splice(i, 1)
      flappy.hp--
      console.log(flappy.hp)
    }
  });
  obstacles.forEach((mina, i) => {
    if (flappy.isTouching(mina)) {
      obstacles.splice(i, 1)
      flappy.hp--
      console.log(flappy.hp)
    }
  })
}

function generarminas() {
  if (frames % 400 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
    const mina = new Mina(randomPosition)
    obstacles.push(mina)
  }
}

function generarPezenemy() {
  if (frames % 400 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
    const enemy = new Enemy(randomPosition)
    obstacles.push(enemy)
  }
}

function drawObstacles() {
  obstacles.forEach(mina => mina.draw())
  obstacles.forEach(enemy => enemy.draw())
}

function start() {
  // si ya se habia ejecutado el juego, no lo dejes entrar despues
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}

function restart() {
  interval = false;
  flappy.x = 30;
  flappy.y = 70;
  flappy.hp = 3;
  start();
}

function gameOver() { // texto de game over
  if (flappy.hp < 0) {
    clearInterval(interval)
    ctx.font = '90px Courier';
    ctx.fillText('Game Over', canvas.width / 3, canvas.height / 2);
    ctx.font = '28px Courier';
    ctx.fillText('  R para jugar de nuevo', canvas.width / 3, (canvas.height + 130) / 2);
    clearInterval(interval);
  }
}

function update() {
  frames++;
  clearCanvas();
  board.draw();
  flappy.draw();
  mina.draw();
  enemy.draw();
  checkCollition();
  drawObstacles();
  generarminas();
  generarPezenemy();
  gameOver();
}

// function checkCollition() {
//   obstacles.forEach((pipe) => {
//     if (flappy.isTouching(pipe)) {
//       gameOver();
//     }
//   });
// }

///////////////////////////////////////////////
//////   LISTENERS
/////////////////////////////////////////////

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




///////////////////////////////////////////////////////
///////////// THE FLASH
//////////////////////////////////////////////

// function generateIce() {
//   if (frames % 200 === 0) {
//     const randomPosition = Math.floor(Math.random() * canvas.height) + 50
//     const ice = new Ice(randomPosition)
//     obstacles.push(ice)
//   }
// }

// function drawObstacles() {
//   obstacles.forEach(ice => ice.draw())
// }

// function gameOver() {
//   if (flash.hp === 0) {
//     clearInterval(interval)
//     ctx.font = '30px Arial'
//     ctx.fillStyle = 'white'
//     ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2 - 10)
//   }
// }

// function update() {
//   frames++
//   clearCanvas()
//   board.draw()
//   flashAnimation()
//   flash.draw()
//   flash.x += flash.vx
//   flash.y += flash.vy
//   flash.y += gravity
//   checkColitions()
//   generateIce()
//   drawObstacles()
//   gameOver()
// }