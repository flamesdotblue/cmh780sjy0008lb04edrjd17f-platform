import { Link as LinkIcon, MessageSquare, Sparkles } from 'lucide-react';

function SourceChip({ href, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/10 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10"
    >
      <LinkIcon className="h-3.5 w-3.5 text-white/60" />
      <span className="truncate max-w-[14rem]">{title}</span>
    </a>
  );
}

export default function ChatPane({ messages, loading, followUps, onFollowUpClick }) {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="space-y-6">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`${
                m.role === 'user' ? 'bg-white/5 ring-white/10' : 'bg-white/3 ring-white/5'
              } rounded-2xl ring-1 p-4`}>
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-purple-500/20 text-purple-300'}`}>
                  {m.role === 'user' ? <MessageSquare className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.sources.map((s, i) => (
                        <SourceChip key={i} href={s.url} title={s.title} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 sticky top-6">
          <h3 className="text-sm font-medium text-white/80">Suggested follow-ups</h3>
          <div className="mt-3 grid gap-2">
            {followUps?.length ? (
              followUps.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onFollowUpClick(q)}
                  className="text-left rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  {q}
                </button>
              ))
            ) : (
              <div className="text-sm text-white/50">
                Try: "Summarize the latest AI research on small LLMs" or "Compare vector DBs for RAG".
              </div>
            )}
          </div>

          {loading && (
            <div className="mt-4 text-xs text-white/50">Fetching sources and synthesizing...</div>
          )}
        </div>
      </aside>
    </div>
  );
}
