# Informations à demander à Maheata

Chaque point correspond à un `[à confirmer]` visible sur le site. Le fichier à compléter est indiqué entre parenthèses.

## Coordonnées
1. Adresse email de contact (`site.json → contact.email`). Elle sert aussi pour la notification des demandes dans Netlify.
2. Numéro de téléphone (`contact.phone`, `contact.phoneDisplay`).
3. Numéro WhatsApp au format international (`contact.whatsapp`). Le bouton WhatsApp s'active dès qu'il est renseigné.
4. Adresse exacte, ou choix de ne la donner qu'à la confirmation (`contact.address`).
5. Langues parlées (`contact.languages`).

## Tarifs et conditions
6. Prix par nuit de Fare Hani, Fare Tahi et Fare Hiva, et variations selon la saison (`fares.json → price`).
7. Durée minimale de séjour (`stay.minNights`).
8. Conditions d'annulation pour les réservations directes (`stay.cancellation`).
9. Modalités de paiement et d'acompte : virement, espèces, lien de paiement… (`stay.payment`, `stay.deposit`).
10. Frais de ménage éventuels (`stay.cleaning`).
11. Taxe de séjour (`stay.taxes`).

## Séjour
12. Horaires d'arrivée (15 h) et de départ (11 h) : ceux des annonces Airbnb, à confirmer pour le direct. Sur Airbnb, Fare Tahi n'indique pas d'heure de départ.
13. Remise des instructions d'accès pour l'arrivée autonome : quand et comment (`stay.selfCheckIn`).
14. Animaux acceptés ou non. Seule l'annonce de Fare Tahi dit « pas d'animaux » (`goodToKnow.practical`, `fares.json → rules`).
15. Liste complète des équipements. Airbnb en annonce environ 30 par fare, mais seuls 8 étaient lisibles (`common.amenitiesMore`).

## Accès et localisation
16. Trajet depuis le terminal du ferry de Vaiare : durée et itinéraire (`location.ferry`).
17. Accès final par un court chemin de terre, signalé par un voyageur (`location.access`).
18. Distances vers les plages, commerces et restaurants (`location.distances`).
19. Point à afficher sur la carte : zone approximative d'Airbnb ou point exact (`location.coordsNote`).

## Site
20. Nom définitif de l'ensemble (« Les Fare de Maatea » est provisoire).
21. Adresse (domaine) définitive du site (`seo.siteUrl`).
22. Accord pour reprendre sur le site les avis laissés sur Airbnb, en citant le prénom des voyageurs.
23. Les annonces Airbnb n'indiquent aucun détecteur de fumée ni de monoxyde de carbone : à vérifier (point de sécurité, rien n'est affiché sur le site).
