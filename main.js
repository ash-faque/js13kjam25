const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const m = new Map(canvas, "12345");
const p = new Player(canvas, new V2(0, 0));

m.addp(p);

const loop = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);

    Entity.update();

    m.draw(c);

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / 60);
}
loop();

