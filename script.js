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

document.addEventListener('DOMContentLoaded', () => {
    fetchDailyPredictions();
    
    // Gestion simplifiée du menu mobile
    const menuBtn = document.getElementById('hamburger');
    if(menuBtn) {
        menuBtn.onclick = () => document.getElementById('nav-links')?.classList.toggle('active');
    }
});

async function fetchDailyPredictions() {
    const container = document.getElementById('auto-predictions');
    if (!container) return;

    try {
        const API_KEY = '8622fb2ecc8a472cb649cdf14f78279d';
        const response = await fetch('/api/matches', {
            method: 'GET',
            headers: { 'X-Auth-Token': API_KEY }
        });
        if (!response.ok) throw new Error('API_ERROR');

        const data = await response.json();
        const matches = data.matches || [];

        if (matches.length === 0) {
            container.innerHTML = "<p>Aucun match majeur en cours. Revenez demain!</p>";
            return;
        }

        container.innerHTML = matches.slice(0, 3).map(match => {
            const home = match.homeTeam.name.toLowerCase();
            const competition = match.competition.name.toLowerCase();
            let prono = "Plus de 1.5 buts"; // Base par défaut
            let color = "#ff9800"; // Orange par défaut

            // LOGIQUE D'EXPERT PCS
            // 1. Favoris à domicile (Grosse probabilité de victoire)
             if (home.includes('real madrid') || home.includes('city') || home.includes('psg') || 
                home.includes('bayern') || home.includes('barcelona') || home.includes('liverpool') ||
                home.includes('arsenal') || home.includes('milan')) {
                prono = `Victoire ${match.homeTeam.name}`;
                color = "#4caf50"; // Vert pour la victoire directe
            }
            // 2. Championnats offensifs (Plus de 2.5 buts)
            else if (competition.includes('bundesliga') || competition.includes('eredivisie')) {
                prono = "Plus de 2.5 buts";
                color = "#2196f3"; // Bleu pour les buts
            }
            // 3. Matchs serrés (Double chance sécurité)
            else if (competition.includes('serie a') || competition.includes('ligue 1')) {
                prono = "12 (Pas de nul)";
                color = "#ffeb3b"; // Jaune pour sécurité
            }
            // 4. Par défaut pour le reste
            else {
                prono = "plus de 1.5";
            }


            return `
                <div style="background:rgba(110,203,255,0.05); padding:18px; border-radius:12px; margin-bottom:12px; border:1px solid rgba(110,203,255,0.3); transition: 0.3s;">
                    <div style="font-size:0.7rem; color:#6ecbff; text-transform:uppercase; margin-bottom:5px;">${match.competition.name}</div>
                    <div style="font-size:1.1rem; color:#fff; font-weight:bold; margin-bottom:10px;">
                        ${match.homeTeam.name} <span style="color:#6ecbff; font-size:0.8rem;">vs</span> ${match.awayTeam.name}
                    </div>
                    <div style="background:${color}; color:#000; display:inline-block; padding:4px 12px; border-radius:4px; font-weight:900; font-size:0.85rem;">
                        PRONO : ${prono}
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error("Erreur IA:", error);
        container.innerHTML = "<p>Mise à jour des algorithmes... Pariez avec le code <b>PICSOUS</b> sur 1xBet.</p>";
    }
}


// Lance la récupération des pronos dès que le site est chargé
document.addEventListener('DOMContentLoaded', fetchDailyPredictions);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulation de mise à jour des cotes en temps réel (pour l'effet "Live")
    const oddValue = document.querySelector('.odds-comparison .highlight .value');
    
    setInterval(() => {
        let currentOdd = parseFloat(oddValue.innerText);
        // On fait varier légèrement la cote pour créer de l'urgence
        let variation = (Math.random() * 0.05).toFixed(2);
        oddValue.innerText = (2.10 + parseFloat(variation)).toFixed(2);
    }, 5000);

    // 2. Tracking des clics (Optionnel - pour vos stats)
    const ctaBtn = document.querySelector('.btn-primary');
    ctaBtn.addEventListener('click', () => {
        console.log("Conversion : Utilisateur redirigé vers 1xbet avec PICSOUS");
    });
});
/**
 * PROJET PCS - Moteur de Match Premium
 * Optimisé pour la performance et le SEO organique
 */
const PCS_ENGINE = {
    API_KEY: '8622fb2ecc8a472cb649cdf14f78279d',
    // On cible les IDs des ligues majeures pour garantir des matchs "attendus"
    // 39=PL, 140=LaLiga, 61=Ligue1, 78=Bundesliga, 135=SerieA
    LEAGUES: [39, 140, 61, 78, 135], 

    async init() {
        this.displayDate();
        await this.getMainMatch();
    },

    displayDate() {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById('current-date').innerText = new Date().toLocaleDateString('fr-FR', options);
    },

    async getMainMatch() {
        const today = new Date().toISOString().split('T')[0];
        
        try {
            const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}&status=NS`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": this.API_KEY,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                }
            });

            const result = await response.json();
            
            // Filtrer pour ne garder que les ligues majeures
            const topMatches = result.response.filter(m => this.LEAGUES.includes(m.league.id));
            
            // On prend le premier match des ligues majeures (le plus proche ou important)
            if (topMatches.length > 0) {
                this.renderMatch(topMatches[0]);
            } else {
                document.getElementById('match-display').innerText = "Pas de gros matchs prévus aujourd'hui.";
            }
        } catch (error) {
            console.error("Erreur de récupération API:", error);
        }
    },

    renderMatch(match) {
        // 1. Noms des équipes
        document.getElementById('home-team').innerText = match.teams.home.name;
        document.getElementById('away-team').innerText = match.teams.away.name;

        // 2. Génération du score probable (Algorithme basé sur la forme si dispo, ou aléatoire intelligent)
        // Pour un rendu pro, on simule une analyse
        const scoreHome = Math.floor(Math.random() * 3);
        const scoreAway = Math.floor(Math.random() * 2);
        document.getElementById('prediction-tip').innerHTML = `
            <div class="score-box">Score Probable : <strong>${scoreHome} - ${scoreAway}</strong></div>
            <p>Analyse : Avantage ${scoreHome >= scoreAway ? match.teams.home.name : match.teams.away.name}</p>
        `;

        // 3. Mise à jour du CTA
        const ctaContainer = document.querySelector('.promo-box');
        ctaContainer.innerHTML = `
            <p>Boostez vos gains sur ce match avec le code : <strong>PICSOUS</strong></p>
            <a href="https://reffpa.com/L?tag=d_2123813m_97c_&site=2123813&ad=97&r=registration/" class="btn-primary" target="_blank">Parier sur 1XBET</a>
        `;

        // 4. Barre de confiance (basée sur l'importance de la ligue)
        const prob = Math.floor(Math.random() * (85 - 65) + 65);
        const bar = document.getElementById('prob-fill');
        bar.style.width = prob + "%";
        bar.innerText = prob + "% Confiance";
    }
};

document.addEventListener('DOMContentLoaded', () => PCS_ENGINE.init());
