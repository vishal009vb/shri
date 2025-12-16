
const MOCK_NOTES = `
• Operating System manages computer hardware and software.
• It handles process, memory, and file management.
• Examples include Windows, Linux, and macOS.
`;

import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, GraduationCap, Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { generateStudyNotes } from './services/gemini';
import MarkdownRenderer from './components/MarkdownRenderer';
import LoadingState from './components/LoadingState';
import { NoteTone } from './types';

const PRESET_TOPIC = "Operating System";

const App: React.FC = () => {
  const [topic, setTopic] = useState(PRESET_TOPIC);
  const [tone, setTone] = useState<NoteTone>(NoteTone.SIMPLE);
  const [notes, setNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate =  (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setNotes(null);

    try {
      const result =  generateStudyNotes(topic, tone);
      setNotes(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial generation on load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = () => {
    if (notes) {
      navigator.clipboard.writeText(notes);
      alert("Notes copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">QuickStudy AI</h1>
          </div>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors">
            About
          </a>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar / Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-500" />
              Generator Settings
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">
                  Study Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="e.g. Photosynthesis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teaching Style
                </label>
                <div className="space-y-2">
                  {Object.values(NoteTone).map((t) => (
                    <label key={t} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${tone === t ? 'border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500' : 'border-gray-200 hover:bg-gray-50 text-slate-600'}`}>
                      <input
                        type="radio"
                        name="tone"
                        value={t}
                        checked={tone === t}
                        onChange={() => setTone(t)}
                        className="w-4 h-4 text-brand-600 border-gray-300 focus:ring-brand-500 mr-3"
                      />
                      <span className="text-sm font-medium">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !topic}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-brand-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
                {isLoading ? 'Generating...' : 'Create Notes'}
              </button>
            </form>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-2">Pro Tip</h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Try being specific! Instead of just "History", try "Causes of World War I" for better results.
            </p>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col relative overflow-hidden">
            {/* Paper Header */}
            <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               {notes && !isLoading && (
                 <button 
                  onClick={copyToClipboard}
                  className="text-slate-400 hover:text-brand-600 transition-colors p-2 rounded-full hover:bg-brand-50"
                  title="Copy to clipboard"
                 >
                   <Copy className="w-5 h-5" />
                 </button>
               )}
            </div>

            {/* Content Area */}
            <div className="flex-grow p-8 sm:p-10 relative">
               {isLoading ? (
                 <LoadingState />
               ) : error ? (
                 <div className="flex flex-col items-center justify-center h-full text-center p-8">
                   <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                   <h3 className="text-lg font-semibold text-slate-800 mb-2">Oops, something went wrong</h3>
                   <p className="text-slate-600 max-w-md">{error}</p>
                   <button onClick={() => handleGenerate()} className="mt-6 text-brand-600 font-medium hover:underline">Try Again</button>
                 </div>
               ) : notes ? (
                 <MarkdownRenderer content={notes} />
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-slate-400">
                   <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                   <p>Enter a topic to start studying</p>
                 </div>
               )}
            </div>
            
            {/* Visual Paper Lines Effect (Optional subtle background) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem', marginTop: '3.5rem' }}>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;