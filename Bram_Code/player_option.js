var startBtn = document.getElementById("startBtn");
var nameInput = document.getElementById("playerName");
var errorText = document.getElementById("nameError");

var colorOptions = document.querySelectorAll(".color-option");
var selectedColor = "#77dd77"; // default color

// Default pilih warna pertama
colorOptions[0].classList.add("selected");

// Pilih warna
for (var i = 0; i < colorOptions.length; i++) {
    colorOptions[i].onclick = function () {

        for (var j = 0; j < colorOptions.length; j++) {
            colorOptions[j].classList.remove("selected");
        }

        this.classList.add("selected");
        selectedColor = this.getAttribute("data-color");
    };
}

// Validasi nama realtime
nameInput.oninput = function () {
    if (this.value.trim().length >= 3) {
        errorText.textContent = "";
        this.style.border = "none";
    }
};

// Dropdown difficulty
var dropdown = document.getElementById("difficultyDropdown");
var selected = dropdown.querySelector(".dropdown-selected");
var items = dropdown.querySelectorAll(".dropdown-item");

var selectedDifficulty = "easy";

selected.onclick = function () {
    dropdown.classList.toggle("active");
};

// Pilih difficulty
for (var i = 0; i < items.length; i++) {
    items[i].onclick = function () {
        selected.innerText = this.innerText;
        selectedDifficulty = this.getAttribute("data-value");
        dropdown.classList.remove("active");
    };
}

// Click luar = close dropdown
document.onclick = function (e) {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
    }
};

var popup = document.getElementById("popup");
var summaryName = document.getElementById("summaryName");
var summaryDifficulty = document.getElementById("summaryDifficulty");
var backBtn = document.getElementById("backBtn");
var continueBtn = document.getElementById("continueBtn");

// tombol start
startBtn.onclick = function () {
    var name = nameInput.value.trim();

    if (name === "") {
        errorText.textContent = "You can't start without a name... right?";
        nameInput.style.border = "1px solid #ff6b6b";
        return;
    }

    if (name.length < 3) {
        errorText.textContent = "3 Characters Minimal";
        nameInput.style.border = "1px solid #ff6b6b";
        return;
    }

    errorText.textContent = "";
    nameInput.style.border = "none";

    summaryName.innerText = "Player: " + name;
    summaryDifficulty.innerText = "Difficulty: " + selectedDifficulty;

    popup.classList.add("active");
};

backBtn.onclick = function () {
    popup.classList.remove("active");
};

continueBtn.onclick = function () {

    var playerOption = {
        name: nameInput.value.trim(),
        snakeColour: selectedColor,
        difficulty: selectedDifficulty
    };

    localStorage.setItem("playerOption", JSON.stringify(playerOption));

    console.log(playerOption);
};

