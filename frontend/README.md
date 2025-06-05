# 💻 Frontend – Library CRUD App

Ce projet représente l’interface utilisateur d'une application Full Stack CRUD réalisée dans le cadre du programme **Talent4Startups - EDACY 2025**.

Elle permet à un utilisateur authentifié de gérer une collection de livres : ajouter, consulter, modifier et supprimer.

> Le frontend est connecté à un backend Node.js déjà déployé sur Render :
> 
> 🔗 https://library-crud-app-backend.onrender.com

Si vous voulez tester avec un backend locale :
> Aller dans `./src/services/api.js` et modifier `baseURL: "https://library-crud-app-backend.onrender.com"` par ton chemin backend .
---

## ⚙️ Technologies utilisées

- ⚛️ React (Create React App)
- 🧭 React Router DOM
- 🔁 Axios pour les appels HTTP
- 🎨 CSS Vanilla (sans framework externe)
- 🔐 Gestion du JWT via `localStorage`

---

## ✨ Fonctionnalités principales

- ✅ Inscription et Connexion (avec `alert` en retour visuel)
- 📚 CRUD complet sur les livres
  - Créer un livre
  - Lister les livres
  - Modifier un livre
  - Supprimer un livre
- 🔐 Routes protégées : seul un utilisateur connecté peut accéder au dashboard
- 📎 Ajout d’image par URL (lien direct)
- 🚫 Redirection automatique vers `/login` si l’utilisateur n’est pas authentifié

---

## 📁 Structure du projet

```bash
frontend/
├── src/
│ ├── pages/ # Pages principales : Login, Register, Dashboard
│ ├── services/ # Fichier de configuration Axios (connexion API)
| ├── styles/ # Contient les feuilles de styles (CSS vanilla)
│ ├── App.js # Définition des routes avec React Router
│ └── index.js # Point d’entrée principal de l’application React
├── public/ # Contient index.html
└── package.json
```

## ▶️ Lancer le frontend en local

```bash
cd frontend
npm install
npm start
```
Accessible ensuite sur :  

  📍 `http://localhost:3000`
