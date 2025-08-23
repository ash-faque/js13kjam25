class Player extends GameObject {
    constructor(x, y) {
        super();
        this.position = new Vector(x, y);
        this.speed = 5;
        this.radius = 30;
        this.color = "#27d600ff";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        const inputDir = getInputDirection();
        this.position = this.position.add(inputDir.multiply(this.speed));
    }
}
