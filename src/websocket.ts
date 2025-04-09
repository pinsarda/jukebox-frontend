export const socket = new WebSocket("/api/player/socket");

// Connection opened
socket.addEventListener("open", (event) => {
  console.log("Connection to player websocket established");
});
