# Example Text Chunks from Part B

The notebook creates **500‑character chunks with a 50‑character overlap** from the budget PDF. Below are a few representative chunks (the actual content will be printed when you run the notebook):

```python
# After running the notebook you will see output like:
print(f'Total chunks: {len(chunks)}')
print(f'\nExample chunk:\n{chunks[0]}')
print(f'\nExample chunk (mid):\n{chunks[10]}')
print(f'\nExample chunk (last):\n{chunks[-1]}')
```

**Typical snippet (first chunk)**:
```
[First 500 characters of the PDF, e.g.]
"The Republic of Ghana ..." (truncated for brevity)
```

**Mid‑document chunk (index 10)**:
```
[500‑character window starting around page 5 of the PDF]
"Chapter 2 – Revenue Mobilisation …" (truncated)
```

**Last chunk**:
```
[Final 500 characters of the document]
"Appendix – Economic Outlook …" (truncated)
```

When you run the notebook, the `print` statements will display the exact text for you to examine.
