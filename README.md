# Dashboard Vue 3 + TypeScript + axios fake api (https://dummyjson.com/docs)

## Description
Ce projet est un FAKE dashboard développé avec Vue 3 et TypeScript avec un fort typage des data (ref, props, api etc.. ) et une architecture lisible. 
Il offre une interface utilisateur intuitive et réactive pour la gestion de diverses fonctionnalités, incluant l'authentification, la gestion des produits, et plus encore.


## Fonctionnalités principales
- Authentification utilisateur avec gestion de tokens JWT
- Différentes fake applications :
      - E-commerce
      - Gestion d'utilsateurs
      - Rôles et permission
      - Données globales 
- Interface utilisateur responsive avec Vuetify
- Gestion d'état globale avec Pinia
- Tests unitaires pour assurer la fiabilité du code

## Technologies utilisées
- Vue 3
- TypeScript
- Chartjs
- Pinia pour la gestion d'état
- Vue Router pour la navigation
- Vuetify pour les composants UI
- Axios pour les requêtes HTTP
- Vitest / vue-test-utils pour les tests unitaires

## Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation
1. Installez les dépendances :
   ```
   npm install
   ```
   ou
   ```
   yarn install
   ```
   
## Lancement de l'application
Pour lancer l'application en mode développement : npm run dev

## Test unitaires
Pour lancer l'application en mode développement : npm run test:unit
