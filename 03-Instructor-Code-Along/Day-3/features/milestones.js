/* =========================================================
   FEATURE: MILESTONE CELEBRATIONS (instructor answer key)
   ========================================================= */

const milestoneMessages = {
  25: ["25% in, we don't quit", "quarter of the way - locked in."],
  50: ["halfway there, iconic behavior", "50%?? she's serious about this."],
  75: ["75%. the bag is basically secured.", "so close it's giving inevitable."],
  100: ["GOAL SECURED. go treat yourself", "bag: officially secured."]
};

document.addEventListener("secureTheBag:progressLogged", (e) => {
  const prevPct = e.detail.prevPct;
  const newPct = e.detail.newPct;

  [25, 50, 75, 100].forEach(milestone => {
    if (prevPct < milestone && newPct >= milestone) {
      const options = milestoneMessages[milestone];
      const pick = options[Math.floor(Math.random() * options.length)];
      showToast(pick);
    }
  });
});
