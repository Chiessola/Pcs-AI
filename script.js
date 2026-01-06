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
// GESTION UNIQUE DU MENU HAMBURGER PCS
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('#nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche les bugs de clic
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermer le menu si on clique sur un lien (pour naviguer sur la page)
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Fermer le menu si on clique n'importe où ailleurs sur l'écran
        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
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

//GIF ANIMATION 
// Remplacez 3000 par la durée de votre GIF en millisecondes
const gif = document.querySelector('#myGif');
setInterval(() => {
    const src = gif.src;
    gif.src = '';
    gif.src = src;
}, 3000);


