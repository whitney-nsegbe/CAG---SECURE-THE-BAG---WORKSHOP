/* =========================================================
   FEATURE: STREAK COUNTER (instructor answer key)
   ========================================================= */

document.addEventListener("secureTheBag:goalCreated", (e) => {
  const goal = e.detail.goal;
  goal.streak = 0;
  goal.lastLogDate = null;
});

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function updateStreak(goal) {
  if (goal.lastLogDate === todayStr()) return;
  if (goal.lastLogDate === yesterdayStr()) {
    goal.streak += 1;
  } else {
    goal.streak = 1;
  }
  goal.lastLogDate = todayStr();
}

document.addEventListener("secureTheBag:progressLogged", (e) => {
  const goal = e.detail.goal;
  updateStreak(goal);
  save();
});

document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;
  const badgeSlot = card.querySelector('[data-slot="badge"]');
  badgeSlot.innerHTML = `<span class="streak"><i class="fa-solid fa-fire"></i> ${goal.streak || 0}d streak</span>`;
});
