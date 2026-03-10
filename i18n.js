// ── Language system ──
const TRANSLATIONS = {
    en: {
        // Nav
        'game':    'Game',
        'history': 'History',

        // Hero
        'hero.eyebrow':     'SPQR · Senatus Populusque Romanus',
        'hero.subtitle':    'Enter the mind of Rome. Decrypt its secrets.',
        'hero.description': 'Test your wit against the legendary Caesar Cipher. Decipher ancient Roman wisdom and prove yourself worthy of the Empire\'s most guarded secrets.',
        'hero.btn.play':    'Begin Your Quest',
        'hero.btn.history': 'Discover the History',
        'scroll.label':     'Descende',

        // Game
        'section.tag':      '⚔ Decipherment Chamber ⚔',
        'section.title':    'Solve the Cipher',
        'progress.title':   'Scroll Progress',
        'cipher.label':     '⚙ Encrypted Transmission',
        'input.label':      '✦ Your Decryption',
        'input.placeholder':'Type your decryption here, including punctuation…',
        'input.hint':       'Shift: 1–25 positions. Respect exact punctuation, spaces & capitalisation.',
        'hint.btn':         '⚡ Reveal Shift',
        'hint.revealed':    '✓ Hint Revealed',
        'btn.start':        'Start Game',
        'btn.next':         'Next Phrase',
        'btn.check':        'Check Answer',

        // Feedback
        'feedback.empty':   'Enter your decryption before checking.',
        'feedback.correct': '✓ Correct! Ave, Scholar!',
        'feedback.wrong':   '✗ Incorrect — try another shift.',
        'hint.shift':       'Shift: +{n} positions',

        // Stats
        'stat.solved':   'Phrases Solved',
        'stat.time':     'Last Time',
        'stat.accuracy': 'Accuracy',

        // Modal
        'modal.subtitle':   'You have conquered all 10 challenges!',
        'modal.solved':     'Total Solved',
        'modal.accuracy':   'Accuracy',
        'btn.playagain':    'Play Again',

        // Footer
        'footer.quote': '"Can you decrypt like a Roman scholar?"',
        'footer.by':    'Developed by',
    },

    fr: {
        // Nav
        'game':    'Jeu',
        'history': 'Histoire',

        // Hero
        'hero.eyebrow':     'SPQR · Senatus Populusque Romanus',
        'hero.subtitle':    'Entrez dans l\'esprit de Rome. Déchiffrez ses secrets.',
        'hero.description': 'Mettez votre intelligence à l\'épreuve contre le légendaire chiffre de César. Décodez la sagesse romaine antique et prouvez que vous méritez les secrets les mieux gardés de l\'Empire.',
        'hero.btn.play':    'Commencer la Quête',
        'hero.btn.history': 'Découvrir l\'Histoire',
        'scroll.label':     'Descendre',

        // Game
        'section.tag':      '⚔ Chambre de Déchiffrement ⚔',
        'section.title':    'Résolvez le Chiffre',
        'progress.title':   'Progression',
        'cipher.label':     '⚙ Message Chiffré',
        'input.label':      '✦ Votre Déchiffrement',
        'input.placeholder':'Saisissez votre déchiffrement ici, ponctuation incluse…',
        'input.hint':       'Décalage : 1 à 25 positions. Respectez la ponctuation, les espaces et les majuscules.',
        'hint.btn':         '⚡ Révéler le Décalage',
        'hint.revealed':    '✓ Indice Révélé',
        'btn.start':        'Lancer le Jeu',
        'btn.next':         'Phrase Suivante',
        'btn.check':        'Vérifier',

        // Feedback
        'feedback.empty':   'Entrez votre déchiffrement avant de vérifier.',
        'feedback.correct': '✓ Correct ! Ave, Érudit !',
        'feedback.wrong':   '✗ Incorrect — essayez un autre décalage.',
        'hint.shift':       'Décalage : +{n} positions',

        // Stats
        'stat.solved':   'Phrases Résolues',
        'stat.time':     'Dernier Temps',
        'stat.accuracy': 'Précision',

        // Modal
        'modal.subtitle':   'Vous avez conquis les 10 défis !',
        'modal.solved':     'Total Résolu',
        'modal.accuracy':   'Précision',
        'btn.playagain':    'Rejouer',

        // Footer
        'footer.quote': '"Pouvez-vous déchiffrer comme un érudit romain ?"',
        'footer.by':    'Développé par',
    }
};

// History page translations
const HISTORY_TRANSLATIONS = {
    en: {
        'hist.tag':   'HISTORIA CRYPTOGRAPHIAE',
        'hist.title': 'The Caesar Cipher',
        'hist.lead':  'From the battlefields of Gaul to the halls of modern cryptography — the story of the world\'s most famous cipher.',

        's1.title': 'Julius Caesar — The Man Behind the Code',
        's1.p1': '<strong>Gaius Julius Caesar</strong> (100 – 44 BC) was a Roman general, statesman, and one of the most pivotal figures in Western history. Renowned for his military genius during the Gallic Wars (58–50 BC), he conquered vast territories stretching from modern-day France to Belgium, adding enormous wealth and prestige to Rome. But Caesar was not only a warrior — he was a calculating strategist who understood that information, when intercepted by the enemy, could be as deadly as any blade.',
        's1.p2': 'Caesar maintained a vast network of communications spanning thousands of kilometres. His dispatches to Rome, his instructions to lieutenants, his personal correspondence with Cicero and other senators — all of it flowed through messengers who crossed dangerous territory. Captured couriers were a real risk. The solution? A simple but effective encryption system that only his trusted recipients could read.',
        's1.p3': 'Caesar\'s cipher, described by the Roman historian <strong>Suetonius</strong> in his work <em>Life of Julius Caesar</em>, consisted of substituting each letter of the alphabet with one a fixed number of positions further along. Caesar himself reportedly favoured a shift of <strong>three positions</strong> — so "A" became "D", "B" became "E", and so on.',
        's1.quote': 'If he had anything confidential to say, he wrote it in cipher, that is, by so changing the order of the letters of the alphabet, that not a word could be made out.',
        's1.cite': '— Suetonius, <em>De Vita Caesarum</em>, c. 121 AD',

        's2.title': 'How the Caesar Cipher Works',
        's2.p1': 'The Caesar cipher is a <strong>substitution cipher</strong> — each letter in the original message (called the <em>plaintext</em>) is replaced by a letter a fixed number of positions down the alphabet. This fixed number is called the <strong>shift</strong> or <strong>key</strong>. Because there are 26 letters in the modern alphabet, there are 25 possible non-trivial shifts.',
        's2.p2': 'The transformation is mathematically expressed as: <strong>E(x) = (x + n) mod 26</strong>, where <em>x</em> is the position of the letter (A=0, B=1… Z=25) and <em>n</em> is the shift. To decrypt, the recipient simply applies the inverse: <strong>D(x) = (x − n) mod 26</strong>.',
        's2.p3': 'For example, with a shift of 3 — Caesar\'s preferred key — the alphabet maps like this:',
        's2.demo.title': '✦ Interactive Cipher Demo ✦',
        's2.demo.label.text': 'Your message (plaintext)',
        's2.demo.label.shift': 'Shift (key)',
        's2.demo.label.output': 'Encrypted result (ciphertext)',
        's2.plain.label': 'Plain →',
        's2.cipher.label': 'Cipher →',
        's2.p4': 'The cipher works on letters only; spaces, punctuation, and numbers are left unchanged. This makes it easy to apply by hand — something a Roman soldier or scribe could do quickly in the field using a simple substitution table.',
        's2.p5': 'Caesar sometimes varied his approach. According to <strong>Valerius Probus</strong>, Caesar also used a Greek alphabet cipher for particularly sensitive messages, making decryption even harder for those who intercepted his letters.',

        's3.title': 'Historical Uses & Military Intelligence',
        'card.gallic.title': 'The Gallic Wars (58–50 BC)',
        'card.gallic.p': "Caesar's primary use of the cipher was during his eight-year campaign in Gaul. He encrypted orders to his legions, instructions about troop movements, and reports to the Senate in Rome — all to prevent Gallic tribes from exploiting captured couriers.",
        'card.political.title': 'Political Correspondence',
        'card.political.p': "Caesar used encryption in his personal letters to Cicero and other Roman politicians. In a tense political climate — with rivals like Pompey and Crassus — keeping communications private was a matter of survival as much as strategy.",
        'card.augustus.title': "Augustus Caesar's Variant",
        'card.augustus.p': "Caesar's successor Augustus used a similar system, but with a shift of only one position. Suetonius noted that Augustus simply wrote the next letter of the alphabet — a slight modification of his adoptive father's method.",
        'card.rot13.title': 'ROT13 — A Modern Echo',
        'card.rot13.p': 'ROT13 ("rotate by 13") is a direct descendant of the Caesar cipher. With a shift of exactly 13, encoding and decoding use the identical operation. It was widely used on early internet forums to hide spoilers, jokes, and puzzle answers.',

        's4.title': 'Breaking the Code — Frequency Analysis',
        's4.p1': 'For centuries, the Caesar cipher was considered reasonably secure. But its fundamental weakness is devastating: because there are only <strong>25 possible shifts</strong>, a cryptanalyst can simply try all of them — a method called <em>brute force attack</em>. Even without a computer, an attacker can test all 25 options in minutes.',
        's4.p2': 'The more sophisticated technique is <strong>frequency analysis</strong>, pioneered by the Arab polymath <strong>Al-Kindi</strong> (c. 801–873 AD) in his landmark treatise <em>A Manuscript on Deciphering Cryptographic Messages</em>. The insight is elegant: in any language, letters appear with predictable frequencies. In English, "E" is the most common letter (~12.7%), and in a Caesar-encrypted text, the most frequent ciphertext letter almost certainly corresponds to "E" — revealing the shift instantly.',
        's4.quote': 'One way to solve an encrypted message, if we know its language, is to find a different plaintext of the same language long enough to fill one sheet or so, and then we count the occurrences of each letter.',
        's4.cite': '— Al-Kindi, <em>A Manuscript on Deciphering Cryptographic Messages</em>, c. 850 AD',
        's4.p3': 'This discovery effectively rendered all simple substitution ciphers obsolete once the technique became widely known. The Caesar cipher, brilliant for its age, was fundamentally broken by the 9th century.',
        'card.freq.title': 'Letter Frequency in English',
        'card.freq.p': 'The most common letters are: <strong>E (12.7%), T (9.1%), A (8.2%), O (7.5%), I (7.0%), N (6.7%)</strong>. In any sufficiently long Caesar-encrypted text, the most frequent ciphertext letter almost always decodes to "E".',
        'card.alkindi.title': "Al-Kindi's Method",
        'card.alkindi.p': 'Count how often each letter appears in the ciphertext. The most frequent letter is likely "E". The difference between its position and "E" gives you the shift. For short messages, brute-forcing all 25 shifts remains the fastest approach.',
        'card.brute.title': 'Brute Force Attack',
        'card.brute.p': 'Because there are only 25 possible shifts, a computer can test all of them in microseconds. Even by hand, a skilled cryptanalyst can break a Caesar cipher in under a minute. This makes it completely insecure for any modern application.',

        's5.title': 'A Timeline of Cryptography',
        't1.title': 'Scytale of Sparta',
        't1.p': 'The Spartans use a cylindrical rod (scytale) around which a strip of leather is wound to encrypt military dispatches — one of the earliest known transposition ciphers, predating Caesar by centuries.',
        't2.title': "Caesar's Gallic Campaigns",
        't2.p': "Julius Caesar begins systematically encrypting his military communications using his eponymous shift cipher with a key of three, protecting orders to his legions during the conquest of Gaul.",
        't3.title': "Augustus's One-Shift Variant",
        't3.p': "Suetonius records that the Emperor Augustus used a personal cipher — a shift of one position — for private correspondence. He also noted variations using Greek letters for maximum security.",
        't4.title': 'Al-Kindi Breaks the Cipher',
        't4.p': 'The Arab scholar Al-Kindi publishes the first known systematic description of frequency analysis, effectively breaking all simple substitution ciphers including the Caesar cipher.',
        't5.title': 'Leon Battista Alberti — Polyalphabetic Cipher',
        't5.p': 'The Italian Renaissance polymath invents the cipher disk and introduces the concept of polyalphabetic substitution — using multiple Caesar shifts in sequence — as a direct response to the vulnerability of frequency analysis.',
        't6.title': 'The Vigenère Cipher',
        't6.p': 'Giovan Battista Bellaso (later attributed to Blaise de Vigenère) creates a polyalphabetic cipher using a keyword to vary the shift for each letter — considered unbreakable for nearly three centuries.',
        't7.title': 'The Enigma Machine',
        't7.p': 'Germany deploys the Enigma cipher machine, which automates polyalphabetic substitution across multiple rotors with billions of possible configurations — essentially a hyper-complex successor to Caesar\'s insight.',
        't8.title': 'Public-Key Cryptography',
        't8.p': 'Diffie and Hellman publish the landmark paper introducing public-key cryptography, revolutionising the field. The Caesar cipher\'s era of symmetric, hand-applied encryption gives way to mathematical systems based on computational complexity.',
        't9.title': 'ROT13 on the Internet',
        't9.p': 'ROT13 — a Caesar cipher with a shift of 13 — becomes a standard convention on Usenet and early internet forums to obscure spoilers, punchlines, and puzzle solutions.',

        's6.title': 'Legacy — Why It Still Matters',
        's6.p1': 'Today, the Caesar cipher is hopelessly insecure for any real communication. Modern encryption standards like <strong>AES-256</strong> or <strong>RSA-2048</strong> are incomprehensibly more complex — requiring billions of years to brute-force. And yet, the Caesar cipher remains indispensable.',
        's6.p2': 'It is the first cipher taught in virtually every computer science and mathematics curriculum worldwide. Its simplicity makes it the perfect introduction to the core concepts of cryptography: <strong>keys, encryption, decryption, plaintext, ciphertext, and cryptanalysis</strong>.',
        's6.p3': 'The cipher also demonstrates a timeless truth: <strong>obscurity alone is not security</strong>. Caesar\'s system worked because the enemy did not know about it — not because it was inherently hard to break. This lesson drives modern cryptography, which assumes that an attacker knows everything about the algorithm.',
        's6.p4': "More broadly, Caesar's instinct was correct: in warfare and diplomacy, controlling information is as important as controlling territory. That insight is as relevant in the age of quantum computing as it was in the age of Roman legions.",
        'card.edu.title': 'Education',
        'card.edu.p': 'The Caesar cipher is the entry point to cryptography in schools and universities worldwide, introducing keys, substitution, and cryptanalysis in an approachable, hands-on format.',
        'card.puzzle.title': 'Puzzles & Games',
        'card.puzzle.p': 'From escape rooms to geocaching, from crossword hints to ARGs (Alternate Reality Games), the Caesar cipher remains a beloved puzzle mechanic — a nod to history wrapped in playful mystery.',
        'card.prog.title': 'Programming',
        'card.prog.p': 'Implementing a Caesar cipher is a classic beginner programming exercise. It teaches string manipulation, modular arithmetic, and the concept of functions — a rite of passage for new developers.',
        's6.quote': 'The study of cryptography must begin somewhere. And it almost always begins in Rome, with a general who thought to shift his letters — and changed the history of secrets forever.',
        's6.cite': '— Code of Rome',

        'cta.label': 'NUNC LUDUM INCIPE',
        'cta.text':  'Now that you know the history — can you crack the cipher?',
        'cta.btn':   '🏛 Play Code of Rome',

        'footer.quote.hist': '"In the beginning was the Word — and Caesar encrypted it."',
    },

    fr: {
        'hist.tag':   'HISTORIA CRYPTOGRAPHIAE',
        'hist.title': 'Le Chiffre de César',
        'hist.lead':  'Des champs de bataille de la Gaule aux salles de la cryptographie moderne — l\'histoire du chiffre le plus célèbre du monde.',

        's1.title': 'Jules César — L\'Homme Derrière le Code',
        's1.p1': '<strong>Gaius Julius Caesar</strong> (100 – 44 av. J.-C.) était un général romain, homme d\'État, et l\'une des figures les plus déterminantes de l\'histoire occidentale. Réputé pour son génie militaire lors des Guerres des Gaules (58–50 av. J.-C.), il conquit de vastes territoires allant de la France à la Belgique actuelles. Mais César n\'était pas seulement un guerrier — c\'était un stratège qui comprenait que l\'information interceptée par l\'ennemi pouvait être aussi mortelle qu\'une lame.',
        's1.p2': 'César maintenait un vaste réseau de communications sur des milliers de kilomètres. Ses dépêches à Rome, ses instructions à ses lieutenants, sa correspondance personnelle avec Cicéron — tout transitait par des messagers qui traversaient des territoires dangereux. Les courriers capturés représentaient un risque réel. La solution ? Un système de chiffrement simple mais efficace que seuls ses destinataires de confiance pouvaient lire.',
        's1.p3': 'Le chiffre de César, décrit par l\'historien romain <strong>Suétone</strong> dans son œuvre <em>Vie de Jules César</em>, consistait à substituer chaque lettre de l\'alphabet par une autre, décalée d\'un nombre fixe de positions. César lui-même aurait préféré un décalage de <strong>trois positions</strong> — "A" devenait "D", "B" devenait "E", et ainsi de suite.',
        's1.quote': 'S\'il avait quelque chose de confidentiel à dire, il l\'écrivait en chiffre, c\'est-à-dire en changeant l\'ordre des lettres de l\'alphabet de telle sorte qu\'aucun mot ne pouvait être reconnu.',
        's1.cite': '— Suétone, <em>De Vita Caesarum</em>, c. 121 apr. J.-C.',

        's2.title': 'Comment Fonctionne le Chiffre de César',
        's2.p1': 'Le chiffre de César est un <strong>chiffre par substitution</strong> — chaque lettre du message original (appelé le <em>texte clair</em>) est remplacée par une lettre décalée d\'un nombre fixe de positions dans l\'alphabet. Ce nombre est appelé le <strong>décalage</strong> ou la <strong>clé</strong>. Avec un alphabet de 26 lettres, il existe 25 décalages non triviaux possibles.',
        's2.p2': 'La transformation s\'exprime mathématiquement : <strong>E(x) = (x + n) mod 26</strong>, où <em>x</em> est la position de la lettre (A=0, B=1… Z=25) et <em>n</em> est le décalage. Pour déchiffrer, le destinataire applique simplement l\'inverse : <strong>D(x) = (x − n) mod 26</strong>.',
        's2.p3': 'Par exemple, avec un décalage de 3 — la clé préférée de César — l\'alphabet se correspond ainsi :',
        's2.demo.title': '✦ Démo Interactive du Chiffre ✦',
        's2.demo.label.text': 'Votre message (texte clair)',
        's2.demo.label.shift': 'Décalage (clé)',
        's2.demo.label.output': 'Résultat chiffré (texte chiffré)',
        's2.plain.label': 'Clair →',
        's2.cipher.label': 'Chiffré →',
        's2.p4': 'Le chiffre ne s\'applique qu\'aux lettres ; les espaces, la ponctuation et les chiffres restent inchangés. Cela permettait à un soldat ou un scribe romain de l\'appliquer rapidement sur le terrain à l\'aide d\'un simple tableau de substitution.',
        's2.p5': 'César variait parfois son approche. Selon <strong>Valerius Probus</strong>, César utilisait également un chiffre à alphabet grec pour les messages particulièrement sensibles.',

        's3.title': 'Usages Historiques & Renseignement Militaire',
        'card.gallic.title': 'Les Guerres des Gaules (58–50 av. J.-C.)',
        'card.gallic.p': "L'usage principal du chiffre par César fut lors de sa campagne de huit ans en Gaule. Il chiffrait ses ordres aux légions, les instructions sur les mouvements de troupes et ses rapports au Sénat de Rome — pour empêcher les tribus gauloises d'exploiter les courriers capturés.",
        'card.political.title': 'Correspondance Politique',
        'card.political.p': "César utilisait le chiffrement dans ses lettres personnelles à Cicéron et d'autres politiciens romains. Dans un climat politique tendu — avec des rivaux comme Pompée et Crassus — garder ses communications secrètes était une question de survie autant que de stratégie.",
        'card.augustus.title': "La Variante d'Auguste",
        'card.augustus.p': "Le successeur de César, Auguste, utilisait un système similaire mais avec un décalage d'une seule position. Suétone note qu'Auguste écrivait simplement la lettre suivante de l'alphabet — une légère modification de la méthode de son père adoptif.",
        'card.rot13.title': 'ROT13 — Un Écho Moderne',
        'card.rot13.p': 'ROT13 (« rotation de 13 ») est un descendant direct du chiffre de César. Avec un décalage de 13, chiffrement et déchiffrement utilisent la même opération. Il était largement utilisé sur les premiers forums internet pour cacher des révélations, des blagues et des réponses d\'énigmes.',

        's4.title': 'Briser le Code — L\'Analyse de Fréquence',
        's4.p1': 'Pendant des siècles, le chiffre de César fut considéré comme raisonnablement sûr. Mais sa faiblesse fondamentale est dévastatrice : avec seulement <strong>25 décalages possibles</strong>, un cryptanalyste peut les tester tous — une méthode appelée <em>attaque par force brute</em>. Même sans ordinateur, un attaquant peut tester les 25 options en quelques minutes.',
        's4.p2': 'La technique plus sophistiquée est <strong>l\'analyse de fréquence</strong>, pionnée par le polymathe arabe <strong>Al-Kindi</strong> (c. 801–873 apr. J.-C.) dans son traité <em>Manuscrit sur le Déchiffrement des Messages Cryptographiques</em>. L\'intuition est élégante : dans toute langue, les lettres apparaissent avec des fréquences prévisibles. En français, "E" est la lettre la plus courante, et dans un texte chiffré par César, la lettre la plus fréquente correspond presque certainement à "E".',
        's4.quote': "Une façon de résoudre un message chiffré, si nous connaissons sa langue, est de trouver un autre texte clair de la même langue suffisamment long pour remplir une feuille, puis de compter les occurrences de chaque lettre.",
        's4.cite': '— Al-Kindi, <em>Manuscrit sur le Déchiffrement des Messages Cryptographiques</em>, c. 850 apr. J.-C.',
        's4.p3': 'Cette découverte rendit effectivement tous les chiffres par substitution simple obsolètes. Le chiffre de César, brillant pour son époque, était fondamentalement brisé dès le IXe siècle.',
        'card.freq.title': 'Fréquence des Lettres',
        'card.freq.p': 'Les lettres les plus courantes en français sont : <strong>E (17,4%), A (8,1%), S (7,9%), N (7,1%), I (7,0%), T (7,0%)</strong>. Dans tout texte suffisamment long chiffré par César, la lettre la plus fréquente correspond presque toujours à "E".',
        'card.alkindi.title': "La Méthode d'Al-Kindi",
        'card.alkindi.p': 'Comptez la fréquence de chaque lettre dans le texte chiffré. La lettre la plus fréquente est probablement "E". La différence entre sa position et celle de "E" vous donne le décalage. Pour les messages courts, tester les 25 décalages reste l\'approche la plus rapide.',
        'card.brute.title': 'Attaque par Force Brute',
        'card.brute.p': 'Avec seulement 25 décalages possibles, un ordinateur peut tous les tester en microsecondes. Même à la main, un cryptanalyste compétent peut briser un chiffre de César en moins d\'une minute.',

        's5.title': 'Une Chronologie de la Cryptographie',
        't1.title': 'La Scytale de Sparte',
        't1.p': 'Les Spartiates utilisent une tige cylindrique (scytale) autour de laquelle s\'enroule une bande de cuir pour chiffrer les dépêches militaires — l\'un des premiers chiffres de transposition connus, précédant César de plusieurs siècles.',
        't2.title': 'Les Campagnes Gauloises de César',
        't2.p': "Jules César commence à chiffrer systématiquement ses communications militaires avec son chiffre par décalage de trois positions, protégeant ses ordres aux légions pendant la conquête de la Gaule.",
        't3.title': "La Variante d'Auguste",
        't3.p': "Suétone rapporte que l'Empereur Auguste utilisait un chiffre personnel — un décalage d'une seule position — pour sa correspondance privée. Il notait également des variations utilisant des lettres grecques pour une sécurité maximale.",
        't4.title': 'Al-Kindi Brise le Chiffre',
        't4.p': 'Le savant arabe Al-Kindi publie la première description systématique connue de l\'analyse de fréquence, brisant effectivement tous les chiffres par substitution simple, y compris le chiffre de César.',
        't5.title': 'Leon Battista Alberti — Chiffre Polyalphabétique',
        't5.p': 'Le polymathe de la Renaissance italienne invente le disque de chiffrement et introduit le concept de substitution polyalphabétique — utilisant plusieurs décalages de César en séquence — en réponse directe à la vulnérabilité de l\'analyse de fréquence.',
        't6.title': 'Le Chiffre de Vigenère',
        't6.p': 'Giovan Battista Bellaso (plus tard attribué à Blaise de Vigenère) crée un chiffre polyalphabétique utilisant un mot-clé pour varier le décalage à chaque lettre — considéré comme indéchiffrable pendant près de trois siècles.',
        't7.title': 'La Machine Enigma',
        't7.p': "L'Allemagne déploie la machine de chiffrement Enigma, qui automatise la substitution polyalphabétique à travers plusieurs rotors avec des milliards de configurations possibles — essentiellement un successeur hyper-complexe de l'idée de César.",
        't8.title': 'La Cryptographie à Clé Publique',
        't8.p': 'Diffie et Hellman publient l\'article fondateur introduisant la cryptographie à clé publique, révolutionnant le domaine. L\'ère des chiffres symétriques appliqués à la main cède la place à des systèmes mathématiques basés sur la complexité computationnelle.',
        't9.title': 'ROT13 sur Internet',
        't9.p': 'ROT13 — un chiffre de César avec un décalage de 13 — devient une convention standard sur Usenet et les premiers forums internet pour dissimuler révélations, chutes de blagues et solutions d\'énigmes.',

        's6.title': 'Héritage — Pourquoi Cela Reste Important',
        's6.p1': 'Aujourd\'hui, le chiffre de César est totalement inadapté à toute communication réelle. Les standards de chiffrement modernes comme <strong>AES-256</strong> ou <strong>RSA-2048</strong> sont incomparablement plus complexes — nécessitant des milliards d\'années pour être forcés. Et pourtant, le chiffre de César reste indispensable.',
        's6.p2': "C'est le premier chiffre enseigné dans pratiquement tous les cursus d'informatique et de mathématiques au monde. Sa simplicité en fait l'introduction parfaite aux concepts fondamentaux de la cryptographie : <strong>clés, chiffrement, déchiffrement, texte clair, texte chiffré et cryptanalyse</strong>.",
        's6.p3': "Le chiffre démontre aussi une vérité intemporelle : <strong>l'obscurité seule n'est pas une sécurité</strong>. Le système de César fonctionnait parce que l'ennemi ne le connaissait pas — pas parce qu'il était intrinsèquement difficile à briser. Cette leçon guide la cryptographie moderne.",
        's6.p4': "Plus largement, l'instinct de César était juste : en guerre et en diplomatie, contrôler l'information est aussi important que contrôler le territoire. Cette intuition est aussi pertinente à l'ère de l'informatique quantique qu'à celle des légions romaines.",
        'card.edu.title': 'Éducation',
        'card.edu.p': 'Le chiffre de César est le point d\'entrée en cryptographie dans les écoles et universités du monde entier, introduisant clés, substitution et cryptanalyse de manière accessible et pratique.',
        'card.puzzle.title': 'Puzzles & Jeux',
        'card.puzzle.p': 'Des escape rooms au géocaching, des indices de mots croisés aux ARG (jeux de réalité alternée), le chiffre de César reste un mécanisme de puzzle apprécié — un clin d\'œil à l\'histoire enveloppé dans le mystère.',
        'card.prog.title': 'Programmation',
        'card.prog.p': "Implémenter un chiffre de César est un exercice classique pour les débutants en programmation. Il enseigne la manipulation de chaînes, l'arithmétique modulaire et le concept de fonctions — un rite de passage pour les nouveaux développeurs.",
        's6.quote': "L'étude de la cryptographie doit commencer quelque part. Et elle commence presque toujours à Rome, avec un général qui eut l'idée de décaler ses lettres — et changea à jamais l'histoire des secrets.",
        's6.cite': '— Code of Rome',

        'cta.label': 'NUNC LUDUM INCIPE',
        'cta.text':  "Maintenant que vous connaissez l'histoire — pouvez-vous déchiffrer le code ?",
        'cta.btn':   '🏛 Jouer à Code of Rome',

        'footer.quote.hist': '"Au commencement était le Verbe — et César le chiffra."',
    }
};

// ── Core i18n engine ──
let currentLang = localStorage.getItem('corlang') || 'en';

function t(key) {
    const page = window._historyPage ? HISTORY_TRANSLATIONS : TRANSLATIONS;
    return (page[currentLang] && page[currentLang][key]) || (page['en'] && page['en'][key]) || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = val;
        } else {
            el.innerHTML = val;
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    // Update lang toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const l = btn.getAttribute('data-lang');
        btn.classList.toggle('active', l === currentLang);
    });
    // Update document language
    document.documentElement.lang = currentLang;
    // Update page title
    const titles = {
        en: document.body.classList.contains('history-page')
            ? 'History of the Caesar Cipher — Code of Rome'
            : 'Code of Rome — Caesar Cipher Game',
        fr: document.body.classList.contains('history-page')
            ? 'Histoire du Chiffre de César — Code of Rome'
            : 'Code of Rome — Jeu de Chiffre de César'
    };
    if (titles[currentLang]) document.title = titles[currentLang];
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('corlang', lang);
    applyTranslations();
    // Re-run game translations if on game page
    if (typeof onLangChange === 'function') onLangChange();
}

document.addEventListener('DOMContentLoaded', applyTranslations);
