// frontend/src/api.js
// All calls to the backend /api/* endpoints

const BASE = "/api";

export async function fetchSchedule(day = "lun") {
  const res = await fetch(`${BASE}/schedule?day=${day}`);
  if (!res.ok) throw new Error(`Schedule error: ${res.status}`);
  return res.json(); // { day, shows: [...] }
}

export async function fetchActivities() {
  const res = await fetch(`${BASE}/activities`);
  if (!res.ok) throw new Error(`Activities error: ${res.status}`);
  return res.json(); // { total, activities: [...] }
}

export async function fetchSocial() {
  const res = await fetch(`${BASE}/social`);
  if (!res.ok) throw new Error(`Social error: ${res.status}`);
  return res.json(); // { socials: [...], recentPosts: [...] }
}

export async function fetchStream() {
  const res = await fetch(`${BASE}/stream`);
  if (!res.ok) throw new Error(`Stream error: ${res.status}`);
  return res.json(); // { isLive, streamEmbedUrl, nowPlaying }
}
