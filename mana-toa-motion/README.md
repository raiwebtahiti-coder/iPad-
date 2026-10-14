# Mana Tō'a · langage de motion

Quatre motions permanentes pour la boutique Shopify, indépendantes des drops. HTML, CSS et JavaScript vanilla, aucune
librairie, classes préfixées `mt-`. On n'anime que `transform`, `opacity` et `clip-path`.

| Fichier | Rôle |
|---|---|
| `assets/mt-motion.css` | les 4 motions + jetons (couleurs, courbes, durées) + version calme `prefers-reduced-motion` |
| `assets/mt-motion.js` | déclencheurs (tactile, apparition, menu, chargement, scroll de la devise) ; s'initialise seul |
| `snippets/mt-card.liquid` | carte produit : coins du ring + face / dos |
| `snippets/mt-heading.liquid` | titre avec le trait du Ō |
| `snippets/mt-logo.liquid` | mot-symbole, la barre du Ō se trace au chargement |
| `snippets/mt-nav.liquid` | menu, le trait glisse au-dessus du lien actif |
| `snippets/mt-never-stay-down.liquid` | la devise, une seule fois sur le site |
| `demo/index.html` | page de démonstration autonome (`demo/build.py` la reconstruit) |

## Intégration dans le thème

1. Copie `mt-motion.css` et `mt-motion.js` dans `assets/`, et les 5 fichiers de `snippets/` dans `snippets/`.
2. Dans `layout/theme.liquid`, avant `</head>` :
   ```liquid
   {{ 'mt-motion.css' | asset_url | stylesheet_tag }}
   <script src="{{ 'mt-motion.js' | asset_url }}" defer></script>
   ```
3. Remplace la carte produit des collections par `{% render 'mt-card', product: product %}` (la 2e photo du produit
   sert de dos ; sans 2e photo, la carte garde ses coins et ne pivote pas).
4. Titres de sections : `{% render 'mt-heading', text: section.settings.title %}`.
5. En-tête : `{% render 'mt-logo' %}` et `{% render 'mt-nav', menu: linklists['main-menu'] %}`.
6. Liens de texte : ajoute la classe `mt-link`.
7. La devise, une seule fois (page À propos ou bas de l'accueil) : `{% render 'mt-never-stay-down' %}`
   (option : `knight_image: section.settings.image` pour poser le chevalier au-dessus).

La barre de chargement suit seule les ajouts au panier (`fetch` vers `/cart/add`, `/cart/change`…) et les changements
de page. Pour un autre appel : `MT.loader.start()` puis `MT.loader.done()`. Dans l'éditeur de thème, les sections
rechargées sont ré-initialisées (`shopify:section:load`) ; pour du contenu injecté à la main : `MT.refresh(element)`.

## Les jetons

| Jeton | Valeur | Usage |
|---|---|---|
| `--mt-ease-out` | `cubic-bezier(.16, 1, .3, 1)` | ce qui arrive : rapide puis longue décélération |
| `--mt-ease-in` | `cubic-bezier(.55, 0, .75, .2)` | ce qui part : discret |
| `--mt-ease-inout` | `cubic-bezier(.65, 0, .35, 1)` | passage d'un état à l'autre (menu, face / dos) |
| `--mt-ease-ink` | `cubic-bezier(.77, 0, .18, 1)` | un trait d'encre : départ retenu, fin posée |
| durées | 160 / 240 / 380 / 640 / 760 ms | aucune courbe à rebond : la marque est posée, pas joueuse |

Le doré (`--mt-gold`) n'apparaît qu'une fois : le trait sous la devise relevée.

## Les 4 motions

**1. Les coins du ring.** Intention : mettre un produit « dans le ring » sans toucher à la photo. Quatre coins de
1,5 px se tracent depuis leur angle ; les coins diagonaux (rouge et bleu) partent d'abord, les neutres 70 ms après, et
dans chaque coin le bras vertical suit l'horizontal de 40 ms. Entrée 380 ms `--mt-ease-out`, sortie 160 ms
`--mt-ease-in`. Mobile : pas de survol, donc la carte qui passe dans la bande centrale de l'écran pendant le défilement
entre dans le ring. Clavier : actif au focus. Calme : coins déjà tracés, fondu 240 ms.

**2. Le trait du Ō.** Intention : la barre du Ō devient la signature, un seul élément `.mt-bar` en 5 usages.
- Logo : la barre au-dessus du O se trace au chargement (760 ms `--mt-ease-ink`).
- Titres : le texte monte dans son cadre (`clip-path`, 640 ms), puis le trait se trace dessous (760 ms, +260 ms).
- Menu : un seul trait glisse AU-DESSUS du lien actif ou survolé, à la place du macron (380 ms `--mt-ease-inout`) ;
  menu en colonne sur mobile : chaque lien actif porte son trait, sans glissement.
- Chargement : le trait parcourt le haut de l'écran, ralentit sans jamais finir seul, puis se retire par la droite
  (640 ms `--mt-ease-ink`).
- Liens : tracé de gauche à droite (380 ms), repart par la droite (160 ms) ; tactile : trait fin permanent à 40 %.
- Calme : traits déjà là, titres en fondu sans déplacement.

**3. Face / dos.** Intention : retourner le tee comme en boutique. Rotation 3D de 180° sur l'axe vertical, 640 ms
`--mt-ease-inout`, perspective 1600 px, après 120 ms d'intention (la souris qui traverse la grille ne retourne rien) ;
retour sans attente. La photo du dos se charge dès que la souris entre sur la carte. Mobile : bouton rond « Voir le
dos » (40 px, en bas à droite de la photo), un second toucher remet la face, `aria-pressed` à jour. Calme : fondu de
240 ms entre les deux photos, sans rotation.

**4. Never stay down.** Intention : la devise, une seule fois sur le site. Pilotée par le défilement (fonction pure
de la progression, une seule mise à jour par image, seulement quand la section est à l'écran) : les lettres sont
envoyées au tapis dans le désordre (chute en accélération cubique, couchées entre 62 et 88°), un trait fin de tapis
apparaît, elles restent au sol, puis se relèvent dans l'ordre de lecture avec un léger dépassement ; le trait doré se
trace sous la devise relevée. Une fois debout, elles ne retombent plus même en remontant (`data-mt-nsd-lock="false"`
pour un geste rejouable). Hauteur 260 % d'écran (210 % sur mobile, unités `svh` pour iOS). Calme : la devise apparaît
debout en fondu, avec son trait doré.

## iPhone et iPad

- Survol réservé aux appareils `(hover: hover) and (pointer: fine)` : le `:hover` collant d'iOS ne déclenche rien.
- Rotation 3D : `-webkit-backface-visibility` et un `translateZ(1px)` sur chaque face, contre le scintillement de Safari.
- Scroll : écouteurs `passive`, `requestAnimationFrame`, `IntersectionObserver` ; `will-change` posé seulement pendant
  le geste de la devise, retiré ensuite.
- Le menu est mesuré une seule fois par changement de taille (`ResizeObserver`), jamais pendant l'animation.
