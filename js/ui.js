/* ==========================================================================
   ARQUIVO RABENFELS - js/ui.js

   Componentes reutilizaveis de interface.

   Tudo que aparece por cima do palco e montado aqui: paineis, listas de
   save, confirmacoes, avisos e controles de ajuste. Nenhum outro modulo
   escreve HTML na mao.

   Dois cuidados que resolvem os defeitos classicos desse tipo de tela:

   1. Nenhum listener e registrado duas vezes. Cada painel e destruido ao
      fechar e reconstruido ao abrir; os listeners morrem junto com os
      elementos. Os listeners globais sao registrados uma unica vez em
      bind(), protegido por flag.

   2. Clique dentro de um painel nunca chega ao palco. Todo painel para a
      propagacao, e o palco so aceita clique quando o estado permite.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.UI = (function () {
  'use strict';

  var root      = null;    /* container de overlays  */
  var openPanel = null;    /* { name, el, onClose }  */
  var modalEl   = null;
  var bound     = false;

  /* ---- utilidades de DOM ------------------------------------------------ */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  }

  function clear(node) {
    while (node && node.firstChild) { node.removeChild(node.firstChild); }
  }

  function button(label, className, onClick) {
    var b = el('button', 'rbf-btn ' + (className || ''), label);
    b.type = 'button';
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      onClick(ev);
    });
    return b;
  }

  /* ---- painel generico -------------------------------------------------- */

  /*
    opts:
      name      identificador do painel
      title     titulo exibido
      subtitle  linha secundaria, opcional
      body      elemento ja montado com o conteudo
      actions   lista de { label, className, onClick }
      onClose   chamado ao fechar
      wide      true para painel largo
  */
  function panel(opts) {
    closePanel();

    var overlay = el('div', 'rbf-overlay');
    overlay.setAttribute('data-panel', opts.name || '');

    var box = el('div', 'rbf-panel' + (opts.wide ? ' rbf-panel-wide' : ''));
    box.addEventListener('click', function (ev) { ev.stopPropagation(); });

    var head = el('div', 'rbf-panel-head');
    head.appendChild(el('h2', 'rbf-panel-title', opts.title || ''));
    if (opts.subtitle) {
      head.appendChild(el('p', 'rbf-panel-sub', opts.subtitle));
    }
    box.appendChild(head);

    var body = el('div', 'rbf-panel-body');
    if (opts.body) { body.appendChild(opts.body); }
    box.appendChild(body);

    if (opts.actions && opts.actions.length) {
      var foot = el('div', 'rbf-panel-foot');
      for (var i = 0; i < opts.actions.length; i++) {
        (function (a) {
          foot.appendChild(button(a.label, a.className, a.onClick));
        })(opts.actions[i]);
      }
      box.appendChild(foot);
    }

    overlay.appendChild(box);

    /* Clique fora fecha, quando o painel permite. */
    overlay.addEventListener('click', function () {
      if (opts.dismissOnBackdrop !== false) { closePanel(); }
    });

    root.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('show'); });
    if (RBF.Audio && RBF.Audio.playUi) { RBF.Audio.playUi('ui_page'); }

    openPanel = {
      name:       opts.name,
      el:         overlay,
      onClose:    opts.onClose || null,
      lockEscape: opts.lockEscape === true
    };
    return { overlay: overlay, body: body, box: box };
  }

  function closePanel() {
    if (!openPanel) { return false; }
    var p = openPanel;
    openPanel = null;

    if (p.el && p.el.parentNode) { p.el.parentNode.removeChild(p.el); }
    if (RBF.Audio && RBF.Audio.playUi) { RBF.Audio.playUi('ui_back'); }
    if (p.onClose) { p.onClose(); }
    return true;
  }

  function isPanelOpen(name) {
    if (!openPanel) { return false; }
    return name ? openPanel.name === name : true;
  }

  /* ---- confirmacao e aviso ---------------------------------------------- */

  /*
    opts:
      title, message
      confirmLabel, cancelLabel
      danger      true pinta o botao de confirmacao como destrutivo
      onConfirm, onCancel
  */
  function confirm(opts) {
    dismissModal();

    var prev = RBF.State.get();
    RBF.State.push('modal');

    var overlay = el('div', 'rbf-overlay rbf-overlay-modal');
    var box = el('div', 'rbf-modal');
    box.addEventListener('click', function (ev) { ev.stopPropagation(); });

    var seal = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    seal.setAttribute('class', 'rbf-modal__seal');
    seal.setAttribute('aria-hidden', 'true');
    var suse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    suse.setAttribute('href', '#rf-mark');
    seal.appendChild(suse);
    box.appendChild(seal);

    box.appendChild(el('h3', 'rbf-modal-title', opts.title || 'Confirmar'));
    box.appendChild(el('p', 'rbf-modal-msg', opts.message || ''));

    var foot = el('div', 'rbf-modal-foot');

    if (opts.cancelLabel !== null) {
      foot.appendChild(button(opts.cancelLabel || 'Cancelar', 'rbf-btn-ghost', function () {
        finish(false);
      }));
    }

    foot.appendChild(button(
      opts.confirmLabel || 'Confirmar',
      opts.danger ? 'rbf-btn-danger' : 'rbf-btn-primary',
      function () { finish(true); }
    ));

    box.appendChild(foot);
    overlay.appendChild(box);

    overlay.addEventListener('click', function () { finish(false); });

    root.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('show'); });

    modalEl = overlay;

    function finish(ok) {
      dismissModal();
      RBF.State.pop(prev);
      if (ok && opts.onConfirm) { opts.onConfirm(); }
      if (!ok && opts.onCancel) { opts.onCancel(); }
    }

    modalEl._finish = finish;
    return overlay;
  }

  function notice(title, message, onClose) {
    return confirm({
      title:        title,
      message:      message,
      confirmLabel: 'Entendi',
      cancelLabel:  null,
      onConfirm:    onClose || null,
      onCancel:     onClose || null
    });
  }

  function dismissModal() {
    if (!modalEl) { return false; }
    if (modalEl.parentNode) { modalEl.parentNode.removeChild(modalEl); }
    modalEl = null;
    return true;
  }

  function isModalOpen() { return modalEl !== null; }

  /* ---- aviso breve ------------------------------------------------------ */

  var toastTimer = null;

  function toast(message) {
    var existing = root.querySelector('.rbf-toast');
    if (existing && existing.parentNode) { existing.parentNode.removeChild(existing); }
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }

    var t = el('div', 'rbf-toast', message);
    root.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });

    toastTimer = setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () {
        if (t.parentNode) { t.parentNode.removeChild(t); }
      }, 400);
      toastTimer = null;
    }, 2400);
    return t;
  }

  /* ---- controles de ajuste ---------------------------------------------- */

  function row(label, control, hint) {
    var r = el('div', 'rbf-row');
    var left = el('div', 'rbf-row-label');
    left.appendChild(el('span', 'rbf-row-name', label));
    if (hint) { left.appendChild(el('span', 'rbf-row-hint', hint)); }
    r.appendChild(left);

    var right = el('div', 'rbf-row-control');
    right.appendChild(control);
    r.appendChild(right);
    return r;
  }

  function slider(value, min, max, step, format, onInput) {
    var wrap = el('div', 'rbf-slider');
    var input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);

    var out = el('span', 'rbf-slider-value', format(value));

    input.addEventListener('input', function (ev) {
      ev.stopPropagation();
      var v = parseFloat(input.value);
      out.textContent = format(v);
      onInput(v);
    });
    input.addEventListener('click', function (ev) { ev.stopPropagation(); });

    wrap.appendChild(input);
    wrap.appendChild(out);
    return wrap;
  }

  function toggle(value, onChange) {
    var b = el('button', 'rbf-toggle' + (value ? ' on' : ''), value ? 'Ligado' : 'Desligado');
    b.type = 'button';
    b.addEventListener('click', function (ev) {
      ev.stopPropagation();
      value = !value;
      b.classList.toggle('on', value);
      b.textContent = value ? 'Ligado' : 'Desligado';
      onChange(value);
    });
    return b;
  }

  function segmented(options, current, onPick) {
    var wrap = el('div', 'rbf-segmented');
    for (var i = 0; i < options.length; i++) {
      (function (opt) {
        var b = el('button', 'rbf-seg' + (opt.value === current ? ' on' : ''), opt.label);
        b.type = 'button';
        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          var all = wrap.querySelectorAll('.rbf-seg');
          for (var j = 0; j < all.length; j++) { all[j].classList.remove('on'); }
          b.classList.add('on');
          onPick(opt.value);
        });
        wrap.appendChild(b);
      })(options[i]);
    }
    return wrap;
  }

  /* ---- miniatura de save ------------------------------------------------ */

  /* Usa o gradiente ou a imagem do background do save. Nao depende de
     canvas, portanto nao quebra sob file://. */
  function thumbnail(backgroundId) {
    var t = el('div', 'rbf-thumb');
    var def = RBF.BACKGROUNDS[backgroundId] || RBF.BACKGROUNDS.bg_black;
    t.style.background = def.css;
    t.style.backgroundSize = 'cover';
    t.style.backgroundPosition = 'center';

    if (def.available && def.file) {
      var url = RBF.CONFIG.paths.backgrounds + def.file;
      var probe = new Image();
      probe.onload = function () { t.style.backgroundImage = 'url("' + url + '")'; };
      probe.onerror = function () { /* fica no gradiente */ };
      probe.src = url;
    }
    return t;
  }

  /* ---- lista de saves ---------------------------------------------------- */

  /*
    mode: 'save' | 'load'
    onPick(slot)      clique no espaco
    onDelete(slot)    apagar
    onExport(slot)    exportar
  */
  function slotList(mode, onPick, onDelete, onExport) {
    var list = el('div', 'rbf-slots');
    var slots = RBF.Saves.listSlots();

    for (var i = 0; i < slots.length; i++) {
      (function (s) {
        var card = el('div', 'rbf-slot' + (s.empty ? ' empty' : '') + (s.broken ? ' broken' : ''));

        if (mode === 'load' && (s.empty || s.broken)) {
          card.classList.add('disabled');
        }

        card.appendChild(thumbnail(s.empty ? 'bg_black' : s.background));

        var info = el('div', 'rbf-slot-info');
        info.appendChild(el('div', 'rbf-slot-label', s.label));

        if (s.empty) {
          info.appendChild(el('div', 'rbf-slot-empty', RBF.UI_TEXT.emptySlot));
        } else if (s.broken) {
          info.appendChild(el('div', 'rbf-slot-broken', 'save inv\u00e1lido: ' + s.problem));
        } else {
          var line = s.chapter + (s.scene ? ' \u00b7 ' + s.scene : '');
          info.appendChild(el('div', 'rbf-slot-chapter', line));
          if (s.excerpt) {
            info.appendChild(el('div', 'rbf-slot-excerpt', s.excerpt));
          }
          var meta = el('div', 'rbf-slot-meta');
          meta.appendChild(el('span', null, RBF.Saves.formatDate(s.updatedAt)));
          meta.appendChild(el('span', null, RBF.Saves.formatPlaytime(s.playtime)));
          if (s.route) { meta.appendChild(el('span', 'rbf-slot-route', s.route)); }
          info.appendChild(meta);
        }

        card.appendChild(info);

        var tools = el('div', 'rbf-slot-tools');
        if (!s.empty) {
          if (onExport) {
            tools.appendChild(button('Exportar', 'rbf-btn-mini', function (ev) {
              ev.stopPropagation();
              onExport(s);
            }));
          }
          if (onDelete) {
            tools.appendChild(button('Apagar', 'rbf-btn-mini rbf-btn-danger', function (ev) {
              ev.stopPropagation();
              onDelete(s);
            }));
          }
        }
        card.appendChild(tools);

        card.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (card.classList.contains('disabled')) { return; }
          onPick(s);
        });

        list.appendChild(card);
      })(slots[i]);
    }
    return list;
  }

  /* ---- teclado global ---------------------------------------------------- */

  /* Registrado uma unica vez. Escape fecha o que estiver por cima. */
  function bind(rootEl) {
    root = rootEl;
    if (bound) { return; }
    bound = true;

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') { return; }

      if (isModalOpen()) {
        ev.preventDefault();
        ev.stopPropagation();
        if (modalEl && modalEl._finish) { modalEl._finish(false); }
        return;
      }
      if (isPanelOpen()) {
        ev.preventDefault();
        ev.stopPropagation();
        /* O aviso de conteudo exige uma escolha: nao sai por Escape. */
        if (openPanel && openPanel.lockEscape) { return; }
        closePanel();
      }
    }, true);
  }

  return {
    bind:        bind,
    el:          el,
    clear:       clear,
    button:      button,
    panel:       panel,
    closePanel:  closePanel,
    isPanelOpen: isPanelOpen,
    confirm:     confirm,
    notice:      notice,
    isModalOpen: isModalOpen,
    toast:       toast,
    row:         row,
    slider:      slider,
    toggle:      toggle,
    segmented:   segmented,
    thumbnail:   thumbnail,
    slotList:    slotList
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.UI;
}
