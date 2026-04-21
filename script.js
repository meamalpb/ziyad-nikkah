const weddingDate = new Date("2026-05-11T10:00:00+05:30");

const parts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const inviteCard = document.getElementById("inviteCard");
const audio = document.getElementById("nasheed");
const audioControl = document.getElementById("audioControl");

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
  try {
    audio.currentTime = 0;
    await audio.play();
    audioControl.hidden = true;
  } catch (_error) {
    audioControl.hidden = false;
  }
}

inviteCard.addEventListener("animationend", () => {
  tryPlayAudio();
});

audioControl.addEventListener("click", async () => {
  await tryPlayAudio();
});

updateCountdown();
setInterval(updateCountdown, 1000);
