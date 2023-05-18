const $startReloadBtn = document.getElementById("start-reload-btn");
const $stopReloadBtn = document.getElementById("stop-reload-btn");
const $timeInput = document.getElementById('time-input');
let intervalId = null;

const TIME = 3000;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;

// TODO: Добавить таймер обратного отсчета между перезагрузками

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

            $startReloadBtn.setAttribute('disabled', true);
            intervalId = setInterval(() => {
                chrome.tabs.reload();
            }, timeValueInMs);
        } else {
            alert("There are no active tabs")
        }
    })
});


$stopReloadBtn.addEventListener('click', () => {
    $startReloadBtn.setAttribute('disabled', false);
    clearInterval(intervalId);
    window.close();
});