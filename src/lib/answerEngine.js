function makeSources(query) {
  const q = encodeURIComponent(query);
  return [
    {
      title: 'Wikipedia – ' + query,
      url: `https://en.wikipedia.org/wiki/Special:Search?search=${q}`,
    },
    {
      title: 'ArXiv search',
      url: `https://arxiv.org/search/?query=${q}&searchtype=all`,
    },
    {
      title: 'Google Scholar',
      url: `https://scholar.google.com/scholar?q=${q}`,
    },
  ];
}

function makeFollowUps(query) {
  return [
    `Give a concise summary of ${query}`,
    `What are the pros and cons related to ${query}?`,
    `Provide sources and recent developments on ${query}`,
  ];
}

function synthesizeAnswer(query) {
  const intro = `Here is a concise synthesis about "${query}":`;
  const bullets = [
    'Overview: A high-level explanation with clear definitions and context.',
    'Key points: Summarize the most important ideas in bullet form.',
    'Trade-offs: Briefly compare alternatives and when to use each.',
    'Further reading: Explore reputable sources linked below.',
  ].map((b) => `• ${b}`).join('\n');

  const tip = '\n\nTip: Click any source to verify claims or dive deeper.';
  return `${intro}\n\n${bullets}${tip}`;
}

export async function generateAnswer(query) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 400));

  const answer = synthesizeAnswer(query);
  const sources = makeSources(query);
  const followUps = makeFollowUps(query);

  return { answer, sources, followUps };
}
