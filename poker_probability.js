const NUM_TRIALS = 10000;
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const numbers = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2']

//variables for counting
let straightFlushCount = 0;
let fourOfAKindCount = 0;
let fullHouseCount = 0;
let flushCount = 0;
let straightCount = 0;
let threeOfAKindCount = 0;

function drawOneCard() {
    let oneSuit = Math.floor(Math.random() * suits.length);
    let oneNumber = Math.floor(Math.random() * numbers.length);
    let drawnCard = numbers[oneNumber] + " " + suits[oneSuit]
    return drawnCard
}
//Draw 5 cards
function drawFiveCards() {
    let cards = []
    for (let i = 0; i < 5; i++) {
        let card = drawOneCard()
        while (cards.includes(card)) {
            card = drawOneCard()
        }
        cards.push(card)
    }
    return cards
}

function numIndex() {
    let numIndexValues = []
    for (nums of numbers) {
        let numIndex = numbers.indexOf(nums)
        numIndexValues.push(numIndex)
    }
    return numIndexValues
}
let numOfIndex = numIndex()

//running the functions num_trials number of times
for (let i = 0; i < NUM_TRIALS; i++) {
    //drawing 5cards
    const hand = drawFiveCards();
    let draw = hand.join(' ');

    //get numbers from hand
    function numInHands() {
        let arrNumber = []
        let value = hand.join(' ').split(' ')
        for (let i = 0; i < 10; i += 2) {
            let drawnNumber = value[i]
            arrNumber.push(drawnNumber)
        }
        return arrNumber;
    }
    let numFromHands = numInHands()

    //compare sequence of arrays
    function test(b, a, bIndex) {
        if (!a.length) return true;
        bIndex ??= b.findIndex(el => el === a[0]);
        return a[0] !== b[bIndex] ? false : test(b.slice(bIndex + 1), a.slice(1), 0);
    }

    function drawnNumIndex() {
        let drawnIndOfNumValues = []
        for (nums of numFromHands) {
            let numDrawnIndex = numbers.indexOf(nums)
            drawnIndOfNumValues.push(numDrawnIndex)
        }
        let sortedIndexNum = drawnIndOfNumValues.sort((a, b) => a - b)
        return sortedIndexNum
    }
    let sortedDrawnIndex = drawnNumIndex()

    function checkTest() {
        return test(numOfIndex, sortedDrawnIndex)
    }

    //********************************************************* */
    //flush
    function flush(drawnHand) {
        for (let item of suits) {
            if (drawnHand.split(item).length - 1 === 5 && checkTest() === false) {
                return true
            }
        }
    }
    //straight flush
    function straightFlush(drawnHand) {
        for (let item of suits) {
            if (drawnHand.split(item).length - 1 === 5 && checkTest() === true) {
                return true
            }
        }
    }
    //straight
    function straight(drawnHand) {
        for (let item of suits) {
            if (drawnHand.split(item).length - 1 !== 5 && checkTest() === true) {
                return true
            }
        }
    }
    //3 of a kind -- 3 cards with the same number
    function threeOfAKind(drawnHand) {
        for (let item of numFromHands) {
            if (drawnHand.split(item).length - 1 == 3) {
                return true;
            }
        }
    }
    //4 of a kind -- 4 cards with the same number
    function fourOfAKind(drawnHand) {
        for (let item of numFromHands) {
            if (drawnHand.split(item).length - 1 == 4) {
                return true;
            }
        }
    }
    //2 cards with the same number -- combined with 3 of a kind for full house in main logic
    function pairNumbers(drawnHand) {
        for (let item of numFromHands) {
            if (drawnHand.split(item).length - 1 == 2) {
                return true;
            }
        }
    }

    // main logic
    if (straightFlush(draw)) {
        straightFlushCount += 1;
    }
    else if (fourOfAKind(draw)) {
        fourOfAKindCount += 1;
    }
    else if (threeOfAKind(draw) && pairNumbers(draw)) { //full house
        fullHouseCount += 1;
    }
    else if (flush(draw)) {
        flushCount += 1;
    }
    else if (straight(draw)) {
        straightCount += 1;
    }
    else if (threeOfAKind(draw)) {
        threeOfAKindCount += 1;
    }
}

//Probability
console.log(straightFlushCount / NUM_TRIALS * 100 + "% chance of getting a straight flush");
console.log(fourOfAKindCount / NUM_TRIALS * 100 + "% chance of getting a four of a kind");
console.log(fullHouseCount / NUM_TRIALS * 100 + "% chance of getting a full house");
console.log(flushCount / NUM_TRIALS * 100 + "% chance of getting a flush");
console.log(straightCount / NUM_TRIALS * 100 + "% chance of getting a straight");
console.log(threeOfAKindCount / NUM_TRIALS * 100 + "% chance of getting a three of a kind");  
