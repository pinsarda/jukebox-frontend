export const socket = new WebSocket("ws://localhost:8080/player/socket")

// Connection opened
socket.addEventListener("open", event => {
    console.log("Connection to player websocket established")
});