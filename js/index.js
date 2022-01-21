const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

canvas.height = 700;
canvas.width = 500;
const img = new Image();
img.src = "/images/car.png";
img.onload = () => {
  // ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 120, 50, 100);
};

class Player {
  constructor() {
    this.x = canvas.width / 2 - 25;
    this.y = canvas.height - 120;
    this.w = 50;
    this.h = 100;
  }

  move(direction) {
    switch (direction) {
      case "ArrowLeft":
        this.x -= 15;
        break;
      case "ArrowRight":
        this.x += 15;
        break;
    }
  }
}

let driver = new Player();

class Obstacle {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = 0;
    this.w = 200;
    this.h = 25;
    this.color = "brown";
  }
  moveDown() {
    this.y = this.y + 1.5;
  }
}

let obstacles = [];
let didCollide;
let scoreCount = 0;
let score = "Score: " + scoreCount;

obstacles.push(new Obstacle());

function createObstacle() {
  obstacles.push(new Obstacle());
}

function startGame() {
  setInterval(createObstacle, 3000);
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("ArrowLeft");
        break;
      case "ArrowRight":
        driver.move("ArrowRight");
        break;
    }
  });
  animate();
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, driver.x, driver.y, driver.w, driver.h);
  ctx.fillStyle = obstacles.color;
  ctx.fillRect(obstacles.x, obstacles.y, obstacles.w, obstacles.h);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(score, 80, 680);
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = obstacles[i].color;
    obstacles[i].moveDown();
    ctx.fillRect(
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].w,
      obstacles[i].h
    );
    //Call the collision function, and compare it to every object
    didCollide = detectCollision(driver, obstacles[i]);
    if (didCollide) {
      obstacles.splice(i, 1);
      window.cancelAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function detectCollision(player, obj) {
      if (
        player.x < obj.x + obj.w &&
        player.x + player.w > obj.x &&
        player.y < obj.y + obj.h &&
        player.y + player.h > obj.y
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (didCollide) {
      window.cancelAnimationFrame(animate);
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  // this curly brace should be the end.
}
