class Player extends GameObject {
    constructor(canvas, position) {
        super();
        this.canvas = canvas;
        this.position = position;
        this.speed = 10;
        this.radius = 15;
        this.color = "#27d600ff";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        if (isBoostActive()) {
            this.speed = 20;
        } else {
            this.speed = 5;
        }
        const inputDir = getInputDirection();
        this.position = this.position.add(inputDir.multiply(this.speed));
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.x > canvas.width) this.position.x = canvas.width;
        if (this.position.y > canvas.height) this.position.y = canvas.height;
    }
}
