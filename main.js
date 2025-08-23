const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }
}

class Coconut {
    constructor(x, y) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(10, 40);
        this.radius = 30;
    }

    draw() {
        ctx.fillStyle = "#eee";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x + this.radius > canvas.width || this.position.x - this.radius < 0) {
            this.velocity.x *= -1;
        }
        if (this.position.y + this.radius > canvas.height || this.position.y - this.radius < 0) {
            this.velocity.y *= -1;
        }
    }
}

const coconut = new Coconut(100, 100);

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coconut.draw();
    coconut.move();

    requestAnimationFrame(loop);
}
loop();
