//Rules and Game Start

const rulesDiv = document.querySelector('.rules')
const rulesButton = document.querySelector('.gamePlay')
const singlePlayerButton = document.querySelector('.singlePlayerButton ')
const singleplayer = document.querySelector('.singleplayer')
const gameWindow = document.querySelector('.gameWindow')

singlePlayerButton.addEventListener('click', () => {
  rulesDiv.classList.add('hidden')
  setTimeout(() => {
    if (
      gameWindow.classList.contains('hiddenOnStart') ||
      gameWindow.classList.contains('hidden')
    ) {
      gameWindow.classList.remove('hiddenOnStart')
      gameWindow.classList.remove('hidden')
    } else {
      gameWindow.classList.remove('hidden')
    }
  }, 300)
})
rulesButton.addEventListener('click', () => {
  gameWindow.classList.add('hidden')
  setTimeout(() => {
    rulesDiv.classList.remove('hidden')
  }, 300)
})

///// Card Game

const cardBlank = document.querySelector('.blank')
const singleplayerScore = document.querySelector('.singleplayer__score')
const singleplayerResult = document.querySelector('.singleplayer__result')
const singleplayerImg = document.querySelector('.singleplayerImg')
const singleplayerImgSecond = document.querySelector('.singleplayerImgSecond')
const singleplayerImgThird = document.querySelector('.singleplayerImgThird')

const play = document.querySelector('.play')
const reset = document.querySelector('.reset')
const draw = document.querySelector('.draw')
const pas = document.querySelector('.pas')

const cards = {
  initial: {
    BASE_URL: 'https://deckofcardsapi.com/api/deck/',
    winningValue: 21,
    cardValue: {
      ACE: 11,
      JACK: 2,
      QUEEN: 3,
      KING: 4,
    },
    currentDeck: null,
  },

  resetGame() {
    singleplayerImg.src = './img/red.svg'
    singleplayerImgSecond.src = './img/red.svg'
    singleplayerImgThird.classList.add('none')
    singleplayerScore.innerHTML = '0'
    singleplayerResult.innerHTML = ''
    play.classList.remove('inactiveBtn')
    draw.classList.add('inactiveBtn')
    cards.newDeck()
  },

  newDeck() {
    fetch(`${cards.initial.BASE_URL}new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((data) => {
        cards.initial.currentDeck = data
        console.log(data)
      })
    return cards.initial.currentDeck
  },

  // Initial draw

  drawCards(currentDeck, count) {
    let shuffleStatus = currentDeck.shuffeled
    fetch(
      `${cards.initial.BASE_URL}/${currentDeck.deck_id}/draw/?count=${count}`,
    )
      .then((res) => res.json())
      .then((data) => {
        cards.initial.currentDeck = data
        cards.placeCards(cards.initial.currentDeck)
      })
    return cards.initial.currentDeck
  },

  drawOneCard(currentDeck, count) {
    let shuffleStatus = currentDeck.shuffeled
    fetch(
      `${cards.initial.BASE_URL}/${currentDeck.deck_id}/draw/?count=${count}`,
    )
      .then((res) => res.json())
      .then((data) => {
        cards.initial.currentDeck = data
        cards.initial.currentDeck.shuffeled = shuffleStatus
        cards.placeOneCard(cards.initial.currentDeck)
      })
    return cards.initial.currentDeck
  },

  placeCards(currentDeck) {
    let player1FirstCard = cards.initial.currentDeck.cards[0]
    let player1SecondCard = cards.initial.currentDeck.cards[1]
    singleplayerImg.src = player1FirstCard.image
    singleplayerImgSecond.src = player1SecondCard.image
    let score = singleplayerScore.innerHTML
    singleplayerScore.innerHTML = cards.initialScore(
      player1FirstCard,
      player1SecondCard,
    )
    cards.winningScore(score)
  },
  initialScore(card1, card2) {
    let getValue1 = Object.keys(cards.initial.cardValue).find(
      (item) => item === card1.value,
    )
    let getValue2 = Object.keys(cards.initial.cardValue).find(
      (item) => item === card2.value,
    )
    let first = getValue1
      ? cards.initial.cardValue[getValue1]
      : Number(card1.value)
    let next = getValue2
      ? cards.initial.cardValue[getValue2]
      : Number(card2.value)
    return first + next
  },

  ///// Draw one Card

  drawOneCard(currentDeck, count) {
    let shuffleStatus = currentDeck.shuffeled
    fetch(
      `${cards.initial.BASE_URL}/${currentDeck.deck_id}/draw/?count=${count}`,
    )
      .then((res) => res.json())
      .then((data) => {
        cards.initial.currentDeck = data
        cards.initial.currentDeck.shuffeled = shuffleStatus
        cards.placeOneCard(cards.initial.currentDeck)
      })
    return cards.initial.currentDeck
  },
  placeOneCard(currentDeck) {
    let player1ThirdCard = cards.initial.currentDeck.cards[0]
    singleplayerImgThird.classList.remove('none')
    singleplayerImgThird.src = player1ThirdCard.image
    singleplayerScore.innerHTML = cards.updateScore(
      singleplayerScore,
      cards.getScore(player1ThirdCard),
    )
    let score = singleplayerScore.innerHTML
    cards.winningScore(score)
  },
  getScore(card) {
    let getValue = Object.keys(cards.initial.cardValue).find(
      (item) => item === card.value,
    )
    return getValue ? cards.initial.cardValue[getValue] : Number(card.value)
  },

  updateScore(playerScore, score) {
    let currentScore = parseInt(playerScore.innerHTML, 10)
    let newScore = currentScore + score
    return newScore
  },

  ///// Game Results

  winningScore(player1) {
    if (player1 == cards.initial.winningValue) {
      singleplayerResult.innerHTML = 'Wygrałeś! 🎊🏆🎊   '
    }
    if (player1 > cards.initial.winningValue) {
      singleplayerResult.innerHTML = 'Przegrałeś... 😢  '
    }
    if (
      cards.initial.currentDeck.cards[0] === 'ACE' &&
      cards.initial.currentDeck.cards[1] === 'ACE'
    )
      singleplayerResult = 'Perskie oczko! Wygrałeś!  🏆🏆🏆   '
  },
}

window.onload = () => {
  cards.newDeck()
}

///// Action Buttons

play.addEventListener('click', () => {
  play.classList.add('inactiveBtn')
  if (singleplayerScore.innerHTML == 0) {
    draw.classList.remove('inactiveBtn')
    cards.drawCards(cards.initial.currentDeck, 2)
  }
})

draw.addEventListener('click', () => {
  if (
    play.classList.contains('inactiveBtn') &&
    singleplayerResult.innerHTML === ''
  ) {
    cards.drawOneCard(cards.initial.currentDeck, 1)
  }
  if (singleplayerResult.innerHTML) {
    draw.classList.add('inactiveBtn')
  }
})

pas.addEventListener('click', () => {
  if (singleplayerResult.innerHTML === '') {
    draw.classList.add('inactiveBtn')
    singleplayerResult.innerHTML = `Twój najwyższy wynik to ${singleplayerScore.innerHTML}! 🎊  `
  }
})

reset.addEventListener('click', () => {
  cards.resetGame()

})
