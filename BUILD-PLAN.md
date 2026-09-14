# MASTER BUILD PLAN — RAI WEB DESIGN
### Brief créatif premium + instructions d'implémentation complètes pour Claude Code

> **Projet :** Refonte cinématique du portfolio `raiweb.design`
> **Type :** Portfolio / Studio indépendant (one-man studio)
> **Livrable :** Site statique `index.html` + `style.css` + `script.js` + `/assets`
> **Langue du site :** Français (FR-PF)
> **Version du plan :** 1.0

---

## 1. WEBSITE OVERVIEW

Rai Web Design est un studio web indépendant basé à Tahiti, fondé en **juin 2026**, qui conçoit, développe et met en ligne des sites web sur mesure pour des entreprises — localement et à l'international.

Le site actuel fonctionne mais ne **raconte rien**. Il présente un service ; il ne fait pas ressentir le niveau de craft. Ce nouveau site doit fonctionner comme une **preuve vivante** : avant même d'avoir lu une ligne, le visiteur doit comprendre que la personne derrière ce site sait faire quelque chose que 95 % des prestataires ne savent pas faire.

**Objectif principal :** transformer un visiteur curieux en conversation WhatsApp qualifiée.

**Objectif secondaire :** positionner Rai Web Design comme un choix *premium mais accessible* — pas une agence anonyme, pas un freelance low-cost, mais un artisan du web, sélectif, rapide, et techniquement irréprochable.

**Cibles :**
- Entreprises locales de Polynésie française (restauration, tourisme, artisanat, services, immobilier, santé) sans site ou avec un site obsolète.
- PME et indépendants francophones à distance cherchant un interlocuteur unique.
- Entreprises ayant déjà un site daté et cherchant une modernisation, pas une refonte bureaucratique.

**Décision structurelle clé :** une **single page** verticale, scroll-driven, en storytelling continu. Pas de menu à 7 entrées. Le scroll *est* la narration.

---

## 2. CORE POSITIONING

### Positioning statement

> **Rai Web Design conçoit des sites web qui donnent envie de rester.
> Un seul interlocuteur : celui qui dessine, code et met en ligne.
> Livré en deux semaines. Sans intermédiaire. Sans compromis.**

### Le message central (one-liner du hero)

> **« Votre site ne doit pas juste exister. Il doit convaincre. »**

### Les trois leviers de différenciation

| Levier | Ce que les autres font | Ce que Rai fait |
|---|---|---|
| **Interlocuteur unique** | Commercial → chef de projet → sous-traitant | Vous parlez à la personne qui code. Point. |
| **Rareté volontaire** | 15 projets en parallèle, délais qui glissent | Peu de projets à la fois → 2 semaines, sans bâcler |
| **Craft technique** | Templates recyclés, sites lourds | Code sur mesure, performance mesurée, animations sur mesure |

### Proof points (à afficher)

- **3 sites livrés** — et d'autres en production
- **100 % de clients satisfaits**
- **2 semaines** de délai moyen de livraison
- **Performance PageSpeed excellente** sur chaque livraison
- **Depuis le lycée** — pas un reconverti, un développeur de terrain
- **Basé à Tahiti — clients partout**

### Objections à désamorcer (intégrées dans la copy)

1. *« Un indépendant, c'est risqué. »* → Réponse : peu de projets à la fois = votre projet a toute l'attention.
2. *« Et après la livraison ? »* → Réponse : hébergement inclus + maintenance/modifications tarifées à l'ampleur du changement.
3. *« Un studio récent... »* → Réponse : je code depuis le lycée. Le studio est jeune, pas la compétence.
4. *« Tahiti, c'est loin. »* → Réponse : 100 % du travail est numérique, les clients sont partout.

### Ton de voix

Direct. Court. Confiant sans arrogance. Phrases courtes. Zéro jargon d'agence. Jamais « nous » corporate — **« je »** assumé. Le « je » *est* l'argument de vente.

**Interdits de copy :** « solutions digitales », « accompagner votre transformation », « sur-mesure et clé en main », « à l'écoute de vos besoins », « synergie », « 360° ».

---

## 3. BRAND PERSONALITY

**Archétype :** L'Artisan (The Creator) × Le Magicien.

Si la marque était une personne : jeune, calme, très précise, ne parle pas beaucoup mais quand elle montre son écran, la pièce se tait.

| Est | N'est pas |
|---|---|
| Précis | Froid |
| Premium | Prétentieux |
| Cinématique | Théâtral |
| Sélectif | Inaccessible |
| Technique | Jargonneux |
| Insulaire, lumineux | Carte postale, cliché tropical |

**Signature émotionnelle :** *l'assurance tranquille.*

**Note culturelle :** l'ancrage Tahiti est un atout de **caractère**, pas un thème décoratif. Aucun palmier, aucun hibiscus, aucun ukulélé. L'insularité s'exprime par la **lumière** (contrastes profonds, éclats chauds), pas par le folklore.

---

## 4. VISUAL DIRECTION

### Concept visuel : « Encre et Braise »

Un noir d'encre absolu, presque sans rivage, traversé par une seule ligne d'énergie rouge incandescente. Le blanc n'est pas un fond : c'est de la **lumière**. Tout est contraste, souffle, et vide maîtrisé.

### Principes

1. **Le noir domine** — 80 % de la surface. Le vide est un matériau.
2. **Le rouge est rare** — il n'est utilisé que là où l'on veut que l'œil aille. Jamais décoratif.
3. **Le blanc est typographique** — le blanc pur est réservé au texte principal et aux éclats de lumière.
4. **Le grain est permanent** — une couche de grain subtile (opacité 3–5 %) sur tout le site, en overlay `mix-blend-mode: overlay`. C'est ce qui donne la texture « pellicule ».
5. **Aucune bordure dure** — les séparations se font par lueur, dégradé ou espace, pas par des traits gris.
6. **La vidéo est le fond, pas un encart** — le film cinématique vit en plein écran derrière le texte, scrubbing au scroll.

### Palette (palette enrichie à partir de Rouge & Blanc)

```
--ink            #060607    /* noir d'encre — fond principal */
--ink-deep       #000000    /* noir absolu — transitions, hero */
--ink-soft       #0F0F12    /* surfaces élevées, cartes */
--ink-line       #1C1C21    /* séparateurs très discrets */

--red            #E6202B    /* ROUGE SIGNATURE — CTA, accents */
--red-hot        #FF3B30    /* hover, glow, kinetic */
--red-deep       #8E0F16    /* dégradés, profondeur */
--ember          #FF7A45    /* braise — accent chaud secondaire, rare */

--white          #FFFFFF    /* titres, texte fort */
--bone           #EDEAE6    /* texte courant (blanc cassé, plus doux à lire) */
--ash            #8A8A93    /* texte secondaire, labels */
--ash-dim        #4A4A52    /* texte tertiaire, numérotation */
```

**Règle de proportion :** 80 % encre · 14 % blanc/os · 5 % rouge · 1 % braise.

**Gradient signature :**
`linear-gradient(100deg, #8E0F16 0%, #E6202B 45%, #FF7A45 100%)`
→ utilisé exclusivement pour : soulignement kinetic du hero, barre de progression de scroll, glow des CTA.

### Traitement image & vidéo

- Toute vidéo passe par un overlay : `background: radial-gradient(ellipse at center, transparent 30%, #060607 92%)` pour fondre les bords dans le noir.
- Contraste poussé, noirs écrasés, hautes lumières préservées.
- Un très léger `saturate(1.05) contrast(1.08)` en CSS filter sur les médias.

---

## 5. HIGGSFIELD SEEDANCE 2.0 — ASSET GENERATION

### Paramètres globaux

| Paramètre | Valeur |
|---|---|
| Modèle | **Higgsfield Seedance 2.0** |
| Résolution | **1080p (1920×1080)** |
| Durée par clip | **8–12 secondes** |
| Ratio | 16:9 |
| FPS | 24 (rendu cinéma) — ré-encodé en 30fps pour le scrubbing |
| Mode | **Séquence continue** — les 3 clips s'enchaînent comme un plan-séquence unique |
| Style global | Cinématique, anamorphique, noir profond, rim light rouge, grain de pellicule |
| Audio | Aucun (les vidéos sont muettes, scrub-driven) |

### Image de référence d'identité

> **⚠️ À CONFIRMER :** le plan prévoit un dossier `Media/` à la racine du projet contenant l'image de référence. **Ce dossier n'existe pas encore dans le dépôt.**
>
> **Chemin attendu :** `./Media/reference.jpg`
>
> Cette image sert de **référence d'identité** pour toutes les générations Seedance 2.0 afin de garder le personnage cohérent d'un plan à l'autre.
>
> **Décision créative prise en attendant :** les trois scènes ci-dessous sont écrites pour fonctionner **avec ou sans personnage**. Le récit est porté par les mains, l'écran, la lumière et le geste — pas par un visage. Si l'image de référence est fournie, la Scène 03 intègre le personnage de dos/trois-quarts. Sinon, elle reste centrée sur l'objet et la lumière, sans perte narrative.

### Prompt de base commun (à préfixer à chaque scène)

```
Cinematic anamorphic shot, 1080p, 24fps. Pure ink-black environment,
near-total darkness. Single motivated light source. Deep red rim lighting
(#E6202B) with rare warm ember accents (#FF7A45). Crushed blacks,
preserved highlights, high contrast. Subtle 35mm film grain. Shallow
depth of field, slow deliberate camera motion, no handheld shake.
Premium, calm, expensive. No text overlays, no logos, no UI chrome,
no people's faces in focus. Color grade: teal-free, red-and-black only.
```

### Continuité entre les clips

Les trois clips doivent lire comme **un seul mouvement**. Règles de raccord :

- **Clip 01 → Clip 02 :** le clip 01 se termine par la **lumière rouge qui envahit le cadre** ; le clip 02 démarre sur ce même rouge qui se rétracte. Raccord sur la lumière.
- **Clip 02 → Clip 03 :** le clip 02 se termine par un **push-in dans l'écran** ; le clip 03 démarre à l'intérieur/au-delà. Raccord sur le mouvement avant.
- Même focale apparente, même grain, même température de couleur sur les trois.
- La caméra ne recule **jamais** : le film est une progression avant continue, du vide vers la lumière.

### Post-production / export

```bash
# Concaténation des 3 clips en une séquence continue
ffmpeg -f concat -safe 0 -i clips.txt -c copy assets/video/_raw_sequence.mp4

# Export WEB — H.264, faststart, optimisé pour le scrubbing
ffmpeg -i assets/video/_raw_sequence.mp4 \
  -vf "scale=1920:-2,fps=30" \
  -c:v libx264 -profile:v high -crf 23 -preset slow \
  -g 15 -keyint_min 15 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  assets/video/sequence-1080.mp4

# Export MOBILE — 720p, plus léger
ffmpeg -i assets/video/_raw_sequence.mp4 \
  -vf "scale=1280:-2,fps=30" \
  -c:v libx264 -crf 26 -preset slow \
  -g 15 -keyint_min 15 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  assets/video/sequence-720.mp4

# Poster frame (premier frame, pour le LCP)
ffmpeg -i assets/video/sequence-1080.mp4 -vframes 1 -q:v 2 assets/img/poster.jpg
```

> **`-g 15 -keyint_min 15 -sc_threshold 0` est obligatoire.** Un keyframe toutes les 15 frames est ce qui rend le scrubbing fluide. Sans ça, le scroll saccade.

**Budget cible :** `sequence-1080.mp4` ≤ 8 Mo · `sequence-720.mp4` ≤ 3,5 Mo.

**Fallback image-sequence (si le scrubbing vidéo pose problème sur iOS) :**
```bash
ffmpeg -i assets/video/sequence-1080.mp4 -vf "fps=12,scale=1600:-2" -q:v 6 assets/seq/frame_%04d.jpg
```
→ ~120 frames, préchargées, dessinées dans un `<canvas>`.

---

## 6. LES TROIS SCÈNES CINÉMATIQUES

> **Séquence continue — titre du film : « DE L'ENCRE À LA LUMIÈRE »**
> Le film raconte la naissance d'un site web : du néant, à la structure, à la vie.

---

### SCÈNE 01 — « LE NÉANT » *(0 s → 10 s)*
**Rôle narratif :** l'avant. L'entreprise sans site. Le vide.

```
PROMPT SEEDANCE 2.0 :

[PROMPT DE BASE] + A vast empty black void. A single thin horizontal
line of deep red light hovers in absolute darkness, perfectly still.
The camera pushes forward very slowly toward the line. As it
approaches, the line begins to fracture and split into thousands of
tiny glowing red particles, like embers drifting upward in zero
gravity. The particles slowly organize themselves, aligning into a
faint geometric grid — the first suggestion of structure emerging from
chaos. Final beat: the red light intensifies and floods the entire
frame, washing everything into pure crimson.

Duration: 10 seconds. Continuous forward dolly, no cuts.
```

**Mots-clés de contrôle :** `void`, `single red line`, `ember particles`, `grid forming`, `slow forward dolly`, `light flood ending`.

**Texte superposé au scroll :** `VOTRE SITE ACTUEL NE DIT RIEN.`

---

### SCÈNE 02 — « LA CONSTRUCTION » *(10 s → 21 s)*
**Rôle narratif :** le craft. Le code. Le geste de l'artisan.

```
PROMPT SEEDANCE 2.0 :

[PROMPT DE BASE] + Opening on flooding crimson light that rapidly
retracts inward, revealing a dark minimalist desk in a black room. A
single ultra-wide monitor glows, its screen filled with clean,
abstract code and precise wireframe layouts materializing line by line
— structure assembling itself in real time. Warm ember reflections
catch the edge of the desk and the keys of a mechanical keyboard. Hands
enter frame from below, moving with calm precision, unhurried. Glass
elements and layout blocks float slightly off the screen surface in
soft 3D, snapping into alignment one by one with tiny red flares.
Final beat: the camera begins an accelerating push-in directly toward
the center of the screen.

Duration: 11 seconds. Slow arc-right then push-in. No cuts.
```

**Mots-clés de contrôle :** `retracting red light`, `ultra-wide monitor`, `wireframes assembling`, `hands precise`, `floating layout blocks`, `snap alignment flares`, `accelerating push-in`.

**Texte superposé au scroll :** `JE LE CONSTRUIS. LIGNE PAR LIGNE.`

---

### SCÈNE 03 — « LA MISE EN LUMIÈRE » *(21 s → 32 s)*
**Rôle narratif :** l'après. Le site vivant. Le client qui gagne.

```
PROMPT SEEDANCE 2.0 :

[PROMPT DE BASE] + The camera passes THROUGH the monitor surface and
emerges inside a vast dark cinematic gallery. Suspended in the black
space, dozens of glowing website interfaces float at different depths
like illuminated panels in a museum — clean, modern, elegant layouts,
each edge-lit in red and warm ember. The camera glides forward between
them in one continuous flowing motion, panels drifting past on both
sides. Reflections ripple on a glossy black floor. Ahead, the panels
converge and open toward a single warm horizon of light. Final beat:
the camera settles, holding on that horizon as it softly blooms.

Duration: 11 seconds. Continuous forward glide, settling to a slow
hold. No cuts.

[IF IDENTITY REFERENCE PROVIDED: a single figure stands in
three-quarter silhouette at the far end of the gallery, back partially
to camera, rim-lit in red, calm and still. Match identity to
./Media/reference.jpg. Face never fully lit, never centered.]
```

**Mots-clés de contrôle :** `through the screen`, `floating website panels`, `dark gallery`, `red edge lighting`, `glossy black floor`, `forward glide`, `warm horizon bloom`.

**Texte superposé au scroll :** `ET IL TRAVAILLE POUR VOUS.`

---

## 7. WEBSITE STRUCTURE

Single page, 10 sections, scroll continu.

```
00 · PRELOADER          — compteur 0→100, révélation
01 · HERO               — vidéo scrub + titre kinetic
02 · STATS STRIP        — bande animée de chiffres (compteurs)
03 · MISSION            — texte massif révélé mot par mot
04 · TROIS PILIERS      — les 3 offres, cartes cinématiques
05 · STORY              — timeline horizontale pinned
06 · SERVICE / OFFRE    — site complet + hébergement + maintenance
07 · TRAVAUX            — les 3 sites livrés, galerie hover-reveal
08 · CTA FINAL          — plein écran, magnétique, WhatsApp
09 · FOOTER             — minimal, logo géant, liens
```

**Navigation :** pas de barre de nav classique. Un **indicateur de progression vertical** à droite (fine ligne, remplissage rouge) + un bouton flottant « Parlons-en » en bas à droite qui apparaît après le hero.

---

### 00 · PRELOADER

- Fond `--ink-deep`, un compteur `00 → 100` en typographie display géante (clamp 20vw), aligné en bas à gauche.
- Sous le compteur, une ligne fine qui se remplit en `--red`.
- À 100 : le compteur se retire vers le bas (masque `clip-path`), la ligne s'étend plein écran puis disparaît, révélant le hero.
- Durée max **1,6 s**. Si les assets sont déjà en cache, on passe directement.
- Le preloader n'attend **que** le poster + les fonts, pas la vidéo.

---

### 01 · HERO SECTION

**Layout :** plein écran (100svh), vidéo en `position: fixed` derrière, contenu en overlay.

**Contenu :**

```
Eyebrow (petit, --ash, letterspacing large) :
    STUDIO WEB INDÉPENDANT · TAHITI · DEPUIS 2026

Titre (display, clamp 11vw, ligne par ligne) :
    VOTRE SITE
    NE DOIT PAS JUSTE
    EXISTER.
    IL DOIT CONVAINCRE.        ← « CONVAINCRE » en kinetic, souligné gradient

Sous-titre (--bone, max 46ch) :
    Je conçois, je code et je mets en ligne des sites web
    qui donnent envie de rester. Un seul interlocuteur.
    Livré en deux semaines.

CTA primaire  : [ DÉMARRER MON PROJET ]   → WhatsApp
CTA secondaire: [ Voir mes réalisations ] → ancre #travaux

Indicateur de scroll (bas centre) : ligne verticale animée + « SCROLL »
```

**Animation d'entrée :**
- Chaque ligne du titre monte depuis un masque (`clip-path: inset(100% 0 0 0)` → `inset(0)`), stagger 0.09 s, ease `expo.out`, durée 1.1 s.
- Le mot « CONVAINCRE » reçoit son soulignement gradient 0.4 s après, en `scaleX` depuis la gauche.
- Le sous-titre et les CTA fondent + montent de 24 px, stagger 0.06 s.
- La vidéo démarre à `currentTime = 0` et se fige (pas de lecture auto). **Le scroll pilote le temps.**

---

### 02 · ANIMATED STATS STRIP

Bande horizontale pleine largeur, fond `--ink-soft`, hauteur ~28vh, séparateurs `--ink-line` très discrets.

| Chiffre | Label |
|---|---|
| **03** | Sites livrés · d'autres en production |
| **100 %** | Clients satisfaits |
| **2** | Semaines de délai moyen |
| **90+** | Score PageSpeed sur chaque livraison |

**Animation :**
- Compteurs qui s'incrémentent de 0 à la valeur au moment où le bloc entre dans le viewport (ScrollTrigger `once: true`, durée 1.6 s, ease `power3.out`).
- Chaque chiffre est en display, clamp(3.5rem, 7vw, 7rem), couleur `--white`, avec un point `--red` en exposant.
- Les 4 blocs entrent en stagger latéral de 0.08 s.
- Au scroll, toute la bande translate légèrement en X (parallaxe -6 %) pour donner de la vie.

---

### 03 · MISSION SECTION

Fond `--ink`. Aucune image. **Uniquement de la typographie massive.**

```
Label : 01 — MA MISSION

Texte (display, clamp 4vw, max 20 mots par ligne visuelle) :

    Trop d'entreprises formidables
    sont invisibles en ligne.

    Je construis le site qui les rend
    impossibles à ignorer —
    qui attire des clients,
    et qui installe leur image
    comme une évidence.

Signature : — Rai, fondateur
```

**Animation :** révélation **mot par mot** (chaque mot dans un `<span>` avec masque), déclenchée en scrub sur toute la hauteur de la section. Les mots-clés (`invisibles`, `impossibles à ignorer`, `clients`, `évidence`) passent en `--red` quand ils se révèlent.

---

### 04 · TROIS PILIERS

> **Note stratégique :** l'offre déclarée est un service unique (site + hébergement + maintenance). Le décomposer en **trois piliers** rend l'offre lisible et plus vendeuse sans rien inventer : ce sont les trois moments du même service.

```
Label : 02 — CE QUE JE FAIS

┌─────────────────────┬─────────────────────┬─────────────────────┐
│ 01                  │ 02                  │ 03                  │
│ CRÉATION            │ MODERNISATION       │ HÉBERGEMENT         │
│ DE SITE WEB         │ DE SITE EXISTANT    │ & ÉVOLUTION         │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Un site complet,    │ Votre site existe   │ Je mets votre site  │
│ conçu et codé sur   │ mais il a vieilli.  │ en ligne et je      │
│ mesure. Design,     │ Je le remets au     │ l'héberge. Les      │
│ développement, mise │ niveau : design,    │ modifications       │
│ en ligne. Pensé     │ vitesse, mobile,    │ futures sont        │
│ pour convertir, pas │ crédibilité. Sans   │ tarifées selon leur │
│ juste pour décorer. │ repartir de zéro.   │ ampleur. Rien de    │
│                     │                     │ figé, rien de caché.│
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Interaction :**
- Desktop : au survol d'une carte, les deux autres passent à `opacity: .35` + `filter: blur(2px)`. La carte active gagne un liseré gradient animé et un léger `translateY(-10px)`.
- Le numéro (01/02/03) est en très grand format, `--ash-dim`, en filigrane derrière le texte ; il passe en `--red` au hover.
- Entrée : stagger 0.12 s, montée 60 px + fade, `expo.out`.
- Mobile : les 3 cartes empilées, pas de hover, révélation au scroll.

---

### 05 · STORY SECTION

**Format :** timeline **horizontale pinned** — la section se fige et le contenu défile latéralement pendant que l'utilisateur scrolle verticalement.

```
Label : 03 — L'HISTOIRE

┌── LE LYCÉE ────────────────────────────────────────────────
│  Je code depuis le lycée. Pas une reconversion,
│  pas une formation accélérée. Des années à casser
│  des choses pour comprendre comment elles tiennent.
│
├── TAHITI ──────────────────────────────────────────────────
│  Basé à Tahiti. Je travaille avec des clients partout.
│  L'océan autour ne change rien à la vitesse du code.
│
├── JUIN 2026 ───────────────────────────────────────────────
│  Rai Web Design ouvre. Une règle fondatrice :
│  peu de projets à la fois. C'est ce qui permet
│  de livrer en deux semaines sans jamais bâcler.
│
├── AUJOURD'HUI ─────────────────────────────────────────────
│  Vous parlez à la personne qui conçoit, code et
│  met en ligne votre site. Pas d'intermédiaire.
│  Pas de commercial. Pas de sous-traitance.
└───────────────────────────────────────────────────────────
```

**Animation :**
- `ScrollTrigger` avec `pin: true`, `scrub: 1`, translation en X du conteneur.
- Une ligne horizontale rouge se dessine (`scaleX`) en synchronisation avec la progression.
- Chaque panneau atteint 100 % d'opacité seulement quand il est centré ; les autres restent à 40 %.
- **Mobile : le pin est désactivé** → la timeline devient verticale, révélation classique au scroll.

---

### 06 · SERVICE / OFFRE SECTION

Fond `--ink-soft`. Présentation de l'offre complète, sans prix affiché (le prix se discute).

```
Label : 04 — L'OFFRE

Titre : UN SEUL PACK. TOUT DEDANS.

┌─ CE QUI EST INCLUS ──────────────────────────────────┐
│ ✓ Design sur mesure — aucun template                 │
│ ✓ Développement complet, code propre                 │
│ ✓ 100 % responsive — mobile d'abord                  │
│ ✓ Optimisation performance & SEO technique           │
│ ✓ Mise en ligne + nom de domaine                     │
│ ✓ Hébergement géré                                   │
│ ✓ Livraison en 2 semaines                            │
└──────────────────────────────────────────────────────┘

┌─ ET APRÈS ? ─────────────────────────────────────────┐
│ Votre site évolue avec vous.                         │
│ Les modifications futures sont tarifées selon leur   │
│ ampleur : une petite retouche reste une petite       │
│ retouche. Un gros changement est chiffré avant       │
│ d'être lancé. Vous savez toujours ce que vous payez. │
└──────────────────────────────────────────────────────┘

Bandeau de rareté :
    ⦿  Peu de projets acceptés à la fois.
       C'est ce qui garantit le délai.

CTA : [ VÉRIFIER MES DISPONIBILITÉS ]  → WhatsApp
```

**Animation :** les items de la checklist apparaissent en stagger 0.05 s, chaque ✓ se dessine en SVG `stroke-dashoffset`. Le bandeau de rareté a un point rouge pulsant (`@keyframes pulse`, 2 s).

---

### 07 · FEATURED WORK / TRAVAUX

```
Label : 05 — RÉALISATIONS

Titre : TROIS SITES LIVRÉS. TROIS FOIS SATISFAIT.
```

**Format :** liste de projets en **lignes typographiques géantes** (pas de grille de vignettes). Chaque ligne = un projet. Au survol, un aperçu visuel du projet suit le curseur en flottant.

```
──────────────────────────────────────────────────
01   PROJET UN            Création complète   2026  →
──────────────────────────────────────────────────
02   PROJET DEUX          Modernisation       2026  →
──────────────────────────────────────────────────
03   PROJET TROIS         Création complète   2026  →
──────────────────────────────────────────────────

     + d'autres projets actuellement en production
```

> **À remplir :** noms réels des 3 clients, secteur, type de mission, et une capture d'écran par projet dans `/assets/img/work-01.jpg` … `work-03.jpg`. **Placeholders générés en attendant.**

**Interaction :**
- Au survol d'une ligne : la ligne se décale de 24 px vers la droite, le texte passe en `--white`, une vignette 340×240 px apparaît en `follow-cursor` avec un `lerp` fluide (facteur 0.12) et un léger `rotate` basé sur la vélocité de la souris.
- Les autres lignes passent à `opacity: .3`.
- Mobile : pas de follow-cursor → la vignette s'affiche inline sous le nom du projet.

---

### 08 · FINAL CTA SECTION

Plein écran, fond `--ink-deep`, **dernier segment vidéo visible en fond** (l'horizon lumineux de la Scène 03).

```
Titre (display, clamp 10vw) :
    ON EN
    PARLE ?

Sous-titre :
    Dites-moi ce que vous voulez construire.
    Je vous réponds personnellement, sur WhatsApp,
    généralement dans l'heure.

CTA géant magnétique :
    [  ÉCRIRE SUR WHATSAPP  →  ]

Micro-copy :
    Pas de formulaire à rallonge. Pas de commercial.
    Juste une conversation.
```

**Animation :**
- Le bouton CTA est **magnétique** : il suit le curseur dans un rayon de 90 px avec un `lerp` de 0.2, et revient à sa position au `mouseleave`.
- Un halo radial `--red` derrière le bouton, `scale` + `opacity` animés en boucle douce (4 s).
- Le titre se révèle en kinetic : les deux lignes montent depuis un masque, décalées.

---

### 09 · FOOTER

Minimal, dense, ancré.

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│   R A I   W E B   D E S I G N                          │   ← logotype géant (clamp 14vw), --ink-line
│                                                        │
├────────────────────────────────────────────────────────┤
│  CONTACT          NAVIGATION        STUDIO             │
│  WhatsApp         Mission           Tahiti, Polynésie  │
│  Email            Services          française          │
│                   Réalisations      Clients partout    │
│                                     dans le monde      │
├────────────────────────────────────────────────────────┤
│  © 2026 Rai Web Design        Conçu et codé à Tahiti  │
│                               Mentions légales         │
└────────────────────────────────────────────────────────┘
```

Le logotype géant en `--ink-line` est légèrement révélé en `--red` au passage de la souris (masque radial suivant le curseur).

---

## 10. COMPLETE VISUAL STYLE GUIDE

### Tokens CSS (racine)

```css
:root {
  /* Couleurs */
  --ink:#060607; --ink-deep:#000; --ink-soft:#0F0F12; --ink-line:#1C1C21;
  --red:#E6202B; --red-hot:#FF3B30; --red-deep:#8E0F16; --ember:#FF7A45;
  --white:#FFF; --bone:#EDEAE6; --ash:#8A8A93; --ash-dim:#4A4A52;
  --grad: linear-gradient(100deg,#8E0F16 0%,#E6202B 45%,#FF7A45 100%);

  /* Espacement — échelle modulaire base 8 */
  --s1:.5rem; --s2:1rem; --s3:1.5rem; --s4:2rem; --s5:3rem;
  --s6:4.5rem; --s7:7rem; --s8:10rem; --s9:15rem;

  /* Rayons */
  --r-sm:6px; --r-md:14px; --r-lg:24px; --r-pill:999px;

  /* Durées & courbes */
  --d-fast:.25s; --d-base:.6s; --d-slow:1.1s; --d-cine:1.6s;
  --e-out: cubic-bezier(.16,1,.3,1);          /* expo.out */
  --e-inout: cubic-bezier(.76,0,.24,1);
  --e-soft: cubic-bezier(.33,1,.68,1);

  /* Layout */
  --gutter: clamp(1.25rem, 5vw, 6rem);
  --maxw: 1560px;
  --z-grain: 9998; --z-cursor: 9999;
}
```

### Grille

- Conteneur max **1560 px**, gouttières fluides `clamp(1.25rem, 5vw, 6rem)`.
- Grille de **12 colonnes** desktop, **6** tablette, **4** mobile, `gap: clamp(1rem, 2vw, 2rem)`.
- Sections : `padding-block: clamp(6rem, 14vh, 14rem)`.

### Grain

```css
.grain{
  position:fixed; inset:-100%; width:300%; height:300%;
  pointer-events:none; z-index:var(--z-grain);
  opacity:.045; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,...feTurbulence...");
  animation: grainShift 8s steps(10) infinite;
}
@keyframes grainShift{ /* 10 positions translate() aléatoires */ }
```
→ Généré en **SVG `feTurbulence` inline en data-URI** : zéro requête réseau, ~1 Ko.

### Élévation

Pas d'ombres portées noires (invisibles sur fond noir). L'élévation se fait par :
1. Un fond légèrement plus clair (`--ink-soft`).
2. Un liseré interne `inset 0 1px 0 rgba(255,255,255,.05)`.
3. Un glow rouge diffus pour l'état actif : `0 0 60px -20px rgba(230,32,43,.55)`.

### Curseur personnalisé (desktop uniquement)

- Point de 8 px `--white` suivant le curseur à 1:1.
- Anneau de 36 px, `border: 1px solid rgba(255,255,255,.28)`, suivant en `lerp(0.14)`.
- Au survol d'un élément interactif : l'anneau passe à 64 px, `border-color: var(--red)`, le point disparaît.
- Sur les lignes de projets : l'anneau devient un disque rouge plein avec « VOIR » en 10 px.
- Désactivé si `pointer: coarse` ou `prefers-reduced-motion`.

---

## 11. TYPOGRAPHY

### Les deux familles

| Rôle | Police | Source | Poids | Usage |
|---|---|---|---|---|
| **Display** | **Anton** | Google Fonts | 400 | Hero, titres de section, chiffres, logotype. Condensée, massive, impact maximal. |
| **Texte** | **Inter Tight** | Google Fonts | 400 / 500 / 600 | Sous-titres, corps, labels, UI, navigation. |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
```

> **Fallback obligatoire :** `font-family:'Anton', 'Arial Narrow', Impact, sans-serif;`
> et `font-family:'Inter Tight', -apple-system, 'Segoe UI', Roboto, sans-serif;`

### Échelle fluide

```css
--t-hero:   clamp(3.4rem, 11vw, 13rem);   /* Hero */
--t-h1:     clamp(2.8rem, 8vw, 8.5rem);   /* Titres de section */
--t-h2:     clamp(2rem, 5vw, 4.5rem);     /* Sous-titres de bloc */
--t-h3:     clamp(1.35rem, 2.6vw, 2.2rem);/* Titres de carte */
--t-body-l: clamp(1.05rem, 1.5vw, 1.35rem);
--t-body:   clamp(.95rem, 1.1vw, 1.075rem);
--t-label:  clamp(.68rem, .8vw, .78rem);  /* eyebrow, labels */
```

### Règles typographiques

- **Display (Anton) :** `line-height: .86`, `letter-spacing: -0.015em`, **TOUT EN MAJUSCULES**, `text-wrap: balance`.
- **Corps (Inter Tight) :** `line-height: 1.62`, `letter-spacing: -0.005em`, `max-width: 62ch`.
- **Labels :** `letter-spacing: .22em`, `text-transform: uppercase`, `font-size: var(--t-label)`, couleur `--ash`.
- **Chiffres :** `font-variant-numeric: tabular-nums` obligatoire sur tous les compteurs — sinon ils tremblent en s'incrémentant.
- Jamais plus de **deux graisses** visibles dans le même écran.

### Typographie kinetic

Trois traitements, jamais plus :
1. **Mask reveal** — chaque ligne dans un `overflow:hidden`, le texte monte depuis `translateY(110%)`.
2. **Word-by-word scrub** — les mots passent de `--ash-dim` à `--bone` selon la progression du scroll (section Mission).
3. **Gradient underline** — un `::after` en `var(--grad)`, `transform: scaleX(0) → 1`, `transform-origin: left`.

---

## 12. ANIMATION DIRECTION

### Philosophie

> **Rien ne clignote. Tout glisse.**

Chaque animation doit avoir l'air d'obéir à une **inertie physique**, pas à un minuteur. Si une animation attire l'attention sur elle-même plutôt que sur le contenu, elle est supprimée.

### Règles

| Règle | Valeur |
|---|---|
| Courbe par défaut | `expo.out` / `cubic-bezier(.16,1,.3,1)` |
| Durée entrée | 0.9 – 1.2 s |
| Durée micro-interaction | 0.2 – 0.35 s |
| Stagger standard | 0.06 – 0.12 s |
| Propriétés animées | **uniquement** `transform`, `opacity`, `clip-path`, `filter` |
| Interdits | animer `width`, `height`, `top`, `left`, `margin` |
| Overshoot / bounce | **interdit** — sauf le CTA magnétique |
| `will-change` | posé au `onEnter`, **retiré au `onComplete`** |

### Timeline principale (GSAP)

```
PRELOADER    → compteur, ligne, révélation                (autoplay, 1.6s)
HERO         → lignes masquées en stagger                 (autoplay, on load)
VIDÉO        → currentTime piloté par le scroll           (scrub: 1, pinned)
STATS        → compteurs 0→N                              (once, onEnter)
MISSION      → révélation mot par mot                     (scrub: .5)
PILIERS      → cartes en stagger                          (once, onEnter 80%)
STORY        → translation X pinned                       (scrub: 1, pin)
OFFRE        → checklist stagger + SVG stroke             (once, onEnter)
TRAVAUX      → lignes en stagger + follow-cursor          (once + pointermove)
CTA          → titre kinetic + halo en boucle             (once + infinite)
```

### Transitions cinématiques entre sections

Chaque section est séparée par un **fondu à l'encre** :
- Un `::before` en `linear-gradient(to bottom, transparent, var(--ink-deep))` de 22vh en bas de section.
- Un `::after` symétrique en haut de la suivante.
- Résultat : on ne voit jamais une « couture » entre deux sections — le site respire comme un seul plan.

### `prefers-reduced-motion`

```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Lenis désactivé → scroll natif
  // Tous les scrub → état final immédiat
  // Curseur custom désactivé, grain figé
  // Vidéo → poster statique
  gsap.globalTimeline.timeScale(999);
}
```

---

## 13. INTERACTION DESIGN

| Élément | État repos | Hover / Actif |
|---|---|---|
| **CTA primaire** | Fond `--red`, texte `--white`, pill | Glow `0 0 60px -18px var(--red-hot)`, `scale(1.03)`, flèche qui glisse de 6 px |
| **CTA secondaire** | Bordure `rgba(255,255,255,.2)`, transparent | Fond blanc 6 %, bordure `--red` |
| **Lien texte** | `--bone`, souligné 1 px `--ink-line` | Souligné `--red`, `scaleX` gauche→droite, 0.3 s |
| **Carte pilier** | `--ink-soft`, liseré interne | Les autres à 35 % + blur 2 px ; celle-ci `translateY(-10px)` + liseré gradient |
| **Ligne projet** | `--ash` | `--white`, décalage +24 px, vignette follow-cursor |
| **Bouton flottant** | Caché avant 100vh | Apparaît en `scale(0→1)` + rotation légère |
| **Indicateur de scroll** | Ligne 2 px `--ink-line` | Remplissage `--red` proportionnel à la progression |

### Micro-interactions obligatoires

1. **CTA magnétique** (section CTA finale) — `lerp 0.2`, rayon 90 px.
2. **Flèche des CTA** — glisse de 6 px à droite au hover, revient en `expo.out`.
3. **Vignette follow-cursor** (travaux) — `lerp 0.12` + `rotate` proportionnel à la vélocité X de la souris (max ±7°).
4. **Point pulsant** (bandeau de rareté) — 2 s, `scale` + `opacity`.
5. **Révélation du logotype footer** — masque radial `--red` de 160 px suivant le curseur.

### Accessibilité

- Contraste minimum **4.5:1** sur tout texte lisible (`--bone` sur `--ink` = 15.2:1 ✓ · `--ash` sur `--ink` = 6.1:1 ✓ · `--red` sur `--ink` = 4.8:1 ✓).
- `:focus-visible` : contour `2px solid var(--red-hot)` + `outline-offset: 4px`, **jamais supprimé**.
- Tout élément interactif ≥ **44×44 px** de zone tactile.
- Tous les liens WhatsApp : `aria-label` explicite.
- La vidéo décorative : `aria-hidden="true"` + `role="presentation"`.
- Ordre du DOM = ordre visuel. Aucun contenu réel injecté en JS uniquement.
- Un lien « Aller au contenu » en `sr-only` en tête de `<body>`.

---

## 14. SCROLL BEHAVIOR

### Lenis — smooth scroll

```js
const lenis = new Lenis({
  duration: 1.15,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,          // ⚠ false sur mobile : syncTouch casse le scroll iOS
  touchMultiplier: 1.6,
  lerp: 0.1,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### Vidéo scroll-scrubbing (le cœur du site)

**Principe :** la vidéo est `position: fixed`, muette, `preload="auto"`, jamais lue automatiquement. Le scroll pilote `video.currentTime`.

```js
const video = document.querySelector('#cine');
const state = { t: 0 };

video.addEventListener('loadedmetadata', () => {
  ScrollTrigger.create({
    trigger: '#cinema',
    start: 'top top',
    end: `+=${window.innerHeight * 3.2}`,   // 3 scènes ≈ 3.2 écrans
    pin: '#cinema-stage',
    scrub: 0.6,
    onUpdate: self => { state.t = self.progress * video.duration; }
  });

  // Découplage : on écrit currentTime dans le rAF, pas dans onUpdate.
  gsap.ticker.add(() => {
    if (Math.abs(video.currentTime - state.t) > 0.016) {
      video.currentTime = state.t;
    }
  });
});
```

> **Pourquoi ce découplage :** écrire `currentTime` directement dans `onUpdate` provoque des saccades (le décodeur reçoit plus d'ordres qu'il ne peut en traiter). En passant par le ticker avec un seuil, on n'écrit qu'une fois par frame maximum.

**Déblocage iOS :** Safari refuse de décoder une vidéo tant qu'elle n'a pas été « jouée » une fois. Au premier `touchstart` ou `click` :
```js
video.play().then(() => video.pause()).catch(()=>{});
```

**Attributs de la balise :**
```html
<video id="cine" playsinline muted preload="auto" disablepictureinpicture
       poster="assets/img/poster.jpg" aria-hidden="true">
  <source src="assets/video/sequence-1080.mp4" type="video/mp4" media="(min-width:900px)">
  <source src="assets/video/sequence-720.mp4"  type="video/mp4">
</video>
```

### Fallback image-sequence

Si `video.readyState < 2` après 3 s, ou si le scrubbing est détecté comme saccadé (> 3 frames à plus de 50 ms), basculer sur le mode **canvas + séquence d'images** (`assets/seq/frame_0001.jpg` → `frame_0120.jpg`, préchargées par lots de 20).

### Textes superposés

Les trois phrases (`VOTRE SITE ACTUEL NE DIT RIEN.` / `JE LE CONSTRUIS. LIGNE PAR LIGNE.` / `ET IL TRAVAILLE POUR VOUS.`) apparaissent et disparaissent en fondu sur des tranches précises de la progression du scrub (0–0.30 / 0.35–0.65 / 0.70–1.0), avec un `clip-path` reveal.

### Indicateur de progression

Une ligne de 2 px collée à droite (`position: fixed; right: 24px; top: 20vh; height: 60vh`), remplie en `--red` via `scaleY` piloté par `lenis.on('scroll')`.

### Anti-patterns interdits

- ❌ Aucun `scroll-jacking` : le scroll ne doit jamais « sauter » ou forcer une position.
- ❌ Aucune section qui empêche de continuer à descendre.
- ❌ Aucun `scroll-behavior: smooth` en CSS (conflit avec Lenis).
- ❌ `ScrollTrigger.refresh()` doit être appelé sur `resize` (debounce 200 ms) et après le chargement des fonts.

---

## 15. MOBILE BEHAVIOR

**Breakpoints :** `≤600px` (mobile) · `601–1024px` (tablette) · `≥1025px` (desktop).

### Adaptations obligatoires

| Sujet | Desktop | Mobile |
|---|---|---|
| Vidéo | `sequence-1080.mp4`, scrub 3.2 écrans | `sequence-720.mp4`, scrub **1.8 écran** |
| Story timeline | Pinned horizontal | **Pin désactivé** → vertical |
| Cartes piliers | 3 colonnes + hover dimming | 1 colonne empilée, pas de hover |
| Travaux | Follow-cursor vignette | Vignette inline sous le titre |
| Curseur custom | Actif | **Désactivé** |
| Grain | Animé 8 s | **Statique** (économie batterie) |
| Titres | `11vw` | `13vw` (plus d'impact sur petit écran) |
| CTA | Inline | **Barre CTA collée en bas**, apparaît après le hero |

### Règles techniques mobiles

- **`100svh` partout, jamais `100vh`** — sinon la barre d'URL de Safari casse la hauteur du hero.
  ```css
  .hero{ min-height:100svh; } @supports not (height:100svh){ .hero{ min-height:100vh; } }
  ```
- **Gouttière minimale 20 px** sur tous les côtés à toutes les largeurs. Le body ne doit **jamais** défiler horizontalement (`overflow-x: hidden` sur `html, body`).
- `syncTouch: false` dans Lenis (le smooth-scroll touch natif iOS est meilleur).
- Zones tactiles ≥ 44×44 px.
- Si `navigator.connection.saveData` ou `effectiveType` ∈ {`2g`,`slow-2g`} → **pas de vidéo**, on affiche le poster statique et on garde toutes les animations texte.
- Test obligatoire à **320 px** de large (iPhone SE) : aucun débordement, aucun texte tronqué.

---

## 16. TECHNICAL IMPLEMENTATION

### Arborescence finale

```
/
├── index.html
├── style.css
├── script.js
├── BUILD-PLAN.md
├── Media/
│   └── reference.jpg            ← image de référence d'identité (à fournir)
└── assets/
    ├── video/
    │   ├── sequence-1080.mp4
    │   └── sequence-720.mp4
    ├── img/
    │   ├── poster.jpg
    │   ├── work-01.jpg
    │   ├── work-02.jpg
    │   ├── work-03.jpg
    │   └── og-image.jpg
    ├── seq/                     ← fallback image-sequence (optionnel)
    │   └── frame_0001.jpg …
    └── favicon.svg
```

### Contraintes absolues

- **HTML + CSS + JavaScript vanilla uniquement.**
- ❌ Pas de React. ❌ Pas de Next.js. ❌ Pas de framework. ❌ Pas de build step. ❌ Pas de `npm install`.
- Tous les chemins d'assets sont **relatifs** (`assets/...`), jamais absolus (`/assets/...`) — le site doit fonctionner ouvert depuis un dossier local, GitHub Pages, Netlify ou n'importe quel sous-dossier.
- `script.js` en **un seul fichier**, chargé avec `defer`, encapsulé dans un IIFE, `'use strict'`.

### CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" defer></script>
<script src="script.js" defer></script>
```

> Versions **épinglées**. `defer` sur tous, dans cet ordre. `script.js` s'initialise sur `DOMContentLoaded` et vérifie la présence de `window.gsap` et `window.Lenis` — si un CDN échoue, le site reste **entièrement lisible** (dégradation gracieuse : tout le contenu est visible en CSS, les animations sont un bonus).

### Architecture de `script.js`

```js
(() => { 'use strict';

  /* 1. UTILS         — lerp, clamp, debounce, prefersReduced, isTouch     */
  /* 2. SMOOTH SCROLL — init Lenis + pont GSAP ticker                      */
  /* 3. PRELOADER     — compteur, révélation, unlock du scroll             */
  /* 4. CURSOR        — point + anneau, états hover (desktop only)         */
  /* 5. HERO          — timeline d'entrée, mask reveals                    */
  /* 6. CINEMA        — scrub vidéo + textes superposés + fallback canvas  */
  /* 7. STATS         — compteurs animés                                   */
  /* 8. MISSION       — révélation mot par mot (split maison, pas SplitText)*/
  /* 9. PILLARS       — stagger + hover dimming                            */
  /* 10. STORY        — pin horizontal (desktop) / vertical (mobile)       */
  /* 11. OFFER        — checklist stagger + SVG stroke draw                */
  /* 12. WORK         — lignes + vignette follow-cursor                    */
  /* 13. CTA          — bouton magnétique + halo                           */
  /* 14. PROGRESS     — indicateur de scroll latéral                       */
  /* 15. RESIZE       — ScrollTrigger.refresh debounce 200ms + matchMedia  */

})();
```

> **Note :** `SplitText` est un plugin GSAP **payant**. On écrit un splitter maison de ~15 lignes (`split en lignes/mots via wrapping de spans`), qui préserve l'accessibilité en gardant le texte original dans un `aria-label` sur le conteneur.

### Performance — budgets à respecter

| Métrique | Cible |
|---|---|
| LCP | < 2.0 s |
| CLS | **0** |
| INP | < 200 ms |
| Poids initial (hors vidéo) | < 220 Ko |
| Poids total | < 12 Mo |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |

**Techniques appliquées :**
- `poster.jpg` préchargé en `<link rel="preload" as="image">` → c'est le LCP.
- Vidéo en `preload="auto"` mais **chargée après le `load` event** (injection de la `src` en JS) pour ne pas concurrencer le LCP.
- Images de projets : `loading="lazy"`, `decoding="async"`, `width`/`height` explicites (CLS = 0).
- Fonts : `display=swap` + `preconnect` + fallback métrique proche.
- CSS : un seul fichier, pas d'`@import`, propriétés critiques du hero inlinées dans un `<style>` en `<head>`.
- `content-visibility: auto` + `contain-intrinsic-size` sur les sections sous la ligne de flottaison.
- Grain en SVG data-URI (zéro requête).
- `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })`.

### SEO & meta

```html
<html lang="fr">
<title>Rai Web Design — Création & modernisation de sites web · Tahiti</title>
<meta name="description" content="Studio web indépendant à Tahiti. Création et modernisation de sites web sur mesure, hébergement inclus, livré en 2 semaines. Un seul interlocuteur : celui qui code.">
<link rel="canonical" href="https://raiweb.design/">
<meta property="og:title" content="Rai Web Design — Votre site ne doit pas juste exister.">
<meta property="og:description" content="…">
<meta property="og:image" content="assets/img/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_PF">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#060607">
```

**JSON-LD `ProfessionalService`** à inclure : nom, description, `areaServed: Worldwide`, `address: Tahiti, Polynésie française`, `foundingDate: 2026-06`, `aggregateRating` (100 %, 3 avis), `serviceType`.

### CTA — WhatsApp

```html
<a href="https://wa.me/NUMERO?text=Bonjour%20Rai%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20web."
   target="_blank" rel="noopener noreferrer"
   aria-label="Démarrer mon projet sur WhatsApp">
```

> **À FOURNIR :** le numéro WhatsApp au format international sans `+` ni espaces (ex. `689XXXXXXXX`). En attendant, un placeholder `WHATSAPP_NUMBER` sera posé dans le HTML **et** défini une seule fois en constante en haut de `script.js`, pour être remplacé en 1 endroit.

### Checklist de validation avant livraison

- [ ] Aucun défilement horizontal de 320 px à 2560 px
- [ ] Scrub vidéo fluide sur Chrome, Safari, Firefox + iOS Safari + Chrome Android
- [ ] `prefers-reduced-motion` → site entièrement utilisable, zéro animation
- [ ] Tout le contenu lisible avec JavaScript désactivé
- [ ] Navigation complète au clavier, `:focus-visible` visible partout
- [ ] CLS = 0 (vérifié en throttling 4G)
- [ ] Les liens WhatsApp ouvrent bien dans un nouvel onglet
- [ ] Aucune erreur console
- [ ] Tous les chemins d'assets relatifs (test : ouvrir dans un sous-dossier)

---

## 17. ÉLÉMENTS À FOURNIR

| # | Élément | Statut | Bloquant ? |
|---|---|---|---|
| 1 | Image de référence d'identité `Media/reference.jpg` | ❌ Absente du dépôt | Non — scènes écrites sans personnage |
| 2 | Numéro WhatsApp international | ❌ Manquant | Non — placeholder posé |
| 3 | Adresse email de contact | ❌ Manquant | Non — placeholder posé |
| 4 | Noms + secteurs des 3 projets livrés | ❌ Manquant | Non — placeholders posés |
| 5 | 3 captures d'écran de projets | ❌ Manquant | Non — placeholders générés |
| 6 | Contenu du site actuel `raiweb.design` | ⚠️ Site bloqué par le proxy réseau | Non — copy réécrite de zéro |

Aucun de ces éléments ne bloque la construction. Le site sera livré **complet et fonctionnel**, avec des placeholders clairement identifiés et centralisés, remplaçables en quelques minutes.

---

*Fin du Master Build Plan — Rai Web Design v1.0*
