/* ==========================================================================
   MAKE PERFEITA - Comportamento do site
   Depende de assets/js/data.js (carregado antes).
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.CONFIG || {};
  var LOJA = CFG.loja || {};
  var CATEGORIAS = CFG.categorias || [];
  var PRODUTOS = CFG.produtos || [];
  var GALERIA = CFG.galeria || [];
  var WHATSAPP = String(CFG.whatsapp || '').replace(/\D/g, '');
  var FALLBACK_IMG = 'assets/img/placeholder.svg';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var noHover = !window.matchMedia || window.matchMedia('(hover: none)').matches;

  /* ------------------------------------------------------------ helpers */

  function icon(name, cls) {
    var paths = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
      cart: '<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      menu: '<path d="M3 7h18M3 12h18M3 17h12"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      chevron: '<path d="m6 9 6 6 6-6"/>',
      chevronL: '<path d="m15 18-6-6 6-6"/>',
      chevronR: '<path d="m9 18 6-6-6-6"/>',
      star: '<path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.8z"/>',
      sparkle: '<path d="M12 3v6M12 15v6M4.2 7.5 8.7 9.7M15.3 14.3l4.5 2.2M4.2 16.5l4.5-2.2M15.3 9.7l4.5-2.2"/>',
      shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6z"/>',
      truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
      whatsapp: '<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l5-1.4A10 10 0 1 0 12 2Z"/><path d="M8.8 8.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.2.3 0 .6a7 7 0 0 0 3 2.6c.3.1.5.1.6 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4v.6c-.1.6-.9 1.2-1.5 1.3-.5.1-1.1.1-1.8-.1a11 11 0 0 1-6.2-5.5c-.4-1-.4-1.9-.2-2.6a4 4 0 0 1 .5-1Z"/>',
      phone: '<path d="M6 3h3l1.5 4L8.5 8.5a12 12 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/>',
      pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/>',
      mail: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
      instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/>',
      facebook: '<path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A4.5 4.5 0 0 0 10 7.5v1H8v2.5h2V21h3v-10h2.2l.5-2.5H13Z"/>',
      tiktok: '<path d="M14 3v9.2a3.8 3.8 0 1 1-3-3.7"/><path d="M14 5.5c.6 1.8 2 3 4 3.2"/>',
      heart: '<path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7c0 4.9-7 9.3-7 9.3Z"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      minus: '<path d="M5 12h14"/>',
      plus: '<path d="M12 5v14M5 12h14"/>'
    };
    return (
      '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (paths[name] || '') +
      '</svg>'
    );
  }
  window.MP_ICON = icon;

  function money(v) {
    var n = Number(v);
    if (!n) return 'Sob consulta';
    return (
      'R$ ' +
      n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
  }

  function slug(s) {
    return String(s)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function normalize(s) {
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function catById(id) {
    for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].id === id) return CATEGORIAS[i];
    return { id: id, nome: id, imagem: FALLBACK_IMG };
  }

  function productById(id) {
    for (var i = 0; i < PRODUTOS.length; i++) if (PRODUTOS[i].id === id) return PRODUTOS[i];
    return null;
  }

  function imgs(p) {
    var list = [];
    if (p.foto) list.push(p.foto);
    if (p.imagens && p.imagens.length) list = list.concat(p.imagens);
    return list.length ? list : [FALLBACK_IMG];
  }

  function waLink(text) {
    var msg = encodeURIComponent(text || ('Olá! Gostaria de uma ajuda com os produtos da ' + (LOJA.nome || '') + '.'));
    return WHATSAPP ? 'https://wa.me/' + WHATSAPP + '?text=' + msg : 'https://wa.me/';
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  window.MP_ESCAPE = escapeHTML;

  /* ---------------------------------------------- componentes de render */

  function cardHTML(p, opts) {
    opts = opts || {};
    var cat = catById(p.categoria);
    var url = 'produto.html?id=' + encodeURIComponent(p.id);
    var flags = '';
    if (opts.flag === 'novidade' && p.novidade) flags += '<span class="tag tag--gold">Novidade</span>';
    else if (opts.flag === 'destaque' && p.destaque) flags += '<span class="tag tag--gold">Destaque</span>';

    var quick =
      '<div class="product-card__quick">' +
      '<button type="button" class="btn btn--sm btn--block" data-add="' + escapeHTML(p.id) + '">' +
      icon('cart') + '<span>Adicionar à lista</span></button>' +
      '</div>';

    return (
      '<article class="product-card" data-reveal>' +
      '<div class="product-card__flags">' + flags + '</div>' +
      '<a class="product-card__media" href="' + url + '" aria-label="Ver ' + escapeHTML(p.nome) + '">' +
      '<img src="' + imgs(p)[0] + '" alt="' + escapeHTML(p.nome) + '" loading="lazy" decoding="async" width="800" height="1000">' +
      '</a>' +
      quick +
      '<div class="product-card__body">' +
      '<span class="product-card__cat">' + escapeHTML(cat.nome) + '</span>' +
      '<h3 class="product-card__name"><a href="' + url + '">' + escapeHTML(p.nome) + '</a></h3>' +
      '<div class="product-card__foot">' +
      '<span class="price">' + money(p.preco) + '</span>' +
      '<a class="product-card__wa" href="' + waLink('Olá! Tenho interesse no produto: ' + p.nome + ' (' + money(p.preco) + ').') + '" target="_blank" rel="noopener">' +
      icon('whatsapp') + '<span>WhatsApp</span></a>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }
  window.MP_CARD = cardHTML;

  function countByCat(catId) {
    return PRODUTOS.filter(function (p) { return p.categoria === catId; }).length;
  }

  /* --------------------------------------------------------- rev reveal */

  var revealObserver = null;
  function initReveal() {
    var items = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach(function (el) { revealObserver.observe(el); });
  }
  window.MP_REVEAL = initReveal;

  /* ------------------------------------------------------------- toasts */

  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      toastEl.style.cssText =
        'position:fixed;left:50%;bottom:28px;transform:translate(-50%,140%);z-index:200;' +
        'display:flex;align-items:center;gap:.6rem;padding:.9rem 1.4rem;border-radius:999px;' +
        'background:#4a2130;color:#fff7f9;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;' +
        'box-shadow:0 18px 40px -18px rgba(74,33,48,.7);transition:transform .45s cubic-bezier(.16,1,.3,1);max-width:88vw';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = icon('check') + '<span>' + escapeHTML(msg) + '</span>';
    requestAnimationFrame(function () { toastEl.style.transform = 'translate(-50%,0)'; });
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.style.transform = 'translate(-50%,140%)'; }, 2600);
  }
  window.MP_TOAST = toast;

  /* ---------------------------------------------------- header / sticky */

  function initHeader() {
    var header = $('.header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-stuck', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    $$('.drawer__nav a, .nav__link').forEach(function (a) {
      a.addEventListener('click', function () { closeDrawer(); });
    });
  }

  /* ------------------------------------------------------------- drawer */

  function openDrawer() {
    var d = $('#menuDrawer');
    if (!d) return;
    d.classList.add('is-open');
    document.body.classList.add('is-locked');
    var f = d.querySelector('a, button');
    if (f) setTimeout(function () { f.focus(); }, 260);
  }
  function closeDrawer() {
    var d = $('#menuDrawer');
    if (!d) return;
    d.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }
  window.MP_OPEN_DRAWER = openDrawer;

  function initDrawer() {
    $$('[data-open-drawer]').forEach(function (b) {
      b.addEventListener('click', openDrawer);
    });
    $$('[data-close-drawer]').forEach(function (b) {
      b.addEventListener('click', closeDrawer);
    });
  }

  /* ------------------------------------------------------ lista / carrinho */

  var CART_KEY = 'mp_lista_v1';
  var cart = [];

  function loadCart() {
    try {
      cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (!Array.isArray(cart)) cart = [];
    } catch (e) { cart = []; }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }
  function cartCount() {
    return cart.reduce(function (a, i) { return a + i.qtd; }, 0);
  }
  function cartTotal() {
    return cart.reduce(function (a, i) {
      var p = productById(i.id);
      return a + (p ? Number(p.preco || 0) * i.qtd : 0);
    }, 0);
  }

  function renderCart() {
    var body = $('#cartBody');
    var totalEl = $('#cartTotal');
    var countEl = $('#cartCount');
    if (!body) return;

    if (countEl) {
      countEl.textContent = cartCount();
      countEl.classList.toggle('is-on', cartCount() > 0);
    }

    if (!cart.length) {
      body.innerHTML =
        '<div class="empty" style="border:0;background:none;padding-block:2.5rem">' +
        icon('cart') +
        '<p style="font-size:.9rem;color:var(--ink-mute)">Sua lista está vazia.</p>' +
        '</div>';
      if (totalEl) totalEl.textContent = 'R$ 0,00';
      return;
    }

    body.innerHTML = cart
      .map(function (i) {
        var p = productById(i.id);
        if (!p) return '';
        return (
          '<div class="cart-item">' +
          '<img src="' + imgs(p)[0] + '" alt="" loading="lazy" width="66" height="82">' +
          '<div>' +
          '<p class="cart-item__name">' + escapeHTML(p.nome) + '</p>' +
          '<p class="cart-item__meta">' + money(p.preco) + ' · qtd ' + i.qtd + '</p>' +
          '</div>' +
          '<div class="cart-item__right">' +
          '<span class="price" style="font-size:1rem">' + money(Number(p.preco || 0) * i.qtd) + '</span>' +
          '<button type="button" class="cart-item__remove" data-remove="' + escapeHTML(p.id) + '">Remover</button>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    if (totalEl) totalEl.textContent = money(cartTotal());
  }

  function addToCart(id, qtd) {
    var p = productById(id);
    if (!p) return;
    qtd = qtd || 1;
    var line = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
    if (line) line.qtd += qtd;
    else cart.push({ id: id, qtd: qtd });
    saveCart();
    renderCart();
    toast(p.nome + ' adicionado à lista');
  }
  window.MP_ADD = addToCart;

  function removeFromCart(id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    renderCart();
  }

  function openCart() {
    var c = $('#cartDrawer');
    if (!c) return;
    c.classList.add('is-open');
    document.body.classList.add('is-locked');
    var f = c.querySelector('[data-close-cart]');
    if (f) setTimeout(function () { f.focus(); }, 260);
  }
  function closeCart() {
    var c = $('#cartDrawer');
    if (!c) return;
    c.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }
  window.MP_OPEN_CART = openCart;

  function initCart() {
    loadCart();
    renderCart();

    document.addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      if (add) {
        var qtyOut = document.getElementById('pdpQty');
        var q = qtyOut ? parseInt(qtyOut.textContent, 10) || 1 : 1;
        addToCart(add.getAttribute('data-add'), q);
        return;
      }

      var rm = e.target.closest('[data-remove]');
      if (rm) { removeFromCart(rm.getAttribute('data-remove')); return; }

      if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); return; }
      if (e.target.closest('[data-close-cart]') || e.target.closest('#cartDrawer .cart__veil')) { closeCart(); return; }
    });

    $$('[data-cart-wa]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!cart.length) { toast('Sua lista está vazia'); return; }
        var linhas = cart
          .map(function (i) {
            var p = productById(i.id);
            return p ? '• ' + p.nome + ' (' + i.qtd + 'x) — ' + money(Number(p.preco || 0) * i.qtd) : '';
          })
          .filter(Boolean)
          .join('\n');
        var total = cartTotal();
        window.open(
          waLink('Olá! Gostaria de um orçamento desta lista:\n\n' + linhas + '\n\nTotal: ' + money(total)),
          '_blank',
          'noopener'
        );
      });
    });
  }

  /* -------------------------------------------------------- carrossel */

  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      var viewport = $('[data-carousel-viewport]', root);
      var prev = $('[data-carousel-prev]', root);
      var next = $('[data-carousel-next]', root);
      var bar = $('[data-carousel-progress]', root);
      if (!viewport) return;

      function step() {
        var first = viewport.firstElementChild;
        if (!first) return viewport.clientWidth * 0.8;
        var gap = parseFloat(getComputedStyle(viewport).columnGap || '16');
        return first.getBoundingClientRect().width + gap;
      }

      function update() {
        var max = viewport.scrollWidth - viewport.clientWidth - 2;
        var ratio = viewport.clientWidth / viewport.scrollWidth;
        if (prev) prev.disabled = viewport.scrollLeft <= 2;
        if (next) next.disabled = viewport.scrollLeft >= max;
        if (bar) {
          var i = bar.querySelector('i');
          if (i) {
            i.style.width = Math.max(12, ratio * 100) + '%';
            i.style.transform = 'translateX(' + (viewport.scrollLeft / (max || 1)) * (100 / ratio - 100) + '%)';
          }
        }
      }

      if (prev) prev.addEventListener('click', function () { viewport.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { viewport.scrollBy({ left: step(), behavior: 'smooth' }); });
      viewport.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      setTimeout(update, 60);

      var drag = null;
      viewport.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        drag = { x: e.clientX, left: viewport.scrollLeft, moved: false };
      });
      window.addEventListener('pointermove', function (e) {
        if (!drag) return;
        var dx = e.clientX - drag.x;
        if (Math.abs(dx) > 4) drag.moved = true;
        viewport.scrollLeft = drag.left - dx;
      });
      window.addEventListener('pointerup', function () {
        if (drag) setTimeout(function () { drag = null; }, 0);
      });
      viewport.addEventListener('click', function (e) {
        if (drag && drag.moved) { e.preventDefault(); e.stopPropagation(); }
      }, true);
    });
  }

  /* ------------------------------------------------------------ teclado */

  function initShortcuts() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        closeCart();
        closeLightbox();
      }
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        var s = $('#busca');
        if (s) { e.preventDefault(); s.focus(); s.select(); }
      }
    });
  }

  /* ----------------------------------------------------------- lightbox */

  var lbImg = null, lbCap = null;

  function openLightbox(src, cap) {
    var lb = $('#lightbox');
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = cap || '';
    if (lbCap) lbCap.textContent = cap || '';
    lb.classList.add('is-open');
    document.body.classList.add('is-locked');
  }
  function closeLightbox() {
    var lb = $('#lightbox');
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }
  window.MP_LIGHTBOX = { open: openLightbox, close: closeLightbox };

  function initLightbox() {
    lbImg = $('#lightboxImg');
    lbCap = $('#lightboxCap');
    document.addEventListener('click', function (e) {
      var g = e.target.closest('[data-zoom]');
      if (g) { e.preventDefault(); openLightbox(g.getAttribute('data-zoom'), g.getAttribute('data-caption')); return; }
      if (e.target.closest('[data-close-lightbox]') || e.target.id === 'lightbox') closeLightbox();
    });
  }

  /* ------------------------------------------------- conteúdo das páginas */

  function renderCategorias() {
    var grid = $('#gradeCategorias');
    if (!grid) return;
    grid.innerHTML = CATEGORIAS.map(function (c, i) {
      return (
        '<a class="cat-card" href="produtos.html?c=' + encodeURIComponent(c.id) + '" data-reveal="zoom" style="--reveal-delay:' + (i % 3) * 0.09 + 's">' +
        '<img src="' + (c.imagem || FALLBACK_IMG) + '" alt="' + escapeHTML(c.nome) + '" loading="lazy" decoding="async" width="800" height="1000">' +
        '<div class="cat-card__body">' +
        '<div><h3 class="cat-card__title">' + escapeHTML(c.nome) + '</h3>' +
        '<span class="cat-card__count">' + countByCat(c.id) + ' itens</span></div>' +
        '<span class="cat-card__go" aria-hidden="true">' + icon('arrow') + '</span>' +
        '</div></a>'
      );
    }).join('');
  }

  function renderCollection(targetId, filterFn, flag, limit) {
    var grid = $('#' + targetId);
    if (!grid) return;
    var list = PRODUTOS.filter(filterFn).slice(0, limit || 99);
    if (!list.length) { grid.innerHTML = ''; grid.parentElement.style.display = 'none'; return; }
    grid.innerHTML = list.map(function (p) { return cardHTML(p, { flag: flag }); }).join('');
  }

  function renderDestaques() {
    renderCollection('gradeDestaques', function (p) { return p.destaque; }, 'destaque', 8);
  }

  function renderNovidades() {
    renderCollection('gradeNovidades', function (p) { return p.novidade; }, 'novidade', 4);
  }

  function renderGaleria() {
    var g = $('#gradeGaleria');
    if (!g) return;
    g.innerHTML = GALERIA.map(function (item) {
      return (
        '<button type="button" class="gallery__item" data-zoom="' + item.src + '" data-caption="' + escapeHTML(item.legenda || item.alt) + '">' +
        '<img src="' + item.src + '" alt="' + escapeHTML(item.alt) + '" loading="lazy" decoding="async" width="1200" height="1500">' +
        '<span class="gallery__cap">' + escapeHTML(item.legenda || '') + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function renderMarquee() {
    var m = $('#marqueeTrack');
    if (!m) return;
    var base = [
      LOJA.assinatura || 'Loja de $10 e Variados',
      'Gloss', 'Perfumes', 'Kits labiais', 'Braceletes',
      CFG.entrega || 'Enviamos para todo o Brasil',
      'Pedido pelo WhatsApp'
    ];
    var html = base
      .map(function (t) { return '<span class="marquee__item">' + t + '<i></i></span>'; })
      .join('');
    m.innerHTML = html + html;
  }

  function renderContato() {
    var end = LOJA.endereco || {};
    var partes = [end.logradouro, end.numero, end.bairro].filter(Boolean);
    var endereco = partes.length
      ? partes.join(', ') + ' - ' + (end.cidade || '') + '/' + (end.uf || '')
      : (end.cidade || LOJA.cidade || 'Itu') + ' - ' + (end.uf || LOJA.uf || 'SP');
    $$('[data-bind="cidade-uf"]').forEach(function (el) {
      el.textContent = (LOJA.cidade || 'Itu') + (LOJA.uf ? ' - ' + LOJA.uf : '');
    });
    $$('[data-bind="endereco"]').forEach(function (el) { el.textContent = endereco; });
    $$('[data-bind="loja"]').forEach(function (el) { el.textContent = LOJA.nome || 'Make Perfeita'; });
    $$('[data-bind="assinatura"]').forEach(function (el) { el.textContent = LOJA.assinatura || ''; });
    $$('[data-bind="entrega"]').forEach(function (el) { el.textContent = CFG.entrega || ''; });
    $$('[data-bind="whatsapp"]').forEach(function (el) {
      el.textContent = WHATSAPP
        ? '(' + WHATSAPP.slice(2, 4) + ') ' + WHATSAPP.slice(4, 8) + '-' + WHATSAPP.slice(8)
        : '';
    });
    var hor = CFG.horarios || [];
    $$('[data-bind="horarios"]').forEach(function (el) {
      el.innerHTML = hor.map(function (h) { return escapeHTML(h); }).join('<br>');
    });
  }

  function bindRedeLinks() {
    var redes = CFG.redes || {};
    var map = { instagram: redes.instagram, facebook: redes.facebook, tiktok: redes.tiktok };
    $$('[data-rede]').forEach(function (a) {
      var url = map[a.getAttribute('data-rede')];
      var wrap = a.closest('[data-rede-wrap]') || a;
      if (url) { a.href = url; } else { wrap.style.display = 'none'; }
    });
    $$('[data-wa-link]').forEach(function (a) {
      a.href = waLink(a.getAttribute('data-wa-msg') || '');
    });
  }

  /* ------------------------------------------------------ página catálogo */

  function initCatalogo() {
    var grid = $('#gradeProdutos');
    if (!grid) return;

    var params = new URLSearchParams(window.location.search);
    var state = {
      q: params.get('q') || '',
      cat: params.get('c') || 'todos',
      ordem: params.get('ordem') || 'destaque'
    };

    var input = $('#busca');
    var clear = $('#buscaLimpar');
    var chips = $('#filtros');
    var select = $('#ordenar');
    var count = $('#resultadoCount');

    function render() {
      var q = normalize(state.q.trim());
      var list = PRODUTOS.filter(function (p) {
        var okCat = state.cat === 'todos' || p.categoria === state.cat;
        var okQ =
          !q ||
          normalize(p.nome + ' ' + p.descricao + ' ' + catById(p.categoria).nome + ' ' + (p.marca || ''))
            .indexOf(q) > -1;
        return okCat && okQ;
      });

      var ordens = {
        destaque: function (a, b) { return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0) || a.nome.localeCompare(b.nome, 'pt-BR'); },
        'menor-preco': function (a, b) { return (a.preco || 1e9) - (b.preco || 1e9); },
        'maior-preco': function (a, b) { return (b.preco || 0) - (a.preco || 0); },
        alfabetico: function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); }
      };
      list.sort(ordens[state.ordem] || ordens.destaque);

      var empty = $('#semResultado');
      if (!list.length) {
        grid.innerHTML = '';
        empty.style.display = 'grid';
      } else {
        empty.style.display = 'none';
        grid.innerHTML = list.map(function (p) { return cardHTML(p, { flag: p.novidade ? 'novidade' : null }); }).join('');
      }

      if (count) count.textContent = list.length + (list.length === 1 ? ' produto' : ' produtos');

      $$('[data-reveal]', grid).forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', Math.min(i * 0.05, 0.4) + 's');
      });
      initReveal();

      var qs = [];
      if (state.cat !== 'todos') qs.push('c=' + encodeURIComponent(state.cat));
      if (state.q) qs.push('q=' + encodeURIComponent(state.q));
      if (state.ordem !== 'destaque') qs.push('ordem=' + encodeURIComponent(state.ordem));
      history.replaceState(null, '', qs.length ? '?' + qs.join('&') : location.pathname);
    }

    if (chips) {
      chips.innerHTML = [{ id: 'todos', nome: 'Todos' }]
        .concat(CATEGORIAS)
        .map(function (c) {
          return (
            '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === state.cat) + '">' +
            escapeHTML(c.nome) +
            '</button>'
          );
        })
        .join('');
      chips.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]');
        if (!b) return;
        state.cat = b.getAttribute('data-cat');
        $$('[data-cat]', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        render();
      });
    }

    if (input) {
      input.value = state.q;
      if (clear) clear.classList.toggle('is-on', !!state.q);
      input.addEventListener('input', function () {
        state.q = input.value;
        if (clear) clear.classList.toggle('is-on', !!state.q);
        render();
      });
    }
    if (clear) {
      clear.addEventListener('click', function () {
        state.q = '';
        if (input) { input.value = ''; input.focus(); }
        clear.classList.remove('is-on');
        render();
      });
    }
    if (select) {
      select.value = state.ordem;
      select.addEventListener('change', function () { state.ordem = select.value; render(); });
    }

    render();
  }

  /* -------------------------------------------------------- página produto */

  function initProduto() {
    var root = $('#pdp');
    if (!root) return;

    var id = new URLSearchParams(window.location.search).get('id');
    var p = productById(id) || PRODUTOS[0];
    if (!p) { root.innerHTML = '<p>Produto não encontrado.</p>'; return; }

    var cat = catById(p.categoria);
    var list = imgs(p);
    document.title = p.nome + ' | ' + (LOJA.nome || 'Make Perfeita');
    var metaDesc = $('meta[name="description"]');
    if (metaDesc && p.descricao) metaDesc.setAttribute('content', p.descricao.slice(0, 155));

    var h1 = $('#pdpTitle');
    if (h1) h1.textContent = p.nome;
    var ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', p.nome + ' | ' + (LOJA.nome || 'Make Perfeita'));
    var ogImg = $('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', (LOJA.url || '') + '/' + list[0]);

    var crumbs = $('#pdpCrumbs');
    if (crumbs) {
      crumbs.innerHTML =
        '<a href="index.html">Início</a><span>/</span>' +
        '<a href="produtos.html?c=' + encodeURIComponent(cat.id) + '">' + escapeHTML(cat.nome) + '</a><span>/</span>' +
        '<span>' + escapeHTML(p.nome) + '</span>';
    }

    var thumbs = list.length > 1
      ? '<div class="pdp__thumbs">' + list.map(function (src, i) {
          return (
            '<button type="button" class="pdp__thumb' + (i === 0 ? ' is-active' : '') + '" data-thumb="' + i + '" aria-label="Imagem ' + (i + 1) + '">' +
            '<img src="' + src + '" alt="" loading="lazy" width="200" height="200"></button>'
          );
        }).join('') + '</div>'
      : '';

    root.innerHTML =
      '<div class="pdp__gallery">' +
      '<div class="pdp__main"><img id="pdpImg" src="' + list[0] + '" alt="' + escapeHTML(p.nome) + '" width="800" height="1000" fetchpriority="high"></div>' +
      thumbs +
      '</div>' +
      '<div class="pdp__info" data-reveal>' +
      '<div class="pdp__flags">' +
      '<span class="chip">' + escapeHTML(cat.nome) + '</span>' +
      (p.novidade ? '<span class="tag tag--gold">Novidade</span>' : '') +
      (p.destaque ? '<span class="tag">Destaque</span>' : '') +
      '</div>' +
      '<p class="lead">' + escapeHTML(p.descricao) + '</p>' +
      '<div class="pdp__price">' + money(p.preco) + '</div>' +
      '<div class="pdp__block"><h2>Características</h2><ul class="pdp__specs">' +
      (p.specs || []).map(function (s) { return '<li>' + icon('check') + '<span>' + escapeHTML(s) + '</span></li>'; }).join('') +
      '</ul></div>' +
      '<div class="pdp__buy">' +
      '<div class="qty">' +
      '<button type="button" data-qty="-1" aria-label="Diminuir quantidade">' + icon('minus') + '</button>' +
      '<output id="pdpQty">1</output>' +
      '<button type="button" data-qty="1" aria-label="Aumentar quantidade">' + icon('plus') + '</button>' +
      '</div>' +
      '<button type="button" class="btn" data-add="' + escapeHTML(p.id) + '">' + icon('cart') + '<span>Adicionar à lista</span></button>' +
      '<a class="btn btn--wa" target="_blank" rel="noopener" href="' + waLink('Olá! Tenho interesse no produto: ' + p.nome + ' (' + money(p.preco) + ').') + '">' +
      icon('whatsapp') + '<span>Comprar pelo WhatsApp</span></a>' +
      '</div>' +
      '<p class="demo-note">' + icon('info') + '<span>Preço de referência sujeito a alteração. Confirme disponibilidade e frete com a loja pelo WhatsApp.</span></p>' +
      '</div>';

    var qty = 1;
    var qtyOut = $('#pdpQty');
    $$('[data-qty]').forEach(function (b) {
      b.addEventListener('click', function () {
        qty = Math.min(99, Math.max(1, qty + Number(b.getAttribute('data-qty'))));
        if (qtyOut) qtyOut.textContent = qty;
      });
    });
    var main = $('#pdpImg');
    $$('[data-thumb]').forEach(function (t) {
      t.addEventListener('click', function () {
        main.style.opacity = '0';
        setTimeout(function () {
          main.src = list[Number(t.getAttribute('data-thumb'))];
          main.style.opacity = '1';
        }, 160);
        $$('[data-thumb]').forEach(function (x) { x.classList.toggle('is-active', x === t); });
      });
    });
    if (main) main.style.transition = 'opacity .3s ease';

    var rel = $('#pdpRelacionados');
    if (rel) {
      var others = PRODUTOS.filter(function (x) { return x.id !== p.id && x.categoria === p.categoria; });
      if (others.length < 4) {
        others = others.concat(PRODUTOS.filter(function (x) { return x.id !== p.id && x.categoria !== p.categoria; }));
      }
      rel.innerHTML = others.slice(0, 4).map(function (x) { return cardHTML(x); }).join('');
    }

    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.nome,
      description: p.descricao,
      category: cat.nome,
      image: [list[0]],
      brand: { '@type': 'Brand', name: p.marca || LOJA.nome },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: p.preco || 0,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: LOJA.nome }
      }
    });
    document.head.appendChild(ld);

    initReveal();
  }

  /* ------------------------------------------------------------ tilt 3D */

  function initTilt() {
    if (reduceMotion || noHover) return;
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateY(' + x * 4 + 'deg) rotateX(' + -y * 4 + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------- parallax */

  function initParallax() {
    var el = $('[data-parallax]');
    if (!el || reduceMotion) return;
    var ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY;
          el.style.transform = 'translate3d(0,' + y * 0.12 + 'px,0) scale(1.1)';
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------- JSON-LD da loja */

  function injectStoreSchema() {
    var end = LOJA.endereco || {};
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'BeautyStore',
      name: LOJA.nome,
      description: (LOJA.assinatura ? LOJA.assinatura + '. ' : '') + 'Loja em ' + LOJA.cidade + ', ' + LOJA.uf + ', com entrega para todo o Brasil.',
      url: LOJA.url || location.origin,
      image: (LOJA.url || location.origin) + '/assets/img/og-image.jpg',
      priceRange: '$$',
      currenciesAccepted: 'BRL',
      address: {
        '@type': 'PostalAddress',
        streetAddress: [end.logradouro, end.numero].filter(Boolean).join(' ') || undefined,
        addressLocality: end.cidade || LOJA.cidade,
        addressRegion: end.uf || LOJA.uf,
        postalCode: end.cep || undefined,
        addressCountry: 'BR'
      },
      areaServed: { '@type': 'City', name: LOJA.cidade || 'Itu' }
    };
    if (CFG.whatsapp) {
      schema.contactPoint = {
        '@type': 'ContactPoint',
        telephone: '+' + CFG.whatsapp,
        contactType: 'customer service',
        areaServed: 'BR'
      };
    }
    if (CFG.redes && CFG.redes.instagram) schema.sameAs = [CFG.redes.instagram];
    if (CFG.horariosSchema) {
      schema.openingHoursSpecification = CFG.horariosSchema.map(function (h) {
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.map(function (d) { return 'https://schema.org/' + d; }),
          opens: h.opens,
          closes: h.closes
        };
      });
    }
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------- boot */

  function boot() {
    renderContato();
    bindRedeLinks();
    renderMarquee();
    renderCategorias();
    renderDestaques();
    renderNovidades();
    renderGaleria();
    initHeader();
    initDrawer();
    initCart();
    initCarousels();
    initLightbox();
    initShortcuts();
    initTilt();
    initParallax();
    initCatalogo();
    initProduto();
    injectStoreSchema();
    initReveal();

    var wa = $('#waFloat');
    if (wa) {
      wa.href = waLink('Olá! Vim pelo site da ' + (LOJA.nome || '') + ' e gostaria de atendimento.');
      setTimeout(function () { wa.classList.add('is-on'); }, 1200);
    }

    document.documentElement.classList.add('mp-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();