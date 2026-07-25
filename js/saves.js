/* ==========================================================================
   ARQUIVO RABENFELS - js/saves.js

   Saves manuais, autosave, save rapido e progresso global.

   Esquema gravado (versao em RBF.CONFIG.saveSchemaVersion):

     schemaVersion, gameVersion, createdAt, updatedAt, playtimeSeconds,
     chapterId, sceneId, beatIndex,
     flags, variables, unlockedContent,
     choiceLog, history,
     presentation: {
       backgroundId, characterId, expressionId, characterPosition,
       characters, textMode, currentBgmId
     },
     preview: { chapterLabel, sceneLabel, dialogueExcerpt }

   choiceLog e history nao constam do minimo exigido, mas sem eles o
   load nao reconstroi o roteiro nem o backlog. Sao adicoes, nao
   substituicoes: todos os campos do minimo continuam presentes.

   Um save invalido nunca e carregado. validate() explica o motivo.
   ========================================================================== */

var RBF = (typeof RBF !== 'undefined') ? RBF : {};

RBF.Saves = (function () {
  'use strict';

  var AUTOSAVE  = 'auto';
  var QUICKSAVE = 'quick';

  function keys()      { return RBF.STORAGE.keys; }
  function slotCount() { return RBF.STORAGE.slotCount; }

  /* ---- leitura bruta ---------------------------------------------------- */

  function readSlots() {
    var raw = RBF.Storage.read(keys().saves, null);
    if (!raw || typeof raw !== 'object') { return {}; }
    return raw;
  }

  function writeSlots(obj) {
    return RBF.Storage.write(keys().saves, obj);
  }

  /* ---- validacao -------------------------------------------------------- */

  /* Retorna null se valido, ou uma string explicando o problema. */
  function validate(data) {
    if (!data || typeof data !== 'object')      { return 'save vazio ou corrompido'; }
    if (typeof data.schemaVersion !== 'number') { return 'save sem vers\u00e3o de formato'; }

    if (data.schemaVersion > RBF.CONFIG.saveSchemaVersion) {
      return 'save de uma vers\u00e3o mais nova do jogo';
    }
    if (data.schemaVersion < RBF.CONFIG.saveSchemaVersion) {
      return 'save de um formato antigo e incompat\u00edvel';
    }
    if (typeof data.beatIndex !== 'number' || data.beatIndex < 0) {
      return 'posi\u00e7\u00e3o de leitura inv\u00e1lida';
    }
    if (!data.chapterId || !RBF.Script.chapterById(data.chapterId)) {
      return 'cap\u00edtulo desconhecido';
    }

    /* O indice precisa caber no roteiro reconstruido com as mesmas escolhas. */
    var script = RBF.Script.build(data.choiceLog || {});
    if (data.beatIndex > script.length) {
      return 'posi\u00e7\u00e3o fora do roteiro atual';
    }
    return null;
  }

  function isValid(data) { return validate(data) === null; }

  /* ---- criacao ---------------------------------------------------------- */

  /* snapshot vem de RBF.Engine.snapshot(). */
  function compose(snapshot) {
    var now = new Date().toISOString();

    return {
      schemaVersion: RBF.CONFIG.saveSchemaVersion,
      gameVersion:   RBF.CONFIG.gameVersion,
      createdAt:     now,
      updatedAt:     now,

      playtimeSeconds: snapshot.playtimeSeconds || 0,

      chapterId: snapshot.chapterId,
      sceneId:   snapshot.sceneId,
      beatIndex: snapshot.beatIndex,

      flags:           snapshot.flags     || {},
      variables:       snapshot.variables || {},
      unlockedContent: snapshot.unlockedContent || [],

      choiceLog: snapshot.choiceLog || {},
      routes:    snapshot.routes    || {},
      history:   snapshot.history   || [],

      presentation: {
        backgroundId:      snapshot.presentation.backgroundId || 'bg_black',
        characterId:       snapshot.presentation.characterId || null,
        expressionId:      snapshot.presentation.expressionId || null,
        characterPosition: snapshot.presentation.characterPosition || null,
        characters:        snapshot.presentation.characters || [],
        textMode:          snapshot.presentation.textMode || 'narration',
        currentBgmId:      snapshot.presentation.currentBgmId || null
      },

      preview: {
        chapterLabel:    RBF.Script.chapterLabel(snapshot.chapterId),
        sceneLabel:      snapshot.sceneLabel || '',
        dialogueExcerpt: snapshot.dialogueExcerpt || ''
      }
    };
  }

  /* ---- gravacao --------------------------------------------------------- */

  function saveToSlot(slotId, snapshot) {
    var data = compose(snapshot);

    if (slotId === AUTOSAVE) {
      return RBF.Storage.write(keys().autosave, data) ? data : null;
    }
    if (slotId === QUICKSAVE) {
      return RBF.Storage.write(keys().quicksave, data) ? data : null;
    }

    var n = parseInt(slotId, 10);
    if (!(n >= 1 && n <= slotCount())) { return null; }

    var slots = readSlots();
    var prev  = slots[String(n)];
    if (prev && prev.createdAt) { data.createdAt = prev.createdAt; }

    slots[String(n)] = data;
    return writeSlots(slots) ? data : null;
  }

  function autosave(snapshot) {
    if (!RBF.Settings.get('autosaveEnabled')) { return null; }
    return saveToSlot(AUTOSAVE, snapshot);
  }

  function quicksave(snapshot) {
    return saveToSlot(QUICKSAVE, snapshot);
  }

  /* ---- leitura ---------------------------------------------------------- */

  function loadSlot(slotId) {
    if (slotId === AUTOSAVE)  { return RBF.Storage.read(keys().autosave, null); }
    if (slotId === QUICKSAVE) { return RBF.Storage.read(keys().quicksave, null); }

    var slots = readSlots();
    var data  = slots[String(slotId)];
    return data || null;
  }

  function deleteSlot(slotId) {
    if (slotId === AUTOSAVE)  { RBF.Storage.remove(keys().autosave);  return true; }
    if (slotId === QUICKSAVE) { RBF.Storage.remove(keys().quicksave); return true; }

    var slots = readSlots();
    if (!slots[String(slotId)]) { return false; }
    delete slots[String(slotId)];
    return writeSlots(slots);
  }

  function hasSlot(slotId) {
    return !!loadSlot(slotId);
  }

  /* Lista completa para o painel: especiais primeiro, depois manuais. */
  function listSlots() {
    var out = [];

    out.push(describe(AUTOSAVE,  loadSlot(AUTOSAVE),  RBF.UI_TEXT.autosaveName));
    out.push(describe(QUICKSAVE, loadSlot(QUICKSAVE), RBF.UI_TEXT.quicksaveName));

    var slots = readSlots();
    for (var i = 1; i <= slotCount(); i++) {
      out.push(describe(String(i), slots[String(i)] || null, 'Espa\u00e7o ' + i));
    }
    return out;
  }

  function describe(id, data, label) {
    if (!data) {
      return {
        id:     id,
        label:  label,
        empty:  true,
        broken: false
      };
    }
    var problem = validate(data);
    return {
      id:      id,
      label:   label,
      empty:   false,
      broken:  problem !== null,
      problem: problem,

      chapter:   (data.preview && data.preview.chapterLabel) || RBF.Script.chapterLabel(data.chapterId),
      scene:     (data.preview && data.preview.sceneLabel) || data.sceneId || '',
      excerpt:   (data.preview && data.preview.dialogueExcerpt) || '',
      updatedAt: data.updatedAt || data.createdAt || null,
      playtime:  data.playtimeSeconds || 0,
      route:     routeLabel(data),
      background: (data.presentation && data.presentation.backgroundId) || 'bg_black',
      data:      data
    };
  }

  /* Rotulo neutro para a lista de saves. Mostra a rota dominante e nada
     mais: sem numero, sem antecipar consequencia. */
  function routeLabel(data) {
    if (!data) { return ''; }

    var r = data.routes;
    if (r) {
      var best = null;
      var defs = RBF.ROUTES || [];
      for (var i = 0; i < defs.length; i++) {
        var v = r[defs[i].id] || 0;
        if (v <= 0) { continue; }
        if (!best || v > best.value) { best = { label: defs[i].label, value: v }; }
      }
      if (best) { return best.label; }
    }

    /* Save anterior as rotas: cai para as flags, que sempre existiram. */
    var flags = data.flags;
    if (!flags) { return ''; }
    if (flags.archive_seed)  { return 'Arquivo'; }
    if (flags.klara_focus)   { return 'Observa\u00e7\u00e3o'; }
    if (flags.distance_kept) { return 'Dist\u00e2ncia'; }
    return '';
  }

  /* ---- save mais recente ------------------------------------------------ */

  function latest() {
    var best = null;
    var list = listSlots();
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (s.empty || s.broken || !s.updatedAt) { continue; }
      if (!best || s.updatedAt > best.updatedAt) { best = s; }
    }
    return best;
  }

  function hasAnyValid() { return latest() !== null; }

  /* ---- progresso global ------------------------------------------------- */

  function readProgress() {
    var p = RBF.Storage.read(keys().progress, null);
    if (!p || typeof p !== 'object') {
      p = { chaptersReached: [], finishedChapters: [], totalPlaytime: 0 };
    }
    if (!p.chaptersReached)  { p.chaptersReached = []; }
    if (!p.finishedChapters) { p.finishedChapters = []; }
    if (typeof p.totalPlaytime !== 'number') { p.totalPlaytime = 0; }
    return p;
  }

  function markChapterReached(chapterId) {
    if (!chapterId) { return; }
    var p = readProgress();
    if (p.chaptersReached.indexOf(chapterId) === -1) {
      p.chaptersReached.push(chapterId);
      RBF.Storage.write(keys().progress, p);
    }
  }

  function markChapterFinished(chapterId) {
    if (!chapterId) { return; }
    var p = readProgress();
    if (p.finishedChapters.indexOf(chapterId) === -1) {
      p.finishedChapters.push(chapterId);
      RBF.Storage.write(keys().progress, p);
    }
  }

  function chapterReached(chapterId) {
    return readProgress().chaptersReached.indexOf(chapterId) !== -1;
  }

  function addPlaytime(seconds) {
    if (!seconds) { return; }
    var p = readProgress();
    p.totalPlaytime += seconds;
    RBF.Storage.write(keys().progress, p);
  }

  /* ---- exportar e importar ---------------------------------------------- */

  function exportSlot(slotId) {
    var data = loadSlot(slotId);
    if (!data) { return false; }

    var stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    var name  = RBF.STORAGE.exportPrefix + slotId + '_' + stamp + '.json';
    return RBF.Storage.download(name, data);
  }

  /* onDone(ok, mensagem, dados) */
  function importToSlot(slotId, onDone) {
    RBF.Storage.upload(function (data, err) {
      if (err)   { onDone(false, err, null); return; }

      var problem = validate(data);
      if (problem) { onDone(false, problem, null); return; }

      data.updatedAt = new Date().toISOString();
      var written = saveToSlot(slotId, {
        playtimeSeconds: data.playtimeSeconds,
        chapterId:       data.chapterId,
        sceneId:         data.sceneId,
        beatIndex:       data.beatIndex,
        flags:           data.flags,
        variables:       data.variables,
        unlockedContent: data.unlockedContent,
        choiceLog:       data.choiceLog,
        routes:          data.routes,
        history:         data.history,
        presentation:    data.presentation,
        sceneLabel:      data.preview ? data.preview.sceneLabel : '',
        dialogueExcerpt: data.preview ? data.preview.dialogueExcerpt : ''
      });

      if (!written) { onDone(false, 'n\u00e3o foi poss\u00edvel gravar o save', null); return; }
      onDone(true, null, written);
    });
  }

  /* ---- formatacao ------------------------------------------------------- */

  function formatDate(iso) {
    if (!iso) { return ''; }
    var d = new Date(iso);
    if (isNaN(d.getTime())) { return ''; }
    try {
      return d.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return d.toISOString().slice(0, 16).replace('T', ' ');
    }
  }

  function formatPlaytime(seconds) {
    var s = Math.max(0, Math.floor(seconds || 0));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    if (h > 0) { return h + 'h ' + (m < 10 ? '0' : '') + m + 'min'; }
    if (m > 0) { return m + 'min'; }
    return s + 's';
  }

  return {
    AUTOSAVE:  AUTOSAVE,
    QUICKSAVE: QUICKSAVE,

    validate:  validate,
    isValid:   isValid,
    compose:   compose,

    saveToSlot: saveToSlot,
    autosave:   autosave,
    quicksave:  quicksave,

    loadSlot:   loadSlot,
    deleteSlot: deleteSlot,
    hasSlot:    hasSlot,
    listSlots:  listSlots,

    latest:      latest,
    hasAnyValid: hasAnyValid,

    readProgress:        readProgress,
    markChapterReached:  markChapterReached,
    markChapterFinished: markChapterFinished,
    chapterReached:      chapterReached,
    addPlaytime:         addPlaytime,

    exportSlot:   exportSlot,
    importToSlot: importToSlot,

    formatDate:     formatDate,
    formatPlaytime: formatPlaytime
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RBF.Saves;
}
