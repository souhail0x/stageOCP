# README

## Chapitre II : Présentation du Projet

### Gestion des Données pour Tir et Sautage

Ce projet vise à développer une application web pour la gestion efficace des opérations de la section Tir et Sautage, mettant l'accent sur la fiabilité, la rapidité et la sécurité des données.

---

### Objectifs du Projet

1. Développer une application web permettant une gestion efficace des opérations de Tir et Sautage.
2. Assurer une base de données fiable et structurée.
3. Offrir un accès rapide aux informations (Foration, Sautage, Décapage).
4. Effectuer des calculs rapides et fiables.
5. Gérer les avances des machines de décapage.
6. Mettre à jour les données de Tir et Sautage avec le contrôle de gestion.
7. Gérer les utilisateurs selon leurs tâches.
8. Archiver les données de sautages de manière structurée.
9. Organiser les standards de sécurité pour le tir et le sautage.

### Étude des Besoins - Cahier des Charges

#### Fonctionnalités Principales

1. **Gestion des Données**:
   - Interface pour gérer les données relatives aux opérations de tir et sautage.
   - Base de données robuste et structurée pour stocker les informations de manière fiable.

2. **Accès Facile aux Informations**:
   - Interface conviviale pour un accès rapide aux données de foration, sautage et décapage.

3. **Rapidité et Fiabilité des Calculs**:
   - Algorithmes efficaces pour les calculs de commandes, réceptions, et autres opérations liées au tir.

4. **Gestion des Avances des Machines**:
   - Fonctionnalité pour gérer les avances des machines de décapage sur les chantiers.

5. **Mise à Jour des Données**:
   - Synchronisation des données de la section Tir et Sautage avec celles du département de contrôle de gestion.

6. **Gestion des Utilisateurs**:
   - Système d'authentification et de gestion des autorisations pour chaque utilisateur selon sa tâche.

7. **Archivage Structuré**:
   - Fonctionnalité d'archivage pour stocker de manière organisée les données de chaque sautage réalisé.

8. **Organisation des Standards de Sécurité**:
   - Mesures de sécurité rigoureuses pour assurer la confidentialité et l'intégrité des données sensibles.

### Livraisons Attendues

1. Application fonctionnelle avec une interface utilisateur intuitive.
2. Base de données configurée et prête à l'emploi.
3. Documentation complète comprenant le manuel d'utilisation et les instructions d'installation.
4. Support technique pendant la phase de déploiement et après la livraison du projet.

### Plan de Développement

1. Analyse des besoins et spécifications du projet.
2. Conception de l'architecture et des bases de données.
3. Développement des fonctionnalités et des interfaces.
4. Tests et débogage.
5. Déploiement et support technique.

### Points de Contact

Le chef de projet pour ce projet est Mr. Mallal Abdellatif.

---

## Technologies Utilisées

### Laravel pour le Backend

- **Facilité de Développement**: Simplifie des tâches courantes comme l'authentification et la gestion de la base de données.
- **ORM Eloquent**: Simplifie les interactions avec la base de données.
- **Middleware**: Permet de gérer les requêtes HTTP de manière flexible.
- **Écosystème Riche**: Grande communauté et nombreux packages disponibles.

### React pour le Frontend

- **Composants Réutilisables**: Facilite le développement et la maintenance grâce à des composants UI réutilisables.
- **Performance**: Optimise les mises à jour de l'interface utilisateur avec le DOM virtuel.
- **Écosystème**: Large communauté et riche écosystème de bibliothèques et outils.

---

## Étapes pour Faire Fonctionner le Frontend et le Backend

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js
- NPM (Node Package Manager)
- PHP
- Composer
- Un serveur web (par exemple, Apache ou Nginx)
- Une base de données (par exemple, MySQL)

### Installation et Configuration du Backend (Laravel)

1. **Cloner le Répertoire du Projet** :
   ```sh
   git clone <url-du-repo>
   cd <nom-du-repo>
   ```

2. **Installer les Dépendances** :
   ```sh
   composer install
   ```

3. **Configurer l'Environnement** :
   - Dupliquer le fichier `.env.example` et le renommer en `.env`.
   - Modifier le fichier `.env` avec les informations de votre base de données et autres configurations nécessaires.

4. **Générer la Clé de l'Application** :
   ```sh
   php artisan key:generate
   ```

5. **Migrer la Base de Données** :
   ```sh
   php artisan migrate
   ```

6. **Lancer le Serveur de Développement** :
   ```sh
   php artisan serve
   ```

### Installation et Configuration du Frontend (React)

1. **Naviguer vers le Répertoire du Frontend** :
   ```sh
   cd frontend
   ```

2. **Installer les Dépendances** :
   ```sh
   npm install
   ```

3. **Lancer l'Application React** :
   ```sh
   npm start
   ```

### Accès à l'Application

- **Backend** : Accessible via `http://localhost:8000` (ou l'URL configurée dans votre serveur web).
- **Frontend** : Accessible via `http://localhost:3000` (ou le port configuré).
