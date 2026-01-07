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



(function() {
    // 1. Création du CSS
    const css = `
        #pcs-popup-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: none; justify-content: center;
            align-items: center; z-index: 99999; font-family: sans-serif;
        }
        #pcs-popup-content {
            background: white; padding: 30px; border-radius: 20px;
            max-width: 400px; text-align: center; position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin: 20px;
        }
        .pcs-close {
            position: absolute; top: 10px; right: 15px; font-size: 24px;
            cursor: pointer; color: #999;
        }
        .pcs-title { color: #007bff; font-weight: bold; font-size: 22px; margin-bottom: 15px; }
        .pcs-promo {
            background: #f8f9fa; border: 2px dashed #007bff;
            padding: 15px; font-size: 24px; font-weight: 900;
            color: #333; margin: 15px 0; display: block;
        }
        .pcs-btn {
            background: #28a745; color: white; padding: 15px 25px;
            text-decoration: none; border-radius: 50px; font-weight: bold;
            display: inline-block; transition: 0.3s;
        }
        .pcs-btn:hover { background: #218838; transform: scale(1.05); }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 2. Création du HTML de la Pop-up
    const popup = document.createElement('div');
    popup.id = 'pcs-popup-overlay';
    popup.innerHTML = `
        <div id="pcs-popup-content">
            <span class="pcs-close" id="closePcs">&times;</span>
            <div class="pcs-title">🎁 BONUS EXCLUSIF 1XBET</div>
            <p>Ne partez pas sans recevoir votre bonus<b>200% de bonus</b> !</p>
            <div class="pcs-promo" id="pcsCode">PICSOUS</div>
            <p><small>Copiez le code et cliquez ci-dessous :</small></p>
            <a href="https://reffpa.com/L?tag=d_4922335m_97c_&site=4922335&ad=97&r=registration" class="pcs-btn" target="_blank">S'INSCRIRE & RÉCLAMER</a>
        </div>
    `;
    document.body.appendChild(popup);

    // 3. Logique d'affichage
    const overlay = document.getElementById('pcs-popup-overlay');
    let hasShown = false;

    const showPopup = () => {
        if (!hasShown) {
            overlay.style.display = 'flex';
            hasShown = true;
            localStorage.setItem('pcs_popup_shown', 'true');
        }
    };

    // Détection de sortie (PC)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0) showPopup();
    });

    // Détection temps (Mobile/PC - après 20 secondes)
    setTimeout(showPopup, 20000);

    // Fermeture
    document.getElementById('closePcs').onclick = () => overlay.style.display = 'none';
    overlay.onclick = (e) => { if(e.target === overlay) overlay.style.display = 'none'; };
    
    // Auto-copie au clic sur le code
    document.getElementById('pcsCode').onclick = function() {
        navigator.clipboard.writeText("PICSOUS");
        alert("Code PICSOUS copié !");
    };
})();
