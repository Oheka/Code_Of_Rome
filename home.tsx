import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Clock, 
  Target, 
  Scroll, 
  Sparkles,
  ChevronDown 
} from "lucide-react";
import heroImage from "@assets/Code_Of_Rome_1761388101769.png";
import Confetti from "react-confetti";

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
  "SWYgeW91IG11c3QgYnJlYWsgdGhlIGxhdywgZG8gaXQgdG8gc2VpemUgcG93ZXI6IGluIGFsbCBvdGhlciBjYXNlcyBvYnNlcnZlIGl0Lg==",
];

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const VICTORY_QUOTES = [
  "Veni, Vidi, Vici!",
  "Ave Caesar, Victoriam Obtinuisti!",
  "Gloria Aeterna!",
  "Fortuna Audaces Iuvat!",
];

function caesarCipher(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const base = char.charCodeAt(0) >= 97 ? 97 : 65;
        return String.fromCharCode(
          ((char.charCodeAt(0) - base + shift) % 26) + base
        );
      }
      return char;
    })
    .join("");
}

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export default function Home() {
  const [phrases] = useState(() => ENCODED_PHRASES.map(atob));
  const [remainingPhrases, setRemainingPhrases] = useState<string[]>([...phrases]);
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
  const [encryptedText, setEncryptedText] = useState<string>("---");
  const [currentShift, setCurrentShift] = useState<number>(0);
  const [userInput, setUserInput] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shakeInput, setShakeInput] = useState(false);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startGame = () => {
    if (remainingPhrases.length === 0) {
      setShowVictory(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
    const phrase = remainingPhrases[randomIndex];
    const shift = Math.floor(Math.random() * 25) + 1;

    setCurrentPhrase(phrase);
    setCurrentShift(shift);
    setEncryptedText(caesarCipher(phrase, shift));
    setUserInput("");
    setFeedbackMessage("");
    setIsCorrect(null);
    setIsGameActive(true);
    setStartTime(Date.now());
    
    const newRemaining = [...remainingPhrases];
    newRemaining.splice(randomIndex, 1);
    setRemainingPhrases(newRemaining);
  };

  const checkAnswer = () => {
    if (!userInput.trim()) {
      setFeedbackMessage("Please enter your decryption.");
      setIsCorrect(false);
      return;
    }

    if (!currentPhrase) return;

    const timeTaken = Date.now() - (startTime || 0);

    if (userInput.trim() === currentPhrase) {
      setSolvedCount((prev) => prev + 1);
      setLastTime(timeTaken);
      setFeedbackMessage("Correct! Well done!");
      setIsCorrect(true);
      setIsGameActive(false);

      if (solvedCount + 1 === phrases.length) {
        setTimeout(() => {
          setShowVictory(true);
          setShowConfetti(true);
        }, 800);
      }
    } else {
      setFeedbackMessage("Incorrect! Try again.");
      setIsCorrect(false);
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
  };

  const scrollToGame = () => {
    const gameSection = document.getElementById("game-section");
    gameSection?.scrollIntoView({ behavior: "smooth" });
  };

  const accuracy = solvedCount > 0 ? 100 : 0;
  const progressPercentage = (solvedCount / phrases.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sans text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide">
              Code of Rome
            </h1>
            <p className="font-serif text-xl md:text-2xl text-white/90 italic mb-8 max-w-2xl mx-auto">
              Enter the mind of Rome and decrypt its secrets.
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Test your wit against the legendary Caesar Cipher. Decipher ancient Roman wisdom 
              and prove yourself worthy of the Empire's secrets.
            </p>
            <Button
              size="lg"
              onClick={scrollToGame}
              className="text-lg px-8 py-6 shadow-2xl"
              data-testid="button-scroll-to-game"
            >
              <Scroll className="mr-2 h-5 w-5" />
              Begin Your Quest
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </section>

      <section id="game-section" className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans text-2xl md:text-3xl font-semibold text-foreground">
                Your Progress
              </h2>
              <Badge variant="secondary" className="text-lg px-4 py-2" data-testid="badge-progress">
                {solvedCount} / {phrases.length}
              </Badge>
            </div>
            
            <div className="relative">
              <Progress value={progressPercentage} className="h-3" data-testid="progress-bar" />
              <div className="flex justify-between mt-3">
                {ROMAN_NUMERALS.map((numeral, index) => (
                  <div key={numeral} className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index < solvedCount
                          ? "bg-primary"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    <span className="text-xs mt-1 text-muted-foreground hidden md:block">
                      {numeral}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 relative overflow-visible">
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary/30 rounded-br-lg" />

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Encrypted Text
                  </label>
                  <div className="bg-accent/40 border-2 border-accent-border rounded-lg p-6 min-h-[120px] flex items-center justify-center">
                    <p 
                      className="font-mono text-xl md:text-2xl text-center text-foreground leading-relaxed"
                      data-testid="text-encrypted"
                    >
                      {encryptedText}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Your Decryption
                  </label>
                  <motion.div
                    animate={shakeInput ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter your decrypted message here..."
                      className="min-h-[120px] text-lg font-serif resize-none"
                      disabled={!isGameActive}
                      data-testid="input-answer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey && isGameActive) {
                          checkAnswer();
                        }
                      }}
                    />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hint: Caesar shifts by 1-25 positions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {!isGameActive ? (
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="flex-1 text-lg"
                      data-testid="button-start"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      {solvedCount === 0 ? "Start Game" : "Next Phrase"}
                    </Button>
                  ) : (
                    <Button
                      onClick={checkAnswer}
                      size="lg"
                      className="flex-1 text-lg"
                      data-testid="button-check"
                    >
                      <Target className="mr-2 h-5 w-5" />
                      Check Answer
                    </Button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {feedbackMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border-2 text-center font-serif text-lg ${
                        isCorrect
                          ? "bg-primary/10 border-primary text-primary-foreground"
                          : "bg-destructive/10 border-destructive text-destructive-foreground"
                      }`}
                      data-testid="text-feedback"
                    >
                      {feedbackMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phrases Solved</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-solved-count">
                    {solvedCount}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Time</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-time">
                    {lastTime ? formatTime(lastTime) : "--"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-accuracy">
                    {accuracy}%
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="bg-card border-t border-card-border py-12 mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif text-xl italic text-muted-foreground mb-6">
            "Can you decrypt like a Roman scholar?"
          </p>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground mb-2">
            Developed by <span className="font-semibold">Oheka</span>
          </p>
          <p className="text-xs text-muted-foreground italic">
            Fortuna audaces iuvat
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showVictory && (
          <>
            {showConfetti && (
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.3}
              />
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-card border-2 border-primary rounded-lg p-8 md:p-12 max-w-2xl w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <Trophy className="h-20 w-20 text-primary mx-auto mb-4" />
                  <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)]}
                  </h2>
                  <p className="font-serif text-xl text-muted-foreground italic">
                    You have conquered all {phrases.length} challenges!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-accent/40 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Solved</p>
                    <p className="text-3xl font-bold text-primary">{solvedCount}</p>
                  </div>
                  <div className="bg-accent/40 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-3xl font-bold text-primary">{accuracy}%</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={() => {
                    setShowVictory(false);
                    setShowConfetti(false);
                    setSolvedCount(0);
                    setRemainingPhrases([...phrases]);
                    setCurrentPhrase(null);
                    setEncryptedText("---");
                    setUserInput("");
                    setIsGameActive(false);
                    setFeedbackMessage("");
                    setIsCorrect(null);
                    setLastTime(null);
                    setStartTime(null);
                  }}
                  className="w-full text-lg"
                  data-testid="button-play-again"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Play Again
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
