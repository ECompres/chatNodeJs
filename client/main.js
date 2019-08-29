var socket = io.connect('http://10.0.0.9:8080', { 'forceNew': true })
socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    var divMensaje = document.getElementById("messages");
    var html = data.map((message, i) => {
        return (`
        <div class="message">
            <strong>${message.nickName}</strong> dice:
            <p>${message.text}</p>
        </div>
        `)
    }).join(' ');
    divMensaje.innerHTML = html;
    divMensaje.scrollTop = divMensaje.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickName: document.getElementById("nickName").value,
        text: document.getElementById("text").value,
    }
    document.getElementById("nickName").style.display = "none";
    socket.emit("add-message",message);
    return false;    
}