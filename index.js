const screens = document.querySelectorAll('.screen')


const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn')


const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const endGameBtn = document.getElementById('end-game-btn')
let seconds = 0
let score = 0
let selectedInsect = {}
let timeInterval = 0
let creatInsectTimeOut = 0
let defaultTime = `Time: 00:00`
let defaultScore = `Score: 0`

startBtn.addEventListener('click', () => {
  screens[0].classList.add('up')
})

chooseInsectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.src
    const alt = img.alt
    selectedInsect = { src, alt }
    screens[1].classList.add('up')
    timeEl.innerHTML = defaultTime
    scoreEl.innerHTML = defaultScore
    creatInsectTimeOut = setTimeout(creatInsect, 1500)
    startGame()
  })
})

endGameBtn.addEventListener('click', endGame)

function endGame() {
  resetGameProperties()
  removeAllCreatedInsects()
  //slides up by 1 step
  screens[1].classList.remove('up')
}



function removeAllCreatedInsects() {
  setTimeout(() => {
    const allInsects = gameContainer.querySelectorAll('.insect')
    allInsects.forEach(insect => insect.remove())
  }, 1500)
}
function resetGameProperties() {
  seconds = 0
  score = 0
  selectedInsect = {}
  timeEl.innerHTML = defaultTime
  scoreEl.innerHTML = defaultScore
  clearInterval(timeInterval)
  clearTimeout(creatInsectTimeOut)
}

function startGame() {
  if (message.classList.contains('visible')) {
    message.classList.remove('visible')
  }
  timeInterval = setInterval(increasTime, 1000)
}

function increasTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function creatInsect() {
  const insect = document.createElement('div')
  insect.classList.add('insect')
  insect.innerHTML = `
    <img src="${selectedInsect.src}" alt="${selectedInsect.alt} style="transform:rotate(${Math.random() * 360}deg)"/>
  `
  const { x, y } = getRandomLocation()
  insect.style.top = `${y}px`
  insect.style.left = `${x}px`

  insect.addEventListener('click', catchInsect)
  gameContainer.appendChild(insect)
}




function catchInsect() {
  increasScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  addInsects()
}

function increasScore() {
  score++
  if (score > 3) {
    message.classList.add('visible')
  }
  scoreEl.innerHTML = `Score: ${score}`
}

function addInsects() {

  setTimeout(creatInsect, 1000)
  setTimeout(creatInsect, 1500)
}

