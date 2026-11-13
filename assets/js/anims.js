/* ==========================================================================
   anims.js — interactive "How it works" animations for project pages.
   Each entry in PROJECT_ANIMS is (container, project) => void and is picked
   by the project's `anim` field in data/projects.js.
   ========================================================================== */
window.PROJECT_ANIMS = window.PROJECT_ANIMS || {};

(function () {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  // Create an SVG element with attributes in one call.
  function el(tag, attrs = {}, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  // Promise-based delay; callers re-check their loop id afterwards to support cancelling.
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Run `start` while the element is on screen and `stop` when it leaves.
  function whenVisible(node, start, stop) {
    new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0.25 }).observe(node);
  }

  // Highlight the matching "How it works" step card next to the animation.
  function activateStep(n) {
    document.querySelectorAll(".step").forEach((s) => s.classList.toggle("active", +s.dataset.step === n));
  }

  // Run an async story on repeat while `node` is on screen. `play(w)` gets a
  // wait function w(ms) that throws when the animation scrolls away, which
  // cleanly aborts the story mid-way; it restarts from the top on return.
  const STOP = Symbol("stop");
  function looper(node, play) {
    let id = 0, on = false;
    whenVisible(node, () => {
      if (on) return;
      on = true;
      const my = ++id;
      const w = async (ms) => { await sleep(reduced ? Math.min(ms, 600) : ms); if (my !== id || !on) throw STOP; };
      (async () => {
        try { for (;;) { await play(w); await w(400); } }
        catch (e) { if (e !== STOP) console.error(e); }
      })();
    }, () => { on = false; id++; });
  }

  // Standard animation frame: window title bar + caption line + body HTML.
  function frame(box, title, body) {
    box.innerHTML = `
      <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">${title}</span></div>
      <div class="anim-body"><p class="anim-caption" data-cap></p>${body}</div>`;
    const cap = box.querySelector("[data-cap]");
    return {
      q: (sel) => box.querySelector(sel),
      qa: (sel) => [...box.querySelectorAll(sel)],
      // Set the caption (HTML allowed) and optionally light up a step card.
      say: (html, stepN) => { cap.innerHTML = html; if (stepN != null) activateStep(stepN); },
    };
  }

  // Shared toolkit for the other animations (anims-more.js).
  window.ANIM_KIT = { el, sleep, whenVisible, activateStep, looper, frame, reduced };

  /* ========================================================================
     ring — Self-Healing Distributed Cache
     Consistent-hash ring with 3 servers × 3 virtual nodes, 20 keys,
     live requests, gossip pings, crash → detect → reassign → rejoin.
     ======================================================================== */
  PROJECT_ANIMS.ring = function (box) {
    const SERVERS = [
      { id: "A", color: "#57c7ff", vnodes: [15, 140, 255] },
      { id: "B", color: "#f3c969", vnodes: [60, 185, 300] },
      { id: "C", color: "#c792ea", vnodes: [100, 220, 335] },
    ];
    // state: up | crashed (down, not yet noticed) | dead (group agreed) | rejoining
    SERVERS.forEach((s) => { s.state = "up"; s.misses = 0; });
    const byId = Object.fromEntries(SERVERS.map((s) => [s.id, s]));
    const VN = SERVERS.flatMap((s) => s.vnodes.map((a) => ({ a, s }))).sort((x, y) => x.a - y.a);
    const KEYS = Array.from({ length: 20 }, (_, i) => ({ a: (i * 137.508 + 8) % 360 }));
    const CX = 175, CY = 190, R = 135;

    box.innerHTML = `
      <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span class="title">live demo — 3 servers, 20 pieces of data</span></div>
      <div class="anim-body">
        <p class="anim-caption" id="cap">Requests from the app are spread around the ring. Each piece of data lives on the next server clockwise.</p>
        <svg class="ring-svg" viewBox="0 0 600 380" role="img" aria-label="Animated diagram of servers on a hash ring"></svg>
        <div class="anim-stats">
          <span>Requests <b id="st-req">0</b></span>
          <span>Answered <b id="st-ok">0</b></span>
          <span>By backup copy <b id="st-bk">0</b></span>
          <span>Success <b id="st-pct" class="good">100%</b></span>
        </div>
        <div class="anim-controls">
          <button type="button" class="btn danger" id="crash">💥 Crash server B</button>
          <button type="button" class="btn" id="revive" disabled>↺ Bring it back</button>
          <label class="auto"><input type="checkbox" id="auto" checked> Auto-play</label>
        </div>
      </div>`;

    const svg = box.querySelector("svg");
    const $ = (id) => box.querySelector("#" + id);
    const stats = { req: 0, ok: 0, bk: 0 };

    // Angle in degrees (0 = top, clockwise) → x/y on a circle of radius r.
    const pt = (a, r = R) => [CX + r * Math.sin((a * Math.PI) / 180), CY - r * Math.cos((a * Math.PI) / 180)];
    // SVG arc path from angle a1 to a2 going clockwise.
    function arc(a1, a2, r = R) {
      const span = (a2 - a1 + 360) % 360 || 360;
      const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r);
      return `M${x1},${y1} A${r},${r} 0 ${span > 180 ? 1 : 0} 1 ${x2},${y2}`;
    }
    // In the group's view a server is a member unless it has been declared dead.
    const member = (s) => s.state === "up" || s.state === "crashed";
    // Primary owner = first member vnode clockwise from the key; replica = next different member server.
    function owners(a) {
      const start = VN.findIndex((v) => v.a >= a);
      const ring = [...VN.slice(start < 0 ? 0 : start), ...VN.slice(0, start < 0 ? 0 : start)];
      const prim = ring.find((v) => member(v.s));
      const rep = ring.find((v) => member(v.s) && v.s !== prim.s);
      return { prim: prim.s, rep: rep && rep.s };
    }

    /* ---- static drawing ---- */
    el("circle", { cx: CX, cy: CY, r: R, class: "ring-track" }, svg);
    const arcs = VN.map((v, k) => {
      const prevA = VN[(k - 1 + VN.length) % VN.length].a;
      return { v, path: el("path", { d: arc(prevA, v.a), class: "ring-arc" }, svg) };
    });
    VN.forEach((v) => {
      const [x, y] = pt(v.a, R);
      v.tick = el("circle", { cx: x, cy: y, r: 9, class: "vnode", fill: v.s.color }, svg);
      const [lx, ly] = pt(v.a, R + 22);
      v.label = el("text", { x: lx, y: ly + 4, class: "vlabel", "text-anchor": "middle" }, svg);
      v.label.textContent = v.s.id;
    });
    KEYS.forEach((k) => {
      const [x, y] = pt(k.a, R - 22);
      k.dot = el("circle", { cx: x, cy: y, r: 5, class: "key" }, svg);
      k.x = x; k.y = y;
    });
    // The "app" in the middle sending requests.
    el("rect", { x: CX - 34, y: CY - 20, width: 68, height: 40, rx: 8, class: "client" }, svg);
    el("text", { x: CX, y: CY + 5, class: "client-t", "text-anchor": "middle" }, svg).textContent = "App";

    // Server status cards on the right; gossip lines are drawn between them.
    const gossipLayer = el("g", {}, svg);
    SERVERS.forEach((s, k) => {
      const y = 50 + k * 110;
      s.y = y + 35;
      s.g = el("g", { class: "srv" }, svg);
      s.rect = el("rect", { x: 420, y, width: 170, height: 70, rx: 10, class: "srv-box" }, s.g);
      el("circle", { cx: 442, cy: y + 24, r: 8, fill: s.color }, s.g);
      el("text", { x: 458, y: y + 29, class: "srv-name" }, s.g).textContent = "Server " + s.id;
      s.status = el("text", { x: 436, y: y + 53, class: "srv-status" }, s.g);
    });

    /* ---- redraw: colors + labels from current state ---- */
    function render() {
      arcs.forEach(({ v, path }) => {
        const prevA = VN[(VN.indexOf(v) - 1 + VN.length) % VN.length].a;
        const o = owners((prevA + 0.5) % 360).prim;
        path.setAttribute("stroke", o.color);
      });
      KEYS.forEach((k) => {
        const o = owners(k.a);
        k.prim = o.prim; k.rep = o.rep;
        k.dot.setAttribute("fill", o.prim.color);
      });
      VN.forEach((v) => {
        const down = v.s.state === "crashed" || v.s.state === "dead";
        v.tick.classList.toggle("down", down);
      });
      SERVERS.forEach((s) => {
        const n = KEYS.filter((k) => k.prim === s && member(s)).length;
        const txt = { up: `● healthy · ${n} items`, crashed: "● not answering…", dead: "✕ down · data moved", rejoining: "↻ rejoining…" }[s.state];
        s.status.textContent = txt;
        s.g.setAttribute("class", "srv " + s.state);
      });
    }

    /* ---- moving dots ---- */
    // Animate a small packet along a straight line, then remove it.
    function packet(x1, y1, x2, y2, cls, ms = 450) {
      if (reduced) return Promise.resolve();
      const c = el("circle", { cx: x1, cy: y1, r: 4, class: "pkt " + cls }, svg);
      const t0 = performance.now();
      return new Promise((res) => {
        (function f(now) {
          const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 2);
          c.setAttribute("cx", x1 + (x2 - x1) * e);
          c.setAttribute("cy", y1 + (y2 - y1) * e);
          if (k < 1) requestAnimationFrame(f); else { c.remove(); res(); }
        })(t0);
      });
    }

    // One client request to a random key; falls back to the backup copy if the owner crashed.
    async function request() {
      // Pick a random key; while a server is crashed, half the time pick one of its keys to show the backup path.
      const hit = KEYS.filter((x) => x.prim.state === "crashed");
      const pool = hit.length && Math.random() < 0.5 ? hit : KEYS;
      const k = pool[(Math.random() * pool.length) | 0];
      const prim = k.prim, rep = k.rep;
      await packet(CX, CY, k.x, k.y, "ok");
      if (prim.state === "crashed" && rep) {
        k.dot.classList.add("flash-bad");
        setTimeout(() => k.dot.classList.remove("flash-bad"), 400);
        await packet(k.x, k.y, CX, CY, "backup", 350);
        stats.bk++;
      } else {
        k.dot.classList.add("flash");
        setTimeout(() => k.dot.classList.remove("flash"), 300);
      }
      stats.req++; stats.ok++;   // counted when the answer lands, so in-flight requests never look like failures
      $("st-req").textContent = stats.req;
      $("st-ok").textContent = stats.ok;
      $("st-bk").textContent = stats.bk;
      $("st-pct").textContent = Math.round((stats.ok / stats.req) * 100) + "%";
    }

    // One gossip round: a live server pings a random peer; unanswered pings build suspicion.
    function gossip() {
      const live = SERVERS.filter((s) => s.state === "up");
      if (live.length < 1) return;
      const from = live[(Math.random() * live.length) | 0];
      const crashed = SERVERS.find((s) => s.state === "crashed");
      const others = SERVERS.filter((s) => s !== from && s.state !== "dead");
      const to = crashed && Math.random() < 0.5 ? crashed : others[(Math.random() * others.length) | 0];
      if (!to || to === from) return;
      const bad = to.state === "crashed";
      const mid = (from.y + to.y) / 2;
      const line = el("path", { d: `M420,${from.y} Q${370},${mid} 420,${to.y}`, class: "gossip " + (bad ? "bad" : "") }, gossipLayer);
      setTimeout(() => line.remove(), 900);
      if (bad && ++to.misses >= 4) declareDead(to);   // ~4 missed check-ins ≈ 5 s, like the real system
    }

    function declareDead(s) {
      s.state = "dead";
      setCaption(`The others agree Server ${s.id} is down. Its slices of the ring move to the next server clockwise, and nothing is lost thanks to the backup copies.`, 3);
      render();
    }
    function setCaption(t, stepN) { $("cap").textContent = t; activateStep(stepN); }

    /* ---- controls ---- */
    const B = byId.B;
    function crash() {
      if (B.state !== "up") return;
      B.state = "crashed"; B.misses = 0;
      setCaption("Server B just crashed! For now, the app's requests for its data are answered by the backup copies (amber). Meanwhile, the others start noticing B isn't answering…", 2);
      $("crash").disabled = true; $("revive").disabled = false;
      render();
    }
    async function revive() {
      if (B.state === "up") return;
      if (B.state === "crashed") declareDead(B);
      B.state = "rejoining";
      setCaption("Server B is back. It receives only the data it missed, then takes back its slices of the ring.", 3);
      $("revive").disabled = true;
      render();
      // Stream B's keys back from their temporary owners.
      const back = KEYS.filter((k) => { B.state = "up"; const o = owners(k.a).prim; B.state = "rejoining"; return o === B; });
      for (const k of back) packet(k.x, k.y, 420, B.y, "stream", 600);
      await sleep(reduced ? 0 : 900);
      B.state = "up"; B.misses = 0;
      $("crash").disabled = false;
      render();
      setCaption("Back to normal: every server healthy, every piece of data on its owner plus one backup.", 1);
    }
    $("crash").addEventListener("click", () => { $("auto").checked = false; auto = false; crash(); });
    $("revive").addEventListener("click", () => { $("auto").checked = false; auto = false; revive(); });
    $("auto").addEventListener("change", (e) => { auto = e.target.checked; if (auto && running) autoLoop(); });

    /* ---- loops (only while visible) ---- */
    let running = false, auto = true, timers = [], loopId = 0;
    // Scripted story: normal → crash → detection → heal → normal, repeated.
    async function autoLoop() {
      const id = ++loopId;
      const ok = () => id === loopId && running && auto;
      setCaption("Requests from the app are spread around the ring. Each piece of data lives on the next server clockwise, with a backup on the one after.", 0);
      await sleep(5000); if (!ok()) return;
      crash();
      // wait for gossip to declare B dead (or 6 s at most)
      for (let t = 0; t < 30 && B.state === "crashed"; t++) { await sleep(200); if (!ok()) return; }
      if (B.state === "crashed") declareDead(B);
      await sleep(5000); if (!ok()) return;
      await revive();
      await sleep(4500); if (!ok()) return;
      autoLoop();
    }
    function start() {
      if (running) return;
      running = true;
      timers.push(setInterval(request, reduced ? 1200 : 380));
      timers.push(setInterval(gossip, 650));
      if (auto) autoLoop();
    }
    function stop() { running = false; loopId++; timers.forEach(clearInterval); timers = []; }

    render();
    activateStep(0);
    whenVisible(box, start, stop);
  };
})();
