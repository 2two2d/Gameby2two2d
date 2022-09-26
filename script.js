let coords = document.getElementById('frame').getBoundingClientRect()

function createCircle(difficulty){
    let circle = document.createElement('div')
    circle.style = 'width: 40px; height: 40px; border-radius: 100%; position: absolute'
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
            })
            arr.push(newCircle)
            document.getElementById('frame').append(arr[arr. length - 1])
            document.getElementById('span').innerText = points
            counter > 100 ? clearInterval(circleCreating) : counter++
            (summ > 4) ? (endTheGame(points),
                          clearInterval(circleCreating)) : ''
        }, 1100/difficulty)
    }
    createCircles()
}

function endTheGame(points){
    document.getElementById('span').innerText = '0'
    document.getElementById('frame').innerHTML = ''
    alert(`Ваш результат: ${points} очков!`)
}


let startButton = document.body.querySelector('button')
startButton.onclick = function(){
    document.getElementById('frame').innerHTML = ''
    const difficulty = document.querySelector("input[type=range]").value
    startTheGame(difficulty)
}