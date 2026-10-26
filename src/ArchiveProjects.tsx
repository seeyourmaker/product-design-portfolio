import {useEffect,useRef} from 'react';
import {ArrowLeft,ArrowUpRight,MessageCircle,Waypoints,GitBranch,Sparkles} from 'lucide-react';
import {gsap} from 'gsap';
import {featuredProjects} from './data/projects';
import {JiraCover} from './JiraThumbnails';
import {AdaptLibraryThumbnail} from './AdaptThumbnails';
import {archiveProjects,archiveProjectBySlug,type ArchiveProject} from './data/archiveProjects';
import archiveMedia from './data/archiveMedia.json';
import './AdaptIconFinder.css';
import './ArchiveProjects.css';

export const archiveListingPath='/projects';
export const getArchiveSlug=(path:string)=>{
  const match=path.replace(/\/$/,'').match(/^\/projects\/([^/]+)$/);
  return match&&archiveProjectBySlug[match[1]]?match[1]:null;
};
const mediaFor=(slug:string)=>archiveMedia[slug as keyof typeof archiveMedia] as string[];
const isVideo=(path:string)=>/\.mp4$/i.test(path);
const isImage=(path:string)=>/\.(png|jpe?g|gif|webp|svg)$/i.test(path);

function useArchiveReveal(root:React.RefObject<HTMLElement>,title:string){
  useEffect(()=>{
    const previous=document.title;
    document.title=`${title} — Saurabh`;
    window.scrollTo({top:0,behavior:'instant'});
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const nodes=root.current?.querySelectorAll('.adapt-reveal');
      if(!nodes)return;
      const tweens:gsap.core.Tween[]=[];
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting){
          tweens.push(gsap.fromTo(entry.target,{y:16,opacity:0},{y:0,opacity:1,duration:.5,clearProps:'all'}));
          observer.unobserve(entry.target);
        }
      }),{threshold:.08});
      nodes.forEach(node=>observer.observe(node));
      return()=>{observer.disconnect();tweens.forEach(tween=>tween.kill());gsap.set(nodes,{clearProps:'all'})};
    });
    return()=>{media.revert();document.title=previous};
  },[root,title]);
}

function ArchiveAsset({src,alt,caption,hero=false}:{src:string;alt:string;caption?:string;hero?:boolean}){
  if(isVideo(src))return <figure className="adapt-capture archive-capture"><video controls playsInline preload="metadata" src={src} aria-label={alt}/>{caption&&<figcaption>{caption}</figcaption>}</figure>;
  if(!isImage(src))return null;
  return <figure className={`adapt-capture archive-capture${hero?' archive-capture--hero':''}`}>
    <a href={src} data-image-viewer aria-label={`Open original image: ${alt}`}><img src={src} alt={alt} loading={hero?'eager':'lazy'}/><span className="adapt-expand">View original <ArrowUpRight size={14} aria-hidden="true"/></span></a>
    {caption&&<figcaption>{caption}</figcaption>}
  </figure>;
}

export function ArchiveProjectPage({slug}:{slug:string}){
  const project=archiveProjectBySlug[slug];
  const root=useRef<HTMLElement>(null);
  useArchiveReveal(root,project.title);
  const files=mediaFor(slug);
  return <main className="adapt-page archive-page" ref={root} id="archive-top">
    <a className="adapt-skip" href="#archive-story">Skip to project story</a>
    <nav className="adapt-nav" aria-label="Project navigation"><a href="/projects"><ArrowLeft size={16} aria-hidden="true"/> All projects</a><span>{project.year} / {project.title.toUpperCase()}</span><a href={project.source} target="_blank" rel="noreferrer">Original source <ArrowUpRight size={15} aria-hidden="true"/></a></nav>
    <div className="adapt-shell">
      <header className="adapt-hero archive-hero">
        <div className="adapt-hero-copy"><p className="adapt-eyebrow">{project.eyebrow}</p><h1>{project.headline}</h1><p className="adapt-lead">{project.lead}</p><div className="adapt-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="adapt-story-link" href="#archive-story">Explore the story <span aria-hidden="true">↓</span></a></div>
        <div className="adapt-product-stage archive-hero-stage"><div className="adapt-stage-label"><span>{project.title.toUpperCase()}</span><span>ORIGINAL PROJECT ASSET</span></div><ArchiveAsset src={files[project.hero]} alt={`${project.title} original project visual`} hero/></div>
      </header>
      {project.chapters.map((chapter,index)=><section className="adapt-itch adapt-reveal archive-chapter" id={index===0?'archive-story':undefined} tabIndex={index===0?-1:undefined} key={chapter.label}>
        <div className="adapt-section-heading"><span className="adapt-eyebrow">{chapter.label}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p></div>
        <div className={`archive-story-media${chapter.images.length===1?' archive-story-media--single':''}`}>{chapter.images.map((mediaIndex,i)=><ArchiveAsset key={mediaIndex+'-'+i} src={files[mediaIndex]} alt={`${chapter.caption||project.title} — image ${i+1}`} caption={i===0?chapter.caption:undefined}/>)}</div>
      </section>)}
      <section className="archive-originals adapt-reveal" aria-labelledby="archive-originals-heading"><div className="adapt-section-heading"><span className="adapt-eyebrow">ORIGINAL MATERIAL</span><h2 id="archive-originals-heading">The complete visual archive.</h2><p>All available project media was saved locally from the published source. Open any image at its original saved size.</p></div>
        <details><summary>View all {files.length} original assets <span aria-hidden="true">↓</span></summary><div className="archive-all-media">{files.map((src,index)=><ArchiveAsset key={src} src={src} alt={`${project.title}: archived original asset ${index+1}`} caption={`Original asset ${String(index+1).padStart(2,'0')}`}/>)}</div></details>
      </section>
      <footer className="adapt-footer"><p>{project.title}<br/><em>From the original portfolio archive.</em></p><div><a href="/projects"><ArrowLeft size={16} aria-hidden="true"/> Back to projects</a><a href={project.source} target="_blank" rel="noreferrer">{project.sourceLabel} <ArrowUpRight size={16} aria-hidden="true"/></a><a href="#archive-top">Back to top ↑</a></div></footer>
    </div>
  </main>;
}

function IntentDecisionCover(){return <div className="archive-card-image archive-featured-cover archive-featured-cover--intent" role="img" aria-label="A user request is understood, checked for safe action, and drafted when ready."><div className="archive-intent-flow">
  <span className="archive-intent-kicker">THE DECISION BEHIND THE RESPONSE</span>
  <div className="archive-intent-stages" aria-hidden="true">
    <div className="archive-intent-stage archive-intent-stage--request"><MessageCircle size={18}/><span>Request</span><small>“Create a laptop<br/>request service…”</small></div>
    <div className="archive-intent-connector"><i/></div>
    <div className="archive-intent-stage archive-intent-stage--understand"><Waypoints size={19}/><span>Understand</span><small>Recognize intent</small></div>
    <div className="archive-intent-connector"><i/></div>
    <div className="archive-intent-stage archive-intent-stage--decide"><GitBranch size={20}/><span>Decide</span><small>Safe to act?</small></div>
    <div className="archive-intent-connector"><i/></div>
    <div className="archive-intent-stage archive-intent-stage--draft"><Sparkles size={19}/><span>Draft</span><small>When ready</small></div>
  </div>
  <span className="archive-intent-note">Understand first. Then create.</span>
</div></div>}

function FeaturedCover({slug,label}:{slug:string;label:string}){
  if(slug==='intent-identification')return <IntentDecisionCover/>;
  if(slug==='adapt-icon-finder')return <div className="archive-card-image archive-featured-cover archive-featured-cover--adapt" aria-hidden="true"><AdaptLibraryThumbnail/></div>;
  if(slug==='jira-worklog-assistant')return <div className="archive-card-image archive-featured-cover archive-featured-cover--jira" aria-hidden="true"><JiraCover/></div>;
  return <div className="archive-card-image"><span>{label}</span></div>;
}
const flagshipDestinations:Record<string,{href:string;label:string}>={
  'intent-identification':{href:'/projects/intent-identification',label:'Read case study'},
  'catalog-curator-revamp':{href:'/#projects',label:'View featured preview'},
  'jira-worklog-assistant':{href:'/projects/jira-worklog-assistant',label:'Explore project'},
  'adapt-icon-finder':{href:'/projects/adapt-icon-finder',label:'Explore project'},
};

export function ArchiveListing(){
  const root=useRef<HTMLElement>(null);
  useArchiveReveal(root,'Projects');
  return <main className="adapt-page archive-page archive-listing" ref={root} id="archive-top">
    <a className="adapt-skip" href="#archive-projects">Skip to projects</a>
    <nav className="adapt-nav" aria-label="Project navigation"><a href="/"><ArrowLeft size={16} aria-hidden="true"/> Portfolio home</a><span>PROJECTS / SAURABH</span><a href="#archive-projects">Browse archive ↓</a></nav>
    <div className="adapt-shell">
      <header className="archive-listing-hero"><p className="adapt-eyebrow">SELECTED WORK + EARLIER ARCHIVE</p><h1>Projects<span>.</span></h1><p>Product design, systems, interfaces, and identities. The featured work leads; the earlier portfolio follows.</p></header>
      <section id="archive-projects" className="archive-listing-section"><div className="adapt-section-heading"><span className="adapt-eyebrow">01 / FEATURED</span><h2>Recent work.</h2><p>Four flagship projects from the current portfolio.</p></div><div className="archive-card-grid">{featuredProjects.map((project,index)=><article className="archive-card adapt-reveal" key={project.slug}>
        <a href={flagshipDestinations[project.slug].href} aria-label={`${flagshipDestinations[project.slug].label}: ${project.title}`}><FeaturedCover slug={project.slug} label={project.thumbnail.label}/><div className="archive-card-info"><span>0{index+1} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p><strong>{flagshipDestinations[project.slug].label} <ArrowUpRight size={15} aria-hidden="true"/></strong></div></a>
      </article>)}</div></section>
      <section className="archive-listing-section"><div className="adapt-section-heading"><span className="adapt-eyebrow">02 / MIGRATED ARCHIVE</span><h2>Earlier work.</h2><p>Stories and original assets carried over from the previous portfolio.</p></div><div className="archive-card-grid">{archiveProjects.map((project,index)=><article className="archive-card adapt-reveal" key={project.slug}><a href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}><div className="archive-card-image"><img src={mediaFor(project.slug)[project.hero]} alt="" loading="lazy"/></div><div className="archive-card-info"><span>{String(index+1).padStart(2,'0')} / {project.category} · {project.year}</span><h3>{project.title}</h3><p>{project.lead}</p><strong>Explore project <ArrowUpRight size={15} aria-hidden="true"/></strong></div></a></article>)}</div></section>
      <footer className="adapt-footer"><p>Every project starts somewhere.<br/><em>Keep exploring.</em></p><div><a href="/"><ArrowLeft size={16} aria-hidden="true"/> Portfolio home</a><a href="#archive-top">Back to top ↑</a></div></footer>
    </div>
  </main>;
}
