MediCham v2: Digital Medical Orchestrator
MediCham v2 is an advanced AI-powered clinical decision support system designed to assist healthcare professionals (HCPs) in synthesizing drug monographs and calculating renal dosage adjustments. Built as a sophisticated Langflow workflow, it utilizes Retrieval-Augmented Generation (RAG) to ensure evidence-based recommendations derived from verified pharmaceutical datasets.

🚀 Key Features
Clinical Triage System: Automatically classifies user queries into categories—CLINICAL, HELLO, or OUT_OF_SCOPE—to maintain professional focus.

Precision Dosage Synthesis: Provides tailored dosing recommendations based on patient age, gender, and weight.

Renal Adjustment Engine: Specialized logic for overriding standard doses based on renal status (Mild, Moderate, Severe, or eGFR).

Automatic Dosage Calculator: A custom math tool that computes precise pediatric dosages (mg/kg) based on patient weight.

Clinical Auditor: A self-check mechanism that compares the AI's proposed recommendation against official documents to verify alignment and clinical safety.

Memory Integration: Recognizes and remembers healthcare providers (e.g., "Dr. Smith") to provide a personalized, professional experience.

🛠️ Technical Stack
Workflow Engine: Langflow / LFX.

Large Language Models: Powered by Groq (specifically Llama-3.3-70B) for high-speed clinical synthesis.

Vector Database: ChromaDB for storing and retrieving pharmaceutical monographs.

Embeddings: NVIDIA Embeddings (nv-embedqa-e5-v5) for high-precision semantic search.

Data Ingestion: Processes clinical data from sources like Drugs4.csv and Renal_dose datasets.

⚙️ How It Works
Mandatory Clinical Gate: The system analyzes the query for four critical variables: Age Group, Gender, Renal Status, and Weight (for children).

Safety Stop: If any required information is missing, the orchestrator stops the dosage recommendation and asks for the missing data to ensure clinical safety.

Contextual Retrieval: Searches the MediCham_CDB_v1 vector store for relevant drug indications and renal override protocols.

Verification: The Auditor Prompt validates the final answer against the "Source of Truth" context and provides a verdict (✅ Excellent, ⚠️ Partial, or ⛔ Significant Misalignment).

📋 Usage Note
Note: This tool is intended to assist medical professionals. All generated results must be verified against the official product monograph or clinical guidelines before application in a clinical setting.

🔧 Installation
To run this project:

Import the MediCham_v2 final pro.json file into your Langflow environment.

Configure your API keys for Groq, NVIDIA, and ChromaDB.

Ingest your drug monographs and renal dose CSV files into the ChromaDB collection langflow.
