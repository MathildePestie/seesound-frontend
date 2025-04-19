<p align="center">
  <img src="https://github.com/MathildePestie/seesound-frontend/blob/main/public/images/logo_Seesound_noir.png?raw=true" alt="SeeSound Logo" width="300"/>
</p>

# seesound-frontend

SeeSound est une application web innovante qui transforme les fichiers audio en visualisations vidéo stylisées, à travers une interface épurée, moderne et générative.

## Fonctionnalités clés

Visualisation audio en direct : ondes sonores multicolores générées dynamiquement selon la musique.

Génération automatique de vidéos MP4 à partir de fichiers MP3.

Système d'authentification sécurisé avec token, pour créer un compte ou se connecter.

Design responsive & dark mode adaptatif : le style change selon le thème et le support.

Galerie des créations : visionnage et likes des visualisations d'autres utilisateurs.

Redux pour gérer l'état global (utilisateur, créations, likes...).

Upload Firebase + Streaming Vidéo

### Technologies utilisées

React / Next.js

Redux Toolkit + Redux Persist

CSS Modules + design adaptatif

Lottie pour les animations de chargement

Firebase Storage (vidéos MP4 / HLS)

Express + MongoDB (backend séparé)

### Structure du frontend

components # Tous les composants réutilisables (Card, Header, Visualizer...)

pages # Pages principales : Home, Connexion, Compte, Gallery...

reducers # Redux slices : user, palette, cart...

public # Images, logos, animations Lottie

styles # Fichiers CSS Modules pour chaque page/composant

### Flux utilisateur

1. L'utilisateur s'inscrit ou se connecte.

2. Il sélectionne un MP3.

3. Une animation Lottie s'affiche le temps de la génération.

4. La vidéo avec visualisation est générée et uploadée sur Firebase.

5. Elle est affichée dans la galerie + espace utilisateur.

6. Les autres utilisateurs peuvent visionner et liker.

### Le design au cœur du projet

Un soin tout particulier a été apporté à l’ergonomie, la fluidité et l’esthétique de l’interface :

Interface minimaliste et élégante 

Couleurs adaptatives selon le dark mode 

Animations douces et loaders ludiques

### Pour lancer le frontend

git clone https://github.com/MathildePestie/seesound-frontend.git
cd seesound-frontend
yarn install
yarn dev

Frontend disponible par défaut sur : http://localhost:3000

#### Notes de la créatrice

Ce projet a été conçu avec passion, de A à Z, en mêlant ma fibre artistique à mes nouvelles compétences tech. Chaque fonctionnalité a été réfléchie pour être utile, stylée et intelligente.

Il a été créé dans le cadre de mon portfolio de développeuse front-end / full-stack, et représente mon engagement pour des interfaces modernes, accessibles, et créatives.

#### Licence

MIT — Libre d’utilisation et contribution.