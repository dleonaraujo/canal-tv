// api/activities.js
// GET /api/activities          → all activities
// GET /api/activities?id=1     → single activity

const activities = [
  {
    id: 1,
    type: "Evento Destacado",
    title: "Gran Festival de Medios 2026",
    description:
      "El mayor encuentro de comunicación y medios del país. Tres días de charlas, talleres y networking con los mejores profesionales.",
    date: "2026-04-15",
    dateLabel: "15–17 Abril, 2026",
    location: "Centro de Convenciones, Lima",
    capacity: 2000,
    featured: true,
    emoji: "🎪",
    registrationUrl: "#",
  },
  {
    id: 2,
    type: "Taller",
    title: "Periodismo Digital en la Era de la IA",
    description:
      "Aprende las herramientas de inteligencia artificial que están transformando las redacciones modernas.",
    date: "2026-03-10",
    dateLabel: "10 Mar",
    location: "Auditorio Canal 7",
    capacity: 80,
    featured: false,
    emoji: "🎙️",
    registrationUrl: "#",
  },
  {
    id: 3,
    type: "Visita Guiada",
    title: "Conoce los Estudios de Canal 7",
    description:
      "Recorre nuestros sets de grabación, sala de control y conoce al equipo detrás de la pantalla.",
    date: "2026-03-15",
    dateLabel: "15 Mar",
    location: "Sede Central",
    capacity: 30,
    featured: false,
    emoji: "📡",
    registrationUrl: "#",
  },
  {
    id: 4,
    type: "Conferencia",
    title: "El Futuro de la Televisión",
    description:
      "Panel de expertos discute las tendencias del streaming, contenido bajo demanda y TV conectada.",
    date: "2026-03-22",
    dateLabel: "22 Mar",
    location: "Centro Cultural Lima",
    capacity: 300,
    featured: false,
    emoji: "🏫",
    registrationUrl: "#",
  },
  {
    id: 5,
    type: "Concurso",
    title: "Cortometraje Joven 2026",
    description:
      "Convocatoria abierta para creadores de contenido menores de 30 años. Premio: difusión en Canal 7.",
    date: "2026-04-03",
    dateLabel: "3 Abr",
    location: "Modalidad virtual",
    capacity: null,
    featured: false,
    emoji: "🎨",
    registrationUrl: "#",
  },
  {
    id: 6,
    type: "Networking",
    title: "Encuentro de Comunicadores",
    description:
      "Conecta con periodistas, productores y realizadores en un ambiente de intercambio profesional.",
    date: "2026-04-08",
    dateLabel: "8 Abr",
    location: "Rooftop Central",
    capacity: 150,
    featured: false,
    emoji: "🤝",
    registrationUrl: "#",
  },
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;

  if (id) {
    const activity = activities.find((a) => a.id === parseInt(id));
    if (!activity)
      return res.status(404).json({ error: `Activity ${id} not found` });
    return res.status(200).json(activity);
  }

  return res.status(200).json({ total: activities.length, activities });
}
