import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import ChatPane from './components/ChatPane';
import Footer from './components/Footer';
import { generateAnswer } from './lib/answerEngine';

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I’m your research copilot. Ask me anything and I’ll synthesize answers with source links, similar to Perplexity.",
      sources: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const abortRef = useRef({ aborted: false });

  const handleSearch = useCallback(async (query) => {
    if (!query || loading) return;
    abortRef.current.aborted = false;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const { answer, sources, followUps: nextFollowUps } = await generateAnswer(query);

      // Add assistant placeholder message for streaming
      setMessages((prev) => [...prev, { role: 'assistant', content: '', sources }]);

      // Simulate streaming
      await streamText(answer, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          if (updated[lastIndex]?.role === 'assistant') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: (updated[lastIndex].content || '') + chunk,
            };
          }
          return updated;
        });
      }, abortRef);

      setFollowUps(nextFollowUps || []);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong generating the answer. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const streamText = useCallback(async (text, onChunk, abortRef) => {
    const chunkSize = 8;
    for (let i = 0; i < text.length; i += chunkSize) {
      if (abortRef.current.aborted) break;
      const chunk = text.slice(i, i + chunkSize);
      onChunk(chunk);
      // simulate network/compute delay
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 20));
    }
  }, []);

  const handleFollowUpClick = useCallback((q) => {
    handleSearch(q);
  }, [handleSearch]);

  const stopResponse = useCallback(() => {
    abortRef.current.aborted = true;
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Hero onSearch={handleSearch} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 -mt-24 relative z-10">
        <SearchBar onSubmit={handleSearch} loading={loading} onStop={stopResponse} />

        <ChatPane
          messages={messages}
          loading={loading}
          followUps={followUps}
          onFollowUpClick={handleFollowUpClick}
        />
      </main>

      <Footer />
    </div>
  );
}
