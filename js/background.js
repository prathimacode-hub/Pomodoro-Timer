var dict = {
    1: "drink_water",
    2: "screen_time_check",
    3: "pomodoro_method",
    4: "sleep-reminder",
    5: "drink_water",
    6: "screen_time_check",
    7: "pomodoro_method",
    8: "sleep-reminder",
    9: "clearAll"
};

var activityList = Array(6).fill("inactive");

chrome.action.setBadgeText({text: 'OFF'});

chrome.alarms.onAlarm.addListener(

    function(alarm){
    //determine which alarm is set off
    //log to keep track which alarm is set off

    var notifTitle; 
    var notifMsg;

    switch(alarm.name){
        case "drink_water":
        notifTitle = "Stay Hydrated!"
        notifMsg = "Remember to drink your water :)"
        break;

        case "screen_time_check":
        notifTitle = "Screen time reminder"
        notifMsg = "You have been using your computer for a while!"
        break;

        case "pomodoro_method":
        notifTitle = "Pomodoro Method: take your 5 minute break now!"
        notifMsg = "You have worked for 25 minutes continuously, now take a 5 minute break and get your mind back in focus!"
        break;

        case "sleep-reminder":
        notifTitle = "Time to sleep!"
        notifMsg = "Right now it is the best for your health to go to sleep"
        break;
    }

    chrome.notifications.create(
        {
        type :"basic",
        iconUrl: "pomodoro.png",
        title: notifTitle,
        message: notifMsg,
        silent: false
        },
        () => {}
    )
    console.log("current alarm: " + alarm.name);
    }
)


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.time <5){
            createAlarm(request.time, request.repeat);
        }
        else if (request.time >= 5){
            stopAlarm(request.time);
        }
    }
);


function createAlarm(type, num){
    chrome.action.setBadgeText({text: 'ON'});

  //pomodoro
    if (type == 3){
        chrome.alarms.create(
            dict[type],
            {
            delayInMinutes: 25,
            periodInMinutes: 30
        }
        )
    }
    else if (type == 4){
    //sleep time reminder
    console.log(Date());

    //this does the timezone offset
    const d = new Date();
    let diff = d.getTimezoneOffset()*1000*60;

    //how many miliseconds passed in a day
    let msPassed = (Date.now())%(1000*3600*24) - diff;
    console.log(diff);

    console.log(msPassed);
    //Use the sleep time to subtract that milisecond
    let addedTime = 1000*3600*num - msPassed;
    console.log(addedTime);
    //if the time already passed
    if(addedTime <= 0){
        addedTime += 1000*3600*24;
    }

    console.log(Date.now() + addedTime);
    chrome.alarms.create(
        "sleep-reminder",
        {
            when: Date.now() + addedTime,

        //a full day: 24 hours => 24 x 60 min = 1440 min
        periodInMinutes: 1440
        }
        )
    }
    else {
        chrome.alarms.create(
            dict[type],
        {
            delayInMinutes: num,
            periodInMinutes: num
        }
        )
    }
    activityList[type-1] = "active";
}

function stopAlarm(type){
    if (dict[type] == "clearAll"){
        chrome.alarms.clearAll();
        activityList = Array(6).fill("inactive");
    }
    else {
        chrome.alarms.clear(dict[type]);
        activityList[(type-5)] = "inactive";
    }
    if (activityList.findIndex((value)=>value === "active") == -1){
        chrome.action.setBadgeText({text: 'OFF'});
    }
}
