  document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("yesBtn").addEventListener("click", function() {
    window.location.href = "../Bram_Code/player_option.html";
  });


  const hoverSound = document.getElementById("hoverSound");
  const clickSound = document.getElementById("clickSound");

  const buttons = document.querySelectorAll(".pixel-btn");

  let lastPlay = 0;

  buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {
      const now = Date.now();

      if (now - lastPlay > 100) {
        hoverSound.currentTime = 0;
        hoverSound.play();
        lastPlay = now;
      }
    });

    btn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");

  let isMusicOn = false;

  // biar music bisa start (karena browser butuh interaksi)
  document.body.addEventListener("click", () => {
    if (!isMusicOn) {
      bgMusic.volume = 0.5;
      bgMusic.play();
      isMusicOn = true;
      musicBtn.textContent = "🎵";
    }
  }, { once: true });

  // toggle button
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = "🎵";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🔇";
    }
  });

});

/* ===================== LEADERBOARD ===================== */

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

let leaderboardButton = document.getElementById("leaderboardButton")

leaderboardButton.onclick = leaderboard("allPlayerData")


function readingDataFromLocalStorage(keys) {

    let values = localStorage.getItem(keys);
    let valuesJson =JSON.parse(values) 
    return valuesJson;
}

function sortingData(values) {

  if(!values)
  {
    return
  }

  if(values.length < 2)
  {
    return [values]
  }

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length - 1; j++) {

            if (values[j + 1]) {

                if (values[j].score < values[j + 1].score) {

                    let temp = values[j];
                    values[j] = values[j + 1];
                    values[j + 1] = temp;
                }
            }
        }
    }

    return values;
}

function deletePlayer(index, keys) {
  let value = readingDataFromLocalStorage(keys)

  let resValue = []
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    if(i !== index)
      {
        resValue.push(value[i])
      }    
  }

  console.log(resValue);
  localStorage.setItem(keys, JSON.stringify(resValue))

  let leaderboardTable = document.getElementById("leaderboard")
  leaderboardTable.remove()

  leaderboard("allPlayerData")

}

function clearLeaderboard() {
    localStorage.clear();
    let leaderboardTable = document.getElementById("leaderboard")
    leaderboardTable.remove()
}

function leaderboard(keys) {

  
    let allData = readingDataFromLocalStorage(keys);
    let sorted = sortingData(allData);
    const TOP_10 = 10

    console.log(sorted);
    if(!sorted)
    {
      return
    }

    creatingTable("leaderboard", "leaderboard", "section2");

    let table = document.getElementById("leaderboard");

    if(sorted.length === 1)
    {
        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.innerHTML = sorted[0][0].name;

        let tdScore = document.createElement("td");
        tdScore.innerHTML = sorted[0][0].score;

        let tdButtonDelete = document.createElement("td")
        let buttonDelete = document.createElement("button")
        buttonDelete.addEventListener("click", () => {deletePlayer(0, "allPlayerData")}) 
        buttonDelete.innerHTML = "delete"

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        tr.appendChild(tdButtonDelete)
        tdButtonDelete.appendChild(buttonDelete)

        table.appendChild(tr);
        return
    }

    for (let i = 0; i < TOP_10; i++) {

        if (!sorted[i]) continue;

        let tr = document.createElement("tr");

        let tdName = document.createElement("td");
        tdName.innerHTML = sorted[i].name;

        let tdScore = document.createElement("td");
        tdScore.innerHTML = sorted[i].score;

        let tdButtonDelete = document.createElement("td")
        let buttonDelete = document.createElement("button")
        buttonDelete.addEventListener("click", () => {deletePlayer(i, "allPlayerData")}) 
        buttonDelete.innerHTML = "delete"

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        tr.appendChild(tdButtonDelete)
        tdButtonDelete.appendChild(buttonDelete)

        table.appendChild(tr);
    }
}
