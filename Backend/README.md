# API REST - Boutique de produits Cosmétiques 

## Description

Cette Api Laravel permet la gestion complète d'une boutique de produits cosmétiques : création de comptes, gestion des rôles, ajout de produits, traitement des commandes, et plus encore. Elle est securisée avec Laravel Sanctum et utilise Spatie pour la gestion des rôles et permissions.

---

## Fonctionnalités

- Authentification avec Laravel Sanctum
- Gestion des rôles avec Spatie Laravel Permission
- CRUD pour : 
    - Produits
    - Categories
    - Commandes
- Recherche par multi-critère (nom, prix, categorie)
- Notifications Email (Apres passage d'une commande, modification du statut d'une commande par l'admin)
- Middleware pour sécuriser les routes selon le rôle

--- 

## Technologies

- Laravel 12
- PHP 8+
- MySQL
- Sanctum (authentification)
- Spatie/Laravel-permission
- Insomnia pour les tests

---

## Installation du projet

```bash
cd api-boutique-cosmetique
composer install
cp .env .example .env
php artisan key:generate