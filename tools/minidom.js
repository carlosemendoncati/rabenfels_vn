/* ==========================================================================
   ARQUIVO RABENFELS - tools/minidom.js

   DOM minimo, escrito com modulos nativos do Node apenas.

   Existe para que tools/validate.js possa executar o jogo de verdade sem
   exigir npm install, jsdom ou qualquer pacote externo. Implementa o
   subconjunto de DOM que o projeto usa e nada alem disso.

   Nao e um navegador. Nao faz layout, nao carrega imagem, nao toca som.
   Serve para verificar fluxo, estado, roteiro e integridade.
   ========================================================================== */
'use strict';

/* ---- eventos ----------------------------------------------------------- */

function makeEvent(type, props) {
  var ev = {
    type: type,
    defaultPrevented: false,
    propagationStopped: false,
    target: null,
    currentTarget: null,
    preventDefault: function () { ev.defaultPrevented = true; },
    stopPropagation: function () { ev.propagationStopped = true; }
  };
  if (props) {
    for (var k in props) {
      if (Object.prototype.hasOwnProperty.call(props, k)) { ev[k] = props[k]; }
    }
  }
  return ev;
}

/* ---- classList --------------------------------------------------------- */

function ClassList(owner) {
  this.owner = owner;
}

ClassList.prototype._parts = function () {
  var raw = this.owner._className || '';
  return raw.split(/\s+/).filter(Boolean);
};

ClassList.prototype._write = function (parts) {
  this.owner._className = parts.join(' ');
};

ClassList.prototype.add = function () {
  var parts = this._parts();
  for (var i = 0; i < arguments.length; i++) {
    if (parts.indexOf(arguments[i]) === -1) { parts.push(arguments[i]); }
  }
  this._write(parts);
};

ClassList.prototype.remove = function () {
  var parts = this._parts();
  for (var i = 0; i < arguments.length; i++) {
    var at = parts.indexOf(arguments[i]);
    if (at !== -1) { parts.splice(at, 1); }
  }
  this._write(parts);
};

ClassList.prototype.contains = function (name) {
  return this._parts().indexOf(name) !== -1;
};

ClassList.prototype.toggle = function (name, force) {
  var has = this.contains(name);
  var want = (force === undefined) ? !has : !!force;
  if (want) { this.add(name); } else { this.remove(name); }
  return want;
};

/* ---- style ------------------------------------------------------------- */

function Style() {
  this._props = {};
}

Style.prototype.setProperty = function (name, value) {
  this._props[name] = value;
};

Style.prototype.getPropertyValue = function (name) {
  return this._props[name] || '';
};

/* ---- elemento ---------------------------------------------------------- */

function Element(tag, doc) {
  this.tagName    = String(tag).toUpperCase();
  this.ownerDocument = doc;
  this.childNodes = [];
  this.parentNode = null;
  this.attributes = {};
  this.style      = new Style();
  this.listeners  = {};
  this._className = '';
  this._text      = '';
  this.classList  = new ClassList(this);

  /* propriedades usadas por controles de formulario */
  this.value      = '';
  this.type       = '';
  this.files      = null;
  this.scrollTop  = 0;
  this.scrollHeight = 0;
}

Object.defineProperty(Element.prototype, 'className', {
  get: function () { return this._className; },
  set: function (v) { this._className = String(v == null ? '' : v); }
});

Object.defineProperty(Element.prototype, 'id', {
  get: function () { return this.attributes.id || ''; },
  set: function (v) {
    this.attributes.id = String(v);
    if (this.ownerDocument) { this.ownerDocument._index[String(v)] = this; }
  }
});

Object.defineProperty(Element.prototype, 'firstChild', {
  get: function () { return this.childNodes.length ? this.childNodes[0] : null; }
});

Object.defineProperty(Element.prototype, 'textContent', {
  get: function () {
    if (!this.childNodes.length) { return this._text; }
    var out = this._text;
    for (var i = 0; i < this.childNodes.length; i++) {
      out += this.childNodes[i].textContent;
    }
    return out;
  },
  set: function (v) {
    this.childNodes.length = 0;
    this._text = String(v == null ? '' : v);
  }
});

Object.defineProperty(Element.prototype, 'innerHTML', {
  get: function () { return this.textContent; },
  set: function (v) {
    this.childNodes.length = 0;
    this._text = String(v == null ? '' : v);
  }
});

Element.prototype.appendChild = function (child) {
  if (child.parentNode) { child.parentNode.removeChild(child); }
  child.parentNode = this;
  this.childNodes.push(child);
  return child;
};

Element.prototype.removeChild = function (child) {
  var at = this.childNodes.indexOf(child);
  if (at !== -1) {
    this.childNodes.splice(at, 1);
    child.parentNode = null;
  }
  return child;
};

Element.prototype.setAttribute = function (name, value) {
  this.attributes[name] = String(value);
  if (name === 'id' && this.ownerDocument) {
    this.ownerDocument._index[String(value)] = this;
  }
};

Element.prototype.getAttribute = function (name) {
  return Object.prototype.hasOwnProperty.call(this.attributes, name)
    ? this.attributes[name] : null;
};

Element.prototype.removeAttribute = function (name) {
  delete this.attributes[name];
};

Element.prototype.addEventListener = function (type, fn, capture) {
  var key = type + (capture ? ':capture' : '');
  if (!this.listeners[key]) { this.listeners[key] = []; }
  this.listeners[key].push(fn);
};

Element.prototype.removeEventListener = function (type, fn, capture) {
  var key = type + (capture ? ':capture' : '');
  var list = this.listeners[key];
  if (!list) { return; }
  var at = list.indexOf(fn);
  if (at !== -1) { list.splice(at, 1); }
};

Element.prototype._fire = function (ev, capture) {
  var key = ev.type + (capture ? ':capture' : '');
  var list = this.listeners[key];
  if (!list || !list.length) { return; }
  var copy = list.slice();
  for (var i = 0; i < copy.length; i++) {
    ev.currentTarget = this;
    copy[i].call(this, ev);
    if (ev.propagationStopped) { return; }
  }
};

/* Sobe a arvore ate o document, como o navegador faz. */
Element.prototype.dispatchEvent = function (ev) {
  ev.target = this;
  var node = this;
  while (node) {
    node._fire(ev, false);
    if (ev.propagationStopped) { return !ev.defaultPrevented; }
    node = node.parentNode;
  }
  if (this.ownerDocument) { this.ownerDocument._fire(ev, false); }
  return !ev.defaultPrevented;
};

Element.prototype.focus = function () {
  if (this.ownerDocument) { this.ownerDocument.activeElement = this; }
};

Element.prototype.blur = function () {
  if (this.ownerDocument && this.ownerDocument.activeElement === this) {
    this.ownerDocument.activeElement = null;
  }
};

/* Usado para reiniciar animacao (void el.offsetWidth). */
Object.defineProperty(Element.prototype, 'offsetWidth', {
  get: function () { return 0; }
});

Element.prototype.click = function () {
  return this.dispatchEvent(makeEvent('click', { bubbles: true }));
};

Element.prototype.querySelector = function (sel) {
  var found = null;
  walk(this, function (node) {
    if (found) { return; }
    if (matches(node, sel)) { found = node; }
  });
  return found;
};

Element.prototype.querySelectorAll = function (sel) {
  var out = [];
  walk(this, function (node) {
    if (matches(node, sel)) { out.push(node); }
  });
  return out;
};

function walk(node, fn) {
  for (var i = 0; i < node.childNodes.length; i++) {
    var c = node.childNodes[i];
    fn(c);
    walk(c, fn);
  }
}

/* Aceita apenas os seletores que o projeto usa: tag e .classe */
function matches(node, sel) {
  if (!sel) { return false; }
  if (sel.charAt(0) === '.') { return node.classList.contains(sel.slice(1)); }
  return node.tagName === sel.toUpperCase();
}

/* ---- documento --------------------------------------------------------- */

function Document() {
  Element.call(this, 'document', null);
  this.ownerDocument = this;
  this._index = {};
  this.readyState = 'complete';

  this.activeElement = null;
  this.hidden = false;
  this.fullscreenElement = null;

  this.documentElement = this.createElement('html');
  this.body = this.createElement('body');
  this.appendChild(this.documentElement);
  this.appendChild(this.body);
}

Document.prototype = Object.create(Element.prototype);
Document.prototype.constructor = Document;

Document.prototype.createElement = function (tag) {
  return new Element(tag, this);
};

/* SVG: o projeto cria <svg> e <use> por createElementNS. Para efeito de
   validacao um elemento comum basta. */
Document.prototype.createElementNS = function (ns, tag) {
  return new Element(tag, this);
};

/* No de texto: um elemento sem tag que so carrega conteudo. */
Document.prototype.createTextNode = function (text) {
  var node = new Element('#text', this);
  node._text = String(text == null ? '' : text);
  return node;
};

Document.prototype.getElementById = function (id) {
  return this._index[id] || null;
};

/* ---- localStorage ------------------------------------------------------ */

function MemoryStorage() {
  this._data = {};
}

MemoryStorage.prototype.getItem = function (k) {
  return Object.prototype.hasOwnProperty.call(this._data, k) ? this._data[k] : null;
};

MemoryStorage.prototype.setItem = function (k, v) {
  this._data[k] = String(v);
};

MemoryStorage.prototype.removeItem = function (k) {
  delete this._data[k];
};

MemoryStorage.prototype.clear = function () {
  this._data = {};
};

/* ---- janela ------------------------------------------------------------ */

/*
  Monta um contexto pronto para receber os scripts do projeto.

  ids: lista de identificadores extraidos do index.html. Cada um vira um
  elemento vazio, o que basta porque o engine so os usa por getElementById.
*/
function createWindow(ids) {
  var document = new Document();

  for (var i = 0; i < ids.length; i++) {
    var node = document.createElement('div');
    node.id = ids[i];
    document.body.appendChild(node);
  }

  /* Imagem e audio: nunca carregam. O projeto trata isso como asset
     ausente, que e exatamente o caminho de fallback a ser exercitado. */
  function FakeImage() {
    this.onload = null;
    this.onerror = null;
    var self = this;
    Object.defineProperty(this, 'src', {
      set: function (v) {
        this._src = v;
        setTimeout(function () { if (self.onerror) { self.onerror(); } }, 0);
      },
      get: function () { return this._src; }
    });
  }

  function FakeAudio() {
    this.volume = 1;
    this.loop = false;
    this.currentTime = 0;
    this.preload = '';
    this._handlers = {};
    var self = this;
    Object.defineProperty(this, 'src', {
      set: function (v) {
        this._src = v;
        setTimeout(function () {
          var list = self._handlers.error || [];
          for (var i = 0; i < list.length; i++) { list[i](); }
        }, 0);
      },
      get: function () { return this._src; }
    });
  }

  FakeAudio.prototype.addEventListener = function (type, fn) {
    if (!this._handlers[type]) { this._handlers[type] = []; }
    this._handlers[type].push(fn);
  };

  FakeAudio.prototype.removeEventListener = function (type, fn) {
    var list = this._handlers[type];
    if (!list) { return; }
    var at = list.indexOf(fn);
    if (at !== -1) { list.splice(at, 1); }
  };

  FakeAudio.prototype.load  = function () {};
  FakeAudio.prototype.play  = function () { return Promise.resolve(); };
  FakeAudio.prototype.pause = function () {};
  FakeAudio.prototype.cloneNode = function () { return new FakeAudio(); };

  var win = {
    document:        document,
    localStorage:    new MemoryStorage(),
    sessionStorage:  new MemoryStorage(),
    Image:         FakeImage,
    Audio:         FakeAudio,
    setTimeout:    setTimeout,
    clearTimeout:  clearTimeout,
    setInterval:   setInterval,
    clearInterval: clearInterval,
    Promise:       Promise,
    console:       console,
    requestAnimationFrame: function (fn) { return setTimeout(fn, 0); },
    cancelAnimationFrame:  function (id) { clearTimeout(id); },
    Blob: function () {},
    URL:  { createObjectURL: function () { return 'blob:fake'; }, revokeObjectURL: function () {} },
    FileReader: function () {}
  };

  win.window = win;
  win.self   = win;
  win.globalThis = win;

  /* Dispara uma tecla no document, como o navegador. */
  win.pressKey = function (key) {
    var ev = makeEvent('keydown', { key: key, bubbles: true });
    document._fire(ev, true);
    if (ev.propagationStopped) { return ev; }
    document._fire(ev, false);
    return ev;
  };

  return win;
}

/* Extrai os id="..." de um HTML, na ordem em que aparecem. */
function idsFromHtml(html) {
  var out = [];
  var re = /\sid="([^"]+)"/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    if (out.indexOf(m[1]) === -1) { out.push(m[1]); }
  }
  return out;
}

/* Extrai os src dos <script> na ordem de carregamento. */
function scriptsFromHtml(html) {
  var out = [];
  var re = /<script src="([^"]+)"><\/script>/g;
  var m;
  while ((m = re.exec(html)) !== null) { out.push(m[1]); }
  return out;
}

/* Extrai os href de <link rel="stylesheet">. */
function stylesFromHtml(html) {
  var out = [];
  var re = /<link[^>]+href="([^"]+)"/g;
  var m;
  while ((m = re.exec(html)) !== null) { out.push(m[1]); }
  return out;
}

module.exports = {
  createWindow:    createWindow,
  idsFromHtml:     idsFromHtml,
  scriptsFromHtml: scriptsFromHtml,
  stylesFromHtml:  stylesFromHtml,
  makeEvent:       makeEvent
};
