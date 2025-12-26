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
    
    // Lance le chargement des pronostics
    loadAllPredictions();
});
async function loadAllPredictions() {
    try {
        const response = await fetch('pronos.json');
        if (!response.ok) throw new Error("Erreur lors de la récupération du JSON");
        
        const data = await response.json();
        const allVisuals = document.querySelectorAll('.ai-visual');

        data.predictions.forEach((prono, index) => {
            if (allVisuals[index]) {
                const card = allVisuals[index];
                card.innerHTML = `
                    <div class="card-header">${prono.league}</div>
                    <div class="match-info">
                        <div class="team">
                            <img src="${prono.homeLogo}" alt="${prono.homeTeam}" style="width:30px;">
                            <span>${prono.homeTeam}</span>
                        </div>
                        <div class="date-time">${prono.date}<br>${prono.time}</div>
                        <div class="team">
                            <img src="${prono.awayLogo}" alt="${prono.awayTeam}" style="width:30px;">
                            <span>${prono.awayTeam}</span>
                        </div>
                    </div>
                    <div class="prediction-label">Le pronostic :</div>
                    <div class="result-box">${prono.prediction}</div>
                    <a href="${prono.affiliateLink}" class="bet-button">PARIEZ MAINTENANT !</a>
                `;
            }
        });
    } catch (error) {
        console.error("Erreur de chargement des pronos:", error);
    }
}

// Initialisation unique
window.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Lancement des pronos
    loadAllPredictions();
});
