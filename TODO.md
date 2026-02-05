# 🚀 SAKUGAA - TODO LIST

## 🔴 BUGS À CORRIGER

### Priorité HAUTE
- [ ] **Tags non cliquables** : Ajouter `onClick={() => updateURL(tag, 1)}` sur tous les tags
    - `AnimationContent.tsx` (ligne ~380)
    - `ClipCard` tags
    - Page `/clips/[id]` tags sidebar
- [ ] **Artist ≠ Uploader** : L'artist affiché est en fait l'uploader, pas l'animateur
    - Actuellement : `clip.author` = uploader
    - Besoin : BDD d'animateurs séparée ou parsing intelligent des tags
- [ ] **Navbar cache le header sticky** sur `/clips/[id]`
    - Ajuster `top-20` au lieu de `top-0`

---

## ⚠️ FEATURES MANQUANTES / NON FONCTIONNELLES

### Navigation
- [ ] **Page `/trending`** : Existe dans navbar mais route vide
    - Option A : Implémenter (clips triés par score cette semaine)
    - Option B : Supprimer de la navbar
- [ ] **Page `/community`** : Existe dans navbar mais route vide
    - Option A : Implémenter (forum/discussions)
    - Option B : Supprimer de la navbar
- [ ] **Login / Join Free** : Boutons présents mais pas d'auth
    - Option A : Implémenter auth (NextAuth.js + Supabase)
    - Option B : Supprimer temporairement

### Home
- [ ] **Trending Section** : Affiche clips par défaut, pas vraiment "top de la semaine"
    - Implémenter logique backend : `order:score + created_at > 7 jours`
- [ ] **Featured Animators** : Liste statique hardcodée
    - Fetch dynamique depuis API ou BDD

### Animations Page
- [ ] **Tags populaires** : Hardcodés, pas dynamiques
    - Calculer trending tags basé sur nombre de clips récents
- [ ] **Search sans résultats** : Message d'erreur générique
    - Améliorer UX : suggestions de tags similaires
- [ ] **Pagination infinie** : Actuellement page par page
    - Option : Scroll infini (Intersection Observer)

### Clip Detail Page
- [ ] **Download button** : Fonctionne mais pas de feedback visuel pendant download
    - Ajouter progress bar (si possible avec API)
- [ ] **Tags non organisés** : Liste simple
    - Option : Catégoriser (Animateurs, Studios, Techniques, Anime)
- [ ] **Related clips** : Pas de suggestions de clips similaires
    - Algorithme : même anime/artiste/tags

### Artists Page
- [ ] **Liste basique** : Juste noms + 1 preview
    - Améliorer : Cards avec stats (nombre de clips, score moyen)
    - Ajouter filtres/recherche
    - Pagination

---

## 🎨 AMÉLIORATIONS UI/UX

### Performance
- [x] ~~Masonry breakpoints en constante~~ (FAIT)
- [x] ~~VideoPlayer memory cleanup~~ (FAIT)
- [x] ~~AbortController pour fetchClips~~ (FAIT)
- [x] ~~useMemo sur searchParams~~ (FAIT)
- [ ] **Image optimization** : Utiliser Next/Image au lieu de <img>
- [ ] **Lazy load components** : Dynamic imports pour sections lourdes
- [ ] **Service Worker** : PWA pour offline support

### Accessibilité
- [ ] **Alt text images** : Beaucoup d'images sans alt descriptif
- [ ] **Keyboard navigation** : Tags/boutons pas tous navigables au clavier
- [ ] **ARIA labels** : Manquants sur plusieurs boutons
- [ ] **Focus visible** : Améliorer les styles focus

### Responsive
- [ ] **Mobile navigation** : Menu hamburger fonctionne mais peut être amélioré
- [ ] **Clip detail mobile** : Sidebar doit être collapsible
- [ ] **Masonry mobile** : Tester sur plus de tailles d'écran

### Loading States
- [x] ~~LoadingSkeleton page animations~~ (FAIT)
- [ ] **Skeleton HeroSection** : Pas de skeleton pendant fetch
- [ ] **Skeleton TrendingSection** : Idem
- [ ] **Image placeholders** : Ajouter blurhash ou couleur dominante

---

## 🔧 AMÉLIORATIONS TECHNIQUES

### Code Quality
- [ ] **TypeScript strict** : Beaucoup de `any` à typer correctement
    - `clip: any` → interface `SakugabooruPost`
    - Props components
- [ ] **Error boundaries** : Ajouter React Error Boundaries
- [ ] **Logging** : Implémenter logging système (Sentry/LogRocket)
- [ ] **Tests** : Aucun test actuellement
    - Unit tests (Jest)
    - E2E tests (Playwright)

### Architecture
- [ ] **API routes refactor** : `/api/clips` fait tout
    - Séparer : `/api/clips`, `/api/trending`, `/api/artists`
- [ ] **State management** : Tout en local state
    - Option : Zustand/Jotai pour global state
- [ ] **Constants centralisés** : Tags, colors éparpillés
    - Créer `/lib/constants.ts`

### SEO
- [ ] **Meta tags dynamiques** : Pas de meta pour chaque clip
    - Open Graph images
    - Twitter cards
- [ ] **Sitemap** : Générer sitemap.xml automatique
- [ ] **Robots.txt** : Configurer crawling
- [ ] **Structured data** : JSON-LD pour rich snippets

---

## 🚀 FEATURES AVANCÉES (Nice to have)

### Fonctionnalités
- [ ] **Favoris** : Sauvegarder clips préférés (localStorage ou auth)
- [ ] **Playlists** : Créer collections de clips
- [ ] **Share buttons** : Partager sur Twitter/Discord/etc
- [ ] **Embed clips** : Générer iframe embeddable
- [ ] **Comments** : Système de commentaires (nécessite auth)
- [ ] **Ratings** : Upvote/downvote clips (nécessite auth)

### Découverte
- [ ] **Algorithme recommandations** : Basé sur historique/favoris
- [ ] **Random clip** : Bouton "Surprise me"
- [ ] **Trending tags** : Widget tags en temps réel
- [ ] **New uploads** : Badge "New" sur clips récents

### Analytics
- [ ] **Dashboard admin** : Stats visits, clips populaires
- [ ] **User analytics** : Tracks clips vus/likés
- [ ] **A/B testing** : Tester différentes UX

---

## 🗄️ BASE DE DONNÉES (Future)

### Si migration vers BDD propre
- [ ] **Users table** : Auth, profiles, favoris
- [ ] **Clips table** : Cache API Sakugabooru
- [ ] **Artists table** : Infos animateurs séparées
- [ ] **Tags table** : Normalisation tags
- [ ] **Comments table** : Système commentaires
- [ ] **Analytics table** : Tracking events

### Stack suggéré
- Supabase (PostgreSQL + Auth + Storage)
- Prisma ORM
- NextAuth.js

---

## 📱 EXTENSIONS POSSIBLES

### Projets satellites
- [ ] **Extension Chrome** : Quick lookup Sakuga
- [ ] **Bot Discord** : Partager clips dans Discord
- [ ] **Mobile app** : React Native version
- [ ] **API publique** : Exposer API pour devs
- [ ] **CLI tool** : Download clips en ligne de commande

---

## 🐛 KNOWN ISSUES (Non critiques)

- **HeroSection marquee** : Parfois saccades sur Firefox
- **Video preload** : Peut être lent sur connexion faible
- **Search debounce** : Pas de debounce, requête à chaque keystroke
- **Infinite scroll** : N'existe pas, juste pagination
- **Back button** : Parfois perd la position scroll

---

## 📚 DOCUMENTATION

- [ ] **README.md** : Compléter avec screenshots
- [ ] **CONTRIBUTING.md** : Guide contribution
- [ ] **API.md** : Documenter routes API
- [ ] **SETUP.md** : Guide installation détaillé
- [ ] **ARCHITECTURE.md** : Expliquer structure projet

---

## 🎯 PRIORITÉS RECOMMANDÉES

### Si tu reviens sur Sakugaa plus tard :

**Phase 1 - Quick Wins (2-3h)**
1. Tags cliquables
2. Supprimer pages vides navbar (Trending/Community/Login)
3. README GitHub propre

**Phase 2 - Polish (1 semaine)**
1. Fix Artist vs Uploader
2. Trending tags dynamiques
3. Related clips page detail
4. Améliorer Artists page

**Phase 3 - Features (2-3 semaines)**
1. Auth + Favoris
2. BDD propre (migration Supabase)
3. Recommandations
4. PWA

**Phase 4 - Avancé (1 mois+)**
1. Comments system
2. Admin dashboard
3. Mobile app
4. Extensions
```
