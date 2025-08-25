class Map extends Entity {
	constructor(canvas, hash) {
		super();
		this.canvas = canvas;
		this.hash = hash;
		this.seed = toSeed(hash.toString());
		this.cellSize = 200;
		this.trees = {};
	}

	addp(p) {
		this.p = p;
	}

	randChunk(cx, cy) {
		const seed = this.seed ^ (cx * 374761393) ^ (cy * 668265263);
		return mulberry32(seed);
	}

	genChunk(cx, cy) {
		const rand = this.randChunk(cx, cy);
		const trees = [];
		const numTrees = Math.floor(rand() * 2);
		for (let i = 0; i < numTrees; i++) {
			const x = cx * this.cellSize + rand() * this.cellSize;
			const y = cy * this.cellSize + rand() * this.cellSize;
			const branches = [];
			let previous_rad = 100;
			for (let j = 0; j < 3; j++) {
				let rad = 25 + rand() * 50;
				if (rad > previous_rad) rad = previous_rad * 0.7;
				const angle = rand() * 2 * Math.PI;
				const length = rand() * rad * 1.2;
				const color = `rgb(34, ${80 + Math.floor(rand() * 85)}, 34)`;
				branches.push(new TreeBranch(rad, angle, length, color));
				previous_rad = rad;
			}
			trees.push(new Tree(new V2(x, y), branches));
		}
		this.trees[`${cx},${cy}`] = trees;
	}

	ensureChunks() {
		if (!this.p) return;
		const cx = Math.floor(this.p.pos.x / this.cellSize);
		const cy = Math.floor(this.p.pos.y / this.cellSize);
		const range = 2;
		for (let y = cy - range; y <= cy + range; y++)
			for (let x = cx - range; x <= cx + range; x++)
				if (!this.trees[`${x},${y}`]) this.genChunk(x, y);
	}

	ground(c) {
		c.fillStyle = "#927562ff";
		c.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw(c) {
		if (!this.p) return;
		this.ground(c);
		this.ensureChunks();
		this.p.draw(c);
		const x_off = this.canvas.width / 2 - this.p.pos.x;
		const y_off = this.canvas.height / 2 - this.p.pos.y;
		for (let key in this.trees)
			for (const obj of this.trees[key])
				obj.draw(c, x_off, y_off);
		this.p.hud(c);
	}

	update() {
		this.ensureChunks();
		let underTree = false;
		for (let key in this.trees)
			for (const tree of this.trees[key])
				if (tree.isCollidingWithp(this.p)) underTree = true;
		this.p.is_under_tree = underTree;
	}
}