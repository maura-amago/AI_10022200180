# CS4241 – Introduction to Artificial Intelligence
## Part A: Data Engineering & Preparation

**Name:** Maureen Amago  
**Index Number:** 10022200180  

---

## Overview

This report documents the data engineering and preparation process carried out as Part A of the AI project. The datasets used are:

1. **`Ghana_Election_Result.csv`** — Ghana presidential election results from 1992 to 2020, broken down by region, candidate, party, votes, and vote percentage.
2. **`2025-Budget-Statement-and-Economic-Policy_v4.pdf`** — Ghana's 2025 national budget statement document (multi-page PDF).

The PDF document is the primary source used for chunking and retrieval, as it is a long-form text document ideal for demonstrating RAG (Retrieval-Augmented Generation) pipeline concepts.

---

## 1. Data Cleaning

### 1a. CSV Cleaning (`Ghana_Election_Result.csv`)

The following steps were applied to clean the CSV file:

| Step | Action | Reason |
|---|---|---|
| 1 | Strip whitespace from column names and convert to lowercase | Ensures consistent column naming for easy access |
| 2 | Drop fully empty rows (`dropna(how='all')`) | Removes blank rows that add no value |
| 3 | Remove the `%` sign from the `Votes(%)` column and convert to `float` | Allows numerical analysis and sorting on vote percentages |
| 4 | Rename `votes(%)` to `vote_percentage` | Cleaner, more descriptive column name |

**Result:** The dataset was cleaned from raw format into a structured, analysis-ready DataFrame with consistent column types.

---

### 1b. PDF Cleaning (`2025-Budget-Statement-and-Economic-Policy_v4.pdf`)

The following steps were applied to clean the extracted PDF text:

| Step | Action | Reason |
|---|---|---|
| 1 | Extract text from the first 30 pages using `PdfReader` | The full document is very large; 30 pages gives enough content for demonstration |
| 2 | Replace all multiple whitespace characters (spaces, tabs, newlines) with a single space (`re.sub(r'\s+', ' ', text)`) | PDF extraction often produces messy spacing and line breaks |
| 3 | Remove non-ASCII/garbage characters (`re.sub(r'[^\x00-\x7F]+', ' ', text)`) | PDF files sometimes embed symbols or encoding artifacts that corrupt the text |
| 4 | Strip leading and trailing spaces | Final clean-up to produce a uniform string |

**Result:** The raw PDF text was converted into a single, clean string of text ready for chunking.

---

## 2. Chunking Strategy Design

### What is Chunking?

Chunking is the process of splitting a large body of text into smaller, manageable pieces called **chunks**. This is essential in AI systems because:

- AI models have a **maximum context window** (a limit on how much text they can process at once).
- Retrieving the **entire document** for every query is inefficient.
- Smaller, focused chunks allow the AI to return **precise, relevant answers**.

### Two Strategies Compared

| | **Strategy 1** *(Recommended)* | **Strategy 2** *(Baseline Comparison)* |
|---|---|---|
| **Chunk Size** | 500 characters | 2000 characters |
| **Overlap** | 50 characters | 0 characters |
| **Approximate size** | ~3–4 sentences per chunk | ~15–20 sentences per chunk |

---

### Justification for Strategy 1 (chunk_size=500, overlap=50)

**Why 500 characters?**
- 500 characters covers approximately **3 to 4 sentences** of typical paragraph text.
- This is large enough to contain a **complete, meaningful idea** but small enough that the retrieved result is **focused and not noisy**.
- Smaller chunks also mean the AI search engine has **more specific targets** to match a query against.

**Why 50 characters of overlap?**
- When text is split at exactly the 500-character mark, an important sentence may be split right in the middle.
- A 50-character overlap ensures the **end of one chunk and the beginning of the next share some common text**.
- This preserves the **flow of meaning** across chunk boundaries and prevents context loss.

---

## 3. Implementation

The chunking function implemented is:

```python
def chunk_text(text, chunk_size, overlap):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap  # slide forward with overlap
    return chunks
```

This is a simple **sliding window** approach:
- The window starts at position `0`.
- It captures `chunk_size` characters.
- It then slides forward by `chunk_size - overlap` characters (not the full chunk size), so the next window slightly revisits the end of the previous one.

---

## 4. Comparative Analysis – Chunking Impact on Retrieval Quality

### Test Setup
- **Query used:** `"economic growth and revenue"`
- **Retrieval method:** TF-IDF Vectorization + Cosine Similarity
- **Goal:** Find the most relevant chunk from the budget PDF for the query

### Results

| | **Strategy 1** | **Strategy 2** |
|---|---|---|
| **Best Chunk Index** | 15 | 16 |
| **Similarity Score** | **0.2274** | 0.1688 |
| **Retrieved Text** | Focused on economic revenue classification tables | Broad macroeconomic global context with mixed content |
| **Relevance** | ✅ Directly about revenue | ⚠️ Contains relevant terms but buried in unrelated content |

### Strategy 1 — Retrieved Chunk (Similarity: 0.2274)
> *"...Economic Classification of Central Gov't Revenue 2024 ... Appendix 3B: Economic Classification of Central Gov't Revenue 2025..."*

This result is **tightly focused** — it directly references government revenue classifications, which is exactly what the query asked about.

### Strategy 2 — Retrieved Chunk (Similarity: 0.1688)
> *"...the global economy remains on a steady path, though with significant variations across countries. Global GDP growth is predicted to reach 3.2 percent..."*

This result is **too broad** — it includes economic growth context but mixes in a lot of unrelated global economic commentary, reducing precision.

---

## 5. Conclusion

| Criterion | Strategy 1 ✅ | Strategy 2 ❌ |
|---|---|---|
| Similarity Score | **0.2274** (Higher) | 0.1688 (Lower) |
| Result Focus | High — short, specific text | Low — long, broad text |
| Context Preservation | Yes (overlap of 50 chars) | No (no overlap) |
| Suitable for AI RAG | ✅ Yes | ❌ Not ideal |

**Strategy 1** (chunk_size=500, overlap=50) is the **recommended and superior strategy** for this project because:

1. It produced a **higher similarity score (0.2274 vs 0.1688)**, meaning it retrieved more relevant content.
2. The chunks are **small and focused**, which is ideal for AI question-answering systems.
3. The **50-character overlap** ensures no sentence is broken across boundaries, preserving full meaning.
4. It produces more chunks, giving the retrieval system **more precise options** to search through.

---

*Name: Maureen Amago | Index: 10022200180 | CS4241 – Introduction to Artificial Intelligence*
