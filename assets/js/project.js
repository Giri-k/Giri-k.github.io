/* ==========================================================================
   project.js — renders a project deep-dive page from window.SITE.
   The page's <body data-slug="..."> picks the project; layout is:
   header → The problem → How it works (animation + steps) → Results →
   Tech used → prev / next. Must load before animate.js.
   ========================================================================== */
(function () {
  const S = window.SITE;
  const slug = document.body.dataset.slug;
  const list = S.projects;
  const i = list.findIndex((p) => p.slug === slug);
  const p = list[i];
  const root = document.getElementById("project");
  if (!p) { root.innerHTML = '<p class="section">Project not found. <a href="../index.html#projects">Back to projects</a></p>'; return; }

  const KINDS = { research: "Research", llm: "AI apps & agents", systems: "Backend systems", ml: "Machine learning" };
  const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];

  // One metric tile; animate.js counts data-count up from 0 when it scrolls into view.
  const metric = (m) => `
    <div class="metric">
      <strong data-count="${m.value}" data-decimals="${m.decimals || 0}" data-prefix="${m.prefix || ""}" data-suffix="${m.suffix || ""}">${m.prefix || ""}${m.value}${m.suffix || ""}</strong>
      <span>${m.label}</span>
    </div>`;

  // A "how it works" step: either a plain string or {title, text, tech}.
  const step = (h, n) => {
    const o = typeof h === "string" ? { text: h } : h;
    return `
      <li class="step reveal" data-step="${n}">
        <span class="step-n">${n + 1}</span>
        <div>
          ${o.title ? `<h3>${o.title}</h3>` : ""}
          <p>${o.text}</p>
          ${o.tech ? `<p class="tech"><span>Under the hood:</span> ${o.tech}</p>` : ""}
        </div>
      </li>`;
  };

  // Optional MAE-style bar chart (e.g. the traffic project).
  const bars = (b) => {
    if (!b) return "";
    const max = Math.max(...b.series.flatMap((s) => s.vals));
    return `
      <div class="bars window reveal">
        <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">${b.title}</span></div>
        <div class="bars-body">
          ${b.series.map((s, si) => `
            <div class="bar-row"><span class="bar-name">${s.name}</span>
              <div class="bar-set">${s.vals.map((v) => `<div class="bar s${si}" style="--w:${(v / max) * 100}%"><span>${v.toFixed(2)}</span></div>`).join("")}</div>
            </div>`).join("")}
        </div>
      </div>`;
  };

  root.innerHTML = `
    <a class="back" href="../index.html#projects">← All projects</a>

    <header class="p-head window" style="view-transition-name: card-${p.slug}">
      <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">~/projects/${p.slug}</span></div>
      <div class="p-head-body">
        <span class="card-kind">${KINDS[p.kind]} · ${p.year}</span>
        <h1>${p.title}</h1>
        <p class="p-plain">${p.plain}</p>
        ${p.status ? `<p class="status"><span class="pulse"></span>${p.status}</p>` : ""}
        <div class="cta">${(p.links || []).map((l, k) => `<a class="btn ${k ? "" : "primary"}" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</div>
      </div>
    </header>

    ${p.metrics ? `<section class="metrics reveal">${p.metrics.map(metric).join("")}</section>` : ""}

    <section class="p-sec">
      <div class="p-label reveal"><span class="kicker">01</span><h2>The problem</h2></div>
      <div class="p-body reveal">
        <p class="big-p">${p.problemPlain || p.problem}</p>
        ${p.problemPlain ? `<p class="tech"><span>In technical terms:</span> ${p.problem}</p>` : ""}
      </div>
    </section>

    <section class="p-sec">
      <div class="p-label reveal"><span class="kicker">02</span><h2>How it works</h2></div>
      <div class="p-body">
        ${window.PROJECT_ANIMS && window.PROJECT_ANIMS[p.anim] ? `<div class="anim window reveal" id="anim"></div>` : ""}
        <ol class="steps">${p.how.map(step).join("")}</ol>
      </div>
    </section>

    ${(p.resultsText || p.results || p.bars || p.images) ? `
    <section class="p-sec">
      <div class="p-label reveal"><span class="kicker">03</span><h2>Results</h2></div>
      <div class="p-body">
        ${p.resultsText ? `<p class="big-p reveal">${p.resultsText}</p>` : ""}
        ${p.results ? `<ol class="findings reveal">${p.results.map((r) => `<li>${r.text}</li>`).join("")}</ol>` : ""}
        ${bars(p.bars)}
        ${(p.images || []).map((im) => `<figure class="p-fig window reveal"><img src="${im.src}" alt="${im.caption}" loading="lazy"><figcaption>${im.caption}</figcaption></figure>`).join("")}
      </div>
    </section>` : ""}

    <section class="p-sec">
      <div class="p-label reveal"><span class="kicker">04</span><h2>Tech used</h2></div>
      <div class="p-body reveal">
        <div class="chips">${p.stack.map((t) => `<span class="chip strong">${t}</span>`).join("")}</div>
        ${p.credit ? `<p class="credit">${p.credit}</p>` : ""}
      </div>
    </section>

    <nav class="pn" aria-label="More projects">
      <a class="pn-link window" href="${prev.slug}.html"><span>← Previous</span><strong>${prev.title}</strong></a>
      <a class="pn-link window right" href="${next.slug}.html"><span>Next →</span><strong>${next.title}</strong></a>
    </nav>
    <footer class="footer">
      <span>© ${new Date().getFullYear()} ${S.profile.name} · Austin, TX</span>
      <span class="made">Made with <span class="heart" aria-label="love">♥</span> and <img src="../assets/img/claude.png" alt="" width="18" height="18"> Claude</span>
    </footer>`;

  // Mount the project's animation (defined in anims.js) once the container exists.
  const box = document.getElementById("anim");
  if (box) window.PROJECT_ANIMS[p.anim](box, p);

  document.title = `${p.title} · ${S.profile.name}`;
})();
