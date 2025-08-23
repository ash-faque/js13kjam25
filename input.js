const KeyBinding = {
    LEFT: "A",
    UP: "W",
    RIGHT: "D",
    DOWN: "S"
};

const keysPressed = {};

onkeydown = (event) => {
    keysPressed[event.key.toUpperCase()] = true;
};

onkeyup = (event) => {
    keysPressed[event.key.toUpperCase()] = false;
};

const getInputDirection = () => {
    let dir = new Vector(0, 0);
    if (keysPressed[KeyBinding.LEFT]) dir = dir.add(new Vector(-1, 0));
    if (keysPressed[KeyBinding.RIGHT]) dir = dir.add(new Vector(1, 0));
    if (keysPressed[KeyBinding.UP]) dir = dir.add(new Vector(0, -1));
    if (keysPressed[KeyBinding.DOWN]) dir = dir.add(new Vector(0, 1));
    return dir;
};
