var updateInterval = null;

const worldsEdgeMinutes = 120;
const canyonMinutes = 90;
const startingWorld = 0;
const startingDateTime = new Date(Date.UTC(2020, 3, 16, 1, 30)); //april 16 2020, 12:30am (Iowa GCE 4)
const millisPerMinute = 60000;

var currentWorld = startingWorld; // 0 = WE, 1 = KC
var lastMapUpdateTime = startingDateTime;

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

window.onload = function onLoad()
{
    updateInterval = setInterval(update, 1000)
    update();
}

function update()
{
    //document.getElementById("timer").innerHTML = "In ";
    var currentWorldDuration = getNextDuration();

    while(lastMapUpdateTime.getTime() + currentWorldDuration * millisPerMinute < new Date().getTime()) //catch us up to current time from the initial time
    {
        currentWorldDuration = getNextDuration();
        lastMapUpdateTime.setTime(lastMapUpdateTime.getTime() + currentWorldDuration * millisPerMinute);
        currentWorld = getNextMapID();
    }
    document.getElementById("currentWorld").innerHTML = getWorldString(currentWorld);
    document.getElementById("nextWorld").innerHTML = getWorldString(getNextMapID());

    var secondsElapsedSinceSwitch = (new Date() - lastMapUpdateTime) / 1000;
    var secondsLeftInWorld = currentWorldDuration * 60 - secondsElapsedSinceSwitch;

    document.getElementById("timer").innerHTML = "In " + secondsLeftInWorld.toString().toHHMMSS();

    document.body.style.backgroundImage = "url('" + getBackgroundImageForWorld(currentWorld) + "')";
}

function getWorldString(id)
{
    switch(id)
    {
        case 0:
            return "World's Edge"
        case 1:
            return "King's Canyon"
        case 2:
            return "King's Canyon Afer Dark"
    }
    return "welp";
}

function getBackgroundImageForWorld(id)
{
    switch(id)
    {
        case 0:
            return "worldsedge.png"
        case 1:
            return "kingscanyon.jpg"
        case 2:
            return "afterdark.jpg"
    }
    return "welp";
}

function getNextMapID()
{
    var d = currentWorld;
    d = currentWorld + 1;
    if(d == 2)
        d = 0;
    return d;
}

function getNextDuration()
{
    if(currentWorld == 0)
    {
        return worldsEdgeMinutes;
    }
    else if(currentWorld == 1)
    {
        return canyonMinutes;
    }
    return 0;
}

