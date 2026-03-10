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

const VICTORY_QUOTES = {
    en: ["Veni, Vidi, Vici!", "Ave Caesar, Victoriam Obtinuisti!", "Gloria Aeterna!", "Fortuna Audaces Iuvat!"],
    fr: ["Veni, Vidi, Vici!", "Ave Caesar, Victoriam Obtinuisti!", "Gloire Éternelle !", "La Fortune Sourit aux Audacieux !"]
};

let phrases = ENCODED_PHRASES.map(atob);
let remainingPhrases = [...phrases];
let currentPhrase = null;
let currentShift = 0;
let solvedCount = 0;
let startTime = null;
let totalAttempts = 0;
let failedAttempts = 0;
let hintUsed = false;

const el = {
    cipherText: document.getElementById('cipherText'),
    cipherBox:  document.getElementById('cipherBox'),
    inputText:  document.getElementById('inputText'),
    startButton:document.getElementById('startButton'),
    startLabel: document.getElementById('startLabel'),
    checkButton:document.getElementById('checkButton'),
    feedback:   document.getElementById('feedbackMessage'),
    progFill:   document.getElementById('progressFill'),
    progBadge:  document.getElementById('progressBadge'),
    statSolved: document.getElementById('statSolved'),
    statTime:   document.getElementById('statTime'),
    statAcc:    document.getElementById('statAccuracy'),
    modal:      document.getElementById('victoryModal'),
    modalTitle: document.getElementById('victoryTitle'),
    modalSolved:document.getElementById('modalSolved'),
    modalAcc:   document.getElementById('modalAccuracy'),
    hintBtn:    document.getElementById('hintBtn'),
    hintReveal: document.getElementById('hintReveal'),
};

// ── Ember particles ──
function createEmbers() {
    const c = document.getElementById('embers');
    if (!c) return;
    for (let i = 0; i < 18; i++) {
        const e = document.createElement('div');
        e.className = 'ember';
        const s = 2 + Math.random() * 3;
        e.style.cssText = `left:${Math.random()*100}%;--dur:${5+Math.random()*8}s;--delay:${Math.random()*8}s;--drift:${(Math.random()-.5)*120}px;width:${s}px;height:${s}px;`;
        c.appendChild(e);
    }
}

// ── Cipher ──
function caesarCipher(text, shift) {
    return text.split('').map(c => {
        if (/[a-zA-Z]/.test(c)) {
            const base = c.charCodeAt(0) >= 97 ? 97 : 65;
            return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
        }
        return c;
    }).join('');
}

function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
}

// ── Animate cipher text ──
function animateCipherText(text) {
    el.cipherText.className = 'cipher-text';
    el.cipherText.innerHTML = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'cipher-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 16}ms`;
        el.cipherText.appendChild(span);
    });
    el.cipherBox.classList.add('active');
}

// ── Progress & Stats ──
function updateProgress() {
    const pct = (solvedCount / phrases.length) * 100;
    el.progFill.style.width = `${pct}%`;
    el.progBadge.textContent = `${solvedCount} / ${phrases.length}`;
    document.querySelectorAll('.marker').forEach((m, i) => m.classList.toggle('active', i < solvedCount));
}

function updateStats() {
    el.statSolved.textContent = solvedCount;
    const acc = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    el.statAcc.textContent = `${acc}%`;
}

// ── Feedback ──
function showFeedback(message, isSuccess) {
    el.feedback.textContent = message;
    el.feedback.className = `feedback-message ${isSuccess ? 'success' : 'error'}`;
    el.feedback.style.display = 'block';
    if (!isSuccess) {
        el.inputText.classList.add('shake');
        setTimeout(() => el.inputText.classList.remove('shake'), 400);
    }
    clearTimeout(el.feedback._t);
    el.feedback._t = setTimeout(() => { el.feedback.style.display = 'none'; }, 3000);
}

// ── Hint ──
function revealHint() {
    hintUsed = true;
    const tpl = t('hint.shift');
    el.hintReveal.textContent = tpl.replace('{n}', currentShift);
    el.hintReveal.classList.add('visible');
    el.hintBtn.textContent = t('hint.revealed');
    el.hintBtn.disabled = true;
}

function resetHint() {
    hintUsed = false; failedAttempts = 0;
    el.hintReveal.classList.remove('visible');
    el.hintReveal.textContent = '';
    el.hintBtn.classList.remove('visible');
    el.hintBtn.disabled = false;
    el.hintBtn.textContent = t('hint.btn');
}

// ── Confetti ──
function launchConfetti() {
    const end = Date.now() + 3500;
    const iv = setInterval(() => {
        if (Date.now() > end) { clearInterval(iv); return; }
        confetti({ particleCount:4, angle:60,  spread:60, origin:{x:0}, colors:['#c9a227','#e8c84a','#7a5518','#f5e6b0'] });
        confetti({ particleCount:4, angle:120, spread:60, origin:{x:1}, colors:['#c9a227','#e8c84a','#7a5518','#f5e6b0'] });
    }, 55);
}

// ── Modal ──
function showVictoryModal() {
    const quotes = VICTORY_QUOTES[currentLang] || VICTORY_QUOTES.en;
    el.modalTitle.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    el.modalSolved.textContent = solvedCount;
    const acc = totalAttempts === 0 ? 100 : Math.round((solvedCount / totalAttempts) * 100);
    el.modalAcc.textContent = `${acc}%`;
    el.modal.classList.add('show');
    launchConfetti();
}

function closeVictoryModal() { el.modal.classList.remove('show'); }

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
    el.inputText.value = ''; el.inputText.disabled = false; el.inputText.focus();
    resetHint();
    el.startButton.style.display = 'none';
    el.checkButton.style.display = 'inline-flex';
    el.checkButton.disabled = false;
    el.feedback.style.display = 'none';
    startTime = Date.now();
    if (solvedCount > 0) el.startLabel.textContent = t('btn.next');
}

function checkAnswer() {
    const answer = el.inputText.value.trim();
    if (!answer) { showFeedback(t('feedback.empty'), false); return; }
    totalAttempts++; failedAttempts++;
    if (failedAttempts >= 2 && !hintUsed) el.hintBtn.classList.add('visible');
    if (answer === currentPhrase) {
        solvedCount++;
        showFeedback(t('feedback.correct'), true);
        el.statTime.textContent = formatTime(Date.now() - startTime);
        el.inputText.disabled = true; el.checkButton.disabled = true;
        updateProgress(); updateStats();
        if (solvedCount === phrases.length) {
            setTimeout(showVictoryModal, 1000);
        } else {
            setTimeout(() => {
                el.startButton.style.display = 'inline-flex';
                el.checkButton.style.display = 'none';
                el.startLabel.textContent = t('btn.next');
            }, 1500);
        }
    } else {
        showFeedback(t('feedback.wrong'), false);
        updateStats();
    }
}

function playAgain() {
    remainingPhrases = [...phrases];
    solvedCount = 0; totalAttempts = 0; currentPhrase = null; startTime = null; failedAttempts = 0;
    el.cipherText.innerHTML = '· · · · · · ·';
    el.cipherText.className = 'cipher-text placeholder';
    el.cipherBox.classList.remove('active');
    el.inputText.value = ''; el.inputText.disabled = true;
    el.statTime.textContent = '--';
    el.startLabel.textContent = t('btn.start');
    el.startButton.style.display = 'inline-flex';
    el.checkButton.style.display = 'none';
    el.feedback.style.display = 'none';
    resetHint(); updateProgress(); updateStats(); closeVictoryModal(); scrollToGame();
}

// Called by i18n when language changes
function onLangChange() {
    resetHint();
    if (solvedCount > 0 && el.startButton.style.display !== 'none') {
        el.startLabel.textContent = t('btn.next');
    }
}

// ── Keyboard ──
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!el.checkButton.disabled && el.checkButton.style.display !== 'none') checkAnswer();
    }
    if (e.key === 'Escape') closeVictoryModal();
});

window.addEventListener('load', () => document.getElementById('heroBg')?.classList.add('loaded'));

document.addEventListener('DOMContentLoaded', () => {
    createEmbers();
    updateProgress();
    updateStats();
});
