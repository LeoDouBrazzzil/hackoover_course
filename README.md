# Hackoover Course

Plateforme de formation en ligne à la cybersécurité : catalogue de cours, leçons, suivi de
progression, accès aux cours (abonnement ou achat à l'unité) et espace d'administration pour
rédiger les contenus.

## Fonctionnalités

- **Catalogue de cours** : liste, cours mis en avant, page de détail avec ses leçons
- **Leçons** rédigées avec un éditeur riche (TipTap) : code coloré, tableaux, images, vidéos
  YouTube, encadrés, listes de tâches
- **Progression** : suivi de l'avancement de chaque utilisateur, cours par cours
- **Accès aux cours** : statut d'accès, abonnement, achat d'un cours à l'unité, page Tarifs
- **Comptes** : inscription, connexion, vérification de l'e-mail, profil modifiable,
  connexion avec Google, GitHub ou Facebook
- **Administration** (rôle `ADMIN`) : création, modification et suppression des cours et des
  leçons, réordonnancement des leçons, image de couverture
- **Interface** : français / anglais, mode clair / sombre, animations

## Stack technique

| Partie | Technologies |
|---|---|
| Backend | Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA, Spring Security, OAuth2 Client, JWT (jjwt), Spring Mail, Liquibase, Lombok, Maven |
| Base de données | PostgreSQL 15, Adminer |
| Frontend | React 19, TypeScript 5.9, Vite 7, MUI 7, Emotion, styled-components, Redux Toolkit, TanStack Query, React Router 6, react-intl, TipTap, Framer Motion |
| Outils | Docker Compose, ESLint |

## Structure

```
hackoover_course/
├── backEnd/                 # API Spring Boot
│   ├── src/main/java/com/hackoover/
│   │   ├── config/          # Sécurité, JWT, OAuth2
│   │   ├── controller/      # Contrôleurs REST
│   │   ├── dto/             # Objets d'échange
│   │   ├── model/           # Entités JPA
│   │   ├── repository/      # Accès aux données
│   │   └── service/         # Logique métier
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/changelog/    # Migrations Liquibase
│   ├── docker-compose.yml   # PostgreSQL + Adminer
│   └── pom.xml
└── frontEnd/                # Application React
    └── src/
        ├── api/             # Client HTTP et endpoints
        ├── components/      # Composants réutilisables
        ├── i18n/            # Traductions fr / en
        ├── pages/           # Accueil, cours, tableau de bord, admin, connexion…
        ├── store/           # Redux (cours, leçons, utilisateur)
        ├── styles/          # Thème et styles globaux
        └── theme/           # Mode clair / sombre
```

## Démarrage en local

### Prérequis

- Java 17 et Maven
- Node.js et npm
- Docker

### 1. Base de données

```bash
cd backEnd
docker compose up -d
```

PostgreSQL écoute sur le port `5432` (base `hackoover`). Adminer est disponible sur
http://localhost:8081.

### 2. Backend

```bash
cd backEnd
mvn spring-boot:run
```

L'API démarre sur http://localhost:8080. Liquibase crée les tables au premier lancement.

### 3. Frontend

```bash
cd frontEnd
npm install
npm run dev
```

## Configuration

Le backend lit ses réglages dans des variables d'environnement, avec une valeur par défaut
pour le développement :

| Variable | Rôle | Défaut |
|---|---|---|
| `DB_HOST` | Hôte PostgreSQL | `localhost` |
| `DB_PORT` | Port PostgreSQL | `5432` |
| `DB_NAME` | Nom de la base | `hackoover` |
| `DB_USER` | Utilisateur | `postgres` |
| `MAIL_USERNAME` | Compte d'envoi des e-mails (SMTP Gmail) | — |
| `FRONTEND_URL` | Adresse du frontend (redirections, liens des e-mails) | `http://localhost:3000` |

Les identifiants OAuth2 de Google, GitHub et Facebook se règlent dans `application.properties`
(`spring.security.oauth2.client.registration.*`). Ne commitez jamais de mot de passe,
de secret client ni de clé.

## API

Les routes publiques sont celles du catalogue et de l'authentification. Toutes les autres
demandent un token JWT.

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion (renvoie un JWT) |
| GET | `/api/auth/verify-email` | Vérification de l'e-mail |
| GET / PUT | `/api/auth/me` | Profil de l'utilisateur connecté |
| GET | `/api/courses` | Liste des cours |
| GET | `/api/courses/featured` | Cours mis en avant |
| GET | `/api/courses/{id}` | Détail d'un cours |
| GET | `/api/lessons/by-course/{courseId}` | Leçons d'un cours |
| GET | `/api/user-progress/by-user` | Progression de l'utilisateur |
| GET | `/api/user-progress/by-course-and-user` | Progression sur un cours |
| POST | `/api/user-progress` | Enregistrer une progression |
| GET | `/access/status` | Statut d'accès de l'utilisateur |
| POST | `/access/subscribe` | Souscrire un abonnement |
| POST | `/access/purchase/{courseId}` | Acheter un cours |

Administration (rôle `ADMIN`) :

| Méthode | Route | Rôle |
|---|---|---|
| GET / POST | `/api/admin/courses` | Lister, créer un cours |
| PUT / DELETE | `/api/admin/courses/{id}` | Modifier, supprimer un cours |
| POST | `/api/admin/courses/{id}/image` | Image de couverture |
| GET | `/api/admin/lessons/by-course/{courseId}` | Leçons d'un cours |
| POST | `/api/admin/lessons` | Créer une leçon |
| PUT / DELETE | `/api/admin/lessons/{id}` | Modifier, supprimer une leçon |
| PUT | `/api/admin/lessons/reorder` | Réordonner les leçons |

## Scripts

| Commande | Dossier | Effet |
|---|---|---|
| `npm run dev` | `frontEnd` | Serveur de développement Vite |
| `npm run build` | `frontEnd` | Build de production |
| `npm run lint` | `frontEnd` | ESLint |
| `mvn spring-boot:run` | `backEnd` | Lancer l'API |
| `mvn clean install` | `backEnd` | Compiler et packager |

## Contribuer

- Toute modification du schéma passe par une nouvelle migration Liquibase.
- Côté frontend, aucun texte visible n'est écrit en dur : chaque chaîne est une clé
  `react-intl`, ajoutée dans `src/i18n/fr.json` et `src/i18n/en.json`.
- Les couleurs neutres passent par les variables CSS (`var(--bg)`, `var(--text)`…), pour le
  mode sombre.
