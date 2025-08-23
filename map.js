class Map extends GameObject {
    constructor(grid_size, canvas, hash) {
        super();
        this.grid_size = grid_size;
        this.tiles = this.generateMap();
        this.canvas = canvas;
        this.hash = hash;

        this.cellSize = Math.min(
            canvas.width / grid_size.x,
            canvas.height / grid_size.y
        );

        this.offsetX = (canvas.width - this.cellSize * grid_size.x) / 2;
        this.offsetY = (canvas.height - this.cellSize * grid_size.y) / 2;
    }

    generateMap() {
        const map = [];
        for (let y = 0; y < this.grid_size.y; y++) {
            const row = [];
            for (let x = 0; x < this.grid_size.x; x++) {
                row.push(Math.random() < 0.2 ? 1 : 0);
            }
            map.push(row);
        }
        return map;
    }

    draw(ctx) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                ctx.fillStyle = this.tiles[y][x] === 1 ? 'black' : 'white';
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
