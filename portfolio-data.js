// =====================================================================
//  PORTFOLIO : TES DONNÉES
//  C'est le seul fichier à modifier pour ajouter un projet, un lien,
//  ton CV ou une vidéo de démo.
// =====================================================================

const PORTFOLIO = {

    // ---------- Tes liens (laisse "" pour masquer le bouton) ----------
    email:    "",                                    // ex : "oumy@exemple.com"
    linkedin: "",                                    // ex : "https://www.linkedin.com/in/ton-profil"
    github:   "https://github.com/OUMY-CISSE",

    // CV : le bouton « Voir mon CV » ouvre le PDF dans une fenêtre
    // (avec les boutons « Télécharger » et « Nouvel onglet »).
    // Mets ton PDF dans le même dossier que index.html et écris son nom ici.
    // Laisse "" pour masquer le bouton.
    cv:       "cv-oumy-cisse.pdf.pdf",

    // ---------- Formulaire de contact ----------
    // 1. Crée un formulaire gratuit sur https://formspree.io
    // 2. Colle ici son adresse, ex : "https://formspree.io/f/xxxxxxxx"
    // Sans adresse, le bouton ouvre le logiciel de mail avec le message
    // pré-rempli (il faut alors renseigner "email" plus haut).
    formEndpoint: "",

    // ---------- Nombre minimum de doubles pages « projets » ----------
    // Chaque double page = 1 projet Full Stack (gauche) + 1 projet Réseaux
    // (droite). Si tu as moins de projets que ce nombre, des pages
    // « Projet à venir » sont ajoutées pour que tu puisses les remplir plus
    // tard. Dès que tu ajoutes un projet ci-dessous, il prend la place de
    // la première page vide. Mets 1 pour ne garder que les pages utiles.
    minPages: 3,


    // =================================================================
    //  CHAMPS D'UN PROJET (identiques pour Full Stack et Réseaux)
    //
    //  title, type, description, technologies  : les textes
    //  image   : capture ou schéma (clic sur l'image = agrandissement)
    //            → utilise une image NETTE : 1600 px de large minimum
    //  live    : lien « Live » à côté du titre (site en ligne), ou ""
    //  video   : vidéo de démonstration → ajoute le bouton « Voir la démo »
    //            qui l'ouvre dans une fenêtre. Accepté :
    //              - un fichier MP4 à côté de index.html : "demo-xelteck.mp4"
    //              - un lien YouTube : "https://youtu.be/xxxxxxxxxxx"
    //              - un lien Vimeo, Loom ou Google Drive
    //            Laisse "" pour masquer le bouton.
    //  results : liste de résultats (ou [])
    //  links   : boutons supplémentaires. Ajoute  modal: "pdf"  pour ouvrir
    //            un PDF dans une fenêtre, ou  modal: "image"  pour une image
    //            (schéma de topologie…). Sans "modal", le lien s'ouvre dans
    //            un nouvel onglet.
    // =================================================================


    // =================================================================
    //  PROJETS EN DÉVELOPPEMENT FULL STACK  (pages de GAUCHE)
    //  Ajouter un projet = ajouter un bloc { ... }, séparé par une virgule.
    // =================================================================
    devProjects: [

        {
            title: "XELTECK",
            type: "Plateforme E-Learning",
            description:
                "Plateforme destinée à la gestion des formations, des apprenants " +
                "et des contenus pédagogiques, intégrant des fonctionnalités " +
                "basées sur l'intelligence artificielle.",
            technologies: "React, TypeScript, Tailwind CSS, Node.js, Express, MySQL, MongoDB, Redis et Docker.",
            image: "xelteck.jpeg",
            live: "https://xelteck.vercel.app/",
            video: "demo-xelteck.mp4",                // vidéo de démo (fichier, YouTube, Vimeo…)
            results: [],                              // ex : ["120 apprenants inscrits", "Temps de chargement < 2 s"]
            links: [
                { label: "Code source", icon: "bxl-github", url: "https://github.com/OUMY-CISSE/XELTECK-FRONTEND" }
            ]
        }

        // ----- MODÈLE : copie ce bloc, retire les // et remplis-le -----
        // ,{
        //     title: "Nom du projet",
        //     type: "Application web de gestion de …",
        //     description: "Ce que fait le projet, pour qui, et pourquoi il est utile.",
        //     technologies: "Laravel, MySQL, …",
        //     image: "mon-projet.jpeg",
        //     live: "",
        //     video: "https://youtu.be/xxxxxxxxxxx",
        //     results: ["Un résultat chiffré ou concret"],
        //     links: [
        //         { label: "Code source", icon: "bxl-github", url: "https://github.com/…" }
        //     ]
        // }
    ],


    // =================================================================
    //  PROJETS EN RÉSEAUX & SYSTÈMES  (pages de DROITE)
    //  Même principe. Le premier projet réseau s'affiche en face du
    //  premier projet Full Stack, le deuxième en face du deuxième, etc.
    //  Les boutons (démo vidéo, rapport PDF, fichiers…) apparaissent
    //  automatiquement dès qu'un projet est rempli.
    // =================================================================
    netProjects: [

        // ----- MODÈLE : retire les // et remplis-le -----
        // {
        //     title: "Infrastructure réseau d'une PME",
        //     type: "Conception et configuration réseau",
        //     description: "Contexte, problème à résoudre, solution mise en place.",
        //     technologies: "Cisco Packet Tracer, VLAN, DHCP/DNS, routage inter-VLAN…",
        //     image: "topologie.png",                // schéma de topologie ou capture
        //     live: "",
        //     video: "demo-reseau.mp4",              // bouton « Voir la démo »
        //     results: ["Segmentation en 4 VLAN", "Supervision avec Zabbix"],
        //     links: [
        //         { label: "Rapport PDF", icon: "bx-file",    url: "rapport.pdf", modal: "pdf" },
        //         { label: "Topologie",   icon: "bx-sitemap", url: "topologie.png", modal: "image" },
        //         { label: "Fichiers",    icon: "bxl-github", url: "https://github.com/…" }
        //     ]
        // }
    ]
};
