/* =====================================================
   Gautam & Shruti — Engagement Invitation
   EDIT: search "EDIT:" for the spots you'll want to touch
   ===================================================== */

/* ---------- EDIT: the big day & time (used by the countdown + scratch reveal) ---------- */
const ENGAGEMENT_DATE = new Date('2026-10-22T19:00:00+05:30');

/* ---------- EDIT: Our Story chapters ---------- */
const STORY = [
  { icon: '💌', meta: '20th October 2022', title: 'First Met', text: 'Add a short line about how Gautam & Shruti first met.' },
  { icon: '💍', meta: '2nd October 2023', title: 'The Proposal', text: 'Add a short line about the proposal here.' },
  { icon: '💍', meta: '22nd October 2026', title: 'The Engagement', text: 'And now, together with their families, they say yes to forever.' }
];

/* ---------- EDIT: fun couple comparisons, him % out of 100 ---------- */
const SCOREBOARD = [
  { label: 'Who fell in love first', him: 55 },
  { label: 'Who takes longer to get ready', him: 20 },
  { label: 'Who is the better cook', him: 45 },
  { label: 'Who wins the arguments', him: 35 },
  { label: 'Who is more excited for the engagement', him: 50 }
];

/* ---------- EDIT: the celebrations — fill in what you know, leave the rest as-is ---------- */
const EVENTS = [
  { icon: '🌿', label: 'Function', name: 'Mehendi', date: 'Add date', time: 'Add time', venue: 'Add venue' },
  { icon: '🎶', label: 'Function', name: 'Sangeet', date: 'Add date', time: 'Add time', venue: 'Add venue' },
  { icon: '💍', label: 'Function', name: 'Engagement Ceremony', date: 'Thursday, 22 October 2026', time: '7:00 PM onwards', venue: 'Starland Banquets, 99 Satguru Ram Singh Marg, New Delhi, DL' },
  { icon: '🎉', label: 'Function', name: 'Reception', date: 'Add date', time: 'Add time', venue: 'Add venue' }
];

/* ---------- Shaadi Survival Kit ---------- */
const KIT = [
  { icon: '👟', title: 'Comfortable Footwear', text: 'Heels and hours of dancing don\'t mix — pack a backup pair.' },
  { icon: '💧', title: 'Stay Hydrated', text: 'Between the dholak and the dancing, water breaks are sacred.' },
  { icon: '📸', title: 'Camera Ready', text: 'Someone will always be filming a reel — smile through it.' },
  { icon: '🧧', title: 'Shagun Envelope', text: 'Keep it handy, cash or UPI, your call.' },
  { icon: '🕺', title: 'Dance Moves', text: 'Practice at least one signature step before the Sangeet.' },
  { icon: '☕', title: 'Power Naps', text: 'Engagement season runs on chai and short naps. Budget both.' }
];

/* ---------- Random "aunty" questions ---------- */
const AUNTY_QUOTES = [
  'Beta, when is YOUR shaadi happening?',
  'Arre you\'ve put on weight since the engagement, no?',
  'So what does your salary package look like these days?',
  'Why are you still single, beta?',
  'Love marriage or arranged, tell me honestly.',
  'Have you tried the paneer? I made your plate myself.',
  'Will you also wear this much makeup at your own engagement?'
];

/* ---------- EDIT: travel & stay ---------- */
const PLAN_CARDS = [
  { title: 'Nearest Airport', text: 'Add airport / station details.' },
  { title: 'Recommended Stay', text: 'Add hotel names & booking links.' },
  { title: 'Getting Around', text: 'Add local transport / shuttle info.' }
];

/* ---------- Easter egg hunt targets ---------- */
const EGGS = [
  { id: 'couple', name: 'The Hero Portrait', emoji: '💑' },
  { id: 'photo', name: 'The Quote Photo', emoji: '📷' },
  { id: 'hearts', name: 'Footer Hearts', emoji: '❦' },
  { id: 'monogram', name: 'The Monogram', emoji: '✦' }
];

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initEnvelope();
  initPetals();
  initNav();
  initReveal();
  renderStory();
  renderScoreboard();
  renderEvents();
  renderKit();
  renderPlan();
  initAunty();
  initScratch();
  initCountdown();
  initGuestbook();
  initEggs();
});

/* ===================== ENVELOPE STARS ===================== */
function initStars(){
  const wrap = document.getElementById('env-stars');
  if (!wrap) return;
  for (let i = 0; i < 40; i++){
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (-Math.random() * 3) + 's';
    wrap.appendChild(s);
  }
}

/* ===================== ENVELOPE OPEN + FOIL WIPE ===================== */
function initEnvelope(){
  const envelope = document.getElementById('envelope');
  const screen = document.getElementById('envelope-screen');
  const foil = document.getElementById('foil-wipe');
  const wipeList = document.getElementById('wipe-list');
  const wipeProgress = foil ? foil.querySelector('.wipe-progress span') : null;
  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('music-toggle');
  if (!envelope || !screen) return;

  let opened = false;
  function open(){
    if (opened) return;
    opened = true;
    envelope.classList.add('open');

    setTimeout(() => {
      runFoilWipe(() => {
        screen.classList.add('hidden');
      });
    }, 1500);

    if (bgm){
      bgm.play().then(() => {
        if (musicToggle){
          musicToggle.hidden = false;
          musicToggle.setAttribute('aria-pressed', 'true');
        }
      }).catch(() => { /* autoplay blocked or track missing — silently ignore */ });
    }
  }

  envelope.addEventListener('click', open);
  envelope.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); }
  });

  function runFoilWipe(done){
    if (!foil || !wipeList){ done(); return; }
    const words = ['Together with their families…', 'Gautam & Shruti', 'invite you to celebrate'];
    wipeList.innerHTML = '';
    foil.classList.add('active');
    words.forEach((w, i) => {
      const li = document.createElement('li');
      li.textContent = w;
      li.style.animationDelay = (i * 0.5) + 's';
      wipeList.appendChild(li);
    });
    let progress = 0;
    const step = () => {
      progress += 100 / (words.length * 0.5 * 20);
      if (wipeProgress) wipeProgress.style.width = Math.min(progress, 100) + '%';
      if (progress < 100){ requestAnimationFrame(step); }
      else {
        setTimeout(() => {
          foil.classList.remove('active');
          done();
        }, 350);
      }
    };
    requestAnimationFrame(step);
  }

  if (musicToggle && bgm){
    musicToggle.addEventListener('click', () => {
      if (bgm.paused){
        bgm.play().catch(() => {});
        musicToggle.setAttribute('aria-pressed', 'true');
      } else {
        bgm.pause();
        musicToggle.setAttribute('aria-pressed', 'false');
      }
    });
  }
}

/* ===================== HERO PETALS ===================== */
function initPetals(){
  const container = document.getElementById('hero-petals');
  if (!container) return;
  const tints = ['#d98a93', '#e8b4b8', '#c98f57'];
  const isSmall = window.matchMedia('(max-width: 820px)').matches;
  const count = isSmall ? 16 : 28;
  for (let i = 0; i < count; i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const tint = tints[Math.floor(Math.random() * tints.length)];
    const depth = Math.random();
    p.style.background = tint;
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (6 + depth * 9) + 'px';
    p.style.height = (6 + depth * 9) + 'px';
    p.style.opacity = String(0.45 + depth * 0.5);
    p.style.filter = depth < 0.4 ? 'blur(1.5px)' : 'none';
    p.style.animationDuration = (9 + Math.random() * 8) + 's';
    p.style.animationDelay = (-Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

/* ===================== NAV / EGG PANEL TOGGLE ===================== */
function initNav(){
  const btn = document.getElementById('egg-counter');
  const panel = document.getElementById('egg-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (!panel.hidden && !panel.contains(e.target) && e.target !== btn){
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===================== REVEAL ON SCROLL ===================== */
function initReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(el => io.observe(el));
}

/* ===================== RENDER: STORY ===================== */
function renderStory(){
  const wrap = document.getElementById('storyboard');
  if (!wrap) return;
  STORY.forEach(chapter => {
    const div = document.createElement('div');
    div.className = 'story-chapter';
    div.setAttribute('data-reveal', '');
    div.innerHTML = `
      <div class="icon">${chapter.icon}</div>
      <div>
        <div class="story-meta">${chapter.meta}</div>
        <h3>${chapter.title}</h3>
        <p>${chapter.text}</p>
      </div>`;
    wrap.appendChild(div);
  });
  initReveal();
}

/* ---------- Tug-of-war reaction lines: drag it to one side and they react ---------- */
const TUG_REACTIONS = {
  groom: {
    accused: ['😤 That\'s so not true!', '😠 Wait, what?!', '🙄 Since when?!', '😳 Who told you that?'],
    teasing: ['😏 Aww, did I upset you?', '😅 Maybe a little true though...', '😬 Don\'t be mad...', '🙈 I said what I said.']
  },
  bride: {
    accused: ['😠 Excuse me?!', '😤 That is SO not true!', '🙄 Who told you that?', '😳 I did NOT!'],
    teasing: ['😬 I didn\'t say anything!', '😅 It wasn\'t me, I swear...', '🥲 Please don\'t look at me like that', '🙈 No comment.']
  }
};
function randomFrom(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

/* ===================== RENDER: SCOREBOARD ===================== */
function renderScoreboard(){
  const wrap = document.getElementById('score-rows');
  if (!wrap) return;
  SCOREBOARD.forEach((row, i) => {
    const div = document.createElement('div');
    div.className = 'score-row';
    div.innerHTML = `
      <div class="score-row-label">${row.label}</div>
      <div class="tug-bar">
        <div class="tug-avatar-wrap">
          <div class="tug-avatar tug-groom"><img src="character_images/groom.png" alt="Gautam"></div>
          <span class="tug-bubble" data-bubble="groom"></span>
        </div>
        <div class="tug-track" data-row="${i}" role="slider" tabindex="0"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="${row.him}"
             aria-label="${row.label} — drag toward Gautam or Shruti">
          <div class="tug-fill" style="width:${row.him}%"></div>
          <div class="tug-handle" style="left:${row.him}%"></div>
        </div>
        <div class="tug-avatar-wrap">
          <div class="tug-avatar tug-bride"><img src="character_images/bride.png" alt="Shruti"></div>
          <span class="tug-bubble" data-bubble="bride"></span>
        </div>
      </div>`;
    wrap.appendChild(div);
  });
  initTugBars();
}

function initTugBars(){
  document.querySelectorAll('.tug-track').forEach(track => {
    const row = track.closest('.score-row');
    const fill = row.querySelector('.tug-fill');
    const handle = row.querySelector('.tug-handle');
    const groomBubble = row.querySelector('[data-bubble="groom"]');
    const brideBubble = row.querySelector('[data-bubble="bride"]');
    let zone = 'mid';
    let dragging = false;

    function showBubble(el, text){
      el.textContent = text;
      el.classList.add('show');
    }
    function hideBubble(el){ el.classList.remove('show'); }

    function setPercent(pct, triggerReaction){
      pct = Math.max(0, Math.min(100, pct));
      fill.style.width = pct + '%';
      handle.style.left = pct + '%';
      track.setAttribute('aria-valuenow', String(Math.round(pct)));

      let newZone = 'mid';
      if (pct <= 15) newZone = 'groom';
      else if (pct >= 85) newZone = 'bride';

      if (triggerReaction && newZone !== zone && newZone !== 'mid'){
        if (newZone === 'groom'){
          showBubble(groomBubble, randomFrom(TUG_REACTIONS.groom.accused));
          showBubble(brideBubble, randomFrom(TUG_REACTIONS.bride.teasing));
        } else {
          showBubble(brideBubble, randomFrom(TUG_REACTIONS.bride.accused));
          showBubble(groomBubble, randomFrom(TUG_REACTIONS.groom.teasing));
        }
      }
      if (newZone === 'mid'){
        hideBubble(groomBubble);
        hideBubble(brideBubble);
      }
      zone = newZone;
    }

    function pctFromEvent(e){
      const rect = track.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    }

    track.addEventListener('pointerdown', e => {
      dragging = true;
      track.setPointerCapture(e.pointerId);
      setPercent(pctFromEvent(e), true);
    });
    track.addEventListener('pointermove', e => {
      if (!dragging) return;
      setPercent(pctFromEvent(e), true);
    });
    track.addEventListener('pointerup', () => { dragging = false; });
    track.addEventListener('pointercancel', () => { dragging = false; });

    track.addEventListener('keydown', e => {
      const current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft'){ setPercent(current - 5, true); e.preventDefault(); }
      if (e.key === 'ArrowRight'){ setPercent(current + 5, true); e.preventDefault(); }
    });
  });
}

/* ===================== RENDER: EVENTS ===================== */
function renderEvents(){
  const wrap = document.getElementById('events-board');
  if (!wrap) return;
  EVENTS.forEach(ev => {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `
      <div class="icon">${ev.icon}</div>
      <div class="label">${ev.label}</div>
      <h3>${ev.name}</h3>
      <p><strong>Date:</strong> ${ev.date}</p>
      <p><strong>Time:</strong> ${ev.time}</p>
      <p><strong>Venue:</strong> ${ev.venue}</p>`;
    wrap.appendChild(div);
  });
}

/* ===================== RENDER: KIT ===================== */
function renderKit(){
  const wrap = document.getElementById('kit-grid');
  if (!wrap) return;
  KIT.forEach(item => {
    const div = document.createElement('div');
    div.className = 'kit-card';
    div.setAttribute('data-reveal', '');
    div.innerHTML = `<div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p>`;
    wrap.appendChild(div);
  });
  initReveal();
}

/* ===================== RENDER: PLAN ===================== */
function renderPlan(){
  const wrap = document.getElementById('plan-grid');
  if (!wrap) return;
  PLAN_CARDS.forEach(card => {
    const div = document.createElement('div');
    div.className = 'plan-card';
    div.innerHTML = `<h4>${card.title}</h4><p>${card.text}</p>`;
    wrap.appendChild(div);
  });
}

/* ===================== AUNTY-O-METER ===================== */
function initAunty(){
  const btn = document.getElementById('aunty-btn');
  const quote = document.getElementById('aunty-quote');
  const meta = document.getElementById('aunty-meta');
  if (!btn || !quote) return;
  let last = -1;
  btn.addEventListener('click', () => {
    let i = Math.floor(Math.random() * AUNTY_QUOTES.length);
    if (i === last) i = (i + 1) % AUNTY_QUOTES.length;
    last = i;
    quote.textContent = '"' + AUNTY_QUOTES[i] + '"';
    if (meta) meta.textContent = 'Brace yourself — this one\'s coming at the reception.';
  });
}

/* ===================== SCRATCH-OFF DATE REVEAL ===================== */
function initScratch(){
  const scratch = document.getElementById('scratch');
  const canvas = document.getElementById('scratch-foil');
  const hint = document.getElementById('scratch-hint');
  if (!scratch || !canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let revealed = false;

  function size(){
    const rect = scratch.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawFoil();
  }

  function drawFoil(){
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, '#d9b98a');
    g.addColorStop(0.5, '#f1dfb8');
    g.addColorStop(1, '#b3894f');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(74,20,29,.85)';
    ctx.font = '600 15px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal the date', canvas.width / 2, canvas.height / 2);
  }

  window.addEventListener('resize', size);
  size();
  if (hint) hint.hidden = false;

  let drawing = false;
  function erase(x, y){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  }
  function pos(e){
    const rect = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - rect.left, y: p.clientY - rect.top };
  }
  function checkCleared(){
    if (revealed) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 37){
      total++;
      if (data[i] < 40) cleared++;
    }
    if (total && cleared / total > 0.5){
      revealed = true;
      canvas.style.transition = 'opacity .5s ease';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
      if (hint) hint.hidden = true;
      burstConfetti();
    }
  }
  function start(e){ drawing = true; const p = pos(e); erase(p.x, p.y); }
  function move(e){ if (!drawing) return; const p = pos(e); erase(p.x, p.y); checkCleared(); }
  function end(){ drawing = false; checkCleared(); }

  canvas.addEventListener('pointerdown', start);
  canvas.addEventListener('pointermove', move);
  window.addEventListener('pointerup', end);
  canvas.addEventListener('touchstart', start, { passive: true });
  canvas.addEventListener('touchmove', move, { passive: true });
  window.addEventListener('touchend', end);

  scratch.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      checkCleared();
    }
  });
}

function burstConfetti(){
  const wrap = document.getElementById('reveal-confetti');
  if (!wrap) return;
  const colors = ['#6d1f2b', '#b3894f', '#d9b98a', '#8a2a38'];
  for (let i = 0; i < 60; i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animation = `fall ${2 + Math.random() * 1.5}s ease-in ${Math.random() * 0.3}s forwards`;
    wrap.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

/* ===================== COUNTDOWN ===================== */
function initCountdown(){
  const days = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins = document.getElementById('cd-mins');
  const secs = document.getElementById('cd-secs');
  const msg = document.getElementById('countdown-msg');
  if (!days) return;

  function tick(){
    const diff = ENGAGEMENT_DATE.getTime() - Date.now();
    if (diff <= 0){
      days.textContent = hours.textContent = mins.textContent = secs.textContent = '0';
      if (msg) msg.textContent = "They're engaged! 💍";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    days.textContent = String(d);
    hours.textContent = String(h).padStart(2, '0');
    mins.textContent = String(m).padStart(2, '0');
    secs.textContent = String(s).padStart(2, '0');
  }
  tick();
  const timer = setInterval(tick, 1000);
}

/* ===================== GUESTBOOK / BLESSINGS ===================== */
const GB_KEY = 'gs_guestbook';

function loadBlessings(){
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch (e) { return []; }
}
function saveBlessings(list){
  localStorage.setItem(GB_KEY, JSON.stringify(list));
}

function initGuestbook(){
  const nameInput = document.getElementById('gb-name');
  const toSelect = document.getElementById('gb-to');
  const msgInput = document.getElementById('gb-msg');
  const charCount = document.getElementById('gb-char-count');
  const submitBtn = document.getElementById('gb-submit');
  const wall = document.getElementById('guestbook-wall');
  const countLabel = document.getElementById('blessing-count');
  if (!wall) return;

  function render(){
    const list = loadBlessings();
    wall.innerHTML = '';
    if (countLabel){
      countLabel.textContent = list.length
        ? `${list.length} blessing${list.length === 1 ? '' : 's'} and counting`
        : 'Be the first to leave one';
    }
    if (!list.length){
      wall.innerHTML = '<div class="gb-empty">No blessings yet — start the wall!</div>';
      return;
    }
    list.slice().reverse().forEach(b => {
      const card = document.createElement('div');
      card.className = 'gb-card';
      card.innerHTML = `
        <div class="gb-card-top"><span>${escapeHtml(b.name)}</span><span>${escapeHtml(b.to)}</span></div>
        <p>"${escapeHtml(b.msg)}"</p>`;
      wall.appendChild(card);
    });
  }

  if (msgInput && charCount){
    msgInput.addEventListener('input', () => {
      charCount.textContent = String(280 - msgInput.value.length);
    });
  }

  if (submitBtn){
    submitBtn.addEventListener('click', () => {
      const name = (nameInput.value || '').trim();
      const msg = (msgInput.value || '').trim();
      const to = toSelect ? toSelect.value : 'Both Families';
      if (!name || !msg) return;
      const list = loadBlessings();
      list.push({ name, to, msg });
      saveBlessings(list);
      nameInput.value = '';
      msgInput.value = '';
      if (charCount) charCount.textContent = '280';
      render();
    });
  }

  render();
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===================== EASTER EGG HUNT ===================== */
function initEggs(){
  const totalEl = document.getElementById('egg-total');
  const foundEl = document.getElementById('egg-found');
  const listEl = document.getElementById('egg-list');
  const toast = document.getElementById('egg-toast');
  const toastEmoji = document.getElementById('egg-toast-emoji');
  const toastName = document.getElementById('egg-toast-name');
  if (!totalEl) return;

  const found = new Set();
  totalEl.textContent = String(EGGS.length);

  EGGS.forEach(egg => {
    const li = document.createElement('li');
    li.textContent = egg.name;
    li.dataset.egg = egg.id;
    listEl.appendChild(li);
  });

  document.querySelectorAll('[data-egg]').forEach(target => {
    target.addEventListener('click', () => {
      const id = target.dataset.egg;
      const egg = EGGS.find(e => e.id === id);
      if (!egg || found.has(id)) return;
      found.add(id);
      foundEl.textContent = String(found.size);
      const li = listEl.querySelector(`li[data-egg="${id}"]`);
      if (li) li.classList.add('found');
      showToast(egg);
    });
  });

  function showToast(egg){
    if (!toast) return;
    toastEmoji.textContent = egg.emoji;
    toastName.textContent = egg.name;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  }
}
