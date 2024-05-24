// Generate a list of values from the first one, with the difference from the previous one not exceed a constant and not exceed a min & max value

const INIT_DATA = 31.1;
const MIN = 25,
  MAX = 38;

const pushData = () => {
  let current = INIT_DATA;
  return function () {
    console.log(current);
    let newVal = Math.round((current + Math.random() * 4 - 2) * 10) / 10;
    if (newVal < MIN) newVal = MIN;
    else if (newVal > MAX) newVal = MAX;
    current = newVal;
    fetch('https://io.adafruit.com/api/v2/bentin345/feeds/pihome-test-temperature/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': 'aio_fvEn63QORbUNvhlFPTzJbCoTuaZB',
      },
      body: JSON.stringify({ value: newVal }),
    });
  };
};

const itv = setInterval(pushData(), 5000);
setTimeout(() => {
  clearInterval(itv);
}, 900000);
