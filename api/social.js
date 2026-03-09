// api/social.js
// GET /api/social  → returns social media channel info & stats

const socials = [
  {
    id: "facebook",
    name: "Facebook",
    handle: "@Canal7Oficial",
    url: "https://facebook.com",
    emoji: "📘",
    color: "#1877f2",
    followers: 284000,
    followersLabel: "284K",
    metric: "seguidores",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@canal7tv",
    url: "https://instagram.com",
    emoji: "📸",
    color: "#e1306c",
    followers: 198000,
    followersLabel: "198K",
    metric: "seguidores",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "Canal 7 Oficial",
    url: "https://youtube.com",
    emoji: "▶️",
    color: "#ff0000",
    followers: 512000,
    followersLabel: "512K",
    metric: "suscriptores",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    handle: "@Canal7TV",
    url: "https://twitter.com",
    emoji: "🐦",
    color: "#1da1f2",
    followers: 127000,
    followersLabel: "127K",
    metric: "seguidores",
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@canal7oficial",
    url: "https://tiktok.com",
    emoji: "🎵",
    color: "#69c9d0",
    followers: 89000,
    followersLabel: "89K",
    metric: "seguidores",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "Canal de Difusión",
    url: "https://wa.me",
    emoji: "💬",
    color: "#25d366",
    followers: 45000,
    followersLabel: "45K",
    metric: "suscriptores",
  },
];

const recentPosts = [
  { id: 1, platform: "instagram", emoji: "📺", caption: "Especial de noticias esta noche a las 9PM. No te lo pierdas 🔴" },
  { id: 2, platform: "twitter",   emoji: "🎤", caption: "Entrevista exclusiva con el Ministro de Economía esta tarde." },
  { id: 3, platform: "facebook",  emoji: "🏆", caption: "Resumen deportivo: resultados del fin de semana y análisis." },
  { id: 4, platform: "youtube",   emoji: "🌎", caption: "Corresponsales en Lima, Arequipa y Cusco en vivo." },
  { id: 5, platform: "tiktok",    emoji: "🎬", caption: "Nueva temporada de nuestra serie documental empieza el viernes." },
  { id: 6, platform: "instagram", emoji: "📱", caption: "¡Síguenos en TikTok para contenido exclusivo detrás de cámaras!" },
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  return res.status(200).json({ socials, recentPosts });
}
