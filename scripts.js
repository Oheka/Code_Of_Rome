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

    // Decode Base64 phrases
    const phrases = encodedPhrases.map(atob);
    let remainingPhrases = [...phrases];
    const totalPhrases = phrases.length;
    let solvedCount = 0;
    let startTime;

    // UI Elements
    const startButton = document.getElementById("startButton");
    const checkButton = document.getElementById("checkButton");
    const cipherText = document.getElementById("cipherText");
    const inputText = document.getElementById("inputText");
    const resultMessage = document.getElementById("resultMessage");
    const solvedCounter = document.getElementById("solvedCounter");
    const timeElement = document.getElementById("time");

    // Update solved counter
    function updateCounter() {
        solvedCounter.textContent = `Phrases solved: ${solvedCount}/${totalPhrases}`;
    }

    // Display message
    function displayMessage(message, isSuccess) {
        resultMessage.innerHTML = message;
        resultMessage.className = `message ${isSuccess ? "success" : "error"}`;
    }

    // Format time in hh:mm:ss
    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Caesar cipher encoding/decoding
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

    // Start the game
    function startGame() {
        if (remainingPhrases.length === 0) {
            displayMessage(
                `<a href="https://yodh.app/#contract=eb1a30674f7cf9f1524f718ad9800a24879ead8c5fde37c44df6b0f90dcce300&secret=x7QDLOE0CnwO0rJZeTH0uypzhCa9oDYE1irN%2FrLB%2BA1Bv7lZi7oUCRH5aFV%2BMsJEQR5FsxXjjWu6YvlVgFJYJm9cSqPBg2bwiK%2Fx6f%2FBqVVPSwXQ2KmuXnjLIc%2FkaLerZibNssz%2FJSFGFdwL6pI70hhrIz4ZmKARvNEeRy7hw8g%3D&msg=Ave%20Caesar%2C%20thesaurus%20tuus%20est!" target="_blank">Ave Caesar, thesaurus tuus est!</a>`,
                true
            );
            checkButton.disabled = true;
            startButton.disabled = true;
            return;
        }

        // Enable input and buttons
        startButton.disabled = true;
        checkButton.disabled = false;
        inputText.value = "";

        // Pick a random phrase and shift
        const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
        const phrase = remainingPhrases.splice(randomIndex, 1)[0];
        const shift = Math.floor(Math.random() * 25) + 1;

        // Display encrypted text
        cipherText.textContent = caesarCipher(phrase, shift);
        displayMessage("", false);

        // Save start time
        startTime = new Date();
    }

    // Check user's answer
    function checkAnswer() {
        const userAnswer = inputText.value.trim();
        const endTime = new Date();

        if (!userAnswer) {
            displayMessage("Please enter your decryption.", false);
            return;
        }

        const decryptedText = cipherText.textContent;

        // Validate answer
        if (phrases.includes(userAnswer)) {
            const timeTaken = endTime - startTime;
            solvedCount++;
            updateCounter();
            displayMessage("Correct! Well done!", true);
            timeElement.textContent = formatTime(timeTaken);

            if (solvedCount === totalPhrases) {
                displayMessage(
                    `<a href="https://yodh.app/#contract=eb1a30674f7cf9f1524f718ad9800a24879ead8c5fde37c44df6b0f90dcce300&secret=x7QDLOE0CnwO0rJZeTH0uypzhCa9oDYE1irN%2FrLB%2BA1Bv7lZi7oUCRH5aFV%2BMsJEQR5FsxXjjWu6YvlVgFJYJm9cSqPBg2bwiK%2Fx6f%2FBqVVPSwXQ2KmuXnjLIc%2FkaLerZibNssz%2FJSFGFdwL6pI70hhrIz4ZmKARvNEeRy7hw8g%3D&msg=Ave%20Caesar%2C%20thesaurus%20tuus%20est!" target="_blank">Ave Caesar, thesaurus tuus est!</a>`,
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

    // Attach event listeners
    startButton.addEventListener("click", startGame);
    checkButton.addEventListener("click", checkAnswer);

    // Initialize UI
    updateCounter();
});
