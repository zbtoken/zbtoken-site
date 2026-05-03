/* ============================================
   ZB MENU BURGER — Auto-inject navigation
   Just include this script on any page
   ============================================ */

(function() {
  'use strict';

  // Don't inject on the teaser page (it has its own controls)
  if (window.location.pathname.includes('teaser.html')) return;

  // Detect current page for active state
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const menuHTML = `
    <button class="zb-menu-btn" id="zbMenuBtn" aria-label="Open menu">
      <span class="bar bar1"></span>
      <span class="bar bar2"></span>
      <span class="bar bar3"></span>
    </button>
    <div class="zb-menu-backdrop" id="zbMenuBackdrop"></div>
    <nav class="zb-menu-panel" id="zbMenuPanel" aria-label="Main navigation">
      <div class="zb-menu-header">
        <div class="tag">// NAVIGATION //</div>
        <div class="title">ZB :: PROTOCOL</div>
      </div>

      <div class="zb-menu-section">// CORE //</div>
      <ul class="zb-menu-list">
        <li><a href="index.html" class="zb-menu-link" data-page="index.html"><span>BASE</span><span class="arrow">→</span></a></li>
        <li><a href="manifesto.html" class="zb-menu-link" data-page="manifesto.html"><span>MANIFESTO</span><span class="arrow">→</span></a></li>
        <li><a href="whitepaper.html" class="zb-menu-link orange" data-page="whitepaper.html"><span>WHITEPAPER</span><span class="arrow">→</span></a></li>
      </ul>

      <div class="zb-menu-section">// PROTOCOL //</div>
      <ul class="zb-menu-list">
        <li><a href="token.html" class="zb-menu-link" data-page="token.html"><span>TOKEN</span><span class="arrow">→</span></a></li>
        <li><a href="universe.html" class="zb-menu-link" data-page="universe.html"><span>UNIVERSE</span><span class="arrow">→</span></a></li>
        <li><a href="game.html" class="zb-menu-link" data-page="game.html"><span>GAME</span><span class="arrow">→</span></a></li>
        <li><a href="roadmap.html" class="zb-menu-link" data-page="roadmap.html"><span>ROADMAP</span><span class="arrow">→</span></a></li>
      </ul>

      <div class="zb-menu-section">// COMMUNITY //</div>
      <ul class="zb-menu-list">
        <li><a href="assembly.html" class="zb-menu-link orange" data-page="assembly.html"><span>ASSEMBLY</span><span class="arrow">→</span></a></li>
        <li><a href="signal.html" class="zb-menu-link orange" data-page="signal.html"><span>SIGNAL WALL</span><span class="arrow">→</span></a></li>
        <li><a href="faq.html" class="zb-menu-link" data-page="faq.html"><span>FAQ</span><span class="arrow">→</span></a></li>
      </ul>

      <div class="zb-menu-footer">
        // we are anonymous. we are many. we are ZB. //
      </div>
    </nav>
  `;

  // Inject
  const container = document.createElement('div');
  container.innerHTML = menuHTML;
  document.body.appendChild(container);

  // Mark active page
  const activeLink = document.querySelector(`.zb-menu-link[data-page="${currentPage}"]`);
  if (activeLink) activeLink.classList.add('active');

  const btn = document.getElementById('zbMenuBtn');
  const panel = document.getElementById('zbMenuPanel');
  const backdrop = document.getElementById('zbMenuBackdrop');

  function openMenu() {
    btn.classList.add('open');
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('zb-menu-locked');
  }
  function closeMenu() {
    btn.classList.remove('open');
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('zb-menu-locked');
  }
  function toggleMenu() {
    if (panel.classList.contains('open')) closeMenu();
    else openMenu();
  }

  btn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeMenu();
  });
})();
