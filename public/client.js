const socket = io();

// Give each user a default random username
let username = "User" + Math.floor(Math.random() * 1000);

document.getElementById("sendBtn").addEventListener("click", sendMsg);
document.getElementById("setUsernameBtn").addEventListener("click", setUsername);

function sendMsg() {
  const input = document.getElementById("msgBox");
  const msg = input.value.trim();

  if (msg !== "") {
    socket.emit("chatMessage", { user: username, msg });
    input.value = "";
  }
}

function setUsername() {
  const input = document.getElementById("usernameBox");
  if (input.value.trim() !== "") {
    username = input.value.trim();
    alert("✅ Username changed to: " + username);
    input.value = "";
  }
}

socket.on("chatMessage", (data) => {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("message");

  // Different color if it's your own message
  if (data.user === username) {
    div.style.background = "#ffe6cc";  // right side
    div.style.alignSelf = "flex-end";
  } else {
    div.style.background = "#d1e7ff";  // left side
    div.style.alignSelf = "flex-start";
  }

  div.textContent = `${data.user}: ${data.msg}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; // auto-scroll
});
