// const NUM_TRIALS = 0;
 const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
 const numbers = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2']
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
//drawing 5cards
const hand = drawFiveCards();
let draw = hand.join(' ');
//const hand = ["8 Hearts", "9 Hearts", "10 Hearts", "Jack Hearts", "Queen Hearts", "King Hearts"]
//let draw = "8 Hearts 9 Hearts 10 Hearts Jack Hearts Queen Hearts King Hearts"

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
let getnumberorder = getSuitOrder()
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
    sOrder.push(...getnumberorder)
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
        if (hand.split(item).length - 1 === 2 && checkTest() === true) {
            return true
        }
    }
}
//3 of a kind -- 3 cards with the same number
function threeOfAKind() {
    for (let item of getnumberorder) {
        if (draw.split(item).length - 1 == 3) {
            return true;
        }
    }
}
//4 of a kind -- 4 cards with the same number
function fourOfAKind() {
    for (let item of getnumberorder) {
        if (draw.split(item).length - 1 == 4) {
            return true;
        }
    }
}
//2 cards with the same number -- combined with 3 of a kind for full house in main logic
function pairNumbers() {
    for (let item of getnumberorder) {
        if (draw.split(item).length - 1 == 2) {
            return true;
        }
    }
}
// main logic
//add straight flush, straight and flush
//change console log to counts
if (straightFlush(draw)) {
    console.log(draw + "  is a straight flush");
}
else if (fourOfAKind(draw)) {
    console.log(draw + "  is 4 of a kind");
}    
else if (threeOfAKind(draw) && pairNumbers(draw)) { //full house
    console.log(draw + "  is a full house");
}
else if (flush(draw)) {
    console.log(draw + "  is a flush")
}
else if (straight(draw)) {
    console.log(draw + "  is a straight")
}
else if (threeOfAKind(draw)) {
    console.log(draw + "  is 3 of a kind");
}
else console.log(draw);