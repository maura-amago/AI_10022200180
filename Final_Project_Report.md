# CS4241 – Introduction to Artificial Intelligence
## Final Project Report: AI Ghana Intelligence Hub

**Name:** Maureen Amago  
**Index Number:** 10022200180  
**Project Objective:** To build a professional-grade Retrieval-Augmented Generation (RAG) system for the 2025 Ghana Budget and National Election Records.

---

## 1. Executive Summary
The **Ghana Intelligence AI Hub** is a multi-source AI assistant designed to provide factual, grounded, and conversational answers about Ghana’s national policies and political history. Unlike standard AI models that hallucinate, this system is strictly grounded in the **2025 Budget Statement** and **Historical Election Results (CSV)**.

## 2. Technical Architecture
The system follows a modern **Full-Stack AI Architecture**:
*   **Frontend:** Built with **React 18** and **Tailwind CSS (v3)**. It uses a glassmorphism dashboard design with **Framer Motion** for premium animations.
*   **Backend:** A **Flask (Python) API** that serves as the "Brain." It handles data processing, vector search, and conversational logic.
*   **Pipeline:** RAG (Retrieval-Augmented Generation) — User Query → Vector Search → Context Filtering → Smart Answer Synthesis.

## 3. Data Engineering (Part A & B)
### Data Sources:
1.  **2025 Budget PDF:** Extracted using `PyPDF`. Cleaned to remove parliamentary speech artifacts (e.g., stripping "Mr. Speaker").
2.  **Election Result CSV:** Parsed using `Pandas`. Converted from raw rows into natural language "Fact Chunks" (e.g., *"In 2020, Nana Addo secured X votes..."*).

### Processing Logic:
*   **Sliding Window Chunking:** Documents are broken into 500-character chunks with a 50-character overlap to ensure no context is lost.
*   **Noise Filtering:** Automated removal of Table of Contents, page numbers, and "garbage" text (high density of dots or single characters).

## 4. The Retrieval Engine (Part B & C)
I built a custom **TF-IDF (Term Frequency-Inverse Document Frequency)** Vector Store from scratch using `NumPy`.
*   **Vectorization:** Every chunk is converted into a high-dimensional math vector.
*   **Similarity:** The system uses **Cosine Similarity** to find the closest match between a user's question and the indexed data.

## 5. Innovations & Advanced Features (Part G)
To move beyond a basic search engine, I implemented several "Solid AI" features:
*   **Domain-Specific Boosting:** When the AI detects a political query (keywords like "Party," "Won," "Votes"), it applies a **100x Multiplier** to the Election data, ensuring political questions aren't answered with financial data.
*   **Year-Locking Logic:** If a user asks about **2024**, the system penalizes any chunks from other years (like 2025) by 90%, forcing the engine to find the exact temporal match.
*   **Leadership Knowledge Base:** A hardcoded "Who's Who" database allows the AI to define key figures like **Nana Akufo-Addo**, **John Mahama**, and **Dr. Bawumia** instantly, providing biographical context alongside data.
*   **Conversational Layer:** The AI handles greetings ("Hello," "Hi") and identity questions ("Who are you?") gracefully, behaving like a true digital assistant.

## 6. Critical Evaluation (Part E)
*   **Grounding:** Every answer includes a **Source Tag** (e.g., `🔍 [Source: Election Records]`).
*   **Transparency:** If data is missing or from a different year, the AI provides a **Context Warning** (e.g., *"Note: My records only cover 2020 results"*).
*   **Reliability:** By removing speech artifacts like "Mr. Speaker," the AI provides human-readable, professional summaries instead of raw quotes.

## 7. Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Python, Flask, Flask-CORS |
| **Data** | Pandas, NumPy, PyPDF |
| **Environment** | Vite, Anaconda (Conda) |

---

## 8. Conclusion
The **Ghana Intelligence AI Hub** demonstrates a sophisticated integration of data engineering and domain-specific AI logic. It moves beyond simple keyword matching to provide a "Solid" intelligence experience that understands the nuances of Ghana’s political and economic landscape.

**Name: Maureen Amago | Index: 10022200180**
