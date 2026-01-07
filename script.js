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



//pronostic basket 
document.addEventListener('DOMContentLoaded', () => {
    const basketContainer = document.querySelector('.basketbal-ai');
    const API_KEY = 'e33e4424-ec51-4984-a1fe-d612ce12dabf';
async function getBasketballProno() {
    const basketContainer = document.querySelector('.basketbal-ai');
    if (!basketContainer) return;

    try {
        // Calcule demain à l'heure US
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const usaDateTomorrow = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(tomorrow); 
        
        basketContainer.innerHTML = '<p>Analyse des cotes pour demain...</p>';

        // On enlève le paramètre season pour laisser l'API décider
const response = await fetch(`/api/basketball?date=${usaDateTomorrow}&league=12`, { 
    method: 'GET',
    headers: {
        'x-apisports-key': 'e33e4424-ec51-4984-a1fe-d612ce12dabf'
    }
});

        const data = await response.json();
        console.log("Données NBA reçues :", data); // Pour vérifier dans l'inspecteur

        if (data.response && data.response.length > 0) {
            const game = data.response[0];
            basketContainer.innerHTML = `
                <div style="border: 2px solid #6ecbff; padding: 20px; border-radius: 12px; background: rgba(10,31,68,0.8); text-align:center;">
                    <h3 style="color:#6ecbff; margin-bottom:15px;">🏀 Prono NBA Demain</h3>
                    <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 15px;">
                        <div>
                            <img src="${game.teams.home.logo}" width="50"><br>
                            <strong>${game.teams.home.name}</strong>
                        </div>
                        <span style="font-weight:bold; color:#6ecbff;">VS</span>
                        <div>
                            <img src="${game.teams.away.logo}" width="50"><br>
                            <strong>${game.teams.away.name}</strong>
                        </div>
                    </div>
                    <div style="background:#6ecbff; color:#050b1a; padding:10px; font-weight:900; border-radius:8px; margin-bottom:15px;">
                        CONSEIL : VICTOIRE ${game.teams.home.name.toUpperCase()}
                    </div>
                    <p style="font-size:0.85rem;">Boostez vos gains sur 1xBet avec le code <b>PICSOUS</b></p>
                </div>
            `;
        } else {
            basketContainer.innerHTML = `<p>Aucun match NBA trouvé pour le ${usaDateTomorrow}. Vérifiez la saison en cours.</p>`;
        }
    } catch (error) {
        console.error("Erreur Fetch Basket:", error);
        basketContainer.innerHTML = "<p>Erreur de connexion à l'IA. Pariez avec le code <b>PICSOUS</b>.</p>";
    }
}
    getBasketballProno();
});

const TARGET_URL = "https://reffpa.com/L?tag=d_4922335m_97c_&site=4922335&ad=97&r=registration";

document.querySelectorAll("img").forEach(img => {
    if (img.parentElement.tagName.toLowerCase() !== "a") {
        const link = document.createElement("a");
        link.href = TARGET_URL;
        link.target = "_blank";
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
    }
});


(function () {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "promo-overlay";

  // Create popup
  const popup = document.createElement("div");
  popup.id = "promo-popup";

  popup.innerHTML = `
    <button id="promo-close">&times;</button>
    <h2>Create your account</h2>
    <p>Use promo code <strong>PICSOUS</strong> and unlock exclusive benefits.</p>
    <a href="https://reffpa.com/L?tag=d_4922335m_97c_&site=4922335&ad=97&r=registration" target="_blank" id="promo-cta">
      Create my account
    </a>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Close action
  document.getElementById("promo-close").onclick = function () {
    overlay.remove();
  };

  // Inject styles
  const style = document.createElement("style");
  style.innerHTML = `
    #promo-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
    }

    #promo-popup {
      background: linear-gradient(145deg, #0a1a33, #000);
      color: #fff;
      width: 100%;
      max-width: 420px;
      padding: 24px;
      border-radius: 14px;
      text-align: center;
      box-shadow: 0 0 40px rgba(0, 120, 255, 0.4);
      position: relative;
      font-family: Arial, sans-serif;
    }

    #promo-popup h2 {
      margin: 0 0 12px;
      font-size: 1.6rem;
      color: #4da3ff;
    }

    #promo-popup p {
      font-size: 1rem;
      margin-bottom: 20px;
      line-height: 1.4;
    }

    #promo-popup strong {
      color: #4da3ff;
    }

    #promo-cta {
      display: inline-block;
      padding: 14px 20px;
      background: #0066ff;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      transition: background 0.3s, transform 0.2s;
    }

    #promo-cta:hover {
      background: #0050cc;
      transform: scale(1.05);
    }

    #promo-close {
      position: absolute;
      top: 10px;
      right: 12px;
      background: none;
      border: none;
      color: #fff;
      font-size: 1.8rem;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      #promo-popup {
        padding: 20px;
      }

      #promo-popup h2 {
        font-size: 1.4rem;
      }
    }
  `;
  document.head.appendChild(style);
})();
