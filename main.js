const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gameMap = new Map(new Vector(10, 10), canvas, "12345");
const myPlayer = new Player(100, 100);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    GameObject.updateAll();
    GameObject.drawAll(ctx);

    requestAnimationFrame(gameLoop);
}
gameLoop();
