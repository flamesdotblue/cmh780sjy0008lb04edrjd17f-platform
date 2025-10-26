export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
        <p>
          Built with Vite + React, Tailwind, and a Spline hero. This is a demo UI inspired by Perplexity.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://spline.design"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/80"
          >
            Spline
          </a>
          <span>·</span>
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/80"
          >
            Tailwind
          </a>
        </div>
      </div>
    </footer>
  );
}
