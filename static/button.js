// Variable to store the session ID so Medicham remembers the conversation context
let currentSessionId = null;

/**
 * Opens the chat modal by changing its display style to flex.
 */
function openChat() {
    const modal = document.getElementById("chatModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

/**
 * Closes the chat modal by hiding it.
 */
function closeChat() {
    const modal = document.getElementById("chatModal");
    if (modal) {
        modal.style.display = "none";
    }
}

/**
 * Handles the logic for sending a message to the Flask backend.
 */
async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    
    // Do nothing if the input is empty
    if (!message) return;

    const chatBody = document.querySelector(".chat-body");

    // 1. Create and append the User message bubble
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);

    // Clear input field and scroll to bottom
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Create a temporary "Thinking" bubble for the AI
    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-msg";
    aiMsg.textContent = "Medicham is thinking...";
    chatBody.appendChild(aiMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        // 3. Send the POST request to your Flask /chat route
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                session_id: currentSessionId
            })
        });

        if (!response.ok) throw new Error("Backend server error");

        const data = await response.json();

        // 4. Update the "Thinking" bubble with the actual reply from Langflow
        aiMsg.textContent = data.reply;
        
        // Save the session ID returned by the backend for the next message
        currentSessionId = data.session_id;

    } catch (error) {
        console.error("Error:", error);
        aiMsg.textContent = "Error: Could not reach the medical representative.";
    }

    // Ensure the chat scrolls to the newest message
    chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Listens for the "Enter" key so users can send messages without clicking the button.
 */
document.addEventListener("keydown", function (e) {
    // Check if the chat modal is open before allowing Enter to send
    const modal = document.getElementById("chatModal");
    if (e.key === "Enter" && modal && modal.style.display === "flex") {
        sendMessage();
    }
});