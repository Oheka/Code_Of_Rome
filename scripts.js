// Game State
const ENCODED_PHRASES = [
    "SSBjYW1lLCBJIHNhdywgSSBjb25xdWVyZWQu",
    "VGhlIGRpZSBpcyBjYXN0Lg==",
    "Q293YXJkcyBkaWUgbWFueSB0aW1lcyBiZWZvcmUgdGhlaXIgZGVhdGhzOyB0aGUgdmFsaWFudCBuZXZlciB0YXN0ZSBvZiBkZWF0aCBidXQgb25jZS4=",
    "SXQgaXMgbm90IHRoZXNlIHdlbGwtZmVkIGxvbmctaGFpcmVkIG1lbiB0aGF0IEkgZmVhciwgYnV0IHRoZSBwYWxlIGFuZCB0aGUgaHVuZ3J5LWxvb2tpbmcu",
    "TWVuIHdpbGxpbmdseSBiZWxpZXZlIHdoYXQgdGhleSB3aXNoLg==",
    "SSBsb3ZlIHRoZSBuYW1lIG9mIGhvbm9yIG1vcmUgdGhhbiBJIGZlYXIgZGVhdGgu",
    "SW4gd2FyLCBldmVudHMgb2YgaW1wb3J0YW5jZSBhcmUgdGhlIHJlc3VsdCBvZiB0cml2aWFsIGNhdXNlcy4=",
    "QXMgYSBydWxlLCB3aGF0IGlzIG91dCBvZiBzaWdodCBkaXN0dXJicyBtZW4ncyBtaW5kcyBtb3JlIHNlcmlvdXNseSB0aGFuIHdoYXQgdGhleSBzZWUu",
    "VGhlIGdyZWF0ZXN0IGVuZW15IHdpbGwgaGlkZSBpbiB0aGUgbGFzdCBwbGFjZSB5b3Ugd291bGQgZXZlciBsb29rLg==",
    "SWYgeW91IG11c3QgYnJlYWsgdGhlIGxhdywgZG8gaXQgdG8gc2VpemUgcG93ZXI6IGluIGFsbCBvdGhlciBjYXNlcyBvYnNlcnZlIGl0Lg=="
];

const VICTORY_QUOTES = [
    "Veni, Vidi, Vici!",
    "Ave Caesar, Victoriam Obtinuisti!",
    "Gloria Aeterna!",
    "Fortuna Audaces Iuvat!"
];

let phrases = ENCODED_PHRASES.map(atob);
let remainingPhrases = [...phrases];
let currentPhrase = null;
let currentShift = 0;
let solvedCount = 0;
let startTime = null;
let totalAttempts = 0;

// DOM Elements
const elements = {
    cipherText: document.getElementById('cipherText'),
    inputText: document.getElementById('inputText'),
    startButton: document.getElementById('startButton'),
    checkButton: document.getElementById('checkButton'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    progressFill: document.getElementById('progressFill'),
    progressBadge: document.getElementById('progressBadge'),
    statSolved: document.getElementById('statSolved'),
    statTime: document.getElementById('statTime'),
    statAccuracy: document.getElementById('statAccuracy'),
    victoryModal: document.getElementById('victoryModal'),
    victoryTitle: document.getElementById('victoryTitle'),
    modalSolved: document.getElementById('modalSolved'),
    modalAccuracy: document.getElementById('modalAccuracy')
};

// Utility Functions
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const base = char.charCodeAt(0) >= 97 ? 97 : 65;
            return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}

function updateProgress() {
    const percentage = (solvedCount / phrases.length) * 100;
    elements.progressFill.style.width = `${percentage}%`;
    elements.progressBadge.textContent = `${solvedCount} / ${phrases.length}`;
    
    // Update markers
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        if (index < solvedCount) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });
}

function updateStats() {
    elements.statSolved.textContent = solvedCount;
    const accuracy = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    elements.statAccuracy.textContent = `${accuracy}%`;
}

function showFeedback(message, isSuccess) {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = `feedback-message ${isSuccess ? 'success' : 'error'}`;
    elements.feedbackMessage.style.display = 'block';
    
    if (!isSuccess) {
        elements.inputText.classList.add('shake');
        setTimeout(() => elements.inputText.classList.remove('shake'), 400);
    }
    
    setTimeout(() => {
        elements.feedbackMessage.style.display = 'none';
    }, 3000);
}

function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }
        
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#b68b50', '#8a6a40', '#f8e9d4']
        });
        
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#b68b50', '#8a6a40', '#f8e9d4']
        });
    }, 50);
}

function showVictoryModal() {
    const randomQuote = VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)];
    elements.victoryTitle.textContent = randomQuote;
    elements.modalSolved.textContent = solvedCount;
    
    const accuracy = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    elements.modalAccuracy.textContent = `${accuracy}%`;
    
    elements.victoryModal.classList.add('show');
    launchConfetti();
}

function closeVictoryModal() {
    elements.victoryModal.classList.remove('show');
}

function scrollToGame() {
    document.getElementById('game-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Game Functions
function startGame() {
    if (remainingPhrases.length === 0) {
        showVictoryModal();
        return;
    }
    
    // Select random phrase
    const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
    currentPhrase = remainingPhrases[randomIndex];
    remainingPhrases.splice(randomIndex, 1);
    
    // Generate random shift
    currentShift = Math.floor(Math.random() * 25) + 1;
    
    // Encrypt and display
    elements.cipherText.textContent = caesarCipher(currentPhrase, currentShift);
    
    // Reset input
    elements.inputText.value = '';
    elements.inputText.disabled = false;
    elements.inputText.focus();
    
    // Update buttons
    elements.startButton.style.display = 'none';
    elements.checkButton.style.display = 'inline-flex';
    elements.checkButton.disabled = false;
    
    // Hide feedback
    elements.feedbackMessage.style.display = 'none';
    
    // Start timer
    startTime = Date.now();
    
    // Update button text
    if (solvedCount > 0) {
        elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Next Phrase';
    }
}

function checkAnswer() {
    const userAnswer = elements.inputText.value.trim();
    
    if (!userAnswer) {
        showFeedback('Please enter your decryption.', false);
        return;
    }
    
    totalAttempts++;
    
    if (userAnswer === currentPhrase) {
        // Correct answer
        const timeTaken = Date.now() - startTime;
        solvedCount++;
        
        showFeedback('✓ Correct! Well done!', true);
        elements.statTime.textContent = formatTime(timeTaken);
        
        // Disable input and check button
        elements.inputText.disabled = true;
        elements.checkButton.disabled = true;
        
        // Update progress and stats
        updateProgress();
        updateStats();
        
        // Check if game complete
        if (solvedCount === phrases.length) {
            setTimeout(() => {
                showVictoryModal();
            }, 1000);
        } else {
            // Show start button for next phrase
            setTimeout(() => {
                elements.startButton.style.display = 'inline-flex';
                elements.checkButton.style.display = 'none';
            }, 1500);
        }
    } else {
        // Incorrect answer
        showFeedback('✗ Incorrect! Try again.', false);
        updateStats();
    }
}

function playAgain() {
    // Reset game state
    remainingPhrases = [...phrases];
    solvedCount = 0;
    totalAttempts = 0;
    currentPhrase = null;
    startTime = null;
    
    // Reset UI
    elements.cipherText.textContent = '---';
    elements.inputText.value = '';
    elements.inputText.disabled = true;
    elements.statTime.textContent = '--';
    elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Start Game';
    elements.startButton.style.display = 'inline-flex';
    elements.checkButton.style.display = 'none';
    elements.feedbackMessage.style.display = 'none';
    
    // Update progress and stats
    updateProgress();
    updateStats();
    
    // Close modal
    closeVictoryModal();
    
    // Scroll to game
    scrollToGame();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter' && !elements.checkButton.disabled) {
        checkAnswer();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateStats();
});
