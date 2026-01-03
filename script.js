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
            container.innerHTML = "<p>Aucun match majeur en cours. Revenez bientôt !</p>";
            return;
        }

        container.innerHTML = matches.slice(0, 3).map(match => {
            const home = match.homeTeam.name.toLowerCase();
            const competition = match.competition.name.toLowerCase();
            let prono = "Plus de 1.5 buts"; // Base par défaut
            let color = "#ff9800"; // Orange par défaut

            // LOGIQUE D'EXPERT PCS
            // 1. Favoris à domicile (Grosse probabilité de victoire)
             if (competition.includes('bundesliga') || competition.includes('eredivisie')) {
        pronostic = "Plus de 2.5 buts"; 
    } 
    // 2. Détection des Favoris (Exemple: Si une grosse équipe joue à domicile)
    else if (homeTeam.includes('real madrid') || homeTeam.includes('bayern') || homeTeam.includes('city') || homeTeam.includes('psg')) {
        pronostic = `Victoire ${match.homeTeam.name}`;
    }
    // 3. Détection des matchs serrés (Championnats plus tactiques)
    else if (competition.includes('serie a') || competition.includes('ligue 1')) {
        pronostic = "Moins de 3.5 buts";
    }
    // 4. Par défaut pour les autres matchs programmés
    else if (match.status === 'TIMED') {
        pronostic = "Double Chance";
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



