# Les Fare de Maatea (nom provisoire)

Site vitrine des trois fare de Maheata à Maatea, Moorea : **Fare Hani**, **Fare Tahi** et **Fare Hiva**.
Le site est statique, déployé sur Netlify, et reçoit les demandes de séjour en direct, sans plateforme.

| Page | Adresse |
|---|---|
| Accueil | `/` |
| Fare Hani, Fare Tahi, Fare Hiva | `/fare-hani/`, `/fare-tahi/`, `/fare-hiva/` |
| Contact et infos pratiques | `/contact/` |
| Remerciement du formulaire (noindex) | `/merci/` |

## Compléter le contenu

Tout le texte est dans `content/`. Le code n'a pas besoin d'être modifié.

| Fichier | Contenu |
|---|---|
| `content/fr/site.json` | Nom, coordonnées, WhatsApp, localisation, horaires, conditions, « inclus », « bon à savoir », SEO |
| `content/fr/fares.json` | Les trois fare : textes, **prix**, photos de la galerie, lien Airbnb, comparatif |
| `content/fr/reviews.json` | Avis des voyageurs (relevés sur Airbnb) |
| `content/fr/home.json` | Textes des scènes animées de l'accueil (longueurs à respecter, notées dans le fichier) |
| `content/fr/ui.json` | Libellés d'interface (clés de traduction) |
| `content/photos.json` | Liste des photos : nom de fichier, source, texte alternatif |
| `content/config.json` | `preview` (noindex), couleur d'accent, langues |

Tout texte contenant `[à confirmer]` apparaît **surligné en jaune** sur le site. Le build liste aussi ces champs dans le terminal.
La liste à envoyer à la cliente se trouve dans [`A-CONFIRMER.md`](A-CONFIRMER.md).

## Commandes

```bash
npm install          # une fois (installe sharp, utilisé seulement pour les photos)
npm run photos       # télécharge les photos Airbnb → src/images/ en WebP (800 + 1600 px)
npm run build        # génère le site dans dist/ (aucune dépendance)
npm run dev          # build + aperçu sur http://localhost:4385
```

**Photos** : `npm run photos` doit tourner sur une machine qui a accès à `a0.muscache.com`. Tant qu'il n'a pas tourné, le site affiche des images provisoires marquées « PHOTO À VENIR ». Elles portent déjà le nom définitif (`fare-hani-exterieur-1-1600.webp`…). Pour remplacer une photo par celle de la cliente, déposer un WebP sous le même nom, ou changer `source` dans `content/photos.json` et relancer `npm run photos -- --force`.

## Déployer

- **Glisser-déposer** : lancer `npm run build`, puis déposer le dossier `dist/` sur app.netlify.com. Le formulaire fonctionne (Netlify Forms). Le calendrier reste masqué, car ce mode n'active pas les fonctions.
- **Relié à GitHub** : `netlify.toml` lance le build et active la fonction `netlify/functions/availability.mjs`.

### Formulaire de demande

Il s'appuie sur Netlify Forms (`data-netlify`, formulaire `demande-sejour`), sans fonction serveur, avec un champ anti-robots `bot-field`. L'envoi se fait sans rechargement et affiche une confirmation. Sans JavaScript, le visiteur arrive sur `/merci/`.
Dans Netlify : *Forms → demande-sejour*. Pour recevoir chaque demande par email, ajouter une notification (*Forms → Form notifications*) vers l'adresse de Maheata.

### Calendrier de disponibilités (optionnel)

Il faut définir dans Netlify (*Site configuration → Environment variables*) :

| Variable | Valeur |
|---|---|
| `ICAL_FARE_HANI` | URL iCal d'export du calendrier Airbnb de Fare Hani |
| `ICAL_FARE_TAHI` | idem Fare Tahi |
| `ICAL_FARE_HIVA` | idem Fare Hiva |

Pour obtenir l'URL dans Airbnb : *Annonce → Disponibilités → Connecter des calendriers → Exporter le calendrier*.
La fonction `/api/availability?fare=hani` lit le flux et le met en cache une heure (en mémoire et sur le CDN). Si une variable manque ou si le flux est illisible, **le calendrier de ce fare est masqué** : seul le formulaire reste. Un calendrier ne s'affiche jamais « tout libre » par erreur.

## Mise en ligne

1. Passer `"preview": false` dans `content/config.json`. Cela retire la balise `noindex`, l'en-tête `X-Robots-Tag` et le `Disallow` du `robots.txt`. Les déploiements Netlify hors production restent toujours en noindex.
2. Renseigner l'adresse définitive (`seo.siteUrl` dans `site.json`). Sur Netlify, l'URL de production est prise automatiquement.
3. Vérifier qu'il ne reste aucun `[à confirmer]` (le build les liste).

## SEO

Chaque page a son title, sa meta description, son lien canonique et ses balises Open Graph (image 1200×630 générée à partir de la couverture). Les données structurées sont de type `LodgingBusiness` sur l'accueil et `VacationRental` sur chaque fare. Le build produit aussi `sitemap.xml` et `robots.txt`.
Les avis Airbnb ne sont **pas** balisés en `aggregateRating`, car Google interdit de baliser des avis collectés sur un site tiers.

## Anglais

Les libellés passent par des clés (`content/fr/ui.json`) et le contenu est rangé par langue. Pour ajouter l'anglais :
1. copier `content/fr/` en `content/en/` et traduire les valeurs ;
2. ajouter `"en"` dans `locales` (`content/config.json`). Le site anglais sera généré sous `/en/`.

## Architecture et design

L'accueil reprend le template **« Site Immersif »** (skill fourni). Les fichiers du moteur sont conservés tels quels dans `vendor/site-immersif/` :

- `app.js` est copié **sans modification** ;
- `styles.css` est copié avec seulement les deux changements autorisés par le skill : l'accent `--lime` devient `#a9e7f5` (bleu piscine) et le visuel de `body.static .spot::before` devient une image locale. Le build vérifie ces deux remplacements ;
- `content.js` est généré avec `window.SITE_CONTENT` et la moitié « INJECTION » recopiée à l'identique depuis le fichier du skill.

**Écarts au template** (nécessaires au cahier des charges) :

1. **Multi-pages.** Le skill produit un site d'une seule page. Les pages fare et contact utilisent les mêmes polices, les mêmes tokens, la même barre et le même pied de page. Leurs composants sont dans `src/assets/pages.css` et `pages.js`, sans le moteur de scènes.
2. **`index.html` modifié.** Le skill interdit de le modifier. Les scènes restent identiques (ids, classes, `data-pin`, positions `--x/--y/--w/data-d`), mais le build ajoute : le `<head>` SEO, les images locales à la place de picsum, les liens vers les autres pages, des sections non épinglées entre les scènes (cartes et comparatif, inclus, localisation, avis, bon à savoir) et, dans le pied de page, un bouton de demande, les liens et le numéro d'enregistrement.
3. **Nom géant du pied de page.** Il est réduit dans `pages.css` : « Les Fare de Maatea » (18 signes) débordait à 12vw.
4. **Polices hébergées localement** (`src/fonts/`, OFL). Ce sont les mêmes familles, mais sans appel à Google Fonts.
5. **Photos en WebP** (le skill préconise du JPEG). Elles viennent uniquement de la cliente : aucune banque d'images, aucune image générée.
6. **Animations.** Le cahier des charges demande des animations « douces et discrètes », alors que le template est très animé. Le moteur est conservé tel quel. `prefers-reduced-motion` bascule l'accueil en mode statique et coupe les animations des autres pages.
