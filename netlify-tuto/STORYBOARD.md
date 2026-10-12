# Tuto « Mettre son site en ligne » · Rai Web Design · 16:9 FR · 2 min 12

Voix off : Kokoro (ff_siwis), une phrase par ligne, minutage dans `script/timing.json` (temps LOCAUX donnés ci-dessous).
Ambiance claire « YouTube » : fond #f6f7fb avec deux halos doux (lilas en haut à droite, bleu ciel en bas à gauche) et une
trame de points ; texte bleu nuit #15173a ; accent violet électrique #6c47ff ; surligneur jaune #ffe36b sur LE mot clé ;
vert #1fb871 = réussi ; orange #ff6a1a = attention ; annotations manuscrites (Caveat, violet ou orange) avec flèche dessinée.

## Règles communes (toutes les sections)

- Code commun : `reference/kit.html`. Chaque section met `/*@@KIT-CSS@@*/` dans son `<style>` et `/*@@KIT-JS@@*/` dans son
  `<script>`, puis `python3 reference/inject-kit.py compositions/<id>.html`. Modèle à copier (structure, couches, caméra,
  sous-titres, sortie) : `compositions/s0-intro.html`.
- Couches (toutes `class="clip"`, durée = durée de la section) : 0 sol (`.k-ground` + `.k-blob.k-b1` + `.k-blob.k-b2` +
  `.k-dots`, identique partout, les points glissent de -72 px sur la section) ; 1 scène (`#<p>-world`, la caméra `kCam`) ;
  2 chrome fixe (`.k-brand` « RAI WEB DESIGN · TUTO » + `kStepper(parent, step)`) ; 3 sous-titres (`.k-subs` + `kSubs`).
- Géométrie du monde (px) : colonne gauche (en-tête d'étape) x 110 à 640, badge `.k-badge` en y ≈ 300, titre `.k-title`
  dessous (74 px, 2 lignes max), mot clé dans `.k-mk` + `.k-mk-bg` (surligneur, `kMark`) ; fenêtre `kBrowser` posée dans un
  conteneur en x 720, y 190, 1110 × 720 (barre 58 px, en-tête d'app 64 px, barre latérale 260 px, zone principale à partir
  de x 1016 / y 342 en coordonnées monde). Bande des sous-titres y 948 à 1030 : rien d'important dessous.
- Entrée (sections 1 à 8) : de 0 à 0,45 s, `cam.x` 820 → 960 et flou 14 → 0 (expo.out) : le monde arrive de la droite.
  Sortie (sections 0 à 7) : sur les 0,35 dernières secondes, `cam.x` +140 et flou 0 → 14 (power2.in). La voix est
  silencieuse pendant ces coutures. Section 8 : pas de sortie (fin du film, tenue vivante).
- Caméra : dérive lente permanente (échelle +2 à 3 % sur la section) ; zooms francs (0,45 s power3.inOut) vers l'endroit
  où l'on clique (échelle 1,35 à 1,6), puis retour. Jamais d'aller-retour gratuit.
- Le curseur arrive d'un seul geste courbe et clique directement (`kCursor`, puis `kCursorMove`) ; chaque clic montre
  l'onde violette (`.k-ring`). Le bouton cliqué se presse (échelle 0,94 → 1). Une cible importante reçoit `.k-spot`.
- Les interfaces sont génériques et propres (aucun logo réel : `kBrowser({netlify:true})` affiche le mot « netlify » en
  texte). Les libellés de l'interface restent en anglais comme dans Netlify (Sign up, Add new project, Deploy manually,
  Project configuration, Change project name, Domain management, Add a domain, Buy, Deploys…).
- Un événement toutes les 0,5 à 1 s ; arrivées « un peu trop grand et flou puis se pose » (`kArrive`) ; pas de tenue figée.
- Sous-titres : `kSubs` avec les phrases ci-dessous, mot clé entre `** **` (passe en jaune).
- Bruitages : écrire `compositions/<id>.sfx.json` = liste `[nom, temps local s, gain]`, noms parmi `click-soft`, `click`,
  `pop`, `whoosh-short`, `whoosh`, `sparkle`, `chime`, `notification`, `ping`, `key-press`, `typing`. Doux : clics 0,35,
  pops 0,3, whoosh 0,3, succès (chime/sparkle) 0,4, frappe `typing` 0,12 au plus. Un whoosh-short à 0,0 (entrée) et à
  durée − 0,3 (sortie), sauf section 8 (pas de sortie).

## s0-intro · 0 → 10,914 s (fait, modèle)

## s1-avant · durée 21,358 s · étape 0 (aucune pastille « en cours »)

Phrases (local) : « Avant de commencer, il vous faut **trois choses**. » 0,00–2,30 · « Le **fichier** de votre site, que je
vous ai envoyé. » 2,92–5,58 · « Un **ordinateur** et une adresse mail. » 6,20–8,67 · « Et une **carte bancaire**, pour le nom
de domaine. » 9,29–11,57 · « Bonne nouvelle : l'hébergement est **gratuit**. Zéro franc par mois. » 12,19–15,54 · « Seul le
**nom de domaine** est payant : environ 1 500 francs par an. » 16,16–19,86.

- En-tête : badge « AVANT DE COMMENCER », titre « Il vous faut 3 **choses** » (surligneur sur « 3 choses » à 1,2).
- 0,3 à 11,6 : à droite, trois cartes blanches en 3D légère (rotationY −10 → −4), alignées en ligne (x 720, 1105, 1490 ;
  y 260 ; 340 × 380), qui arrivent des profondeurs une par une à 2,95 / 6,25 / 9,35 : icône dessinée en SVG (fichier
  « .zip » avec fermeture éclair ; ordinateur portable avec enveloppe « @ » ; carte bancaire), titre (« Le fichier du
  site », « Ordinateur + mail », « Carte bancaire ») et une ligne grise (« celui que je vous ai envoyé », « pour créer votre
  compte », « pour le nom de domaine ») ; une coche verte `.k-check` se pose sur chaque carte 0,7 s après elle.
- 12,0 : les trois cartes se réduisent (échelle 0,62) et montent en haut de la zone (y ≈ 200) ; dessous, deux lignes de
  prix (cartes larges 1040 × 150) : 12,4 « Hébergement » → à droite « 0 F / mois » qui pop en vert à 13,9 avec l'annotation
  manuscrite verte « gratuit ! » ; 16,3 « Nom de domaine » → « ≈ 1 500 F / an » qui roule de 0 à 1 500 entre 17,6 et 18,6
  (violet) ; 18,9 annotation « le seul coût » (violet) avec flèche.
- Caméra : léger zoom sur chaque carte au moment où elle arrive (1,08), puis recul pour la ligne des prix.

## s2-compte · durée 18,039 s · étape 1

Phrases : « Étape 1 : créez votre **compte**. » 0,00–1,52 · « Allez sur **netlify.com**, puis cliquez sur Sign up. » 2,15–6,25 ·
« Choisissez **Sign up with email**, puis entrez votre adresse et un mot de passe. » 6,87–11,49 · « Vous recevez un mail :
cliquez sur le **lien** pour confirmer votre compte. » 12,11–16,54.

- En-tête : badge « ÉTAPE 1 », titre « Créez votre **compte** » ; `kStepNow(step 1)` à 0,3.
- 0,4 : fenêtre (URL vide) ; 2,4 à 3,3 « netlify.com » se tape dans l'URL ; 3,4 la page d'accueil s'assemble (logo texte,
  liens gris, boutons « Log in » (ghost) et « Sign up » (violet) en haut à droite, grand titre gris en squelette).
- 4,3 zoom vers le bouton Sign up (échelle 1,45) ; le curseur arrive et clique à 5,5 (`.k-spot` sur le bouton) ; 5,9 recul.
- 6,9 la page « Sign up » : carte centrée avec 3 boutons ghost (« Sign up with GitHub », « … GitLab », « … Bitbucket »)
  et un bouton violet « Sign up with email » ; clic à 8,2 (spot). 8,6 le formulaire : champs « Email » et « Password » ;
  9,0 à 10,0 « vous@exemple.com » se tape (champ en focus), 10,2 à 10,8 « ••••••••• » ; clic « Create account » à 11,2.
- 12,1 une carte de mail glisse par-dessus (expéditeur « Netlify », objet « Confirm your email », bouton « Verify email ») ;
  annotation « dans votre boîte mail » ; 13,8 zoom sur le bouton ; clic à 14,9 ; 15,4 coche verte + pastille
  `.k-pill.k-ok` « Compte créé ».

## s3-publier · durée 20,657 s · étape 2

Phrases : « Étape 2 : publiez votre **site**. » 0,00–1,73 · « Important : ne **décompressez pas** le fichier. Gardez-le en
.zip. » 2,35–5,78 · « Dans Projects, cliquez sur **Add new project**, puis Deploy manually. » 6,40–10,93 · « Glissez votre
fichier .zip dans la **zone prévue**. » 11,55–14,10 · « Quelques secondes plus tard, votre site est **en ligne**, avec une
adresse provisoire. » 14,72–19,16.

- En-tête : « ÉTAPE 2 », « Publiez votre **site** » ; `kStepNow(2)`.
- 2,4 à 6,0 : à droite, sans navigateur : grande icône de fichier « votresite.zip » (zip violet) ; à côté une icône
  « dossier décompressé » barrée d'une croix orange (dessinée à 3,4) ; annotation orange « gardez le .zip ! » (4,6) ;
  `.k-spot.k-orange` sur le zip.
- 6,2 : le navigateur arrive (page « Projects » : titre « Projects », liste vide grise, bouton violet « Add new project »
  en haut à droite de la zone principale) ; zoom ; clic à 8,6 ; un menu déroulant s'ouvre (« Import an existing project »,
  « Start from a template », « Deploy manually ») ; clic sur « Deploy manually » à 10,4 (spot).
- 11,0 : grande zone pointillée `.k-drop` (« Drag and drop your project folder here ») ; 11,8 le curseur saisit l'icône
  « votresite.zip » (venue de la gauche, hors fenêtre) et la glisse dans la zone (la zone devient `.k-hot`) ; dépôt à 13,5.
- 13,9 à 15,4 barre d'envoi violette ; 15,5 carte « Published » avec coche verte et l'adresse provisoire
  « magical-otter-12345.netlify.app » (police Mono) ; 17,3 annotation « adresse provisoire » + flèche ; 18,0 pastille
  `.k-pill.k-ok` « En ligne ».

## s4-adresse · durée 11,525 s · étape 3

Phrases : « Étape 3 : choisissez une adresse plus **jolie**. » 0,00–2,39 · « Ouvrez **Project configuration**, puis Change
project name. » 3,01–6,77 · « Tapez le nom de **votre entreprise**, et enregistrez. » 7,39–10,02.

- En-tête : « ÉTAPE 3 », « Une adresse plus **jolie** » ; `kStepNow(3)`.
- 0,3 : navigateur, URL « app.netlify.com/projects/magical-otter-12345 », barre latérale (Project overview, Project
  configuration, Deploys, Logs, Domain management) ; zone principale : titre « magical-otter-12345 » + adresse grise.
- 3,2 le curseur clique « Project configuration » à 4,3 (l'entrée passe en `.k-on`) ; 4,6 carte « Project details »
  (Project name : magical-otter-12345 ; bouton ghost « Change project name ») ; zoom ; clic à 6,3.
- 7,0 fenêtre modale « Change project name » : champ en focus, l'ancien nom s'efface (7,3) puis « votre-entreprise » se
  tape (7,6 à 8,8) ; dessous l'aperçu « votre-entreprise.netlify.app » se met à jour ; clic « Save » (violet) à 9,4 ;
  9,8 la modale se ferme, coche verte, l'URL et le titre passent à « votre-entreprise » ; pastille « Enregistré ».

## s5-domaine · durée 15,493 s · étape 4

Phrases : « Étape 4 : votre propre **nom de domaine**. » 0,00–2,34 · « Allez dans **Domain management**, puis Add a domain. »
2,96–5,28 · « Tapez le nom que vous voulez. S'il est libre, cliquez sur **Buy**. » 5,90–9,13 · « Attention : le
renouvellement est **automatique** chaque année. Notez bien la date. » 9,75–13,99.

- En-tête : « ÉTAPE 4 », « Votre **nom de domaine** » ; `kStepNow(4)`.
- 0,3 navigateur (projet « votre-entreprise ») ; 3,0 clic « Domain management » à 3,9 ; zone principale « Production
  domains » (votre-entreprise.netlify.app) + bouton violet « Add a domain » ; clic à 5,0.
- 5,6 champ « Enter a domain » ; 6,1 à 7,3 « votreentreprise.com » se tape ; 7,5 ligne de résultat : le nom, pastille
  verte « Available », prix gris, bouton violet « Buy » ; zoom ; clic à 8,6 ; coche verte.
- 9,8 carte « attention » orange (bordure orange) : icône calendrier « 1 an », texte « Renouvellement automatique »,
  interrupteur ON ; `.k-spot.k-orange` sur l'interrupteur (10,6) ; 12,4 annotation orange « notez la date ! » + flèche.

## s6-verifier · durée 11,309 s · étape 5

Phrases : « Étape 5 : **vérifiez**. » 0,00–1,32 · « Tapez votre adresse dans le navigateur : votre site **apparaît** ! »
1,94–5,09 · « Sinon, patientez : cela peut prendre de quelques minutes à **24 heures**. » 5,71–9,81.

- En-tête : « ÉTAPE 5 », « **Vérifiez** votre site » ; `kStepNow(5)`.
- 0,3 navigateur vide (nouvel onglet) ; 2,1 à 3,3 « votreentreprise.com » se tape dans l'URL (focus) ; 3,5 « Entrée » :
  le site apparaît (même maquette que l'intro : bandeau « Votre entreprise », bouton, 3 tuiles) avec scintillement ;
  4,2 pastille « Ça marche ! » verte + coche.
- 5,8 une carte se pose devant : sablier/horloge dessiné en SVG qui tourne lentement ; « Pas encore visible ? » ; 7,0
  pastille violette « de quelques minutes à 24 h » ; 8,4 annotation « patience ! ».

## s7-maj · durée 12,479 s · étape 6

Phrases : « Étape 6 : mettez à jour votre **site**. » 0,00–2,15 · « Quand je vous envoie une nouvelle version, ouvrez
l'onglet **Deploys**. » 2,77–6,05 · « Glissez le nouveau fichier .zip dans la zone. C'est tout : votre site est **à jour**. »
6,67–10,98.

- En-tête : « ÉTAPE 6 », « Mettre à **jour** » ; `kStepNow(6)`.
- 2,8 une bulle de message (générique, aucun logo) « Rai Web Design · Voici la nouvelle version » avec une pièce jointe
  « votresite-v2.zip » glisse en bas à gauche de la fenêtre ; 4,0 clic « Deploys » dans la barre latérale ; zone
  principale : liste des déploiements (une ligne « Published · v1 ») + zone `.k-drop` « Drag and drop your project folder
  here ».
- 6,8 le curseur glisse « votresite-v2.zip » de la bulle vers la zone (zone `.k-hot`), dépôt à 8,3 ; barre d'envoi 8,5 à
  9,5 ; une nouvelle ligne « Published · v2 » arrive en tête avec coche verte ; 10,2 pastille « À jour » + scintillement.

## s8-fin · durée 10,766 s · fin du film (pas de sortie)

Phrases : « Et voilà ! Votre site est en ligne, et il **vous appartient**. » 0,00–2,86 · « Une question ? Écrivez-moi sur
**WhatsApp**. » 3,48–7,77.

- Barre d'étapes : les 6 pastilles « faites » (`kStepper(parent, 7)`), elles pulsent une à une à 0,3.
- 0,2 : composition centrée (pas d'en-tête à gauche) : « Votre site est en ligne. » (Jakarta 800, 84 px) puis « Et il
  **vous appartient**. » (surligneur à 1,9) ; petites coches vertes qui volent derrière.
- 3,4 : carte de fin centrée : monogramme « RWD » tracé (SVG, traits arrondis violets qui se dessinent), « Rai Web
  Design », bouton violet « Écrivez-moi sur WhatsApp » (pas de logo), « +689 89 37 48 86 », « raiweb.design » ; le curseur
  arrive et clique le bouton à 6,6 ; tenue vivante jusqu'à la fin (reflet qui passe sur le bouton toutes les 2 s, dérive).
