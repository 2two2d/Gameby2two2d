let coords = document.getElementById('frame').getBoundingClientRect()

let mr3_lose = new Audio('sounds/lose.mp3')
let mr3_start = new Audio('sounds/start.mp3')
let mr3_win = new Audio('sounds/win.mp3')

let MainFrame = document.getElementById('frame')
let StartFrame = document.getElementById('start')

function FrameColor(option){
    MainFrame.style.animation = `${option} 2s`
    StartFrame.style.animation = `${option} 2s`
    setTimeout(function (){
        MainFrame.style.animation = ``
        StartFrame.style.animation = ``
    }, 2000)
}

function titleApear(text, color){
    let title = document.createElement('h2')
    title.setAttribute('id', 'title')
    title.style.color = color
    title.innerText = text
    document.getElementById('frame').append(title)
    setTimeout(function(){title.innerText = ''}, 1000)
}


function createCircle(difficulty){
    let circle = document.createElement('div')
    circle.style = 'width: 45px; height: 45px; border-radius: 100%; position: absolute'
    circle.style.left = Math.floor(Math.random()*760)+coords.left + 'px'
    circle.style.top = Math.floor(Math.random()*360)+160 + 'px'
    circle.style.background = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    circle.addEventListener('click',function(){
        document.getElementById('frame').removeChild(circle);
    })
    console.log(circle.style)
    return circle
}

function startTheGame(difficulty){
    let arr = []
    let counter = 0
    let points = 0
    console.log(difficulty)

    function createCircles(){
        let circleCreating = setInterval(function () {
            let summ = document.body.querySelectorAll('div').length
            let newCircle = createCircle()
            newCircle.addEventListener('click', function(){
                points++
                document.getElementById('span').innerText = `${points}/20`
                points == 20 ? winTheGame() : ''
            })
            arr.push(newCircle)
            document.getElementById('frame').append(arr[arr. length - 1])
            counter > 18 ? clearInterval(circleCreating) : counter++
            summ >= 4 ? (clearInterval(circleCreating),
                        endTheGame(points)) : ''
        }, 1100/difficulty)
    }
    createCircles()
}

function winTheGame(){
    FrameColor('win')
    titleApear(`Победа!!!`, 'lightgreen')
    mr3_win.play()
}
function endTheGame(points){
    document.getElementById('span').innerText = '0/20'
    document.getElementById('frame').innerHTML = ''
    FrameColor('lose')
    titleApear(`Вы набрали ${points} очков`,'coral')
    mr3_lose.play()
}


let startButton = document.body.querySelector('button')
startButton.onclick = function(){
    document.getElementById('frame').innerHTML = ''
    const difficulty = document.querySelector("input[type=range]").value
    mr3_start.play()
    startTheGame(difficulty)
}