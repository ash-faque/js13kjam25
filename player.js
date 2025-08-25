class Player extends Entity {
	constructor(canvas, pos) {
		super();
		this.canvas = canvas;
		this.pos = pos;
		this.rad = 14;
		this.body_color = "#ffce80ff";
		this.head_color = "#171717ff";
		this.look_dir = { x: 1, y: 0 };
		this.is_under_tree = false;
		this.walk_speed = 5;
		this.speed = 0;
		this.sprint_speed = 15;
		this.sprint_power = 100;
		this.sprint_power_max = 100;
		this.movement_tick = 100;
		setInterval(() => this.movement(), this.movement_tick);
		this.firing_tick = 200;
		this.fired = true;
		this.ammunition = 5;
		this.ammunition_max = 5;
		setInterval(() => this.fire(), this.firing_tick);
	}

	fire() {
		if (this.ammunition > 0 && isFiring()) {
			this.fired = false;
			this.ammunition--;
		}
	}

	movement() {
		if (this.sprint_power < this.sprint_power_max) this.sprint_power += 0.05;
		if (this.sprint_power > 0 && isBoostActive() && getInputDirection().length() > 0)
			this.sprint_power -= 0.5;
	}

	draw(c) {
		c.save();
		const screenX = this.canvas.width / 2, screenY = this.canvas.height / 2;
		if (isFiring() && this.ammunition > 0 && !this.fired) {
			c.save();
			c.beginPath();
			c.arc(screenX, screenY, this.rad * 5, 0, Math.PI * 2);
			c.fillStyle = "#ff0000ff";
			c.globalAlpha = 0.6;
			c.fill();
			c.closePath();
			c.restore();
			this.fired = true;
		} else this.head_color = "#000000ff";
		c.beginPath();
		c.arc(screenX, screenY, this.rad, 0, Math.PI * 2);
		c.fillStyle = this.body_color;
		c.fill();
		c.closePath();
		const angle = Math.atan2(this.look_dir.y, this.look_dir.x);
		const arrowLength = this.rad * 0.8, arrowWidth = this.rad * 0.6;
		c.beginPath();
		c.moveTo(screenX + Math.cos(angle) * arrowLength, screenY + Math.sin(angle) * arrowLength);
		c.lineTo(screenX + Math.cos(angle + Math.PI * 0.75) * arrowWidth, screenY + Math.sin(angle + Math.PI * 0.75) * arrowWidth);
		c.lineTo(screenX + Math.cos(angle - Math.PI * 0.75) * arrowWidth, screenY + Math.sin(angle - Math.PI * 0.75) * arrowWidth);
		c.closePath();
		c.fillStyle = this.head_color;
		c.fill();
		c.restore();
	}

	update() {
		if (isReloading()) this.ammunition = this.ammunition_max;
		let targetSpeed = getInputDirection().length() ? (isBoostActive() && this.sprint_power > 0 ? this.sprint_speed : this.walk_speed) : 0;
		this.speed += (targetSpeed - this.speed) * 0.1;
		const inputDir = getInputDirection();
		this.pos = this.pos.add(inputDir.multiply(this.speed));
		if (inputDir.x !== 0 || inputDir.y !== 0) {
			const length = Math.sqrt(inputDir.x * inputDir.x + inputDir.y * inputDir.y);
			this.look_dir = { x: inputDir.x / length, y: inputDir.y / length };
		}
	}

	hud(c) {
		const bar_height = 20, bar_width = this.canvas.width * 0.25, bar_x = 60, start_y = this.canvas.height - 120, spacing = 30;
		c.save();
		c.font = "12px Iosevka";
		c.textBaseline = "middle";
		const drawBar = (label, value, max, color, y) => {
			c.fillStyle = "#fff";
			c.fillText(label, 10, y + bar_height / 2);
			c.fillStyle = "#222";
			c.fillRect(bar_x, y, bar_width, bar_height);
			c.fillStyle = color;
			c.fillRect(bar_x, y, (value / max) * bar_width, bar_height);
			c.fillStyle = "#fff";
			c.fillText(`${Math.floor(value)}/${max}`, bar_x + bar_width + 10, y + bar_height / 2);
		};
		let y = start_y;
		drawBar("Sprint", this.sprint_power, this.sprint_power_max, isBoostActive() ? "#ffd500" : "#9efb9e", y);
		y += spacing;
		drawBar("Speed", Math.floor(this.speed), this.sprint_speed, getInputDirection().length() && isBoostActive() ? "#ffd500" : "#9efb9e", y);
		y += spacing;
		drawBar("Ammo", this.ammunition, this.ammunition_max, this.ammunition > 0 ? "#9efb9e" : "#ff5050", y);
		c.restore();
	}
}