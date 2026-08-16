/* ==========================================================================
   ARQUIVO RABENFELS - js/assets.js
   Resolucao de caminho e comportamento de fallback.

   Regras:
   - asset ausente nunca quebra a VN
   - asset ausente nunca gera icone de imagem quebrada
   - asset ausente nunca repete log (um registro por id, em Assets.missing)
   - available:false no manifesto = zero requisicao de rede
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Assets = (function () {
  'use strict';

  var missing  = {};   /* id -> detalhe, para nao logar duas vezes */
  var imgCache = {};   /* url -> 'ok' | 'fail'                     */

  function cfg() { return RBF.CONFIG; }

  function note(id, detail) {
    if (missing[id]) { return; }
    missing[id] = detail || true;
    if (cfg().debug && typeof console !== 'undefined' && console.warn) {
      console.warn('[rabenfels] asset ausente: ' + id + (detail ? ' (' + detail + ')' : ''));
    }
  }

  /* ---------------------------------------------------------------------
     Placeholders gerados em runtime. Nao dependem de arquivo em disco.
     --------------------------------------------------------------------- */
  function svgToDataUri(svg) {
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function characterPlaceholder(label, size) {
    var full    = (size === 'full');
    var w       = full ? 300 : 320;
    var h       = full ? 620 : 360;
    var cx      = w / 2;
    var headR   = full ? 44 : 62;
    var headY   = full ? 78 : 122;
    var bodyY   = headY + headR * 0.85;
    var bodyW   = full ? 150 : 210;
    var initial = String(label || '?').charAt(0).toUpperCase();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#1d1614"/><stop offset="100%" stop-color="#0a0706"/>' +
      '</linearGradient></defs>' +
      '<circle cx="' + cx + '" cy="' + headY + '" r="' + headR + '" fill="url(#g)"/>' +
      '<rect x="' + (cx - bodyW / 2) + '" y="' + bodyY + '" width="' + bodyW + '" height="' + (h - bodyY) + '" rx="' + (bodyW / 5) + '" fill="url(#g)"/>' +
      '<text x="' + cx + '" y="' + (headY + headR * 0.34) + '" font-family="Georgia,serif" font-size="' + Math.round(headR * 0.95) + '" fill="#54262a" text-anchor="middle">' + initial + '</text>' +
      '</svg>';
    return svgToDataUri(svg);
  }

  /* ---------------------------------------------------------------------
     BACKGROUNDS
     O gradiente CSS e aplicado sempre e imediatamente. Se houver arquivo
     marcado como available, ele e pre-carregado e so entao sobrepoe.
     Falha de carga = o gradiente permanece. Sem flicker, sem erro.
     --------------------------------------------------------------------- */
  function applyBackground(el, bgId) {
    var def = RBF.BACKGROUNDS[bgId];
    if (!def) {
      note('bg:' + bgId, 'id inexistente no manifesto');
      def = RBF.BACKGROUNDS.bg_black;
      bgId = 'bg_black';
    }
    el.setAttribute('data-bg', bgId);
    el.style.backgroundImage = 'none';
    el.style.background = def.css;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';

    if (!def.available || !def.file) { return; }

    var url = cfg().paths.backgrounds + def.file;
    if (imgCache[url] === 'fail') { return; }
    if (imgCache[url] === 'ok') {
      el.style.backgroundImage = 'url("' + url + '")';
      return;
    }
    var probe = new Image();
    probe.onload = function () {
      imgCache[url] = 'ok';
      if (el.getAttribute('data-bg') === bgId) {
        el.style.backgroundImage = 'url("' + url + '")';
      }
    };
    probe.onerror = function () {
      imgCache[url] = 'fail';
      note('bg:' + bgId, url);
    };
    probe.src = url;
  }

  /* ---------------------------------------------------------------------
     PERSONAGENS
     Retorna { url, mode, size, def, expression }.
     mode: 'file' | 'placeholder' | 'hide'
     Expressao inexistente cai para fallbackExpression, sem erro.
     --------------------------------------------------------------------- */
  function characterSource(charId, expression) {
    var def = RBF.CHARACTERS[charId];
    if (!def) {
      note('char:' + charId, 'personagem inexistente no manifesto');
      return { url: null, mode: 'hide', size: 'bust', def: null, expression: null };
    }
    var ex = expression;
    if (!ex || !def.sprites[ex]) {
      if (ex) { note('expr:' + charId + '.' + ex, 'usando ' + def.fallbackExpression); }
      ex = def.fallbackExpression;
    }
    var fileName = def.sprites[ex];
    if (!def.available || !fileName) {
      return { url: fallbackFor(def), mode: def.onMissing, size: def.size, def: def, expression: ex };
    }
    return {
      url:        cfg().paths.characters + def.dir + '/' + fileName,
      mode:       'file',
      size:       def.size,
      def:        def,
      expression: ex
    };
  }

  function fallbackFor(def) {
    if (!def || def.onMissing === 'hide') { return null; }
    return characterPlaceholder(def.name, def.size);
  }

  /* Aplica src em um <img>. Chama onResolved(visivel, size).
     Nunca deixa o <img> com src invalido: em caso de falha remove o src. */
  function applyCharacter(imgEl, charId, expression, onResolved) {
    var src = characterSource(charId, expression);
    var def = src.def;

    function finish(url, mode) {
      if (!url || mode === 'hide') {
        imgEl.removeAttribute('src');
        if (onResolved) { onResolved(false, src.size); }
        return;
      }
      imgEl.src = url;
      if (onResolved) { onResolved(true, src.size); }
    }

    if (src.mode !== 'file') { finish(src.url, src.mode); return; }
    if (imgCache[src.url] === 'ok')   { finish(src.url, 'file'); return; }
    if (imgCache[src.url] === 'fail') {
      note('char:' + charId + '.' + src.expression, src.url);
      finish(fallbackFor(def), def.onMissing);
      return;
    }

    var probe = new Image();
    probe.onload = function () {
      imgCache[src.url] = 'ok';
      finish(src.url, 'file');
    };
    probe.onerror = function () {
      imgCache[src.url] = 'fail';
      note('char:' + charId + '.' + src.expression, src.url);
      finish(fallbackFor(def), def.onMissing);
    };
    probe.src = src.url;
  }

  /* ---------------------------------------------------------------------
     ARTE DE UI
     Cromo estatico (moldura de painel, divisor, banner de nome...),
     compartilhado por varios elementos e estados em vez de um <img> por
     ocorrencia. Resolve cada entrada de RBF.UI_ART uma vez e escreve o
     resultado numa custom property --rbf-art-<id> no :root, que os
     seletores de css/ui.css e css/style.css consomem via var(). Falha
     ou available:false deixam a variavel em 'none': o componente usa o
     CSS que ja tinha, sem fundo vazio.
     --------------------------------------------------------------------- */
  function applyUiArtVars() {
    var root = document.documentElement;
    var id;
    for (id in RBF.UI_ART) {
      if (Object.prototype.hasOwnProperty.call(RBF.UI_ART, id)) {
        resolveUiArt(root, id, RBF.UI_ART[id]);
      }
    }
  }

  function resolveUiArt(root, id, def) {
    var slug    = id.replace(/_/g, '-');
    var varName = '--rbf-art-' + slug;

    /* Marca no <html> que ESTA peca carregou de verdade. O CSS usa para
       trocar o piso pela arte: componentes como o cartao de dossie
       precisam de uma borda propria enquanto nao ha pintura, e essa
       borda tem que sumir quando a pintura chega - senao fica um
       retangulo reto desenhado por cima de uma moldura rasgada.
       Uma variavel sozinha nao permite esse desvio; a classe permite. */
    function mark() {
      if (root && root.classList) { root.classList.add('rbf-has-' + slug); }
    }

    if (!def.available || !def.file) { return; }

    var url = cfg().paths.ui + def.file;
    /* url() dentro de uma custom property e resolvido contra a folha de
       estilo que CONSOME var(), nao contra a pagina - css/ui.css fica em
       css/, entao um caminho relativo viraria css/assets/ui/... e nunca
       carregaria. Absolutizar contra o documento evita isso, e continua
       funcionando aberto por file://.

       tools/minidom.js (o DOM escrito a mao que tools/validate.js usa
       pra rodar o jogo inteiro sem navegador) nao tem window.URL. Sem
       navegador real nao existe stylesheet pra resolver contra, entao
       cair no caminho relativo ali e inofensivo - so importa no
       navegador de verdade, onde URL sempre existe. */
    var absoluteUrl = url;
    if (typeof URL === 'function') {
      try { absoluteUrl = new URL(url, document.baseURI).href; } catch (e) { absoluteUrl = url; }
    }

    if (imgCache[url] === 'fail') { return; }
    if (imgCache[url] === 'ok') {
      root.style.setProperty(varName, 'url("' + absoluteUrl + '")');
      mark();
      return;
    }
    var probe = new Image();
    probe.onload = function () {
      imgCache[url] = 'ok';
      root.style.setProperty(varName, 'url("' + absoluteUrl + '")');
      mark();
    };
    probe.onerror = function () {
      imgCache[url] = 'fail';
      note('ui:' + id, url);
    };
    probe.src = url;
  }

  /* Lista ordenada de ids ausentes. Util no console: RBF.Assets.report() */
  function report() {
    var out = [];
    for (var k in missing) {
      if (Object.prototype.hasOwnProperty.call(missing, k)) { out.push(k); }
    }
    return out.sort();
  }

  return {
    applyBackground: applyBackground,
    applyCharacter:  applyCharacter,
    applyUiArtVars:  applyUiArtVars,
    characterSource: characterSource,
    placeholder:     characterPlaceholder,
    missing:         missing,
    report:          report
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.Assets; }
