---
version: 1
name: "claude-intro · Bonjour, je suis Claude (30 s)"
unit: 1920×1080
reference: "reference/kit.html (code commun : polices, sols, grain, sous-titre, boîte, trait, caméra, curseur, frappe ; source UNIQUE)"
colors:
  paper: "#f4efe6"
  paper-light: "#fffdf9"
  ink: "#1c1a17"
  canvas: "#141312"
  ink-on-dark: "#f4efe6"
  accent: "#d97757"
  accent-light: "#e5946f"
  accent-glow: "#f0b49a"
  success: "#3f8f63"
fonts:
  Instrument Sans: { files: ["assets/fonts/InstrumentSans-400.woff2 (400)", "assets/fonts/InstrumentSans-500.woff2 (500)", "assets/fonts/InstrumentSans-600.woff2 (600)", "assets/fonts/InstrumentSans-700.woff2 (700)"] }
  Instrument Serif: { files: ["assets/fonts/InstrumentSerif-400.woff2 (400)", "assets/fonts/InstrumentSerif-400i.woff2 (400 italic)"] }
  JetBrains Mono: { files: ["assets/fonts/JetBrainsMono-400.woff2 (400)", "assets/fonts/JetBrainsMono-600.woff2 (600)"] }
---

# frame.md · claude-intro (« Bonjour, je suis Claude », 30 s)

La seule source de style. Le code commun (polices, sol, grain, sous-titre, boîte, trait, caméra, curseur, frappe)
est dans `reference/kit.html` : chaque séquence copie ses deux blocs (CSS et JS) MOT POUR MOT, avec les chemins
`../assets/` remplacés par `assets/`.

## Le film

Un film sans voix, lisible sans le son : la narration EST le sous-titre (bas centre, mot par mot). Une idée : **tout
commence par une phrase**. Une phrase tapée dans un champ de demande devient du code, le code devient une interface,
l'interface devient des données, les données deviennent un film, et le film revient au champ de demande : « À ton
tour. »

## Palette (rôles)

| rôle | valeur |
|---|---|
| night (monde sombre : ouverture et fin) | `#141312` (sol `.k-ground-dark`) |
| paper (monde clair) | `#f4efe6` (sol `.k-ground-paper`) |
| ink (texte, interfaces) | `#1c1a17` ; ink-2 `#2b2723` ; gris texte `#8a8378` ; filets `#e4ddd1` |
| card (interfaces claires) | `#fffdf9` |
| accent (le corail : mot clé, trait, caret, bouton, la barre record, le clip final, la tête de lecture) | `#d97757` |
| accent-light | `#e5946f` |
| accent-glow | `#f0b49a` |
| succès (tests, +23 %) | `#3f8f63` |
| code : mots clés `#b4553a`, chaînes `#3f7d5c`, balises `#3d5fc4`, commentaires `#a39b8e` |

Une seule couleur d'accent. Le vert seulement pour un succès réel (test réussi, hausse).

## Polices

- Instrument Serif 400 : moments typographiques (84 px au plus) et le nom « Claude ».
- Instrument Sans 400 à 700 : sous-titre (500, 62 px), interfaces.
- JetBrains Mono 400 et 600 : code, terminal, règle de la timeline.

## Sous-titre et mises en valeur

- Bande y 890 à 980, `.k-sub` (62 px, centré, 45 caractères au plus). Monde sombre : `.k-sub.k-on-dark`. Mot par mot
  (`kWord`, 0,16 s), sortie vers le haut en 0,14 s (`kLine`). Rien d'autre dans la bande.
- `[boîte : mot]` : `.k-box` + `.k-box-bg` corail, texte du mot passé en papier `#f4efe6` au moment où la boîte se
  trace (`kBox`, 0,16 s power3.out).
- `[trait : mot]` : `.k-trait` + `.k-trait-svg` (chemin effilé ci-dessous), `kTrait` 0,4 s power2.out.
  `<svg class="k-trait-svg" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 6 C 20 3.6, 60 3.2, 100 4.6 L 100 5.4 C 60 6.4, 20 8.6, 0 7.4 Z" fill="#d97757"/></svg>`

## Caméra

Un plan monde `#pNN-world` (`.k-layer`, 1920 x 1080) placé par `kCam(world, {x, y, s})` ; le flou caméra est
appliqué au même élément par `kBlur` (px écran). Un seul objet proxy `cam = {x, y, s, b}` écrit par UN `onUpdate`.
Deux vitesses : une dérive lente permanente (0,8 à 1,5 %/s d'échelle) et des crans rapides (0,4 à 0,5 s
power3.inOut) vers le sujet de la phrase. Jamais d'aller-retour. Chaque couture tombe au sommet d'un flou de caméra
(8 à 12 px). Le sous-titre est HORS du monde (couche au-dessus, jamais mise à l'échelle).

## Le monde de chaque séquence (coordonnées monde, px)

- **01 · le champ** (sombre) : phrase serif centrée y 540 ; carte de demande `.k-card.k-dark` 900 x 150 centrée en
  (960, 520), rayon 26, texte 34 px Instrument Sans à x 554 (marge intérieure 44), bouton d'envoi : disque corail
  64 px centré en (1354, 520) avec une flèche papier vers le haut.
- **02 · le code** (clair) : éditeur x 120 à 1100, y 150 à 850 ; terminal sombre x 1160 à 1800, y 150 à 470 ;
  panneau « Aperçu » x 1160 à 1800, y 510 à 850, son intérieur (y 550 à 850) montre la miniature du tableau de bord
  (ci-dessous) à l'échelle 0,36, centrée en (1480, 700). Marges gauche et droite : 120 px.
- **03 · le tableau de bord** (clair) : fenêtre x 160 à 1760, y 110 à 850 (centre (960, 480)) ; barre latérale encre
  x 160 à 400 ; titre « Tableau de bord » ; 3 cartes KPI y 250 à 420 : x 440 à 840, 880 à 1280, 1320 à 1720 ;
  tableau « Dernières commandes » x 440 à 1720, y 450 à 810.
- **04 · les données** (clair) : panneau blanc x 260 à 1660, y 140 à 820 ; barres (base y 760, largeur 120) en x 340,
  564, 788, 1012, 1236, 1460 ; hauteurs 150, 180, 165, 215, 245, 310 ; Jan à Juin ; encre `#2b2723`, Juin corail.
- **05 · le film** (clair) : 6 clips (180 x 56, rayon 10) en y 760 à 816, x = 360 + i × 204 ; règle au-dessus
  (y 735) ; écran d'aperçu sombre x 560 à 1360, y 150 à 600 (centre (960, 375)).
- **06 · à toi** (sombre) : « Claude » serif 64 px centré y 330 ; carte de demande comme en 01, centrée (960, 540) ;
  bouton pilule corail « Commencer → » 230 x 72 centré en (1240, 540).

## Interfaces

Dessinées en HTML/CSS, épurées, d'aujourd'hui : coins 14 à 20 px, ombres douces, beaucoup d'air, aucun texte « lorem ».
Aucun logo de marque, aucun produit réel imité. Le curseur arrive d'un seul geste courbe et clique directement
(`kCursor`).

## Mouvement

power3.out / expo.out, pas de rebond, sorties plus rapides que les entrées. Tout ce qui arrive arrive trop grand et
flou puis se pose (`kArrive`). Un événement toutes les 0,5 s. Tout nombre roule jusqu'à sa valeur. Transformations
seulement (x, y, scale, rotation, opacity, filter). GSAP local : `<script src="assets/vendor/gsap.min.js"></script>`
(jamais de CDN : le rendu se fait hors réseau).
