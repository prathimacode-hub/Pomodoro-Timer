
// By pressing this button it should read all the fields
const ele = document.getElementById("btn")
ele.addEventListener("click", () => {
    sendMsg('1',30);
    sendMsg('2',60);

  // Activation button for the Pomodoro method:
    sendMsg('3',10);
    sendMsg('4',23);
});


// Water break set
const water_alarm = document.getElementById("water_break");
water_alarm.addEventListener("click", () => {sendMsg('1',parseFloat(document.getElementById("waterNum").value));
clearInput("waterNum");
});

// Screen break set
const screen_alarm = document.getElementById("screen_break");
screen_alarm.addEventListener("click", () => {sendMsg('2',parseFloat(document.getElementById("screenNum").value));
clearInput("screenNum")
});

// Activation for the Pomodoro method:
const pomodoroButton = document.getElementById("pomodoro_timer");
pomodoroButton.addEventListener("click", () => {sendMsg('3',1)});

// Sleep reminder
const sleepButton = document.getElementById("sleep_reminder");
sleepButton.addEventListener("click", () => {sendMsg('4',parseFloat(document.getElementById("sleepNum").value));
clearInput("sleepNum")
});

//Stop water alarms
const stopWater = document.getElementById("stopWater");
stopWater.addEventListener("click", () => {sendMsg('5',0)});

//Stop screen alarms
const stopScreen = document.getElementById("stopScreen");
stopScreen.addEventListener("click", () => {sendMsg('6',0)});

//Stop pomodoro alarms
const stopPomodoro = document.getElementById("stopPomodoro");
stopPomodoro.addEventListener("click", () => {sendMsg('7',0)});

//Stop sleep alarms
const stopSleepReminder = document.getElementById("stopSleepReminder");
stopSleepReminder.addEventListener("click", () => {sendMsg('8',0)});

//Stop ALL ALARMS
const stopAllReminders = document.getElementById("stopAllReminders");
stopAllReminders.addEventListener("click", () => {sendMsg('9',0);});

//helper
function sendMsg(t, rep){
    chrome.runtime.sendMessage({time: t, repeat: rep}, function (response) {
    });
};

function clearInput(name){
    document.getElementById(name).value = "";
}

