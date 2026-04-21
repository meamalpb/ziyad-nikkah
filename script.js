const weddingDate = new Date("2026-05-11T10:00:00+05:30");

const parts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const inviteCard = document.getElementById("inviteCard");
const cardBack = inviteCard.querySelector(".card-back");
const audio = document.getElementById("nasheed");
const touchPrompt = document.getElementById("touchPrompt");
const frontFace = inviteCard.querySelector(".card-front");
let hasOpened = false;
let audioStarted = false;

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const distance = weddingDate - now;

  if (distance <= 0) {
    parts.days.textContent = "00";
    parts.hours.textContent = "00";
    parts.minutes.textContent = "00";
    parts.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  parts.days.textContent = pad(days);
  parts.hours.textContent = pad(hours);
  parts.minutes.textContent = pad(minutes);
  parts.seconds.textContent = pad(seconds);
}

async function tryPlayAudio() {
  if (audioStarted) {
    return;
  }

  try {
    await audio.play();
    audioStarted = true;
  } catch (_error) {}
}

function openInvitation() {
  if (hasOpened) {
    return;
  }

  hasOpened = true;
  inviteCard.classList.add("is-open");
  tryPlayAudio();
}

cardBack.addEventListener("animationend", (event) => {
  if (event.animationName !== "backFlip") {
    return;
  }
  tryPlayAudio();
});

touchPrompt.addEventListener("click", openInvitation);
frontFace.addEventListener("click", openInvitation);

updateCountdown();
setInterval(updateCountdown, 1000);
