// api/stream.js
// GET /api/stream  → returns current live stream info and now-playing

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

 
  const streamEmbedUrl = process.env.STREAM_EMBED_URL || "";

  // Current hour-based "now playing" (static demo)
  const hour = new Date().getHours();
  let nowPlaying = { title: "Señal del Canal", genre: "Transmisión continua" };
  if (hour >= 6  && hour < 8)  nowPlaying = { title: "Buenos Días Perú",       genre: "Magazine matutino"   };
  if (hour >= 12 && hour < 13) nowPlaying = { title: "Noticiero Mediodía",     genre: "Noticias en vivo"    };
  if (hour >= 18 && hour < 19) nowPlaying = { title: "Noticiero Tarde",        genre: "Noticias en vivo"    };
  if (hour >= 21 && hour < 22) nowPlaying = { title: "Noticiero Central",      genre: "Noticias en vivo"    };
  if (hour >= 22 && hour < 23) nowPlaying = { title: "Debate Político",        genre: "Opinión"             };
  if (hour >= 23 || hour < 4)  nowPlaying = { title: "Cine de Medianoche",     genre: "Película"            };

  return res.status(200).json({
    isLive: Boolean(streamEmbedUrl),
    streamEmbedUrl,
    nowPlaying,
  });
}
