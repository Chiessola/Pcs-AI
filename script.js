 const cards = document.querySelectorAll('.card');
    const reveal = () => {
      cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) card.classList.add('show');
      });
    };
    window.addEventListener('scroll', reveal);
    reveal();
    // Hamburger menu
// Attendre que toute la page soit chargée
window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('#nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Ferme le menu après sélection d'une option
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// pop up articles
 document.addEventListener('DOMContentLoaded', () => {
            initScrollReveal();
            initMobileMenu();
            initPopups();
            fetchDailyPredictions();
            // Hamburger
            const menuBtn = document.getElementById('hamburger');
            const nav = document.getElementById('nav-links');
            menuBtn.onclick = () => nav.classList.toggle('active');

            // Popup
            const popup = document.getElementById('article-popup');
            const closeBtn = document.querySelector('.close-popup');
            const cards = document.querySelectorAll('.problem-card');

            cards.forEach(card => {
                card.onclick = () => {
                    document.getElementById('popup-title').innerText = card.querySelector('h3').innerText;
                    document.getElementById('popup-body').innerText = card.getAttribute('data-full');
                    popup.style.display = 'block';
                };
            });

            closeBtn.onclick = () => popup.style.display = 'none';
            window.onclick = (e) => { if(e.target == popup) popup.style.display = 'none'; };
        });

async function fetchDailyPredictions() {
    const container = document.getElementById('auto-predictions');
    const API_KEY = '8622fb2ecc8a472cb649cdf14f78279d'; // <-- VERIFIE BIEN CETTE CLE
    
    if (!container) return;

    try {
        console.log("Tentative d'appel API via Vercel...");
        const response = await fetch('/api/matches', {
            method: 'GET',
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        const matches = data.matches ? data.matches.slice(0, 3) : [];

        if (matches.length === 0) {
            container.innerHTML = "<p>Aucun match disponible pour le moment.</p>";
            return;
        }

       /**
 * PROJET PCS - SCRIPT OFFICIEL
 * Environnement: env (Vercel + GitHub)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALISATION DES COMPOSANTS
    initScrollReveal();
    initMobileMenu();
    initPopups();
    fetchDailyPredictions(); // Chargement des pronostics IA
});

/**
 * ANIMATION : Révélation des cartes au défilement
 */
function initScrollReveal() {
    const cards = document.querySelectorAll('.card');
    const reveal = () => {
        cards.forEach(card => {
            const top = card.getBoundingClientRect().top;
            if (top < window.innerHeight - 80) {
                card.classList.add('show');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Appel initial
}

/**
 * NAVIGATION : Menu Hamburger Mobile
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('#nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Ferme le menu après sélection d'un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * UI : Gestion des Popups d'articles
 */
function initPopups() {
    const popup = document.getElementById('article-popup');
    const closeBtn = document.querySelector('.close-popup');
    const problemCards = document.querySelectorAll('.problem-card');

    if (popup && problemCards.length > 0) {
        problemCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').innerText;
                const body = card.getAttribute('data-full');
                
                document.getElementById('popup-title').innerText = title;
                document.getElementById('popup-body').innerText = body;
                popup.style.display = 'block';
            });
        });

        closeBtn.onclick = () => popup.style.display = 'none';
        window.onclick = (e) => { 
            if (e.target == popup) popup.style.display = 'none'; 
        };
    }
}

/**
 * CORE : Intelligence Artificielle - Pronostics Journaliers
 */
async function fetchDailyPredictions() {
    const container = document.getElementById('auto-predictions');
    const API_KEY = '8622fb2ecc8a472cb649cdf14f78279d'; 
    
    if (!container) return;

    try {
        console.log("PCS-IA: Tentative d'appel API...");
        const response = await fetch('/api/matches', {
            method: 'GET',
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();
        const matches = data.matches ? data.matches.slice(0, 3) : [];

        if (matches.length === 0) {
            container.innerHTML = "<p>Aucun match majeur disponible pour le moment.</p>";
            return;
        }

        // Génération dynamique des pronostics intelligents
        container.innerHTML = matches.map(match => {
            const competition = match.competition.name.toLowerCase();
            const homeTeam = match.homeTeam.name.toLowerCase();
            let pronostic = "Double Chance"; // Défaut sécurisé

            // LOGIQUE D'EXPERT PCS
            if (competition.includes('bundesliga') || competition.includes('eredivisie')) {
                pronostic = "Plus de 2.5 buts"; 
            } 
            else if (homeTeam.includes('real madrid') || homeTeam.includes('bayern') || 
                     homeTeam.includes('city') || homeTeam.includes('psg') || 
                     homeTeam.includes('barcelone') || homeTeam.includes('ac milan')) {
                pronostic = `Victoire ${match.homeTeam.name}`;
            }
            else if (competition.includes('serie a') || competition.includes('ligue 1')) {
                pronostic = "Moins de 4.5 buts";
            }
            else if (match.status === 'TIMED') {
                pronostic = "Plus de 1.5 buts";
            }

            return `
                <div class="prediction-item" style="background: rgba(110, 203, 255, 0.1); margin-bottom: 15px; padding: 20px; border-radius: 15px; border: 1px solid #6ecbff;">
                    <div style="font-size: 0.7rem; color: rgba(110, 203, 255, 0.1); text-transform: uppercase; letter-spacing: 1px;">${match.competition.name}</div>
                    <div style="font-weight: bold; font-size: 1.1rem; margin: 10px 0; color: #fff;">
                        ${match.homeTeam.name} <span style="color: #6ecbff;">vs</span> ${match.awayTeam.name}
                    </div>
                    <div style="background: #ff9800; color: #050b1a; display: inline-block; padding: 5px 12px; border-radius: 5px; font-weight: 800; font-size: 0.9rem;">
                        PRONO : ${pronostic}
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error("PCS-IA Error:", error);
        container.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <p>Analyse des côtes en cours... Utilisez le code <b>PICSOUS</b> sur 1xBet en attendant !</p>
                <a href="https://reffpa.com/L?tag=d_4922326m_97c_&site=4922326&ad=97&r=registration" style="color:#6ecbff; text-decoration:none;">Ouvrir 1xBet →</a>
            </div>`;
    }
}

    } catch (error) {
        console.error("Erreur détaillée lors du fetch:", error);
        container.innerHTML = "<p>Erreur de connexion aux données. Pariez avec le code <b>PICSOUS</b> sur 1xBet !</p>";
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', fetchDailyPredictions);






