// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// start кнопка
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtnClick);

//зміни для календаря
const daysId = document.querySelector('[data-days]');
const hoursId = document.querySelector('[data-hours]');
const minutesId = document.querySelector('[data-minutes]');
const secondsId = document.querySelector('[data-seconds]');
const timerDiv = document.querySelector('.timer');

// відображення дати та часу - поточний
const inputCalendars = document.querySelector('input#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   перевірка на дату та час
    if (selectedDates[0] <= new Date()) {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    // console.log(selectedDates[0]);
  },
};
const fp = flatpickr(inputCalendars, options);
console.log(fp);

// функція convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// функція яка форматує значення (додає 0, якщо в числі менше двох символів)
const addLeadingZero = value => value.toString().padStart(2, '0'); // приведення до строки та додавання нуля

function onStartBtnClick(e) {
  const timerId = setInterval(() => {
    let countdown = new Date(inputCalendars.value) - new Date(); // число
    startBtn.disabled = true;
    if (countdown > 0) {
      let timerOn = convertMs(countdown);
      // console.log(timerOn.seconds);

      daysId.textContent = addLeadingZero(timerOn.days);
      hoursId.textContent = addLeadingZero(timerOn.hours);
      minutesId.textContent = addLeadingZero(timerOn.minutes);
      secondsId.textContent = addLeadingZero(timerOn.seconds);

      if (countdown < 11000) {
        timerDiv.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Time out!!!');
      clearInterval(timerId);
      timerDiv.style.color = 'black';
    }
  }, 1000);
}
