// ===============================
// Birthday Surprise Website
// Change the details in the SETTINGS section below.
// ===============================

const SETTINGS = {
  herName: "Goluuaaa",
  autoHearts: true
};

// --------- Basic setup ----------
document.querySelectorAll(".her-name").forEach(el => el.textContent = SETTINGS.herName);

const loader = document.getElementById("loader");
const app = document.getElementById("app");
const pages = [...document.querySelectorAll(".page")];
const hearts = document.getElementById("hearts");
const toast = document.getElementById("toast");

setTimeout(() => {
  loader.classList.remove("active");
  loader.classList.add("hidden");
  app.classList.remove("hidden");
}, 3600);

// --------- Page navigation ----------
function showPage(id) {
  pages.forEach(page => page.classList.remove("active-page"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active-page");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.next));
});

document.getElementById("skipMusic").addEventListener("click", () => showPage("cake"));

// --------- Floating hearts ----------
function createHeart() {
  if (!SETTINGS.autoHearts) return;
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > .2 ? "♥" : "❤";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (10 + Math.random() * 22) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  heart.style.opacity = .25 + Math.random() * .6;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 650);

// --------- Toast ----------
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

// --------- Music player ----------
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const audioProgress = document.getElementById("audioProgress");
const time = document.getElementById("time");

playBtn.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      playBtn.textContent = "❚❚";
      showToast("Music on 🎶❤️");
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  } catch {
    showToast("Add song.mp3 to play your song 🎵");
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  audioProgress.style.width = percent + "%";
  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  time.textContent = `${mins}:${secs}`;
});

audio.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  audioProgress.style.width = "0%";
});

// --------- Candles ----------
const candles = [...document.querySelectorAll(".candle")];
const cakeNext = document.getElementById("cakeNext");
const wishText = document.getElementById("wishText");

candles.forEach((candle, index) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("blown")) return;

    candle.classList.add("blown");
    const remaining = candles.filter(c => !c.classList.contains("blown")).length;

    if (remaining > 0) {
      wishText.textContent = `${remaining} candle${remaining === 1 ? "" : "s"} left... make your wish ✨`;
    } else {
      wishText.textContent = "Wish made! May every beautiful wish come true. ❤️";
      cakeNext.disabled = false;
      burstConfetti();
    }
  });
});

cakeNext.addEventListener("click", () => {
  showPage("final");
  burstConfetti();
});

// --------- Final love button ----------
document.getElementById("loveBtn").addEventListener("click", () => {
  burstConfetti();
  showToast("I love you forever! ❤️");
});

// --------- Confetti ----------
function burstConfetti() {
  const symbols = ["♥", "❤", "✦", "✧", "🎉", "✨"];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("span");
    piece.className = "floating-heart";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = (10 + Math.random() * 80) + "%";
    piece.style.bottom = (10 + Math.random() * 25) + "%";
    piece.style.fontSize = (12 + Math.random() * 24) + "px";
    piece.style.animationDuration = (2 + Math.random() * 2.5) + "s";
    hearts.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}
