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

{ t:'chap', num:'CAPÍTULO 11', name:'A BAIXA', chapter:'cob11', if:R },
{ t:'fade_out', if:R },

/* ======================================================================
   C1 - A CARRUAGEM
   O objeto de fuga existe. A passageira nao chega a ele.
   ====================================================================== */
{ t:'scene', id:'cob11_carruagem', chapter:'cob11', title:'Seis da manhã',
  bg:'bg_nidhaus_gate', bgm:null, if:R },
{ t:'fade_in', if:R },

{ t:'nar', tx:'A carruagem esperou no pátio com a porta aberta.', if:R },
{ t:'nar', tx:'As duas malas estavam presas atrás do banco. O baú de ferramentas não estava.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'O cocheiro perguntou uma vez pela passageira.', if:R },
{ t:'nar', tx:'Recebeu o valor da corrida inteira e saiu às seis.', if:R },
{ t:'pause', if:R },
{ t:'nar', tx:'Fenn levou as malas de volta ao quarto do fundo.', if:R },
{ t:'nar', tx:'A cama estava feita. A vela não estava no castiçal.', if:R },

/* ======================================================================
   C2 - NOVE DIAS
   A formula da casa e a mesma da ficha anterior.
   ====================================================================== */
{ t:'scene', id:'cob11_ficha', chapter:'cob11', title:'Nove dias',
  bg:'bg_archive_closeup', bgm:'bgm_archive', if:R },

{ t:'nar', tx:'A ficha de pessoal chegou a Lervel nove dias depois, certificada.', if:R },
{ t:'arc', key:'ficha', label:'— Velha Nidhaus · livro de pessoal —', lns:[
    'VAEL, Antoniette. Catalogadora contratada.',
    'Admissão: abril, ano um. Baixa: agosto, ano cinco.',
    '',
    'Motivo de saúde.'
], if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Eu já li esta linha.', if:R },
{ t:'nar', tx:'Matheo tinha lido a mesma fórmula numa ficha de trinta e sete anos antes.', if:R },
{ t:'nar', tx:'Leu uma semana antes de assinar a autorização de campo dela.', if:R },

/* ======================================================================
   C3 - NOVENTA E TRES DIAS
   O mecanismo do ponto morto ja esta no Prologo. Aqui muda o conteudo:
   o caderno saiu da casa. A forma como saiu nao e explicada.
   ====================================================================== */
{ t:'scene', id:'cob11_pacote', chapter:'cob11', title:'Noventa e três dias',
  bg:'bg_prologue_room', bgm:null, if:R },

{ t:'nar', tx:'O pacote chegou no nonagésimo terceiro dia.', if:R },
{ t:'nar', tx:'Dentro havia o caderno sem identificação que ficava no forro do baú.', if:R },
{ t:'nar', tx:'Duzentas e quarenta e uma páginas.', if:R },
{ t:'pause', if:R },

{ t:'arc', key:'cob_linha', label:'— caderno sem identificação · p. 241 —', lns:[
    'Remessa de agosto, ano três: conferida.',
    'Nome da antecessora e identificação da fonte: conferidos.',
    'As duas remessas passaram pelo livro de saída da casa.',
    '',
    'A linha está correta.',
    'O visto na margem tem a data de amanhã.'
], if:R },

{ t:'arc', key:'cob_maio', label:'— margem · maio, ano cinco —', lns:[
    'S. Rabenfels escreveu a Lervel para conferir as referências do Compilador.',
    'Informou o procedimento ao Compilador na mesma tarde.'
], if:{ rota:'cobertura', cob_maio:true } },

{ t:'arc', key:'cob_manual', label:'— margem do manual · p. 11 —', lns:[
    'Prova sem procedência não vale em matéria de foro.',
    'O procedimento foi cumprido.'
], if:{ rota:'cobertura', cob_manual:true } },

{ t:'arc', key:'cob_camara', label:'— anotação sem data —', lns:[
    'Câmara sob a copa. Cilindro de vidro.',
    'Dentro: Klara Rabenfels.'
], if:{ rota:'cobertura', cob_camara:true } },

{ t:'arc', key:'cob_laudo', label:'— anotação sem data —', lns:[
    'Formulários de baixa já impressos.',
    'Terceira opção: motivo de saúde.'
], if:{ rota:'cobertura', cob_laudo:true } },

{ t:'arc', key:'cob_retrato', label:'— anotação sem data —', lns:[
    'Retrato de uma governanta sem nome.',
    'A legenda registra entrada e saída.'
], if:{ rota:'cobertura', cob_retrato:true } },

{ t:'nar', tx:'Não havia outra conferência depois da linha.', if:{ rota:'cobertura', cob_livro:false } },
{ t:'pause', if:R },
{ t:'nar', tx:'Matheo contou as páginas duas vezes.', if:R },
{ t:'nar', tx:'A numeração terminava em duzentos e quarenta e um.', if:R },
{ t:'pause', if:R },
{ t:'inn', tx:'Ela achou a linha.', if:R },
{ t:'inn', tx:'A linha não abriu a porta.', if:R },

{ t:'fade_out', if:R },
{ t:'end_chap', line1:'O Arquivo saiu incompleto.', line2:'Antoniette não saiu.',
  chapter:'cob11', if:R },
{ t:'fade_out', if:R }

];

})();

if (typeof module !== 'undefined' && module.exports) { module.exports = RBF.COB11; }
