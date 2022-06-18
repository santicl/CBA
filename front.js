import { GetCookie } from "./app.js";

let dataToSave;
let second = 0;
let minute = 0;
let hours = 0;

document.getElementById("create-cookie").addEventListener("click", () => {
    dataToSave = GetData();
    SaveData(dataToSave);
    InitTimer();
})

const GetData = () => {
    let dataCookie = GetCookie();

    let cookie = {
        dataCookie,
        many: 1,
        time: 0,
        lastDate: 0,
        rebound: false
    }

    return cookie;
}

const InitTimer = () => {//chronometer
    setInterval(function () {
        if (second == 60) {
            second = 0;
            minute++;
        }
        if (minute == 60) {
            minute = 0;
            hours++;
        }
        second++;
    }, 1000);
}

const Stop = () => { //get if user make a rebound and get new lastDate
    let cookieDatas = localStorage.getItem("cookie");
    let data = JSON.parse(cookieDatas);
    const newDate = new Date();
    let dayToday = newDate.getDate();
    for (let i = 0; i < data.length; i++) {
        if (data[i].dataCookie === GetCookie()) {
            if (minute === 0) {
                data[i].rebound = true;
                data[i].time = minute;
                data[i].lastDate = newDate;
                localStorage.setItem("cookie", JSON.stringify(data));
            } else {
                data[i].time = minute;
                data[i].rebound = false;
                data[i].lastDate = newDate;
                localStorage.setItem("cookie", JSON.stringify(data));
            }
        }
        Reset();
    }
}

const Reset = () => {
    clearInterval(hours, minute, second);
}

const Validate = (array, cookie) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].dataCookie === cookie) {
            array[i].many++;
            return array;
        }
    }
    return array
}

const SaveData = (data) => {
    if (localStorage.getItem("cookie") === null) {
        let dataC = [];
        dataC.push(data);
        localStorage.setItem("cookie", JSON.stringify(dataC));
    } else {
        let dataC = JSON.parse(localStorage.getItem("cookie"));//comprobar si algun dato en el local ya existe.
        let result = Validate(dataC, GetCookie());
        if (dataC === result) {
            localStorage.setItem("cookie", JSON.stringify(result));
        } else {
            dataC.push(data);
            localStorage.setItem("cookie", JSON.stringify(dataC));
        }
    }
    Read();
}

const Read = () => {
    let data = JSON.parse(localStorage.getItem("cookie"));
    for (let i = 0; i < data.length; i++) {
        const { dataCookie, many, time, lastDate, rebound } = data[i];
        document.getElementById("content").innerHTML = `<div>
        <h1 class="cookie-user">Cookie Usuario: <p>${dataCookie}</p></h1>
        <h2 class="many">Veces Usuario en Pagina: <p id="number">${many}</p></h2>
        <h1 class="cookie-user">Time: <p>${time} Minutes</p></h1>
        <h2 class="many">LastDate: <p id="number">${lastDate}</p></h2>
        <h2 class="many">Rebound: <p id="number">${rebound}</p></h2>
    </div>`;
    }
}

document.getElementById("stop").addEventListener("click", Stop);

Read();