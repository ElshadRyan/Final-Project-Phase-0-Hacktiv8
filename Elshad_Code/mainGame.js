var data = localStorage.getItem("playerOption");
var playerOption = data ? JSON.parse(data) : null;

if (!playerOption) {
    alert("Player data not found!");
    window.location.href = "../Bram_Code/player_option.html";
}

/* ===================== GAME STATE ===================== */

let snakePositionData = [[0,0], [1,0], [2,0]];
let positionSnakeToAdd = [0, 0];

let foodPosition = [];
let isPlaying = true;
let isStarted = false;

/* ===================== DIFFICULTY ===================== */

const playerChoice = {
    difficulties: {
        easy: { speed: 120, areaSize: [21, 21] },
        medium: { speed: 80, areaSize: [25, 41] },
        hard: { speed: 50, areaSize: [41, 61] }
    }
};

let currDifficulty = playerOption.difficulty || "easy";
let valueBody = playerChoice.difficulties[currDifficulty].areaSize;

/* ===================== DOM ===================== */

function appendingDiv(id, cls, parentId) {
    let parent = document.getElementById(parentId);
    if (!parent) return;

    let div = document.createElement("div");
    if (id) div.id = id;
    if (cls) div.className = cls;

    parent.appendChild(div);
}

function creatingTable(id, cls, parentId) {
    let parent = document.getElementById(parentId);
    if (!parent) return;

    let table = document.createElement("table");
    table.id = id;
    table.className = cls;

    parent.appendChild(table);
}

function creatingTableValue(id, size) {
    creatingTableBody(size, id);
}

function creatingTableBody(size, tableId) {

    let table = document.getElementById(tableId);
    if (!table) return;

    let tbody = document.createElement("tbody");

    let hR = Math.floor(size[0] / 2);
    let wR = Math.floor(size[1] / 2);

    for (let i = 0; i < size[0]; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < size[1]; j++) {
            let td = document.createElement("td");

            td.id = (i - hR) + "r" + (j - wR) + "c";
            td.style.width = "15px";
            td.style.height = "15px";
            td.style.background = "black";

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

/* ===================== INPUT ===================== */

window.addEventListener("keydown", (event) => {

    isStarted = true;

    if (event.key === "ArrowUp" || event.key === "w") {
        if (positionSnakeToAdd[0] !== 1) positionSnakeToAdd = [-1, 0];
    }else if (event.key === "ArrowDown" || event.key === "s") {
        if (positionSnakeToAdd[0] !== -1) positionSnakeToAdd = [1, 0];
    }else if (event.key === "ArrowLeft" || event.key === "a") {
        if (positionSnakeToAdd[1] !== 1) positionSnakeToAdd = [0, -1];
    }else if (event.key === "ArrowRight" || event.key === "d") {
        if (positionSnakeToAdd[1] !== -1) positionSnakeToAdd = [0, 1];
    }
});

/* ===================== MOVE ===================== */

function moveSnake() {

    let newSnake = [];

    for (let i = 0; i < snakePositionData.length; i++) {
        if (i === 0) {
            newSnake.push([
                snakePositionData[i][0] + positionSnakeToAdd[0],
                snakePositionData[i][1] + positionSnakeToAdd[1]
            ]);
        } else {
            newSnake.push(snakePositionData[i - 1]);
        }
    }

    snakePositionData = newSnake;
}

/* ===================== LOCAL STORAGE ===================== */

function pushingDataToLocalStorage(data) {
    if (data.name.length === 0) return;
    localStorage.setItem(data.name, JSON.stringify(data));
}

function readingDataFromLocalStorage() {

    let keys = [];
    let values = [];

    for (let i = 0; i < localStorage.length; i++) {
        let k = localStorage.key(i);
        keys.push(k);
        values.push(JSON.parse(localStorage.getItem(k)));
    }

    return [keys, values];
}

function sortingData(keys, values) {

    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keys.length - 1; j++) {

            if (values[j + 1]) {

                if (values[j].score < values[j + 1].score) {

                    let temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;

                    let tempKey = keys[j];
                    keys[j] = keys[j + 1];
                    keys[j + 1] = tempKey;
                }
            }
        }
    }

    return values;
}

function deletePlayer(name) {
    localStorage.removeItem(name);
}

function clearLeaderboard() {
    localStorage.clear();
}
/* ===================== LEADERBOARD ===================== */

function leaderboard() {

    let allData = readingDataFromLocalStorage();
    let sorted = sortingData(allData[0], allData[1]);
    const TOP_10 = 10

    creatingTable("leaderboard", "leaderboard", "section2");

    let table = document.getElementById("leaderboard");

    for (let i = 0; i < TOP_10; i++) {

        if (!sorted[i]) continue;

        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.innerHTML = sorted[i].name;

        let tdScore = document.createElement("td");
        tdScore.innerHTML = sorted[i].score;

        tr.appendChild(tdName);
        tr.appendChild(tdScore);

        table.appendChild(tr);
    }
}

/* ===================== FOOD ===================== */

function spawnFood() {

    let hR = Math.floor(valueBody[0] / 2);
    let wR = Math.floor(valueBody[1] / 2);

    while (true) {

        let food = [
            Math.floor(Math.random() * valueBody[0]) - hR,
            Math.floor(Math.random() * valueBody[1]) - wR
        ];

        let safe = true;

        for (let i = 0; i < snakePositionData.length; i++) {
            if (
                snakePositionData[i][0] === food[0] &&
                snakePositionData[i][1] === food[1]
            ) {
                safe = false;
                break;
            }
        }

        if (safe) {
            foodPosition = food;
            break;
        }
    }
}

/* ===================== COLLISION FIXED ===================== */

function checkCollision() {

    let head = snakePositionData[0];

    let maxRow = Math.floor(valueBody[0] / 2);
    let maxCol = Math.floor(valueBody[1] / 2);

    // WALL COLLISION FIX (AKURAT, NO EARLY DEATH)
    if (
        head[0] < -maxRow ||
        head[0] > maxRow ||
        head[1] < -maxCol ||
        head[1] > maxCol
    ) {
        isPlaying = false;
    }

    // FOOD
    if (head[0] === foodPosition[0] && head[1] === foodPosition[1]) {
        snakePositionData.push([...snakePositionData[snakePositionData.length - 1]]);
        spawnFood();
    }

    // SELF COLLISION
    for (let i = 1; i < snakePositionData.length; i++) {
        if (
            snakePositionData[i][0] === head[0] &&
            snakePositionData[i][1] === head[1]
        ) {
            isPlaying = false;
        }
    }
}

/* ===================== RENDER ===================== */

function render() {

    document.querySelectorAll("td").forEach(td => {
        td.style.background = "black";
    });

    // snake
    snakePositionData.forEach(s => {
        let el = document.getElementById(s[0] + "r" + s[1] + "c");
        if (el) el.style.background = playerOption.snakeColour;
    });

    // food
    let foodEl = document.getElementById(foodPosition[0] + "r" + foodPosition[1] + "c");
    if (foodEl) foodEl.style.background = "red";
}

/* ===================== INIT ===================== */

appendingDiv("section1", "theGame", "main");
appendingDiv("section2", "leaderboard", "main");

creatingTable("snake_table", "snake_table", "section1");
creatingTableValue("snake_table", valueBody);

spawnFood();
render(); // FIX: biar langsung keliatan



leaderboard()

/* ===================== LOOP ===================== */

let lastTime = 0;
let speed = playerChoice.difficulties[currDifficulty].speed;

function loop(time) {

    if (!isStarted) {
        requestAnimationFrame(loop);
        return;
    }

    if (!lastTime) lastTime = time;

    if (time - lastTime > speed) {

        lastTime = time;

        moveSnake();
        checkCollision();
        render();
    }

    if (isPlaying) {
        requestAnimationFrame(loop);
    } else {
        document.getElementById("main").innerHTML =
            `<h2>Game Over - Score: ${snakePositionData.length}</h2>`;
    }
}

requestAnimationFrame(loop);