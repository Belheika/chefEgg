let currentTime = 0;
let currentEggType = '';
let timerInterval;

function getStarted() {
    document.getElementById('screen1').classList.remove('active');
    document.getElementById('screen2').classList.add('active');
    console.log("The egg has been clicked");
}

function startSoftEgg() {
    startTimer(5 * 60, 'soft');
    console.log("Œuf mollet choisi !");
}

function startHardEgg() {
    startTimer(10 * 60, 'hard');
    console.log("Œuf dur choisi !");
}

// UNE SEULE FOIS startTimer !
function startTimer(seconds, eggType) {
    currentTime = seconds;
    currentEggType = eggType;
    changeScreen('screen3');
}

function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startCountdown() {
    let remainingTime = currentTime;
    
    timerInterval = setInterval(() => {
        remainingTime--;
        document.getElementById('timer-display').textContent = formatTime(remainingTime);
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            console.log("TIMER TERMINÉ ! Aller au screen 4");
        }
    }, 1000);
}

function startCooking() {
    document.getElementById('cooking-egg').src = 'assets/eggs/eggytimer.gif';

    const eggText = currentEggType === 'soft' ? 'soft-boiled' : 'hard-boiled';

    // Utilise la classe qui existe déjà
    document.querySelector('#screen3 .title').textContent =
        `Your ${eggText} egg will be ready in`;

    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.style.display = 'block';
    timerDisplay.textContent = formatTime(currentTime);

    startCountdown();
}