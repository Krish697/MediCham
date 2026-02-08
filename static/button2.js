let currentSessionId = null;

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    
    if (!message) return;

    const chatBody = document.querySelector(".chat-body");

    // Append User message
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // AI Thinking state
    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-msg";
    aiMsg.textContent = "Medicham is thinking...";
    chatBody.appendChild(aiMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: message,
                session_id: currentSessionId
            })
        });

        if (!response.ok) throw new Error("Backend server error");

        const data = await response.json();
        aiMsg.textContent = data.reply;
        currentSessionId = data.session_id;

    } catch (error) {
        console.error("Error:", error);
        aiMsg.textContent = "Error: Could not reach the medical representative.";
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}

// Global listener for Enter key
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});