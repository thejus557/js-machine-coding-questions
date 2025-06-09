const IDS = {
  timerDisplay: "#display",
};

const DOM_CACHE = {
  elements: {},

  getElements: (ID) => {
    if (ID in DOM_CACHE.elements) {
      return DOM_CACHE.elements[ID];
    } else {
      const ele = document.querySelector(ID);
      DOM_CACHE.elements[ID] = ele;
      return DOM_CACHE.elements[ID];
    }
  },
};

let timer = '00:00:00';
let timerSubscription;

const counter = {
  count: 0,
  updateCounter: () => counter.count++,
  getCounter: () => counter.count,
  resetCounter: () => counter.count = 0
}
function generateTimeString(h, m, s) {
  return `${h}:${m}:${s}`
}

function appendTimeStringToUI(timeString) {
  const timerDisplay = DOM_CACHE.getElements(IDS.timerDisplay);
  timerDisplay.textContent = timeString
}

function handleUpdateTimer(counter) {  
  counter.updateCounter();

  const milliSeconds = counter.getCounter() * 1000;

  const totalSeconds = Math.floor(milliSeconds / 1000);

  const hours = Math.floor((totalSeconds / 3600)).toString().padStart(2,'0');
  const minutes = (Math.floor((totalSeconds % 3600)/60)).toString().padStart(2,'0')
  const seconds = Math.floor((totalSeconds % 60)).toString().padStart(2, '0')
  
  const timerString = generateTimeString(hours, minutes, seconds)
  appendTimeStringToUI(timerString)
}

function startTimer() {
  timerSubscription = setInterval(() => handleUpdateTimer(counter),1000)
}


function stopTimer() {
  clearInterval(timerSubscription);
}

function resetTimer() {
  timer = '00:00:00';
  appendTimeStringToUI(timer)
  clearInterval(timerSubscription);
  counter.resetCounter();
}