/* =========================================================
   SECURE THE BAG - CORE SCRIPT (Day 3)

   This file is DONE. You do not need to edit it today - it
   has everything your group needs to build your feature on
   top of it.

   Read the comments below though! They explain the three
   ways your feature file can plug into this one WITHOUT
   editing this file:

   1. Shared variables and functions - because all our <script>
      files are loaded on the same page, they all share the
      same "global" JavaScript world. That means your feature
      file can use things like `goals`, `save()`, `render()`,
      and `showToast()` directly, just by typing their name.

   2. The "goalCreated" event - fires the moment a new goal is
      made, before it is saved. Listen for this if your feature
      needs to add its OWN data to a new goal (for example,
      streaks.js adds goal.streak = 0 here).

   3. The "cardRendered" event - fires every time a goal's card
      is drawn on screen. Listen for this if your feature needs
      to ADD something visible to a card (for example, a badge,
      a button, or a whole extra section).

   Look at any file inside the /features folder to see these
   patterns actually being used.
   ========================================================= */


/* ============================================================
   PART 1: SAVING AND LOADING GOALS
   ============================================================ */

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

// This is the main list every goal lives in. It is a normal
// JavaScript variable, which means any other script file loaded
// on this page (like your feature file) can read and change it.
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


/* ============================================================
   PART 2: SHARED POP-UP MESSAGE HELPER
   Any feature file can call showToast("your message") to show
   a celebration message at the bottom of the screen.
   ============================================================ */

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}


/* ============================================================
   PART 3: RENDERING (drawing the goal cards on the screen)
   ============================================================ */

function render() {
  const container = document.getElementById("goals");
  const empty = document.getElementById("emptyState");
  container.innerHTML = "";
  empty.style.display = goals.length ? "none" : "block";

  goals.forEach(goal => {
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

    const card = document.createElement("div");
    card.className = "card";

    const liquidH = (pct / 100) * 56;
    const liquidY = 78 - liquidH;

    // Notice the two empty <div> "slots" below: badge-slot and
    // feature-slot. Those are on purpose! They start out empty,
    // and feature files fill them in when they hear the
    // "cardRendered" event (see PART 4 below).
    card.innerHTML = `
      <div class="card-top">
        <div>
          <h3>${goal.name}</h3>
          <div class="tag">${goal.type === "monetary" ? "monetary goal" : "general goal"}</div>
        </div>
        <div class="card-top-right">
          <span class="badge-slot" data-slot="badge"></span>
          <button class="delete-x" data-action="delete" title="delete goal"><i class="fa-solid fa-trash-can"></i></button>
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

      <div data-slot="feature"></div>
    `;

    card.querySelector('[data-action="delete"]').onclick = () => {
      goals = goals.filter(g => g.id !== goal.id);
      save();
      render();
    };

    card.querySelector('[data-action="log"]').onclick = () => {
      const input = card.querySelector('[data-role="log-input"]');
      const val = parseFloat(input.value);
      if (!val || val <= 0) return;

      const prevPct = Math.min(100, Math.round((goal.current / goal.target) * 100));
      goal.current += val;
      save();
      const newPct = Math.min(100, Math.round((goal.current / goal.target) * 100));

      // This event tells any listening feature file that
      // progress was just logged, and what the percentage was
      // before and after. milestones.js and streaks.js listen
      // for this.
      document.dispatchEvent(new CustomEvent("secureTheBag:progressLogged", {
        detail: { goal, prevPct, newPct }
      }));

      render();
    };

    container.appendChild(card);

    // This event tells any listening feature file that a card
    // was just drawn, and hands over the card element itself so
    // the feature can add its own content into it.
    document.dispatchEvent(new CustomEvent("secureTheBag:cardRendered", {
      detail: { card, goal }
    }));
  });
}


/* ============================================================
   PART 4: ADDING A NEW GOAL
   ============================================================ */

document.getElementById("addGoalForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("goalName").value.trim();
  const target = parseFloat(document.getElementById("goalTarget").value);
  const type = document.getElementById("goalType").value;
  const fileInput = document.getElementById("goalImage");

  const newGoal = {
    id: Date.now().toString(),
    name: name,
    target: target,
    type: type,
    current: 0
  };

  const finish = () => {
    // This event fires right before the goal is saved. Feature
    // files that need to add their OWN starting data to every
    // new goal (like streaks.js adding goal.streak = 0) listen
    // for this event and add it here.
    document.dispatchEvent(new CustomEvent("secureTheBag:goalCreated", {
      detail: { goal: newGoal }
    }));

    goals.push(newGoal);
    save();
    render();
    e.target.reset();
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      newGoal.image = event.target.result;
      finish();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    finish();
  }
});


/* ============================================================
   START THE APP
   ============================================================ */
render();
