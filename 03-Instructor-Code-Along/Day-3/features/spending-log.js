/* =========================================================
   FEATURE: SPENDING LOG (instructor answer key)
   ========================================================= */

document.addEventListener("secureTheBag:goalCreated", (e) => {
  const goal = e.detail.goal;
  goal.spendLog = [];
});

document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;

  if (goal.type !== "monetary") return;

  const featureSlot = card.querySelector('[data-slot="feature"]');
  const spendLog = goal.spendLog || [];
  const total = spendLog.reduce((sum, s) => sum + s.amount, 0);

  featureSlot.insertAdjacentHTML("beforeend", `
    <div class="spend-section">
      <h4><i class="fa-solid fa-receipt"></i> what you're skipping to get here</h4>
      <div class="spend-total">saved so far: $${total.toFixed(2)} across ${spendLog.length} skip${spendLog.length === 1 ? "" : "s"}</div>
      <div class="row">
        <input type="text" placeholder="skipped item (e.g. iced coffee)" data-role="spend-item">
        <input type="number" placeholder="$ saved" data-role="spend-amount" min="0" step="any" style="max-width:90px;">
      </div>
      <button class="btn ghost small" data-action="add-spend"><i class="fa-solid fa-plus"></i> add to log</button>
      ${spendLog.length ? `
        <ul class="spend-log-list">
          ${spendLog.map(s => `<li><span class="item">skipped ${s.item}</span><span class="amt">+$${s.amount.toFixed(2)}</span></li>`).join("")}
        </ul>` : `<div class="spend-log-empty">nothing logged yet - add the first thing you skipped</div>`}
    </div>
  `);

  card.querySelector('[data-action="add-spend"]').onclick = () => {
    const itemEl = card.querySelector('[data-role="spend-item"]');
    const amtEl = card.querySelector('[data-role="spend-amount"]');
    const amt = parseFloat(amtEl.value);
    if (!itemEl.value || !amt || amt <= 0) return;

    goal.spendLog = goal.spendLog || [];
    goal.spendLog.push({ item: itemEl.value, amount: amt });
    goal.current += amt;
    save();
    render();
  };
});
