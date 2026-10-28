# 🏠 My Daily — Dashboard personnel

**Angular · TypeScript · Node.js · REST API · VPS Ubuntu**

My Daily est une application web personnelle centralisant les informations du quotidien dans un tableau de bord unique, accessible depuis une Smart TV, un ordinateur ou un smartphone.

Le projet associe **développement frontend, intégration d'API, backend et auto-hébergement**.

## 🚀 Fonctionnalités

- 🌤️ **Météo** : conditions météorologiques de Saint-Médard-en-Jalles et Nérac via Open-Meteo.
- 📰 **Actualités** : récupération de flux RSS Google News et transformation XML → JSON.
- 📅 **Agenda** : rendez-vous du jour et des sept prochains jours.
- 📖 **Verset et mantra du jour** : sélection automatique selon la date.
- 🖥️ **Supervision VPS** : état des applications, actualisé toutes les 60 secondes.
- 🕒 **Horloge** : date et heure en temps réel.

## 🛠️ Stack technique

| Domaine | Technologies |
|---|---|
| Frontend | Angular, TypeScript, HTML5, CSS3 |
| Backend | Node.js, API REST |
| Intégrations | Open-Meteo, Google News RSS |
| Données | JSON, XML |
| Infrastructure | VPS OVH, Ubuntu, Caddy, HTTPS |
| Versioning | Git, GitHub |

## 🏗️ Architecture

```text
Smart TV / PC / Smartphone
           |
         HTTPS
           |
         Caddy
           |
     Frontend Angular
           |
     +-----+------+
     |            |
 Open-Meteo   API Node.js
                  |
           +------+------+
           |      |      |
          RSS   Agenda  Statuts
```

Le frontend Angular consomme les API externes et les endpoints du backend :

- `GET /api/news` — Actualités
- `GET /api/agenda` — Rendez-vous
- `GET /api/status` — État des services

## 🎯 Compétences mises en pratique

- Conception d'une interface Angular modulaire.
- Consommation et intégration d'API REST.
- Transformation et exploitation de données XML/JSON.
- Développement et intégration frontend/backend.
- Déploiement et maintenance sur VPS Linux.
- Configuration HTTPS et reverse proxy Caddy.
- Vérification des endpoints et du rendu multi-supports.

## 🔄 Évolutions prévues

- Optimisation responsive pour Samsung Tizen, Fire TV et iPhone.
- Intégration d'une API pour le verset biblique quotidien.
- Amélioration de l'ergonomie et de la gestion des erreurs.

---

**Statut :** application fonctionnelle, en amélioration continue.

*Projet personnel illustrant une démarche transversale de développement, intégration, qualité logicielle et exploitation.*