class Entity {
    static all = [];

    constructor() {
        if (new.target === Entity) {
            throw new Error("Not allowed");
        }
        Entity.all.push(this);
    }

    update() {
        throw new Error("Not implemented");
    }

    draw(c) {
        throw new Error("Not implemented");
    }

    static update() {
        for (const obj of Entity.all) {
            obj.update();
        }
    }

    static draw(c) {
        for (const obj of Entity.all) {
            obj.draw(c);
        }
    }
};
