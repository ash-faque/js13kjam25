class Map extends GameObject {

    TileType = {
        GROUND: 0,
        WATER: 1,
    };

    constructor(canvas, hash) {
        super();
        this.canvas = canvas;
        this.hash = hash;

        this.init();

        window.addEventListener('resize', () => {
            this.init();
        });
    }

    init() {
        this.cellSize = 20;

        this.grid_size = new Vector(
            Math.floor(this.canvas.width / this.cellSize),
            Math.floor(this.canvas.height / this.cellSize)
        );

        this.offsetX = (this.canvas.width - this.cellSize * this.grid_size.x) / 2;
        this.offsetY = (this.canvas.height - this.cellSize * this.grid_size.y) / 2;

        this.tiles = this.generateMap();
    }

    generateMap() {
        const seed = hashStringToSeed(this.hash.toString());
        const rand = mulberry32(seed);

        // initialize everything as ground
        const map = Array.from({ length: this.grid_size.y }, () =>
            Array(this.grid_size.x).fill(this.TileType.GROUND)
        );

        // === Generate Walls (3 straight lines) ===
        for (let i = 0; i < 3; i++) {
            const isHorizontal = rand() < 0.5;
            const startX = Math.floor(rand() * this.grid_size.x);
            const startY = Math.floor(rand() * this.grid_size.y);
            const length = Math.floor(rand() * (isHorizontal ? this.grid_size.x / 2 : this.grid_size.y / 2)) + 5;

            for (let j = 0; j < length; j++) {
                const x = isHorizontal ? startX + j : startX;
                const y = isHorizontal ? startY : startY + j;

                if (x >= 0 && x < this.grid_size.x && y >= 0 && y < this.grid_size.y) {
                    map[y][x] = this.TileType.WALL;
                }
            }
        }

        // === Generate Water Blobs ===
        const numLakes = 2 + Math.floor(rand() * 3); // 2-4 lakes
        for (let i = 0; i < numLakes; i++) {
            const cx = Math.floor(rand() * this.grid_size.x);
            const cy = Math.floor(rand() * this.grid_size.y);
            const a = 3 + Math.floor(rand() * 5); // horizontal radius
            const b = 2 + Math.floor(rand() * 4); // vertical radius

            for (let y = cy - b; y <= cy + b; y++) {
                for (let x = cx - a; x <= cx + a; x++) {
                    if (x >= 0 && x < this.grid_size.x && y >= 0 && y < this.grid_size.y) {
                        // ellipse equation
                        const eq = ((x - cx) ** 2) / (a * a) + ((y - cy) ** 2) / (b * b);
                        if (eq <= 1) {
                            map[y][x] = this.TileType.WATER;
                        }
                    }
                }
            }
        }

        return map;
    }


    draw(ctx) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                switch (this.tiles[y][x]) {
                    case this.TileType.GROUND: ctx.fillStyle = '#23704cff'; break; // gray
                    case this.TileType.WATER: ctx.fillStyle = '#1E90FF'; break; // blue
                }

                ctx.fillRect(
                    this.offsetX + x * this.cellSize,
                    this.offsetY + y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }


    update() {
        // future logic
    }

}


