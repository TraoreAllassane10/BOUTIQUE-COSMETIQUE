# SHOPCOSM
Une plateforme moderne et elegante dediée à la vente de produits cosmétique

# Aperçu
SHOPCOSM est une application web fullstack qui permet aux utilisateurs de parcourir, rechercher et achéter des produits. L'application offre une interface moderne avec React et une API robuste avec Laravel.

# Fonctionnalités

## Pour les clients
- Visualisation des produits
- Filtrage des produits (par catégorie, par prix)
- Systeme de panier avec gestion des quantités

## Pour les administrateurs
- Tableau de bord
- Gestion des catégories
- Gestion des produits
- Gestion des commandes

# Techonologies

## Frontend
- React - Bibliothèque UI
- Redux toolkit - Gestion des états
- Redux toolkit query - Appel API
- React-dom-router - Navigation
- React-hook-form + Zod - Gestion des formulaires
- Tailwindcss - Style

## Backend
- Laravel - Framework PHP
- MYSQL - Base de Données
- Laravel Sanctum - Authentification API
- Laravel Storage - Gestion des fichiers

# Installation

1. Cloner le dépôt

```bash
    git clone https://github.com/TraoreAllassane10/API-BOUTIQUE-COSMETIQUE.git
```

2. Installation du backend
```bash
cd Backend

# Installer les dépendances
composer install

# Copier le fichier d'environnement
copy .env.example .env

# Génerer la clé de l'application
php artisan generate:key

# Exécuter les migrations
php artisan migrate

# Créer le lien symbolique du dossier Storage
php artisan storage:link

# Lancer le serveur
php artisan serve

```
3. Installation du Frontend

```bash
cd Frontend

# Installer les dépendances
npm install

# Demarer le serveur
npm run dev

```
L'application sera accesible sur : 
 - Frontend : http://localhost:5173
 - Backend : http://localhost:8000

