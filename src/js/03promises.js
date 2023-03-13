import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector("input[name='delay']"),
  inputStep: document.querySelector("input[name='step']"),
  inputAmount: document.querySelector("input[name='amount']"),
  createPromisesBtn: document.querySelector('button'),
  form: document.querySelector('.form'),
};
let delayNumber = null;
let stepNumber = null;
let amountNumber = null;
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    timerStepId = setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.createPromisesBtn.addEventListener('click', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();
  delayNumber = +refs.inputDelay.value;
  stepNumber = +refs.inputStep.value;
  amountNumber = +refs.inputAmount.value;

  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, delayNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
      delayNumber += stepNumber;
  }
  refs.form.reset();
}
