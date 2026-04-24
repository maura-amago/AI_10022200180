# CS4241 – Introduction to Artificial Intelligence
## Part C: Prompt Engineering & Generation

**Name:** Maureen Amago  
**Index Number:** 10022200180  

---

## Overview

Part C focuses on the **Generation** component of the RAG (Retrieval-Augmented Generation) system. Once we have retrieved relevant chunks (from Part B), we must feed them to an LLM using a carefully designed **Prompt Template**. This ensures the AI provides accurate answers based *only* on the budget document and does not hallucinate (make up facts).

---

## 1. Prompt Design & Hallucination Control

I designed two prompt versions to test how the AI handles instructions.

### Version 1: Simple Prompt (Baseline)
- **Structure:** `Context` + `Question`.
- **Observation:** This prompt is risky. If the answer isn't in the context, the LLM might use its general training data to "helpfully" guess an answer, leading to a hallucination.

### Version 2: Strict Prompt (Improved)
- **Strategy:** I added explicit "STRICT RULES" and a persona ("Specialist for Ghana Budget").
- **Hallucination Control:** The prompt includes a specific fallback instruction: *"If the answer is not in the context, say 'I am sorry, but I do not have enough information to answer that based on the document.'"*
- **Effect:** This forces the model to verify facts against the provided chunks before speaking.

---

## 2. Context Window Management

LLMs have a limited "memory" (context window). We cannot feed the entire 100-page budget into a single prompt. I implemented a strategy to manage this:

- **Ranking Strategy:** I sort the retrieved chunks by their similarity score (from Part B) and select only the **Top-3** most relevant chunks.
- **Benefits:**
    - **Relevance:** The LLM sees only the most important information.
    - **Efficiency:** Reduces the number of tokens used, making the system faster and cheaper.
    - **Accuracy:** Prevents the LLM from getting confused by too much unrelated text ("lost in the middle" phenomenon).

---

## 3. Experimental Analysis

I conducted a simulation using a "trick" query to test the robustness of the prompt design.

**Test Query:** *"What is the specific budget for the space program in 2025?"*

| Prompt Version | AI Output (Simulated) | Analysis |
|---|---|---|
| **Simple Prompt** | *"Ghana's space program budget is likely under the Ministry of Science..."* | **Failure:** The AI hallucinated a plausible answer even though it's not in the document. |
| **Strict Prompt** | *"I am sorry, but I do not have enough information to answer that based on the document."* | **Success:** The AI correctly identified that the information is missing and refused to fabricate a number. |

---

## 4. Conclusion

The combination of **Ranking Context** (Top-3) and a **Strict Instruction Template** creates a reliable AI Assistant. 

| Requirement | Evidence of Improvement |
|---|---|
| Prompt Design | Moved from simple QA to a Rule-Based Persona. |
| Hallucination Control | Implemented explicit "Refusal" instructions for missing data. |
| Context Management | Implemented a Top-K ranking strategy to fit the context window. |

**The system is now ready for deployment.**

---

*Name: Maureen Amago | Index: 10022200180 | CS4241 – Introduction to Artificial Intelligence*
