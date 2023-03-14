const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.stopBtn.disabled = true;


let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(evt) {
  switchDisabled();
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
}

function onStopBtnClick(evt) {
  switchDisabled();
  clearInterval(timerId);
}

function switchDisabled() {
  if (!refs.startBtn.disabled) {
    refs.stopBtn.disabled = false;
    refs.startBtn.disabled = true;
  } else {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
