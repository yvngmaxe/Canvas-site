'use client';

/**
 * トップ画面のメインビジュアル（株式会社CANVAS）
 *
 * 整列した灰色の点が左から行進 → 中央あたりで1つの点に「問い」（赤い波紋）が生まれ色を持つ
 * → 数秒おきに近くの点とつながり、相手にも新しい色が生まれて動き出す
 * → 共感が広がったら「クリックして問いを生む」を表示し、そこからクリックで問いを生める。
 *
 * - 既存のヘッダー（ロゴ・メニュー）はそのまま。この部品はヘッダーの下に置く。
 * - 画面外に出たとき・別タブのときは描画を止める。
 * - 「視差効果を減らす」設定の人には、完成した絵を最初から見せる。
 * - 同じ人の2回目以降（同じタブのセッション内）は、行進を飛ばして途中から始める。
 *
 * 元の試作：トップ画面_試作F_20261015.html
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './HeroCanvas.module.css';
import { cormorant, shippori } from './fonts';

type Props = {
  /** 既存ヘッダーの高さ（px）。この分を引いた高さでトップ画面を作る */
  headerHeight?: number;
};

type Dot = {
  x: number; y: number; vx: number; vy: number;
  hue: number | null; on: boolean; r: number; seed: number;
  next: number; gave: number; target?: boolean;
};
type Point = { x: number; y: number; hue: number; seed: number };
type Link = { a: Dot | Point; b: Dot; t0: number; dur: number; done: boolean; td?: number; hue: number; echo?: boolean };
type Ripple = { x: number; y: number; t: number; hue: number; R: number };

// ───── 調整しやすい数値 ─────
const CONFIG = {
  startHue: 356,         // 最初の問いの色（CANVASの赤）
  gray: 'rgb(209,213,219)',
  marchSeconds: 7.5,     // 隊列が画面幅を進む目安（秒）。大きいほどゆっくり
  maxColored: 46,        // 色を持てる点の上限
  maxGive: 3,            // 1つの点が色を渡せる相手の数
  hintAt: 7,             // 色を持った点がこの数を超えたら「クリックして問いを生む」
  revisitStartAt: 14,    // 2回目以降の訪問は、この秒数から始める
  seenKey: 'canvasHeroSeen',
};

const hsla = (h: number, a: number | string, l = 52) => `hsla(${(h % 360).toFixed(0)},88%,${l}%,${a})`;
const newHue = (h: number) => (h + (Math.random() < 0.5 ? -1 : 1) * (55 + Math.random() * 70) + 360) % 360;

export default function HeroCanvas({ headerHeight = 64 }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const paintRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLCanvasElement>(null);
  const askRef = useRef<(x: number, y: number) => void>(() => {});
  const [showText, setShowText] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hero = heroRef.current, paint = paintRef.current, live = liveRef.current;
    if (!hero || !paint || !live) return;
    const pc = paint.getContext('2d'), lc = live.getContext('2d');
    if (!pc || !lc) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try { seen = sessionStorage.getItem(CONFIG.seenKey) === '1'; sessionStorage.setItem(CONFIG.seenKey, '1'); } catch { /* 保存できない環境でも動く */ }

    let W = 0, H = 0, gap = 34, fv = 0, t = 0, last: number | null = null, raf = 0;
    let dots: Dot[] = [], links: Link[] = [], rip: Ripple[] = [];
    let first: (Dot & { t0?: number }) | null = null, colored = 0;
    let revealed = false, hinted = false, clickable = false;
    let visible = true, onScreen = true, running = false;

    function size() {
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      const box = hero!.getBoundingClientRect();
      W = Math.round(box.width); H = Math.round(box.height);
      for (const cv of [paint!, live!]) {
        cv.width = W * DPR; cv.height = H * DPR;
        cv.style.width = W + 'px'; cv.style.height = H + 'px';
        cv.getContext('2d')!.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
    }

    function reveal() { if (!revealed) { revealed = true; setShowText(true); } }

    function init() {
      cancelAnimationFrame(raf); running = false;
      size();
      setShowText(false); setShowHint(false);
      revealed = false; hinted = false; clickable = false;
      pc!.clearRect(0, 0, W, H);
      gap = W < 640 ? 28 : 34;
      const cols = Math.ceil(W * 0.8 / gap), rows = Math.max(7, Math.round(H * 0.58 / gap));
      const top = H * 0.44 - (rows - 1) * gap / 2;
      dots = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        dots.push({ x: -c * gap - 20, y: top + r * gap, vx: 0, vy: 0, hue: null, on: false, r: 2.2, seed: Math.random() * 1000, next: 0, gave: 0 });
      }
      links = []; rip = []; first = null; colored = 0;
      fv = W / CONFIG.marchSeconds;
      t = 0; last = null;

      if (reduce) {                      // 完成した絵を最初から
        for (let i = 0; i < 60 * 40; i++) step(1 / 60);
        render(); reveal(); return;
      }
      if (seen) {                        // 2回目以降は途中から
        for (let i = 0; i < 60 * CONFIG.revisitStartAt; i++) step(1 / 60);
        reveal();
      }
      start();
    }

    function wander(d: Dot, dt: number) {
      const a = Math.sin(d.x * 0.004 + t * 0.22 + d.seed) + Math.cos(d.y * 0.005 - t * 0.18 + d.seed * 0.7) + Math.sin((d.x + d.y) * 0.002 + t * 0.09);
      d.vx += Math.cos(a * 1.3) * 18 * dt; d.vy += Math.sin(a * 1.3) * 18 * dt;
      const sp = Math.hypot(d.vx, d.vy), max = 34;
      if (sp > max) { d.vx *= max / sp; d.vy *= max / sp; }
      d.x += d.vx * dt; d.y += d.vy * dt;
      if (d.x < 40) d.vx += 20 * dt; if (d.x > W - 40) d.vx -= 20 * dt;
      if (d.y < 30) d.vy += 20 * dt; if (d.y > H - 60) d.vy -= 20 * dt;
    }

    function awaken(d: Dot, hue: number) {
      d.on = true; d.hue = hue; d.r = 3.6; d.next = t + 2.5 + Math.random() * 2; d.gave = 0;
      colored++;
      for (let i = 0; i < 2; i++) rip.push({ x: d.x, y: d.y, t: t + i * 0.5, hue, R: 70 });
    }

    function connect(a: Dot | Point, b: Dot) {
      b.target = true;
      links.push({ a, b, t0: t, dur: 1.6, done: false, hue: newHue(a.hue as number) });
    }

    function step(dt: number) {
      t += dt;
      const speed = first ? Math.max(6, fv * Math.exp(-(t - (first.t0 ?? 0)) * 0.9)) : fv;
      for (const d of dots) if (!d.on && d !== first) d.x += speed * dt;

      // ひとつの点が、ふと立ち止まり、波紋とともに色を持つ
      if (!first) {
        let front = -Infinity; for (const d of dots) if (d.x > front) front = d.x;
        if (front > W * 0.6) {
          let best: Dot | null = null, bd = Infinity; const tx = W * 0.44, ty = H * 0.44;
          for (const d of dots) { const dd = (d.x - tx) ** 2 + (d.y - ty) ** 2; if (dd < bd) { bd = dd; best = d; } }
          if (best) {
            first = best; first.t0 = t; first.hue = CONFIG.startHue; first.r = 3.8;
            for (let i = 0; i < 3; i++) rip.push({ x: first.x, y: first.y, t: t + i * 0.7, hue: CONFIG.startHue, R: 150 });
          }
        }
      } else if (!first.on && t > (first.t0 ?? 0) + 2.6) {
        awaken(first, CONFIG.startHue); colored = 1; rip.length = 0;
        first.vx = 10; first.vy = -6;
      }
      if (first && t > (first.t0 ?? 0) + 3.5) reveal();

      // 色を持った点は、ゆっくり動きながら、数秒おきに近くの点とつながる
      for (const d of dots) {
        if (!d.on) continue;
        wander(d, dt);
        if (t > d.next && d.gave < CONFIG.maxGive && colored < CONFIG.maxColored) {
          let best: Dot | null = null, bd = Infinity;
          for (const o of dots) {
            if (o.on || o.target || o === first) continue;
            const dd = (o.x - d.x) ** 2 + (o.y - d.y) ** 2;
            if (dd < bd && dd > 30 * 30 && dd < 170 * 170) { bd = dd; best = o; }
          }
          if (best) { connect(d, best); d.gave++; }
          d.next = t + 3.2 + Math.random() * 3;
        } else if (t > d.next) {
          // 色を持った点どうしの共鳴：近くの仲間と、ときどきつながり直す
          let best: Dot | null = null, bd = Infinity;
          for (const o of dots) { if (!o.on || o === d) continue; const dd = (o.x - d.x) ** 2 + (o.y - d.y) ** 2; if (dd < bd && dd < 180 * 180) { bd = dd; best = o; } }
          if (best) links.push({ a: d, b: best, t0: t, dur: 1.8, done: false, hue: best.hue as number, echo: true });
          d.next = t + 5 + Math.random() * 6;
        }
        // 軌跡：うすく、時間とともに消える
        pc!.fillStyle = hsla(d.hue as number, 0.035, 62);
        pc!.beginPath(); pc!.arc(d.x, d.y, 2.2, 0, 7); pc!.fill();
      }
      for (const k of links) {
        if (!k.done && t > k.t0 + k.dur) {
          k.done = true; k.td = t;
          if (k.echo) rip.push({ x: k.b.x, y: k.b.y, t, hue: k.a.hue as number, R: 34 });
          else { awaken(k.b, k.hue); k.b.target = false; }
        }
      }
      pc!.save(); pc!.globalCompositeOperation = 'destination-out'; pc!.fillStyle = 'rgba(0,0,0,.035)'; pc!.fillRect(0, 0, W, H); pc!.restore();

      if (!hinted && colored >= CONFIG.hintAt) { hinted = true; clickable = true; setShowHint(true); }
    }

    function render() {
      lc!.clearRect(0, 0, W, H);
      links = links.filter(k => !k.done || t - (k.td ?? 0) < 22);
      for (const k of links) {
        const fade = k.done ? Math.max(0, Math.min(1, 1 - (t - (k.td ?? 0) - 8) / 14)) : 1;
        const far = Math.hypot(k.b.x - k.a.x, k.b.y - k.a.y), farK = Math.max(0, Math.min(1, 1 - (far - 180) / 160));
        const al = 0.55 * fade * farK;
        if (al <= 0) continue;
        const p = Math.min(1, (t - k.t0) / k.dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const ax = k.a.x, ay = k.a.y, bx = ax + (k.b.x - ax) * e, by = ay + (k.b.y - ay) * e;
        const g = lc!.createLinearGradient(ax, ay, bx, by);
        g.addColorStop(0, hsla(k.a.hue as number, al.toFixed(3))); g.addColorStop(1, hsla(k.done ? (k.b.hue as number) : k.hue, al.toFixed(3)));
        lc!.strokeStyle = g; lc!.lineWidth = 0.9;
        lc!.beginPath(); lc!.moveTo(ax, ay); lc!.lineTo(bx, by); lc!.stroke();
        if (k.done) {
          const q = (t * 0.35 + k.a.seed) % 1;
          lc!.fillStyle = `rgba(255,255,255,${(al * 1.6).toFixed(2)})`;
          lc!.beginPath(); lc!.arc(ax + (k.b.x - ax) * q, ay + (k.b.y - ay) * q, 1.4, 0, 7); lc!.fill();
        }
      }
      for (const d of dots) {
        if (d.hue == null) { lc!.fillStyle = CONFIG.gray; lc!.beginPath(); lc!.arc(d.x, d.y, d.r, 0, 7); lc!.fill(); continue; }
        lc!.fillStyle = hsla(d.hue, 0.16, 60); lc!.beginPath(); lc!.arc(d.x, d.y, d.r * 3, 0, 7); lc!.fill();
        lc!.fillStyle = hsla(d.hue, 1); lc!.beginPath(); lc!.arc(d.x, d.y, d.r, 0, 7); lc!.fill();
      }
      rip = rip.filter(r => t - r.t < 3.6);
      for (const r of rip) {
        const k = (t - r.t) / 3.6; if (k < 0) continue;
        const e = 1 - Math.pow(1 - k, 3);
        lc!.strokeStyle = hsla(r.hue, ((1 - k) * 0.6).toFixed(3)); lc!.lineWidth = 1.1;
        lc!.beginPath(); lc!.arc(r.x, r.y, 4 + e * r.R, 0, 7); lc!.stroke();
      }
    }

    function loop(now: number) {
      if (!visible || !onScreen) { running = false; return; }
      if (last == null) last = now;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      step(dt); render();
      raf = requestAnimationFrame(loop);
    }
    function start() { if (reduce || running || !visible || !onScreen) return; running = true; last = null; raf = requestAnimationFrame(loop); }

    // クリックで問いを生む（「クリックして問いを生む」が出てから）
    askRef.current = (x: number, y: number) => {
      if (!clickable) return;
      let best: Dot | null = null, bd = Infinity;
      for (const d of dots) { if (d.on || d.target) continue; const dd = (d.x - x) ** 2 + (d.y - y) ** 2; if (dd < bd) { bd = dd; best = d; } }
      const hue = Math.random() * 360;
      rip.push({ x, y, t, hue, R: 120 });
      if (best && bd < 160 * 160) connect({ x, y, hue, seed: 0 }, best);
      if (reduce) render();
    };

    // 見えていないときは止める
    const io = new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; if (onScreen) start(); }, { threshold: 0 });
    io.observe(hero);
    const onVis = () => { visible = document.visibilityState === 'visible'; if (visible) start(); };
    document.addEventListener('visibilitychange', onVis);

    // 大きさが変わったら描き直す
    let rt: ReturnType<typeof setTimeout> | undefined, lastW = 0, lastH = 0;
    const ro = new ResizeObserver(() => {
      const b = hero.getBoundingClientRect();
      if (Math.abs(b.width - lastW) < 2 && Math.abs(b.height - lastH) < 2) return;
      const firstTime = lastW === 0; lastW = b.width; lastH = b.height;
      if (firstTime) return;
      clearTimeout(rt); rt = setTimeout(() => { seen = true; init(); }, 300);
    });
    ro.observe(hero);

    init();

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); clearTimeout(rt);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const late = (delay: number) => ({ className: `${styles.late} ${showText ? styles.go : ''}`, style: { transitionDelay: `${delay}s` } });

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${cormorant.variable} ${shippori.variable} ${showHint ? styles.ask : ''}`}
      style={{ '--header-h': `${headerHeight}px` } as CSSProperties}
      onClick={e => {
        if ((e.target as HTMLElement).closest('a,button')) return;
        const r = e.currentTarget.getBoundingClientRect();
        askRef.current(e.clientX - r.left, e.clientY - r.top);
      }}
    >
      <canvas ref={paintRef} className={styles.canvas} aria-hidden="true" />
      <canvas ref={liveRef} className={styles.canvas} aria-hidden="true" />
      <div className={`${styles.veil} ${showText ? styles.on : ''}`} aria-hidden="true" />
      <div className={styles.copy}>
        <h1 {...late(0)} lang="en"><span className={styles.title}>Learning,<br />Connected.</span></h1>
        <p {...late(0.5)}><span className={styles.ja}>学びは、紡がれていく。</span></p>
        <p {...late(1.0)}><span className={styles.via}>自分から、人へ、土地へ、未来へ。</span></p>
        <p {...late(1.5)} lang="en"><span className={styles.co}>WE ARE LEARNING DESIGN COMPANY.</span></p>
      </div>
      <div className={`${styles.hint} ${showHint ? styles.on : ''}`} aria-hidden="true">クリックして問いを生む</div>
    </section>
  );
}
