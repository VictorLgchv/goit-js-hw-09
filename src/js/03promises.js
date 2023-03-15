// import Notiflix from 'notiflix';

// const refs = {
//   inputDelay: document.querySelector("input[name='delay']"),
//   inputStep: document.querySelector("input[name='step']"),
//   inputAmount: document.querySelector("input[name='amount']"),
//   createPromisesBtn: document.querySelector('button'),
//   form: document.querySelector('.form'),
// };
// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     timerStepId = setInterval(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }


// refs.createPromisesBtn.addEventListener('click', onSubmitBtn);

// function onSubmitBtn(evt) {
//   evt.preventDefault();
//   let delayNumber = +refs.inputDelay.value;
//   const stepNumber = +refs.inputStep.value;
//   const amountNumber = +refs.inputAmount.value;

//   for (let i = 1; i <= amountNumber; i += 1) {
//     createPromise(i, delayNumber)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//     delayNumber += stepNumber;
//   }
//   refs.form.reset();
// }

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  btnSubmit: document.querySelector('button'),
  delayInput: document.querySelector('input[name=delay]'),
  stepInput: document.querySelector('input[name=step]'),
  amountInput: document.querySelector('input[name=amount]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { form, delayInput, stepInput, amountInput } = refs;
  let delayDuration = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayDuration)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayDuration += step;
  };
  form.reset();
}