// api/schedule.js
// GET /api/schedule?day=lun
// Returns the TV schedule for a given day

const schedule = {
  lun: [
    { time: "06:00", name: "Buenos Días Perú",       genre: "Magazine",             color: "#1a4aff", tag: "live" },
    { time: "08:00", name: "Informe Económico",       genre: "Noticias · 30 min",   color: "#ff8c00", tag: ""     },
    { time: "09:00", name: "Ciencia & Tecnología",    genre: "Documental · 60 min", color: "#00b4d8", tag: "new"  },
    { time: "10:00", name: "Señal Educativa",         genre: "Educación · 90 min",  color: "#2ecc71", tag: ""     },
    { time: "12:00", name: "Noticiero Mediodía",      genre: "Noticias · En vivo",  color: "#E8001D", tag: "live" },
    { time: "13:00", name: "La Mesa Redonda",         genre: "Opinión · 60 min",    color: "#9b59b6", tag: ""     },
    { time: "14:00", name: "Telenovela: Amor Eterno", genre: "Drama · 60 min",      color: "#e91e63", tag: ""     },
    { time: "15:00", name: "Cine Nacional",           genre: "Película · 120 min",  color: "#ff5722", tag: ""     },
    { time: "17:00", name: "Deportes en Vivo",        genre: "Deporte · 60 min",    color: "#4caf50", tag: "live" },
    { time: "18:00", name: "Noticiero Tarde",         genre: "Noticias · 60 min",   color: "#E8001D", tag: "live" },
    { time: "19:00", name: "Entretenimiento Familiar",genre: "Variedad · 120 min",  color: "#ff9800", tag: ""     },
    { time: "21:00", name: "Noticiero Central",       genre: "Noticias · En vivo",  color: "#E8001D", tag: "live" },
    { time: "22:00", name: "Debate Político",         genre: "Opinión · 60 min",    color: "#607d8b", tag: ""     },
    { time: "23:00", name: "Cine de Medianoche",      genre: "Película · 120 min",  color: "#9c27b0", tag: ""     },
  ],
  mar: [
    { time: "06:00", name: "Buenos Días Perú",        genre: "Magazine",            color: "#1a4aff", tag: "live" },
    { time: "09:00", name: "Perú Profundo",            genre: "Documental · 60 min",color: "#8d6e63", tag: "new"  },
    { time: "12:00", name: "Noticiero Mediodía",       genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Telenovela: Amor Eterno",  genre: "Drama · 60 min",     color: "#e91e63", tag: ""     },
    { time: "18:00", name: "Noticiero Tarde",          genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "21:00", name: "Noticiero Central",        genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "22:30", name: "Noche de Comedia",         genre: "Entretenimiento · 90 min", color: "#ffc107", tag: "" },
  ],
  mie: [
    { time: "06:00", name: "Buenos Días Perú",        genre: "Magazine",            color: "#1a4aff", tag: "live" },
    { time: "10:00", name: "Gastronomía Peruana",      genre: "Documental · 60 min",color: "#ff7043", tag: "new"  },
    { time: "12:00", name: "Noticiero Mediodía",       genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Telenovela: Amor Eterno",  genre: "Drama · 60 min",     color: "#e91e63", tag: ""     },
    { time: "18:00", name: "Noticiero Tarde",          genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "21:00", name: "Noticiero Central",        genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "22:00", name: "La Voz del Pueblo",        genre: "Magazine · 60 min",  color: "#26c6da", tag: ""     },
  ],
  jue: [
    { time: "06:00", name: "Buenos Días Perú",        genre: "Magazine",            color: "#1a4aff", tag: "live" },
    { time: "11:00", name: "Historia del Perú",        genre: "Documental · 60 min",color: "#a1887f", tag: ""     },
    { time: "12:00", name: "Noticiero Mediodía",       genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Telenovela: Amor Eterno",  genre: "Drama · 60 min",     color: "#e91e63", tag: ""     },
    { time: "18:00", name: "Noticiero Tarde",          genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "21:00", name: "Noticiero Central",        genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "22:00", name: "Especial Investigativo",   genre: "Periodismo · 60 min",color: "#ef5350", tag: "new"  },
  ],
  vie: [
    { time: "06:00", name: "Buenos Días Perú",        genre: "Magazine",            color: "#1a4aff", tag: "live" },
    { time: "12:00", name: "Noticiero Mediodía",       genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Telenovela: Amor Eterno",  genre: "Drama · 60 min",     color: "#e91e63", tag: ""     },
    { time: "18:00", name: "Noticiero Tarde",          genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "20:00", name: "El Gran Viernes",          genre: "Entretenimiento · 60 min", color: "#ffa726", tag: "live" },
    { time: "21:00", name: "Noticiero Central",        genre: "Noticias · En vivo", color: "#E8001D", tag: "live" },
    { time: "22:00", name: "Cine del Viernes",         genre: "Película · 120 min", color: "#7e57c2", tag: ""     },
  ],
  sab: [
    { time: "08:00", name: "Sábado Kids",             genre: "Infantil · 120 min",  color: "#ffca28", tag: ""     },
    { time: "10:00", name: "Tu Salud Importa",         genre: "Salud · 60 min",     color: "#26a69a", tag: ""     },
    { time: "12:00", name: "Noticiero Fin de Semana",  genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Fútbol en Vivo",           genre: "Deporte · 120 min",  color: "#66bb6a", tag: "live" },
    { time: "16:00", name: "Cine Familiar",            genre: "Película · 120 min", color: "#42a5f5", tag: ""     },
    { time: "20:00", name: "Sábado de Gala",           genre: "Entretenimiento · 120 min", color: "#ec407a", tag: "new" },
    { time: "22:00", name: "Night Show",               genre: "Talk Show · 60 min", color: "#ab47bc", tag: ""     },
  ],
  dom: [
    { time: "08:00", name: "Misa Dominical",          genre: "Religión · 60 min",   color: "#fff176", tag: "live" },
    { time: "10:00", name: "Turismo & Aventura",       genre: "Viajes · 60 min",    color: "#80cbc4", tag: ""     },
    { time: "12:00", name: "Noticiero Domingo",        genre: "Noticias · 60 min",  color: "#E8001D", tag: "live" },
    { time: "14:00", name: "Cine Clásico",             genre: "Película · 120 min", color: "#bcaaa4", tag: ""     },
    { time: "17:00", name: "Magazine Dominical",       genre: "Variedad · 120 min", color: "#ff8a65", tag: ""     },
    { time: "21:00", name: "Debate Dominical",         genre: "Política · 60 min",  color: "#78909c", tag: ""     },
    { time: "22:00", name: "Cine de Arte",             genre: "Película · 90 min",  color: "#5c6bc0", tag: ""     },
  ],
};

export default function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const day = (req.query.day || "lun").toLowerCase();
  const data = schedule[day];

  if (!data)
    return res.status(404).json({ error: `Day '${day}' not found. Valid: lun mar mie jue vie sab dom` });

  return res.status(200).json({ day, shows: data });
}
