/* =========================================================
   FEATURE: "HOW MANY SHIFTS LEFT?" CALCULATOR

   Goal: on money goals only, let the user type how much they
   earn per shift, and tell them how many more shifts they need
   to reach their goal.

   You only need to edit THIS file. You do not need to touch
   core.js or anyone else's feature file.
   ========================================================= */

/* ###########################################################
   IGNORE THIS PART
   This sets up the listener and grabs the two things you'll
   need: the card being drawn, and the empty feature slot to
   build into. It also skips this feature entirely for general
   (non-money) goals.
   ########################################################### */
document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;

  if (goal.type !== "monetary") return;

  const featureSlot = card.querySelector('[data-slot="feature"]');
  /* ########################################################### */

  /* -----------------------------------------------------------
     YOUR TURN - WRITE CODE HERE (TODO 1, 2, 3)
     ----------------------------------------------------------- */
  // TODO 1: build the HTML for this feature and add it into
  // featureSlot. You'll want:
  //   - a button to show/hide the calculator (class="btn ghost small")
  //   - a number input for "$ per shift"
  //   - an empty element to show the result text in
  //
  // Example starting point (feel free to restyle it):
  //
  // featureSlot.insertAdjacentHTML("beforeend", `
  //   <div class="extras">
  //     <button class="btn ghost small" data-action="toggle-shifts">
  //       <i class="fa-solid fa-briefcase"></i> how many shifts left?
  //     </button>
  //     <div class="extra-panel" data-panel="shifts">
  //       <div class="row">
  //         <input type="number" placeholder="$ per shift" data-role="shift-rate" min="0" step="any">
  //       </div>
  //       <div class="extra-result" data-role="shift-result"></div>
  //     </div>
  //   </div>
  // `);

  // TODO 2: find the toggle button and make it show/hide the
  // panel by toggling the "open" class on the panel element.
  // hint: card.querySelector('[data-action="toggle-shifts"]').onclick = () => { ... };

  // TODO 3: find the rate input and calculate the answer every
  // time it changes (use the "oninput" event, not "onclick" -
  // oninput fires as someone types).
  //
  // The math you need:
  //   remaining = goal.target - goal.current
  //   shifts needed = Math.ceil(remaining / rate)
  //
  // Watch out for: what should happen if rate is 0, empty, or
  // the goal is already finished? Decide what message to show.
  /* ----------------------------------------------------------- */

});