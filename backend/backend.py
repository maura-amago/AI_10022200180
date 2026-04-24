# Name: Maureen Amago | Index: 10022200180
# Backend: Ultimate Conversational AI Hub (Groq RAG + Leadership Knowledge)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import re, math, os, requests
from collections import Counter
from pypdf import PdfReader

app = Flask(__name__)
# Robust CORS configuration
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def health_check():
    return jsonify({"status": "healthy", "message": "Ghana AI Backend is live!"})

# Load API Key from .env file
# Look in current dir or parent dir (root)
for env_path in ['.env', '../.env', 'backend/.env']:
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith('GROQ_API_KEY='):
                    os.environ['GROQ_API_KEY'] = line.split('=')[1].strip()
        break

# --- BUILT-IN GHANA KNOWLEDGE BASE ---
GHANA_KNOWLEDGE = {
    "ndc": "The National Democratic Congress (NDC) is a social-democratic political party in Ghana. It was founded by Jerry John Rawlings and is one of the two major parties in the country.",
    "npp": "The New Patriotic Party (NPP) is a center-right political party in Ghana. It is one of the two major parties, currently led by President Nana Akufo-Addo.",
    "nana addo": "Nana Addo Dankwa Akufo-Addo is the current President of the Republic of Ghana, representing the New Patriotic Party (NPP).",
    "mahama": "John Dramani Mahama is a Ghanaian politician who served as President of Ghana from 2012 to 2017. He is the leader of the NDC.",
    "bawumia": "Dr. Mahamudu Bawumia is the current Vice President of Ghana and a prominent economist.",
}

class UltimateRAG:
    def __init__(self):
        self.chunks = []
        self.meta = []
        self._manual_scan()
        self._vectorize()

    def _manual_scan(self):
        try:
            reader = PdfReader('data/2025-Budget-Statement-and-Economic-Policy_v4.pdf')
            for i in range(min(50, len(reader.pages))):
                p = reader.pages[i].extract_text()
                if not p: continue
                clean = re.sub(r'\s+', ' ', p).strip()
                for j in range(0, len(clean), 450):
                    c = clean[j:j+500]
                    self.chunks.append(c)
                    self.meta.append({"source": "2025 Budget", "domain": "Financial"})
        except: print("PDF Error")

        try:
            df = pd.read_csv('data/Ghana_Election_Result.csv')
            df.columns = [c.lower() for c in df.columns]
            for _, row in df.iterrows():
                text = f"Election Result: In the {row.get('year')} election, {row.get('candidate')} ({row.get('party')}) secured {int(row.get('votes', 0)):,} votes in {row.get('region')}."
                self.chunks.append(text)
                self.meta.append({"source": "Election Records", "domain": "Political"})
        except: print("CSV Error")

    def _vectorize(self):
        all_tok = re.findall(r'\b\w{2,}\b', " ".join(self.chunks).lower())
        self.vocab = {w: i for i, (w, _) in enumerate(Counter(all_tok).most_common(3000))}
        self.idf = {w: math.log(len(self.chunks)/(1+sum(1 for d in self.chunks if w in d.lower()))) for w in self.vocab}
        self.vecs = np.array([self._embed(d) for d in self.chunks])

    def _embed(self, text):
        v = np.zeros(len(self.vocab))
        toks = re.findall(r'\b\w{2,}\b', text.lower())
        for w, c in Counter(toks).items():
            if w in self.vocab: v[self.vocab[w]] = (c / len(toks)) * self.idf[w]
        return v

    def _call_llm(self, prompt):
        key = os.environ.get('GROQ_API_KEY')
        if not key: return "Error: API Key missing."
        try:
            url = "https://api.groq.com/openai/v1/chat/completions"
            headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
            data = {
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "system", "content": "You are a professional Ghana Budget & Election AI Assistant. Use the provided context to answer questions accurately and concisely."}, {"role": "user", "content": prompt}],
                "temperature": 0.2
            }
            r = requests.post(url, headers=headers, json=data, timeout=15)
            return r.json()['choices'][0]['message']['content'].strip()
        except Exception as e: return f"AI Engine error: {e}"

    def query(self, user_q):
        q_low = user_q.lower().strip()
        
        # 1. Knowledge Base Check
        for key, definition in GHANA_KNOWLEDGE.items():
            if key in q_low: return {"answer": f"💡 {definition}", "chunks": []}

        # 2. Retrieval with Boosting
        qv = self._embed(user_q)
        scores = []
        is_pol = any(w in q_low for w in ["party", "won", "election", "candidate", "vote"])
        
        for i, cv in enumerate(self.vecs):
            d = np.linalg.norm(qv) * np.linalg.norm(cv)
            sim = np.dot(qv, cv) / d if d > 0 else 0
            boost = 1.5 if is_pol and self.meta[i]["domain"] == "Political" else 1.0
            scores.append({'idx': i, 'score': sim * boost})
        
        res = sorted(scores, key=lambda x: x['score'], reverse=True)[:3]
        if res[0]['score'] < 0.05:
            return {"answer": "I'm sorry, I couldn't find specific data in my records for that question.", "chunks": []}

        # 3. LLM Answer Synthesis
        context = "\n---\n".join([self.chunks[r['idx']] for r in res])
        prompt = f"Using the context below, answer the question: {user_q}\n\nContext:\n{context}"
        answer = self._call_llm(prompt)

        return {
            "answer": answer,
            "chunks": [{"text": self.chunks[r['idx']], "score": round(r['score'], 4), "source": self.meta[r['idx']]["source"]} for r in res]
        }

engine = UltimateRAG()

@app.route('/ask', methods=['POST'])
def ask():
    return jsonify(engine.query(request.json.get('query', '')))

if __name__ == '__main__':
    app.run(port=5000, debug=True)
