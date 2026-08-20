import { getStore } from '@netlify/blobs';
import { validTeams, cleanTeams } from '../../valid-teams.mjs';

export const config = { path: '/api/scoreboard' };

const KEY = 'teams';

export default async (req) => {
  const store = getStore('scoreboard');

  if (req.method === 'GET') {
    const teams = (await store.get(KEY, { type: 'json' })) || [];
    return Response.json(teams, { headers: { 'cache-control': 'no-store' } });
  }

  if (req.method === 'POST') {
    const pw = process.env.ADMIN_PASSWORD;
    // No env var set => nobody gets in (never fall back to an empty password).
    if (!pw || req.headers.get('x-admin-password') !== pw) {
      return new Response('Unauthorised', { status: 401 });
    }
    let teams;
    try { teams = await req.json(); } catch { return new Response('Bad JSON', { status: 400 }); }
    if (!validTeams(teams)) return new Response('Bad teams', { status: 400 });
    await store.setJSON(KEY, cleanTeams(teams));
    return Response.json({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};
