class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new V2(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new V2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar) {
        return new V2(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new V2(this.x / scalar, this.y / scalar);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}


const toSeed = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return h >>> 0;
}

const mulberry32 = (seed) => {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
