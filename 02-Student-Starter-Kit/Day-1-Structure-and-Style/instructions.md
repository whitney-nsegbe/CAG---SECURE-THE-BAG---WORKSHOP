# Day 1: Structure and Style

## What you're working with today
- `index.html` - just the head section is done (fonts, icons, title).
  The body is empty. You are building it.
- `style.css` - a few starting colors and a reset are done. Everything
  else is your job.
- `script.js` - empty for now, we start using this on Day 2

## Goal for today
By the end of today, you will have written your own HTML for a real
app page, and styled it yourself - not filled in blanks, actually
written it, using AI to help you figure out how.

## How today works
You are not copying code from us. You are describing what you want
to your AI, getting code back, understanding it, and putting it in
the file yourself. If you get stuck, that's normal - ask a different
way, or ask "why isn't this working?" and paste in what's happening.

## The checklist - what your page needs

Your HTML needs to contain these pieces. The exact wording, styling,
and how you write the tags is up to you - but these ids and classes
must match exactly, because tomorrow's JavaScript looks for them by
these exact names.

| # | What it is | Must have | Ask your AI |
|---|---|---|---|
| 1 | A header | an `<h1>` with the app name, a short subtitle | "how do I add a page title and subtitle in HTML?" |
| 2 | An instructions box | a `<details class="how-to">` with a `<summary>` and a list inside | "how does the HTML details/summary tag work?" |
| 3 | The add-goal form | a `<form id="addGoalForm">` | "how do I build a form in HTML?" |
| 4 | - a name field inside the form | a text `<input id="goalName">` with a label | "how do I connect a label to an input?" |
| 5 | - a target field inside the form | a number `<input id="goalTarget">` with a label | "what's the difference between input type=text and type=number?" |
| 6 | - a type dropdown inside the form | a `<select id="goalType">` with two `<option>`s: `monetary` and `general` | "how do I make a dropdown menu in HTML?" |
| 7 | - an image field inside the form | a file `<input id="goalImage" type="file" accept="image/*">` with a label | "how do file upload inputs work?" |
| 8 | - a submit button inside the form | a `<button type="submit">` | "why do forms need a submit button specifically?" |
| 9 | An empty container for goal cards | a `<div id="goals">` (leave it empty - JavaScript fills it tomorrow) | - |
| 10 | An empty-state message | a `<div id="emptyState">` with something like "no goals yet" | - |
| 11 | A toast container | an empty `<div id="toast">` (this is where pop-up messages will appear later) | - |

## Styling it (style.css)
Once your HTML exists, open `style.css`. It's organized into TODO
sections - each one describes what a piece of the page should look
like, but not the code to make it happen. That part is on you.

For each TODO section, ask yourself: **based on what we covered in
class, which CSS properties would apply here?** Then try it, or ask
your AI if you're not sure where to start.

## Ask your AI if you get stuck on:
- "Why isn't my background color showing up?"
- "How do I connect this CSS class to this HTML element?"
- "What does `display: grid` actually do?"

## By the end of today you should have:
- Your own HTML for the header, instructions box, and form
- Your own HTML for the empty goal-card area
- A styled page that looks like a real app, in your own colors