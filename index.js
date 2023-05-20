const $startReloadBtn = document.getElementById("start-reload-btn");
const $stopReloadBtn = document.getElementById("stop-reload-btn");
const $timeInput = document.getElementById('time-input');
const $countdown = document.getElementById('countdown');
let timerIntervalId = null;
let countdownIntervalId = null;

const TIME = 3000;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;

$startReloadBtn.addEventListener("click",() => {
        chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            console.log($timeInput.value);
            if (!$timeInput.value.trim().length) {
                alert('Не указан интервал');
                return false;
            };

            const timeValue = Number($timeInput.value);
            if (isNaN(timeValue)) {
                alert('Интервал указано некорректно');
                return false;
            };

            const timeValueInMs = timeValue * SEC_IN_MIN * MS_IN_SEC;
            let time = timeValueInMs;

            $startReloadBtn.setAttribute('disabled', true);

            countdownIntervalId = setInterval(() => {
                time -= 1000;
                const inSec = time / 1000;
                const sec = (inSec % 60).toString().padStart(2, '0');
                const min = Math.floor(inSec / 60).toString().padStart(2, '0');
                const result = `${min} : ${sec}`;
                $countdown.innerText = result;
            }, 1000);

            timerIntervalId = setInterval(() => {
                chrome.tabs.reload();
                time = timeValueInMs;
            }, timeValueInMs);
        } else {
            alert("There are no active tabs")
        }
    })
});


$stopReloadBtn.addEventListener('click', () => {
    $startReloadBtn.setAttribute('disabled', false);
    clearInterval(timerIntervalId);
    clearInterval(countdownIntervalId);
    window.close();
});