const inviteCard = document.getElementById("inviteCard");
const audio = document.getElementById("nasheed");
const muteToggle = document.getElementById("muteToggle");
const cardActions = document.querySelectorAll(".card-action");
let audioStarted = false;


function syncCardState() {
  const isOpen = inviteCard.classList.contains("is-open");
  inviteCard.setAttribute("aria-expanded", String(isOpen));
  inviteCard.setAttribute(
    "aria-label",
    isOpen ? "Close invitation details" : "Open invitation details"
  );
}

async function playAudio() {
  if (audioStarted || !audio) {
    return;
  }

  try {
    await audio.play();
    audioStarted = true;
  } catch (_error) {}
}

function syncMuteButton() {
  if (!audio || !muteToggle) {
    return;
  }

  const isMuted = audio.muted;
  muteToggle.classList.toggle("is-muted", isMuted);
  muteToggle.setAttribute("aria-pressed", String(isMuted));
  muteToggle.setAttribute("aria-label", isMuted ? "Unmute audio" : "Mute audio");
}

function toggleCard() {
  inviteCard.classList.toggle("is-open");
  syncCardState();
  playAudio();
}

function toggleMute(event) {
  event.stopPropagation();

  if (!audio) {
    return;
  }

  audio.muted = !audio.muted;
  syncMuteButton();
}

inviteCard.addEventListener("click", toggleCard);
inviteCard.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  toggleCard();
});

if (muteToggle) {
  muteToggle.addEventListener("click", toggleMute);
}

cardActions.forEach((action) => {
  action.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  action.addEventListener("keydown", (event) => {
    event.stopPropagation();
  });
});

requestAnimationFrame(() => {
  inviteCard.classList.add("is-intro");
});

syncCardState();
syncMuteButton();
