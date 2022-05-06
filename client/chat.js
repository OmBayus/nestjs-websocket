const socket = io("http://localhost", { transports : ['websocket'] });

const message = document.querySelector("#message");
const clients = document.querySelector("#clients");
const messages = document.querySelector("#messages");

const handleSubmit = () => {
  socket.emit("message", { data: message.value });
};


socket.on("message", (res)=>{
    handleNewMessage(res.data);
});

socket.on("connection", (data)=>{
    clients.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        handleClients(data[i])
    }
});

const handleNewMessage = (message)=>{
    messages.appendChild(buildMessage(message));
}

const handleClients = (message)=>{
    clients.appendChild(buildMessage(message));
}

const buildMessage = (message)=>{
    const li = document.createElement("li");
    li.innerText = message;
    return li;
}