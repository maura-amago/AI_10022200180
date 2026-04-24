import { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, Brain, Database, Activity, Sparkles, ShieldCheck, Zap, BarChart3, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl ${className}`}>
    {children}
  </div>
)

const StepIndicator = ({ label, active, icon: Icon }) => (
  <div className={`flex items-center gap-4 transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-30 scale-100'}`}>
    <div className={`p-2 rounded-xl ${active ? 'bg-ghana-yellow text-black shadow-[0_0_20px_#FCD116]' : 'bg-white/10 text-white'}`}>
      <Icon size={16} />
    </div>
    <span className={`text-xs font-bold tracking-widest uppercase ${active ? 'text-ghana-yellow' : 'text-white'}`}>{label}</span>
  </div>
)

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const apiUrl = import.meta.env.PROD ? "https://ai-10022200180.onrender.com" : 'http://localhost:5000'
      const response = await axios.post(`${apiUrl}/ask`, { query })
      setData(response.data)
    } catch (err) {
      setError("RAG Engine Offline. Please start backend.py")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-yellow-400 selection:text-black font-sans">
      {/* Animated Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/20 blur-[150px] rounded-full animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[150px] rounded-full animate-pulse delay-700" />

      {/* Top Banner */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] flex">
        <div className="h-full w-1/3 bg-[#006B3F] shadow-[0_0_15px_#006B3F]" />
        <div className="h-full w-1/3 bg-[#FCD116] shadow-[0_0_15px_#FCD116]" />
        <div className="h-full w-1/3 bg-[#CE1126] shadow-[0_0_15px_#CE1126]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-ghana-green/10 text-ghana-green border border-ghana-green/20 rounded-full text-[10px] font-black uppercase tracking-widest">Election & Budget Edition</span>
              <span className="px-4 py-1 bg-white/5 text-white/50 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Maureen Amago v2.0</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none italic uppercase">
              GHANA <span className="text-[#FCD116]">INTELLIGENCE</span> <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B3F] via-[#FCD116] to-[#CE1126]">AI HUB</span>
            </h1>
          </motion.div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Database</p>
                <p className="text-xl font-black">50 PAGES</p>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div className="mt-6 md:mt-0 flex gap-3">
                <span className="flex items-center gap-2 px-4 py-1.5 bg-white/5 text-white/70 rounded-full text-xs font-bold border border-white/10">
                  <Activity size={14} /> Multi-Source Active
                </span>
                <span className="flex items-center gap-2 px-4 py-1.5 bg-white/5 text-white/70 rounded-full text-xs font-bold border border-white/10">
                  <Database size={14} /> PDF + CSV Indexed
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Interaction Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Input Console */}
            <GlassCard className="p-2 group focus-within:ring-2 ring-ghana-yellow/30 transition-all">
              <div className="relative flex items-center">
                <div className="absolute left-6 text-white/20 group-focus-within:text-ghana-yellow transition-colors">
                  <Search size={32} strokeWidth={3} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Analyze budgets, election results, or political trends..."
                  className="w-full pl-20 pr-48 py-8 bg-transparent outline-none text-2xl font-bold uppercase tracking-tight placeholder:text-white/10"
                />
                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="absolute right-4 px-10 py-5 bg-ghana-yellow text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? 'ANALYZING...' : <><Zap size={18} fill="currentColor"/> EXECUTE</>}
                </button>
              </div>
            </GlassCard>

            {/* Error Message */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-ghana-red/20 border border-ghana-red/50 p-4 rounded-2xl text-ghana-red font-bold text-center">
                {error}
              </motion.div>
            )}

            <AnimatePresence mode='wait'>
              {data && (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  className="space-y-10"
                >
                  {/* Generated Answer */}
                  <GlassCard className="p-12 relative overflow-hidden border-l-8 border-ghana-green shadow-ghana-green/10">
                    <div className="absolute top-0 right-0 p-8 text-white/5">
                      <Brain size={120} strokeWidth={1} />
                    </div>
                    <div className="flex items-center gap-2 text-ghana-green mb-6">
                      <Sparkles size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Synthesis Result</span>
                    </div>
                    <p className="text-3xl lg:text-4xl font-medium leading-[1.2] text-white/90">
                      "{data.answer}"
                    </p>
                  </GlassCard>

                  {/* Evidence Table */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 pl-4">
                      <ShieldCheck className="text-ghana-yellow" size={18} />
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Document Evidence (Grounded)</h3>
                    </div>
                    <div className="grid gap-6">
                      {data.chunks.map((chunk, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                        >
                          <GlassCard className="p-8 flex gap-8 items-start hover:bg-white/[0.07] transition-colors group">
                            <div className="flex-none w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-lg font-black text-white/20 group-hover:text-ghana-yellow transition-colors">
                              0{idx + 1}
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-ghana-yellow text-black text-[9px] font-black uppercase rounded-lg">
                                  {chunk.section}
                                </span>
                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                  Confidence: {(chunk.score * 100).toFixed(1)}%
                                </span>
                              </div>
                              <p className="text-lg text-white/60 leading-relaxed font-light italic">
                                {chunk.text}
                              </p>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Pipeline Status */}
            <GlassCard className="p-10 space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Internal Pipeline</h3>
              <div className="space-y-8">
                <StepIndicator label="Intent Recognition" active={!!data || loading} icon={Globe} />
                <StepIndicator label="Semantic Retrieval" active={!!data} icon={Database} />
                <StepIndicator label="Innovation Boosting" active={!!data} icon={Zap} />
                <StepIndicator label="Grounding Audit" active={!!data} icon={ShieldCheck} />
              </div>
            </GlassCard>

            {/* Dynamic Analytics */}
            {data && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="bg-[#FCD116] p-10 rounded-[2.5rem] text-black shadow-[0_20px_50px_rgba(252,209,22,0.2)]">
                  <BarChart3 className="mb-6" size={32} strokeWidth={3} />
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Target Sector</p>
                  <p className="text-4xl font-black uppercase tracking-tighter">{data.intent}</p>
                  <div className="mt-8 pt-8 border-t border-black/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap size={14} fill="black"/>
                      <span className="text-[10px] font-black uppercase">1.5x Boost Active</span>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-black/5 px-3 py-1 rounded-full">Validated</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Log */}
            <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5">
              <div className="flex items-center gap-3 text-white/20 mb-4">
                <Activity size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">System Monitor</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                Connected to local RAG node. TF-IDF vectorization synchronized. 2025 Budget PDF chunks active. Performance optimal.
              </p>
            </div>

          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
          Advanced AI Exam Project | ACITY 2026
        </p>
      </footer>
    </div>
  )
}

export default App
