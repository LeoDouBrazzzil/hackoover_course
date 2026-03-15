# Hackoover Course - Project Documentation

## Project Overview
**Hackoover Course** est une plateforme d'apprentissage en ligne (Learning Management System) qui permet aux utilisateurs de suivre des cours, de progresser dans des leçons, et de gérer leur formation. Le projet utilise une architecture full-stack moderne avec un backend Java Spring Boot et un frontend React TypeScript.

## Architecture

### Stack Technique

#### Backend
- **Framework**: Spring Boot 3.2.2
- **Langage**: Java 17/21
- **Base de données**: PostgreSQL 15
- **ORM**: Spring Data JPA + Hibernate
- **Migration de schéma**: Liquibase
- **Sécurité**: Spring Security + OAuth2 + JWT
- **Build tool**: Maven
- **Validation**: Spring Validation
- **Email**: Spring Mail (SMTP Gmail)

#### Frontend
- **Framework**: React 19.2.0
- **Langage**: TypeScript 5.9.3
- **Build tool**: Vite 7.2.2
- **State Management**: Redux Toolkit 2.11.2 + React Redux 9.2.0
- **Data Fetching**: TanStack Query (React Query) 5.90.10
- **Routing**: React Router DOM 6.30.2
- **Styling**:
  - Material-UI (MUI) 7.3.5
  - Emotion (styled components)
  - Styled Components 6.1.19
- **API Client**: Axios 1.13.6
- **Authentication**: Auth0 React SDK 2.15.0
- **Markdown**: React Markdown 10.1.0
- **Icons**: Lucide React 0.554.0

#### DevOps
- **Conteneurisation**: Docker Compose
- **Base de données**: PostgreSQL (port 5432)
- **Admin DB**: Adminer (port 8081)
- **Backend Server**: Port 8080
- **Frontend Dev Server**: Vite (proxy vers backend)

## Structure du Projet

```
hackoover_course/
├── backEnd/              # Application Spring Boot
│   ├── src/main/
│   │   ├── java/com/hackoover/
│   │   │   ├── config/          # Configuration Spring
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # Entités JPA
│   │   │   ├── repository/      # Repositories JPA
│   │   │   ├── service/         # Logique métier
│   │   │   └── HackooverApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/changelog/    # Migrations Liquibase
│   ├── pom.xml
│   └── docker-compose.yml
│
└── frontEnd/             # Application React
    ├── src/
    │   ├── api/              # Configuration API & endpoints
    │   ├── assets/           # Images, icons, logos
    │   ├── auth/             # Auth token provider
    │   ├── components/       # Composants réutilisables
    │   │   ├── button/
    │   │   ├── courses/
    │   │   ├── MatrixRain/
    │   │   └── navbar/
    │   ├── config/           # Configuration & variables d'environnement
    │   ├── pages/            # Pages de l'application
    │   │   ├── Home/
    │   │   ├── Courses/
    │   │   ├── CourseDetails/
    │   │   ├── Dashboard/
    │   │   ├── LoginPage/
    │   │   ├── RegisterPage/
    │   │   └── Layout/
    │   ├── store/            # Redux store
    │   │   ├── user/         # User & progress state
    │   │   ├── course/       # Courses state
    │   │   ├── lesson/       # Lessons state
    │   │   └── types/        # Types Redux
    │   ├── styles/           # Styles globaux & thème
    │   ├── utils/            # Utilitaires & helpers
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## Path Aliases (Frontend)

Le projet utilise des alias de chemins pour faciliter les imports :

```typescript
@api/*       → src/api/*
@components/* → src/component/*
@pages/*     → src/pages/*
@styles/*    → src/styles/*
@types/*     → src/types/*
@utils/*     → src/utils/*
@config/*    → src/config/*
@store/*     → src/store/*
@assets/*    → src/assets/**/
```

## API Endpoints

### Authentication
- `POST /auth/register` - Inscription utilisateur
- `POST /auth/login` - Connexion utilisateur
- `POST /auth/verify-email` - Vérification email

### Courses
- `GET /courses` - Liste des cours
- `GET /courses/featured` - Cours en vedette
- `GET /courses/:id` - Détails d'un cours

### Lessons
- `GET /lessons` - Liste des leçons
- `GET /lessons/by-course/:courseId` - Leçons par cours

### User Progress
- `GET /user-progress` - Progression utilisateur
- `GET /user-progress/by-course-and-user` - Progression par cours et utilisateur
- `GET /user-progress/by-user` - Progression par utilisateur

### Admin (🔒 Requiert ROLE_ADMIN)
#### Courses
- `GET /admin/courses` - Liste tous les cours (admin)
- `POST /admin/courses` - Créer un cours
- `PUT /admin/courses/:id` - Modifier un cours
- `DELETE /admin/courses/:id` - Supprimer un cours
- `POST /admin/courses/:id/image` - Upload image du cours

#### Lessons
- `GET /admin/lessons/by-course/:courseId` - Leçons par cours (admin)
- `POST /admin/lessons` - Créer une leçon
- `PUT /admin/lessons/:id` - Modifier une leçon
- `DELETE /admin/lessons/:id` - Supprimer une leçon
- `PUT /admin/lessons/reorder` - Réordonner les leçons

## Configuration

### Backend (application.properties)
- Base de données: PostgreSQL (configurable via variables d'environnement)
- Server port: 8080
- OAuth2: Google, GitHub, Facebook (à configurer)
- Email: SMTP Gmail (credentials à configurer)
- Frontend URL: http://localhost:3000

### Frontend (.env)
- Auth0 Domain: `dev-bb0g1tlixjymqska.us.auth0.com`
- Auth0 Client ID: (configuré)
- Proxy API: `/api` → `http://localhost:8080`

## Redux Store Structure

```typescript
State = {
  user: ProgressState,      // Progression utilisateur
  lesson: LessonState,     // État des leçons
  course: CourseState      // État des cours
}
```

## Routes Frontend

### Routes publiques (sans navbar)
- `/login` - Page de connexion
- `/register` - Page d'inscription

### Routes privées (avec Layout + navbar)
- `/` - Page d'accueil
- `/courses` - Liste des cours
- `/course-detail` - Détails d'un cours
- `/dashboard` - Tableau de bord & profil utilisateur
- `/tarifs` - Page de tarification

## Conventions de Code

### Frontend
- **Langage**: TypeScript strict
- **Composants**: Functional components avec hooks
- **Styling**: Emotion/MUI pour les composants UI, styled-components pour styles custom
- **State**: Redux Toolkit pour l'état global, React Query pour les données serveur
- **Imports**: Utiliser les path aliases (@api, @components, etc.)
- **Nommage**:
  - Composants: PascalCase
  - Fichiers: PascalCase pour les composants
  - Dossiers: camelCase ou kebab-case

### Backend
- **Langage**: Java 17+
- **Architecture**: Layered (Controller → Service → Repository)
- **Naming**:
  - Classes: PascalCase
  - Packages: lowercase
- **Lombok**: Utilisé pour réduire le boilerplate
- **Validation**: Annotations de validation sur les DTOs
- **Sécurité**: JWT pour l'authentification, OAuth2 pour les providers externes

## Scripts Disponibles

### Frontend
```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run lint     # Linter le code
npm run preview  # Preview du build
```

### Backend
```bash
mvn spring-boot:run          # Démarrer l'application
mvn clean install            # Build du projet
docker-compose up -d         # Démarrer PostgreSQL + Adminer
```

## Base de Données

- **SGBD**: PostgreSQL 15
- **Nom**: hackoover
- **User**: postgres
- **Migrations**: Gérées par Liquibase
- **Admin UI**: Adminer disponible sur http://localhost:8081

## Authentification & Sécurité

Le projet utilise **plusieurs systèmes d'authentification** :
1. **Auth0** (frontend) - Pour l'authentification utilisateur côté client
2. **Spring Security + OAuth2** (backend) - Pour les providers sociaux (Google, GitHub, Facebook)
3. **JWT** (backend) - Pour les tokens d'authentification personnalisés

⚠️ **Important**: Les credentials OAuth2 doivent être configurés dans `application.properties` avant utilisation.

## Problèmes Connus & TODO

- ⚠️ Les credentials email sont hardcodés dans `application.properties` (à déplacer vers variables d'environnement)
- ⚠️ Les OAuth2 client IDs/secrets sont des placeholders (à configurer)
- Les tests unitaires ne sont pas encore implémentés

## Développement

### Démarrer le projet en local

1. **Backend**:
```bash
cd backEnd
docker-compose up -d    # Démarrer PostgreSQL
mvn spring-boot:run     # Démarrer l'application Spring
```

2. **Frontend**:
```bash
cd frontEnd
npm install
npm run dev
```

L'application sera accessible sur http://localhost:5173 (Vite dev server)

### Guidelines pour Claude Code

- **Toujours** utiliser les path aliases lors de l'ajout de nouveaux imports
- **Préférer** l'édition de fichiers existants à la création de nouveaux fichiers
- ⚠️ **OBLIGATOIRE — Internationalisation** : Tout fichier frontend créé ou modifié ne doit **jamais** contenir de texte visible en dur. Chaque chaîne de caractères doit être une clé de traduction `react-intl`. Utiliser `intl.formatMessage({ id: "namespace.key" })` dans les composants. Ajouter la clé dans `src/i18n/fr.json` ET `src/i18n/en.json` avant de l'utiliser. Aucune exception pour les textes affichés à l'utilisateur.
- ⚠️ **OBLIGATOIRE — CSS Variables** : Tout fichier de style frontend créé ou modifié doit utiliser les variables CSS (`var(--bg)`, `var(--text)`, `var(--surface)`, etc.) pour les couleurs afin de supporter le mode clair/sombre. Ne jamais coder en dur des couleurs neutres (`#fff`, `#0a0a0a`, `#f4f4f5`, etc.) — seules les couleurs sémantiques (`#22c55e`, `#ef4444`) peuvent rester en dur.
- **Éviter** de modifier les fichiers de configuration sans demander confirmation
- **Respecter** la structure Redux existante (actions, reducers, types séparés)
- **Utiliser** React Query pour les appels API, Redux pour l'état applicatif
- **Suivre** les conventions TypeScript strictes (pas de `any`, typage explicite)
- **Vérifier** la cohérence entre les endpoints backend et les appels frontend
- Lors de modifications de la base de données, **toujours** créer une migration Liquibase
- Ne **jamais** commiter de credentials ou secrets dans le code

## Internationalisation (i18n)

- **Librairie**: `react-intl`
- **Fichiers de traductions**: `frontEnd/src/i18n/fr.json` et `frontEnd/src/i18n/en.json`
- **Provider**: `I18nProvider` dans `src/i18n/index.tsx`, expose `useLocale()` → `{ locale, setLocale }`
- **Persistance**: `localStorage` clé `hackoover_locale`
- **Sélecteur**: `SettingsPanel` (desktop, fixed top-right) + section dans le drawer mobile de la navbar

## Thème (Dark / Light Mode)

- **Provider**: `ColorThemeProvider` dans `src/theme/ThemeContext.tsx`, expose `useColorTheme()` → `{ colorTheme, setColorTheme }`
- **Mécanisme**: attribut `data-theme="dark"` sur `document.documentElement`
- **Variables CSS**: définies dans `src/styles/Global.styles.tsx` via `:root` (light) et `[data-theme="dark"]`
- **Persistance**: `localStorage` clé `hackoover_theme`, respecte `prefers-color-scheme` au premier chargement
- **Sélecteur**: même `SettingsPanel` / section mobile navbar

## Technologies Additionnelles

- **Archiver**: Gestion d'archives (utilisé pour l'export de contenu de cours)
- **Better Auth**: Système d'authentification moderne (backup/alternative à Auth0)
- **Zod**: Validation de schémas (validation côté client)
