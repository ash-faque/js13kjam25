class Tree extends Entity {
    constructor(pos, branches) {
        super();
        this.pos = pos;
        this.branches = branches;
        this.rad = Math.max(...branches.map(b => b.rad));
        this.p_under = false;
    }

    draw(c, x_off, y_off) {
        for (let i = 0; i < this.branches.length; i++) {
            const branch = this.branches[i];
            branch.draw(c, this.pos.x + x_off, this.pos.y + y_off, this.p_under);
        }
    }

    update() { }

    isCollidingWithp(p) {
        const dx = this.pos.x - p.pos.x;
        const dy = this.pos.y - p.pos.y;
        const d_sq = dx * dx + dy * dy;
        const minDist = this.rad + p.rad;

        if (d_sq <= minDist * minDist) {
            this.p_under = true;
            return true;
        } else {
            this.p_under = false;
            return false;
        }
    }
}


class TreeBranch {
    constructor(rad, angle, length, color) {
        this.rad = rad;
        this.angle = angle;
        this.length = length;
        this.color = color;
    }

    draw(c, x_off, y_off, p_under) {
        const x = x_off + Math.cos(this.angle) * this.length;
        const y = y_off + Math.sin(this.angle) * this.length;
        c.save();
        c.beginPath();
        c.arc(x, y, this.rad, 0, Math.PI * 2);
        c.fillStyle = this.color;
        p_under ? c.globalAlpha = 0.6 : c.globalAlpha = 1.0;
        c.fill();
        c.closePath();
        c.restore();
    }

}
