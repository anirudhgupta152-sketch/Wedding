/* =====================================================
   Gautam & Shruti — Engagement Invitation
   EDIT: search "EDIT:" for the spots you'll want to touch
   ===================================================== */

/* ---------- EDIT: the big day & time (used by the countdown + scratch reveal) ---------- */
const ENGAGEMENT_DATE = new Date('2026-10-22T19:00:00+05:30');

/* ---------- Tap-to-react lines when you click Gautam or Shruti ---------- */
const GROOM_LINES = [
  '😅 Kurta says calm, heart says nervous.',
  '🕺 I practiced this walk for a week.',
  '😎 Best decision of my life, no pressure.',
  '🤵 Trying not to cry before she does.',
  '😂 Someone please stop my dad from crying.',
  '💍 Yes, I already almost lost the ring today.'
];
const BRIDE_LINES = [
  '💄 Rehearsed this smile for a week.',
  '👗 This outfit better survive the dancing.',
  '🥹 Don\'t make me cry, my makeup took 2 hours.',
  '😍 Still can\'t believe this is happening.',
  '💃 Save me a spot on the dance floor.',
  '😂 Where\'s the chai, I need my energy.'
];

/* ---------- EDIT: Our Story chapters ---------- */
const STORY = [
  { icon: '💌', meta: '20th October 2022', title: 'First Met', text: 'A simple hello became the beginning of our forever.' },
  { icon: '💍', meta: '2nd October 2023', title: 'The Proposal', text: 'One question, one beautiful yes, and forever began.' },
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

/* ---------- EDIT: the celebration ---------- */
const EVENTS = [
  { icon: '💍', label: 'Function', name: 'Engagement Ceremony', date: 'Thursday, 22 October 2026', time: '7:00 PM onwards', venue: 'Starland Banquets, 99 Satguru Ram Singh Marg, New Delhi, DL' }
];

/* ---------- Engagement Survival Kit ---------- */
const KIT = [
  { icon: '👟', title: 'Comfortable Footwear', text: 'Heels and hours of dancing don\'t mix — pack a backup pair.' },
  { icon: '💧', title: 'Stay Hydrated', text: 'Between the dholak and the dancing, water breaks are sacred.' },
  { icon: '📸', title: 'Camera Ready', text: 'Someone will always be filming a reel — smile through it.' },
  { icon: '❤️', title: 'Meet the Fam', text: 'There\'s always someone new to meet at an Indian Wedding.' },
  { icon: '🕺', title: 'Dance Moves', text: 'Practice at least one signature step before the Sangeet.' },
  { icon: '☕', title: 'Power Naps', text: 'Engagement season runs on chai and short naps. Budget both.' }
];

/* ---------- Random "aunty" questions ---------- */
const AUNTY_QUOTES = [
  'Beta, when is YOUR engagement happening?',
  'Arre you\'ve put on weight since the engagement, no?',
  'So what does your salary package look like these days?',
  'Why are you still single, beta?',
  'Love marriage or arranged, tell me honestly.',
  'Have you tried the paneer? I made your plate myself.',
  'Will you also wear this much makeup at your own engagement?'
];

/* ---------- EDIT: venue & directions ---------- */
const PLAN_CARDS = [
  { icon: '📍', title: 'Venue & Directions', text: 'Starland Banquets, 99 Satguru Ram Singh Marg, New Delhi', link: 'https://maps.app.goo.gl/XdLvHjSrkrbZ34Tu7?g_st=iw', linkText: 'Open in Google Maps' }
];

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initEnvelope();
  initPetals();
  initReveal();
  renderStory();
  renderScoreboard();
  renderEvents();
  renderKit();
  renderPlan();
  initAunty();
  initCountdown();
  initCharacterBubbles();
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
    div.innerHTML = `
      ${card.icon ? `<div class="plan-icon">${card.icon}</div>` : ''}
      <h4>${card.title}</h4>
      <p>${card.text}</p>
      ${card.link ? `<a class="plan-link" href="${card.link}" target="_blank" rel="noopener">${card.linkText}</a>` : ''}`;
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

/* ===================== TAP-TO-REACT PORTRAITS ===================== */
function initCharacterBubbles(){
  document.querySelectorAll('.hero-char, .couple-photo').forEach(img => {
    img.addEventListener('click', () => {
      const container = img.parentElement;
      const bubble = container.querySelector('.char-bubble');
      if (!bubble) return;

      const isGroom = img.classList.contains('groom');
      const lines = isGroom ? GROOM_LINES : BRIDE_LINES;
      bubble.textContent = randomFrom(lines);

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const centerX = imgRect.left + imgRect.width / 2 - containerRect.left;
      bubble.style.left = centerX + 'px';

      bubble.classList.add('show');
      clearTimeout(bubble._hideTimer);
      bubble._hideTimer = setTimeout(() => bubble.classList.remove('show'), 2800);
    });
  });
}
