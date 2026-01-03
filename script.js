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
    // On lance uniquement l'IA pour tester
    fetchDailyPredictions();
    
    // Le reste est sécurisé par des "if"
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

        if (!response.ok) throw new Error('API_REJECTED');

        const data = await response.json();
        const matches = data.matches || [];

        if (matches.length === 0) {
            container.innerHTML = "<p>Aucun match aujourd'hui. Tentez votre chance sur 1xBet !</p>";
            return;
        }

        container.innerHTML = matches.slice(0, 5).map(match => `
            <div style="background:rgba(110,203,255,0.1); padding:15px; border-radius:10px; margin-bottom:10px; border:1px solid #6ecbff;">
                <p style="font-size:0.8rem; color:#6ecbff; margin:0;">${match.competition.name}</p>
                <p style="margin:5px 0;"><b>${match.homeTeam.name} vs ${match.awayTeam.name}</b></p>
                <p style="color:#ff9800; font-weight:bold; margin:0;">PRONO : Plus de 1.5 buts</p>
            </div>
        `).join('');

    } catch (error) {
        console.error("Erreur fatale:", error);
        container.innerHTML = "<p>Connexion perdue. Utilisez le code <b>PICSOUS</b> sur 1xBet pour parier maintenant !</p>";
    }
}
