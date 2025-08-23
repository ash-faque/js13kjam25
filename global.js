class Global {
    player = null;
    socket = null;

    static init() {

        player = new Player(100, 100);
        socket = new Socket("ws://localhost:8080");


        this.input_direction = new Vector(0, 0);
        this.keys_pressed = {};
    }
}
