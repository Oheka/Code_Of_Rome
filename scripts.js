document.addEventListener("DOMContentLoaded", () => {
    const encodedPhrases = [
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

    const phrases = encodedPhrases.map(atob);
    let remainingPhrases = [...phrases];
    const totalPhrases = phrases.length;
    let solvedCount = 0;
    let startTime;

    const startButton = document.getElementById("startButton");
    const checkButton = document.getElementById("checkButton");
    const cipherText = document.getElementById("cipherText");
    const inputText = document.getElementById("inputText");
    const resultMessage = document.getElementById("resultMessage");
    const solvedCounter = document.getElementById("solvedCounter");
    const timeElement = document.getElementById("time");

    function updateCounter() {
        solvedCounter.textContent = `Phrases solved: ${solvedCount}/${totalPhrases}`;
    }

    function displayMessage(message, isSuccess) {
        resultMessage.innerHTML = message;
        resultMessage.className = `message ${isSuccess ? "success" : "error"}`;
    }

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    function caesarCipher(text, shift) {
        return text
            .split("")
            .map(char => {
                if (/[a-zA-Z]/.test(char)) {
                    const base = char.charCodeAt(0) >= 97 ? 97 : 65;
                    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
                }
                return char;
            })
            .join("");
    }

    function startGame() {
        if (remainingPhrases.length === 0) {
            displayMessage(
                "Ave Caesar, thesaurus tuus est!",
                true
            );
            checkButton.disabled = true;
            startButton.disabled = true;
            return;
        }

        startButton.disabled = true;
        checkButton.disabled = false;
        inputText.value = "";

        const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
        const phrase = remainingPhrases.splice(randomIndex, 1)[0];
        const shift = Math.floor(Math.random() * 25) + 1;

        cipherText.textContent = caesarCipher(phrase, shift);
        displayMessage("", false);
        startTime = new Date();
    }

    function checkAnswer() {
        const userAnswer = inputText.value.trim();
        const endTime = new Date();

        if (!userAnswer) {
            displayMessage("Please enter your decryption.", false);
            return;
        }

        const decryptedText = cipherText.textContent;

        if (phrases.includes(userAnswer)) {
            const timeTaken = endTime - startTime;
            solvedCount++;
            updateCounter();
            displayMessage("Correct! Well done!", true);
            timeElement.textContent = formatTime(timeTaken);

            if (solvedCount === totalPhrases) {
                displayMessage(
                    "Ave Caesar, thesaurus tuus est!",
                    true
                );
                checkButton.disabled = true;
                startButton.disabled = true;
            } else {
                startButton.disabled = false;
                checkButton.disabled = true;
            }
        } else {
            displayMessage("Incorrect! Try again.", false);
        }
    }

    startButton.addEventListener("click", startGame);
    checkButton.addEventListener("click", checkAnswer);

    updateCounter();
});
