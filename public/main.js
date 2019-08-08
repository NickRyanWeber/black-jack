const state = {
  suits: ['hearts', 'diamonds', 'spades', 'clubs'],
  ranks: [
    { name: 'ace', value: 11 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: 'jack', value: 10 },
    { name: 'queen', value: 10 },
    { name: 'king', value: 10 }
  ],

  deck: [],
  playerHand: [],
  computerHand: []
}

// New Game function
const newGame = () => {
  // -- Clears hands, clears deck, makes new deck, shuffles new deck
  state.playerHand = []
  state.computerHand = []
  state.deck = []
  newDeck()
  shuffleDeck()
  // // -- Deals 2 cards to player and dealer from deck (use for loop?)
  // dealCard(playerHand)
  // dealCard(computerHand)
  // dealCard(playerHand)
  // dealCard(computerHand)
  // // -- Runs Calculate Cards function on dealer cards and player
  // calculateCards(playerHand)
  // calculateCards(computerHand)
}

// Make Deck
const newDeck = () => {
  // -- for-loop to create deck object
  for (let i = 0; i < state.suits.length; i++) {
    const suit = state.suits[i]
    for (let j = 0; j < state.ranks.length; j++) {
      const rank = state.ranks[j]
      state.deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit
      })
    }
  }
  console.log(state.deck)
}

// Shuffle Deck
// -- shuffle-function to shuffle deck object

// Deal Cards function
// -- Takes arguments to who the cards get dealt to

// Hit Button Press
// -- Runs deal card function passing player and 1 card

// Stay Function
// -- Runs when Stay button pressed
// -- Dealer cards shown
// -- for loop checking if dealer hand is below 17 and hits if it is
// -- "Ends" game after dealer is done hitting and calculates winner
// -- Displays winner and displays a "Play Again" button

// Calculate Cards
// -- Takes arguments for hand being calculated
// -- Checks the total value of the cards
// -- If over 21 "busts" that hand

document.addEventListener('DOMContentLoaded', newGame)
