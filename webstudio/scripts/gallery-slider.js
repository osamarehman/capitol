/**
 * Capitol Improvements — Injectable Gallery Slider
 *
 * Drop-in component: place a div with data-inject="gallery-slider" anywhere.
 * The script populates it with a horizontal slider + GLightbox lightbox.
 *
 * Each gallery record shows ONE main thumbnail card. Clicking opens a lightbox
 * with ALL images for that project (main + image1-7), grouped per gallery.
 *
 * Data source: Strapi CMS API (public read on /api/galleries)
 * Dependencies: GLightbox (loaded by global.js) — gracefully degrades without it.
 */

(function () {
  'use strict';

  var CMS = 'https://cms.improveitmd.com';
  var API = CMS + '/api/galleries?populate=*&pagination%5BpageSize%5D=100&status=published';

  // ── Styles ──────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('ci-gallery-slider-css')) return;
    var style = document.createElement('style');
    style.id = 'ci-gallery-slider-css';
    style.textContent = [
      '.ci-gallery {',
      '  --_gap: var(--ci-slide-gap, 14px);',
      '  --_radius: var(--ci-radius, 10px);',
      '  --_ratio: var(--ci-slide-ratio, 3 / 4);',
      '  --_bg: var(--ci-slide-bg, #e8ebed);',
      '  --_arrow: var(--ci-arrow-size, 46px);',
      '  --_cols: 1.15;',
      '  --_navy: #00192e;',
      '  --_green: #079a4a;',
      '  font-family: "Futura PT", "DM Sans", sans-serif;',
      '  width: 100%; max-width: 100%;',
      '  box-sizing: border-box;',
      '  overflow: hidden;',
      '  overflow-anchor: none;',
      '  contain: layout style;',
      '}',
      '.ci-gallery *, .ci-gallery *::before, .ci-gallery *::after { box-sizing: border-box; }',
      '',
      '/* ── Header ── */',
      '.ci-gallery__header { margin-bottom: 28px; }',
      '.ci-gallery__heading {',
      '  font-size: clamp(1.5rem, 3.5vw, 2.25rem);',
      '  font-weight: 700; line-height: 1.15; margin: 0 0 6px;',
      '  color: var(--_navy); letter-spacing: -0.01em;',
      '}',
      '.ci-gallery__sub {',
      '  font-size: clamp(0.9rem, 2vw, 1.05rem);',
      '  color: #5a6a78; margin: 0; line-height: 1.55;',
      '  font-weight: 400;',
      '}',
      '',
      '/* ── Track ── */',
      '.ci-gallery__wrap { position: relative; overflow: hidden; }',
      '.ci-gallery__track {',
      '  display: flex; gap: var(--_gap);',
      '  overflow-x: auto; scroll-snap-type: x mandatory;',
      '  -webkit-overflow-scrolling: touch;',
      '  scrollbar-width: none;',
      '  scroll-behavior: smooth;',
      '  padding-bottom: 4px;',
      '}',
      '.ci-gallery__track::-webkit-scrollbar { display: none; }',
      '',
      '/* ── Card ── */',
      '.ci-gallery__slide {',
      '  flex: 0 0 calc((100% - var(--_cols) * var(--_gap)) / var(--_cols));',
      '  min-width: 0;',
      '  scroll-snap-align: start;',
      '  border-radius: var(--_radius);',
      '  overflow: hidden; position: relative;',
      '  background: var(--_bg);',
      '  aspect-ratio: var(--_ratio);',
      '  cursor: pointer;',
      '  text-decoration: none; display: block;',
      '  transform: translateZ(0);',
      '  transition: box-shadow 0.35s cubic-bezier(0.25,0.46,0.45,0.94);',
      '}',
      '.ci-gallery__slide:hover {',
      '  box-shadow: 0 12px 40px -8px rgba(0,25,46,0.22);',
      '}',
      '',
      '/* Image */  ',
      '.ci-gallery__slide img {',
      '  width: 100%; height: 100%;',
      '  object-fit: cover; display: block;',
      '  transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);',
      '}',
      '.ci-gallery__slide:hover img { transform: scale(1.06); }',
      '',
      '/* ── Overlay (hover state) ── */',
      '.ci-gallery__overlay {',
      '  position: absolute; inset: 0;',
      '  background: linear-gradient(180deg, transparent 40%, rgba(0,25,46,0.85) 100%);',
      '  opacity: 0;',
      '  transition: opacity 0.35s ease;',
      '  display: flex; flex-direction: column;',
      '  justify-content: flex-end; padding: 20px;',
      '  pointer-events: none;',
      '}',
      '.ci-gallery__slide:hover .ci-gallery__overlay { opacity: 1; }',
      '',
      '/* Overlay — view prompt */',
      '.ci-gallery__view {',
      '  display: inline-flex; align-items: center; gap: 6px;',
      '  color: #fff; font-size: 0.8rem; font-weight: 600;',
      '  letter-spacing: 0.04em; text-transform: uppercase;',
      '  opacity: 0; transform: translateY(8px);',
      '  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;',
      '}',
      '.ci-gallery__slide:hover .ci-gallery__view {',
      '  opacity: 1; transform: translateY(0);',
      '}',
      '.ci-gallery__view svg { width: 16px; height: 16px; flex-shrink: 0; }',
      '',
      '/* ── Caption bar (always visible) ── */',
      '.ci-gallery__caption {',
      '  position: absolute; bottom: 0; left: 0; right: 0;',
      '  padding: 28px 14px 10px;',
      '  background: linear-gradient(transparent, rgba(0,25,46,0.7));',
      '  display: flex; align-items: flex-end; justify-content: space-between; gap: 8px;',
      '  pointer-events: none;',
      '  transition: opacity 0.35s ease;',
      '}',
      '.ci-gallery__slide:hover .ci-gallery__caption { opacity: 0; }',
      '',
      '.ci-gallery__title {',
      '  color: #fff; font-size: 0.82rem; font-weight: 600;',
      '  line-height: 1.3; margin: 0;',
      '  text-shadow: 0 1px 3px rgba(0,0,0,0.3);',
      '}',
      '',
      '/* Photo count badge */',
      '.ci-gallery__count {',
      '  display: inline-flex; align-items: center; gap: 4px;',
      '  background: rgba(255,255,255,0.18);',
      '  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);',
      '  border: 1px solid rgba(255,255,255,0.2);',
      '  color: #fff; font-size: 0.7rem; font-weight: 600;',
      '  padding: 3px 8px; border-radius: 20px;',
      '  white-space: nowrap; flex-shrink: 0;',
      '  letter-spacing: 0.01em;',
      '}',
      '.ci-gallery__count svg { width: 12px; height: 12px; opacity: 0.9; }',
      '',
      '/* ── Hidden lightbox links ── */',
      '.ci-gallery__lightbox-extras { display: none; }',
      '',
      '/* ── Arrows ── */',
      '.ci-gallery__arrow {',
      '  position: absolute; top: 50%; transform: translateY(-50%);',
      '  width: var(--_arrow); height: var(--_arrow); border-radius: 50%;',
      '  background: #fff; border: none;',
      '  box-shadow: 0 2px 12px rgba(0,25,46,0.12), 0 0 0 1px rgba(0,25,46,0.06);',
      '  cursor: pointer; z-index: 2;',
      '  display: flex; align-items: center; justify-content: center;',
      '  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease;',
      '  opacity: 0; pointer-events: none;',
      '}',
      '.ci-gallery__wrap:hover .ci-gallery__arrow { opacity: 1; pointer-events: auto; }',
      '.ci-gallery__arrow:hover {',
      '  transform: translateY(-50%) scale(1.08);',
      '  box-shadow: 0 4px 20px rgba(0,25,46,0.18), 0 0 0 1px rgba(0,25,46,0.08);',
      '}',
      '.ci-gallery__arrow:active { transform: translateY(-50%) scale(0.96); }',
      '.ci-gallery__arrow--prev { left: 10px; }',
      '.ci-gallery__arrow--next { right: 10px; }',
      '.ci-gallery__arrow svg { width: 18px; height: 18px; color: var(--_navy); }',
      '.ci-gallery__arrow[disabled] { opacity: 0 !important; pointer-events: none; }',
      '',
      '/* ── Loading skeleton ── */',
      '.ci-gallery__loading {',
      '  display: flex; gap: var(--_gap); overflow: hidden;',
      '}',
      '.ci-gallery__skel {',
      '  flex: 0 0 calc((100% - var(--_cols) * var(--_gap)) / var(--_cols));',
      '  aspect-ratio: var(--_ratio);',
      '  border-radius: var(--_radius);',
      '  background: linear-gradient(110deg, #e8ebed 30%, #f4f5f6 50%, #e8ebed 70%);',
      '  background-size: 200% 100%;',
      '  animation: ci-skel 1.4s ease-in-out infinite;',
      '}',
      '@keyframes ci-skel {',
      '  0% { background-position: 200% 0; }',
      '  100% { background-position: -200% 0; }',
      '}',
      '',
      '/* ── Responsive ── */',
      '@media (min-width: 640px) {',
      '  .ci-gallery { --_cols: 2.25; --_gap: var(--ci-slide-gap, 16px); }',
      '}',
      '@media (min-width: 1024px) {',
      '  .ci-gallery { --_cols: 4; --_gap: var(--ci-slide-gap, 20px); }',
      '  .ci-gallery__arrow { opacity: 0.85; pointer-events: auto; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  // ── SVG factories (safe DOM creation, no innerHTML) ────────────────────
  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function createChevronLeft() {
    var s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    s.appendChild(svgEl('polyline', { points: '15 18 9 12 15 6' }));
    return s;
  }

  function createChevronRight() {
    var s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    s.appendChild(svgEl('polyline', { points: '9 6 15 12 9 18' }));
    return s;
  }

  function createCameraIcon() {
    var s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    s.appendChild(svgEl('path', { d: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' }));
    s.appendChild(svgEl('circle', { cx: '12', cy: '13', r: '4' }));
    return s;
  }

  function createExpandIcon() {
    var s = svgEl('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    s.appendChild(svgEl('polyline', { points: '15 3 21 3 21 9' }));
    s.appendChild(svgEl('polyline', { points: '9 21 3 21 3 15' }));
    s.appendChild(svgEl('line', { x1: '21', y1: '3', x2: '14', y2: '10' }));
    s.appendChild(svgEl('line', { x1: '3', y1: '21', x2: '10', y2: '14' }));
    return s;
  }

  // ── Helpers ────────────────────────────────────────────────────────────
  function resolveUrl(url) {
    if (!url) return null;
    return url.startsWith('http') ? url : CMS + url;
  }

  function getThumbUrl(media) {
    if (!media || !media.url) return null;
    if (media.formats) {
      if (media.formats.medium && media.formats.medium.url) return resolveUrl(media.formats.medium.url);
      if (media.formats.small && media.formats.small.url) return resolveUrl(media.formats.small.url);
    }
    return resolveUrl(media.url);
  }

  // ── Data fetch ────────────────────────────────────────────────────────
  async function fetchGalleries() {
    try {
      var res = await fetch(API);
      if (!res.ok) { console.warn('[gallery-slider] API', res.status); return null; }
      var json = await res.json();
      if (!json.data) return null;

      var imgFields = ['main', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'];
      var altFields = ['altMain', 'altImg1', 'altImg2', 'altImg3', 'altImg4', 'altImg5', 'altImg6', 'altImg7'];
      var galleries = [];

      json.data.forEach(function (item) {
        var mainMedia = item.main;
        if (!mainMedia || !mainMedia.url) return;
        var images = [];
        imgFields.forEach(function (f, i) {
          var m = item[f];
          if (m && m.url) images.push({ full: resolveUrl(m.url), alt: item[altFields[i]] || item.title || '' });
        });
        galleries.push({
          title: item.title || '',
          slug: item.slug || '',
          thumb: getThumbUrl(mainMedia),
          thumbAlt: item.altMain || item.title || '',
          images: images,
        });
      });

      return galleries.length ? galleries : null;
    } catch (e) {
      console.warn('[gallery-slider] fetch error:', e.message);
      return null;
    }
  }

  // ── Shared arrow logic (used by both build and hydrate) ────────────────
  function setupArrows(wrap, track, prevBtn, nextBtn) {
    function getSlideWidth() {
      var first = track.querySelector('.ci-gallery__slide');
      if (!first) return 300;
      return first.offsetWidth + parseInt(getComputedStyle(track).gap || '16', 10);
    }

    function updateArrows() {
      var max = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= max - 2;
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      track.scrollBy({ left: -getSlideWidth() * 2, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      track.scrollBy({ left: getSlideWidth() * 2, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateArrows, { passive: true });
    requestAnimationFrame(updateArrows);

    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prevBtn.click(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { nextBtn.click(); e.preventDefault(); }
    });
    wrap.setAttribute('tabindex', '0');
  }

  function createArrowPair() {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'ci-gallery__arrow ci-gallery__arrow--prev';
    prevBtn.appendChild(createChevronLeft());
    prevBtn.setAttribute('aria-label', 'Previous');

    var nextBtn = document.createElement('button');
    nextBtn.className = 'ci-gallery__arrow ci-gallery__arrow--next';
    nextBtn.appendChild(createChevronRight());
    nextBtn.setAttribute('aria-label', 'Next');

    return { prev: prevBtn, next: nextBtn };
  }

  // ── Build slider (non-SSR path) ────────────────────────────────────────
  // Builds entire DOM in a DocumentFragment, then inserts once to avoid reflows.
  function buildSlider(container, galleries, heading, subheading) {
    var frag = document.createDocumentFragment();

    // Header
    if (heading || subheading) {
      var header = document.createElement('div');
      header.className = 'ci-gallery__header';
      if (heading) {
        var h2 = document.createElement('h2');
        h2.className = 'ci-gallery__heading';
        h2.textContent = heading;
        header.appendChild(h2);
      }
      if (subheading) {
        var p = document.createElement('p');
        p.className = 'ci-gallery__sub';
        p.textContent = subheading;
        header.appendChild(p);
      }
      frag.appendChild(header);
    }

    var wrap = document.createElement('div');
    wrap.className = 'ci-gallery__wrap';

    var track = document.createElement('div');
    track.className = 'ci-gallery__track';

    var extrasContainer = document.createElement('div');
    extrasContainer.className = 'ci-gallery__lightbox-extras';

    galleries.forEach(function (gallery, idx) {
      var groupId = 'ci-gal-' + idx + '-' + Math.random().toString(36).slice(2, 6);

      var slide = document.createElement('a');
      slide.className = 'ci-gallery__slide ci-glightbox';
      slide.href = gallery.images[0].full;
      slide.setAttribute('data-gallery', groupId);
      slide.setAttribute('data-glightbox', 'title: ' + gallery.images[0].alt + '; alt: ' + gallery.images[0].alt);

      var imgEl = document.createElement('img');
      imgEl.src = gallery.thumb;
      imgEl.alt = gallery.thumbAlt;
      imgEl.loading = idx < 4 ? 'eager' : 'lazy';
      imgEl.decoding = 'async';
      imgEl.width = 640;
      imgEl.height = 480;
      slide.appendChild(imgEl);

      var caption = document.createElement('div');
      caption.className = 'ci-gallery__caption';
      var title = document.createElement('span');
      title.className = 'ci-gallery__title';
      title.textContent = gallery.title;
      caption.appendChild(title);
      if (gallery.images.length > 1) {
        var count = document.createElement('span');
        count.className = 'ci-gallery__count';
        count.appendChild(createCameraIcon());
        count.appendChild(document.createTextNode(gallery.images.length));
        caption.appendChild(count);
      }
      slide.appendChild(caption);

      var overlay = document.createElement('div');
      overlay.className = 'ci-gallery__overlay';
      var viewPrompt = document.createElement('span');
      viewPrompt.className = 'ci-gallery__view';
      viewPrompt.appendChild(createExpandIcon());
      viewPrompt.appendChild(document.createTextNode('View project'));
      overlay.appendChild(viewPrompt);
      slide.appendChild(overlay);

      track.appendChild(slide);

      for (var i = 1; i < gallery.images.length; i++) {
        var hiddenLink = document.createElement('a');
        hiddenLink.className = 'ci-glightbox';
        hiddenLink.href = gallery.images[i].full;
        hiddenLink.setAttribute('data-gallery', groupId);
        hiddenLink.setAttribute('data-glightbox', 'title: ' + gallery.images[i].alt + '; alt: ' + gallery.images[i].alt);
        extrasContainer.appendChild(hiddenLink);
      }
    });

    var arrows = createArrowPair();
    wrap.appendChild(track);
    wrap.appendChild(arrows.prev);
    wrap.appendChild(arrows.next);
    frag.appendChild(wrap);
    frag.appendChild(extrasContainer);

    // Single DOM insert — replaces skeleton with complete gallery
    container.textContent = '';
    container.classList.add('ci-gallery');
    container.appendChild(frag);

    setupArrows(wrap, track, arrows.prev, arrows.next);
    initLightboxes(container);
  }

  // ── GLightbox integration ─────────────────────────────────────────────
  function injectLightboxOverrides() {
    if (document.getElementById('ci-glightbox-overrides')) return;
    var s = document.createElement('style');
    s.id = 'ci-glightbox-overrides';
    s.textContent = [
      '/* Gallery-slider lightbox control overrides */',
      '.gclose {',
      '  background: rgba(0,0,0,0.45) !important;',
      '  border-radius: 50% !important;',
      '  width: 38px !important; height: 38px !important;',
      '  display: flex !important; align-items: center !important;',
      '  justify-content: center !important;',
      '  opacity: 1 !important; visibility: visible !important;',
      '  top: 15px !important; right: 15px !important;',
      '}',
      '.gclose svg, .gclose path { fill: #fff !important; stroke: #fff !important; }',
      '.gclose:hover { background: rgba(0,0,0,0.7) !important; }',
      '.gnext, .gprev {',
      '  background: rgba(0,0,0,0.35) !important;',
      '  border-radius: 50% !important;',
      '  width: 42px !important; height: 42px !important;',
      '  opacity: 1 !important; visibility: visible !important;',
      '}',
      '.gnext svg, .gprev svg, .gnext path, .gprev path {',
      '  fill: #fff !important; stroke: #fff !important;',
      '}',
      '.gnext:hover, .gprev:hover { background: rgba(0,0,0,0.6) !important; }',
      '',
      '/* Title: white text below image on existing dark backdrop */',
      '.gslide-description {',
      '  background: transparent !important;',
      '  position: relative !important;',
      '  padding: 10px 20px !important;',
      '}',
      '.gdesc-inner { background: transparent !important; }',
      '.gslide-title {',
      '  color: #fff !important;',
      '  background: none !important;',
      '  font-size: 0.95rem !important;',
      '  text-align: center !important;',
      '}',
      '.gslide-desc { background: transparent !important; color: #ccc !important; }',
      '',
      '/* Image: contain so full image is visible on desktop (like mobile) */',
      '.gslide-image img, .gslide-media img {',
      '  object-fit: contain !important;',
      '  max-width: 100% !important; max-height: 85vh !important;',
      '  width: auto !important; height: auto !important;',
      '}',
    ].join('\n');
    document.head.appendChild(s);
  }

  var lightboxInstances = [];
  var lightboxReady = false;

  // Early safeguard: prevent <a class="ci-glightbox"> from navigating to raw
  // image URL when GLightbox hasn't initialized yet (race condition fix).
  if (!window._ciGallerySafeguard) {
    window._ciGallerySafeguard = true;
    document.addEventListener('click', function (e) {
      var link = e.target.closest('.ci-glightbox');
      if (!link) return;
      // Always prevent default — GLightbox handles opening via its own handler
      e.preventDefault();
      // If GLightbox hasn't bound yet, try to init now
      if (!lightboxReady && typeof GLightbox !== 'undefined') {
        var container = link.closest('[data-inject="gallery-slider"]');
        if (container) initLightboxes(container);
      }
    }, true); // capture phase — runs before GLightbox's handler
  }

  function initLightboxes(container) {
    function tryInit() {
      if (typeof GLightbox === 'undefined') return false;
      injectLightboxOverrides();
      // Destroy old instances to avoid stale bindings
      lightboxInstances.forEach(function (lb) {
        try { lb.destroy(); } catch (_) {}
      });
      lightboxInstances = [];

      var seen = {};
      container.querySelectorAll('.ci-glightbox[data-gallery]').forEach(function (el) {
        var gid = el.getAttribute('data-gallery');
        if (gid && !seen[gid]) {
          seen[gid] = true;
          var lb = GLightbox({
            selector: '.ci-glightbox[data-gallery="' + gid + '"]',
            touchNavigation: true,
            loop: true,
            closeOnOutsideClick: true,
            closeButton: true,
            keyboard: true,
          });
          lightboxInstances.push(lb);
        }
      });
      lightboxReady = true;

      if (!window._ciGalleryKeyHandler) {
        window._ciGalleryKeyHandler = true;
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' || e.key === 'Enter') {
            lightboxInstances.forEach(function (lb) {
              try { lb.close(); } catch (_) {}
            });
          }
        });
      }

      if (!window._ciGalleryOverlayHandler) {
        window._ciGalleryOverlayHandler = true;
        document.addEventListener('click', function (e) {
          var target = e.target;
          if (target.classList.contains('goverlay') ||
              (target.classList.contains('gslide') && !target.closest('.gslide-media'))) {
            lightboxInstances.forEach(function (lb) {
              try { lb.close(); } catch (_) {}
            });
          }
        });
      }

      return true;
    }
    if (!tryInit()) {
      var attempts = 0;
      var iv = setInterval(function () { if (tryInit() || ++attempts > 40) clearInterval(iv); }, 250);
    }
  }

  // ── Hydrate pre-rendered SSR HTML ────────────────────────────────────────
  function hydrateSlider(container) {
    var wrap = container.querySelector('.ci-gallery__wrap');
    var track = container.querySelector('.ci-gallery__track');
    if (!wrap || !track) return;

    // SSR already includes inline CSS; only inject if missing
    if (!document.getElementById('ci-gallery-slider-css')) injectStyles();

    // Batch all DOM additions into a single fragment per slide
    track.querySelectorAll('.ci-gallery__slide').forEach(function (slide) {
      if (slide.querySelector('.ci-gallery__overlay')) return;
      var overlay = document.createElement('div');
      overlay.className = 'ci-gallery__overlay';
      var viewPrompt = document.createElement('span');
      viewPrompt.className = 'ci-gallery__view';
      viewPrompt.appendChild(createExpandIcon());
      viewPrompt.appendChild(document.createTextNode('View project'));
      overlay.appendChild(viewPrompt);
      slide.appendChild(overlay);
    });

    track.querySelectorAll('.ci-gallery__count').forEach(function (badge) {
      if (!badge.querySelector('svg')) {
        badge.insertBefore(createCameraIcon(), badge.firstChild);
      }
    });

    // Add arrows (if not already present)
    if (!wrap.querySelector('.ci-gallery__arrow')) {
      var arrows = createArrowPair();
      var arrowFrag = document.createDocumentFragment();
      arrowFrag.appendChild(arrows.prev);
      arrowFrag.appendChild(arrows.next);
      wrap.appendChild(arrowFrag);
      setupArrows(wrap, track, arrows.prev, arrows.next);
    }

    initLightboxes(container);
  }

  // ── Wait for images to load before revealing ──────────────────────────
  function waitForImages(container) {
    return new Promise(function (resolve) {
      var imgs = container.querySelectorAll('img');
      if (!imgs.length) { resolve(); return; }
      var remaining = 0;
      imgs.forEach(function (img) {
        if (img.complete) return;
        remaining++;
        img.addEventListener('load', done);
        img.addEventListener('error', done);
      });
      if (remaining === 0) { resolve(); return; }
      // Don't wait forever
      var timeout = setTimeout(resolve, 4000);
      function done() {
        remaining--;
        if (remaining <= 0) { clearTimeout(timeout); resolve(); }
      }
    });
  }

  // ── Cache & init ──────────────────────────────────────────────────────
  var cachedGalleries = null;
  var isHydrating = false;

  async function init() {
    var targets = document.querySelectorAll('[data-inject="gallery-slider"]');
    if (!targets.length) return;

    var pending = [];
    targets.forEach(function (t) {
      if (!t.classList.contains('ci-gallery--ready')) pending.push(t);
    });
    if (!pending.length) return;

    var ssrTargets = [];
    var fetchTargets = [];
    pending.forEach(function (t) {
      if (t.classList.contains('ci-gallery--ssr')) {
        ssrTargets.push(t);
      } else {
        fetchTargets.push(t);
      }
    });

    // SSR path: mark ready immediately, hydrate quietly
    isHydrating = true;
    ssrTargets.forEach(function (target) {
      target.classList.add('ci-gallery--ready');
      hydrateSlider(target);
    });
    isHydrating = false;

    // Non-SSR path: show skeleton, fetch, build, then reveal
    if (!fetchTargets.length) return;

    injectStyles();

    // Show skeleton immediately
    fetchTargets.forEach(function (target) {
      target.classList.add('ci-gallery');
      if (!target.querySelector('.ci-gallery__loading')) {
        var row = document.createElement('div');
        row.className = 'ci-gallery__loading';
        for (var s = 0; s < 4; s++) {
          var skel = document.createElement('div');
          skel.className = 'ci-gallery__skel';
          row.appendChild(skel);
        }
        target.appendChild(row);
      }
    });

    var galleries = cachedGalleries || await fetchGalleries();
    if (galleries) cachedGalleries = galleries;

    if (!galleries || !galleries.length) {
      fetchTargets.forEach(function (t) { t.textContent = ''; });
      return;
    }

    // Build each gallery but keep skeleton visible until images load
    for (var i = 0; i < fetchTargets.length; i++) {
      var target = fetchTargets[i];
      // Mark ready BEFORE building to prevent MutationObserver re-trigger
      target.classList.add('ci-gallery--ready');
      isHydrating = true;
      buildSlider(target, galleries, target.dataset.heading || '', target.dataset.subheading || '');
      isHydrating = false;
    }
  }

  // ── Scheduling ─────────────────────────────────────────────────────────
  function scheduleInit() {
    setTimeout(init, 300);
  }

  function observeDOM() {
    var debounceTimer = null;
    var observer = new MutationObserver(function () {
      if (isHydrating) return;
      if (debounceTimer) return;
      debounceTimer = setTimeout(function () {
        debounceTimer = null;
        var targets = document.querySelectorAll('[data-inject="gallery-slider"]');
        if (!targets.length) return;
        var need = false;
        targets.forEach(function (t) { if (!t.classList.contains('ci-gallery--ready')) need = true; });
        if (need) {
          init();
        } else {
          // All targets ready — disconnect observer
          observer.disconnect();
        }
      }, 300);
    });
    observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scheduleInit(); observeDOM(); });
  } else {
    scheduleInit();
    observeDOM();
  }
})();
