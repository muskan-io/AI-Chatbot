const sendButton = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Display user's message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = message;

    chatBox.appendChild(userDiv);

    // Clear input
    input.value = "";

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show temporary message
    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = "Thinking...";

    chatBox.appendChild(botDiv);

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        botDiv.textContent = data.reply;

    } catch (error) {

        botDiv.textContent = "Sorry, something went wrong.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}