import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, CalendarDays, ChartNoAxesColumnIncreasing, ClipboardCheck, CodeXml, Database, FileCode2, GraduationCap, LayoutDashboard, Mail, MessageSquare, Monitor, QrCode, Smartphone, Users, Cloud, Award, X, FlaskConical, ExternalLink, type LucideIcon } from 'lucide-react';
import { Rays, SectionHeading, Tag } from './components';
import { archive, education, experience, notes, projects, social, type Detail } from './data';

const icons: Record<string, LucideIcon> = { code: CodeXml, book: BookOpen, calendar: CalendarDays, check: ClipboardCheck, people: Users, graduate: GraduationCap, credential: Award, file: FileCode2, chart: ChartNoAxesColumnIncreasing, cloud: Cloud, perfume: FlaskConical, qr: QrCode, chat: MessageSquare, mobile: Smartphone };

function SketchIcon({ name }: {name: string}) {
  const Icon = icons[name] || CodeXml;
  return <span className="sketch-icon" aria-hidden="true"><Icon strokeWidth={1.5} /></span>;
}

function ProjectPreview({ id }: {id: string}) {
  return <div className={`project-preview preview-${id}`} aria-hidden="true">
    <div className="preview-top"><span /><span /><span /><div>{id === 'ddl' ? 'SCHEMA REVIEW' : id === 'ratama' ? 'PROJECT OVERVIEW' : 'SITE MONITORING'}</div></div>
    {id === 'ddl' ? <div className="ddl-map"><div className="sql-lines"><span>CREATE TABLE</span><i /><i /><i /><i /></div><div className="schema-nodes"><span>Schema</span><div><span>Review</span><span>Validate</span></div></div></div>
      : id === 'ratama' ? <div className="kanban-preview">{['Opportunity','Proposal','In progress'].map((label,i)=><div key={label}><b>{label}</b><span className={`mini-task task-${i}`} /><span className="mini-task" /></div>)}</div>
      : <div className="monitor-preview"><div className="camera-grid"><Monitor /><Monitor /><Monitor /><Monitor /></div><div className="monitor-stats"><span>Sites</span><b>Overview</b><i /><i /><i /></div></div>}
  </div>;
}

export function SelectedWork({ onOpen }: {onOpen: (detail: Detail) => void}) {
  return <section id="work" className="section container work" aria-labelledby="work-heading">
    <SectionHeading label="Work"><span id="work-heading">Selected Work</span></SectionHeading>
    <p className="section-description">Three projects that best represent how I think, build, and refine digital products.</p>
    <div className="project-grid">{projects.map((project,index)=><article className="project-card" key={project.id}>
      <div className="project-card-top"><span className="project-number">0{index+1}</span><ProjectPreview id={project.id} /><span className="project-year">{project.year}</span></div>
      <h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag=><Tag key={tag.label} tone={tag.tone}>{tag.label}</Tag>)}</div>
      <button className="case-study" onClick={()=>onOpen(project.detail)} aria-label={`View case study: ${project.title}`}>View Case Study <ArrowRight size={16} aria-hidden="true" /></button>
    </article>)}</div>
    <a className="button button-blue section-button" href="#archive">See More Projects <ArrowRight size={20} aria-hidden="true" /></a>
  </section>;
}

export function Experience() {
  return <section id="experience" className="section container" aria-labelledby="experience-heading">
    <SectionHeading label="Experience"><span id="experience-heading">Where I’ve worked<br />&amp; contributed</span></SectionHeading>
    <ol className="timeline">{experience.map(item=><li key={item.title}>
      <div className="timeline-copy"><p className="timeline-date">{item.date}</p><h3>{item.title}</h3><p className="organization">{item.organization}</p><p className="timeline-description">{item.description}</p><div className="tag-row">{item.tags.map(tag=><Tag key={tag.label} tone={tag.tone}>{tag.label}</Tag>)}</div></div>
      <SketchIcon name={item.icon} />
    </li>)}</ol>
  </section>;
}

export function Learning() {
  return <section id="learning" className="section container learning" aria-labelledby="learning-heading">
    <SectionHeading label="Learning"><span id="learning-heading">Learning, education<br />&amp; credentials</span></SectionHeading>
    <div className="learning-grid">{education.map(item=><article className="learning-card" key={item.title}>
      <SketchIcon name={item.icon} /><div className="learning-card-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
      {'status' in item && <Tag tone={item.tone}>{item.status}</Tag>}
    </article>)}</div>
    <div className="courses"><h3>Selected Courses &amp; Skills</h3><div className="interest-tags"><Tag>Kotlin</Tag><Tag tone="blue">Android</Tag><Tag tone="green">Laravel</Tag><Tag tone="blue">React</Tag><Tag>Cloudflare</Tag></div></div>
  </section>;
}

export function Writing({ onOpen }: {onOpen: (detail: Detail) => void}) {
  return <section id="writing" className="section container writing" aria-labelledby="writing-heading">
    <SectionHeading label="Writing"><span id="writing-heading">Things I’m learning<br />&amp; writing about</span></SectionHeading>
    <p className="section-description">Editable learning drafts. These notes await personal review before final publication.</p>
    <div className="notes-grid">{notes.map(note=><article className="note-card" key={note.id}>
      <SketchIcon name={note.icon} /><div><span className={`category category-${note.tone}`}>{note.category} · Draft</span><h3>{note.title}</h3><p>{note.description}</p><button className="text-action" onClick={()=>onOpen(note)} aria-label={`Read draft: ${note.title}`}>Read draft <ArrowRight size={15} aria-hidden="true" /></button></div>
    </article>)}</div>
    <button className="button button-dark section-button" onClick={()=>onOpen({id:'all-notes',draft:true,eyebrow:'Writing · Draft learning notebook',title:'All learning notes',intro:'Four editable drafts awaiting personal review before final publication.',sections:notes.flatMap(note=>[{heading:note.title,text:note.intro},...note.sections])})}>See All Notes <ArrowRight size={20} aria-hidden="true" /></button>
  </section>;
}

export function Archive({ onOpen }: {onOpen: (detail: Detail) => void}) {
  return <section id="archive" className="section container archive" aria-labelledby="archive-heading">
    <SectionHeading label="Archive"><span id="archive-heading">More things<br />I’ve built</span></SectionHeading>
    <p className="section-description">Other projects, experiments, and earlier work.</p>
    <div className="archive-grid">{archive.map(project=><button className="archive-card" key={project.id} onClick={()=>onOpen(project.detail)} aria-label={`Explore ${project.title}`}>
      <SketchIcon name={project.icon} /><span className="archive-copy"><span className="archive-title">{project.title}</span><span className="archive-description">{project.description}</span><span className="tag-row">{project.tags.map(tag=><Tag key={tag.label} tone={tag.tone}>{tag.label}</Tag>)}</span></span>
      <span className="archive-meta"><span>{project.year}</span><ArrowRight size={20} aria-hidden="true" /></span>
    </button>)}</div>
    <a className="button button-dark section-button" href={social.github} target="_blank" rel="noopener noreferrer">Explore Full Archive <ArrowRight size={20} aria-hidden="true" /></a>
  </section>;
}

export function Contact() {
  return <section id="contact" className="section container contact" aria-labelledby="contact-heading">
    <div className="contact-copy"><SectionHeading label="Contact"><span id="contact-heading">Let’s build<br />something worth<br />talking about.</span></SectionHeading>
      <p className="section-description">Open to software engineering opportunities, collaborations, and interesting projects.</p>
    </div>
    <div className="contact-actions"><div className="contact-doodle" aria-hidden="true"><span className="crayon-patch" /><Mail strokeWidth={1.2} /><Rays /></div>
      <a className="button button-dark" href={`mailto:${social.email}`}>Email me <ArrowRight size={21} aria-hidden="true" /></a>
      <div className="social-links"><a className="button button-blue" href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="button button-green" href={social.github} target="_blank" rel="noopener noreferrer">GitHub</a></div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="footer container"><div><a className="wordmark footer-wordmark" href="#home">ALFRZHB<span className="wordmark-dot">.</span></a><h3>Muhammad Alfarizi Habibullah</h3><p className="footer-role">Software Engineer · Informatics Graduate</p><p className="footer-credit">Designed &amp; built by Muhammad Alfarizi Habibullah</p><p className="copyright">© 2026 ALFRZHB</p></div><a href="#home" className="back-top">Back to top <span aria-hidden="true">↑</span></a><div className="footer-marks" aria-hidden="true"><CodeXml /><span /><BookOpen /></div></footer>;
}

export function DetailDialog({ detail, onClose }: {detail: Detail | null; onClose: () => void}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    if (!detail || !dialog.current) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
    return ()=>{ dialog.current?.close(); document.body.style.overflow = previousOverflow; previous?.focus(); };
  },[detail]);
  if (!detail) return null;
  return <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" aria-describedby="detail-intro" onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===dialog.current) onClose();}}>
    <div className="dialog-content"><div className="dialog-top"><p className="eyebrow">{detail.eyebrow}</p><button className="dialog-close" onClick={onClose} aria-label="Close detail" autoFocus><X size={23} /></button></div>
      <h2 id="detail-title">{detail.title}</h2><p className="detail-intro" id="detail-intro">{detail.intro}</p>
      {detail.draft && <p className="detail-intro">Draft content — awaiting personal review before final publication.</p>}
      {detail.sections.map(section=><section className="detail-section" key={section.heading}><h3>{section.heading}</h3><p>{section.text}</p></section>)}
      {detail.link && <a href={detail.link.href} className="button button-dark" target="_blank" rel="noopener noreferrer">{detail.link.label} <ExternalLink size={18} aria-hidden="true" /></a>}
      <button className="text-action dialog-back" onClick={onClose}>Back to portfolio</button>
    </div>
  </dialog>;
}
