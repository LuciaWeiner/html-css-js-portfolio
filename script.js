document.documentElement.classList.add("js");

// ---- Experience data (edit roles here) ----
const experience = [
  {
    dates: "Jan–Aug 2026",
    org: "ExxonMobil Global Trading",
    role: "Crude Trading Analytics Intern",
    impact: "Cushing inventory forecasts",
    location: "Houston, TX",
    bullets: [
      "Automated forecasting logic to predict Cushing crude inventory levels, replacing manual spreadsheet processes and saving 10 hours of data manipulation per month.",
      "Built a Databricks Python pipeline ingesting weekly crude oil pipeline flow data from the Genscape API, loading raw and curated datasets into Snowflake for analytics and trade decisions.",
      "Built an interactive React/TypeScript view of pipeline flows and the predicted supply/demand balance, helping traders make faster, better-informed decisions."
    ]
  },
  {
    dates: "Jan–Aug 2026",
    org: "ExxonMobil Global Trading",
    role: "Crude Trading Software Enablement Intern",
    impact: "−89% manual deal entry",
    location: "Houston, TX",
    bullets: [
      "Cut manual workload by 89% on international crude oil export deal trackers for the US Gulf Coast and East Canada regions, shifting the team from hands-on processing to reviewing AI-suggested entries.",
      "Implemented an AI agent that parses Zoom messages and Excel sheets to generate export deal tracker entries automatically.",
      "Designed a validation pipeline that normalizes source formats and checks fields before insertion, reducing data entry errors and safeguarding accuracy for commercial trading decisions."
    ]
  },
  {
    dates: "Jun 2025–Jan 2026",
    org: "UF Human Performance & Neuro-Engineering Lab",
    role: "Research Assistant",
    impact: "IEEE Xplore paper",
    location: "Gainesville, FL",
    bullets: [
      "Co-authored a paper on a wearable sensor framework for real-time health and human performance monitoring in operational environments.",
      "Published in IEEE Xplore and selected as a special session paper at the 2025 International Conference on Intelligent Computing and Systems at the Edge (ICEdge).",
      "Reviewed doctoral research on exoskeleton systems, weighing design trade-offs between assistive performance and wearer comfort."
    ]
  },
  {
    dates: "Jun–Jul 2023 & 2025",
    org: "UT Austin Computer Science Dept.",
    role: "Technical Program Intern",
    impact: "300+ students, 80% build rate",
    location: "Austin, TX",
    bullets: [
      "Worked in a team of five delivering a robotics and machine learning program to 300+ students, reaching an 80% robot assembly rate.",
      "Led hands-on hardware workshops and interactive robotics simulations.",
      "Taught introductory machine learning lessons on Perceptron and Q-learning, guiding students through implementations in Python."
    ]
  }
];

const rowsEl = document.getElementById("exp-rows");
const panel = document.getElementById("exp-panel");
const mobileMQ = window.matchMedia("(max-width: 900px)");
let active = 0;

const detailHTML = (e) =>
  `<h3>${e.role}</h3><p class="meta">${e.org} · ${e.location} · ${e.dates}</p><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;

experience.forEach((e, i) => {
  const item = document.createElement("div");
  item.className = "exp-item";
  item.setAttribute("role", "listitem");
  item.innerHTML = `<button class="exp-row" type="button" id="exp-btn-${i}" aria-controls="exp-inline-${i}">
      <span class="dates">${e.dates}</span><span class="org">${e.org}</span><span class="role">${e.role}</span><span class="impact">${e.impact}</span>
    </button><div class="exp-inline" id="exp-inline-${i}">${detailHTML(e)}</div>`;
  item.querySelector("button").addEventListener("click", () => select(i, true));
  rowsEl.appendChild(item);
});

function select(i, fromClick) {
  const items = rowsEl.querySelectorAll(".exp-item");
  if (mobileMQ.matches && fromClick && i === active && items[i].classList.contains("open")) {
    items[i].classList.remove("open");
    items[i].querySelector("button").setAttribute("aria-expanded", "false");
    return;
  }
  active = i;
  items.forEach((it, j) => {
    const b = it.querySelector("button");
    const on = j === i;
    it.classList.toggle("open", on);
    if (mobileMQ.matches) { b.removeAttribute("aria-pressed"); b.setAttribute("aria-expanded", on); }
    else { b.removeAttribute("aria-expanded"); b.setAttribute("aria-pressed", on); }
  });
  panel.innerHTML = detailHTML(experience[i]);
}
select(0, false);
mobileMQ.addEventListener("change", () => select(active, false));

// ---- Mobile menu ----
const burger = document.querySelector(".hamburger");
const menu = document.getElementById("nav-menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}));

// ---- Active nav highlighting ----
const links = document.querySelectorAll(".nav-links a");
const sections = [...links].map((l) => document.querySelector(l.getAttribute("href")));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => s && spy.observe(s));

// ---- Fade-ins ----
const fades = document.querySelectorAll(".fade");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  fades.forEach((f) => f.classList.add("visible"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  fades.forEach((f) => io.observe(f));
}

document.getElementById("year").textContent = new Date().getFullYear();
