import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export const navigation = [
  ['About', 'about'], ['Work', 'work'], ['Experience', 'experience'],
  ['Learning', 'learning'], ['Writing', 'writing'], ['Archive', 'archive'], ['Contact', 'contact'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><div className="header-inner">
    <a href="#home" className="wordmark" aria-label="ALFRZHB home">ALFRZHB<span className="wordmark-dot">.</span></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav ref={nav} id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {navigation.map(([label,id]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
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
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-art"><div className="crayon-patch" aria-hidden="true" /><img src="/assets/character-full.png" width="1024" height="1536" alt="Full-body crayon illustration of Alfarizi, wearing glasses, a navy shirt and cargo trousers" fetchPriority="high" /><Rays /></div>
    <div className="hero-copy"><span className="short-stroke" aria-hidden="true" /><h1 id="hero-title">Muhammad<br />Alfarizi Habibullah</h1>
      <p className="hero-role">Software Engineer &amp; Informatics Graduate</p>
      <p className="hero-intro">I build clean digital products, solve real problems with technology, and share what I learn along the way.</p>
      <div className="hero-actions"><a className="button button-dark" href="#work">View Selected Work <span aria-hidden="true">→</span></a><a className="about-link" href="#about">About me</a></div>
    </div>
  </section>;
}

export function About() {
  return <section id="about" className="section about container" aria-labelledby="about-title">
    <div className="about-heading"><div><p className="eyebrow">About</p><h2 id="about-title">A brief<br />introduction</h2></div><div className="about-portrait"><span className="crayon-patch" aria-hidden="true" /><img src="/assets/character-head.jpeg" width="1254" height="1254" alt="Original crayon head portrait of Alfarizi" loading="lazy" /><Rays /></div></div>
    <div className="about-body"><p>I build software across web, mobile, and cloud, with a focus on practical systems, clean architecture, and continuous learning. I enjoy turning ideas into usable products, refining projects into more production-ready solutions, and sharing what I learn along the way.</p>
      <p>Currently interested in web engineering, Android, Cloudflare, and AI-assisted systems.</p>
      <span className="short-stroke" aria-hidden="true" />
      <div className="interest-tags"><Tag>Web</Tag><Tag tone="blue">Android</Tag><Tag tone="green">Cloud</Tag><Tag tone="rose">AI-assisted systems</Tag></div>
    </div>
    <div className="section-end" aria-hidden="true"><span /> <span className="hand-note">always a work in progress</span> <span /></div>
  </section>;
}
