/* ==========================================================================
   ARQUIVO RABENFELS - js/data/cob11.js
   ROTA COBERTURA - CAPITULO 11: "A Baixa"

   Somente dados. TODO BEAT CARREGA if:{ rota:'cobertura' }.

   Antoniette morreu diante da porta do patio. Este capitulo nao devolve
   voz, sprite ou futuro a ela. Registra o que a casa fez com a ausencia
   e o que chegou a Matheo depois.

   O que o jogador conferiu no percurso volta como fragmento do caderno.
   A linha que queimou a cobertura aparece sempre. O resto depende das
   marcas reais; nao ha descoberta gratuita.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

(function () {
'use strict';

var R = { rota: 'cobertura' };

RBF.COB11 = [

{ t:'chap', num:'CAP\u00cdTULO 11', name:'A BAIXA', chapter:'cob11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A CARRUAGEM
   O objeto de fuga existe. A passageira nao chega a ele.
   ====================================================================== */
{ t:'scene', id:'cob11_carruagem', chapter:'cob11', title:'Seis da manh\u00e3',
  bg:'bg_nidhaus_gate', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'A carruagem esperou no p\u00e1tio com a porta aberta.', if:R },
{ t:'nar', tx:'As duas malas estavam presas atr\u00e1s do banco. O ba\u00fa de ferramentas n\u00e3o estava.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O cocheiro perguntou uma vez pela passageira.', if:R },
{ t:'nar', tx:'Recebeu o valor da corrida inteira e saiu \u00e0s seis.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Fenn levou as malas de volta ao quarto do fundo.', if:R },
{ t:'nar', tx:'A cama estava feita. A vela n\u00e3o estava no casti\u00e7al.', if:R },

/* ======================================================================
   C2 - NOVE DIAS
   A formula da casa e a mesma da ficha anterior.
   ====================================================================== */
{ t:'scene', id:'cob11_ficha', chapter:'cob11', title:'Nove dias',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A ficha de pessoal chegou a Lervel nove dias depois, certificada.', if:R },
{ t:'arc', key:'ficha', label:'\u2014 Velha Nidhaus \u00b7 livro de pessoal \u2014', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admiss\u00e3o: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de sa\u00fade.'
], if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Eu j\u00e1 li esta linha.', if:R },
{ t:'nar', tx:'Matheo tinha lido a mesma f\u00f3rmula numa ficha de trinta e sete anos antes.', if:R },
{ t:'nar', tx:'Leu uma semana antes de assinar a autoriza\u00e7\u00e3o de campo dela.', if:R },

/* ======================================================================
   C3 - NOVENTA E TRES DIAS
   O mecanismo do ponto morto ja esta no Prologo. Aqui muda o conteudo:
   o caderno saiu da casa. A forma como saiu nao e explicada.
   ====================================================================== */
{ t:'scene', id:'cob11_pacote', chapter:'cob11', title:'Noventa e tr\u00eas dias',
  bg:'bg_prologue_room', bgm:null, if:R },

{ t:'nar', tx:'O pacote chegou no nonag\u00e9simo terceiro dia.', if:R },
{ t:'nar', tx:'Dentro havia o caderno sem identifica\u00e7\u00e3o que ficava no forro do ba\u00fa.', if:R },
{ t:'nar', tx:'Duzentas e quarenta e uma p\u00e1ginas.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'cob_linha', label:'\u2014 caderno sem identifica\u00e7\u00e3o \u00b7 p. 241 \u2014', lns:[
    'Remessa de agosto, ano tr\u00eas: conferida.',
    'Nome da antecessora e identifica\u00e7\u00e3o da fonte: conferidos.',
    'As duas remessas passaram pelo livro de sa\u00edda da casa.',
    '',
    'A linha est\u00e1 correta.',
    'O visto na margem tem a data de amanh\u00e3.'
], if:R },

{ t:'arc', key:'cob_maio', label:'\u2014 margem \u00b7 maio, ano cinco \u2014', lns:[
    'S. Rabenfels escreveu a Lervel para conferir as refer\u00eancias do Compilador.',
    'Informou o procedimento ao Compilador na mesma tarde.'
], if:{ rota:'cobertura', cob_maio:true } },

{ t:'arc', key:'cob_manual', label:'\u2014 margem do manual \u00b7 p. 11 \u2014', lns:[
    'Prova sem proced\u00eancia n\u00e3o vale em mat\u00e9ria de foro.',
    'O procedimento foi cumprido.'
], if:{ rota:'cobertura', cob_manual:true } },

{ t:'arc', key:'cob_camara', label:'\u2014 anota\u00e7\u00e3o sem data \u2014', lns:[
    'C\u00e2mara sob a copa. Cilindro de vidro.',
    'Dentro: Klara Rabenfels.'
], if:{ rota:'cobertura', cob_camara:true } },

{ t:'arc', key:'cob_laudo', label:'\u2014 anota\u00e7\u00e3o sem data \u2014', lns:[
    'Formul\u00e1rios de baixa j\u00e1 impressos.',
    'Terceira op\u00e7\u00e3o: motivo de sa\u00fade.'
], if:{ rota:'cobertura', cob_laudo:true } },

{ t:'arc', key:'cob_retrato', label:'\u2014 anota\u00e7\u00e3o sem data \u2014', lns:[
    'Retrato de uma governanta sem nome.',
    'A legenda registra entrada e sa\u00edda.'
], if:{ rota:'cobertura', cob_retrato:true } },

{ t:'nar', tx:'N\u00e3o havia outra confer\u00eancia depois da linha.', if:{ rota:'cobertura', cob_livro:false } },
{ t:'pause', if:R },
{ t:'nar', tx:'Matheo contou as p\u00e1ginas duas vezes.', if:R },
{ t:'nar', tx:'A numera\u00e7\u00e3o terminava em duzentos e quarenta e um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela achou a linha.', if:R },
{ t:'inn', tx:'A linha n\u00e3o abriu a porta.', if:R },

{ t:'fade_out', if:R },
{ t:'end_chap', line1:'O Arquivo saiu incompleto.', line2:'Antoniette n\u00e3o saiu.',
  chapter:'cob11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.COB11; }
