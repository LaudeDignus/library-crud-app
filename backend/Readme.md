# 📦 Backend – Library CRUD App

Ce projet représente l'API REST du backend d'une application Full Stack CRUD permettant aux utilisateurs de gérer une collection de livres après authentification.  
Le backend est développé avec **Node.js**, **Express.js**, et connecté à **MongoDB Atlas**.

> ✅ Ce backend est déjà déployé sur **Render** et accessible à l'adresse :
> 
> 🔗 `https://library-crud-app-backend.onrender.com`
 Tu peux utliser ce lien pour des test avec [POSTMAN](https://www.postman.com/)

---

## 🔧 Fonctionnalités principales

- ✅ Authentification sécurisée (Inscription & Connexion)
- 🔐 JWT pour sécuriser les routes
- 📚 CRUD complet (Create, Read, Update, Delete) sur des livres
- 🔗 Association de chaque livre à un utilisateur (via `userId`)
- 🌍 Déploiement Render en production
- ⚙️ Utilisation de `nodemon` en développement

---

## 📁 Structure du projet
```bash
backend/

├── controllers/ # Fonctions métiers : auth, books
├── middleware/ # Middleware JWT (verifyToken)
├── models/ # Schémas Mongoose : User, Book
├── routes/ # Fichiers de routage : auth, books
├── .env.example # Fichier d'exemple pour les variables d'environnement
├── index.js # Point d’entrée du serveur Express
├── package.json
└── nodemon.json
```
--- 

## 🚀 Lancement en développement
Assurez-vous d'avoir nodemon installé :

```bash
npm install -g nodemon
```

Puis lancez le serveur en mode developpement 

```bash
cd backend
npm install
nodemon server.js
```

---

## 🌐 Déploiement Render
Le backend est déjà en ligne via Render :

  - Service : Web Service

  - Build command : ``npm install``

  - Start command : ``node index.js``

  - Variables d'environnement définies dans Render Dashboard

  - URL : `https://library-crud-app-backend.onrender.com`

---
## 📡 API – Endpoints disponibles

### 🧾 Authentification

| Méthode | Endpoint            | Description                                   |
|---------|---------------------|-----------------------------------------------|
| `POST`  | `/auth/register` | Crée un nouvel utilisateur                    |
| `POST`  | `/auth/login`    | Connecte un utilisateur et renvoie un token JWT |


### 📚 Livres (protégées par token JWT)

> Toutes les routes ci-dessous nécessitent un en-tête d’authentification :  
> `Authorization: Bearer <votre_token>`

| Méthode  | Endpoint           | Description                                   |
|----------|--------------------|-----------------------------------------------|
| `GET`    | `/books`       | Récupère tous les livres de l’utilisateur connecté |
| `POST`   | `/books`       | Crée un nouveau livre                         |
| `PUT`    | `/books/:id`   | Met à jour un livre spécifique                |
| `DELETE` | `/books/:id`   | Supprime un livre spécifique                  |

🛡️ Toutes les routes /api/books nécessitent un token JWT dans le header :
```bash
Authorization: Bearer <token>
```

### 📘 Exemple de requête POST avec Postman
```bash
POST /api/books
Authorization: Bearer <token>

{
  "title": "Le Petit Prince",
  "author": "Antoine de Saint-Exupéry",
  "year": 1943,
  "image": "https://lien-vers-image.com/petit-prince.jpg"
}
```

---

### Déploiement réussi avec Render | Stack : Node.js + Express + MongoDB
