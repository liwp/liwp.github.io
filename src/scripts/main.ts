import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const CHARS = '01<>[]{}/\\=+*#@$%&?!';

function revealEverythingInstantly() {
  gsap.set(
    '[data-print] > *, [data-scramble], [data-reveal], [data-bar] i, .section-head .addr, .section-head .count',
    { autoAlpha: 1 }
  );
  gsap.set('.section-head .line-fill', { scaleX: 1 });
  gsap.set('[data-cursor-end]', { autoAlpha: 1 });
}

/** Terminal print: children pop in line by line — no fades. */
function printGroup(group: Element, stagger = 0.09) {
  return gsap.to(group.children, {
    autoAlpha: 1,
    duration: 0.01,
    ease: 'none',
    stagger,
  });
}

/** Decode a text element with a scramble pass. */
function scrambleIn(el: Element, duration = 0.8) {
  const text = el.textContent ?? '';
  const tl = gsap.timeline();
  tl.set(el, { autoAlpha: 1 });
  tl.to(el, { duration, ease: 'none', scrambleText: { text, chars: CHARS, speed: 1.4 } });
  return tl;
}

const inChrome = (el: Element) =>
  el.closest('.hero') !== null || el.closest('.statusbar') !== null;

const START_PCT = 0.88;

/**
 * Run `show(true)` when `trigger` scrolls into view. If it is already in or
 * above the viewport on init (e.g. the browser restored a scroll position),
 * run `show(false)` immediately instead of creating a ScrollTrigger — the
 * user has already "seen" it, and once-triggers that fire during the initial
 * refresh sweep kill themselves mid-iteration inside GSAP.
 */
function onEnterOnce(trigger: Element, show: (animate: boolean) => void) {
  if (trigger.getBoundingClientRect().top < window.innerHeight * START_PCT) {
    show(false);
  } else {
    ScrollTrigger.create({
      trigger,
      start: `top ${START_PCT * 100}%`,
      once: true,
      onEnter: () => show(true),
    });
  }
}

function heroIntro() {
  // On a scroll-restored load the hero is behind us — print it, skip the show.
  if (window.scrollY > 80) {
    gsap.set('.statusbar, .hero [data-reveal], .hero [data-scramble], .hero .boot > *', {
      autoAlpha: 1,
    });
    gsap.set('[data-cursor-end]', { autoAlpha: 1 });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  const boot = document.querySelector('.hero .boot');
  if (boot) tl.add(printGroup(boot, 0.26), 0);

  tl.to('.statusbar', { autoAlpha: 1, duration: 0.01, ease: 'none' }, 0.1);

  const uptime = document.querySelector('[data-uptime]');
  const years = Number(uptime?.textContent);
  if (uptime && Number.isFinite(years)) {
    tl.fromTo(
      uptime,
      { textContent: 0 },
      { textContent: years, snap: { textContent: 1 }, duration: 1, ease: 'none' },
      0.4
    );
  }

  gsap.utils.toArray<Element>('.hero [data-scramble]').forEach((line, i) => {
    tl.add(scrambleIn(line, 0.9), 1.5 + i * 0.3);
  });

  tl.to(
    '.hero [data-reveal]',
    { autoAlpha: 1, duration: 0.01, ease: 'none', stagger: 0.12 },
    2.5
  );

  // Show cursor once PESONEN finishes rendering (starts at 1.8, lasts 0.9s)
  tl.set('[data-cursor-end]', { autoAlpha: 1 }, 2.7);
}

function scrollReveals() {
  // Section heads: address and count print, title scrambles, divider draws.
  document.querySelectorAll('.section-head').forEach((head) => {
    const items = head.querySelectorAll('.addr, .count');
    const title = head.querySelector('[data-scramble]');
    const line = head.querySelector('.line-fill');

    onEnterOnce(head, (animate) => {
      if (!animate) {
        gsap.set([...items, title, line].filter((el) => el !== null), { autoAlpha: 1 });
        if (line) gsap.set(line, { scaleX: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.to(items, { autoAlpha: 1, duration: 0.01, ease: 'none', stagger: 0.15 });
      if (title) tl.add(scrambleIn(title, 0.7), 0.1);
      if (line) tl.to(line, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.2);
    });
  });

  // Print groups; gauges inside fill block by block once their group prints.
  gsap.utils
    .toArray<Element>('[data-print]')
    .filter((group) => !inChrome(group))
    .forEach((group) => {
      const blocks = group.querySelectorAll('[data-bar] i');

      onEnterOnce(group, (animate) => {
        if (!animate) {
          gsap.set([...group.children, ...blocks], { autoAlpha: 1 });
          return;
        }
        const tl = gsap.timeline();
        tl.add(printGroup(group), 0);
        group.querySelectorAll('[data-bar]').forEach((bar, i) => {
          tl.to(
            bar.querySelectorAll('i'),
            { autoAlpha: 1, duration: 0.01, ease: 'none', stagger: 0.045 },
            0.35 + i * 0.12
          );
        });
      });
    });

  // Standalone scrambles (e.g. the contact CTA).
  gsap.utils
    .toArray<Element>('[data-scramble]')
    .filter((el) => !inChrome(el) && el.closest('.section-head') === null)
    .forEach((el) => {
      onEnterOnce(el, (animate) => {
        if (animate) scrambleIn(el, 0.8);
        else gsap.set(el, { autoAlpha: 1 });
      });
    });

  // Anything left with data-reveal just prints in place.
  gsap.utils
    .toArray<Element>('[data-reveal]')
    .filter((el) => !inChrome(el))
    .forEach((el) => {
      onEnterOnce(el, () => {
        gsap.set(el, { autoAlpha: 1 });
      });
    });
}

/** Re-scramble interactive labels on hover. Mono glyphs keep layout stable. */
function hoverScrambles() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-hover-scramble]').forEach((el) => {
    const text = el.textContent ?? '';
    let tween: gsap.core.Tween | null = null;
    el.addEventListener('mouseenter', () => {
      if (tween?.isActive()) return;
      tween = gsap.to(el, {
        duration: 0.45,
        ease: 'none',
        scrambleText: { text, chars: CHARS, speed: 2 },
      });
    });
  });
}

export function initAnimations() {
  const start = () => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      revealEverythingInstantly();
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      heroIntro();
      scrollReveals();
      hoverScrambles();
    });

    ScrollTrigger.refresh();
  };

  if (document.fonts?.ready) {
    document.fonts.ready.then(start);
  } else {
    start();
  }
}
