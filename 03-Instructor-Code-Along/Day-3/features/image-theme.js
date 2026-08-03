/* =========================================================
   FEATURE: CUSTOM CARD IMAGE (instructor answer key)
   ========================================================= */

document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;

  if (goal.image) {
    card.style.backgroundImage = `url(${goal.image})`;
    card.classList.add("has-image");
  }
});
