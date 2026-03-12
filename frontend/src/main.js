// frontend/src/main.js
import { fetchSchedule, fetchActivities, fetchSocial, fetchStream } from "./api.js";

// ─── ROUTER ──────────────────────────────────────────────────────────────────
const SECTIONS = ["reproduccion", "programacion", "redes", "actividades"];

function showSection(id) {
  SECTIONS.forEach((s) => {
    document.getElementById(s).classList.toggle("visible", s === id);
  });
  document.querySelectorAll(".nav-link").forEach((b) => {
    b.classList.toggle("active", b.dataset.section === id);
  });
  // lazy-load section data
  if (id === "programacion" && !window._scheduleLoaded) loadSchedule("lun");
  if (id === "redes"        && !window._socialLoaded)   loadSocial();
  if (id === "actividades"  && !window._activitiesLoaded) loadActivities();
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function renderTopbar() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="logo" data-section="reproduccion">
          BOOM <span style="color:var(--red)">TV</span>
          <span class="logo-badge">VIVO</span>
        </div>
        <nav class="nav">
          <button class="nav-link" data-section="programacion">
            <span class="nav-dot"></span><span>Programación</span>
          </button>
          <button class="nav-link" data-section="redes">
            <span class="nav-dot"></span><span>Redes Sociales</span>
          </button>
          <button class="nav-link" data-section="actividades">
            <span class="nav-dot"></span><span>Actividades</span>
          </button>
          <button class="nav-live-btn" data-section="reproduccion">
            <span class="live-dot"></span> En Vivo
          </button>
        </nav>
      </div>
    </header>`;
}

// ─── SECTION: REPRODUCCIÓN ───────────────────────────────────────────────────
function renderStreamSection() {
  return `
    <section class="section visible" id="reproduccion">
      <div class="container">
        <div class="player-wrap">
          <div class="player-main">
            <div class="player-frame">
              <div class="player-placeholder" id="player-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                <button class="live-badge" id="btn-start-stream">
                  <span class="live-dot"></span> CARGANDO STREAM…
                </button>
                <p style="color:var(--muted);font-size:13px;text-align:center;max-width:300px">
                  Conectando con el servidor…
                </p>
              </div>
              <iframe id="live-iframe" style="display:none"
                allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
            <div class="player-info">
              <div class="now-label" id="now-label">● Cargando…</div>
              <div class="now-title" id="now-title">—</div>
              <div class="now-desc" id="now-desc"></div>
            </div>
          </div>
          <aside class="upcoming-box">
            <div class="upcoming-header">Próximamente</div>
            <div id="upcoming-list">
              ${[
                ["21:00","Noticiero Central","Noticias · En vivo",true],
                ["22:00","Debate Político","Opinión · 60 min",false],
                ["23:00","Cine de Medianoche","Película · 120 min",false],
                ["01:00","Madrugada Musical","Entretenimiento · 180 min",false],
                ["04:00","Buenos Días Perú","Magazine · Mañana",false],
                ["07:00","Informe Económico","Noticias · 30 min",false],
              ].map(([t,n,g,now]) => `
                <div class="upcoming-item${now?" now-playing":""}">
                  <div class="ui-time">${t}</div>
                  <div><div class="ui-title">${n}</div><div class="ui-genre">${g}</div></div>
                </div>`).join("")}
            </div>
          </aside>
        </div>
      </div>
    </section>`;
}

async function loadStream() {
  try {
    const data = await fetchStream();
    const title = document.getElementById("now-title");
    const desc  = document.getElementById("now-desc");
    const label = document.getElementById("now-label");
    const btn   = document.getElementById("btn-start-stream");

    if (label) label.textContent = "● Ahora en pantalla";
    if (title) title.textContent = data.nowPlaying?.title || "Señal del Canal";
    if (desc)  desc.textContent  = data.nowPlaying?.genre || "";

    if (btn) {
      btn.innerHTML = `<span class="live-dot"></span> VER EN VIVO`;
      btn.onclick = () => startHLS(data.streamEmbedUrl);
    }
  } catch (e) {
    console.warn("Stream error:", e);
  }
}

function startHLS(url) {
  if (!url) {
    alert("Configura STREAM_EMBED_URL en las variables de entorno.");
    return;
  }

  const placeholder = document.getElementById("player-placeholder");
  const frame       = placeholder.parentElement;

  // Crear elemento <video> con HLS.js
  const video = document.createElement("video");
  video.style.cssText = "position:absolute;inset:0;width:100%;height:100%;background:#000";
  video.controls = true;
  video.autoplay = true;

  frame.appendChild(video);
  placeholder.style.display = "none";

  // Cargar HLS.js dinámicamente
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.12/hls.min.js";
  script.onload = () => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari soporta HLS nativo
      video.src = url;
    } else {
      alert("Tu navegador no soporta HLS.");
    }
  };
  document.head.appendChild(script);
}
```

---

Luego en **Vercel → Settings → Environment Variables** agrega:
```
STREAM_EMBED_URL = https://TU_URL/stream.m3u8

// ─── SECTION: PROGRAMACIÓN ───────────────────────────────────────────────────
const DAYS = [
  { key: "lun", label: "Lun 3" },
  { key: "mar", label: "Mar 4" },
  { key: "mie", label: "Mié 5" },
  { key: "jue", label: "Jue 6" },
  { key: "vie", label: "Vie 7" },
  { key: "sab", label: "Sáb 8" },
  { key: "dom", label: "Dom 9" },
];

function renderScheduleSection() {
  return `
    <section class="section" id="programacion">
      <div class="container">
        <div class="section-heading">GRILLA DE<br><span class="red">PROGRAMACIÓN</span></div>
        <div class="section-sub">Semana del 3 al 9 de marzo, 2026</div>
        <div class="days-row">
          ${DAYS.map((d, i) => `
            <button class="day-btn${i===0?" active":""}" data-day="${d.key}">${d.label}</button>
          `).join("")}
        </div>
        <div id="schedule-grid"><div class="spinner"></div></div>
      </div>
    </section>`;
}

const tagMap = {
  live: `<span class="tag tag-live">En Vivo</span>`,
  new:  `<span class="tag tag-new">Nuevo</span>`,
  re:   `<span class="tag tag-re">Repetición</span>`,
};

async function loadSchedule(day) {
  const grid = document.getElementById("schedule-grid");
  if (!grid) return;
  grid.innerHTML = `<div class="spinner"></div>`;

  try {
    const data = await fetchSchedule(day);
    window._scheduleLoaded = true;
    grid.innerHTML = data.shows.map((s) => `
      <div class="schedule-row">
        <div class="sch-time">${s.time}</div>
        <div class="sch-content">
          <div class="sch-show">
            <div class="sch-color" style="background:${s.color}"></div>
            <div class="sch-info">
              <div class="sch-name">${s.name}${s.tag ? tagMap[s.tag] || "" : ""}</div>
              <div class="sch-meta">${s.genre}</div>
            </div>
          </div>
        </div>
      </div>`).join("");
  } catch (e) {
    grid.innerHTML = `<div class="error-banner">Error cargando programación: ${e.message}</div>`;
  }
}

// ─── SECTION: REDES SOCIALES ─────────────────────────────────────────────────
function renderSocialSection() {
  return `
    <section class="section" id="redes">
      <div class="container">
        <div class="section-heading">REDES<br><span class="red">SOCIALES</span></div>
        <div class="section-sub">Síguenos y sé parte de la comunidad</div>
        <div id="social-cards"><div class="spinner"></div></div>
        <div class="feed-section-title" style="margin-top:48px">ÚLTIMAS PUBLICACIONES</div>
        <div id="feed-grid"><div class="spinner"></div></div>
      </div>
    </section>`;
}

async function loadSocial() {
  const cardsEl = document.getElementById("social-cards");
  const feedEl  = document.getElementById("feed-grid");
  if (!cardsEl) return;

  try {
    const data = await fetchSocial();
    window._socialLoaded = true;

    cardsEl.className = "social-grid";
    cardsEl.innerHTML = data.socials.map((s) => `
      <a class="social-card" href="${s.url}" target="_blank" style="border-top:3px solid ${s.color}">
        <div class="social-icon" style="background:${s.color}22;color:${s.color}">${s.emoji}</div>
        <div class="social-name">${s.name}</div>
        <div class="social-handle">${s.handle}</div>
        <div class="social-stat">${s.followersLabel}</div>
        <div class="social-stat-label">${s.metric}</div>
      </a>`).join("");

    if (feedEl) {
      feedEl.className = "feed-grid";
      feedEl.innerHTML = data.recentPosts.map((p) => `
        <div class="feed-card">
          <div class="feed-thumb">${p.emoji}</div>
          <div class="feed-caption">${p.caption}</div>
        </div>`).join("");
    }
  } catch (e) {
    if (cardsEl) cardsEl.innerHTML = `<div class="error-banner">Error cargando redes: ${e.message}</div>`;
  }
}

// ─── SECTION: ACTIVIDADES ────────────────────────────────────────────────────
function renderActivitiesSection() {
  return `
    <section class="section" id="actividades">
      <div class="container">
        <div class="section-heading">EVENTOS Y<br><span class="red">ACTIVIDADES</span></div>
        <div class="section-sub">Participa con nosotros</div>
        <div id="activities-content"><div class="spinner"></div></div>
      </div>
    </section>`;
}

const thumbGrads = [
  "linear-gradient(135deg,#0d0d18,#1a1030)",
  "linear-gradient(135deg,#120d0d,#2a0810)",
  "linear-gradient(135deg,#0d1218,#0d2030)",
  "linear-gradient(135deg,#0d180e,#0a2a10)",
  "linear-gradient(135deg,#18140d,#2a1e08)",
  "linear-gradient(135deg,#180d18,#2a082a)",
];

async function loadActivities() {
  const el = document.getElementById("activities-content");
  if (!el) return;

  try {
    const data = await fetchActivities();
    window._activitiesLoaded = true;

    const featured = data.activities.find((a) => a.featured);
    const rest     = data.activities.filter((a) => !a.featured);

    let html = "";

    if (featured) {
      html += `
        <div class="activities-hero">
          <div class="act-hero-label">● Evento destacado</div>
          <div class="act-hero-title">${featured.title.toUpperCase()}</div>
          <div class="act-hero-desc">${featured.description}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <a class="btn-primary" href="${featured.registrationUrl}">Inscribirse Ahora</a>
            <a class="btn-outline" href="#">Ver Programa</a>
          </div>
          <div class="act-hero-meta">
            <div class="act-meta-item"><label>FECHA</label><span>${featured.dateLabel}</span></div>
            <div class="act-meta-item"><label>LUGAR</label><span>${featured.location}</span></div>
            ${featured.capacity ? `<div class="act-meta-item"><label>CAPACIDAD</label><span>${featured.capacity.toLocaleString()} asistentes</span></div>` : ""}
          </div>
        </div>`;
    }

    html += `<div class="activities-grid">`;
    rest.forEach((a, i) => {
      html += `
        <div class="act-card">
          <div class="act-thumb" style="background:${thumbGrads[i % thumbGrads.length]}">
            ${a.emoji}
            <div class="act-date-badge">${a.dateLabel}</div>
          </div>
          <div class="act-body">
            <div class="act-type">${a.type}</div>
            <div class="act-title">${a.title}</div>
            <div class="act-desc">${a.description}</div>
            <div class="act-footer">
              <div class="act-location">📍 ${a.location}</div>
              <a class="btn-primary-sm" href="${a.registrationUrl}">Inscribirse</a>
            </div>
          </div>
        </div>`;
    });
    html += `</div>`;

    el.innerHTML = html;
  } catch (e) {
    el.innerHTML = `<div class="error-banner">Error cargando actividades: ${e.message}</div>`;
  }
}

// ─── BOOT ────────────────────────────────────────────────────────────────────
function boot() {
  const app = document.getElementById("app");
  app.innerHTML =
    renderTopbar() +
    renderStreamSection() +
    renderScheduleSection() +
    renderSocialSection() +
    renderActivitiesSection();

  // navigation events
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-section]");
    if (target) showSection(target.dataset.section);

    // day selector
    const dayBtn = e.target.closest(".day-btn");
    if (dayBtn) {
      document.querySelectorAll(".day-btn").forEach((b) => b.classList.remove("active"));
      dayBtn.classList.add("active");
      loadSchedule(dayBtn.dataset.day);
    }
  });

  // load stream info immediately
  loadStream();
}

boot();
