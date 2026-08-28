/* ==========================================================================
   ARQUIVO RABENFELS - js/script.js

   Montagem do roteiro em execucao.

   O roteiro base e a concatenacao dos capitulos declarados em
   RBF.CHAPTERS. Escolhas injetam os beats da opcao escolhida logo apos
   o beat de escolha, o que muda os indices do array.

   Para que um save por indice continue valido, a montagem precisa ser
   deterministica: dado o mesmo registro de escolhas, o array resultante
   e sempre identico. E o que build() garante.

   Cada beat de escolha tem um id estavel. O registro de escolhas e um
   objeto { idDaEscolha: idDaOpcao } gravado no save.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Script = (function () {
  'use strict';


  /* ---- numeros que uma personagem enuncia -------------------------------

     Carmine conta as falas da Klara na estrada e diz o total em voz
     alta. O numero ja ficou para tras tres vezes - "trinta e uma"
     quando a caminhada era uma linha de narracao, 65/62/64 quando virou
     cena, 96/93/95 quando a infancia entrou - e cada vez ficou errado
     em silencio, na boca da unica personagem da obra que nunca erra um
     registro.

     Nao ha por que um humano manter isso. O beat declara o que quer
     contar e o numero sai do proprio roteiro, na hora da montagem:

       { t:'dial', ch:'carmine',
         frases:{ de:'PER11', ch:'klara', ate:'per11_floresta', ramo:'A' },
         if:{ rota:'perda', taught:'A' } }

     `de`    capitulo de onde contar (nome da variavel em RBF)
     `ch`    de quem sao as falas
     `ate`   id da cena onde a contagem para; ausente conta o capitulo
     `ramo`  valor de `taught` daquele ramo, porque cada partida ve um so
     `tx`    opcional: molde com %N%. O padrao e '%N% frases.'

     Se a caminhada crescer amanha, o numero cresce junto e ninguem
     precisa saber que ele existe.                                       */

  var contado = null;

  /* Conta as falas de `ch` ate a cena `ate`, com o ramo de `taught`
     fixado. Mesma comparacao estrita do engine: `passes()` compara campo
     a campo por igualdade, e um beat sem `if` sempre entra. */
  function contaFalas(spec) {
    var lista = RBF[spec.de];
    if (!lista || !lista.length) { return 0; }

    var estado = { rota: 'perda' };
    if (spec.ramo) { estado.taught = spec.ramo; }

    var n = 0;
    for (var i = 0; i < lista.length; i++) {
      var b = lista[i];
      if (spec.ate && b.t === 'scene' && b.id === spec.ate) { break; }
      if (b.t !== 'dial' || b.ch !== spec.ch) { continue; }

      var passa = true;
      for (var k in (b['if'] || {})) {
        if (b['if'][k] !== estado[k]) { passa = false; break; }
      }
      if (passa) { n += 1; }
    }
    return n;
  }

  /* Numero por extenso, no feminino, ate 999. Feminino porque o que se
     conta aqui e frase; se algum dia se contar passo, isto ganha um
     genero e nao um segundo dicionario. */
  var UNI = ['', 'uma', 'duas', 'tr\u00eas', 'quatro', 'cinco', 'seis',
             'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze',
             'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito',
             'dezenove'];
  var DEZ = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta',
             'sessenta', 'setenta', 'oitenta', 'noventa'];
  var CEM = ['', 'cento', 'duzentas', 'trezentas', 'quatrocentas',
             'quinhentas', 'seiscentas', 'setecentas', 'oitocentas',
             'novecentas'];

  function porExtenso(n) {
    if (n < 0 || n > 999) { return String(n); }
    if (n === 100) { return 'cem'; }
    if (n < 20) { return UNI[n] || 'zero'; }

    var partes = [];
    var c = Math.floor(n / 100);
    var resto = n % 100;
    if (c) { partes.push(CEM[c]); }

    if (resto) {
      if (resto < 20) {
        partes.push(UNI[resto]);
      } else {
        var d = Math.floor(resto / 10), u = resto % 10;
        partes.push(u ? DEZ[d] + ' e ' + UNI[u] : DEZ[d]);
      }
    }
    return partes.join(' e ');
  }

  /* Percorre o roteiro uma vez e troca `frases` por `tx`. Roda uma vez
     por sessao: base() e chamada muitas vezes, inclusive num laco de
     forca bruta sobre todas as combinacoes de escolha. */
  function resolveNumeros() {
    if (contado) { return; }
    contado = true;

    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      var part = RBF[RBF.CHAPTERS[i].data];
      if (!part) { continue; }
      for (var j = 0; j < part.length; j++) {
        var b = part[j];
        if (!b || !b.frases) { continue; }
        var molde = b.tx || '%N% frases.';
        var n = contaFalas(b.frases);
        var txt = porExtenso(n);
        b.tx = molde.replace('%N%', txt.charAt(0).toUpperCase() + txt.slice(1));
        b.frasesN = n;
      }
    }
  }

  /* ---- roteiro base ----------------------------------------------------- */

  function base() {
    resolveNumeros();
    var out = [];
    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      var part = RBF[RBF.CHAPTERS[i].data];
      if (part && part.length) { out = out.concat(part); }
    }
    return out;
  }

  /* ---- montagem com escolhas ja tomadas --------------------------------- */

  /* choiceLog: { choiceId: optionId }
     A ordem de aplicacao segue a ordem em que os beats de escolha
     aparecem no roteiro, nao a ordem de insercao no objeto. Isso mantem
     o resultado estavel entre sessoes. */
  function build(choiceLog) {
    var script = base();
    if (!choiceLog) { return script; }

    var i = 0;
    while (i < script.length) {
      var beat = script[i];
      if (beat && beat.t === 'cho' && beat.id &&
          Object.prototype.hasOwnProperty.call(choiceLog, beat.id)) {

        var opt = findOption(beat, choiceLog[beat.id]);
        if (opt && opt.then && opt.then.length) {
          var args = [i + 1, 0].concat(opt.then);
          Array.prototype.splice.apply(script, args);
          i += opt.then.length;
        }
      }
      i += 1;
    }
    return script;
  }

  function findOption(choiceBeat, optionId) {
    for (var i = 0; i < choiceBeat.opts.length; i++) {
      if (choiceBeat.opts[i].id === optionId) { return choiceBeat.opts[i]; }
    }
    return null;
  }

  /* ---- consultas -------------------------------------------------------- */

  function chapterById(id) {
    for (var i = 0; i < RBF.CHAPTERS.length; i++) {
      if (RBF.CHAPTERS[i].id === id) { return RBF.CHAPTERS[i]; }
    }
    return null;
  }

  function chapterLabel(id) {
    var c = chapterById(id);
    return c ? c.label : (id || '');
  }

  function chapterTitle(id) {
    var c = chapterById(id);
    return c ? c.title : '';
  }

  /* Indice do primeiro beat de um capitulo dentro de um roteiro montado. */
  function chapterStart(script, chapterId) {
    for (var i = 0; i < script.length; i++) {
      var b = script[i];
      if (b && b.t === 'scene' && b.chapter === chapterId) { return i; }
      if (b && b.t === 'chap' && b.chapter === chapterId) { return i; }
    }
    return -1;
  }

  /* Todos os beats de escolha do roteiro base, para validacao. */
  function choices() {
    var out = [];
    var s = base();
    for (var i = 0; i < s.length; i++) {
      if (s[i].t === 'cho') { out.push(s[i]); }
    }
    return out;
  }

  /* Titulo legivel de uma cena, para a previa do save. */
  function sceneLabel(script, index) {
    for (var i = Math.min(index, script.length - 1); i >= 0; i--) {
      var b = script[i];
      if (b && b.t === 'scene') { return b.title || b.id || ''; }
    }
    return '';
  }

  return {
    base:         base,
    build:        build,
    chapterById:  chapterById,
    chapterLabel: chapterLabel,
    chapterTitle: chapterTitle,
    chapterStart: chapterStart,
    choices:      choices,
    sceneLabel:   sceneLabel,

    /* Usado por tools/validate.js para conferir numeros que o roteiro
       enuncia por extenso. Exposto para que exista um conversor so. */
    porExtenso:   porExtenso
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Script;
}
