/* ============================================================
   ZB TOKEN — Shared effects
   Étoiles cosmiques, comètes, easter eggs (Konami + console)
   Loaded on every page for consistent experience
   ============================================================ */

(function() {
  'use strict';

  // Respect accessibility
  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== STARFIELD =====
  function createStarfield() {
    // Don't double-add if already there
    if (document.getElementById('cosmic-stars-layer')) return null;

    var layer = document.createElement('div');
    layer.id = 'cosmic-stars-layer';
    layer.className = 'cosmic-layer';
    layer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.appendChild(layer);

    var starCount = window.innerWidth < 768 ? 60 : 120;
    for (var i = 0; i < starCount; i++) {
      var star = document.createElement('div');
      var rng = Math.random();
      var color = '#fff', glow = '';
      if (rng < 0.10) { color = '#00E83D'; glow = ',0 0 4px #00E83D'; }
      else if (rng < 0.15) { color = '#FF8C1A'; glow = ',0 0 4px #FF8C1A'; }

      var size = Math.random() < 0.3 ? 3 : 2;
      var dur = (2 + Math.random() * 4);
      var delay = Math.random() * 5;

      star.style.cssText =
        'position:absolute;' +
        'left:' + (Math.random() * 100) + 'vw;' +
        'top:' + (Math.random() * 100) + 'vh;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'background:' + color + ';' +
        'border-radius:50%;' +
        'box-shadow:0 0 0 transparent' + glow + ';' +
        'animation:cosmicTwinkle ' + dur + 's ease-in-out ' + delay + 's infinite;';
      layer.appendChild(star);
    }
    return layer;
  }

  // ===== COMETS =====
  function launchComet(layer) {
    if (!layer) return;
    var comet = document.createElement('div');
    var rng = Math.random();
    var color = '#fff', tailColor = 'rgba(255,255,255,0.9)';
    if (rng < 0.4) { color = '#00E83D'; tailColor = 'rgba(0,232,61,0.9)'; }
    else if (rng < 0.7) { color = '#FF8C1A'; tailColor = 'rgba(255,140,26,0.9)'; }

    comet.style.cssText =
      'position:absolute;width:2px;height:2px;border-radius:50%;' +
      'background:' + color + ';' +
      'box-shadow:0 0 8px ' + color + ',0 0 16px rgba(255,255,255,0.6);' +
      'pointer-events:none;';

    // Tail using ::before via inline span
    var tail = document.createElement('span');
    tail.style.cssText =
      'position:absolute;top:50%;right:0;width:80px;height:1px;' +
      'background:linear-gradient(to left, ' + tailColor + ', transparent);' +
      'transform:translateY(-50%);';
    comet.appendChild(tail);

    var startX = Math.random() * 50;
    var startY = Math.random() * 30;
    var endX = startX + 60 + Math.random() * 30;
    var endY = startY + 40 + Math.random() * 30;
    var duration = 1500 + Math.random() * 1500;

    comet.style.left = startX + 'vw';
    comet.style.top = startY + 'vh';
    layer.appendChild(comet);

    var startTime = performance.now();
    function animate(now) {
      var elapsed = now - startTime;
      var p = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - p, 2);
      comet.style.left = (startX + (endX - startX) * eased) + 'vw';
      comet.style.top = (startY + (endY - startY) * eased) + 'vh';
      comet.style.opacity = p < 0.1 ? p * 10 : (p > 0.85 ? (1 - p) * 6.6 : 1);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        comet.remove();
      }
    }
    requestAnimationFrame(animate);
  }

  function startCometCycle(layer) {
    function loop() {
      launchComet(layer);
      var nextDelay = 25000 + Math.random() * 35000;
      setTimeout(loop, nextDelay);
    }
    setTimeout(loop, 8000);
  }

  // ===== TRAVELING ALIENS =====
  function launchTravelingAlien(layer) {
    if (!layer) return;
    var img = document.createElement('img');
    var isGreen = Math.random() < 0.5;
    img.src = isGreen ? 'images/ufo-green.png' : 'images/ufo-orange.png';
    img.alt = '';

    // UFOs are 100x60, so size sets width
    // Smaller on mobile to not take too much space
    var isMobile = window.innerWidth < 600;
    var minSize = isMobile ? 50 : 70;
    var maxSize = isMobile ? 80 : 120;
    var size = minSize + Math.random() * (maxSize - minSize);
    // Random vertical position
    var startY = 10 + Math.random() * 75; // 10-85vh
    // Direction: 50% left-to-right, 50% right-to-left
    var leftToRight = Math.random() < 0.5;
    // Slight vertical drift
    var endY = startY + (Math.random() * 20 - 10);
    // More pronounced wobble for UFO floating effect
    var wobbleAmplitude = 1.5 + Math.random() * 1.5; // 1.5-3 vh
    // Slow majestic speed
    var duration = 16000 + Math.random() * 10000;

    var glowColor = isGreen ? '0 0 22px rgba(0,232,61,0.7)' : '0 0 22px rgba(255,140,26,0.7)';
    img.style.cssText =
      'position:absolute;width:' + size + 'px;height:auto;' +
      'pointer-events:none;opacity:0;' +
      'filter:drop-shadow(' + glowColor + ') drop-shadow(0 2px 4px rgba(0,0,0,0.5));' +
      (leftToRight ? '' : 'transform:scaleX(-1);'); // mirror if right-to-left

    layer.appendChild(img);

    var startX = leftToRight ? -10 : 110;
    var endX = leftToRight ? 110 : -10;

    img.style.left = startX + 'vw';
    img.style.top = startY + 'vh';

    var startTime = performance.now();
    function animate(now) {
      var elapsed = now - startTime;
      var p = Math.min(elapsed / duration, 1);
      var eased = p;
      var currentX = startX + (endX - startX) * eased;
      // UFO bobbing motion (more pronounced sine wave)
      var currentY = startY + (endY - startY) * eased
                     + Math.sin(p * Math.PI * 6) * wobbleAmplitude;

      img.style.left = currentX + 'vw';
      img.style.top = currentY + 'vh';
      // Fade in/out at edges
      var opacity = 1;
      if (p < 0.08) opacity = p / 0.08;
      else if (p > 0.92) opacity = (1 - p) / 0.08;
      img.style.opacity = opacity * 0.9;

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        img.remove();
      }
    }
    requestAnimationFrame(animate);
  }

  function startTravelingAliens(layer) {
    function loop() {
      launchTravelingAlien(layer);
      // Random interval: 15 to 40 seconds
      var nextDelay = 15000 + Math.random() * 25000;
      setTimeout(loop, nextDelay);
    }
    // First alien after 4 seconds (so user sees something quickly)
    setTimeout(loop, 4000);
  }

  // Add the keyframes for star twinkle
  function injectKeyframes() {
    if (document.getElementById('cosmic-keyframes')) return;
    var style = document.createElement('style');
    style.id = 'cosmic-keyframes';
    style.textContent =
      '@keyframes cosmicTwinkle {' +
      '0%, 100% { opacity: 0.2; transform: scale(0.8); }' +
      '50% { opacity: 0.9; transform: scale(1.2); }' +
      '}';
    document.head.appendChild(style);
  }

  // ===== KONAMI CODE =====
  function setupKonami() {
    var seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
               'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var i = 0;
    document.addEventListener('keydown', function(e) {
      if (e.key === seq[i]) {
        i++;
        if (i === seq.length) {
          i = 0;
          var el = document.createElement('div');
          el.style.cssText =
            'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
            'background:rgba(0,0,0,0.95);border:2px solid #FF8C1A;' +
            'padding:30px 40px;color:#FF8C1A;' +
            'font-family:Courier New,monospace;font-size:14px;' +
            'z-index:99999;text-align:center;letter-spacing:2px;' +
            'box-shadow:0 0 50px rgba(255,140,26,0.5);' +
            'opacity:0;transition:opacity 0.4s;';
          el.innerHTML = '[ SECRET ]<br><br>// you found the signal //<br>// the aliens see you //<br>// 6a4b...c0de //';
          document.body.appendChild(el);
          requestAnimationFrame(function() {
            el.style.opacity = '1';
          });
          setTimeout(function() {
            el.style.opacity = '0';
            setTimeout(function() { el.remove(); }, 400);
          }, 4500);

          console.log('%c // SECRET MODE ACTIVATED //',
            'color: #FF8C1A; font-size: 18px; font-weight: bold;');
          console.log('%c block 710,968 was the answer.',
            'color: #00E83D; font-size: 12px;');
        }
      } else {
        i = 0;
      }
    });
  }

  // ===== CONSOLE EASTER EGG =====
  function showConsoleArt() {
    var asciiArt = [
      '',
      '   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557',
      '   \u2551         ZB_TOKEN :: SOURCE CODE OPEN          \u2551',
      '   \u2551                                               \u2551',
      '   \u2551   you are looking at the code.                \u2551',
      '   \u2551   good. trust nothing. verify everything.     \u2551',
      '   \u2551                                               \u2551',
      '   \u2551   contract::zts13sl7jccgrflw7u9rfsvzp7        \u2551',
      '   \u2551   supply::21,000,000                          \u2551',
      '   \u2551   network::zenon                              \u2551',
      '   \u2551                                               \u2551',
      '   \u2551   konami code reveals more.                   \u2551',
      '   \u2551   the cypherpunks know.                       \u2551',
      '   \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d',
      ''
    ].join('\n');
    console.log('%c' + asciiArt,
      'color: #00E83D; font-family: monospace; font-size: 12px;');
    console.log('%c // those who decode this find the next signal //',
      'color: #FF8C1A; font-style: italic;');
  }

  // ===== KONAMI HINT (subtle visual clue) =====
  function injectKonamiHint() {
    if (document.getElementById('konami-hint')) return;
    var hint = document.createElement('div');
    hint.id = 'konami-hint';
    hint.title = 'try the ancient sequence';
    hint.style.cssText =
      'position:fixed;bottom:14px;right:14px;' +
      'font-family:Courier New,monospace;font-size:9px;letter-spacing:3px;' +
      'color:rgba(255,140,26,0.18);' +
      'pointer-events:none;z-index:9990;' +
      'user-select:none;text-align:right;line-height:1.4;' +
      'transition:color 0.4s, letter-spacing 0.4s;';
    hint.innerHTML = '↑↑↓↓←→←→ b a';

    // On hover (via parent body listener since pointer-events is none),
    // the hint becomes more visible after the user has been on the page for a while
    document.body.appendChild(hint);

    // After 20 seconds, slightly increase visibility (subtle nudge)
    setTimeout(function() {
      hint.style.color = 'rgba(255,140,26,0.32)';
    }, 20000);
  }

  // ===== INIT =====
  function init() {
    showConsoleArt();
    setupKonami();
    injectKonamiHint();
    if (reduceMotion) return;
    injectKeyframes();
    var layer = createStarfield();
    if (layer) {
      startCometCycle(layer);
      startTravelingAliens(layer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
