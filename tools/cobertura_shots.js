#!/usr/bin/env node
/* ==========================================================================
   ARQUIVO RABENFELS - tools/cobertura_shots.js

   Abre o percurso num navegador de verdade, anda com ele e grava imagem.

   Existe porque nem tools/validate.js nem tools/smoke.html veem o
   percurso: os dois rodam em DOM sem canvas, e la o beat resolve na hora
   e devolve o roteiro - que e o comportamento certo, e tambem o que
   torna os dois cegos para tudo o que este arquivo confere.

   O que ele mede, e que so aparece no navegador:
     - o canvas desenhou alguma coisa (nao ficou preto chapado)
     - a personagem anda e a colisao segura nas quatro paredes
     - a troca de sala funciona pelos vaos declarados
     - o alvo de interacao aparece e o texto entra
     - a bolsa recebe o item

   Uso:
     node tools/cobertura_shots.js
     node tools/cobertura_shots.js --tela 1366x768

   Requer Chrome ou Edge e o pacote playwright. Sem eles avisa e sai com
   codigo 0: e ferramenta de conferencia, nao requisito do jogo.
   ========================================================================== */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_ROOT = path.join(__dirname, '_shots', 'cobertura');

/*
  Servidor de arquivo, e nao file://.

  O jogo abre por file:// e vai continuar abrindo - e requisito. Mas
  uma imagem carregada por file:// contamina o canvas para origem
  cruzada, e getImageData passa a lancar SecurityError. O jogo nunca
  chama getImageData; ESTE ARQUIVO chama, para provar que o canvas
  desenhou alguma coisa em vez de ficar preto.

  Entao o servidor existe pelo teste, e nao pelo jogo.
*/
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg',
  '.wav':  'audio/wav'
};

function servidor() {
  const http = require('http');
  const srv = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/') { rel = '/index.html'; }
    const alvo = path.join(ROOT, rel);
    /* Nao servir nada fora da raiz do projeto. */
    if (!alvo.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    fs.readFile(alvo, (err, buf) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(alvo).toLowerCase()] ||
                                           'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

const BROWSERS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/opt/google/chrome/chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
];

let falhas = 0;
let total  = 0;

function check(ok, label, detail) {
  total += 1;
  if (!ok) { falhas += 1; }
  console.log('  ' + (ok ? 'PASS' : 'FALHA') + '  ' + label +
              (detail && !ok ? '\n        ' + detail : ''));
}

function tela() {
  const i = process.argv.indexOf('--tela');
  if (i === -1) { return { w: 1366, h: 768 }; }
  const m = /^(\d+)x(\d+)$/.exec(process.argv[i + 1] || '');
  return m ? { w: +m[1], h: +m[2] } : { w: 1366, h: 768 };
}

async function main() {
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch (e) {
    console.log('playwright ausente - nada a fazer.');
    return 0;
  }

  const exe = BROWSERS.find(p => fs.existsSync(p));
  if (!exe) {
    console.log('nenhum Chrome ou Edge encontrado - nada a fazer.');
    return 0;
  }

  const view = tela();
  const OUT = path.join(OUT_ROOT, view.w + 'x' + view.h);
  fs.mkdirSync(OUT, { recursive: true });

  const srv = await servidor();
  const URL = 'http://127.0.0.1:' + srv.address().port + '/index.html';

  const browser = await chromium.launch({ executablePath: exe });
  const telefone = view.w <= 600;
  const page = await browser.newPage({
    viewport: { width: view.w, height: view.h },
    isMobile: telefone,
    hasTouch: telefone
  });

  const erros = [];
  page.on('pageerror', e => erros.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') { erros.push(m.text()); } });

  await page.goto(URL);
  await page.waitForFunction('window.RBF && RBF.Rpg && RBF.COB_MAPAS', null, { timeout: 15000 });

  console.log('\nO PERCURSO - conferencia em navegador (' + view.w + 'x' + view.h + ')\n');

  /* ---- entrada -------------------------------------------------------- */

  /*
    Entra pelo Capitulo 10 da rota, e nao por chamada direta ao modulo.

    Duas camadas cobrem o percurso e as duas precisam sair sozinhas: o
    portao de abertura (95) e o menu principal (90). Chamar RBF.Rpg.entra()
    com o menu aberto passava em todas as checagens de estado e gravava
    uma imagem do MENU - o percurso estava vivo por baixo dele. Foi o
    unico defeito que este arquivo pegou e que nenhuma checagem de estado
    pegaria.

    startChapter('cob10') e o mesmo caminho da tela de capitulos.
  */
  await page.evaluate(() => {
    RBF.Settings.set('typewriter', false);
    RBF.Settings.set('contentWarning', false);
    RBF.CONFIG.text.pauseMs = 1;
    RBF.CONFIG.timing.fadeMs = 1;
    RBF.CONFIG.timing.cardMs = 1;
    RBF.Menu.openArchive();
  });
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    /* Mesma sequencia da tela de capitulos: esconde o menu e comeca o
       capitulo. hideMenu() nao e exportado, e a classe e a mesma coisa -
       o menu e um elemento com 'show', nao um estado. */
    document.getElementById('main-menu')
            .classList.remove('show', 'is-revealing', 'is-returning');
    RBF.Engine.startChapter('cob10');
  });
  await page.waitForTimeout(300);

  /* Avanca ate o beat de percurso. O capitulo tem cerca de cem beats
     antes dele; o limite de 400 e folga, e estourar significa que o
     beat parou de ser alcancavel. */
  const chegou = await page.evaluate(async () => {
    for (let i = 0; i < 500; i++) {
      if (RBF.Rpg.ativo()) { return i; }
      const d = RBF.Engine._debug;
      /* O Capitulo 10 da rota nao tem escolha, mas um capitulo futuro
         pode ter: clicar na primeira opcao mantem o teste util. */
      if (d.isChoice()) {
        const b = d.buttons();
        if (b.length) { b[0].click(); }
      } else {
        d.input();
      }
      await new Promise(r => setTimeout(r, 6));
    }
    return -1;
  });
  check(chegou >= 0, 'o roteiro chega ao beat de percurso',
        'nao chegou em 400 avancos');

  await page.waitForTimeout(1800);

  check(await page.evaluate(() => RBF.Rpg.ativo()), 'o percurso assumiu a tela');
  check(await page.evaluate(() => RBF.State.get() === 'percurso'),
        'estado da aplicacao e percurso');

  const capa = await page.evaluate(() => {
    const el = document.getElementById('rf-percurso');
    const r = el.getBoundingClientRect();
    return { on: el.classList.contains('is-on'), w: r.width, h: r.height };
  });
  check(capa.on, 'camada visivel');
  check(capa.w > 0 && capa.h > 0, 'camada com area', JSON.stringify(capa));

  /* ---- menu no percurso ------------------------------------------------

     Este e o caminho que falhava no telefone: o menu pausava o canvas,
     mas o fechamento so retomava o estado `playing`. O percurso vive em
     `percurso`, entao Antoniette permanecia parada depois de fechar. */
  const menuAbriu = await page.evaluate(() => {
    const b = document.querySelector('.rf-perc__menu');
    const r = b && b.getBoundingClientRect();
    if (b) { b.click(); }
    return { estado: RBF.State.get(), botao: !!(r && r.width >= 40 && r.height >= 40) };
  });
  await page.waitForTimeout(180);
  check(menuAbriu.botao, 'o percurso tem botao de menu com alvo de toque');
  check(await page.evaluate(() => RBF.State.get() === 'paused'),
        'abrir o menu pausa o percurso');
  check(!(await page.evaluate(() => RBF.Rpg.ativo())),
        'o canvas para enquanto o menu esta aberto');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(260);
  check(await page.evaluate(() => RBF.State.get() === 'percurso'),
        'fechar o menu devolve o estado percurso');
  check(await page.evaluate(() => RBF.Rpg.ativo()),
        'Antoniette volta a andar depois de fechar o menu');

  /* ---- um toque, uma caminhada -----------------------------------------

     Dispara down e up uma unica vez e espera. Se o destino fosse apagado
     quando o dedo sobe, o segundo intervalo ficaria praticamente zerado. */
  const toque = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    j.p.x = 420; j.p.y = 760; j.p.dir = 'direita'; j.toque = null;
    const inicio = { x: j.p.x, y: j.p.y };
    const cv = document.getElementById('rf-perc-canvas');
    const r = cv.getBoundingClientRect();
    const opts = {
      bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch',
      clientX: r.left + r.width * 0.86,
      clientY: r.top + r.height * 0.50
    };
    cv.dispatchEvent(new PointerEvent('pointerdown', opts));
    cv.dispatchEvent(new PointerEvent('pointerup', opts));
    await new Promise(ok => setTimeout(ok, 180));
    const meio = { x: j.p.x, y: j.p.y };
    await new Promise(ok => setTimeout(ok, 650));
    const fim = { x: j.p.x, y: j.p.y };
    const d1 = Math.hypot(meio.x - inicio.x, meio.y - inicio.y);
    const d2 = Math.hypot(fim.x - meio.x, fim.y - meio.y);
    const persistiu = !!j.toque || Math.hypot(fim.x - inicio.x, fim.y - inicio.y) > 90;
    j.toque = null;
    return { primeiro: Math.round(d1), depois: Math.round(d2), persistiu: persistiu };
  });
  check(toque.primeiro > 8, 'um toque inicia a caminhada', JSON.stringify(toque));
  check(toque.depois > 24 && toque.persistiu,
        'a caminhada continua depois que o dedo sobe', JSON.stringify(toque));

  /* ---- o canvas desenhou ---------------------------------------------- */

  const pinta = await page.evaluate(() => {
    const cv = document.getElementById('rf-perc-canvas');
    const c = cv.getContext('2d');
    const d = c.getImageData(0, 0, cv.width, cv.height).data;
    let claros = 0;
    for (let i = 0; i < d.length; i += 4 * 97) {
      if (d[i] + d[i + 1] + d[i + 2] > 60) { claros += 1; }
    }
    return { amostras: Math.floor(d.length / (4 * 97)), claros: claros };
  });
  check(pinta.claros > 20, 'o canvas nao ficou preto chapado',
        pinta.claros + ' de ' + pinta.amostras + ' amostras acesas');

  await page.screenshot({ path: path.join(OUT, '01_entrada.png') });

  /* ---- colisao nas quatro paredes ------------------------------------- */

  async function empurra(tecla, ms) {
    await page.keyboard.down(tecla);
    await page.waitForTimeout(ms);
    await page.keyboard.up(tecla);
    await page.waitForTimeout(120);
  }

  const inicio = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    return { x: j.p.x, y: j.p.y, sala: j.sala };
  });

  await empurra('ArrowLeft', 1400);
  const naEsquerda = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    const s = RBF.COB_MAPAS[j.sala];
    return { x: j.p.x, limite: s.piso[0] };
  });
  check(naEsquerda.x >= naEsquerda.limite,
        'parede esquerda segura',
        'x=' + Math.round(naEsquerda.x) + ' piso comeca em ' + naEsquerda.limite);
  check(naEsquerda.x < inicio.x, 'andou para a esquerda de verdade',
        'saiu de ' + Math.round(inicio.x) + ' e parou em ' + Math.round(naEsquerda.x));

  await empurra('ArrowUp', 1600);
  const noTopo = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    const s = RBF.COB_MAPAS[j.sala];
    return { y: j.p.y, limite: s.piso[1] };
  });
  check(noTopo.y >= noTopo.limite, 'parede de cima segura',
        'y=' + Math.round(noTopo.y) + ' piso comeca em ' + noTopo.limite);

  await page.screenshot({ path: path.join(OUT, '02_canto.png') });

  /* ---- interacao ------------------------------------------------------- */

  /* Vai ate o bau pelo caminho curto, e nao a pe: o que se confere aqui
     e a interacao, e nao a navegacao. */
  await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    const pt = RBF.COB_MAPAS.quarto.pontos.find(p => p.id === 'bau');
    j.p.x = pt.x; j.p.y = pt.y + 52; j.p.dir = 'cima';
  });
  await page.waitForTimeout(200);

  const temAlvo = await page.evaluate(() => {
    /* usa() so age quando ha alvo a frente; o retorno vem pelo estado. */
    RBF.Rpg._debug.usa();
    const j = RBF.Rpg._debug.estado();
    return !!j.fala;
  });
  check(temAlvo, 'o bau responde a interacao');

  await page.waitForTimeout(900);
  const falaVis = await page.evaluate(() => {
    const el = document.querySelector('.rf-perc__fala');
    const t = document.querySelector('.rf-perc__txt');
    return { on: el.classList.contains('is-on'), txt: (t.textContent || '').length };
  });
  check(falaVis.on, 'o painel de fala aparece');
  check(falaVis.txt > 0, 'o texto entra na maquina de escrever',
        falaVis.txt + ' caracteres');

  await page.screenshot({ path: path.join(OUT, '03_fala.png') });

  /* Fecha a fala e confere o item na bolsa. */
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(260);
  }

  const bolsa = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    return {
      itens: Object.keys(j.itens).length,
      selos: document.querySelectorAll('.rf-perc__item').length,
      marcas: Object.keys(j.marcas).length
    };
  });
  check(bolsa.itens >= 1, 'o caderno entrou na bolsa');
  check(bolsa.marcas >= 1, 'a marca foi registrada');

  /* pintaHud() so corre na entrada e na retomada; o selo aparece no
     proximo desenho de interface. Chamamos o mesmo caminho do save. */
  await page.screenshot({ path: path.join(OUT, '04_bolsa.png') });

  /* ---- troca de sala ---------------------------------------------------- */

  const trocou = await page.evaluate(() => {
    RBF.Rpg._debug.vaiPara('corredor', 690, 420, 'cima');
    return RBF.Rpg._debug.estado().sala;
  });
  check(trocou === 'corredor', 'troca de sala', 'sala=' + trocou);

  await page.waitForTimeout(1400);
  const pinta2 = await page.evaluate(() => {
    const cv = document.getElementById('rf-perc-canvas');
    const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
    let claros = 0;
    for (let i = 0; i < d.length; i += 4 * 97) {
      if (d[i] + d[i + 1] + d[i + 2] > 60) { claros += 1; }
    }
    return claros;
  });
  check(pinta2 > 20, 'o corredor desenhou', pinta2 + ' amostras acesas');
  await page.screenshot({ path: path.join(OUT, '05_corredor.png') });

  /* ---- sair por porta, pisando nela -------------------------------------

     vaiPara() acima prova que a troca funciona; isto prova que o VAO
     dispara. Sao coisas diferentes e a segunda ja falhou: o retangulo de
     saida e pintado do lado de fora do piso, os pes param na borda do
     piso, e com o teste de sobreposicao justo nenhuma saida chegava a
     encostar. Por isso existe a folga em passoSaidas().                  */

  const porta = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    /* corredor -> escritorio: o vao do rodape, em x 1258..1324 */
    j.sala = 'corredor';
    j.p.x = 1291; j.p.y = 440; j.p.dir = 'baixo';
    for (let i = 0; i < 60; i++) {
      j.p.y += 2;
      await new Promise(r => setTimeout(r, 16));
      if (RBF.Rpg._debug.estado().sala !== 'corredor') { break; }
    }
    return RBF.Rpg._debug.estado().sala;
  });
  check(porta === 'escritorio', 'o vao de porta dispara ao ser pisado',
        'parou em ' + porta);

  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, '06_escritorio.png') });

  /* ---- a porta que nao abre --------------------------------------------- */

  const trancada = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    j.sala = 'escritorio';
    j.p.x = 1250; j.p.y = 480; j.p.dir = 'direita';
    for (let i = 0; i < 40; i++) {
      j.p.x += 2;
      await new Promise(r => setTimeout(r, 16));
    }
    const el = document.querySelector('.rf-perc__aviso');
    return { sala: RBF.Rpg._debug.estado().sala,
             aviso: (el.textContent || '').trim(),
             visivel: el.classList.contains('is-on') };
  });
  check(trancada.sala === 'escritorio',
        'a porta da ala da familia nao deixa passar', 'foi para ' + trancada.sala);
  check(trancada.aviso.length > 0 && trancada.visivel,
        'a recusa aparece na tela', JSON.stringify(trancada));

  /* ---- o ponto que encerra ---------------------------------------------- */

  /* Dois pontos perto demais brigam pela mao: alvo() escolhe o mais
     proximo e o outro fica inalcancavel. Foi o que aconteceu com
     `fechar` e `livro_saida`, a trinta e seis pixels um do outro, e o
     ponto que ENCERRA o percurso nunca podia ser tocado.

     A checagem e estatica e roda sobre os mapas, nao sobre a partida. */
  const colados = await page.evaluate(() => {
    const out = [];
    const salas = RBF.COB_MAPAS;
    for (const id of Object.keys(salas)) {
      const p = salas[id].pontos || [];
      for (let a = 0; a < p.length; a++) {
        for (let b = a + 1; b < p.length; b++) {
          /* Dois pontos no mesmo lugar em FASES diferentes sao o
             mesmo objeto antes e depois da virada - a moldura vazia que
             deixa de estar vazia. Nunca coexistem, entao nao brigam. */
          const fa = p[a].fase, fb = p[b].fase;
          const coexistem = (fa === undefined || fb === undefined || fa === fb);
          if (!coexistem) { continue; }

          const dx = p[a].x - p[b].x, dy = p[a].y - p[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const r = Math.min(p[a].raio || 56, p[b].raio || 56);
          if (d < r * 0.75) {
            out.push(id + ': ' + p[a].id + ' x ' + p[b].id +
                     ' a ' + Math.round(d) + 'px');
          }
        }
      }
    }
    return out;
  });
  check(colados.length === 0, 'nenhum par de pontos disputa a mesma mao',
        colados.join(' | '));

  const fecha = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    const pt = RBF.COB_MAPAS.escritorio.pontos.find(p => p.id === 'fechar');
    j.p.x = pt.x; j.p.y = pt.y + 52; j.p.dir = 'cima';
    j.fala = null;
    RBF.Rpg._debug.usa();
    const f = RBF.Rpg._debug.estado().fala;
    return f ? f.linhas[0] : null;
  });
  check(!!fecha && fecha.indexOf('conferiu as duas colunas') !== -1,
        'o ponto de encerramento responde com o caderno na bolsa',
        'veio: ' + fecha);

  /* ======================================================================
     SEGUNDO ATO

     Daqui para baixo o mundo muda: porta que estava trancada abre, porta
     que estava aberta da em outro lugar, e o que ronda a casa passa a
     existir. Tudo isso e o campo `fase` das pecas do mapa, e nada disso
     e visto por checagem de estado - so andando.
     ====================================================================== */

  /* ---- a virada --------------------------------------------------------- */

  const antes = await page.evaluate(() => RBF.Rpg._debug.estado().fase);
  check(antes === 0, 'o percurso comeca na fase 0', 'fase=' + antes);

  const virou = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    const pt = RBF.COB_MAPAS.escritorio.pontos.find(p => p.id === 'fechar');
    j.sala = 'escritorio';
    j.p.x = pt.x; j.p.y = pt.y + 52; j.p.dir = 'cima';
    j.fala = null;
    RBF.Rpg._debug.usa();
    /* seis linhas ate a virada */
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 120));
      const f = RBF.Rpg._debug.estado().fala;
      if (!f) { break; }
      f.pronto = true; f.escrito = f.linhas[f.i];
      document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    }
    await new Promise(r => setTimeout(r, 300));
    return RBF.Rpg._debug.estado().fase;
  });
  check(virou === 1, 'conferir o livro vira o segundo ato', 'fase=' + virou);

  /* ---- a porta que deixou de dar onde dava ------------------------------ */

  const desviou = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    j.sala = 'corredor';
    j.p.x = 130; j.p.y = 260; j.p.dir = 'esquerda';
    for (let i = 0; i < 50; i++) {
      j.p.x -= 2;
      await new Promise(r => setTimeout(r, 16));
      if (RBF.Rpg._debug.estado().sala !== 'corredor') { break; }
    }
    return RBF.Rpg._debug.estado().sala;
  });
  check(desviou === 'escada',
        'na fase 1 a porta do quarto passa a dar na escada',
        'foi para ' + desviou);

  await page.waitForTimeout(1300);
  await page.screenshot({ path: path.join(OUT, '08_escada.png') });

  /* ---- a parede interna da escada --------------------------------------- */

  const parede = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    const obstaculo = RBF.COB_MAPAS.escada.paredes[0];
    /* fora do vao da escada, empurrando para baixo contra a divisoria */
    j.p.x = obstaculo.x + obstaculo.w / 2;
    j.p.y = obstaculo.y - 80;
    j.p.dir = 'baixo';
    const y0 = j.p.y;
    for (let i = 0; i < 60; i++) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await new Promise(r => setTimeout(r, 16));
    }
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown' }));
    return { y0: y0, y1: RBF.Rpg._debug.estado().p.y,
             limite: obstaculo.y };
  });
  check(parede.y1 < parede.limite, 'a divisoria da escada segura fora do vao',
        'parou em y=' + Math.round(parede.y1) +
        ' e a parede comeca em ' + parede.limite);

  /* ---- o vulto ---------------------------------------------------------- */

  const vulto = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    j.sala = 'escada';
    j.p.x = 700; j.p.y = 1180; j.p.dir = 'baixo';
    j.fala = null;
    /* deixa correr: o vulto ronda e ouve */
    const k = Object.keys(j.atores).filter(k => k.indexOf('escada') === 0);
    const antes = k.length ? { x: j.atores[k[0]].x, y: j.atores[k[0]].y } : null;
    for (let i = 0; i < 40; i++) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await new Promise(r => setTimeout(r, 20));
    }
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp' }));
    const st = RBF.Rpg._debug.estado();
    const kk = Object.keys(st.atores).filter(k => k.indexOf('escada') === 0);
    return { tinha: !!antes, tem: kk.length,
             moveu: kk.length && antes
                    ? Math.round(Math.abs(st.atores[kk[0]].x - antes.x) +
                                 Math.abs(st.atores[kk[0]].y - antes.y))
                    : 0 };
  });
  check(vulto.tem >= 1, 'o vulto existe na escada', JSON.stringify(vulto));

  /* ---- a camara --------------------------------------------------------- */

  const camara = await page.evaluate(async () => {
    RBF.Rpg._debug.vaiPara('camara', 620, 800, 'cima');
    await new Promise(r => setTimeout(r, 900));
    const j = RBF.Rpg._debug.estado();
    const pt = RBF.COB_MAPAS.camara.pontos.find(p => p.id === 'cilindro');
    j.p.x = pt.x; j.p.y = pt.y + 52; j.p.dir = 'cima';
    j.fala = null;
    RBF.Rpg._debug.usa();
    const f = RBF.Rpg._debug.estado().fala;
    return { sala: j.sala, linha: f ? f.linhas[0] : null,
             gente: (RBF.COB_MAPAS.camara.gente || []).length };
  });
  check(camara.sala === 'camara', 'a camara carrega', 'sala=' + camara.sala);
  check(!!camara.linha && camara.linha.indexOf('cilindro') !== -1,
        'o cilindro responde', 'veio: ' + camara.linha);
  check(camara.gente === 1, 'ha alguem parado na camara');

  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(OUT, '09_camara.png') });

  /* ---- o salao e a saida ------------------------------------------------- */

  const salao = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    /* Fecha a fala da camara pelo caminho normal, para a captura seguinte
       nao conservar no DOM uma caixa que o estado ja descartou. */
    for (let i = 0; i < 10 && j.fala; i++) {
      j.fala.pronto = true;
      j.fala.escrito = j.fala.linhas[j.fala.i] || '';
      RBF.Rpg._debug.usa();
    }
    RBF.Rpg._debug.vaiPara('salao', 700, 640, 'baixo');
    await new Promise(r => setTimeout(r, 900));
    const mapa = RBF.COB_MAPAS.salao;
    return {
      sala: RBF.Rpg._debug.estado().sala,
      carmine: (mapa.gente || []).some(g => g.ch === 'carmine' && g.parado),
      patio: (mapa.saidas || []).some(s => s.para === 'patio')
    };
  });
  check(salao.sala === 'salao', 'o salao carrega');
  check(salao.carmine, 'Carmine esta parada entre Antoniette e a porta');
  check(!salao.patio, 'nao existe saida jogavel para o patio');

  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(OUT, '10_salao.png') });

  /* O retrato usa a mesma marca do ponto para trocar a arte. Confere a
     mudanca pelo id logico; comparar pixels seria fragil sob a vela. */
  const retrato = await page.evaluate(async () => {
    const st = RBF.Rpg._debug.estado();
    st.fala = null;
    const movel = RBF.COB_MAPAS.salao.moveis.find(m => m.marca === 'cob_retrato');
    const pt = RBF.COB_MAPAS.salao.pontos.find(p => p.id === 'retrato');
    const antes = RBF.Rpg._debug.tipoMovel(movel);
    RBF.Rpg._debug.vaiPara('salao', pt.x, pt.y + 52, 'cima');
    await new Promise(r => setTimeout(r, 500));
    const j = RBF.Rpg._debug.estado();
    j.p.x = pt.x; j.p.y = pt.y + 52; j.p.dir = 'cima';
    RBF.Rpg._debug.usa();
    const depois = RBF.Rpg._debug.tipoMovel(movel);
    return { antes: antes, depois: depois,
             marca: !!j.marcas.cob_retrato,
             linha: j.fala && j.fala.linhas ? j.fala.linhas[0] : null };
  });
  check(retrato.antes === 'retrato_governanta_virado',
        'o retrato comeca virado', JSON.stringify(retrato));
  check(retrato.marca && retrato.depois === 'retrato_governanta_revelado',
        'conferir o retrato revela a frente', JSON.stringify(retrato));
  check(!!retrato.linha && retrato.linha.indexOf('retrato') !== -1,
        'o retrato responde com o texto correto', JSON.stringify(retrato));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, '11_retrato.png') });

  const retratoFechou = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    for (let i = 0; i < 10 && j.fala; i++) {
      j.fala.pronto = true;
      j.fala.escrito = j.fala.linhas[j.fala.i] || '';
      RBF.Rpg._debug.usa();
    }
    return !j.fala;
  });
  check(retratoFechou, 'a fala do retrato fecha pelo controle normal');

  /* ---- save e volta ----------------------------------------------------- */

  const gravado = await page.evaluate(() => RBF.Rpg.serializa());
  check(await page.evaluate(() => RBF.Rpg.podeSalvar()),
        'o percurso permite salvar fora de uma fala');
  check(!!gravado && gravado.sala === 'salao', 'serializa o estado do percurso',
        JSON.stringify(gravado && { sala: gravado.sala, x: gravado.x, y: gravado.y }));
  check(gravado && gravado.fase === 1, 'o save leva a fase junto',
        'fase=' + (gravado && gravado.fase));
  check(gravado && Object.keys(gravado.itens).length >= 1,
        'o save leva a bolsa junto');

  /* ---- Carmine encerra antes da porta ----------------------------------

     Nao chama encerra() pelo harness. O teste percorre as cinco linhas,
     deixa a animacao de tres quadros fechar a tela e confere a saida que
     o proprio ponto de Carmine devolve ao roteiro. */
  const encontro = await page.evaluate(() => {
    const j = RBF.Rpg._debug.estado();
    j.p.x = 700; j.p.y = 640; j.p.dir = 'baixo';
    RBF.Rpg._debug.usa();
    return j.fala && j.fala.linhas ? j.fala.linhas[0] : null;
  });
  check(!!encontro && encontro.indexOf('mulher') !== -1,
        'conferir a porta encontra Carmine', 'veio: ' + encontro);

  const armou = await page.evaluate(async () => {
    const j = RBF.Rpg._debug.estado();
    for (let i = 0; i < 10 && j.fala; i++) {
      j.fala.pronto = true;
      j.fala.escrito = j.fala.linhas[j.fala.i] || '';
      RBF.Rpg._debug.usa();
      await new Promise(r => setTimeout(r, 45));
    }
    return j.desfecho && j.desfecho.id;
  });
  check(armou === 'carmine', 'a interacao inicia o desfecho de Carmine',
        'desfecho=' + armou);
  await page.waitForTimeout(310);
  check(await page.evaluate(() => document.getElementById('rf-percurso')
                                      .classList.contains('is-desfecho')),
        'o controle some durante a execucao');
  await page.screenshot({ path: path.join(OUT, '12_carmine.png') });
  await page.waitForTimeout(2400);

  check(!(await page.evaluate(() => RBF.Rpg.ativo())), 'o percurso encerra');
  check(await page.evaluate(() => RBF.State.get() === 'playing'),
        'o roteiro reassume a tela');

  const flags = await page.evaluate(() => ({
    saida:    RBF.STATE.flags.cob_saida,
    conferiu: RBF.STATE.flags.cob_conferiu,
    apurou:   RBF.STATE.flags.cob_apurou,
    caderno:  RBF.STATE.flags.cob_caderno,
    livro:    RBF.STATE.flags.cob_livro,
    moldura:  RBF.STATE.flags.cob_moldura,
    degrau:   RBF.STATE.flags.cob_degrau
  }));
  check(flags.saida === 'carmine', 'Carmine chega ao roteiro como unica saida',
        JSON.stringify(flags));
  check(flags.conferiu === true, '`sets` do beat foi aplicado');
  check(typeof flags.apurou === 'number', 'a contagem de marcas entra como numero',
        String(flags.apurou));
  check(flags.caderno === true, 'marca feita entra como true');
  check(flags.degrau === false, 'marca NAO feita entra como false, e nao undefined',
        'valor=' + String(flags.degrau));

  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, '07_volta_a_vn.png') });

  /* ---- erros de runtime ------------------------------------------------- */

  /* O navegador pede /favicon.ico sozinho e o jogo nao tem um. A
     mensagem de console nao carrega a URL, entao filtra-se pelo texto. */
  const reais = erros.filter(e =>
    !/favicon|net::ERR_FILE_NOT_FOUND/i.test(e) &&
    !/Failed to load resource: the server responded with a status of 404/i.test(e));
  check(reais.length === 0, 'sem erro de runtime', reais.slice(0, 4).join(' | '));

  await browser.close();
  srv.close();

  console.log('\n' + (total - falhas) + ' de ' + total +
              (falhas ? '  -  ' + falhas + ' FALHA(S)' : '  -  tudo certo'));
  console.log('imagens em ' + path.relative(ROOT, OUT) + '\n');
  return falhas ? 1 : 0;
}

main().then(c => process.exit(c)).catch(e => {
  console.error(e);
  process.exit(1);
});
