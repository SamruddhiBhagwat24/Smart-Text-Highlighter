const btn = document.getElementById("highlightBtn");
const input = document.getElementById("inputText");
const output = document.getElementById("output");
const results = document.getElementById("results");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const counter = document.getElementById("counter");
const copyBtn = document.getElementById("copyBtn");
const styleToggle = document.getElementById("styleToggle");

/* Store highlights so style can change without re-fetch */
let currentHighlights = [];

/* Prevent multiple rapid clicks */
let lastRequestTime = 0;

/* ------------------------------
   Word / Character Counter
--------------------------------*/
input.addEventListener("input", () => {
  const text = input.value.trim().slice(0, 1200);
  const words = text ? text.split(/\s+/).length : 0;
  const chars = input.value.length;
  counter.textContent = `Words: ${words} | Characters: ${chars}`;
});

/* ------------------------------
   Render Highlights
--------------------------------*/
function renderHighlights(highlights) {
  output.innerHTML = "";

  highlights.forEach(text => {
    const div = document.createElement("div");
    div.className = `highlight-box ${styleToggle.value}`;
    div.textContent = text;
    output.appendChild(div);
  });
}

/* ------------------------------
   Highlight Button (FINAL)
--------------------------------*/
btn.addEventListener("click", async () => {
  const now = Date.now();

  // ⛔ debounce (5 sec)
  if (now - lastRequestTime < 5000) return;
  lastRequestTime = now;

  const text = input.value.trim().slice(0, 1500);
  if (!text) {
    alert("Please enter text");
    return;
  }

  btn.disabled = true;
  loader.classList.remove("hidden");
  results.classList.add("hidden");
  output.innerHTML = "";

  try {
    const res = await fetch(
      "https://smart-text-highlighter-api.vercel.app/highlight",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      }
    );

    const data = await res.json();

    loader.classList.add("hidden");
    btn.disabled = false;
    results.classList.remove("hidden");

    if (data.success && data.highlights.length) {
      currentHighlights = data.highlights;
      renderHighlights(currentHighlights);
    } else {
      output.innerHTML =
        "<p class='no-data'>No important highlights found.</p>";
    }

  } catch (err) {
    console.error(err);
    loader.classList.add("hidden");
    btn.disabled = false;
    alert("Server error");
  }
});

/* ------------------------------
   Change Highlight Style
--------------------------------*/
styleToggle.addEventListener("change", () => {
  if (currentHighlights.length) {
    renderHighlights(currentHighlights);
  }
});

/* ------------------------------
   Copy Highlights
--------------------------------*/
copyBtn.addEventListener("click", () => {
  if (!currentHighlights.length) return;

  navigator.clipboard.writeText(currentHighlights.join("\n"));
  copyBtn.textContent = "✅ Copied";

  setTimeout(() => {
    copyBtn.textContent = "📋 Copy";
  }, 1500);
});

/* ------------------------------
   Theme Toggle
--------------------------------*/
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark")
      ? "☀️ Light"
      : "🌙 Dark";
});
