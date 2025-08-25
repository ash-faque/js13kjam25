class Player extends GameObject {
    constructor(canvas, position) {
        super();
        this.canvas = canvas;
        this.position = position;
        this.radius = 14;

        this.body_color = "#ffce80ff";
        this.head_color = "#171717ff";

        this.look_dir = { x: 1, y: 0 };
        this.is_under_tree = false;

        this.walk_speed = 5;
        this.speed = 0;
        this.sprint_speed = 15;
        this.sprint_power = 100;
        this.sprint_power_max = 100;
        this.movement_tick = 1000 / 10;
        setInterval(() => {
            this.movement();
        }, this.movement_tick);

        this.firing_tick = 1000 / 5;
        this.fired = true;
        this.ammunition = 5;
        this.ammunition_max = 5;
        setInterval(() => {
            this.fire();
        }, this.firing_tick);
    }

    fire() {
        if (this.ammunition > 0 && isFiring()) {
            this.fired = false;
            this.ammunition--;
        }
    }

    movement() {
        if (this.sprint_power < this.sprint_power_max) {
            this.sprint_power += 0.05;
        }
        if (this.sprint_power > 0 && isBoostActive() && getInputDirection().length() > 0) {
            this.sprint_power -= 0.5;
        }
    }

    draw(ctx) {
        ctx.save();

        const screenX = this.canvas.width / 2;
        const screenY = this.canvas.height / 2;

        if (isFiring() && this.ammunition > 0 && !this.fired) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.radius * 5, 0, Math.PI * 2);
            ctx.fillStyle = "#ff0000ff";
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            this.fired = true;
        } else {
            this.head_color = "#000000ff";
        }

        // body (circle)
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.body_color;
        ctx.fill();
        ctx.closePath();

        // === head as arrow ===
        const angle = Math.atan2(this.look_dir.y, this.look_dir.x);
        const arrowLength = this.radius * 0.8;
        const arrowWidth = this.radius * 0.6;

        ctx.beginPath();
        ctx.moveTo(
            screenX + Math.cos(angle) * arrowLength,
            screenY + Math.sin(angle) * arrowLength
        ); // tip of arrow
        ctx.lineTo(
            screenX + Math.cos(angle + Math.PI * 0.75) * arrowWidth,
            screenY + Math.sin(angle + Math.PI * 0.75) * arrowWidth
        ); // left corner
        ctx.lineTo(
            screenX + Math.cos(angle - Math.PI * 0.75) * arrowWidth,
            screenY + Math.sin(angle - Math.PI * 0.75) * arrowWidth
        ); // right corner
        ctx.closePath();

        ctx.fillStyle = this.head_color;
        ctx.fill();

        ctx.restore();
    }

    update() {
        if (isReloading()) {
            this.ammunition = this.ammunition_max;
        }
        let targetSpeed = 0;
        if (getInputDirection().length()) {
            if (isBoostActive() && this.sprint_power > 0) {
                targetSpeed = this.sprint_speed;
            } else {
                targetSpeed = this.walk_speed;
            }
        }
        this.speed += (targetSpeed - this.speed) * 0.1;

        const inputDir = getInputDirection();
        this.position = this.position.add(inputDir.multiply(this.speed));

        if (inputDir.x !== 0 || inputDir.y !== 0) {
            const length = Math.sqrt(inputDir.x * inputDir.x + inputDir.y * inputDir.y);
            this.look_dir = { x: inputDir.x / length, y: inputDir.y / length };
        }
    }

    hud(ctx) {
        const bar_height = 20;
        const bar_width = this.canvas.width * 0.25;
        const bar_x = 60;   // bar start
        const start_y = this.canvas.height - 120;
        const spacing = 30;

        ctx.save();
        ctx.font = "12px Iosevka";
        ctx.textBaseline = "middle";

        // helper to draw each bar with trailing text
        const drawBar = (label, value, max, color, y) => {
            // label before bar
            ctx.fillStyle = "#fff";
            ctx.fillText(label, 10, y + bar_height / 2);

            // bar background
            ctx.fillStyle = "#222";
            ctx.fillRect(bar_x, y, bar_width, bar_height);

            // bar fill
            ctx.fillStyle = color;
            ctx.fillRect(bar_x, y, (value / max) * bar_width, bar_height);

            // text after bar
            ctx.fillStyle = "#fff";
            ctx.fillText(`${Math.floor(value)}/${max}`, bar_x + bar_width + 10, y + bar_height / 2);
        };

        let y = start_y;

        // === Sprint Power ===
        drawBar(
            "Sprint",
            this.sprint_power,
            this.sprint_power_max,
            isBoostActive() ? "#ffd500" : "#9efb9e",
            y
        );

        // === Movement Speed ===
        y += spacing;
        drawBar(
            "Speed",
            Math.floor(this.speed),
            this.sprint_speed,
            getInputDirection().length() && isBoostActive() ? "#ffd500" : "#9efb9e",
            y
        );

        // === Ammunition ===
        y += spacing;
        drawBar(
            "Ammo",
            this.ammunition,
            this.ammunition_max,
            this.ammunition > 0 ? "#9efb9e" : "#ff5050",
            y
        );

        ctx.restore();
    }

}
