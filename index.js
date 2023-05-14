const startReloadBtn = document.getElementById("start-reload-btn");
const stopReloadBtn = document.getElementById("stop-reload-btn");
let intervalId = null;

const TIME = 3000;

startReloadBtn.addEventListener("click",() => {    
        chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            startReloadBtn.setAttribute('disabled', true);
            intervalId = setInterval(() => {
                chrome.tabs.reload();
            }, TIME);
        } else {
            alert("There are no active tabs")
        }
    })
});


stopReloadBtn.addEventListener('click', () => {
    startReloadBtn.setAttribute('disabled', false);
    clearInterval(intervalId);
    window.close();    
});