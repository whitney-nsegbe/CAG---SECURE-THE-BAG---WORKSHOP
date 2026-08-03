# Day 2: Core Logic

## What you're working with today
- `index.html` and `style.css` - **use your own Day 1 files if they're
  working.** The copies in this folder are a confirmed-working
  reference, only here as a backup if your Day 1 build has a problem
  you couldn't fix. If you use the backup, note that yours from
  yesterday is the one you actually built - keep it around too.
- `script.js` - partly written for you, with TODO sections we fill
  in together today

## A quick check before we start
Whatever HTML you're using today (yours or the backup), open your
browser's console and make sure there are no red errors, and confirm
these exact ids exist somewhere on your page: `addGoalForm`,
`goalName`, `goalTarget`, `goalType`, `goalIcon`, `goals`,
`emptyState`, `toast`. Today's JavaScript looks for these by name -
if one is missing or misspelled, ask your AI to help you
find the mismatch.

## Goal for today
By the end of today, you should be able to add a goal and log
progress toward it, and see the jar and progress bar actually fill
up on screen.

## What the 5 TODOs teach you
1. **TODO 1** - doing math with variables (working out a percentage)
2. **TODO 2** - reading what someone typed into a box, and reacting
   to a button click
3. **TODO 3** - reading multiple form fields at once
4. **TODO 4** - building an object (a way of grouping related data
   together, like name + target + type all in one thing)
5. **TODO 5** - adding something to a list, saving it, and
   redrawing the screen

## Ask your AI if you get stuck on:
- "What does parseFloat do?"
- "Why do I need to call render() again after changing something?"
- "What's the difference between .value and .textContent?"

## By the end of today you should have:
- A working "add goal" button
- A working "log it" button that fills up the jar and progress bar
- Goals that are still there if you refresh the page