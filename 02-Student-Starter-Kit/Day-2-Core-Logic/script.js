/* =========================================================
   SECURE THE BAG - SCRIPT (Day 2 starter)

   Yesterday we built the LOOK of the app. Today we build the
   BRAIN of the app, the part that actually does things when
   you click buttons.

   Look for these two kinds of banners as you scroll:

   ### IGNORE THIS PART ###
   boilerplate / plumbing code. We'll walk through what it does
   together, but you are not writing or editing it. Read it if
   you're curious, but don't stress about typing it yourself.

   ### YOUR TURN - WRITE CODE HERE ###
   this is where you actually write JavaScript. Everything in
   this file that matters for YOU to type lives inside one of
   these sections.
   ========================================================= */


/* ###########################################################
   IGNORE THIS PART
   Saving and loading goals so they don't disappear on refresh.
   We'll explain what localStorage is in class.
   ########################################################### */

const STORAGE_KEY = "secureTheBagGoals";

let memoryFallback = "[]";
let storageWorks = true;
try {
  localStorage.setItem("__test__", "1");
  localStorage.removeItem("__test__");
} catch (e) {
  storageWorks = false;
}

function loadGoals() {
  try {
    if (storageWorks) return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    // fall through
  }
  return JSON.parse(memoryFallback);
}

// "goals" is our main list. Every goal the user creates lives
// inside this array (list). This is the most important variable
// in the whole app - everything reads from and writes to this.
let goals = loadGoals();

function save() {
  const data = JSON.stringify(goals);
  try {
    if (storageWorks) {
      localStorage.setItem(STORAGE_KEY, data);
      return;
    }
  } catch (e) {
    // fall through
  }
  memoryFallback = data;
}

/* ########################################################### */


/* ============================================================
   RENDERING (drawing the goal cards on the screen)
   Every time something changes (a goal is added, progress is
   logged, etc), we call render() again to redraw everything so
   the screen matches the current data. This pattern - change
   the data, then redraw everything - is used in almost every
   real app you have ever used.
   ============================================================ */

function render() {
  const container = document.getElementById("goals");
  const empty = document.getElementById("emptyState");

  // clear out whatever was drawn before, so we can redraw fresh
  container.innerHTML = "";

  // show the "no goals yet" message only when the list is empty
  empty.style.display = goals.length ? "none" : "block";

  // loop through every goal and build a card for it
  goals.forEach(goal => {

    /* -----------------------------------------------------
       YOUR TURN - WRITE CODE HERE (TODO 1)
       work out what percentage of the goal has been reached.
       hint: (goal.current / goal.target) * 100, then round it
       and make sure it never goes above 100
       ----------------------------------------------------- */
    const pct = 0; // <-- replace this with your calculation
    /* ----------------------------------------------------- */

    const card = document.createElement("div");
    card.className = "card";

    /* ###########################################################
       IGNORE THIS PART
       This positions the liquid inside the jar SVG shape based
       on the percentage above. The math itself isn't the lesson
       here - just know: bigger pct = liquid rises higher.
       ########################################################### */
    const liquidH = (pct / 100) * 56;
    const liquidY = 78 - liquidH;

    // this builds all the HTML for one goal card, using the
    // goal's data to fill in the blanks
    card.innerHTML = `
      <div class="card-top">
        <div>
          <h3>${goal.name}</h3>
          <div class="tag">${goal.type === "monetary" ? "monetary goal" : "general goal"}</div>
        </div>
      </div>

      <div class="jar-row">
        <svg class="jar" viewBox="0 0 64 84">
          <clipPath id="clip-${goal.id}">
            <path d="M10 18 h44 v54 a6 6 0 0 1 -6 6 h-32 a6 6 0 0 1 -6 -6 z"/>
          </clipPath>
          <path class="jar-outline" d="M10 18 h44 v54 a6 6 0 0 1 -6 6 h-32 a6 6 0 0 1 -6 -6 z"/>
          <rect class="jar-outline" x="20" y="8" width="24" height="10" rx="3"/>
          <rect class="jar-liquid" clip-path="url(#clip-${goal.id})"
                x="8" y="${liquidY}" width="48" height="${liquidH + 10}" fill="url(#grad-${goal.id})"/>
          <defs>
            <linearGradient id="grad-${goal.id}" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-color="#ff4fa3"/>
              <stop offset="100%" stop-color="#d4ff4f"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="amounts">
          <div class="current mono">${goal.type === "monetary" ? "$" + goal.current.toFixed(2) : goal.current}</div>
          <div class="target mono">of ${goal.type === "monetary" ? "$" + goal.target : goal.target} - ${pct}%</div>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        </div>
      </div>

      <div class="log-row">
        <input type="number" placeholder="${goal.type === "monetary" ? "amount earned" : "progress to add"}" data-role="log-input" min="0" step="any">
        <button class="btn small" data-action="log">log it</button>
      </div>
    `;
    /* ########################################################### */

    /* -----------------------------------------------------
       YOUR TURN - WRITE CODE HERE (TODO 2)
       make the "log it" button actually work.
       Steps:
         a. find the button using: card.querySelector('[data-action="log"]')
         b. give it an .onclick function
         c. inside that function:
            - find the input using: card.querySelector('[data-role="log-input"]')
            - read its value and turn it into a number with parseFloat()
            - if the number is missing or 0 or less, do nothing (return)
            - add that number to goal.current
            - call save()
            - call render() so the screen updates
       ----------------------------------------------------- */



    /* ----------------------------------------------------- */

    container.appendChild(card);
  });
}


/* ============================================================
   ADDING A NEW GOAL
   This runs whenever the "add goal" form is submitted.
   ============================================================ */

document.getElementById("addGoalForm").addEventListener("submit", (e) => {
  e.preventDefault(); // stops the page from refreshing

  /* -----------------------------------------------------
     YOUR TURN - WRITE CODE HERE (TODO 3)
     read the values out of the form fields.
     hint: document.getElementById("goalName").value.trim()
     you need: name, target (as a number - use parseFloat), and type
     ----------------------------------------------------- */


  /* -----------------------------------------------------
     YOUR TURN - WRITE CODE HERE (TODO 4)
     build a new goal object using the values above, like this:
     const newGoal = {
       id: Date.now().toString(),
       name: name,
       target: target,
       type: type,
       current: 0
     };
     ----------------------------------------------------- */


  /* -----------------------------------------------------
     YOUR TURN - WRITE CODE HERE (TODO 5)
     add the new goal to the goals array, save it, redraw the
     screen, and reset the form.
     hint: goals.push(newGoal); save(); render(); e.target.reset();
     ----------------------------------------------------- */


});


/* ###########################################################
   IGNORE THIS PART
   This draws whatever goals were already saved, the moment the
   page loads.
   ########################################################### */
render();