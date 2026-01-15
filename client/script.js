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
   Render Highlights (Reusable)
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
   Highlight Button Click
--------------------------------*/
btn.addEventListener("click", async () => {
  const text = input.value.trim().slice(0, 1500); // limit size for speed

  output.innerHTML = "";
  results.classList.add("hidden");

  if (!text) {
    alert("Please enter text");
    return;
  }

  loader.classList.remove("hidden");
  btn.disabled = true;

  try {
    const res = await fetch("http://localhost:5001/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    loader.classList.add("hidden");
    btn.disabled = false;
    results.classList.remove("hidden");

    if (data.success && data.highlights.length) {
      currentHighlights = data.highlights; // store once
      renderHighlights(currentHighlights);
    } else {
      output.innerHTML = "<p class='no-data'>No important highlights found.</p>";
    }

  } catch (err) {
    console.error(err);
    loader.classList.add("hidden");
    btn.disabled = false;
    alert("Server error");
  }
});

/* ------------------------------
   Change Highlight Style Instantly
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

  const text = currentHighlights.join("\n");
  navigator.clipboard.writeText(text);

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
// ------------------------------
// Prevent multiple rapid clicks
// ------------------------------

let lastRequestTime = 0;

btn.addEventListener("click", async () => {
  const now = Date.now();

  // ⛔ Debounce: block clicks within 5 seconds
  if (now - lastRequestTime < 5000) {
    return;
  }
  lastRequestTime = now;

  const text = input.value.trim();
  if (!text) {
    alert("Please enter text");
    return;
  }

  // 🔒 Disable button immediately
  btn.disabled = true;

  loader.classList.remove("hidden");
  results.classList.add("hidden");

  try {
    const res = await fetch("http://localhost:5001/highlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    loader.classList.add("hidden");
    btn.disabled = false; // ✅ re-enable only after response
    results.classList.remove("hidden");

    output.innerHTML = "";

    if (data.success && data.highlights.length) {
      data.highlights.forEach((item) => {
        const div = document.createElement("div");
        div.className = `highlight-box ${styleToggle.value}`;
        div.textContent = item;
        output.appendChild(div);
      });
    } else {
      output.innerHTML =
        "<p class='no-data'>No important highlights found.</p>";
    }

  } catch (err) {
    console.error(err);
    loader.classList.add("hidden");
    btn.disabled = false; // ✅ re-enable on error
    alert("Server error");
  }
});
