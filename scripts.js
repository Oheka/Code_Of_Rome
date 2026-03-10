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
};

// ── Ember particles ──
function createEmbers() {
    const container = document.getElementById('embers');
    if (!container) return;
    for (let i = 0; i < 18; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.cssText = `
            left: ${Math.random() * 100}%;
            --dur: ${5 + Math.random() * 8}s;
            --delay: ${Math.random() * 8}s;
            --drift: ${(Math.random() - 0.5) * 120}px;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            opacity: 0;
        `;
        container.appendChild(ember);
    }
}

// ── Utilities ──
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const base = char.charCodeAt(0) >= 97 ? 97 : 65;
            return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
}

// ── Cipher animation ──
function animateCipherText(text) {
    const container = elements.cipherText;
    container.className = 'cipher-text';
    container.innerHTML = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'cipher-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 16}ms`;
        container.appendChild(span);
    });
    elements.cipherBox.classList.add('active');
}

// ── Progress & Stats ──
function updateProgress() {
    const pct = (solvedCount / phrases.length) * 100;
    elements.progressFill.style.width = `${pct}%`;
    elements.progressBadge.textContent = `${solvedCount} / ${phrases.length}`;
    document.querySelectorAll('.marker').forEach((m, i) => m.classList.toggle('active', i < solvedCount));
}

function updateStats() {
    elements.statSolved.textContent = solvedCount;
    const acc = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    elements.statAccuracy.textContent = `${acc}%`;
}

// ── Feedback ──
function showFeedback(message, isSuccess) {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = `feedback-message ${isSuccess ? 'success' : 'error'}`;
    elements.feedbackMessage.style.display = 'block';
    if (!isSuccess) {
        elements.inputText.classList.add('shake');
        setTimeout(() => elements.inputText.classList.remove('shake'), 400);
    }
    clearTimeout(elements.feedbackMessage._t);
    elements.feedbackMessage._t = setTimeout(() => { elements.feedbackMessage.style.display = 'none'; }, 3000);
}

// ── Hint ──
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

// ── Confetti ──
function launchConfetti() {
    const end = Date.now() + 3500;
    const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return; }
        confetti({ particleCount: 4, angle: 60,  spread: 60, origin: { x: 0 }, colors: ['#c9a227','#e8c84a','#7a5518','#f5e6b0'] });
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#c9a227','#e8c84a','#7a5518','#f5e6b0'] });
    }, 55);
}

// ── Modal ──
function showVictoryModal() {
    elements.victoryTitle.textContent = VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)];
    elements.modalSolved.textContent = solvedCount;
    const acc = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    elements.modalAccuracy.textContent = `${acc}%`;
    elements.victoryModal.classList.add('show');
    launchConfetti();
}

function closeVictoryModal() { elements.victoryModal.classList.remove('show'); }

function scrollToGame() {
    document.getElementById('game-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Game Logic ──
function startGame() {
    if (remainingPhrases.length === 0) { showVictoryModal(); return; }
    const idx = Math.floor(Math.random() * remainingPhrases.length);
    currentPhrase = remainingPhrases[idx];
    remainingPhrases.splice(idx, 1);
    currentShift = Math.floor(Math.random() * 25) + 1;
    animateCipherText(caesarCipher(currentPhrase, currentShift));
    elements.inputText.value = '';
    elements.inputText.disabled = false;
    elements.inputText.focus();
    resetHint();
    elements.startButton.style.display = 'none';
    elements.checkButton.style.display = 'inline-flex';
    elements.checkButton.disabled = false;
    elements.feedbackMessage.style.display = 'none';
    startTime = Date.now();
    if (solvedCount > 0) elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Next Phrase';
}

function checkAnswer() {
    const answer = elements.inputText.value.trim();
    if (!answer) { showFeedback('Enter your decryption before checking.', false); return; }
    totalAttempts++;
    failedAttempts++;
    if (failedAttempts >= 2 && !hintUsed) elements.hintBtn.classList.add('visible');
    if (answer === currentPhrase) {
        solvedCount++;
        showFeedback('✓ Correct! Ave, Scholar!', true);
        elements.statTime.textContent = formatTime(Date.now() - startTime);
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
    solvedCount = 0; totalAttempts = 0; currentPhrase = null; startTime = null; failedAttempts = 0;
    elements.cipherText.innerHTML = '· · · · · · ·';
    elements.cipherText.className = 'cipher-text placeholder';
    elements.cipherBox.classList.remove('active');
    elements.inputText.value = ''; elements.inputText.disabled = true;
    elements.statTime.textContent = '--';
    elements.startButton.innerHTML = '<span class="btn-icon">✨</span> Start Game';
    elements.startButton.style.display = 'inline-flex';
    elements.checkButton.style.display = 'none';
    elements.feedbackMessage.style.display = 'none';
    resetHint(); updateProgress(); updateStats(); closeVictoryModal(); scrollToGame();
}

// ── Keyboard ──
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!elements.checkButton.disabled && elements.checkButton.style.display !== 'none') checkAnswer();
    }
    if (e.key === 'Escape') closeVictoryModal();
});

// ── Init ──
window.addEventListener('load', () => document.getElementById('heroBg')?.classList.add('loaded'));

document.addEventListener('DOMContentLoaded', () => {
    createEmbers();
    updateProgress();
    updateStats();
});
