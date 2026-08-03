/* =========================================================
   FEATURE: "HOW MANY SHIFTS LEFT?" CALCULATOR (instructor answer key)
   ========================================================= */

document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;

  if (goal.type !== "monetary") return;

  const featureSlot = card.querySelector('[data-slot="feature"]');

  featureSlot.insertAdjacentHTML("beforeend", `
    <div class="extras">
      <button class="btn ghost small" data-action="toggle-shifts">
        <i class="fa-solid fa-briefcase"></i> how many shifts left?
      </button>
      <div class="extra-panel" data-panel="shifts">
        <div class="row">
          <input type="number" placeholder="$ per shift" data-role="shift-rate" min="0" step="any">
        </div>
        <div class="extra-result" data-role="shift-result"></div>
      </div>
    </div>
  `);

  const panel = card.querySelector('[data-panel="shifts"]');
  card.querySelector('[data-action="toggle-shifts"]').onclick = () => {
    panel.classList.toggle("open");
  };

  card.querySelector('[data-role="shift-rate"]').oninput = (ev) => {
    const rate = parseFloat(ev.target.value);
    const resultEl = card.querySelector('[data-role="shift-result"]');
    const remaining = goal.target - goal.current;

    if (!rate || rate <= 0 || remaining <= 0) {
      resultEl.textContent = remaining <= 0 ? "goal already secured" : "";
      return;
    }

    const shifts = Math.ceil(remaining / rate);
    resultEl.textContent = `${shifts} more shift${shifts === 1 ? "" : "s"} at $${rate} to hit your goal`;
  };
});
