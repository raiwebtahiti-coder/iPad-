# assets/video

## Fichiers à déposer ici

| Fichier | Source | Poids | Format |
|---|---|---|---|
| `sequence-hd.mp4` | lien ci-dessous | 3,9 Mo | 1280×720 · 30 fps · muet |
| `sequence-sd.mp4` | lien ci-dessous | 1,5 Mo | 854×480 · 30 fps · muet |

**Téléchargement :**

- HD — https://d2ol7oe51mr4n9.cloudfront.net/user_3HfBoqowOTu3Y9u7UtHzYzc52Jp/e5c42b53-0497-4835-8b6f-14012dee151a.mp4
- SD — https://d2ol7oe51mr4n9.cloudfront.net/user_3HfBoqowOTu3Y9u7UtHzYzc52Jp/c819b00b-36e9-40e1-b3e0-ca71077291cc.mp4

## Activation

Une fois les deux fichiers déposés dans ce dossier, ouvrir `script.js` et passer
`CONFIG.video.enabled` à `true` :

```js
video : { enabled:true, hd:'assets/video/sequence-hd.mp4', sd:'assets/video/sequence-sd.mp4' }
```

La vidéo remplace alors la scène CSS de la section cinéma. Le scrubbing, les trois
phrases et le comportement mobile sont identiques — rien d'autre à modifier.

## Contenu

Séquence continue de 15,03 s, montée à partir de trois plans Seedance 2.0 générés
en chaîne (la dernière image de chaque plan sert d'image de départ au suivant,
et l'image dupliquée est retirée au montage) :

1. **Le néant** — une ligne rouge dans le vide se fracture en braises qui forment une grille
2. **La construction** — la lumière se rétracte sur un bureau noir, wireframes qui s'assemblent, push-in dans l'écran
3. **La mise en lumière** — traversée de l'écran, galerie de sites suspendus, horizon chaud

Encodage : H.264 high profile, CRF 23 (HD) / 26 (SD), `+faststart`, sans piste audio,
**keyframe toutes les 15 frames** (`-g 15 -keyint_min 15 -sc_threshold 0`) — c'est ce
dernier point qui rend le scrubbing fluide ; un ré-encodage sans lui fera saccader le scroll.
