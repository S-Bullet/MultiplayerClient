const socket = io();

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');
const startButton = document.getElementById('startButton');
const crazyButton = document.getElementById('crezyButton');

startButton.addEventListener('click', () => {
    socket.emit('startGame');
});

startButton.addEventListener('click', () => {
    ServiceWorkerContainer.emit('crazyIsClicked', {
        offsetLeft: Math.random() * ((window.innerWidth - crazyButton.clientWidth) - 100),
        offsetTop: Math.random() * ((window.innerHeight - crazyButton.clientHeight) - 100)
    })
})

socket.on('startGame', () => {
    hideStartButton();
});

socket.on('crazyIsClicked', (data) => {
    goCrazy(data.offsetLeft, data.offsetTop);
})

function hideStartButton() {
    startButton.style.display = "none";
    crazyButton.style.display = "block";
    startingSection.style.display = "none";
}

function goCrazy(offsetLeft, offsetTop) {
    let top, left;

    left = offsetLeft;
    top = offsetTop;

    crazyButton.style.top = top + 'px';
    crazyButton.style.left = left + 'px';
    crazyButton.style.animation = "none";
}