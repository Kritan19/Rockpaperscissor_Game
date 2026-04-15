
// Game configuration
const GAME_CONFIG = {
    WINNING_SCORE: 5,
    WEAPONS: ['rock', 'paper', 'scissor'],
    EMOJIS: {
        rock: '✊',
        paper: '✋',
        scissor: '✌️'
    },
    COLORS: {
        win: '#2ecc71',
        lose: '#e74c3c',
        draw: '#f39c12',
        primary: '#3498db',
        secondary: '#2c3e50'
    }
};

// DOM Elements
const elements = {
    computerScore: document.getElementById('computerScore'),
    playerScore: document.getElementById('playerScore'),
    resultBox: document.getElementById('resultBox'),
    computerWeaponResult: document.getElementById('ComputerWeaponResult'),
    weapons: {
        rock: document.getElementById('rockImg'),
        paper: document.getElementById('paperImg'),
        scissor: document.getElementById('scissorImg')
    }
};

// Game state
let gameState = {
    playerScore: 0,
    computerScore: 0,
    isPlaying: true
};

/**
 * Get computer's random choice
 * @returns {string} Computer's weapon choice
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * GAME_CONFIG.WEAPONS.length);
    return GAME_CONFIG.WEAPONS[randomIndex];
}

/**
 * Determine the winner of a round
 * @param {string} playerChoice - Player's weapon choice
 * @param {string} computerChoice - Computer's weapon choice
 * @returns {Object} Result object with outcome and message
 */
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return { outcome: 'draw', message: "It's a draw!" };
    }

    const winConditions = {
        rock: 'scissor',
        paper: 'rock',
        scissor: 'paper'
    };

    if (winConditions[playerChoice] === computerChoice) {
        return { outcome: 'win', message: "You won this round!" };
    } else {
        return { outcome: 'lose', message: "You lost this round!" };
    }
}

/**
 * Show popup notification
 * @param {string} title - Popup title
 * @param {string} message - Popup message
 * @param {string} type - Popup type (info, success, warning, error)
 */
function showPopup(title, message, type = 'info') {
    // Remove any existing popups
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="popup-close">OK</button>
        </div>
    `;

    // Add styles if not already present
    if (!document.querySelector('#popup-styles')) {
        const style = document.createElement('style');
        style.id = 'popup-styles';
        style.textContent = `
            .popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }

            .popup-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-width: 90%;
                width: 400px;
                animation: popupFadeIn 0.3s ease-out;
            }

            @keyframes popupFadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .popup-info { border-left: 4px solid ${GAME_CONFIG.COLORS.primary}; }
            .popup-success { border-left: 4px solid ${GAME_CONFIG.COLORS.win}; }
            .popup-warning { border-left: 4px solid ${GAME_CONFIG.COLORS.draw}; }
            .popup-error { border-left: 4px solid ${GAME_CONFIG.COLORS.lose}; }

            .popup-content h3 {
                margin-top: 0;
                color: ${GAME_CONFIG.COLORS.secondary};
            }

            .popup-content p {
                margin: 1.5rem 0;
                font-size: 1.1rem;
                line-height: 1.5;
            }

            .popup-close {
                background: ${GAME_CONFIG.COLORS.primary};
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .popup-close:hover {
                background: #2980b9;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .popup-close:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Add popup to document
    document.body.appendChild(popup);

    // Close popup when button is clicked
    popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.remove();
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            popup.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

/**
 * Update the score display
 */
function updateScoreDisplay() {
    elements.computerScore.innerHTML = `Computer Score: <span class="score-value">${gameState.computerScore}</span>`;
    elements.playerScore.innerHTML = `Player Score: <span class="score-value">${gameState.playerScore}</span>`;
}

/**
 * Update the computer's weapon display with animation
 * @param {string} weapon - Computer's weapon choice
 */
function updateComputerWeaponDisplay(weapon) {
    elements.computerWeaponResult.innerHTML = `
        <div class="computer-weapon-display">
            <span>Computer chose: </span>
            <span class="weapon-emoji">${GAME_CONFIG.EMOJIS[weapon]}</span>
            <span class="weapon-text">${weapon.toUpperCase()}</span>
        </div>
    `;

    // Add styles for computer weapon display
    if (!document.querySelector('#computer-weapon-styles')) {
        const style = document.createElement('style');
        style.id = 'computer-weapon-styles';
        style.textContent = `
            .computer-weapon-display {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background: rgba(52, 152, 219, 0.1);
                border-radius: 10px;
                margin: 10px 0;
                animation: weaponPulse 0.6s ease-out;
            }

            @keyframes weaponPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .weapon-emoji {
                font-size: 2rem;
            }

            .weapon-text {
                font-weight: 600;
                color: ${GAME_CONFIG.COLORS.secondary};
                text-transform: capitalize;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Update the result display with animation
 * @param {string} message - Result message
 * @param {string} outcome - Outcome type (win, lose, draw)
 */
function updateResultDisplay(message, outcome) {
    // Clear previous animations
    elements.resultBox.className = '';

    // Set new content and animation based on outcome
    elements.resultBox.innerHTML = `
        <div class="result-message">
            <span class="result-emoji">${getResultEmoji(outcome)}</span>
            <span>${message}</span>
        </div>
    `;

    // Add result-specific animation class
    elements.resultBox.classList.add(`result-${outcome}`);

    // Add styles for result display
    if (!document.querySelector('#result-styles')) {
        const style = document.createElement('style');
        style.id = 'result-styles';
        style.textContent = `
            .result-message {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 15px;
                font-size: 1.2rem;
                font-weight: 600;
                min-height: 50px;
            }

            .result-emoji {
                font-size: 1.8rem;
            }

            .result-win {
                background: rgba(46, 204, 113, 0.1);
                border-left: 4px solid ${GAME_CONFIG.COLORS.win};
                animation: winPulse 0.6s ease-in-out infinite alternate;
            }

            .result-lose {
                background: rgba(231, 76, 60, 0.1);
                border-left: 4px solid ${GAME_CONFIG.COLORS.lose};
                animation: losePulse 0.6s ease-in-out infinite alternate;
            }

            .result-draw {
                background: rgba(243, 156, 18, 0.1);
                border-left: 4px solid ${GAME_CONFIG.COLORS.draw};
                animation: drawPulse 0.6s ease-in-out infinite alternate;
            }

            @keyframes winPulse {
                from { box-shadow: 0 0 5px rgba(46, 204, 113, 0.5); }
                to { box-shadow: 0 0 20px rgba(46, 204, 113, 0.8); }
            }

            @keyframes losePulse {
                from { box-shadow: 0 0 5px rgba(231, 76, 60, 0.5); }
                to { box-shadow: 0 0 20px rgba(231, 76, 60, 0.8); }
            }

            @keyframes drawPulse {
                from { box-shadow: 0 0 5px rgba(243, 156, 18, 0.5); }
                to { box-shadow: 0 0 20px rgba(243, 156, 18, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Get emoji for result outcome
 * @param {string} outcome - Outcome type
 * @returns {string} Emoji character
 */
function getResultEmoji(outcome) {
    switch (outcome) {
        case 'win': return '🎉';
        case 'lose': return '😢';
        case 'draw': return '😐';
        default: return '🎮';
    }
}

/**
 * Check if game is over and show final result
 */
function checkGameOver() {
    if (gameState.playerScore >= GAME_CONFIG.WINNING_SCORE) {
        showPopup(
            'Congratulations! 🏆',
            `You won the game with a score of ${gameState.playerScore} to ${gameState.computerScore}!`,
            'success'
        );

        // Disable further play
        gameState.isPlaying = false;
        disableWeaponButtons();

        // Reset game after delay
        setTimeout(() => {
            resetGame();
        }, 3000);

        return true;
    } else if (gameState.computerScore >= GAME_CONFIG.WINNING_SCORE) {
        showPopup(
            'Game Over 😞',
            `Computer won with a score of ${gameState.computerScore} to ${gameState.playerScore}. Better luck next time!`,
            'error'
        );

        // Disable further play
        gameState.isPlaying = false;
        disableWeaponButtons();

        // Reset game after delay
        setTimeout(() => {
            resetGame();
        }, 3000);

        return true;
    }

    return false;
}

/**
 * Disable weapon buttons when game is over
 */
function disableWeaponButtons() {
    Object.values(elements.weapons).forEach(weapon => {
        weapon.style.opacity = '0.5';
        weapon.style.cursor = 'not-allowed';
        weapon.disabled = true;
    });
}

/**
 * Enable weapon buttons when game starts/resets
 */
function enableWeaponButtons() {
    Object.values(elements.weapons).forEach(weapon => {
        weapon.style.opacity = '1';
        weapon.style.cursor = 'pointer';
        weapon.disabled = false;
    });
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.isPlaying = true;

    updateScoreDisplay();
    elements.resultBox.innerHTML = '';
    elements.computerWeaponResult.innerHTML = '';
    enableWeaponButtons();

    // Show welcome popup
    showPopup(
        'New Game Started! 🎮',
        'Choose your weapon to begin!',
        'info'
    );
}

/**
 * Handle player's weapon choice
 * @param {string} playerChoice - Player's weapon selection
 */
function handlePlayerChoice(playerChoice) {
    if (!gameState.isPlaying) return;

    // Get computer's choice
    const computerChoice = getComputerChoice();

    // Show computer choice popup
    showPopup(
        'Computer\'s Choice',
        `Computer chose ${computerChoice.toUpperCase()} ${GAME_CONFIG.EMOJIS[computerChoice]}`,
        'info'
    );

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    // Update scores
    if (result.outcome === 'win') {
        gameState.playerScore++;
    } else if (result.outcome === 'lose') {
        gameState.computerScore++;
    }

    // Update displays
    updateScoreDisplay();
    updateComputerWeaponDisplay(computerChoice);
    updateResultDisplay(result.message, result.outcome);

    // Check if game is over
    checkGameOver();
}

// Initialize game
function initGame() {
    // Set initial scores
    updateScoreDisplay();

    // Add event listeners to weapons
    Object.entries(elements.weapons).forEach(([weapon, element]) => {
        element.addEventListener('click', () => {
            handlePlayerChoice(weapon);

            // Add click animation
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
        });

        // Add hover effects
        element.addEventListener('mouseenter', () => {
            if (gameState.isPlaying) {
                element.style.transform = 'scale(1.05)';
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });

    // Add styles for weapon buttons
    if (!document.querySelector('#weapon-styles')) {
        const style = document.createElement('style');
        style.id = 'weapon-styles';
        style.textContent = `
            #rockImg, #paperImg, #scissorImg {
                transition: all 0.2s ease;
                border: 3px solid transparent;
                border-radius: 15px;
            }

            #rockImg:hover { border-color: #3498db; }
            #paperImg:hover { border-color: #2ecc71; }
            #scissorImg:hover { border-color: #e74c3c; }

            #rockImg:active { transform: scale(0.9); }
            #paperImg:active { transform: scale(0.9); }
            #scissorImg:active { transform: scale(0.9); }
        `;
        document.head.appendChild(style);
    }

    // Show welcome message
    showPopup(
        'Welcome to Rock Paper Scissors! 👋',
        'Click on your weapon to play. First to 5 points wins!',
        'info'
    );
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);