class Map extends GameObject {
    constructor(canvas, hash) {
        super();
        this.canvas = canvas;
        this.hash = hash;
        this.seed = hashStringToSeed(this.hash.toString());
        this.cellSize = 200;  // chunk size (area for spawning trees)

        this.trees = {}; // cache of spawned trees per chunk
    }

    addPlayer(player) {
        this.player = player;
    }

    // Deterministic pseudo-random generator per chunk
    randomForChunk(cx, cy) {
        const seed = this.seed ^ (cx * 374761393) ^ (cy * 668265263);
        return mulberry32(seed);
    }

    // Generate trees in a chunk
    generateChunk(cx, cy) {
        const rand = this.randomForChunk(cx, cy);
        const trees = [];

        const numTrees = 0 + Math.floor(rand() * 2);
        for (let i = 0; i < numTrees; i++) {
            const x = cx * this.cellSize + rand() * this.cellSize;
            const y = cy * this.cellSize + rand() * this.cellSize;
            const branches = [];
            let previous_radius = 100;
            for (let j = 0; j < 3; j++) {
                let radius = 25 + rand() * 50;
                if (radius > previous_radius) {
                    radius = previous_radius * 0.7;
                }
                const angle = 0 + rand() * 2 * Math.PI;
                const length = 0 + rand() * radius * 1.2;
                const color = `rgb(34, ${80 + Math.floor(rand() * 85)}, 34)`;
                branches.push(new TreeBranch(radius, angle, length, color));
                previous_radius = radius;
            }
            trees.push(new Tree(new Vector(x, y), branches));
        }

        this.trees[`${cx},${cy}`] = trees;
    }

    ensureChunks() {
        if (!this.player) return;
        const cx = Math.floor(this.player.position.x / this.cellSize);
        const cy = Math.floor(this.player.position.y / this.cellSize);

        const range = 2;
        for (let y = cy - range; y <= cy + range; y++) {
            for (let x = cx - range; x <= cx + range; x++) {
                if (!this.trees[`${x},${y}`]) {
                    this.generateChunk(x, y);
                }
            }
        }
    }

    draw(ctx) {
        if (!this.player) return;

        this.ground(ctx);

        this.ensureChunks();

        this.player.draw(ctx);

        const offsetX = this.canvas.width / 2 - this.player.position.x;
        const offsetY = this.canvas.height / 2 - this.player.position.y;

        for (let key in this.trees) {
            for (const obj of this.trees[key]) {
                obj.draw(ctx, offsetX, offsetY);
            }
        }

        this.player.hud(ctx);
    }

    ground(ctx) {
        ctx.fillStyle = "#927562ff";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        this.ensureChunks();

        let underTree = false;

        for (let key in this.trees) {
            for (const tree of this.trees[key]) {
                if (tree.isCollidingWithPlayer(this.player)) {
                    underTree = true;
                }
            }
        }

        this.player.is_under_tree = underTree;
    }


}
