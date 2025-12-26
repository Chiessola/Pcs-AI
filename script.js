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
        console.log("Tentative de chargement du JSON...");
        const response = await fetch('./pronos.json');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        const allVisuals = document.querySelectorAll('.ai-visual');

        console.log("Données reçues :", data.predictions.length, "matchs trouvés.");

        data.predictions.forEach((prono, index) => {
            if (allVisuals[index]) {
                const card = allVisuals[index];
                // On utilise || "" pour éviter d'afficher "undefined" si une donnée manque
                card.innerHTML = `
                    <div class="card-header">${prono.league || "Ligue Inconnue"}</div>
                    <div class="match-info">
                        <div class="team">
                            <img src="${prono.homeLogo || ''}" alt="${prono.homeTeam || 'Home'}" style="width:30px;">
                            <span>${prono.homeTeam || "Équipe 1"}</span>
                        </div>
                        <div class="date-time">${prono.date || "Date"}<br>${prono.time || "Heure"}</div>
                        <div class="team">
                            <img src="${prono.awayLogo || ''}" alt="${prono.awayTeam || 'Away'}" style="width:30px;">
                            <span>${prono.awayTeam || "Équipe 2"}</span>
                        </div>
                    </div>
                    <div class="prediction-label">Le pronostic :</div>
                    <div class="result-box">${prono.prediction || "En attente..."}</div>
                    <a href="${prono.affiliateLink || '#'}" class="bet-button">PARIEZ MAINTENANT !</a>
                `;
            }
        });
    } catch (error) {
        console.error("Erreur critique lors du chargement :", error);
    }
}

// Lancement au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    loadAllPredictions();
    
    // Ton code pour le menu hamburger ici si besoin
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
    }
});

async function loadAllPredictions() {
    const container = document.getElementById('predictions-container');
    if (!container) return;

    try {
        // 1. Appel du fichier JSON
        const response = await fetch('./pronos.json');
        if (!response.ok) throw new Error("Erreur de chargement du JSON");
        
        const data = await response.json();
        
        // 2. On vide le conteneur avant d'ajouter les matchs
        container.innerHTML = "";

        // 3. Boucle sur chaque pronostic du JSON
        data.predictions.forEach(prono => {
            const card = document.createElement('div');
            card.className = "ai-visual prediction-card"; // Garde tes classes CSS actuelles
            
            card.innerHTML = `
                <div class="card-header">${prono.league}</div>
                <div class="match-info">
                    <div class="team">
                        <img src="${prono.homeLogo}" alt="${prono.homeTeam}" style="width:35px;height:35px;object-fit:contain;">
                        <span>${prono.homeTeam}</span>
                    </div>
                    <div class="date-time">${prono.date}<br>${prono.time}</div>
                    <div class="team">
                        <img src="${prono.awayLogo}" alt="${prono.awayTeam}" style="width:35px;height:35px;object-fit:contain;">
                        <span>${prono.awayTeam}</span>
                    </div>
                </div>
                <div class="prediction-label">Le pronostic :</div>
                <div class="result-box">${prono.prediction}</div>
                <a href="${prono.affiliateLink}" class="bet-button" target="_blank">
                    <span class="icon">↗</span> PARIEZ MAINTENANT !
                </a>
                <p class="bonus-text">Bonus disponible via ce lien</p>
            `;
            
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erreur:", error);
        container.innerHTML = "<p style='color:white; text-align:center;'>Mise à jour des pronostics en cours...</p>";
    }
}

// Lancement au démarrage
document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu hamburger (on le garde car il est important pour le mobile)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
    }

    loadAllPredictions();
});
