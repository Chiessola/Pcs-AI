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
            initPronos();
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
    const API_KEY = '8622fb2ecc8a472cb649cdf14f78279d'; // Assure-toi qu'elle est correcte
    
    try {
        // On appelle maintenant la route Vercel que nous venons de créer
        const response = await fetch('/api/matches', {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) throw new Error('Erreur API');

        const data = await response.json();
        // Filtrer pour n'avoir que 5 matchs
        const matches = data.matches.slice(0, 5);

        if (matches.length === 0) {
            container.innerHTML = "<p>Aucun match majeur aujourd'hui.</p>";
            return;
        }

        container.innerHTML = matches.map(match => `
            <div style="background: rgba(255,255,255,0.05); margin-bottom: 12px; padding: 15px; border-radius: 12px; border: 1px solid #6ecbff;">
                <div style="font-size: 0.75rem; color: #6ecbff; text-transform: uppercase;">${match.competition.name}</div>
                <div style="font-weight: bold; margin: 8px 0;">${match.homeTeam.name} vs ${match.awayTeam.name}</div>
                <div style="color: #ff9800; font-weight: bold;">Conseil : Score +1.5 buts</div>
            </div>
        `).join('');

    } catch (error) {
        container.innerHTML = "<p>Mise à jour des scores... Tentez votre chance sur 1xBet !</p>";
    }
}

