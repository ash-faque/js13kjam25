class GameObject {
    static instances = [];

    constructor() {
        if (new.target === GameObject) {
            throw new Error("Cannot instantiate abstract class GameObject directly");
        }
        GameObject.instances.push(this);
    }

    update() {
        throw new Error("Method 'update()' must be implemented in subclass");
    }

    draw(ctx) {
        throw new Error("Method 'draw()' must be implemented in subclass");
    }

    static updateAll() {
        for (const obj of GameObject.instances) {
            obj.update();
        }
    }

    static drawAll(ctx) {
        for (const obj of GameObject.instances) {
            obj.draw(ctx);
        }
    }
};
