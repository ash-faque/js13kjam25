class Socket {
    constructor(url) {
        this.url = url;
        this.socket = new WebSocket(url);
    }

    onMessage(callback) {
        this.socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            callback(data);
        });
    }

    send(data) {
        this.socket.send(JSON.stringify(data));
    }

    close() {
        this.socket.close();
    }
}
