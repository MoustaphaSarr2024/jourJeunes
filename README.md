# 🌙 Jours Jeûnés

> **Application PWA de suivi de jeûne islamique** — Accessible sur navigateur mobile et installable sur l'écran d'accueil.

🔗 **Live Demo** : [jours-jeunes.vercel.app](https://jours-jeunes.vercel.app)

---

## ✨ Fonctionnalités

| Fonctionnalité                   | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| 📅 **Calendrier interactif**     | Marquez chaque jour comme jeûné, manqué ou rattrapé   |
| 🌙 **Suivi Ramadan**             | Barre de progression, jours manqués et à rattraper    |
| ⭐ **Jours Blancs automatiques** | Calcul des 13e, 14e et 15e du mois hégirien           |
| 📊 **Statistiques détaillées**   | Vue globale de vos jeûnes de l'année                  |
| 🔔 **Bandeau Ramadan**           | Affichage automatique du jour du Ramadan en cours     |
| 💾 **Sauvegarde automatique**    | Données persistées localement (localStorage)          |
| 📱 **PWA installable**           | Fonctionne hors-ligne, installable sur iOS & Android  |
| 🚫 **Jours futurs bloqués**      | On ne peut cocher que les jours passés ou aujourd'hui |

### Types de jeûnes pris en charge

- 🌙 **Ramadan jeûné** — Jour du Ramadan effectivement jeûné
- ❌ **Jour manqué** — Jour du Ramadan non jeûné, à rattraper
- ↩️ **Rattrapage Ramadan** — Jour de rattrapage d'un jour manqué
- ✨ **Volontaire** — Jeûne surérogatoire (ex. lundi/jeudi)
- ⭐ **Jours Blancs** — 13e, 14e, 15e du mois hégirien

---

## 🛠️ Technologies utilisées

| Technologie                                               | Rôle                                |
| --------------------------------------------------------- | ----------------------------------- |
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Framework et bundler                |
| [date-fns](https://date-fns.org/)                         | Manipulation des dates              |
| `Intl.DateTimeFormat` (u-ca-islamic)                      | Conversion Hijri ↔ Grégorien        |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)      | Service worker & manifest PWA       |
| Vanilla CSS                                               | Design glassmorphism personnalisé   |
| `localStorage`                                            | Persistance des données côté client |
| [Vercel](https://vercel.com/)                             | Hébergement & déploiement           |

---

## 🚀 Installation & Démarrage local

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/MoustaphaSarr2024/jourJeunes.git

# 2. Aller dans le dossier
cd jourJeunes

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

L'app sera accessible sur `http://localhost:5173`

### Accès depuis un téléphone (même réseau Wi-Fi)

```bash
npm run dev -- --host
```

Un lien de type `http://192.168.X.X:5173` sera affiché — ouvrez-le depuis votre téléphone.

---

## 📦 Build & Déploiement

### Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

### Déploiement sur Vercel

```bash
# Première fois
vercel login
vercel deploy --prod --yes

# Les fois suivantes
vercel deploy --prod --yes
```

---

## 📱 Installer comme application mobile

### Sur iPhone (Safari)

1. Ouvrez [jours-jeunes.vercel.app](https://jours-jeunes.vercel.app) dans **Safari**
2. Appuyez sur l'icône **Partager** (carré avec flèche ↑)
3. Appuyez sur **"Sur l'écran d'accueil"**

### Sur Android (Chrome)

1. Ouvrez le lien dans **Chrome**
2. Menu (3 points) → **"Ajouter à l'écran d'accueil"**

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── CalendarTab.jsx     # Calendrier interactif + bottom sheets
│   ├── StatsTab.jsx        # Statistiques et progression Ramadan
│   └── WhiteDaysTab.jsx    # Jours Blancs (calendrier hégirien)
├── hooks/
│   └── useFastingData.js   # Gestion des données (localStorage)
├── App.jsx                 # Layout principal + bandeau Ramadan
└── index.css               # Design system (glassmorphism, animations)
```

---

## 📄 Licence

Ce projet est open-source. Libre d'utilisation personnelle.

---

_Fait avec ❤️ pour faciliter le suivi du jeûne islamique — Ramadan Kareem 🌟_
