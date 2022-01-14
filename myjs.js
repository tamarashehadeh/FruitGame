// Elements
const canvas = document.querySelector('#canvas')
const fruit = document.querySelector('.fruit')
const lives = document.querySelector('#lives')
const score = document.querySelector('#score-val')
const startBtn = document.querySelector('#start-btn')

// Game State
const state = {
    fruitPosition: -200,
    lives: 3,
    score: 0,
}

// the variable used by setInterval
let timer

// the name of all available fruits
const fruits = [
    'apple.png',
    'banana.png',
    'cherries.png',
    'grapes.png',
    'mango.png',
    'orange.png',
    'peach.png',
    'pear.png',
    'watermelon.png'
]

const decreaseLives = () => {
    state.lives--
    lives.children[state.lives].style.opacity = 0.3
}

let ftop = fruit.style.top;
ftop = state.fruitPosition + "px"
// let fleft = fruit.style.left;


const giveMeRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const changeToRandomFruit = () => {
    fruit.style.backgroundImage = `url(images/${fruits[giveMeRandomNumber(0, fruits.length - 1)]})`
}

const resetFruitPosition = () => {
    // TODO: write the body of this function
    // fruit.style.opacity = 1
    changeToRandomFruit()
    fruit.style.left = giveMeRandomNumber(0, canvas.clientWidth) + "px"
    state.fruitPosition = -200
    // fruit.style.top = state.fruitPosition + "px"
}

const moveFruit = () => {
    // TODO: write down the code that will move the fruit down 1px at a time
    fruit.style.top = ++state.fruitPosition + "px"
    // TODO: set the condition here (if the fruit position is greater than the canvas height )
    if (state.fruitPosition > 350) {
        resetFruitPosition()
        decreaseLives()
    }
    if (!state.lives) {
        alert(`Game Over! Your score is ${state.score}`)
        location.reload()
        clearInterval(timer)
    }
}

const increaseScore = () => { score.textContent = ++state.score }

const start = () => {
    lives.style.opacity = 1
    changeToRandomFruit()
    timer = setInterval(moveFruit, 1)
    // hover event
    fruit.onmouseover = sliceTheFruit
    startBtn.style.display = 'none'
}

const sliceTheFruit = () => {
    increaseScore()
    fruit.classList.add('sliced')
    setTimeout(() => {
        resetFruitPosition()
        fruit.classList.remove('sliced')
    }, 500)

}

startBtn.onclick = start