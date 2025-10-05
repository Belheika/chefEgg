// Variables audio
let tickSound = new Audio('assets/audio/tictac.mp3');
let alarmSound = new Audio('assets/audio/pop.mp3');
tickSound.volume = 0.8;
alarmSound.volume = 0.9;

let isMuted = false;
let currentTime = 0;
let currentEggType = '';
let timerInterval;

// Fonction de boucle audio infaillible
function playLoopingSound(sound) {
    sound.play().then(() => {
        sound.onended = () => {
            sound.currentTime = 0;
            sound.play();
        };
    }).catch(error => {
        console.log("Son bloqué, réessai dans 1sec...");
        setTimeout(() => playLoopingSound(sound), 1000);
    });
}

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
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Lance le tic-tac en boucle
    playLoopingSound(tickSound);

    let remainingTime = currentTime;

    timerInterval = setInterval(() => {
        remainingTime--;
        currentTime = remainingTime;
        document.getElementById('timer-display').textContent = formatTime(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            // Arrête tic-tac et lance alarme
            tickSound.pause();
            tickSound.currentTime = 0;
            playLoopingSound(alarmSound);
            changeScreen('screen4');
        }
    }, 1000);
}

function startCooking() {
    document.getElementById('cooking-egg').src = 'assets/eggs/eggytimer.gif';

    const eggText = currentEggType === 'soft' ? 'soft-boiled' : 'hard-boiled';
    document.querySelector('#screen3 .title').textContent =
        `Your ${eggText} egg will be ready in`;

    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.style.display = 'block';
    timerDisplay.textContent = formatTime(currentTime);

    startCountdown();
}

function playAlarm() {
    console.log("🔔 DRIIING ! Sors tes œufs !");
}

function backToStart() {
    tickSound.pause();
    tickSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;

    location.reload();
}

function skipToFinish() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    tickSound.pause();
    tickSound.currentTime = 0;
    playLoopingSound(alarmSound);
    changeScreen('screen4');
}

function toggleMute() {
    isMuted = !isMuted;

    if (isMuted) {
        tickSound.pause();
        alarmSound.pause();
    } else {
        if (document.getElementById('screen3').classList.contains('active')) {
            playLoopingSound(tickSound);
        } else if (document.getElementById('screen4').classList.contains('active')) {
            playLoopingSound(alarmSound);
        }
    }

    const muteBtn3 = document.getElementById('mute-btn-3');
    const muteBtn4 = document.getElementById('mute-btn-4');

    if (muteBtn3) muteBtn3.textContent = isMuted ? '🔇' : '🔊';
    if (muteBtn4) muteBtn4.textContent = isMuted ? '🔇' : '🔊';
}