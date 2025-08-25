const KeyBinding = {
    LEFT: "A",
    UP: "W",
    RIGHT: "D",
    DOWN: "S",
    BOOST: "L",
    DEBUG: "X",
    FIRE: "F",
    RELOAD: "R",
    JUMP: "X"
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


const isBoostActive = () => {
    return keysPressed[KeyBinding.BOOST];
};

const printDebug = () => {
    return keysPressed[KeyBinding.DEBUG];
};

const isFiring = () => {
    return keysPressed[KeyBinding.FIRE];
};

const isJumping = () => {
    return keysPressed[KeyBinding.JUMP];
};


const isReloading = () => {
    return keysPressed[KeyBinding.RELOAD];
};