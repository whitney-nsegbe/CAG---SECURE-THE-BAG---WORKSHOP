/* =========================================================
   FEATURE: STREAK COUNTER

   Goal: track how many days in a row someone has logged
   progress on a goal, and show it as a badge on the card
   (for example: "3d streak").

   You only need to edit THIS file. You do not need to touch
   core.js or anyone else's feature file.
   ========================================================= */


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 1)
   give every new goal a starting streak of 0.

   core.js fires a "goalCreated" event right before a new goal
   is saved. Listen for it here and add your own fields onto
   the goal object.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:goalCreated", (e) => {
  const goal = e.detail.goal;

  // TODO 1: set goal.streak to 0 and goal.lastLogDate to null
  // hint: goal.streak = 0;

});


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 2)
   write the streak-updating logic.

   This function should figure out whether the streak goes up
   by 1, resets to 1, or stays the same, based on when the goal
   was last logged.
   ----------------------------------------------------------- */

/* ###########################################################
   IGNORE THIS PART
   These two helpers just format today's and yesterday's date
   as text so they're easy to compare. You don't need to write
   or edit these.
   ########################################################### */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
/* ########################################################### */

/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 2)
   write the streak-updating logic.

   This function should figure out whether the streak goes up
   by 1, resets to 1, or stays the same, based on when the goal
   was last logged.
   ----------------------------------------------------------- */
function updateStreak(goal) {
  // TODO 2: fill in this logic
  // - if goal.lastLogDate is already today, do nothing (return)
  // - if goal.lastLogDate was yesterday, add 1 to goal.streak
  // - otherwise, set goal.streak back to 1
  // - either way, set goal.lastLogDate to today at the end

}
/* ----------------------------------------------------------- */


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 3)
   call updateStreak() whenever progress is logged.

   core.js fires a "progressLogged" event every time someone
   clicks "log it". Listen for it here.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:progressLogged", (e) => {
  const goal = e.detail.goal;

  // TODO 3: call updateStreak(goal) here, then call save()
  // so the updated streak does not disappear on refresh

});


/* -----------------------------------------------------------
   YOUR TURN - WRITE CODE HERE (STEP 4)
   show the streak badge on the card.

   core.js fires a "cardRendered" event every time a card is
   drawn, and gives you the card element itself plus the goal
   it belongs to. Find the empty badge slot inside the card and
   fill it in.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:cardRendered", (e) => {
  const card = e.detail.card;
  const goal = e.detail.goal;

  const badgeSlot = card.querySelector('[data-slot="badge"]');

  // TODO 4: set badgeSlot's HTML to show the streak, styled
  // using the existing .streak class from style.css. 

});