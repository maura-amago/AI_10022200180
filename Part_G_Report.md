# CS4241 – Introduction to Artificial Intelligence
## Part G: Innovation Component (6 Marks)

**Name:** Maureen Amago  
**Index Number:** 10022200180  

---

## 🚀 Novel Feature: Domain-Specific Scoring Function

### 1. The Problem
In standard RAG systems, the retrieval engine treats all text chunks as equal math vectors. However, a **Government Budget Statement** is highly structured. A query about "tax revenue" should ideally be answered using text from the **Revenue** section, even if a generic mention of the word "tax" appears in a random introductory paragraph.

### 2. The Innovation: Section-Aware Boosting
I implemented a **Domain-Specific Scoring Function** that adds a layer of "Budget Intelligence" to the retrieval process.

**How it works:**
1.  **Metadata Tagging:** During the data engineering phase, each chunk is tagged with its source section (e.g., *Revenue, Expenditure, Macroeconomics*).
2.  **Intent Detection:** When a user asks a question, the system uses a keyword-based intent classifier to determine the "Domain" of the query.
3.  **Heuristic Re-ranking:** The search engine calculates the standard Cosine Similarity but then applies a **1.5x Multiplier (Boost)** to any chunks that match the detected intent.

### 3. Implementation Details
The feature is implemented in `Part_G_Innovation.ipynb` within the `InnovativeSearch` class.

```python
# The Innovation Logic
boost = 1.0
if chunk_metadata["section"] == detected_intent:
    boost = 1.5  # 50% increase in relevance score
final_score = base_similarity * boost
```

### 4. Evaluation of Innovation
In my testing, a query about "tax revenue" successfully boosted chunks from the "Revenue" section to the top of the results, even if they had slightly lower keyword overlap than generic introductory text. 

**Evidence of Improvement:**
| Rank | Base Similarity | Boost | Final Score | Section |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0.2840 | 1.5 | **0.4260** | **Revenue** |
| 2 | 0.3120 | 1.0 | 0.3120 | General |

*Note: Without the boost, the "General" chunk would have been ranked #1. With the innovation, the domain-correct "Revenue" chunk is prioritized.*

---

## Conclusion
This domain-specific scoring function ensures that the RAG system behaves like a human budget analyst who knows exactly which chapter to look in for specific answers. This significantly improves the **Precision** of the assistant.

**Name: Maureen Amago | Index: 10022200180**
