const NUM_TRIALS = 400;
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
    let DrawnCard = numbers[oneNumber] + " " + suits[oneSuit]
    return DrawnCard
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
//running the functions num_trials number of times
for (let i = 0; i < NUM_TRIALS; i++) {

    //drawing 5cards
    const hand = drawFiveCards();
    let draw = hand.join(' ');

    //get suitOrder
    function getSuitOrder() {
        let arrSuits = []
        let value = hand.join(' ').split(' ')
        for (let i = 0; i < 10; i += 2) {
            let drawnSuits = value[i]
            arrSuits.push(drawnSuits)
        }
        return arrSuits;
    }
    let getNumberOrder = getSuitOrder()
    //get order
    function getOrder() {
        let arrOrder = []
        let value = hand.join(' ').split(' ')
        for (let i = 1; i < 10; i += 2) {
            let drawnSuits = value[i]
            arrOrder.push(drawnSuits)
        }
        return arrOrder;
    }
    let getsuitorder = getOrder()
    //compare arrays to confirm sequence
    function test(b, a, bIndex) {
        if (!a.length) return true;
        bIndex ??= b.findIndex(el => el === a[0]);
        return a[0] !== b[bIndex] ? false : test(b.slice(bIndex + 1), a.slice(1), 0);
    }
    function checkTest() {
        let sOrder = []
        sOrder.push(...getNumberOrder)
        return test(numbers, sOrder)
    }
    //check type of hand drawn
    //flush
    function flush(hand) {
        for (let item of suits) {
            if (hand.split(item).length - 1 === 5 && checkTest() === false) {
                return true
            }
        }
    }
    //straight flush
    function straightFlush(hand) {
        for (let item of suits) {
            if (hand.split(item).length - 1 === 5 && checkTest() === true) {
                return true
            }
        }
    }
    //straight
    function straight(hand) {
        for (let item of suits) {
            if (hand.split(item).length - 1 !== 5 && checkTest() === true) {
                return true
            }
        }
    }
    //3 of a kind -- 3 cards with the same number
    function threeOfAKind() {
        for (let item of getNumberOrder) {
            if (draw.split(item).length - 1 == 3) {
                return true;
            }
        }
    }
    //4 of a kind -- 4 cards with the same number
    function fourOfAKind() {
        for (let item of getNumberOrder) {
            if (draw.split(item).length - 1 == 4) {
                return true;
            }
        }
    }
    //2 cards with the same number -- combined with 3 of a kind for full house in main logic
    function pairNumbers() {
        for (let item of getNumberOrder) {
            if (draw.split(item).length - 1 == 2) {
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
console.log(straightFlushCount/NUM_TRIALS + "% chance of getting a straight flush");
console.log(fourOfAKindCount/NUM_TRIALS + "% chance of getting a four of a kind");
console.log(fullHouseCount/NUM_TRIALS + "% chance of getting a full house");
console.log(flushCount/NUM_TRIALS + "% chance of getting a flush");
console.log(straightCount/NUM_TRIALS +"% chance of getting a straight");
console.log(threeOfAKindCount/NUM_TRIALS + "% chance of getting a three of a kind");  