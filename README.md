# MyDaily — Tableau de bord personnel

Application web responsive centralisant les informations et services du quotidien dans une interface unique, accessible sur ordinateur, smartphone et télévision.

## Fonctionnalités

- **Météo** : conditions météorologiques de plusieurs villes.
- **Agenda** : consultation d'un calendrier iCloud.
- **Actualités** : récupération et affichage de flux d'information.
- **Verset du jour** : intégration de l'API YouVersion.
- **Mantras** : affichage de messages inspirants.
- **Monitoring VPS** : suivi de l'état des services hébergés.
- **Raccourcis** : accès rapide aux applications personnelles.

## Stack technique

| Domaine | Technologies |
|---|---|
| Frontend | Angular 22, TypeScript, HTML, SCSS |
| Backend | Node.js, API HTTP |
| Tests | Vitest, tests unitaires Angular |
| Infrastructure | Ubuntu VPS, Caddy, Git, GitHub |

## Installation locale

**Prérequis :** Node.js et npm compatibles avec Angular 22.

```bash
git clone https://github.com/Jeremy-Sabadie/My_daily.git
cd My_daily
npm ci
npm start
```

Application accessible sur : **http://localhost:4200**

> **Note :** certaines fonctionnalités nécessitent un backend et des identifiants privés. Le frontend peut être démarré indépendamment, mais certaines données ne seront pas disponibles sans configuration complémentaire.

## Qualité et développement

- Développement organisé par branches Git dédiées aux fonctionnalités (`feat/*`) et aux corrections (`fix/*`).
- Tests unitaires avec Vitest.
- Intégration d'API externes et de services personnels.
- Interface responsive adaptée à différents formats d'écran.
- Déploiement sur VPS avec reverse proxy Caddy.

## Démarche produit

MyDaily répond à un besoin concret : disposer d'un point d'accès centralisé aux informations utiles au quotidien.

Le projet illustre un cycle de développement complet :

**Identification du besoin → Conception → Développement → Intégration → Tests → Corrections → Mise en production**

Il met en valeur une approche associant **développement logiciel, qualité et expérience utilisateur**.

---

**Projet personnel — [Dépôt GitHub](https://github.com/Jeremy-Sabadie/My_daily)**