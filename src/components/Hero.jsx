import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero({ onSearch }) {
  return (
    <section className="relative h-[72vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/40 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
          <Rocket className="h-3.5 w-3.5 text-purple-300" />
          <span>AI Research Copilot</span>
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          Ask. Explore. Verify.
        </h1>
        <p className="mt-3 max-w-2xl text-white/70">
          A sleek, Perplexity-style interface for fast answers with source links.
        </p>
      </div>
    </section>
  );
}
