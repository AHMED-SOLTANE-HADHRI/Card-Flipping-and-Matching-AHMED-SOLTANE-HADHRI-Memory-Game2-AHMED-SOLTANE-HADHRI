document.addEventListener('DOMContentLoaded', () => {
    const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍑", "🍍", "🍓"];
    const gameBoard = document.querySelector('.game-board');
    let flippedCards = [];
    let cardElements = [];
    let moves = 0; // Step 1: Track moves
    let matches = 0; // Track matches for performance feedback
    const totalPairs = symbols.length;
    const moveCountElement = document.getElementById('move-count');
    const feedbackElement = document.getElementById('feedback');

    const cardSymbols = shuffle([...symbols, ...symbols]);

    cardSymbols.forEach(symbol => {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
        cardElements.push(card);
    });

    cardElements.forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('show-symbol')) {
                flipCard(card);
            }
        });
    });

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card', 'hide-symbol');
        card.textContent = symbol;
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard(card) {
        card.classList.remove('hide-symbol');
        card.classList.add('show-symbol');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            incrementMoveCount(); // Step 3: Increment moves
            checkForMatch();
        }
    }

    // Step 2: Increment move count and update the display
    function incrementMoveCount() {
        moves += 1;
        moveCountElement.textContent = moves;
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            // Cards match, leave them flipped
            matches += 1;
            flippedCards = [];
            if (matches === totalPairs) {
                // Step 4: Provide performance feedback based on moves
                feedbackElement.textContent = getPerformanceFeedback();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('show-symbol');
                card1.classList.add('hide-symbol');
                card2.classList.remove('show-symbol');
                card2.classList.add('hide-symbol');
                flippedCards = [];
            }, 1000);
        }
    }

    // Step 4: Provide performance feedback based on number of moves
    function getPerformanceFeedback() {
        if (moves <= 16) {
            return "Excellent! You matched all pairs in just " + moves + " moves!";
        } else if (moves <= 24) {
            return "Good job! You matched all pairs in " + moves + " moves.";
        } else {
            return "Keep practicing! You matched all pairs in " + moves + " moves.";
        }
    }
});
