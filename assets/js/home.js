/* ==========================================================================
   home.js — builds the home-page sections (About, Research, Experience,
   Projects, Contact) from window.SITE, plus the research demo animation.
   Must load after data/projects.js and before animate.js (which reveals).
   ========================================================================== */
(function () {
  const S = window.SITE, P = S.profile;
  const $ = (id) => document.getElementById(id);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Standard section heading: small mono "kicker" + large plain title.
  const head = (kicker, title) =>
    `<div class="section-head reveal"><span class="kicker">${kicker}</span><h2>${title}</h2></div>`;

  /* ---------- About ---------- */
  // Plain-language bio on the left, education + interests on the right.
  $("about").innerHTML = head("01 · about", "A bit about me") + `
    <div class="about-grid">
      <div class="about-text reveal">
        <p>I like problems where AI meets real-world engineering.</p>
        <p>In research, I use <strong>reinforcement learning</strong> to train AI models that can watch hours of video and point to the exact moment that answers a question.</p>
        <p>In industry, I spent three years at <strong>Standard Chartered</strong> building the gateway and caching layers behind the bank's APIs. That work made responses 60% faster and saved over $3M a year.</p>
      </div>
      <div class="edu-card window reveal">
        <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">interests.txt</span></div>
        <div class="edu-body">
          <h3>What I work on</h3>
          <ul class="interest-list">${P.interests.map((i) => `<li>${i}</li>`).join("")}</ul>
          <p class="edu-courses">Studied at UT Austin (M.S.) and NIT Trichy (B.Tech). See the timeline below.</p>
        </div>
      </div>
    </div>`;

  /* ---------- Research ---------- */
  const R = S.projects.find((p) => p.slug === "video-agents");
  $("research").innerHTML = head("02 · research", "What I'm researching") + `
    <div class="research-grid">
      <div class="research-text reveal">
        <p class="research-org">Swarm Lab · UT Austin · advised by Prof. Sandeep Chinchali</p>
        <h3>Can an AI find the needle in an hour-long video?</h3>
        <p>Today's AI models can only look at a few minutes of video at once. To answer a question about a long video, an AI <em>agent</em> has to search. It jumps to promising moments, looks closely, and decides when it has seen enough.</p>
        <p>I train these agents with reinforcement learning, which rewards them for finding the moment that <em>proves</em> their answer, not just for guessing right. I also run controlled experiments to learn which design choices actually matter.</p>
        <h4>What we've found so far</h4>
        <ol class="findings">${R.results.map((r) => `<li>${r.text}</li>`).join("")}</ol>
        <p class="status"><span class="pulse"></span>${R.status}</p>
        <a class="btn" href="projects/video-agents.html">How it works →</a>
      </div>
      <div class="demo window reveal" id="demo">
        <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">demo — agent searching a video</span></div>
        <div class="demo-body">
          <div class="demo-q"><span class="who">Question</span> When does the cyclist fall?</div>
          <div class="demo-mode" role="group" aria-label="Search style">
            <button type="button" data-mode="seq" class="on">One step at a time</button>
            <button type="button" data-mode="fan">Many clips at once</button>
          </div>
          <div class="film" id="film"></div>
          <div class="film-axis"><span>0:00</span><span>30:00</span><span>1:00:00</span></div>
          <div class="demo-log" id="demo-log" aria-live="polite"></div>
        </div>
      </div>
    </div>`;

  /* ---------- Experience (timeline) ---------- */
  $("work").innerHTML = head("03 · experience", "Where I've worked and studied") + `
    <div class="timeline" id="timeline">
      <div class="tl-line"><div class="tl-fill" id="tl-fill"></div></div>
      ${S.experience.map((x) => `
        <article class="tl-item reveal ${x.type === "edu" ? "edu" : ""}">
          <span class="tl-dot">${x.type === "edu" ? "🎓" : ""}</span>
          <div class="tl-card">
            <div class="tl-meta"><span>${x.type === "edu" ? '<span class="tl-tag">Studied</span>' : '<span class="tl-tag work">Worked</span>'}${x.when}</span><span>${x.where}</span></div>
            <h3>${x.org}</h3>
            <p class="tl-role">${x.role}${x.note ? ` · <span class="dim">${x.note}</span>` : ""}</p>
            ${x.summary ? `<p>${x.summary}</p>` : ""}
            ${x.highlights ? `<div class="chips">${x.highlights.map((h) => `<span class="chip strong">${h}</span>`).join("")}</div>` : ""}
            <details class="tl-more">
              <summary>Details</summary>
              <ul>${x.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
            </details>
          </div>
        </article>`).join("")}
    </div>`;

  /* ---------- Projects (filterable cards) ---------- */
  const KINDS = { all: "All", research: "Research", llm: "AI apps & agents", systems: "Backend systems", ml: "Machine learning" };
  const sorted = [...S.projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  $("projects").innerHTML = head("04 · projects", "Things I've built") + `
    <p class="section-sub reveal">Click any project to see how it works, with diagrams and results.</p>
    <div class="filters reveal" role="group" aria-label="Filter projects">
      ${Object.entries(KINDS).map(([k, v], i) => `<button type="button" data-kind="${k}" class="${i ? "" : "on"}">${v}</button>`).join("")}
    </div>
    <div class="cards" id="cards">
      ${sorted.map((p) => `
        <a class="card window reveal ${p.featured ? "featured" : ""}" data-kind="${p.kind}" href="projects/${p.slug}.html" style="view-transition-name: card-${p.slug}">
          <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">~/projects/${p.slug}</span></div>
          <div class="card-body">
            <span class="card-kind">${KINDS[p.kind]} · ${p.year}</span>
            <h3>${p.title}</h3>
            <p>${p.plain}</p>
            <div class="card-stat">${p.stat ? `<strong>${p.stat}</strong>` : ""}<span>${p.statLabel}</span></div>
            <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
            <span class="card-cta">Read more <span aria-hidden="true">→</span></span>
          </div>
        </a>`).join("")}
    </div>`;

  // Filter buttons show/hide cards by kind, with a short fade.
  document.querySelectorAll(".filters button").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach((x) => x.classList.toggle("on", x === b));
      const k = b.dataset.kind;
      document.querySelectorAll("#cards .card").forEach((c) => {
        const show = k === "all" || c.dataset.kind === k;
        c.hidden = !show;
        if (show) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
      });
    })
  );

  /* ---------- Contact ---------- */
  $("contact").innerHTML = `
    <div class="contact window reveal">
      <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">contact</span></div>
      <div class="contact-body">
        <span class="kicker">05 · contact</span>
        <h2>Let's talk.</h2>
        <p>I'm looking for roles in <strong>machine learning and software engineering</strong>. I'm also always happy to talk about research, agents or systems.</p>
        <div class="cta">
          <a class="btn primary" href="mailto:${P.email}">✉ ${P.email}</a>
          <a class="btn" href="${P.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a class="btn" href="${P.github}" target="_blank" rel="noopener">GitHub</a>
          <a class="btn" href="resume-ml.pdf" target="_blank" rel="noopener">Resume · AI/ML</a>
          <a class="btn" href="resume-swe.pdf" target="_blank" rel="noopener">Resume · Software</a>
        </div>
      </div>
    </div>
    <footer class="footer">
      <span>© ${new Date().getFullYear()} ${P.name} · Austin, TX</span>
      <span class="made">Made with <span class="heart" aria-label="love">♥</span> and <img src="assets/img/claude.png" alt="" width="18" height="18"> Claude · <button type="button" class="link-btn" data-open-terminal>open terminal mode &gt;_</button></span>
    </footer>`;

  /* ---------- Timeline line fills as you scroll ---------- */
  // Grow the green line from the top of the timeline down to the viewport's middle.
  const tl = $("timeline"), fill = $("tl-fill");
  function fillLine() {
    const r = tl.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    fill.style.transform = `scaleY(${k})`;
  }
  addEventListener("scroll", fillLine, { passive: true }); fillLine();

  /* ---------- Mobile menu ---------- */
  const bar = document.querySelector(".topbar"), mb = $("menu-btn");
  if (mb) {
    mb.addEventListener("click", () => mb.setAttribute("aria-expanded", bar.classList.toggle("open")));
    bar.querySelectorAll("nav a").forEach((a) => a.addEventListener("click", () => { bar.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }));
  }

  /* ---------- Research demo: agent searching a "video" ---------- */
  // A strip of 24 frames; frame 17 is the answer. The agent either probes one
  // region at a time (sequential) or several in parallel (fanout).
  const film = $("film"), log = $("demo-log");
  const N = 24, ANSWER = 17;
  film.innerHTML = Array.from({ length: N }, (_, i) =>
    `<span class="frame" style="--h:${(i * 37) % 360}" data-i="${i}"></span>`).join("");
  const frames = [...film.children];
  let mode = "seq", runId = 0, visible = false;

  const sleep = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  const say = (t) => { log.innerHTML = t; };
  const clear = () => frames.forEach((f) => (f.className = "frame"));
  const mark = (idxs, cls) => idxs.forEach((i) => frames[i].classList.add(cls));

  // Scripted steps for each style. Each step: frames to look at + a log line.
  const SCRIPTS = {
    seq: [
      { look: [2, 3, 4], text: "Step 1 — searching “cyclist”… checking the opening minutes." },
      { look: [9, 10, 11], text: "Step 2 — riding, no fall yet. Jumping ahead." },
      { look: [16, 17, 18], text: "Step 3 — something happens here. Looking closer…" },
    ],
    fan: [
      { look: [2, 3, 8, 9, 16, 17, 21, 22], text: "Sends several searches at once and looks at many clips in parallel…" },
      { look: [16, 17, 18], text: "Compares them and zooms in on the most promising one…" },
    ],
  };

  // Play one full search: scan → candidate highlights → evidence frame + answer.
  async function play() {
    const id = ++runId;
    clear();
    for (const step of SCRIPTS[mode]) {
      say(step.text);
      frames.forEach((f) => f.classList.remove("look"));
      mark(step.look, "look");
      mark(step.look, "seen");
      await sleep(1500);
      if (id !== runId) return;
    }
    frames.forEach((f) => f.classList.remove("look"));
    frames[ANSWER].classList.add("found");
    say('<span class="ok">✓ Answer: around 42:30</span> — and it points to the clip that proves it.');
    await sleep(3200);
    if (id === runId && visible) play();
  }

  document.querySelectorAll(".demo-mode button").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".demo-mode button").forEach((x) => x.classList.toggle("on", x === b));
      mode = b.dataset.mode; play();
    })
  );
  // Only animate while the demo is on screen (saves CPU, restarts on return).
  new IntersectionObserver(([en]) => {
    const was = visible; visible = en.isIntersecting;
    if (visible && !was) play();
    if (!visible) runId++;
  }, { threshold: 0.3 }).observe($("demo"));
})();
