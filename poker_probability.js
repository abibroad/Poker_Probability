//write the function drawFiveCards();

function drawFiveCards() {
    //draw 5 cards
    //iterate 5 times
    let hand = []; //empty array for the cards
    //loop to draw cards 5 times
    for (let i = 0; i < 5; i++) {
        //draw a card, put it in the return hand.
        let card = drawOneCard();
    //checking if card is already in the array/hand
        while (hand.includes(card)) {
            card = drawOneCard();
        }
        hand.push(card); //push card to array
    }
    return hand; //after loop but before end of the function return the hand
}

//return a card to the caller
function drawOneCard() {
    //1 way of doing it
  //  const suits = ["H", "S", "D", "C"];
  //  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"];

    //better way of doing it
    const suits = "SHDC";
    const numbers = "23456789TQKA";
    let suit = suits[Math.floor(Math.random() * suits.length)];
    let number = numbers[Math.floor(Math.random() * numbers.length)];
    return suit + number;
}

//console.log(drawOneCard())

//main logic:
let hand = drawFiveCards();
console.log(hand.join(' '));

//a hand like HA HT C4 D3 C8 will be generated

