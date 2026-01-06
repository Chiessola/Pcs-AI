
//pronostic basket 
document.addEventListener('DOMContentLoaded', function() {
    const aiVisualContainer = document.querySelector('.basketball-ai');
    const API_KEY = 'e33e4424-ec51-4984-a1fe-d612ce12dabf'; // Mettez votre ID/Clé ici
    const BASE_URL = 'https://v1.basketball.api-sports.io/games';

    async function getDailyBasketballPick() {
        if (!aiVisualContainer) return;

        // Date du jour au format YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        try {
            aiVisualContainer.innerHTML = '<p>Searching for the best odds...</p>';

            const response = await fetch(`${BASE_URL}?date=${today}&league=12&season=2025-2026`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.basketball.api-sports.io",
                    "x-apisports-key": API_KEY // Votre ID sert de clé ici
                }
            });

            const result = await response.json();
            
            // On vérifie s'il y a des matchs aujourd'hui
            if (result.response && result.response.length > 0) {
                const game = result.response[0]; // On prend le premier match
                
                const htmlContent = `
                    <div class="prediction-card" style="border: 2px solid #2980b9; padding: 20px; border-radius: 12px; font-family: sans-serif;">
                        <h3 style="color: #2c3e50; text-align: center;">🏀 Today's Top Basket Pick</h3>
                        <div style="display: flex; justify-content: space-around; align-items: center; margin: 20px 0;">
                            <div style="text-align: center;">
                                <img src="${game.teams.home.logo}" alt="${game.teams.home.name}" width="50"><br>
                                <strong>${game.teams.home.name}</strong>
                            </div>
                            <span style="font-weight: bold; font-size: 1.2em;">VS</span>
                            <div style="text-align: center;">
                                <img src="${game.teams.away.logo}" alt="${game.teams.away.name}" width="50"><br>
                                <strong>${game.teams.away.name}</strong>
                            </div>
                        </div>
                        <p style="text-align: center; background: #f8f9fa; padding: 10px; border-radius: 5px;">
                            <strong>Advice:</strong> Home Win or Over Points (Check Live Odds)
                        </p>
                        <div style="text-align: center; margin-top: 15px;">
                            <p>Get the best odds on <strong>1xBet</strong>!</p>
                            <a href="https://reffpa.com/L?tag=d_4922326m_97c_&site=4922326&ad=97&r=registration" style="background: #27ae60; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
                                Bet Now - Code: PICSOUS
                            </a>
                        </div>
                    </div>
                `;
                aiVisualContainer.innerHTML = htmlContent;
            } else {
                aiVisualContainer.innerHTML = "<p>No games scheduled for today. Come back tomorrow!</p>";
            }

        } catch (error) {
            console.error('API Error:', error);
            aiVisualContainer.innerHTML = '<p>Prediction temporary unavailable. Use code **PICSOUS** on 1xBet for your bonus!</p>';
        }
    }

    getDailyBasketballPick();
});