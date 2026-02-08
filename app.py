from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import uuid
import requests
import os

app = Flask(__name__)
CORS(app)

# 🔐 Langflow config
LANGFLOW_URL = "http://localhost:7860/api/v1/run/b6e77e04-cb8a-43e0-87ac-711035c0e123"
# Use the key you provided earlier
LANGFLOW_API_KEY = os.getenv("LANGFLOW_KEY", "sk-KHWD8bCb7A44sKDRPhbtKCMTjubNavhhKFYgd_YWnjM")

# --- 1. ROUTE TO SHOW YOUR WEBSITE ---
@app.route("/")
def home():
    return render_template("index2.html")

# --- 2. ROUTE FOR CHAT LOGIC ---
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    session_id = data.get("session_id") or str(uuid.uuid4())

    payload = {
        "input_value": message,
        "session_id": session_id,
        "output_type": "chat",
        "input_type": "chat"
    }

    headers = {
        "Content-Type": "application/json",
        "x-api-key": LANGFLOW_API_KEY
    }

    try:
        r = requests.post(LANGFLOW_URL, json=payload, headers=headers, timeout=60)
        r.raise_for_status()
        result = r.json()
        
        # Safe extraction of the reply
        try:
            reply = result["outputs"][0]["outputs"][0]["results"]["message"]["text"]
        except (KeyError, IndexError):
            reply = "I processed that, but couldn't find the text response."
            
    except Exception as e:
        print("Langflow error:", e)
        reply = "Medicham AI is currently unavailable."

    return jsonify({"reply": reply, "session_id": session_id})

if __name__ == "__main__":
    app.run(debug=True, port=8000)