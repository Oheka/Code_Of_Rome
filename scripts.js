// ===== GAME STATE =====
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
let failedAttempts = 0;
let hintUsed = false;

// DOM Elements
const elements = {
    cipherText: document.getElementById('cipherText'),
    cipherBox: document.getElementById('cipherBox'),
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
    modalAccuracy: document.getElementById('modalAccuracy'),
    hintBtn: document.getElementById('hintBtn'),
    hintReveal: document.getElementById('hintReveal'),
    inputHint: document.getElementById('inputHint'),
};

// ===== UTILITY FUNCTIONS =====

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

// ===== CIPHER TEXT ANIMATION =====

function animateCipherText(text) {
    const container = elements.cipherText;
    container.className = 'cipher-text';
    container.innerHTML = '';

    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'cipher-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 18}ms`;
        container.appendChild(span);
    });

    elements.cipherBox.classList.add('active');
}

// ===== PROGRESS & STATS =====

function updateProgress() {
    const percentage = (solvedCount / phrases.length) * 100;
    elements.progressFill.style.width = `${percentage}%`;
    elements.progressBadge.textContent = `${solvedCount} / ${phrases.length}`;

    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        marker.classList.toggle('active', index < solvedCount);
    });
}

function updateStats() {
    elements.statSolved.textContent = solvedCount;
    const accuracy = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    elements.statAccuracy.textContent = `${accuracy}%`;
}

// ===== FEEDBACK =====

function showFeedback(message, isSuccess) {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = `feedback-message ${isSuccess ? 'success' : 'error'}`;
    elements.feedbackMessage.style.display = 'block';

    if (!isSuccess) {
        elements.inputText.classList.add('shake');
        setTimeout(() => elements.inputText.classList.remove('shake'), 400);
    }

    clearTimeout(elements.feedbackMessage._timeout);
    elements.feedbackMessage._timeout = setTimeout(() => {
        elements.feedbackMessage.style.display = 'none';
    }, 3000);
}

// ===== HINT SYSTEM =====

function revealHint() {
    hintUsed = true;
    elements.hintReveal.textContent = `Shift: +${currentShift} positions`;
    elements.hintReveal.classList.add('visible');
    elements.hintBtn.textContent = '✓ Hint Revealed';
    elements.hintBtn.disabled = true;
}

function resetHint() {
    hintUsed = false;
    failedAttempts = 0;
    elements.hintReveal.classList.remove('visible');
    elements.hintReveal.textContent = '';
    elements.hintBtn.classList.remove('visible');
    elements.hintBtn.disabled = false;
    elements.hintBtn.textContent = '⚡ Reveal Shift';
}

// ===== CONFETTI =====

function launchConfetti() {
    const duration = 3500;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return; }
        confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#c9a227', '#e8c84a', '#8a6520', '#f5e6b8'] });
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#c9a227', '#e8c84a', '#8a6520', '#f5e6b8'] });
    }, 55);
}

// ===== MODAL =====

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
    document.getElementById('game-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== GAME FUNCTIONS =====

function startGame() {
    if (remainingPhrases.length === 0) {
        showVictoryModal();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
    currentPhrase = remainingPhrases[randomIndex];
    remainingPhrases.splice(randomIndex, 1);

    currentShift = Math.floor(Math.random() * 25) + 1;

    // Animate cipher text
    const encrypted = caesarCipher(currentPhrase, currentShift);
    animateCipherText(encrypted);

    // Reset input and hint
    elements.inputText.value = '';
    elements.inputText.disabled = false;
    elements.inputText.focus();
    resetHint();

    // Buttons
    elements.startButton.style.display = 'none';
    elements.checkButton.style.display = 'inline-flex';
    elements.checkButton.disabled = false;

    // Hide feedback
    elements.feedbackMessage.style.display = 'none';

    // Timer
    startTime = Date.now();

    // Next button label
    if (solvedCount > 0) {
        elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Next Phrase';
    }
}

function checkAnswer() {
    const userAnswer = elements.inputText.value.trim();

    if (!userAnswer) {
        showFeedback('Enter your decryption before checking.', false);
        return;
    }

    totalAttempts++;
    failedAttempts++;

    // Show hint button after 2 failed attempts
    if (failedAttempts >= 2 && !hintUsed) {
        elements.hintBtn.classList.add('visible');
    }

    if (userAnswer === currentPhrase) {
        const timeTaken = Date.now() - startTime;
        solvedCount++;

        showFeedback('✓ Correct! Ave, Scholar!', true);
        elements.statTime.textContent = formatTime(timeTaken);

        elements.inputText.disabled = true;
        elements.checkButton.disabled = true;

        updateProgress();
        updateStats();

        if (solvedCount === phrases.length) {
            setTimeout(showVictoryModal, 1000);
        } else {
            setTimeout(() => {
                elements.startButton.style.display = 'inline-flex';
                elements.checkButton.style.display = 'none';
            }, 1500);
        }
    } else {
        showFeedback('✗ Incorrect — try another shift.', false);
        updateStats();
    }
}

function playAgain() {
    remainingPhrases = [...phrases];
    solvedCount = 0;
    totalAttempts = 0;
    currentPhrase = null;
    startTime = null;
    failedAttempts = 0;

    elements.cipherText.innerHTML = '· · · · · · ·';
    elements.cipherText.className = 'cipher-text placeholder';
    elements.cipherBox.classList.remove('active');
    elements.inputText.value = '';
    elements.inputText.disabled = true;
    elements.statTime.textContent = '--';
    elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Start Game';
    elements.startButton.style.display = 'inline-flex';
    elements.checkButton.style.display = 'none';
    elements.feedbackMessage.style.display = 'none';
    resetHint();

    updateProgress();
    updateStats();
    closeVictoryModal();
    scrollToGame();
}

// ===== KEYBOARD SHORTCUTS =====

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!elements.checkButton.disabled && elements.checkButton.style.display !== 'none') {
            checkAnswer();
        }
    }
    if (e.key === 'Escape') {
        closeVictoryModal();
    }
});

// ===== HERO BG =====

window.addEventListener('load', () => {
    document.getElementById('heroBg')?.classList.add('loaded');
});

// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateStats();
});
