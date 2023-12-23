const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lifeTotal: 3,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

// Functions
const countDown = () => {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0 || state.values.lifeTotal <= 0) {
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);

    stopSound("background");
    playSound("gameover", 1);
    setTimeout(() => {
      alert(`Game Over! Your result was: ${state.values.result}`);
      window.location.reload();
    }, 500);
  }
};

const randomSquare = () => {
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];

  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
};

const increaseVelocity = () => {
  state.values.gameVelocity -= 250;
  clearInterval(state.actions.timerId);
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

const increaseDifficult = () => {
  if (state.values.currentTime === 45) {
    increaseVelocity();
  } else if (state.values.currentTime === 26) {
    stopSound("background");
    playSound("ralph`s laugh", 1);
  } else if (state.values.currentTime === 20) {
    increaseVelocity();
  }
};

// Sounds methods
const playSound = (sound, volume = 0.2) => {
  const audio = new Audio(`./src/sounds/${sound}.mp3`);
  audio.volume = volume;
  audio.play();

  // Replay Background Sound
  if (sound === "background") {
    audio.loop = true;
  }
};

const stopSound = (sound) => {
  const audio = new Audio(`./src/sounds/${sound}.mp3`);
  audio.pause();
  audio.currentTime = 0;
};

// Listen to Hit
const addListenerHitBox = () => {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        // Condition to hit in the enemy
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        // Condition case wrong box
        playSound("wronghit", 1);
        state.values.lifeTotal--;
        state.view.life.innerHTML = `x${state.values.lifeTotal}`;
      }
    });
  });
};

// Method to begin the game
const initialize = () => {
  document.getElementById("startButton").style.display = "none";

  // Start Vilian Moving and Game CountDown
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);

  playSound("background", 0.1);
  addListenerHitBox();

  // Increase difficult after of the choosed time
  setInterval(increaseDifficult, 1000);
};
