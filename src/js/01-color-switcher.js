function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onSlickStart);
function onSlickStart() {
  let colorChange = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // console.log(colorChange);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

stopBtn.addEventListener('click', () => {
  clearInterval(colorChange);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
