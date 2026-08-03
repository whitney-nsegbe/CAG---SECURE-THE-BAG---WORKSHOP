/* =========================================================
   FEATURE: SPENDING LOG ("what you're skipping to get here")

   Goal: on money goals only, let the user log small purchases
   they skipped (like a coffee) and see a running list plus a
   total of how much that has added up to. Each logged skip
   also counts toward the goal itself.

   You only need to edit THIS file. You do not need to touch
   core.js or anyone else's feature file.
   ========================================================= */


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 1)
   give every new money goal an empty spending list.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:goalCreated", (e) => {
   const goal = e.detail.goal;

   // TODO 1: set goal.spendLog to an empty array so we have
   // somewhere to push entries later
   // hint: goal.spendLog = [];

});


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 2)
   build the section and add it to the card.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:cardRendered", (e) => {
   const card = e.detail.card;
   const goal = e.detail.goal;

   if (goal.type !== "monetary") return;

   const featureSlot = card.querySelector('[data-slot="feature"]');
   const spendLog = goal.spendLog || [];
   const total = spendLog.reduce((sum, s) => sum + s.amount, 0);

   // TODO 2: build the HTML for this feature and add it into
   // featureSlot. You'll want:
   //   - a heading
   //   - a running total line (use the "total" variable above)
   //   - two inputs: one for the item name, one for the $ amount
   //   - a button to add the entry
   //   - a list showing each entry, or an "empty" message if
   //     spendLog.length is 0
   //
   // Example starting point (feel free to restyle it):
   ///&UNCOMMENT THIS CODE!!!///
   // featureSlot.insertAdjacentHTML("beforeend", `
   //   <div class="spend-section">
   //     <h4><i class="fa-solid fa-receipt"></i> what you're skipping to get here</h4>
   //     <div class="spend-total">saved so far: $${total.toFixed(2)} across ${spendLog.length} skip${spendLog.length === 1 ? "" : "s"}</div>
   //     <div class="row">
   //       <input type="text" placeholder="skipped item (e.g. iced coffee)" data-role="spend-item">
   //       <input type="number" placeholder="$ saved" data-role="spend-amount" min="0" step="any" style="max-width:90px;">
   //     </div>
   //     <button class="btn ghost small" data-action="add-spend"><i class="fa-solid fa-plus"></i> add to log</button>
   //     <ul class="spend-log-list">
   //       ${spendLog.map(s => `<li><span class="item">skipped ${s.item}</span><span class="amt">+$${s.amount.toFixed(2)}</span></li>`).join("")}
   //     </ul>
   //   </div>
   // `);

   // TODO 3: find the "add to log" button and make it work.
   // Steps:
   //   a. read the item input's value and the amount input's value
   //   b. if either is missing/invalid, do nothing
   //   c. push { item, amount } onto goal.spendLog
   //   d. add the amount onto goal.current too (skipping a
   //      purchase counts as progress!)
   //   e. call save() and render()

});