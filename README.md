# Canal 7 — Sitio Web

Sitio web completo para canal de televisión con **frontend vanilla JS + Vite** y **backend serverless (Vercel Functions)**.

---

## 📁 Estructura del proyecto

```
canal-tv/
├── api/                    ← Backend (Vercel Serverless Functions)
│   ├── schedule.js         ← GET /api/schedule?day=lun
│   ├── activities.js       ← GET /api/activities
│   ├── social.js           ← GET /api/social
│   └── stream.js           ← GET /api/stream
│
├── frontend/               ← Frontend (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.js         ← App principal + router
│       ├── api.js          ← Llamadas al backend
│       └── styles.css      ← Estilos globales
│
├── vercel.json             ← Configuración Vercel
└── package.json
```

---

## 🚀 Deploy en Vercel

### 1. Sube el proyecto a GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/TU_USUARIO/canal-tv.git
git push -u origin main
```

### 2. Conéctalo a Vercel
1. Ve a [vercel.com](https://vercel.com) → **New Project**
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente la configuración con `vercel.json`
4. Haz clic en **Deploy**

### 3. Configura la variable de entorno del stream
En Vercel → Settings → Environment Variables:
```
STREAM_EMBED_URL = https://www.youtube.com/embed/TU_VIDEO_ID?autoplay=1
```

---

## 💻 Desarrollo local

```bash
# Instalar dependencias del frontend
cd frontend
npm install

# Iniciar servidor de dev del frontend (puerto 5173)
npm run dev
```

Para el backend en local, instala [Vercel CLI](https://vercel.com/docs/cli):
```bash
npm i -g vercel
vercel dev   # Levanta frontend + API juntos en puerto 3000
```

---

## 🔌 Endpoints de la API

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/schedule?day=lun` | GET | Grilla del día (lun/mar/mie/jue/vie/sab/dom) |
| `/api/activities` | GET | Lista de eventos y actividades |
| `/api/activities?id=1` | GET | Actividad específica |
| `/api/social` | GET | Redes sociales + publicaciones recientes |
| `/api/stream` | GET | Info del stream en vivo y programa actual |

---

## ✏️ Personalización rápida

- **Nombre del canal**: Busca `Canal 7` en `frontend/src/main.js` y `frontend/index.html`
- **Colores**: Edita las variables CSS en `frontend/src/styles.css` (`:root`)
- **Programación**: Edita el objeto `schedule` en `api/schedule.js`
- **Actividades**: Edita el array `activities` en `api/activities.js`
- **Redes sociales**: Edita el array `socials` en `api/social.js`
- **Stream en vivo**: Configura `STREAM_EMBED_URL` en Vercel
