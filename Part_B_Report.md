# CS4241 – Introduction to Artificial Intelligence
## Part B: Custom Retrieval System

**Name:** Maureen Amago  
**Index Number:** 10022200180  

---

## Overview

Part B builds a complete **Custom Retrieval System** on top of the cleaned and chunked data from Part A. The system converts text into numerical vectors, stores them in a custom database, and retrieves the most relevant chunks for any user query. This is the core of a **RAG (Retrieval-Augmented Generation)** pipeline.

**Dataset used:** `2025-Budget-Statement-and-Economic-Policy_v4.pdf` — first 30 pages, chunked into 500-character pieces with 50-character overlap (Strategy 1 from Part A).

---

## 1. Embedding Pipeline (Custom TF-IDF from Scratch)

### What is an Embedding?
An embedding converts text into a list of numbers (a **vector**) that represents the meaning of the text. Chunks that discuss similar topics will have similar vectors.

### Method: Custom TF-IDF (Term Frequency – Inverse Document Frequency)

| Property | Detail |
|---|---|
| **Method** | TF-IDF — implemented from scratch using pure Python + NumPy |
| **Why TF-IDF?** | Works without any internet, API keys, or heavy libraries. Reliable and well-understood. |
| **Output** | A 3,000-dimensional vector for each text chunk |

### How TF-IDF Works:
- **TF (Term Frequency)**: How often does a word appear in *this specific chunk*? More = higher score.
- **IDF (Inverse Document Frequency)**: How rare is this word across *all* chunks? Rarer = more distinctive = higher score.
- **TF-IDF = TF × IDF**: A high score means the word is frequent in this chunk AND rare globally — very distinctive!

```
Chunk text: "The government will collect revenue through taxes..."
         ↓  [Tokenize & count words]
         ↓  [Apply TF × IDF formula]
         ↓
Vector: [0.0, 0.42, 0.0, 0.15, 0.31, ...] ← 3,000 numbers representing the chunk's meaning
```

---

## 2. Custom Vector Storage

Instead of using an external library, we built our own **`CustomVectorStore` class** in Python.

### How it Works:
1. All chunk vectors (computed by the TF-IDF embedder) are stored in a NumPy matrix.
2. When a query arrives, it is embedded using the **same** TF-IDF vectorizer.
3. **Cosine Similarity** is computed between the query vector and every stored chunk vector.
4. The chunks with the highest similarity are returned.

```
All 500-char chunks → TFIDFEmbedder → NumPy Matrix (stored in CustomVectorStore)
```

### Cosine Similarity Formula:
```
similarity = (A · B) / (||A|| × ||B||)
```
- **Result of 1.0** = identical meaning
- **Result of 0.0** = completely unrelated

---

## 3. Top-K Retrieval & Similarity Scoring

### How Retrieval Works:
1. User types a query.
2. Query is embedded using the TF-IDF embedder.
3. Cosine similarity is computed vs. every stored chunk vector.
4. Top `K` chunks with the **highest similarity score** are returned.

### Good Query Test Result:
| | Value |
|---|---|
| **Query** | `"tax revenue mobilisation 2025"` |
| **Similarity Score** | High (relevant result) |
| **Retrieved Content** | Budget text directly about Ghana's 2025 tax/revenue sections |

---

## 4. Extension: Query Expansion

### The Problem:
The Budget PDF uses formal language (`"expenditure"`, `"fiscal policy"`, `"revenue mobilisation"`). A user might ask informally: **`"money the government is spending"`** — this produces a very poor match because those informal words simply don't appear in the document.

### The Fix — Query Expansion:
Before sending the query to the vector store, the system detects informal words and **expands** the query by appending the formal budget-domain synonyms:

```
Original : "money the government is spending"
              ↓  [Query Expansion]
Expanded : "money the government is spending expenditure allocation fiscal disbursement revenue funds budget finance"
              ↓  [TF-IDF Embedding]
Vector Store → ✅ Now returns the correct government expenditure sections
```

### Synonym Mapping Used:
| Informal Term | Expanded With |
|---|---|
| `"spending"` | `expenditure allocation fiscal disbursement` |
| `"money"` | `revenue funds budget finance` |
| `"jobs"` | `employment labour workforce` |
| `"farming"` | `agriculture cocoa fisheries crops` |
| `"debt"` | `borrowing loan liability obligations` |

---

## 5. Failure Case Analysis & Fix — Actual Results

### The Failure Case:
- **Query:** `"money the government is spending"`
- **Similarity Score (no expansion):** **0.1304** — very low, almost no match

A score of 0.13 means the retrieved chunk had very little overlap with the query. The system returned text that was only loosely related to government finance, because the informal words "money" and "spending" don't appear in the formal budget document.

### After Applying Query Expansion:
- **Expanded Query:** `"money the government is spending expenditure allocation fiscal disbursement revenue funds budget finance"`
- **Similarity Score (with expansion):** **0.2823** — significantly higher

### Results Comparison Table (Actual Output):

| Method | Similarity Score | Result |
|---|---|---|
| Without Query Expansion (Failure) | 0.1304 | Poor — low score, irrelevant chunk |
| **With Query Expansion (Fix)** | **0.2823** | **Good — higher score, relevant chunk** |

**Improvement: 0.1304 → 0.2823 (2.16× better)**

The query expansion **more than doubled** the similarity score, successfully fixing the retrieval failure.

---

## 6. System Architecture Summary

```
[User Query]
      ↓
[Query Expansion] ← Detect informal words, append formal synonyms
      ↓
[TFIDFEmbedder.transform()] ← Convert expanded query to a 3000-dim vector
      ↓
[CustomVectorStore.search()] ← Cosine similarity vs. all stored chunk vectors
      ↓
[Top-K Results] ← Return most relevant text chunks + similarity scores
```

---

## 7. Conclusion

| Requirement | Implementation |
|---|---|
| **Embedding Pipeline** | Custom TF-IDF — implemented from scratch using Python + NumPy |
| **Vector Storage** | Custom `VectorStore` class — stores all chunk vectors in a NumPy matrix |
| **Top-K Retrieval** | Cosine similarity computed across all chunks; top-k returned by score |
| **Similarity Scoring** | Cosine similarity (0.0 = no match, 1.0 = perfect match) |
| **Extension** | **Query Expansion** — rule-based synonym injection before embedding |
| **Failure Case** | Informal query `"money the government is spending"` → score: `0.1304` (poor) |
| **Fix Applied** | Expanded with formal synonyms → score: `0.2823` (**2.16× improvement**) |

---

*Name: Maureen Amago | Index: 10022200180 | CS4241 – Introduction to Artificial Intelligence*
