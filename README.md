# 🇬🇭 Ghana Intelligence AI Hub
## CS4241 – Introduction to Artificial Intelligence | Final Project

**Name:** Maureen Amago  
**Index Number:** 10022200180  
**Institution:** Academic City University College (ACITY)

---

## 🚀 Project Overview
The **Ghana Intelligence AI Hub** is a professional-grade **Retrieval-Augmented Generation (RAG)** system designed to provide factual, grounded, and high-accuracy answers about the **2025 Ghana Budget Statement** and **Historical Election Records (1992-2020)**.

Unlike generic AI models that often hallucinate specific numbers, this system is strictly constrained to official national documents, ensuring transparency and reliability for policy analysts, journalists, and citizens.

### 🌟 Key Innovation: Section-Aware Boosting
Beyond standard vector search, this project implements **Domain-Specific Intelligence**. By detecting user intent (e.g., "Tax," "Revenue," "Spending"), the system applies a **1.5x Multiplier** to chunks retrieved from relevant budget sections, ensuring the most authoritative context is always selected.

---

## ✨ Features
- **Full RAG Pipeline:** Powered by **Groq Llama 3.3 (70B)** for near-instant, high-quality reasoning.
- **Custom-Built Retrieval:** No heavy external libraries—embedding, vector storage, and similarity scoring built from scratch using **NumPy**.
- **Adversarial Robustness:** Tested against misleading and ambiguous queries to ensure zero-hallucination performance.
- **Multi-Source Intelligence:** Harmonizes unstructured PDF data (Budget) with structured CSV data (Election Results).
- **Premium UI/UX:** A modern React dashboard with glassmorphism, Framer Motion animations, and real-time streaming responses.

---

## 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Tailwind CSS v3, Framer Motion, Lucide Icons |
| **Backend** | Python 3.11, Flask, Flask-CORS |
| **AI/LLM** | Groq API (Llama-3.3-70b-versatile) |
| **Data Engine** | Pandas, NumPy, PyPDF |
| **DevOps** | Vite, Dotenv, Anaconda |

---

## 📂 Project Structure
The project is organized into modular phases following the CS4241 curriculum:

- **Phase A: Data Engineering** — Cleaning, preprocessing, and chunking strategies.
- **Phase B: Custom Retrieval** — Implementation of TF-IDF vector store from scratch.
- **Phase C: Prompt Engineering** — Design of strict hallucination-control templates.
- **Phase D: RAG Pipeline** — The full end-to-end integration with the Groq LLM.
- **Phase E: Critical Evaluation** — Quantitative (Latency, Precision) and Qualitative analysis.
- **Phase G: Innovation** — Implementation of Section-Aware Boosting and intent detection.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Python 3.11+
- Node.js & npm (for frontend)
- A [Groq Cloud](https://console.groq.com/) API Key

### 2. Environment Configuration
Create a `.env` file in the root directory and add your API key:
```bash
GROQ_API_KEY=your_key_here
```

### 3. Backend Setup
```bash
# Install dependencies
pip install pandas numpy pypdf requests flask flask-cors
# Run the server
python app.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Author
- **Maureen Amago**
- **Student ID:** 10022200180
- *Submitted as the Final Examination Project for CS4241 - Introduction to Artificial Intelligence.*
