/* ==========================================================================
   terminal.js — the hero terminal.
   1) Plays a scripted "boot" session (typed commands + printed output).
   2) Then hands control to the visitor as a small interactive shell.
   ========================================================================== */
(function () {
  const term = document.getElementById("term");
  if (!term) return;

  const S = window.SITE;
  const P = S.profile;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PROMPT = '<span class="prompt">girish@ut-austin</span>:<span class="prompt path">~</span>$ ';
  const history = [];
  let histIdx = 0;
  let skip = false;           // set true when the visitor clicks/types during boot

  // Escape user-typed text before echoing it back into innerHTML.
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Promise-based delay; collapses to 0 when skipping or reduced-motion.
  const wait = (ms) => new Promise((r) => setTimeout(r, skip || reduced ? 0 : ms));

  // Append one block of HTML output to the terminal and keep it scrolled down.
  function print(html, cls = "out") {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.innerHTML = html;
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
    return div;
  }

  // Type a command character by character after the prompt, like a human would.
  async function typeCmd(cmd) {
    const line = print(PROMPT + '<span class="typed"></span><span class="cursor"></span>');
    const span = line.querySelector(".typed");
    for (const ch of cmd) {
      span.textContent += ch;
      await wait(38 + Math.random() * 55);
    }
    await wait(260);
    line.querySelector(".cursor").remove();
  }

  /* ---------- Command implementations (shared by boot + interactive) ---------- */

  const projectList = () =>
    '<div class="ls">' + S.projects.map((p) => `<a href="projects/${p.slug}.html">${p.slug}</a>`).join("") + "</div>";

  // Each command returns HTML (or performs an action). Unknown commands fall through to an error.
  const commands = {
    help: () => [
      "available commands:",
      '  <span class="hl">whoami</span>          who I am',
      '  <span class="hl">cat interests.txt</span> what I work on',
      '  <span class="hl">ls projects</span>     list projects (clickable)',
      '  <span class="hl">cd &lt;section|project&gt;</span>  go to about, research, work, projects, contact, or a project',
      '  <span class="hl">cat resume</span>      download resume (ml | swe)',
      '  <span class="hl">contact</span>         email / linkedin / github',
      '  <span class="hl">neofetch</span>        system info',
      '  <span class="hl">theme</span>           toggle light / dark',
      '  <span class="hl">clear</span>           clear the screen',
    ].join("\n"),

    whoami: () =>
      `<span class="big">Hi, I'm <em>${P.short}</em>.</span>` +
      `<span class="dim">${P.name} · ${P.role} · MS Information Science @ UT Austin</span>\n${P.tagline}`,

    "cat interests.txt": () => P.interests.map((i) => `<span class="hl">›</span> ${i}`).join("\n"),

    ls: (arg) => (arg && !arg.startsWith("proj") ? `about/  research/  work/  projects/  contact/` : projectList()),

    cd: (arg) => {
      if (!arg || arg === "~") return window.scrollTo({ top: 0, behavior: "smooth" }), "";
      const name = arg.replace(/^(\.\/|~\/)/, "").replace(/^projects\//, "").replace(/\/$/, "");
      const proj = S.projects.find((p) => p.slug === name);
      if (proj) { location.href = `projects/${proj.slug}.html`; return `opening ${proj.title}…`; }
      const sec = document.getElementById(name);
      if (sec) { sec.scrollIntoView({ behavior: "smooth" }); return ""; }
      return `<span class="err">cd: no such file or directory: ${esc(arg)}</span>`;
    },

    cat: (arg) => {
      if (arg && arg.startsWith("resume")) {
        const kind = /swe/.test(arg) ? "swe" : /ml/.test(arg) ? "ml" : null;
        if (!kind) return 'two versions: <a href="resume-ml.pdf" target="_blank">resume-ml.pdf</a>  <a href="resume-swe.pdf" target="_blank">resume-swe.pdf</a>';
        window.open(`resume-${kind}.pdf`, "_blank");
        return `opening resume-${kind}.pdf…`;
      }
      return `<span class="err">cat: ${esc(arg || "")}: No such file</span>`;
    },

    contact: () =>
      `email    <a href="mailto:${P.email}">${P.email}</a>\n` +
      `linkedin <a href="${P.linkedin}" target="_blank" rel="noopener">girishkaushik-karthikeyan</a>\n` +
      `github   <a href="${P.github}" target="_blank" rel="noopener">github.com/Giri-k</a>`,

    neofetch: () => {
      const art = [
        "   ██████╗ ██╗  ██╗",
        "  ██╔════╝ ██║ ██╔╝",
        "  ██║  ███╗█████╔╝ ",
        "  ██║   ██║██╔═██╗ ",
        "  ╚██████╔╝██║  ██╗",
        "   ╚═════╝ ╚═╝  ╚═╝",
      ];
      const info = [
        `<span class="prompt">girish</span>@<span class="prompt">ut-austin</span>`,
        "-----------------",
        ...Object.entries(S.skills).map(([k, v]) => `<span class="hl">${k}</span>: ${v}`),
      ];
      const rows = Math.max(art.length, info.length);
      let out = "";
      for (let i = 0; i < rows; i++) out += `<span class="prompt">${(art[i] || "").padEnd(22)}</span>${info[i] || ""}\n`;
      return out;
    },

    theme: () => { window.toggleTheme && window.toggleTheme(); return "theme switched."; },
    clear: () => { term.innerHTML = ""; return null; },
    pwd: () => "/home/girish",
    date: () => new Date().toString(),
    echo: (arg) => esc(arg || ""),
    exit: () => "nice try — there's no escape from a good portfolio :)",
    sudo: (arg) =>
      /hire/.test(arg || "")
        ? `<span class="hl">[sudo] password for recruiter: ********</span>\naccess granted. let's talk → <a href="mailto:${P.email}">${P.email}</a>`
        : '<span class="err">girish is not in the sudoers file. This incident will be reported.</span>',
    vim: () => "you'll never leave. try <span class=\"hl\">cd projects</span> instead.",
    "rm": () => '<span class="err">rm: permission denied (nice try)</span>',
  };
  commands.man = (arg) => commands.cd(arg);
  commands.open = commands.cd;

  // Parse one input line: exact multi-word matches first ("cat interests.txt"), then "cmd arg".
  function run(raw) {
    const input = raw.trim();
    if (!input) return "";
    if (commands[input]) return commands[input]();
    const [cmd, ...rest] = input.split(/\s+/);
    const fn = commands[cmd];
    if (fn) return fn(rest.join(" "));
    return `<span class="err">zsh: command not found: ${esc(cmd)}</span>  <span class="dim">(try "help")</span>`;
  }

  /* ---------- Interactive prompt ---------- */

  // Render a live input line and wire up Enter / history / tab-completion.
  function startShell() {
    // Wrap the prompt in one span so the flex row treats it as a single item.
    const line = print("<span>" + PROMPT + "</span>", "input-line");
    const input = document.createElement("input");
    input.setAttribute("aria-label", "terminal input");
    input.autocomplete = "off"; input.spellcheck = false;
    line.appendChild(input);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const v = input.value;
        line.innerHTML = PROMPT + esc(v);
        if (v.trim()) { history.push(v); histIdx = history.length; }
        const out = run(v);
        if (out) print(out);
        startShell();
      } else if (e.key === "ArrowUp") {
        if (histIdx > 0) input.value = history[--histIdx];
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        input.value = histIdx < history.length - 1 ? history[++histIdx] : (histIdx = history.length, "");
        e.preventDefault();
      } else if (e.key === "Tab") {
        // Tab-complete project slugs / section names after "cd ".
        e.preventDefault();
        const m = input.value.match(/^(cd|open|man)\s+(\S*)$/);
        if (m) {
          const pool = [...S.projects.map((p) => p.slug), "about", "research", "work", "projects", "contact"];
          const hit = pool.filter((x) => x.startsWith(m[2]));
          if (hit.length === 1) input.value = `${m[1]} ${hit[0]}`;
          else if (hit.length > 1) print(hit.join("  "), "dim");
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault(); term.innerHTML = ""; startShell();
      }
    });
    if (document.activeElement === term || term.dataset.focused) input.focus({ preventScroll: true });
  }

  /* ---------- Boot sequence ---------- */

  // Scripted intro: each step types a command then prints that command's real output.
  async function boot() {
    print('<span class="dim">Last login: ' + new Date().toDateString() + " on ttys001</span>");
    await wait(500);
    for (const cmd of ["whoami", "cat interests.txt", "ls projects"]) {
      await typeCmd(cmd);
      print(run(cmd));
      await wait(550);
    }
    print('<span class="dim">type "help" for more commands.</span>');
    startShell();
  }

  /* ---------- Terminal mode open / close ---------- */

  const overlay = document.getElementById("term-mode");
  let booted = false, lastFocus = null;

  // Show the full-screen terminal; the boot animation plays only the first time.
  function openTerminal() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("no-scroll");
    term.dataset.focused = "1";
    if (!booted) { booted = true; boot(); }
    else { skip = true; const i = term.querySelector("input"); if (i) i.focus({ preventScroll: true }); }
  }
  // Hide the terminal and give focus back to whatever opened it.
  function closeTerminal() {
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  window.openTerminal = openTerminal;

  // `exit` now actually leaves terminal mode; `cd <section>` closes it and scrolls there.
  commands.exit = () => { setTimeout(closeTerminal, 250); return "logout"; };
  const cdProject = commands.cd;
  commands.cd = (arg) => {
    const name = (arg || "").replace(/^(\.\/|~\/)/, "").replace(/\/$/, "");
    if (["about", "research", "work", "projects", "contact"].includes(name)) {
      closeTerminal();
      document.getElementById(name).scrollIntoView({ behavior: "smooth" });
      return "";
    }
    return cdProject(arg);
  };
  commands.man = commands.open = commands.cd;

  document.getElementById("term-btn")?.addEventListener("click", openTerminal);
  document.querySelectorAll("[data-open-terminal]").forEach((b) => b.addEventListener("click", openTerminal));
  overlay.querySelectorAll("[data-close-terminal]").forEach((b) => b.addEventListener("click", closeTerminal));
  // Clicking the dim backdrop (outside the window) closes it too.
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeTerminal(); });

  // Clicking inside the terminal skips the intro animation and focuses the prompt.
  term.addEventListener("click", () => {
    skip = true;
    const i = term.querySelector("input");
    if (i) i.focus({ preventScroll: true });
  });

  // Keyboard: Esc closes; backtick (`) opens from anywhere on the page.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) { closeTerminal(); return; }
    if (e.key === "`" && overlay.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault(); openTerminal();
    }
  });

  // Deep link: index.html#terminal opens straight into terminal mode.
  if (location.hash === "#terminal") openTerminal();
})();
