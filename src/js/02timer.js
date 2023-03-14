import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('.timer .value[data-days]'),
  timerHours: document.querySelector('.timer .value[data-hours]'),
  timerMinutes: document.querySelector('.timer .value[data-minutes]'),
  timerSeconds: document.querySelector('.timer .value[data-seconds]'),
};
let timerId = null;
let currentDate = null;
refs.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (Date.now() > selectedDates[0].getTime()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    currentDate = selectedDates[0].getTime();
    // console.log(currentDate);
  },
};

const pickr = new flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  timer.start();
  refs.startBtn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  start() {
    timerId = setInterval(() => {
      const nowDate = Date.now();
      // console.log('Hi');
      if (currentDate >= nowDate) {
        const deltaTime = currentDate - nowDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        refs.timerDays.textContent = days;
        refs.timerHours.textContent = hours;
        refs.timerMinutes.textContent = minutes;
        refs.timerSeconds.textContent = seconds;
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  },
};
