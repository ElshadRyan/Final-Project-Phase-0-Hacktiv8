  document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // BUTTON YES
  // =========================
  document.getElementById("yesBtn").addEventListener("click", function() {
    window.location.href = "../Bram_Code/player_option.html";
  });

  // =========================
  // SOUND EFFECT
  // =========================
  const hoverSound = document.getElementById("hoverSound");
  const clickSound = document.getElementById("clickSound");

  const buttons = document.querySelectorAll(".pixel-btn");

  let lastPlay = 0;

  buttons.forEach(btn => {

    // HOVER SOUND
    btn.addEventListener("mouseenter", () => {
      const now = Date.now();

      if (now - lastPlay > 100) {
        hoverSound.currentTime = 0;
        hoverSound.play();
        lastPlay = now;
      }
    });

    // CLICK SOUND
    btn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

  // =========================
  // 🎵 MUSIC TOGGLE
  // =========================
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");

  let isMusicOn = false;

  // biar music bisa start (karena browser butuh interaksi)
  document.body.addEventListener("click", () => {
    if (!isMusicOn) {
      bgMusic.volume = 0.5;
      bgMusic.play();
      isMusicOn = true;
      musicBtn.textContent = "🔊";
    }
  }, { once: true });

  // toggle button
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.textContent = "🔊";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🔇";
    }
  });

});
