import { useEffect, useRef, useState } from 'react';
import { Mic, Send, Loader2, Square } from 'lucide-react';

export default function SearchBar({ onSubmit, loading, onStop }) {
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setQuery(transcript);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSubmit(q);
    setQuery('');
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full -mt-16">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur shadow-2xl">
        <div className="flex items-center gap-2 p-2">
          <button
            type="button"
            aria-label={listening ? 'Stop voice input' : 'Start voice input'}
            onClick={listening ? stopListening : startListening}
            className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${
              listening ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/40' : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything: e.g., Compare RAG vs fine-tuning"
            className="flex-1 bg-transparent outline-none placeholder:text-white/40 text-white px-2 py-3 text-base"
          />

          {!loading && (
            <button
              type="submit"
              className="shrink-0 inline-flex h-10 px-4 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-95"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
              Ask
            </button>
          )}

          {loading && (
            <button
              type="button"
              onClick={onStop}
              className="shrink-0 inline-flex h-10 px-4 items-center gap-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
              aria-label="Stop generating"
            >
              <Square className="h-4 w-4" />
              Stop
            </button>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 px-4 pb-3 text-white/60 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Generating answer...
          </div>
        )}
      </div>
    </form>
  );
}
