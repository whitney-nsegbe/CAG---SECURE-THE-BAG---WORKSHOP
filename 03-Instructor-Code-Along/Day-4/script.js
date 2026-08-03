/* =========================================================
   SECURE THE BAG - SCRIPT
   This file controls what the app DOES.
   style.css controls what it looks like - this file controls
   what happens when you click things, type things, etc.
   ========================================================= */


/* ============================================================
   PART 1: SAVING AND LOADING GOALS
   This app needs to remember your goals even after you close
   the browser. We use something called "localStorage" for that -
   it is like a tiny notebook the browser keeps for this page.
   ============================================================ */

const STORAGE_KEY = "secureTheBagGoals";

/* Sometimes localStorage is blocked (for example, inside a
   preview window). This code checks if it works, and if not,
   falls back to just remembering things in memory for now
   instead of crashing the whole app. */
let memoryFallback = "[]";
let storageWorks = true;
try {
  localStorage.setItem("__test__", "1");
  localStorage.removeItem("__test__");
} catch (e) {
  storageWorks = false;
}

// Reads the saved goals from storage. If nothing is saved yet,
// it returns an empty list.
function loadGoals() {
  try {
    if (storageWorks) return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    // if something goes wrong reading storage, just fall through below
  }
  return JSON.parse(memoryFallback);
}

// "goals" is our main list. Every goal the user creates lives
// inside this array (list).
let goals = loadGoals();

// Saves the current goals list to storage so it is still there
// next time the page is opened.
function save() {
  const data = JSON.stringify(goals);
  try {
    if (storageWorks) {
      localStorage.setItem(STORAGE_KEY, data);
      return;
    }
  } catch (e) {
    // if saving fails, fall through and just keep it in memory
  }
  memoryFallback = data;
}


/* ============================================================
   PART 2: CELEBRATION MESSAGES
   These are the messages that pop up when someone hits 25%,
   50%, 75%, or 100% of their goal.
   ============================================================ */

const milestoneMessages = {
  25: ["25% in, we don't quit", "quarter of the way - locked in."],
  50: ["halfway there, iconic behavior", "50%?? she's serious about this."],
  75: ["75%. the bag is basically secured.", "so close it's giving inevitable."],
  100: ["GOAL SECURED. go treat yourself", "bag: officially secured."]
};

// Shows the pop-up message at the bottom of the screen for a
// couple of seconds, then hides it again.
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  // if a toast was already showing, cancel its hide-timer first
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}


/* ============================================================
   PART 3: STREAK LOGIC
   A "streak" counts how many days in a row someone has logged
   progress. If they skip a day, it resets back to 1.
   ============================================================ */

// Gives today's date as a simple text string, like "2026-07-21"
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// Same thing, but for yesterday's date
function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Updates a goal's streak count based on when it was last logged
function updateStreak(goal) {
  if (goal.lastLogDate === todayStr()) return; // already logged today, do nothing

  if (goal.lastLogDate === yesterdayStr()) {
    goal.streak += 1; // logged yesterday too - streak continues
  } else {
    goal.streak = 1; // more than a day was skipped - streak restarts
  }
  goal.lastLogDate = todayStr();
}


/* ============================================================
   PART 4: RENDERING (drawing the goal cards on the screen)
   Every time something changes (a goal is added, progress is
   logged, etc), we call render() again to redraw everything so
   the screen matches the current data.
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
    // work out what percentage of the goal has been reached
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

    const card = document.createElement("div");
    card.className = "card";
    if (goal.image) {
      card.style.backgroundImage = `url(${goal.image})`;
      card.classList.add("has-image");
    }

    // these numbers position the liquid inside the jar SVG shape
    // based on the percentage - do not worry about the exact math,
    // just know: bigger pct = liquid rises higher in the jar
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
        <div class="card-top-right">
          <span class="streak"><i class="fa-solid fa-fire"></i> ${goal.streak || 0}d streak</span>
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

      ${goal.type === "monetary" ? `
      <div class="extras">
        <button class="btn ghost small" data-action="toggle-shifts"><i class="fa-solid fa-briefcase"></i> how many shifts left?</button>
        <div class="extra-panel" data-panel="shifts">
          <div class="row">
            <input type="number" placeholder="$ per shift" data-role="shift-rate" min="0" step="any">
          </div>
          <div class="extra-result" data-role="shift-result"></div>
        </div>
      </div>

      <div class="spend-section">
        <h4><i class="fa-solid fa-receipt"></i> what you're skipping to get here</h4>
        <div class="spend-total">saved so far: $${((goal.spendLog || []).reduce((sum, s) => sum + s.amount, 0)).toFixed(2)} across ${(goal.spendLog || []).length} skip${(goal.spendLog || []).length === 1 ? "" : "s"}</div>
        <div class="row">
          <input type="text" placeholder="skipped item (e.g. iced coffee)" data-role="spend-item">
          <input type="number" placeholder="$ saved" data-role="spend-amount" min="0" step="any" style="max-width:90px;">
        </div>
        <button class="btn ghost small" data-action="add-spend"><i class="fa-solid fa-plus"></i> add to log</button>
        ${(goal.spendLog && goal.spendLog.length) ? `
          <ul class="spend-log-list">
            ${goal.spendLog.map(s => `<li><span class="item">skipped ${s.item}</span><span class="amt">+$${s.amount.toFixed(2)}</span></li>`).join("")}
          </ul>` : `<div class="spend-log-empty">nothing logged yet - add the first thing you skipped</div>`}
      </div>` : ""}
    `;

    /* -------- wire up the buttons inside THIS card -------- */

    // delete button - removes this goal from the list
    card.querySelector('[data-action="delete"]').onclick = () => {
      goals = goals.filter(g => g.id !== goal.id);
      save();
      render();
    };

    // "log it" button - adds progress to this goal
    card.querySelector('[data-action="log"]').onclick = () => {
      const input = card.querySelector('[data-role="log-input"]');
      const val = parseFloat(input.value);
      if (!val || val <= 0) return; // ignore empty or invalid amounts

      // remember the percentage BEFORE we add the new amount,
      // so we can tell if we just crossed a milestone
      const prevPct = Math.min(100, Math.round((goal.current / goal.target) * 100));

      goal.current += val;
      updateStreak(goal);
      save();

      const newPct = Math.min(100, Math.round((goal.current / goal.target) * 100));

      // check each milestone - if we were below it before and
      // are at or above it now, show a celebration
      [25, 50, 75, 100].forEach(milestone => {
        if (prevPct < milestone && newPct >= milestone) {
          const options = milestoneMessages[milestone];
          const randomMessage = options[Math.floor(Math.random() * options.length)];
          showToast(randomMessage);
        }
      });

      render();
    };

    // extra features only exist on monetary goals
    if (goal.type === "monetary") {
      const shiftsPanel = card.querySelector('[data-panel="shifts"]');

      // shows/hides the shifts calculator panel
      card.querySelector('[data-action="toggle-shifts"]').onclick = () => {
        shiftsPanel.classList.toggle("open");
      };

      // recalculates "how many shifts left" every time the rate changes
      card.querySelector('[data-role="shift-rate"]').oninput = (e) => {
        const rate = parseFloat(e.target.value);
        const resultEl = card.querySelector('[data-role="shift-result"]');
        const remaining = goal.target - goal.current;

        if (!rate || rate <= 0 || remaining <= 0) {
          resultEl.textContent = remaining <= 0 ? "goal already secured" : "";
          return;
        }

        const shifts = Math.ceil(remaining / rate);
        resultEl.textContent = `${shifts} more shift${shifts === 1 ? "" : "s"} at $${rate} to hit your goal`;
      };

      // adds a new entry to the "what you're skipping" list
      card.querySelector('[data-action="add-spend"]').onclick = () => {
        const itemEl = card.querySelector('[data-role="spend-item"]');
        const amtEl = card.querySelector('[data-role="spend-amount"]');
        const amt = parseFloat(amtEl.value);
        if (!itemEl.value || !amt || amt <= 0) return;

        goal.spendLog = goal.spendLog || [];
        goal.spendLog.push({ item: itemEl.value, amount: amt });
        goal.current += amt; // skipped spending also counts toward the goal
        updateStreak(goal);
        save();
        render();
      };
    }

    container.appendChild(card);
  });
}


/* ============================================================
   PART 5: ADDING A NEW GOAL
   This runs whenever the "add goal" form is submitted.
   ============================================================ */

document.getElementById("addGoalForm").addEventListener("submit", (e) => {
  e.preventDefault(); // stops the page from refreshing

  const name = document.getElementById("goalName").value.trim();
  const target = parseFloat(document.getElementById("goalTarget").value);
  const type = document.getElementById("goalType").value;
  const fileInput = document.getElementById("goalImage");

  const newGoal = {
    id: Date.now().toString(), // a unique ID based on the current time
    name: name,
    target: target,
    type: type,
    current: 0,
    streak: 0,
    lastLogDate: null,
    image: null,
    spendLog: []
  };

  // this actually adds the goal to our list, saves it, and redraws
  const finish = () => {
    goals.push(newGoal);
    save();
    render();
    e.target.reset(); // clears the form
  };

  // if the user picked an image, we need to convert it to a
  // special text format before we can save/display it
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
   This draws whatever goals were already saved, the moment the
   page loads.
   ============================================================ */
render();
