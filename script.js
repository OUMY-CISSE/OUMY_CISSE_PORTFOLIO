// ========================================
// PAGES PROJETS (générées depuis portfolio-data.js)
//   Full Stack  = page de GAUCHE   (face arrière d'une feuille)
//   Réseaux     = page de DROITE   (face avant de la feuille suivante)
// ========================================

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const DEV_TITLE = 'Mes projets en Développement Full Stack';
const NET_TITLE = 'Mes projets en Réseaux &amp; Systèmes informatiques';

function linksHTML(p) {
    const btns = [];

    // « Voir la démo » : apparaît dès qu'une vidéo est renseignée
    if (p.video) {
        btns.push(`
            <button type="button" class="btn" data-modal="video"
                    data-src="${esc(p.video)}" data-title="${esc('Démo : ' + p.title)}">
                <i class="bx bx-play-circle"></i>
                Voir la démo
            </button>`);
    }

    (p.links || []).filter((l) => l && l.url).forEach((l) => {
        const icon = `<i class="bx ${esc(l.icon || 'bx-link-external')}"></i>`;

        if (l.modal) {
            // PDF / image / vidéo ouverts dans une fenêtre
            btns.push(`
            <button type="button" class="btn" data-modal="${esc(l.modal)}"
                    data-src="${esc(l.url)}" data-title="${esc(l.title || (p.title + ' : ' + l.label))}">
                ${icon}
                ${esc(l.label)}
            </button>`);
        } else {
            btns.push(`
            <a href="${esc(l.url)}" class="btn" target="_blank" rel="noopener noreferrer">
                ${icon}
                ${esc(l.label)}
            </a>`);
        }
    });

    return btns.join('');
}

function imgHTML(p) {
    return `<img src="${esc(p.image)}" alt="Aperçu du projet ${esc(p.title)}"
                 data-modal="image" data-src="${esc(p.image)}" data-title="${esc(p.title)}"
                 tabindex="0" role="button" title="Cliquer pour agrandir" decoding="async">`;
}

function resultsHTML(p) {
    const items = (p.results || []).filter(Boolean);
    if (!items.length) return '';
    return `<ul class="project-results">${items.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
}

function placeholderHTML(icon, label = 'Aperçu à venir') {
    return `
        <div class="project-placeholder">
            <i class="bx ${icon}"></i>
            <span>${label}</span>
        </div>`;
}

function liveHTML(p) {
    return p.live ? `
        <a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">
            Live <i class="bx bx-link-external"></i>
        </a>` : '';
}

function pageNav(sheetId, back) {
    return `
        <span class="number-page"></span>
        <span class="nextprev-btn${back ? ' back' : ''}" data-page="${sheetId}">
            <i class="bx bx-chevron-${back ? 'left' : 'right'}"></i>
        </span>`;
}

function devPageHTML(p, sheetId) {
    if (!p) {
        return `
            <h1 class="title">${DEV_TITLE}</h1>
            <div class="portfolio-box">
                <div class="img-box">${placeholderHTML('bx-code-alt', 'Projet à venir')}</div>
                <div class="info-box">
                    <p class="project-description">
                        D'autres réalisations arrivent bientôt.
                        Le code de mes projets est disponible sur GitHub.
                    </p>
                </div>
            </div>
            ${pageNav(sheetId, true)}`;
    }
    return `
        <h1 class="title">${DEV_TITLE}</h1>
        <div class="portfolio-box">
            <div class="img-box">
                ${p.image
                    ? imgHTML(p)
                    : placeholderHTML('bx-code-alt')}
            </div>
            <div class="info-box">
                <div class="info-title"><h3>${esc(p.title)}</h3>${liveHTML(p)}</div>
                <p class="project-type">${esc(p.type)}</p>
                <p class="project-description">${esc(p.description)}</p>
                ${resultsHTML(p)}
                <p class="project-technologies"><strong>Technologies :</strong> ${esc(p.technologies)}</p>
            </div>
            <div class="project-buttons">${linksHTML(p)}</div>
        </div>
        ${pageNav(sheetId, true)}`;
}

function netPageHTML(p, sheetId) {
    if (!p) {
        return `
            <h1 class="title">${NET_TITLE}</h1>
            <div class="network-project">
                <div class="network-project-image">${placeholderHTML('bx-network-chart', 'Projet à venir')}</div>
                <div class="network-project-info">
                    <p class="project-description">
                        Mes réalisations en réseaux et systèmes seront présentées ici.
                    </p>
                </div>
            </div>
            ${pageNav(sheetId, false)}`;
    }
    return `
        <h1 class="title">${NET_TITLE}</h1>
        <div class="network-project">
            <div class="network-project-image">
                ${p.image
                    ? imgHTML(p)
                    : placeholderHTML('bx-network-chart')}
            </div>
            <div class="network-project-info">
                <div class="network-info-title"><h3>${esc(p.title)}</h3>${liveHTML(p)}</div>
                <p class="project-type">${esc(p.type)}</p>
                <p class="project-description">${esc(p.description)}</p>
                ${resultsHTML(p)}
                <p class="project-technologies"><strong>Technologies :</strong> ${esc(p.technologies)}</p>
            </div>
            <div class="network-project-buttons">${linksHTML(p)}</div>
        </div>
        ${pageNav(sheetId, false)}`;
}

// Cibles utilisées par les boutons « En savoir plus »
const targets = {
    skills: { face: 'front', id: 'turn-3' },
    dev:    { face: 'back',  id: 'turn-3' }
};

(function buildProjectPages() {
    const dev = PORTFOLIO.devProjects || [];
    const net = PORTFOLIO.netProjects || [];
    const M = Math.max(dev.length, net.length, Number(PORTFOLIO.minPages) || 1, 1);   // nombre de doubles pages

    document.querySelector('[data-slot="dev-0"]').innerHTML = devPageHTML(dev[0], 'turn-3');

    const lastSheet = document.getElementById('turn-4');   // feuille finale (Contact)

    for (let j = 1; j < M; j++) {
        const id = `turn-p${j}`;
        const sheet = document.createElement('div');
        sheet.className = 'book-page page-right';
        sheet.id = id;

        const front = document.createElement('div');
        front.className = 'page-front network-project-page';
        front.innerHTML = netPageHTML(net[j - 1], id);

        const back = document.createElement('div');
        back.className = 'page-back';
        back.innerHTML = devPageHTML(dev[j], id);

        sheet.append(front, back);
        lastSheet.before(sheet);

        if (j === 1) targets.net = { face: 'front', id };
    }

    document.querySelector('[data-slot="net-last"]').innerHTML = netPageHTML(net[M - 1], 'turn-4');
    if (M === 1) targets.net = { face: 'front', id: 'turn-4' };

    // image introuvable : on affiche le cadre « Projet à venir »
    document.querySelectorAll('.img-box img, .network-project-image img').forEach((img) => {
        const swap = () => {
            const net = img.closest('.network-project-image');
            img.replaceWith(Object.assign(document.createElement('div'), {
                innerHTML: placeholderHTML(net ? 'bx-network-chart' : 'bx-code-alt'),
                className: 'project-placeholder-wrap'
            }));
        };
        img.addEventListener('error', swap);
        if (img.complete && img.naturalWidth === 0) swap();
    });
})();


// ========================================
// ÉLÉMENTS
// ========================================

const wrapper     = document.querySelector('.wrapper');
const book        = document.querySelector('.book');
const pageLeft    = document.querySelector('.book-page.page-left');
const sheets      = [...document.querySelectorAll('.book-page.page-right')];
const coverFront  = document.getElementById('cover-front');
const coverBack   = document.getElementById('cover-back');
const closeBtn    = document.querySelector('.close-book');
const reopenBtn   = document.querySelector('.reopen-book');
const contactBtn  = document.querySelector('.btn.contact-me');
const backProfile = document.querySelector('.back-profile');

const N = sheets.length;
const FLIP = 1000;               // même durée que la transition CSS (1s)

const linearMQ = window.matchMedia('(max-width: 800px)');
const isLinear = () => linearMQ.matches;

// "front" = livre fermé | "open" = livre ouvert | "back" = refermé côté arrière
let state = 'front';


// ========================================
// FEUILLES : ordre d'empilement (z-index)
// ========================================
// Feuille tournée (à gauche)  : la plus récente est au-dessus.
// Feuille non tournée (droite) : la première est au-dessus.

const isTurned = (i) => sheets[i].classList.contains('turn');

function restZ(i) {
    sheets[i].style.zIndex = isTurned(i) ? 10 + i : 10 + (N - i);
}

sheets.forEach((_, i) => restZ(i));


// ========================================
// ACCESSIBILITÉ : seules les faces visibles sont atteignables
// ========================================

function refreshInert() {
    if (isLinear()) {
        document.querySelectorAll('[inert]').forEach((el) => { el.inert = false; });
        return;
    }

    sheets.forEach((s, i) => {
        s.querySelector('.page-front').inert = isTurned(i);
        s.querySelector('.page-back').inert  = !isTurned(i);
    });

    pageLeft.inert = isTurned(0);
    book.inert     = state !== 'open';

    const allTurned = sheets.every((_, i) => isTurned(i));
    coverBack.querySelector('.cover-inside').inert  = !(state === 'open' && allTurned);
    coverBack.querySelector('.cover-outside').inert = state !== 'back';
}


// ========================================
// TOURNER UNE FEUILLE
// ========================================

function flip(i, turn) {
    const s = sheets[i];
    if (isTurned(i) === turn) return;

    // pendant le mouvement, la feuille passe au-dessus des autres ;
    // les feuilles tournées plus tard passent au-dessus des précédentes
    s.style.zIndex = 50 + (turn ? i : N - i);
    s.classList.toggle('turn', turn);

    refreshInert();

    clearTimeout(s._zTimer);
    s._zTimer = setTimeout(() => restZ(i), FLIP + 50);
}


// ========================================
// CHEVRONS (page suivante / précédente)
// ========================================

document.querySelectorAll('.nextprev-btn').forEach((el) => {
    const i    = sheets.indexOf(document.getElementById(el.dataset.page));
    const back = el.classList.contains('back');
    const go   = () => flip(i, !back);

    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', back ? 'Page précédente' : 'Page suivante');
    el.tabIndex = 0;

    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go();
        }
    });
});


// ========================================
// NAVIGATION DIRECTE (boutons « En savoir plus »)
// ========================================

function scrollToFace({ face, id }) {
    document.getElementById(id)
        .querySelector('.page-' + face)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goTo(target) {
    if (!target || state !== 'open') return;
    if (isLinear()) { scrollToFace(target); return; }

    const k = sheets.indexOf(document.getElementById(target.id));
    const upto = target.face === 'back' ? k : k - 1;     // feuilles 0..upto tournées

    const toTurn   = sheets.map((_, i) => i).filter((i) => i <= upto && !isTurned(i));
    const toUnturn = sheets.map((_, i) => i).filter((i) => i > upto && isTurned(i)).reverse();

    [...toTurn, ...toUnturn].forEach((i, n) => {
        setTimeout(() => flip(i, i <= upto), n * 180);
    });
}

document.querySelectorAll('[data-goto]').forEach((a) => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        goTo(targets[a.dataset.goto]);
    });
});


// ========================================
// CONTACTEZ-MOI : tourne toutes les feuilles
// ========================================

contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLinear()) { scrollToFace({ face: 'back', id: 'turn-4' }); return; }
    sheets.forEach((_, i) => setTimeout(() => flip(i, true), i * 200 + 100));
});


// ========================================
// RETOUR AU PROFIL : remet toutes les feuilles, dans l'ordre inverse
// ========================================

backProfile.addEventListener('click', (e) => {
    e.preventDefault();
    for (let k = 0; k < N; k++) {
        const i = N - 1 - k;
        setTimeout(() => flip(i, false), k * 200);
    }
});


// ========================================
// COUVERTURES
// ========================================

function setState(next) {
    state = next;
    wrapper.dataset.state = next;
    refreshInert();
    fit(true);
}

// --- Ouvrir le livre (couverture avant) ---

function openBook() {
    if (state !== 'front') return;

    coverFront.classList.add('open');
    coverFront.removeAttribute('role');
    coverFront.removeAttribute('tabindex');
    coverFront.setAttribute('aria-hidden', 'true');

    setState('open');

    // une fois à plat, la couverture passe sous la page de profil
    setTimeout(() => { coverFront.style.zIndex = 1; }, 650);
}

coverFront.addEventListener('click', openBook);
coverFront.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBook();
    }
});

// --- Fermer le livre (couverture arrière) ---

function closeBook() {
    if (state !== 'open') return;

    clearTimeout(coverBack._zTimer);
    coverBack.style.zIndex = 100;           // passe au-dessus de toutes les pages
    coverBack.classList.add('open');

    setState('back');
}

function reopenBook() {
    if (state !== 'back') return;

    coverBack.classList.remove('open');
    setState('open');

    // retour à droite : on la replace sous les feuilles
    clearTimeout(coverBack._zTimer);
    coverBack._zTimer = setTimeout(() => { coverBack.style.zIndex = 1; }, FLIP);
}

closeBtn.addEventListener('click', closeBook);
reopenBtn.addEventListener('click', reopenBook);


// ========================================
// CLAVIER : flèches gauche / droite
// ========================================

document.addEventListener('keydown', (e) => {
    if (isLinear() || !modal.hidden || e.target.closest('input, textarea')) return;

    if (state === 'front') {
        if (e.key === 'ArrowRight') openBook();
        return;
    }
    if (state !== 'open') return;

    if (e.key === 'ArrowRight') {
        const i = sheets.findIndex((_, k) => !isTurned(k));
        if (i !== -1) flip(i, true);
    }

    if (e.key === 'ArrowLeft') {
        let i = N - 1;
        while (i >= 0 && !isTurned(i)) i--;
        if (i >= 0) flip(i, false);
    }
});


// ========================================
// ÉCHELLE : le livre doit toujours tenir dans l'écran
// ========================================
// Avant, le livre était agrandi avec la propriété CSS "scale" : le navigateur
// dessinait les pages en 3D à leur taille d'origine puis les étirait, ce qui
// rendait textes et images flous. Maintenant tout est dimensionné en "rem" :
// on change simplement la taille de police de la page, et le navigateur
// redessine chaque élément à sa vraie taille, donc net.
//   --k du wrapper : -1 livre fermé (couverture avant)
//                     0 livre ouvert
//                    +1 livre refermé (couverture arrière)

const root         = document.documentElement;
const BASE_PX      = 16;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const view         = { k: -1, s: 1, raf: 0 };

const kFor = (st) => (st === 'front' ? -1 : st === 'back' ? 1 : 0);

function targetScale() {
    // fermé : on ne voit qu'une demi-page, on peut donc agrandir
    const widthRem  = state === 'open' ? 59 : 30.5;
    const heightRem = 35.5;

    return Math.min(
        1.5,
        (window.innerWidth  - 24) / (widthRem  * BASE_PX),
        (window.innerHeight - 24) / (heightRem * BASE_PX)
    );
}

function applyView() {
    root.style.fontSize = (BASE_PX * view.s).toFixed(3) + 'px';
    wrapper.style.setProperty('--k', view.k.toFixed(4));
}

function fit(animate = false) {
    cancelAnimationFrame(view.raf);

    // mode défilement (mobile) : le CSS gère tout
    if (isLinear()) {
        root.style.fontSize = '';
        wrapper.style.removeProperty('--k');
        return;
    }

    const k1 = kFor(state);
    const s1 = targetScale();

    if (!animate || reduceMotion.matches) {
        view.k = k1;
        view.s = s1;
        applyView();
        return;
    }

    const k0 = view.k;
    const s0 = view.s;
    const t0 = performance.now();

    const step = (now) => {
        const t = Math.min(1, (now - t0) / FLIP);
        const e = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;   // easeInOutCubic

        view.k = k0 + (k1 - k0) * e;
        view.s = s0 + (s1 - s0) * e;
        applyView();

        if (t < 1) view.raf = requestAnimationFrame(step);
    };
    view.raf = requestAnimationFrame(step);
}

window.addEventListener('resize', () => fit());




// ========================================
// NUMÉROS DE PAGE (recalculés : on peut ajouter des projets librement)
// ========================================

sheets.forEach((s, k) => {
    s.querySelector('.page-front .number-page').textContent = 2 * k + 1;
    s.querySelector('.page-back  .number-page').textContent = 2 * k + 2;
});


// ========================================
// LIENS (profil, CV) : masqués tant qu'ils ne sont pas renseignés
// ========================================

document.querySelectorAll('[data-link]').forEach((a) => {
    const url = PORTFOLIO[a.dataset.link];
    if (url) {
        a.href = url;
        a.hidden = false;
    }
});

// Bouton CV : ouvre le PDF dans une fenêtre
(function setupCV() {
    const btn = document.getElementById('cv-btn');
    if (!btn || !PORTFOLIO.cv) return;
    btn.dataset.src = PORTFOLIO.cv;
    btn.hidden = false;
})();


// ========================================
// FENÊTRE (CV, vidéo de démo, image agrandie, PDF)
// La fenêtre est en dehors du livre : elle reste nette et plein écran.
// ========================================

const modal         = document.getElementById('modal');
const modalBody     = document.getElementById('modal-body');
const modalTitle    = document.getElementById('modal-title');
const modalDownload = document.getElementById('modal-download');
const modalNewTab   = document.getElementById('modal-newtab');
let modalOpener = null;

// Reconnaît YouTube, Vimeo, Loom, Google Drive ou un fichier vidéo
function videoEmbed(src) {
    let m;
    if ((m = src.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{6,})/i))) {
        return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&autoplay=1` };
    }
    if ((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/i))) {
        return { kind: 'iframe', src: `https://player.vimeo.com/video/${m[1]}?autoplay=1` };
    }
    if ((m = src.match(/loom\.com\/(?:share|embed)\/([\w]+)/i))) {
        return { kind: 'iframe', src: `https://www.loom.com/embed/${m[1]}` };
    }
    if ((m = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/i))) {
        return { kind: 'iframe', src: `https://drive.google.com/file/d/${m[1]}/preview` };
    }
    if (/^https?:\/\//i.test(src) && !/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(src)) {
        return { kind: 'iframe', src };
    }
    return { kind: 'file', src };
}

function showMissing(src) {
    modalBody.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'modal-missing';
    box.innerHTML = `
        <i class="bx bx-error-circle"></i>
        <p><strong>Fichier introuvable</strong></p>
        <p></p>`;
    box.lastElementChild.textContent =
        `« ${src} » : vérifie le nom dans portfolio-data.js et que le fichier est bien à côté de index.html.`;
    modalBody.append(box);
}

// Sur un vrai serveur (http/https), on vérifie que le fichier existe
function checkExists(src) {
    try {
        const u = new URL(src, location.href);
        if (!/^https?:$/.test(location.protocol) || u.origin !== location.origin) return;
        fetch(u, { method: 'HEAD' })
            .then((r) => { if (!r.ok) showMissing(src); })
            .catch(() => {});
    } catch { /* adresse invalide : on laisse le navigateur afficher son erreur */ }
}

function openModal({ type, src, title }, opener) {
    if (!src) return;

    modalOpener = opener || null;
    modalBody.innerHTML = '';
    modalTitle.textContent = title || '';
    modal.dataset.type = type;

    let downloadable = false;

    if (type === 'pdf') {
        downloadable = true;

        const frame = document.createElement('iframe');
        frame.className = 'modal-frame';
        frame.title = title || 'Document';
        frame.src = src + '#toolbar=1&navpanes=0&view=FitH';

        const note = document.createElement('p');
        note.className = 'modal-note';
        note.textContent = 'Le document ne s’affiche pas ? Utilise « Télécharger » ou « Nouvel onglet ».';

        modalBody.append(frame, note);
        checkExists(src);

    } else if (type === 'image') {
        downloadable = true;

        const img = document.createElement('img');
        img.className = 'modal-img';
        img.alt = title || '';
        img.addEventListener('error', () => showMissing(src));
        img.src = src;
        modalBody.append(img);

    } else {                                   // vidéo
        const v = videoEmbed(src);

        if (v.kind === 'iframe') {
            const frame = document.createElement('iframe');
            frame.className = 'modal-embed';
            frame.title = title || 'Vidéo';
            frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
            frame.allowFullscreen = true;
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            frame.src = v.src;
            modalBody.append(frame);
        } else {
            downloadable = true;

            const video = document.createElement('video');
            video.className = 'modal-video';
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.addEventListener('error', () => showMissing(src));
            video.src = src;
            modalBody.append(video);
        }
    }

    modalDownload.hidden = !downloadable;
    if (downloadable) modalDownload.href = src;
    modalNewTab.href = src;

    modal.hidden = false;
    document.body.classList.add('modal-open');
    wrapper.inert = true;                       // le livre derrière n'est plus atteignable au clavier

    modal.querySelector('.modal-close').focus();
}

function closeModal() {
    if (modal.hidden) return;

    modal.hidden = true;
    modalBody.innerHTML = '';                   // coupe la vidéo
    document.body.classList.remove('modal-open');
    wrapper.inert = false;
    refreshInert();

    if (modalOpener && document.contains(modalOpener)) modalOpener.focus();
    modalOpener = null;
}

// Clic sur un bouton / une image qui porte data-modal
document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-modal]');
    if (!t) return;
    e.preventDefault();
    openModal({ type: t.dataset.modal, src: t.dataset.src, title: t.dataset.title }, t);
});

// Clavier : Entrée / Espace sur une image
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('img[data-modal]')) {
        e.preventDefault();
        e.target.click();
    }
});

// Fermer : croix, clic dans le fond, touche Échap
modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));

modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.stopPropagation();
        closeModal();
        return;
    }
    if (e.key !== 'Tab') return;

    // le focus reste dans la fenêtre
    const items = [...modal.querySelectorAll('a[href], button')].filter((el) => !el.hidden && el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last  = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});


// ========================================
// CONTACT : coordonnées + formulaire
// ========================================

(function setupContact() {
    const list = document.getElementById('contact-info');
    const rows = [
        PORTFOLIO.email    && { icon: 'bx-envelope', text: PORTFOLIO.email, href: 'mailto:' + PORTFOLIO.email },
        PORTFOLIO.linkedin && { icon: 'bxl-linkedin', text: 'LinkedIn',      href: PORTFOLIO.linkedin },
        PORTFOLIO.github   && { icon: 'bxl-github',   text: 'GitHub',        href: PORTFOLIO.github }
    ].filter(Boolean);

    list.innerHTML = rows.map((r) => `
        <li><a href="${esc(r.href)}" target="_blank" rel="noopener noreferrer">
            <i class="bx ${r.icon}"></i> ${esc(r.text)}
        </a></li>`).join('');
    list.hidden = rows.length === 0;

    const form   = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    const say = (msg, kind) => {
        status.textContent = msg;
        status.dataset.kind = kind;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = new FormData(form);

        if (PORTFOLIO.formEndpoint) {
            say('Envoi en cours…', 'info');
            try {
                const res = await fetch(PORTFOLIO.formEndpoint, {
                    method: 'POST',
                    body: data,
                    headers: { Accept: 'application/json' }
                });
                if (!res.ok) throw new Error(res.status);
                say('Message envoyé, merci !', 'ok');
                form.reset();
            } catch {
                say("L'envoi a échoué. Réessaie ou écris-moi directement.", 'error');
            }
            return;
        }

        if (PORTFOLIO.email) {
            const subject = encodeURIComponent('Message depuis ton portfolio - ' + data.get('name'));
            const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')} (${data.get('email')})`);
            window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
            say('Ton logiciel de mail va s\'ouvrir avec le message pré-rempli.', 'info');
            return;
        }

        say("Le formulaire n'est pas encore relié à une adresse.", 'error');
    });
})();


// ========================================
// PASSAGE ENTRE MODE LIVRE ET MODE DÉFILEMENT (mobile)
// ========================================

linearMQ.addEventListener('change', () => {
    refreshInert();
    fit();
});


// ========================================
// DÉPART
// ========================================

refreshInert();
fit();
