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

  player: {
    hand: [],
    score: 0,
    displayScore: document.querySelector('.player-card-total'),
    displayCard: document.querySelector('.player-cards')
  },

  computer: {
    hand: [],
    score: 0,
    displayScore: document.querySelector('.computer-card-total'),
    displayCard: document.querySelector('.computer-cards')
  }
}

const newGame = () => {
  state.player.hand = []
  state.player.score = 0
  state.computer.hand = []
  state.computer.score = 0
  state.deck = []

  document.querySelector('.player-cards').innerHTML = ''
  document.querySelector('.computer-cards').innerHTML = ''
  document.querySelector('.message-area').innerHTML = ''

  document.querySelector('.btn-hit').classList.remove('hide')
  document.querySelector('.btn-hit').classList.add('show')

  document.querySelector('.btn-stand').classList.remove('hide')
  document.querySelector('.btn-stand').classList.add('show')

  document.querySelector('.btn-reset').classList.remove('show')
  document.querySelector('.btn-reset').classList.add('hide')

  newDeck()
  shuffleDeck()
  for (let i = 0; i < 2; i++) {
    dealCard('player')
    dealCard('computer')
  }
}

const newDeck = () => {
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
  console.log(['New Deck', state.deck])
}

const shuffleDeck = () => {
  for (let i = state.deck.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i)
    const temp = state.deck[random]
    state.deck[random] = state.deck[i]
    state.deck[i] = temp
  }
  console.log(['Shuffled Deck', state.deck])
}

const dealCard = who => {
  const card = state.deck.pop()
  state[who].hand.push(card)

  const cardImg = document.createElement('img')
  cardImg.src = `./images/cards/${card.rank}_of_${card.suit}.svg`
  cardImg.classList.add('card')
  state[who].displayCard.appendChild(cardImg)

  calculateScore()
}

const calculateScore = () => {
  calculateCards('player')
  calculateCards('computer')
  checkScore('player', 0)
  checkScore('computer', 0)
}

const checkScore = (who, final) => {
  const score = state[who].score
  let winner
  let loser
  if (score >= 22) {
    console.log(`${who} BUSTED`)
    winner = switchWho(who)
    setWin(winner, 'busted')
  } else if (score === 21) {
    console.log(`${who} got Black Jack`)
    setWin(who, 0)
  } else if (final === 1) {
    if (state.player.score > state.computer.score) {
      console.log('Player Wins')
      setWin('player', 0)
    } else if (state.player.score < state.computer.score) {
      console.log('Computer Wins')
      setWin('computer', 0)
    } else if (state.player.score === state.computer.score) {
      console.log('Tie')
      const message = document.createElement('p')
      message.textContent = 'Tie'
      document.querySelector('.message-area').appendChild(message)

      document.querySelector('.btn-hit').classList.remove('show')
      document.querySelector('.btn-hit').classList.add('hide')

      document.querySelector('.btn-stand').classList.remove('show')
      document.querySelector('.btn-stand').classList.add('hide')

      document.querySelector('.btn-reset').classList.remove('hide')
      document.querySelector('.btn-reset').classList.add('show')
    } else {
      console.log('Something went wrong with the scores.')
    }
  }
}

const switchWho = who => {
  if (who === 'player') {
    return 'computer'
  } else if (who === 'computer') {
    return 'player'
  } else {
    console.log('switchWho who fail')
  }
}

const setWin = (winner, loseReason) => {
  let loser
  if (winner == 'player') {
    loser = 'computer'
  } else if (winner == 'computer') {
    loser == 'player'
  } else {
    console.log('setWin name fail')
  }

  if (loseReason === 0) {
    loseReason = 'Loser'
  }

  const message = document.createElement('p')
  message.textContent = `${winner} wins, ${loser} ${loseReason}`
  document.querySelector('.message-area').appendChild(message)

  document.querySelector('.btn-hit').classList.remove('show')
  document.querySelector('.btn-hit').classList.add('hide')

  document.querySelector('.btn-stand').classList.remove('show')
  document.querySelector('.btn-stand').classList.add('hide')

  document.querySelector('.btn-reset').classList.remove('hide')
  document.querySelector('.btn-reset').classList.add('show')
}

const calculateCards = who => {
  let cardValue = 0
  state[who].score = 0

  for (let i = 0; i < state[who].hand.length; i++) {
    cardValue = state[who].hand[i].value
    state[who].score += cardValue
  }

  state[who].displayScore.textContent = state[who].score

  console.log(`${who}'s Score is ${state[who].score}`)
}

// Stay Function
const playerStay = () => {
  while (state.computer.score < 16) {
    dealCard('computer')
  }
  checkScore('computer', 1)

  document.querySelector('.btn-hit').classList.remove('show')
  document.querySelector('.btn-hit').classList.add('hide')

  document.querySelector('.btn-stand').classList.remove('show')
  document.querySelector('.btn-stand').classList.add('hide')

  document.querySelector('.btn-reset').classList.remove('hide')
  document.querySelector('.btn-reset').classList.add('show')
}

document.addEventListener('DOMContentLoaded', newGame)
document.querySelector('.btn-hit').addEventListener('click', () => {
  dealCard('player')
})
document.querySelector('.btn-reset').addEventListener('click', newGame)
document.querySelector('.btn-stand').addEventListener('click', playerStay)
