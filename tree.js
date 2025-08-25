class Tree extends GameObject {
    constructor(position, branches) {
        super();
        this.position = position;
        this.branches = branches;
        this.radius = Math.max(...branches.map(b => b.radius));
        this.player_under = false;
    }

    draw(ctx, offsetX, offsetY) {
        for (let i = 0; i < this.branches.length; i++) {
            const branch = this.branches[i];
            branch.draw(ctx, this.position.x + offsetX, this.position.y + offsetY, this.player_under);
        }
    }

    update() { }

    isCollidingWithPlayer(player) {
        const dx = this.position.x - player.position.x;
        const dy = this.position.y - player.position.y;
        const distanceSq = dx * dx + dy * dy;
        const minDist = this.radius + player.radius;

        if (distanceSq <= minDist * minDist) {
            this.player_under = true;
            return true;
        } else {
            this.player_under = false;
            return false;
        }
    }
}




class TreeBranch {
    constructor(radius, angle, length, color) {
        this.radius = radius;
        this.angle = angle;
        this.length = length;
        this.color = color;
    }



    draw(ctx, offsetX, offsetY, playerUnder) {
        const x = offsetX + Math.cos(this.angle) * this.length;
        const y = offsetY + Math.sin(this.angle) * this.length;

        ctx.save();
        
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        if (playerUnder) {
            ctx.globalAlpha = 0.6;
        } else {
            ctx.globalAlpha = 1.0;
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }


}
