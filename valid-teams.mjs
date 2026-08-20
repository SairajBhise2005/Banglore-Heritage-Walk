// Shared by the function and test-scoreboard.mjs. Kept out of netlify/functions
// so Netlify doesn't try to deploy it as a function of its own.
export const validTeams = (t) =>
  Array.isArray(t) && t.length <= 100 &&
  t.every(x => x && typeof x.name === 'string' && x.name.trim().length > 0 &&
               x.name.length <= 60 && Number.isFinite(x.score));

export const cleanTeams = (t) =>
  t.map(x => ({ name: x.name.trim().slice(0, 60), score: Math.trunc(x.score) }));
