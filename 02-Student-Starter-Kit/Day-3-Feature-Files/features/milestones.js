/* =========================================================
   FEATURE: MILESTONE CELEBRATIONS

   Goal: show a pop-up message when someone crosses 25%, 50%,
   75%, or 100% of their goal.

   You only need to edit THIS file. You do not need to touch
   core.js or anyone else's feature file.

   core.js already gives you a function called showToast(msg)
   that displays the pop-up for you - you just need to decide
   WHEN to call it and WHAT message to show.
   ========================================================= */


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 1)
   write your celebration messages.

   Feel free to change these to whatever you want - the
   funnier and more "you", the better.
   ----------------------------------------------------------- */
const milestoneMessages = {
  25: [
    // TODO 1: write 1-2 messages for hitting 25%
  ],
  50: [
    // TODO 1: write 1-2 messages for hitting 50%
  ],
  75: [
    // TODO 1: write 1-2 messages for hitting 75%
  ],
  100: [
    // TODO 1: write 1-2 messages for hitting 100%
  ]
};


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 2)
   detect when a milestone was just crossed.

   core.js fires a "progressLogged" event every time someone
   clicks "log it", and gives you the percentage BEFORE
   (prevPct) and AFTER (newPct) that log.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:progressLogged", (e) => {
  const prevPct = e.detail.prevPct;
  const newPct = e.detail.newPct;

  // TODO 2: for each milestone number (25, 50, 75, 100), check
  // if prevPct was BELOW it and newPct is AT OR ABOVE it. If so,
  // that milestone was just crossed - pick one of its messages
  // at random and call showToast() with it.
  //
  // hint: [25, 50, 75, 100].forEach(milestone => { ... });
  // hint: pick a random item from an array with:
  //   const options = milestoneMessages[milestone];
  //   const pick = options[Math.floor(Math.random() * options.length)];

});