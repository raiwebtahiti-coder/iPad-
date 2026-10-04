---
format: 1920x1080
duration: 30.0s
message: "Bonjour, je suis Claude : donne-moi une phrase, j'en fais du code, une interface, une analyse, un film. À ton tour."
arc: Hook → Demande → Code → Design → Données → Film → CTA
audience: l'utilisateur de cette session, qui découvre ce que Claude sait faire avant de créer sa propre vidéo
mode: autonomous
captions: disabled
music: "pré-mixée avec les bruitages dans assets/audio/mix.wav (montée à la racine par l'orchestrateur) ; pas de voix : la narration est le sous-titre"
direction: "A · Tout commence par une phrase (direction unique, film de démonstration)"
styleframes: "aucun (film de démonstration autonome)"
patterns: ../patterns/STORYBOARD-CRAFT.md, ../patterns/PATTERNS.md
---

## Video direction

- **Un seul fil** : une phrase tapée dans un champ de demande se transforme, objet après objet : la phrase devient le
  commentaire en tête du code ; l'aperçu du code devient le tableau de bord ; la carte « Chiffre d'affaires » devient
  le graphique ; les barres du graphique se couchent et deviennent les clips d'une timeline de montage ; l'aperçu de
  la timeline devient la carte de fin, où le champ de demande revient.
- **Code commun** : `reference/kit.html` (CSS et JS copiés mot pour mot). Style : `frame.md`.
- **Coutures** : toutes en `cut`. 01 → 02 sous le flash de lumière de l'orchestrateur (LEAK_AT 4.75, depuis le bouton
  d'envoi au centre de l'écran). 02 → 03, 03 → 04, 04 → 05 : poussée de caméra dans un objet, couture au sommet du
  flou. 05 → 06 : iris de l'orchestrateur depuis le centre de l'écran d'aperçu (IRIS_AT 25.95).
- **Texte** : la narration est le sous-titre, en bas au centre, mot par mot ; une mise en valeur par phrase (boîte ou
  trait). Seul texte en plus : celui des interfaces nommé dans les lignes Scene.
- **Négatifs** : diaporama, tenue figée, mot géant, logo de marque réelle, texte lorem, aller-retour de caméra.

**MONDE** : 01 nuit (le champ) · 02 papier (éditeur, terminal, aperçu) · 03 papier (tableau de bord) · 04 papier
(graphique) · 05 papier (timeline de montage) · 06 nuit (champ de demande et bouton).

**SIGNATURES** : « arrive trop grand et flou puis se pose » (kArrive) à chaque nouvel objet ; la boîte corail sur le
mot clé (Claude, idée, code, teste, interface, données, films, vidéo) ; le trait effilé 3 fois (pixel, l'essentiel,
celui-ci) ; le caret corail (01, 02, 06).

**PARTITION CAMÉRA** (temps globaux) : 0 dérive · 4.10 cran vers le bouton · 4.60 poussée dans la lumière · 5.0 recul
sur l'éditeur · 7.9 cran vers le terminal · 9.3 cran vers l'aperçu · 9.9 poussée dans l'aperçu (couture 10.5) ·
10.5 se pose sur le tableau de bord · 12.3 cran vers le bouton Exporter · 13.9 cran vers la carte 1 · 15.3 poussée
dans la carte (couture 16.0) · 16.0 se pose sur le graphique · 18.2 cran vers Juin · 19.6 recul · 20.9 recul flou
(couture 21.5) · 21.5 se pose sur la timeline · 22.0 dérive · 25.1 poussée dans l'aperçu (iris 25.95) · 26.0 dérive
sur la carte de fin.

**VOIX** : aucune. Le rythme est celui du sous-titre (une phrase toutes les 2 à 2,7 s).

**COUPES** : 0 coupe franche (deux transitions de l'orchestrateur : flash 4.75, iris 25.95).

**SON** (temps globaux, assets/audio/sfx-events.json) : frappe 0.20 · pop 1.10 · whoosh court 2.20 · frappe 2.70 ·
clic 4.07 · whoosh cinématique 4.30 · impact grave 4.92 + scintillement 4.95 · frappe 5.55 · frappe 8.00 · pops 8.35,
8.55, 8.75, 8.95 · NOTIFICATION 9.15 (la signature : les tests passent) · whoosh court 10.25 · clic doux 12.75 ·
clic 13.24 · pop 14.25 · whoosh court 15.75 · clics doux 16.62, 16.92, 17.22 · scintillement 18.45 · whoosh 20.25 ·
pop 22.15 · ping 24.10 · whoosh cinématique 25.35 · clic 27.93 · carillon 28.05.

## Frame 1 : Bonjour · 0.00 → 5.00

- scene: Dans le noir, un caret corail ; « Bonjour. Je suis Claude. » se tape au centre ; la phrase s'envole et un champ de demande sombre se pose ; « Crée une app pour suivre mes ventes » s'y tape ; le curseur clique sur envoyer ; le bouton devient un point de lumière et la caméra plonge dedans
- duration: 5.00s
- transition_in: cut
- status: animated
- src: compositions/frames/01-bonjour.html
- voiceover: "Bonjour. Je suis Claude. Donne-moi une idée."
- type: hook
- blueprint: prompt-type-submit-generate (Adapt)
- focal: la phrase tapée, puis le champ de demande et son bouton
- rules: cursor-click-ripple
- world: dark
- handoff_in: aucun (ouverture du film) ; première image = nuit, un caret corail (7 x 80 px) au début de la ligne à venir (x ≈ 560, y 540), rien d’autre
- handoff_out: à 5.00 : cam(1354, 520, 1.6) flou 6 px, en pleine poussée power2.in ; le bouton d'envoi au centre de l'écran, couvert par un point de lumière blanc-corail qui remplit le cadre (le flash de l'orchestrateur couvre l'écran de 4.90 à 5.05) ; sous-titre sorti

Word cues: Bonjour@0.20 Je@0.62 suis@0.78 Claude@0.95 Donne-moi@2.55 une@2.85 idée@3.00

Scene 1 (0.00 à 2.20 s) : P1, « Bonjour. Je suis Claude. »
  TEXTE ÉCRAN : moment typographique centré (k-type k-on-dark, 84 px, top 494 px) « Bonjour. Je suis [boîte : Claude]. », tapé caractère par caractère de 0.20 à 1.25 (kSplit + kType), caret corail en fin de frappe ; boîte tracée à 1.08 sous « Claude » (texte papier sur corail).
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 caret visible (opacité 1), clignote (0,25 s éteint à 0.10, rallumé 0.20) ; 0.20 à 1.25 frappe (le caret suit le dernier caractère) ; 1.08 boîte ; 1.30 à 2.10 tenue vivante : la phrase recule lentement (échelle 1 → 0,985), le caret clignote deux fois (1.50, 1.85) ; 2.10 la phrase sort vers le haut (y −40, flou 8, opacité 0, 0,16 s power2.in).
  PISTE CAMÉRA : dérive cam(960, 540) s 1.00 → 1.03 de 0.00 à 4.10 (linéaire).
  COUCHES ET PROFONDEUR : sol nuit + grain sombre ; la phrase ; une lueur corail très douce derrière le caret (radial 400 px, opacité 0,10).
  OBJET-PONT ET VECTEUR : le caret corail (il revient dans le champ) ; vecteur vers le bas.
  SON : frappe 0.20, pop 1.10.
  IMAGE CLÉ : 1.40 : « Bonjour. Je suis [Claude]. » centré, boîte corail, caret.

Scene 2 (2.20 à 5.00 s) : P2, le champ de demande
  TEXTE ÉCRAN : sous-titre (k-sub k-on-dark) « Donne-moi une [boîte : idée]. » (Donne-moi 2.55, une 2.85, idée. 3.00, boîte 2.98) ; sortie 4.30.
  ÉTAPES : 2.22 la carte de demande (k-card k-dark, 900 x 150, rayon 26, centre (960, 520)) arrive (kArrive, ×1,18) ; dedans, à gauche (x 554), le texte gris « Écris ta demande… » (34 px, #8a8378) et à droite le bouton d'envoi (disque corail 64 px en (1354, 520), flèche papier vers le haut, SVG) ; 2.60 le texte gris disparaît (0,08 s) ; 2.70 à 3.75 « Crée une app pour suivre mes ventes » se tape en papier (34 px Instrument Sans 500), caret corail derrière ; 3.30 le curseur (k-cursor) part de (1720, 980) et arrive sur le bouton (1354, 520) d'un geste courbe de 0,72 s (kCursor, anneau) ; 4.07 clic : le bouton se presse (échelle 0,92 → 1 en 0,14 s) ; 4.15 le curseur s'efface (0,1 s) ; 4.15 le texte et la carte s'assombrissent (opacité du contenu 1 → 0,5, 0,3 s) ; 4.20 un point de lumière (disque radial blanc #fff8f0 au centre, corail clair au bord) naît au centre du bouton (échelle 0 → 1) et grandit jusqu'à 900 px de diamètre à 5.00 (power2.in).
  PISTE CAMÉRA : 4.10 à 4.60 cran vers le bouton : cam(960, 540, 1.03) → cam(1354, 520, 1.15) power3.inOut ; 4.60 à 5.00 poussée cam s 1.15 → 1.6 power2.in, flou 0 → 6 px de 4.75 à 5.00.
  COUCHES ET PROFONDEUR : sol ; la carte (sujet) ; le curseur et le point de lumière au premier plan.
  OBJET-PONT ET VECTEUR : la phrase tapée (elle devient le commentaire en tête du code) ; le point de lumière (le flash) ; vecteur dans l'écran.
  SON : whoosh court 2.20, frappe 2.70, clic 4.07, whoosh cinématique 4.30, impact grave 4.92.
  IMAGE CLÉ : 3.90 : le champ avec « Crée une app pour suivre mes ventes », le curseur sur le bouton corail, « Donne-moi une [idée]. » en bas.

## Frame 2 : Le code · 5.00 → 10.50

- scene: Sous la lumière, un éditeur de code clair : la phrase est devenue le commentaire de la ligne 1, le code s'écrit ligne par ligne ; à droite l'aperçu se construit en même temps ; le terminal lance les tests et 4 coches vertes tombent ; la caméra plonge dans l'aperçu
- duration: 5.50s
- transition_in: cut
- status: outline
- src: compositions/frames/02-code.html
- voiceover: "J'écris le code. Je le teste."
- type: demo
- blueprint: panel-edit-live-sync (Adapt)
- focal: le code qui s'écrit, puis les tests, puis l'aperçu
- rules: discrete-text-sequence
- world: light
- handoff_in: à 0.00 : papier ; cam(960, 540, 1.06) flou 0 (le flash de l'orchestrateur couvre l'écran jusqu'à 0.05 puis s'efface jusqu'à 0.55) ; l'éditeur, le terminal et le panneau Aperçu déjà posés (opacité 1, contenus vides sauf la ligne 1 du code « // Crée une app pour suivre mes ventes ») ; aucun sous-titre
- handoff_out: à 5.50 : cam(1480, 700, 3.0) flou 12 px, en pleine poussée power2.in ; l'intérieur du panneau Aperçu remplit l'écran : la miniature du tableau de bord (fond #fffdf9, barre latérale encre à gauche, titre « Tableau de bord », 3 cartes KPI, tableau) ; sous-titre sorti

Word cues: J'écris@0.55 le@0.95 code@1.10 Je@3.05 le@3.25 teste@3.40

Scene 1 (0.00 à 2.90 s) : P3, le code s'écrit
  TEXTE ÉCRAN : sous-titre « J’écris le [boîte : code]. » (J’écris 0.55, le 0.95, code. 1.10, boîte 1.08) ; sortie 2.60.
  IMAGE DE DÉPART : handoff_in : éditeur (k-card, x 120 à 1100, y 150 à 850) avec barre de titre (3 pastilles grises, onglet « ventes.tsx »), gouttière de numéros 1 à 12 (gris #a39b8e), ligne 1 en commentaire ; terminal (k-card k-dark, x 1160 à 1800, y 150 à 470, titre « Terminal ») vide avec « $ » ; panneau Aperçu (k-card, x 1160 à 1800, y 510 à 850, titre « Aperçu ») avec un fond vide #f1ece3.
  ÉTAPES : le code (JetBrains Mono 24 px, interligne 44 px, départ x 210, y 230 pour la ligne 1) s'écrit ligne par ligne, chaque ligne dévoilée de gauche à droite par un masque (clip-path inset de la droite vers 0, 0,16 s) et le caret corail en bout de ligne : 0.55 l2 `import { Chart } from "./chart";` · 0.80 l3 vide · 0.95 l4 `export function Ventes({ data }) {` · 1.25 l5 `  const total = somme(data);` · 1.55 l6 `  return (` · 1.75 l7 `    <Tableau titre="Ventes">` · 2.05 l8 `      <Kpi label="CA" valeur={total} />` · 2.35 l9 `      <Graphique data={data} />` · 2.60 l10 `    </Tableau>` · 2.75 l11 `  );` · 2.85 l12 `}` (couleurs frame.md) ; en même temps dans l'Aperçu (miniature du tableau de bord de la séquence 3, échelle 0,36, centrée en (1480, 700)) : 1.80 la fenêtre et la barre latérale apparaissent (kArrive ×1,08), 2.10 les 3 cartes KPI (décalage 0,06), 2.40 le tableau, 2.65 le titre.
  PISTE CAMÉRA : 0.00 à 0.80 recul cam s 1.06 → 1.00 (expo.out) ; 0.80 à 2.90 dérive vers l'éditeur cam(960, 540, 1.00) → cam(900, 520, 1.04) (linéaire).
  COUCHES ET PROFONDEUR : sol papier ; les trois panneaux ; le code et le caret au premier plan.
  OBJET-PONT ET VECTEUR : la ligne 1 (la phrase de la séquence 1) ; l'aperçu (il deviendra le tableau de bord) ; vecteur vers la droite.
  SON : frappe 0.55.
  IMAGE CLÉ : 2.40 : l'éditeur rempli aux 3/4, l'aperçu qui se construit à droite, « J’écris le [code]. ».

Scene 2 (2.90 à 5.50 s) : P4, les tests, puis l'aperçu
  TEXTE ÉCRAN : sous-titre « Je le [boîte : teste]. » (Je 3.05, le 3.25, teste. 3.40, boîte 3.38) ; sortie 5.00.
  ÉTAPES : 3.00 `$ npm test` se tape dans le terminal (JetBrains Mono 22 px, papier) en 0,25 s ; 3.35, 3.55, 3.75, 3.95 quatre lignes arrivent (kArrive ×1,1 depuis la gauche, x −12) : « ✓ calcule le total », « ✓ affiche les ventes », « ✓ gère un mois vide », « ✓ formate les euros » (coche verte #3f8f63, texte papier) ; 4.15 « 4 tests réussis » en vert gras (600) roule de « 0 » à « 4 » (scale et flou seulement) ; 4.40 dans l'Aperçu, la valeur de la carte KPI 1 s'imprime ; 4.80 un léger éclat corail parcourt le bord du panneau Aperçu (contour 2 px opacité 0 → 1 → 0).
  PISTE CAMÉRA : 2.90 à 3.30 cran vers le terminal cam(1480, 330, 1.25) power3.inOut ; 3.30 à 4.30 dérive s 1.25 → 1.28 ; 4.30 à 4.75 cran vers l'aperçu cam(1480, 700, 1.30) power3.inOut ; 4.90 à 5.50 poussée cam(1480, 700) s 1.30 → 3.0 power2.in, flou 0 → 12 px de 5.15 à 5.50.
  COUCHES ET PROFONDEUR : terminal net (sujet), éditeur flou de profondeur à gauche (flou 2 px quand la caméra est à droite) ; lignes de test au premier plan.
  OBJET-PONT ET VECTEUR : la miniature du tableau de bord ; vecteur dans l'écran.
  SON : frappe 8.00 global (3.00 local), pops 3.35, 3.55, 3.75, 3.95, NOTIFICATION 4.15, whoosh court 5.25.
  IMAGE CLÉ : 4.20 : le terminal avec 4 coches vertes et « 4 tests réussis », « Je le [teste]. ».

## Frame 3 : L'interface · 10.50 → 16.00

- scene: Le tableau de bord se pose plein cadre et ses contenus s'impriment ; un curseur de design sélectionne le bouton Exporter, choisit le corail, arrondit ses coins ; des repères de 40 px s'affichent entre les cartes ; la caméra plonge dans la carte « Chiffre d'affaires »
- duration: 5.50s
- transition_in: cut
- status: outline
- src: compositions/frames/03-interface.html
- voiceover: "Je dessine l'interface. Au pixel près."
- type: demo
- blueprint: cursor-ui-demo (Adapt)
- focal: le tableau de bord, puis le bouton, puis l'espacement des cartes
- rules: ai-tracking-box
- world: light
- handoff_in: à 0.00 : cam(960, 480, 1.08) flou 12 px ; papier ; la fenêtre du tableau de bord (fond #fffdf9, x 160 à 1760, y 110 à 850) avec sa barre latérale encre, le titre « Tableau de bord », 3 cartes KPI (contenus en squelette gris) et le tableau (squelette) ; sous-titre vide
- handoff_out: à 5.50 : cam(640, 335, 3.3) flou 10 px, en pleine poussée power2.in ; la carte KPI 1 remplit l'écran : fond #fffdf9, « Chiffre d'affaires » en gris en haut à gauche, « 48 320 € » en grand, pastille verte « +23 % » ; sous-titre sorti

Word cues: Je@0.30 dessine@0.48 l'interface@0.85 Au@3.30 pixel@3.45 près@3.75

Scene 1 (0.00 à 1.80 s) : P5, le tableau de bord se pose
  TEXTE ÉCRAN : sous-titre « Je dessine l’[boîte : interface]. » (Je 0.30, dessine 0.48, l’interface. 0.85, boîte 0.84 sur « interface ») ; sortie 2.90.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.35 la caméra se pose (flou 12 → 0) ; 0.35 les libellés de la barre latérale s'impriment (« Ventes » en serif 30 px papier, puis « Tableau de bord » dans une pastille corail, « Clients », « Produits », « Réglages », décalage 0,05) ; 0.60 le titre « Tableau de bord » (40 px 600) et « Octobre 2026 » (gris) ; 0.85, 1.00, 1.15 les valeurs des cartes roulent (« 48 320 € » de 0, « 1 284 » de 0, « 37,60 € » de 0, 0,5 s power3.out ; libellés « Chiffre d'affaires », « Commandes », « Panier moyen » ; pastille « +23 % » verte sur la carte 1 à 1.30) ; 1.35 les 3 lignes du tableau « Dernières commandes » glissent (x +20 → 0, décalage 0,1) : « #1042 · Atelier Brun · 129,00 € », « #1041 · Maison Léa · 64,50 € », « #1040 · Studio Nord · 212,00 € » ; le bouton « Exporter » (160 x 52, en haut à droite x 1540 à 1700, y 140 à 192) est gris #e4ddd1, texte encre, coins 8 px.
  PISTE CAMÉRA : 0.00 à 0.35 cam(960, 480, 1.08) → cam(960, 480, 1.00) expo.out ; 0.35 à 1.80 dérive s 1.00 → 1.02.
  COUCHES ET PROFONDEUR : sol papier ; fenêtre ; contenus qui s'impriment au premier plan.
  OBJET-PONT ET VECTEUR : la carte 1 ; vecteur vers le haut à droite.
  SON : (orchestrateur).
  IMAGE CLÉ : 1.50 : le tableau de bord complet, « Je dessine l’[interface]. ».

Scene 2 (1.80 à 5.50 s) : P6, le design au pixel près
  TEXTE ÉCRAN : sous-titre « Au [trait : pixel] près. » (Au 3.30, pixel 3.45, près. 3.75, trait sous « pixel » 3.85) ; sortie 5.10.
  ÉTAPES : 1.85 le curseur arrive de (1200, 700) sur le bouton (1620, 166) d'un geste courbe de 0,4 s (kCursor, sans anneau) ; 2.25 un cadre de sélection corail 2 px se trace autour du bouton avec 4 poignées carrées et l'étiquette « Bouton · 160 × 52 » (JetBrains Mono 16 px, fond corail, texte papier) au-dessus ; 2.45 un petit panneau de couleurs (k-card, 4 pastilles : encre, gris, vert, corail) arrive sous le bouton, relié par un filet ; 2.70 le curseur glisse sur la pastille corail et clique (anneau) ; 2.80 le bouton se remplit de corail, son texte passe en papier (fondu 0,2 s d'un second fond corail aux coins 8 px) ; 3.10 le curseur attrape la poignée en haut à gauche et la tire de 10 px : les coins passent de 8 à 26 px (fondu d'un troisième fond aux coins 26 px) ; 3.40 la sélection et le panneau s'effacent ; 3.50 le curseur s'efface ; 3.55 deux repères de mesure corail apparaissent entre les cartes KPI (filet horizontal de 40 px avec traits de bout, étiquette « 40 » au-dessus, JetBrains Mono 16 px), décalage 0,15 ; 4.40 les repères s'effacent ; 4.50 la carte 1 se soulève (ombre plus forte, échelle 1 → 1,02).
  PISTE CAMÉRA : 1.80 à 2.20 cran vers le bouton cam(1500, 260, 1.40) power3.inOut ; 2.20 à 3.40 dérive s 1.40 → 1.44 ; 3.40 à 3.85 cran vers les cartes cam(1080, 335, 1.30) power3.inOut ; 3.85 à 4.80 dérive vers la carte 1 cam(1080, 335) → cam(900, 335) ; 4.80 à 5.50 poussée vers cam(640, 335, 3.3) power2.in, flou 0 → 10 px de 5.20 à 5.50.
  COUCHES ET PROFONDEUR : bouton et sélection au premier plan ; fenêtre ; le reste du tableau de bord légèrement flou (2 px) pendant les crans.
  OBJET-PONT ET VECTEUR : la carte « Chiffre d'affaires » (elle devient le graphique) ; vecteur dans l'écran.
  SON : clic doux 2.25, clic 2.74, pop 3.75, whoosh court 5.25.
  IMAGE CLÉ : 3.00 : le bouton corail sélectionné, le panneau de couleurs, le curseur ; 3.90 : les repères « 40 », « Au [pixel] près. ».

## Frame 4 : Les données · 16.00 → 21.50

- scene: La carte « Chiffre d'affaires » s'ouvre en graphique : les barres de janvier à juin poussent, une courbe de tendance se trace, juin s'annote « record » ; puis tout s'efface sauf les barres, qui se couchent et deviennent six clips
- duration: 5.50s
- transition_in: cut
- status: outline
- src: compositions/frames/04-donnees.html
- voiceover: "J'analyse tes données. Et j'en tire l'essentiel."
- type: demo
- blueprint: dataviz-countup (Adapt)
- focal: les barres, puis juin, puis les clips
- rules: stat-bars-and-fills, svg-path-draw
- world: light
- handoff_in: à 0.00 : cam(960, 480, 1.12) flou 10 px ; papier ; le panneau blanc (x 260 à 1660, y 140 à 820) avec « Chiffre d'affaires » en gris (x 320, y 200), « 48 320 € » (88 px 600, x 320, y 240) et la pastille verte « +23 % » ; zone du graphique vide ; sous-titre vide
- handoff_out: à 5.50 : cam(960, 540, 0.96) flou 8 px, recul en cours ; papier nu ; 6 clips (180 x 56, rayon 10) en y 760 à 816, x = 360 + i × 204 (i = 0 à 5), les 5 premiers encre #2b2723, le dernier corail #d97757 ; rien d'autre ; sous-titre sorti

Word cues: J'analyse@0.40 tes@0.80 données@0.95 Et@2.75 j'en@2.90 tire@3.10 l'essentiel@3.30

Scene 1 (0.00 à 2.60 s) : P7, le graphique pousse
  TEXTE ÉCRAN : sous-titre « J’analyse tes [boîte : données]. » (J’analyse 0.40, tes 0.80, données. 0.95, boîte 0.93) ; sortie 2.55.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.35 la caméra se pose ; 0.40 trois lignes de grille (#e4ddd1) se tracent de gauche à droite (scaleX, décalage 0,05) en y 600, 680, 520 ; 0.55 les mois s'impriment sous la base (Jan, Fév, Mar, Avr, Mai, Juin, 22 px gris, centrés sous chaque barre) ; 0.60 à 1.35 les 6 barres poussent (scaleY 0 → 1 depuis la base, 0,35 s expo.out, décalage 0,15), chacune avec sa valeur au-dessus qui roule (« 6,1 k », « 7,3 k », « 6,7 k », « 8,7 k », « 9,9 k », « 12,6 k », 18 px) ; 1.50 à 2.10 une courbe de tendance corail 3 px se trace sur les sommets (SVG, stroke-dashoffset) ; 2.30 la barre de juin s'éclaire (halo corail doux) ; 2.40 une annotation (k-card, « Juin : record, +23 % », 24 px 600) arrive à droite de juin, reliée au sommet de la barre par un filet corail qui se trace (0,2 s).
  PISTE CAMÉRA : 0.00 à 0.35 cam(960, 480, 1.12) → cam(960, 480, 1.00) expo.out, flou 10 → 0 ; 0.35 à 2.20 dérive cam(960, 480) → cam(1000, 490) s 1.00 → 1.02 ; 2.20 à 2.60 cran vers juin cam(1380, 520, 1.30) power3.inOut.
  COUCHES ET PROFONDEUR : panneau ; barres (sujet) ; courbe et annotation au premier plan.
  OBJET-PONT ET VECTEUR : les barres (elles deviendront les clips) ; vecteur vers la droite.
  SON : clics doux 0.62, 0.92, 1.22 ; scintillement 2.45.
  IMAGE CLÉ : 2.50 : juin en gros plan avec l'annotation « Juin : record, +23 % ».

Scene 2 (2.60 à 5.50 s) : P8, l'essentiel, puis les barres se couchent
  TEXTE ÉCRAN : sous-titre « Et j’en tire l’[trait : essentiel]. » (Et 2.75, j’en 2.90, tire 3.10, l’essentiel. 3.30, trait sous « l’essentiel. » 3.42) ; sortie 4.60.
  ÉTAPES : 2.60 à 3.50 tenue vivante sur juin : le halo respire (opacité 0,6 → 1), la valeur « 12,6 k » passe en corail ; 3.50 à 3.95 recul pour montrer tout le graphique ; 4.00 l'en-tête (« Chiffre d'affaires », « 48 320 € », « +23 % »), la grille, les mois, les valeurs, la courbe et l'annotation s'effacent (0,2 s, décalage 0,03) ; 4.10 le fond du panneau s'efface (opacité 1 → 0, 0,3 s) : il ne reste que les barres sur le papier ; 4.35 à 5.00 chaque barre se couche et devient un clip : le clip i (180 x 56, rayon 10, même couleur) est posé à sa place finale (x 360 + i × 204, y 760) et part d'une transformation qui épouse exactement la barre (translation + scaleX 120/180 + scaleY h/56), vers l'identité, 0,4 s power3.inOut, décalage 0,05 ; la barre disparaît à l'instant où son clip commence (opacité 0 en 0,01 s).
  PISTE CAMÉRA : 3.50 à 3.95 cam(1380, 520, 1.30) → cam(960, 540, 1.00) power3.inOut ; 3.95 à 4.90 dérive s 1.00 → 0.99 ; 4.90 à 5.50 recul s 0.99 → 0.96 power2.in avec flou 0 → 8 px de 5.20 à 5.50.
  COUCHES ET PROFONDEUR : barres et clips au premier plan, papier nu.
  OBJET-PONT ET VECTEUR : les 6 clips ; vecteur vers le bas.
  SON : whoosh 4.25.
  IMAGE CLÉ : 3.60 : tout le graphique, « Et j’en tire l’[essentiel]. » ; 4.80 : les barres qui se couchent en clips.

## Frame 5 : Le film · 21.50 → 26.00

- scene: Les six clips deviennent une timeline de montage ; un écran d'aperçu se pose au-dessus ; la tête de lecture corail parcourt la timeline et l'écran rejoue en miniature chaque séquence de ce film, jusqu'à la sienne ; la caméra plonge dans l'écran
- duration: 4.50s
- transition_in: cut
- status: outline
- src: compositions/frames/05-film.html
- voiceover: "Je fais même des films. Comme celui-ci."
- type: demo
- blueprint: zoom-out-workspace-reveal (Adapt)
- focal: la timeline, puis l'écran d'aperçu
- rules: control-target-sync
- world: light
- handoff_in: à 0.00 : cam(960, 540, 0.96) flou 8 px, recul en cours ; papier nu ; 6 clips (180 x 56, rayon 10) en y 760 à 816, x = 360 + i × 204 (i = 0 à 5), les 5 premiers encre #2b2723, le dernier corail #d97757 ; rien d'autre ; sous-titre sorti
- handoff_out: à 4.50 (la séquence reste montée jusqu'à 5.25 sous l'iris de l'orchestrateur, ses couches internes durent 5.25) : cam(960, 375, 1.9) en poussée power2.in vers cam(960, 375, 2.4) à 5.25 ; l'écran d'aperçu remplit le cadre et montre la miniature de la carte de fin (nuit, champ de demande, bouton corail) ; sous-titre sorti

Word cues: Je@0.45 fais@0.60 même@0.78 des@0.98 films@1.12 Comme@2.50 celui-ci@2.75

Scene 1 (0.00 à 2.30 s) : P9, la timeline de montage
  TEXTE ÉCRAN : sous-titre « Je fais même des [boîte : films]. » (Je 0.45, fais 0.60, même 0.78, des 0.98, films. 1.12, boîte 1.10) ; sortie 2.25.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.35 la caméra se pose (flou 8 → 0) ; 0.30 les clips reçoivent leur étiquette (JetBrains Mono 18 px papier, à gauche dans le clip, décalage 0,04) : « 01 bonjour », « 02 code », « 03 design », « 04 données », « 05 film », « 06 fin » ; 0.40 la règle se trace au-dessus des clips (filet #e4ddd1 de x 360 à 1560 en y 735, graduations toutes les 40 px, étiquettes « 0 s », « 5 s », « 10 s », « 15 s », « 20 s », « 25 s », « 30 s » en JetBrains Mono 15 px gris) ; 0.50 la tête de lecture (filet corail 3 px de y 720 à 830, petite tête en losange en haut) paraît en x 360 ; 0.60 l'écran d'aperçu (k-card k-dark, x 560 à 1360, y 150 à 600, rayon 18) arrive (kArrive ×1,15) ; 0.70 à 3.40 la tête de lecture parcourt la timeline de x 360 à 1560 (linéaire) ; le clip sous la tête s'éclaire (contour papier 2 px) et l'écran montre sa miniature, échange franc avec un petit pop (échelle 1,02 → 1, 0,12 s) à l'entrée de chaque clip : 01 nuit + « Bonjour. » serif papier + caret corail ; 02 mini éditeur clair (lignes de code en traits colorés) + terminal sombre avec 4 coches vertes ; 03 mini tableau de bord (barre latérale encre, 3 cartes) ; 04 mini graphique (6 barres, la dernière corail) ; 05 la timeline elle-même en miniature (un petit écran au-dessus de 6 petits clips : la mise en abyme) ; 06 nuit, mini champ de demande avec bouton corail.
  PISTE CAMÉRA : 0.00 à 0.35 cam(960, 540, 0.96) → cam(960, 540, 1.00) expo.out ; 0.35 à 2.40 dérive cam(960, 540) → cam(960, 500) s 1.00 → 1.05.
  COUCHES ET PROFONDEUR : sol papier ; timeline ; écran d'aperçu (sujet) ; tête de lecture au premier plan.
  OBJET-PONT ET VECTEUR : l'écran d'aperçu ; vecteur vers la droite (la tête de lecture).
  SON : pop 0.65.
  IMAGE CLÉ : 1.60 : l'écran montre le mini graphique, la tête de lecture sur « 03 design » / « 04 données », « Je fais même des [films]. ».

Scene 2 (2.30 à 4.50 s) : P10, « Comme celui-ci. »
  TEXTE ÉCRAN : sous-titre « Comme [trait : celui-ci]. » (Comme 2.50, celui-ci. 2.75, trait sous « celui-ci. » 2.95) ; sortie 4.10.
  ÉTAPES : 2.60 la tête de lecture entre dans « 05 film » : l'écran montre la mise en abyme et le clip 05 pulse (échelle 1 → 1,04 → 1) ; 3.40 la tête atteint la fin : clip 06 actif, l'écran montre la mini carte de fin ; 3.50 la timeline s'efface vers le bas (y +30, opacité 0, 0,3 s power2.in) ; 3.55 l'écran se soulève (ombre plus grande).
  PISTE CAMÉRA : 2.40 à 3.50 dérive cam(960, 500, 1.05) → cam(960, 470, 1.08) ; 3.50 à 4.50 poussée vers cam(960, 375, 1.9) power2.in ; 4.50 à 5.25 la poussée continue jusqu'à cam(960, 375, 2.4) (linéaire) sous l'iris.
  COUCHES ET PROFONDEUR : l'écran (sujet) ; la timeline qui part.
  OBJET-PONT ET VECTEUR : la mini carte de fin dans l'écran (l'iris s'ouvre depuis son centre, (960, 540) à l'écran) ; vecteur dans l'écran.
  SON : ping 2.60, whoosh cinématique 3.85.
  IMAGE CLÉ : 2.90 : la mise en abyme dans l'écran, « Comme [celui-ci]. ».

## Frame 6 : À toi · 26.00 → 30.00

- scene: Sur la nuit, « Claude » se pose ; le champ de demande revient avec « Raconte-moi ton projet » et un bouton corail « Commencer → » ; le curseur arrive et clique ; tenue vivante, puis le noir
- duration: 4.00s
- transition_in: cut
- status: outline
- src: compositions/frames/06-fin.html
- voiceover: "À ton tour. Créons ta vidéo."
- type: cta
- blueprint: cta-morph-press (Adapt)
- focal: le champ de demande, puis le bouton
- rules: cursor-click-ripple
- world: dark
- handoff_in: à 0.00 : nuit (l'iris de l'orchestrateur s'ouvre depuis (960, 540) de 0.00 à 0.75) ; cam(960, 540, 1.04) ; la carte de demande sombre (900 x 150, rayon 26) centrée en (960, 540), déjà posée (opacité 1), vide, avec le caret corail à gauche (x 1004) ; le bouton pilule corail « Commencer → » (230 x 72, centre (1240, 540)) déjà posé ; rien d'autre
- handoff_out: aucun (fin du film à 4.00 ; de 3.40 à 4.00 tout s'éteint au noir)

Word cues: À@0.25 ton@0.40 tour@0.55 Créons@0.95 ta@1.15 vidéo@1.30

Scene 1 (0.00 à 4.00 s) : P11, la carte de fin
  TEXTE ÉCRAN : sous-titre (k-sub k-on-dark) « À ton tour. Créons ta [boîte : vidéo]. » (À 0.25, ton 0.40, tour. 0.55, Créons 0.95, ta 1.15, vidéo. 1.30, boîte 1.28) ; il reste jusqu'à l'extinction.
  IMAGE DE DÉPART : handoff_in.
  ÉTAPES : 0.00 à 0.75 la caméra recule cam s 1.04 → 1.00 expo.out ; 0.20 « Claude » (Instrument Serif 64 px papier, centré, top 286 px) arrive (kArrive ×1,2) ; 0.35 une fine lueur corail (radial 700 px, opacité 0,12) naît derrière la carte ; 0.40 à 1.15 « Raconte-moi ton projet » se tape dans la carte (34 px, papier), le caret suit ; 1.30 le curseur part de (1600, 900) et arrive sur le bouton (1240, 540) d'un geste courbe de 0,55 s (kCursor, anneau) ; 1.93 clic : le bouton se presse (0,92 → 1) et s'éclaire (corail clair #e5946f, 0,15 s, puis revient) ; 2.05 la flèche du bouton glisse de 6 px vers la droite et revient ; 2.10 le curseur s'efface (0,15 s) ; 2.10 à 3.40 tenue vivante : le caret clignote (2.40, 2.90, 3.30 : éteint 0,2 s), la lueur respire (0,12 → 0,18 → 0,12), « Claude » dérive de 4 px vers le haut ; 3.40 à 4.00 tout s'éteint au noir (un voile #0d0c0b opacité 0 → 1, power1.in).
  PISTE CAMÉRA : 0.00 à 0.75 recul ; 0.75 à 4.00 dérive s 1.00 → 1.02 (linéaire).
  COUCHES ET PROFONDEUR : sol nuit + grain ; lueur ; carte et bouton (sujet) ; curseur au premier plan.
  OBJET-PONT ET VECTEUR : le champ de demande (rime avec la séquence 1) ; aucun vecteur (fin).
  SON : clic 1.93, carillon 2.05.
  IMAGE CLÉ : 2.00 : « Claude », le champ « Raconte-moi ton projet », le curseur sur « Commencer → », « À ton tour. Créons ta [vidéo]. ».
