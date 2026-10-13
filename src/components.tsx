import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import characterFull from '../assets/masters/character-full.png';
import characterHead from './assets/character-head.webp';

export const navigation = [
  ['About', 'about'], ['Work', 'work'], ['Experience', 'experience'],
  ['Learning', 'learning'], ['Writing', 'writing'], ['Archive', 'archive'], ['Contact', 'contact'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  // CSS can blur a hidden link before matchMedia fires; retain its logical owner.
  const focusOwner = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (open) nav.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
  }, [open]);
  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 1020px)');
    const root = document.documentElement;
    const previousHeight = root.style.getPropertyValue('--header-height');
    const updateHeight = () => {
      if (header.current) root.style.setProperty('--header-height', `${header.current.getBoundingClientRect().height}px`);
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      // A visibility-induced blur may fall to BODY without an intentional exit.
      if (!(target instanceof HTMLElement) || target === document.body) return;
      focusOwner.current = target === toggle.current || nav.current?.contains(target) ? target : null;
    };
    const onResize = () => {
      const owner = focusOwner.current;
      setOpen(false);
      if (!desktop.matches && owner && nav.current?.contains(owner)) {
        toggle.current?.focus({ preventScroll: true });
      } else if (desktop.matches && owner === toggle.current) {
        nav.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
      } else if (desktop.matches && owner && nav.current?.contains(owner)) {
        owner.focus({ preventScroll: true });
      }
      updateHeight();
    };
    const observer = new ResizeObserver(updateHeight);
    if (header.current) observer.observe(header.current);
    updateHeight();
    document.addEventListener('focusin', onFocus, true);
    desktop.addEventListener('change', onResize);
    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', onFocus, true);
      desktop.removeEventListener('change', onResize);
      if (previousHeight) root.style.setProperty('--header-height', previousHeight);
      else root.style.removeProperty('--header-height');
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!nav.current?.contains(target) && !toggle.current?.contains(target)) {
        const ownedLink = focusOwner.current && nav.current?.contains(focusOwner.current);
        const outsideControl = target instanceof Element && target.closest('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]');
        focusOwner.current = null;
        if (ownedLink && !outsideControl) {
          // Keep the pointer's default focus action from undoing restoration.
          event.preventDefault();
          toggle.current?.focus({ preventScroll: true });
        }
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);
  return <header ref={header} className="site-header" onKeyDown={event => {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus({ preventScroll: true });
    }
  }} onBlur={event => {
    if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}><div className="header-inner">
    <a href="#home" className="wordmark" aria-label="ALFRZHB home">ALFRZHB<span className="wordmark-dot">.</span></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav ref={nav} id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {navigation.map(([label,id]) => <a href={`#${id}`} key={id} onClick={() => {
        focusOwner.current = null;
        setOpen(false);
        document.getElementById(id)?.focus({ preventScroll: true });
      }}>{label}</a>)}
    </nav>
  </div></header>;
}

export function Rays({ className = '' }: { className?: string }) {
  return <span className={`rays ${className}`} aria-hidden="true"><i /><i /><i /></span>;
}

export function SectionHeading({ label, children }: { label: string; children: ReactNode }) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{children}</h2><Rays /></div>;
}

export function Tag({ children, tone = 'peach' }: { children: ReactNode; tone?: 'peach'|'blue'|'green'|'rose'|'lavender' }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

export function Hero() {
  return <section id="home" tabIndex={-1} className="hero container" aria-labelledby="hero-title">
    <div className="hero-layout">
    <div className="hero-art"><div className="crayon-patch" aria-hidden="true" /><img src={characterFull} width="1024" height="1536" alt="Full-body crayon illustration of Alfarizi, wearing glasses, a navy shirt and cargo trousers" fetchPriority="high" decoding="async" /><Rays /></div>
    <div className="hero-copy"><span className="short-stroke" aria-hidden="true" /><h1 id="hero-title">Muham<wbr />mad<br />Alfarizi Habibullah</h1>
      <p className="hero-role">Software Engineer &amp; Informatics Graduate</p>
      <p className="hero-intro">I build clean digital products, solve real problems with technology, and share what I learn along the way.</p>
      <div className="hero-actions"><a className="button button-dark" href="#work">View Selected Work <span aria-hidden="true">→</span></a><a className="about-link" href="#about">About me</a></div>
    </div>
    </div>
  </section>;
}

export function About() {
  return <section id="about" tabIndex={-1} className="section about container" aria-labelledby="about-title">
    <div className="about-layout">
    <div className="about-heading"><div><p className="eyebrow">About</p><h2 id="about-title">A brief<br />intro&shy;duction</h2></div><div className="about-portrait"><span className="crayon-patch" aria-hidden="true" /><img src={characterHead} width="320" height="320" alt="Original crayon head portrait of Alfarizi" loading="lazy" decoding="async" /><Rays /></div></div>
    <div className="about-body"><p>I build software across web, mobile, and cloud, with a focus on practical systems, clean architecture, and continuous learning. I enjoy turning ideas into usable products, refining projects into more production-ready solutions, and sharing what I learn along the way.</p>
      <p>Currently interested in web engineering, Android, Cloudflare, and AI-assisted systems.</p>
      <span className="short-stroke" aria-hidden="true" />
      <div className="interest-tags"><Tag>Web</Tag><Tag tone="blue">Android</Tag><Tag tone="green">Cloud</Tag><Tag tone="rose">AI-assisted systems</Tag></div>
    </div>
    </div>
    <div className="section-end" aria-hidden="true"><span /> <span className="hand-note">always a work in progress</span> <span /></div>
  </section>;
}
