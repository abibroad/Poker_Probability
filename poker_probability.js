const NUM_TRIALS = 0

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
let hand = drawFiveCards().join(' ');
//console.log(hand.join(' '));
console.log(hand);


//a hand like HA HT C4 D3 C8 will be generated
//pulling out the numbers
function numbers() {
    check = hand.split(" "); //array
    for (let i = 0; i < 5; i++) {
        check[i] = check[i].substr(1);
    } return check
    
}
console.log(numbers(hand));

//suits
function suits() {
    check = hand.split(" "); //array
    for (let i = 0; i < 5; i++) {
        check[i] = check[i].substr(0,1);
    } return check
    
}
console.log(suits(hand));

//3 of a kind -- 3 cards with the same number
//turn string into array and selec
function threeOfAKind() {

    for (let item of numbers()) {
        if (hand.split(item).length - 1 == 3) {
            return true;
            //console.log("3 of a kind");
        }

    } 
}
threeOfAKind(hand);

//4 of a kind -- 4 cards with the same number
function fourOfAKind() {

    for (let item of numbers()) {
        if (hand.split(item).length - 1 == 4) {
            return true;
           
        }

    } 
}

function pairNumbers() {
    for (let item of numbers()) {
        if (hand.split(item).length - 1 == 2) {
            return true;
        }
    }
}

// main logic
if (threeOfAKind(hand) && pairNumbers(hand)) {
    console.log(hand + " is a full house");
}
else if (fourOfAKind(hand)) {
    console.log(hand + " is 4 of a kind");
}
else if (threeOfAKind(hand)) {
    console.log(hand + " is 3 of a kind");
}
