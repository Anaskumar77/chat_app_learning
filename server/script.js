const socket = io("http://localhost:3000");
socket.on("chat-message", (data) => {
  console.log("booom");
  console.log(data);
});
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const inputMessage = document.getElementById("input-message");

const appendMessage = (message) => {
  const singleMessageDiv = document.createElement("div");
  singleMessageDiv.innerText = message;
  messageContainer.append(singleMessageDiv);
};

const name = prompt("Type your name:");
appendMessage("you joined");
socket.emit("user-joined", name);

socket.on("chat-message", (data) => {
  appendMessage(data);
});
socket.on("user-connected", (data) => {
  appendMessage(`${data} joined the chat`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message = inputMessage.value;
  socket.emit("send-chat-message", message);
  inputMessage.value = "";
});
