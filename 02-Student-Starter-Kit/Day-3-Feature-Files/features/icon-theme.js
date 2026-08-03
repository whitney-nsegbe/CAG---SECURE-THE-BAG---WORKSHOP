/* =========================================================
   FEATURE: GOAL ICON

   Goal: every goal card gets a small round icon badge, like a
   profile picture, based on the icon the user picked when
   creating the goal.

   core.js does not know icons exist at all - that's entirely
   your job in this file, from reading the dropdown to drawing
   the badge.

   You only need to edit THIS file. You do not need to touch
   core.js or anyone else's feature file.
   ========================================================= */


/* -----------------------------------------------------------
   STEP 1: read the icon the user picked, and store it on the
   new goal.

   core.js fires a "goalCreated" event right before a new goal
   is saved. Listen for it here.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:goalCreated", (e) => {
   const goal = e.detail.goal;

   // TODO 1: read the value of the #goalIcon dropdown, and store
   // it on the goal object.
   // hint: document.getElementById("goalIcon").value
   // hint: goal.icon = ... ;
   //
   // what should happen if the value is somehow empty? think
   // about a sensible default (fa-star is a safe fallback).

});


/* -----------------------------------------------------------
   STEP 2: draw the icon badge on the card.

   core.js fires a "cardRendered" event every time a card is
   drawn, and gives you the card element itself plus the goal
   it belongs to. Find the empty icon slot inside the card and
   fill it in.
   ----------------------------------------------------------- */
document.addEventListener("secureTheBag:cardRendered", (e) => {
   const card = e.detail.card;
   const goal = e.detail.goal;

   const iconSlot = card.querySelector('[data-slot="icon"]');

   // TODO 2: set iconSlot's HTML to a round badge showing the
   // goal's icon, using the existing .card-icon class from
   // style.css. For example:
   //
   // iconSlot.innerHTML = `<div class="card-icon"><i class="fa-solid ${goal.icon || "fa-star"}"></i></div>`;

});