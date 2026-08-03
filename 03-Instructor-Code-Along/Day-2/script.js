/* =========================================================
   SECURE THE BAG - SCRIPT (Day 2 answer key / instructor copy)

   This is the completed version of what the class builds
   together during Day 2. Use this as your reference while
   live-coding - it should match what the students end up with
   before Day 3's features get added on top.
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
   PART 2: RENDERING (drawing the goal cards on the screen)
   ============================================================ */

function render() {
  const container = document.getElementById("goals");
  const empty = document.getElementById("emptyState");
  container.innerHTML = "";
  empty.style.display = goals.length ? "none" : "block";

  goals.forEach(goal => {
    // ANSWER to TODO 1
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

    const card = document.createElement("div");
    card.className = "card";

    const liquidH = (pct / 100) * 56;
    const liquidY = 78 - liquidH;

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

    // ANSWER to TODO 2
    card.querySelector('[data-action="log"]').onclick = () => {
      const input = card.querySelector('[data-role="log-input"]');
      const val = parseFloat(input.value);
      if (!val || val <= 0) return;

      goal.current += val;
      save();
      render();
    };

    container.appendChild(card);
  });
}


/* ============================================================
   PART 3: ADDING A NEW GOAL
   ============================================================ */

document.getElementById("addGoalForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // ANSWER to TODO 3
  const name = document.getElementById("goalName").value.trim();
  const target = parseFloat(document.getElementById("goalTarget").value);
  const type = document.getElementById("goalType").value;

  // ANSWER to TODO 4
  const newGoal = {
    id: Date.now().toString(),
    name: name,
    target: target,
    type: type,
    current: 0
  };

  // ANSWER to TODO 5
  goals.push(newGoal);
  save();
  render();
  e.target.reset();
});


/* ============================================================
   START THE APP
   ============================================================ */
render();
