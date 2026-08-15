const sendButton = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});

function sendMessage(){

    const message = input.value.trim();

    if(message === ""){
        return;
    }

    const userDiv = document.createElement("div");

    userDiv.className = "user-message";

    userDiv.textContent = message;

    chatBox.appendChild(userDiv);

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;

}