import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AnimatePresence,motion,useScroll,useTransform,useReducedMotion,MotionValue} from 'framer-motion';
import {ArrowUpRight,X} from 'lucide-react';
import {gsap} from 'gsap';
import {IntentPortfolioColumn,IntentResponseAnimation} from './IntentThumbnails';
import {JiraThumbnailColumn,JiraProductThumbnail} from './JiraThumbnails';
import {AdaptThumbnailColumn,AdaptPluginThumbnail} from './AdaptThumbnails';
import {IntentQuickLook,intentQuickLookPath} from './IntentQuickLook';
import {IntentCaseStudy,isIntentCaseStudyPath} from './IntentCaseStudy';
import {featuredProjects,type FeaturedProject} from './data/projects';
import {useMobileAvatarMotion} from './useMobileAvatarMotion';
import assets from './assets.json';
import './style.css';
import {AdaptIconFinder,isAdaptPath} from './AdaptIconFinder';
import {ImageViewer} from './ImageViewer';
import {JiraBroCaseStudy,isJiraBroPath} from './JiraBroCaseStudy';
import {JiraBroQuickLook,jiraBroQuickLookPath,isJiraBroQuickLookPath} from './JiraBroQuickLook';
import {ArchiveListing,ArchiveProjectPage,getArchiveSlug} from './ArchiveProjects';
import {HomeMarquees} from './HomeMarquees';
import {CatalogThumbnailColumn,CatalogInteractionThumbnail} from './CatalogThumbnails';

function FadeIn({children,delay=0,y=30,x=0,className=''}:{children:React.ReactNode,delay?:number,y?:number,x?:number,className?:string}){return <motion.div className={className} initial={{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px',amount:0}} transition={{duration:.7,delay,ease:[.25,.1,.25,1]}}>{children}</motion.div>}
function ContactButton(){return <a className="contact-button" href="#contact">Get in touch</a>}
type MagnetPosition = {x:number,y:number,active:boolean};
function Magnet({children,onMove,shadowRef}:{children:React.ReactNode,onMove?:(position:MagnetPosition)=>void,shadowRef:React.RefObject<HTMLDivElement>}){
  const ref=useRef<HTMLDivElement>(null);
  const moving=useRef<HTMLDivElement>(null);
  const reduced=useReducedMotion();
  const {status,enableMotion}=useMobileAvatarMotion(moving,shadowRef,reduced);
  useEffect(()=>{
    const wrapper=ref.current, avatar=moving.current;
    const hero=wrapper?.closest('.hero');
    const heading=hero?.querySelector('h1');
    if(!wrapper||!avatar||!hero||!heading||reduced||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
    const position={x:0,y:0};
    let active=false, minY=0, originY=0;
    let pointer: {clientX:number,clientY:number}|null=null;
    const parentOffset=(element:Element)=>{
      const transform=getComputedStyle(element.parentElement!).transform;
      return transform==='none'?0:new DOMMatrixReadOnly(transform).m42;
    };
    const measure=()=>{
      const headingRect=heading.getBoundingClientRect();
      const avatarRect=avatar.getBoundingClientRect();
      // Remove our current translation and the independent entrance animation.
      const baseTop=avatarRect.top-position.y-parentOffset(wrapper);
      const headingMid=headingRect.top-parentOffset(heading)+headingRect.height*.5;
      minY=Math.min(0,headingMid-baseTop);
      originY=baseTop+avatarRect.height*.5;
      return {headingMid,rect:wrapper.getBoundingClientRect(),heroRect:hero.getBoundingClientRect()};
    };
    const move=(e:{clientX:number,clientY:number})=>{
      pointer=e;
      const {headingMid,rect,heroRect}=measure();
      const dx=e.clientX-rect.left-rect.width/2;
      active=Math.abs(dx)<rect.width/2+150&&e.clientY>=heroRect.top&&e.clientY<=heroRect.bottom;
      const progress=gsap.utils.clamp(0,1,(originY-e.clientY)/Math.max(1,originY-headingMid));
      gsap.to(position,{x:active?dx/3:0,y:active?gsap.utils.clamp(minY,0,minY*progress):0,duration:active?.65:.8,ease:'power3.out',overwrite:true,onUpdate:()=>{
        gsap.set(avatar,{x:position.x,y:position.y});
        onMove?.({...position,active});
      }});
    };
    const reset=()=>{pointer=null;active=false;gsap.to(position,{x:0,y:0,duration:.8,ease:'power3.out',overwrite:true,onUpdate:()=>{gsap.set(avatar,{x:position.x,y:position.y});onMove?.({...position,active:false});}})};
    const resize=()=>{measure();if(pointer)move(pointer)};
    measure();
    const observer=new ResizeObserver(resize);observer.observe(hero);observer.observe(avatar);observer.observe(heading);
    window.addEventListener('mousemove',move);window.addEventListener('resize',resize);window.addEventListener('blur',reset);document.documentElement.addEventListener('mouseleave',reset);
    return()=>{observer.disconnect();window.removeEventListener('mousemove',move);window.removeEventListener('resize',resize);window.removeEventListener('blur',reset);document.documentElement.removeEventListener('mouseleave',reset);gsap.killTweensOf(position);gsap.set(avatar,{clearProps:'transform'});};
  },[reduced,onMove]);
  return <div ref={ref} className="avatar-interaction"><div ref={moving} style={{willChange:'transform'}}>{children}</div>{status==='permission'&&<button className="avatar-motion-control" type="button" onClick={enableMotion}>Enable Motion</button>}{(status==='denied'||status==='unavailable')&&<p className="avatar-motion-hint" role="status">{status==='denied'?'Motion access denied. Drag the avatar to move it.':'Drag the avatar to move it.'}</p>}</div>;
}
function Hero(){const [shadow,setShadow]=useState<MagnetPosition>({x:0,y:0,active:false});const shadowRef=useRef<HTMLDivElement>(null);return <section className="hero"><FadeIn y={-20}><nav>{['About','Expertise','Projects','Contact'].map((n,i)=><a key={n} href={['#about','#services','/projects','#contact'][i]}>{n}</a>)}</nav></FadeIn><div className="heading-wrap"><FadeIn delay={.15} y={40}><h1 className="hero-heading">Hi, I'm Saurabh</h1><h3 className="hero-subtitle">A Product Designer</h3></FadeIn></div><div className="hero-bottom"><FadeIn delay={.35} y={20}><p className="hero-intro">I CRAFT INTUITIVE PRODUCTS AT <br/>THE INTERSECTION OF UX &amp; AI<br/>GAMING · TECH · FOOTBALL · COFFEE</p></FadeIn><FadeIn delay={.5} y={20}><a className="contact-button" href="#projects">Explore my work</a></FadeIn></div><div ref={shadowRef} className="hero-floor-shadow" aria-hidden="true" style={{transform:`translateX(calc(-50% + ${shadow.x}px)) scale(${Math.max(.35,1+shadow.y/900)})`,opacity:Math.max(.35,Math.min(1,.7+shadow.y/300))}}/><div className="portrait"><FadeIn delay={.6}><Magnet onMove={setShadow} shadowRef={shadowRef}><img src="/my_avatar_meditating.png" alt="Saurabh's meditating 3D avatar" fetchPriority="high"/></Magnet></FadeIn></div></section>}
const about="Hi there! I'm Saurabh, a product designer with over a decade of experience shaping digital and physical experiences. My journey began in web and graphic design, and I've since grown into a UI/UX strategist who can help create innovative products from scratch or revitalize existing ones to better serve business needs.";
function Char({char,index,total,progress}:{char:string,index:number,total:number,progress:MotionValue<number>}){const opacity=useTransform(progress,[index/total,(index+1)/total],[.2,1]);return <motion.span style={{opacity}}>{char}</motion.span>}
function AnimatedText(){const ref=useRef<HTMLParagraphElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start 0.8','end 0.2']});let i=0;return <p ref={ref} className="about-text" aria-label={about}>{about.split(' ').map((word,w)=><span key={w} className="word" aria-hidden="true">{(word+' ').split('').map(char=><Char key={i} char={char} index={i++} total={about.length} progress={scrollYProgress}/>)}</span>)}</p>}
function About(){return <section id="about" className="about">{assets.decor.map((src,i)=><FadeIn key={src} className={`decor decor-${i}`} delay={.1+i*.05} x={i<2?-80:80} y={0}><img src={src} alt="" loading="lazy"/></FadeIn>)}<FadeIn><h2 className="hero-heading">About me</h2></FadeIn><AnimatedText/><ContactButton/></section>}
const services:[React.ReactNode,string][]=[
  ['Product Design','Whether it\'s a website, an application, or other software, I have a keen eye for making any product\'s UI and UX seamless and intuitive. Tangible products are my newest obsession. I bring the empathy that AI lacks and can make better design judgments. With interaction design in mind, I make experiences better and more seamless.'],
  [<><s>Vibe Coding</s> Agentic engineering</>,'AI can create designs quickly and sometimes beautifully. But are they as usable as designs shaped by a thoughtful process and empathy for users? With helpful new models and better techniques, I can use agentic engineering to create not just prototypes, but complete, usable products that are ready to ship.'],
  ['Design Systems','I have worked on design systems since the Sketch era. I\'ve built them from scratch and developed existing systems at a larger scale. With new generative AI systems, I can help bridge faster system generation with better compatibility for AI handoff and designer to developer handoff.'],
  ['Branding','Since childhood, I\'ve been fascinated by the design of Nike and Adidas logos. I studied for a bachelor\'s degree in Mass Media and Communication to follow my passion for design. Identity design feels therapeutic to me. I love the attention to detail and bringing a brand\'s true meaning to life through its identity.'],
  ['New age marketing','Marketing has evolved rapidly in the AI era. I combine my foundational marketing background with extensive hands on experience in graphic design to translate product value into clear brand positioning, search optimized visibility, and high impact campaigns that drive revenue.'],
];
function Services(){return <section id="services" className="services"><FadeIn><h2>Expertise</h2></FadeIn><div className="service-list">{services.map(([name,description],i)=><FadeIn key={i} delay={i*.1}><article className="service"><span className="number">0{i+1}</span><div><h3>{name}</h3><p>{description}</p></div></article></FadeIn>)}</div></section>}
function ProjectThumbnail({project,decorative=false}:{project:FeaturedProject,decorative?:boolean}){return <div className={`project-thumbnail project-thumbnail--${project.thumbnail.variant}`} aria-hidden={decorative||undefined} role={decorative?undefined:'img'} aria-label={decorative?undefined:`${project.title} temporary thumbnail placeholder`}><span className="thumbnail-label">{project.thumbnail.label}</span><span className="thumbnail-note">Temporary thumbnail</span></div>}
function ProjectCard({project,index,onOpen,onQuickLook}:{project:FeaturedProject,index:number,onOpen:(project:FeaturedProject)=>void,onQuickLook:(project:FeaturedProject)=>void}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});const scale=useTransform(scrollYProgress,[0,1],[1,1-(featuredProjects.length-1-index)*.03]);const intent=project.slug==='intent-identification';const adapt=project.slug==='adapt-icon-finder';const jira=project.slug==='jira-worklog-assistant';const catalog=project.slug==='catalog-curator-revamp';return <div className="project-track" ref={ref}><motion.article className={`project-card${intent?' project-card--intent':''}`} style={{scale,top:`calc(var(--sticky-top) + ${index*28}px)`}}><div className="project-header"><span className="number">0{index+1}</span><div className="project-copy"><p className="category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div><div className="project-actions">{project.slug==='adapt-icon-finder'?<a className="case-study-link" href={project.navigationTarget}>View project <ArrowUpRight size={17}/></a>:<><button className="live-button" onClick={()=>intent||project.slug==='jira-worklog-assistant'?onQuickLook(project):onOpen(project)}>Quick Look</button><a className="case-study-link" href={project.navigationTarget}>Case study {catalog?<img src="/catalog-curator/arrow-up-right.svg" alt=""/>:<ArrowUpRight size={17}/>}</a></>}</div></div><div className={`project-images${intent?' project-images--intent':adapt?' project-images--adapt':jira?' project-images--jira':catalog?' project-images--catalog':''}`}>{intent?<IntentPortfolioColumn/>:adapt?<AdaptThumbnailColumn/>:jira?<JiraThumbnailColumn/>:catalog?<CatalogThumbnailColumn/>:<div><ProjectThumbnail project={project} decorative/><ProjectThumbnail project={project} decorative/></div>}{intent?<IntentResponseAnimation/>:adapt?<AdaptPluginThumbnail/>:jira?<JiraProductThumbnail/>:catalog?<CatalogInteractionThumbnail/>:<ProjectThumbnail project={project}/>}</div></motion.article></div>}
function App(){
  const [project,setProject]=useState<FeaturedProject|null>(null);
  const [archiveRoute,setArchiveRoute]=useState(()=>window.location.pathname.replace(/\/$/,''));
  const [showQuickLook,setShowQuickLook]=useState(()=>window.location.pathname===intentQuickLookPath);
  const [showAdapt,setShowAdapt]=useState(()=>isAdaptPath(window.location.pathname));
  const [showJiraBro,setShowJiraBro]=useState(()=>isJiraBroPath(window.location.pathname));
  const [showJiraBroQuickLook,setShowJiraBroQuickLook]=useState(()=>isJiraBroQuickLookPath(window.location.pathname));
  const reducedMotion=useReducedMotion();
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(project!==null)dialog.current?.showModal();else dialog.current?.close()},[project]);
  useEffect(()=>{
    const syncRoute=()=>{setArchiveRoute(window.location.pathname.replace(/\/$/,''));setShowAdapt(isAdaptPath(window.location.pathname));setShowQuickLook(window.location.pathname===intentQuickLookPath);setShowJiraBro(isJiraBroPath(window.location.pathname));setShowJiraBroQuickLook(isJiraBroQuickLookPath(window.location.pathname));};
    window.addEventListener('popstate',syncRoute);
    return()=>window.removeEventListener('popstate',syncRoute);
  },[]);
  const openQuickLook=(selected:FeaturedProject)=>{
    const jira=selected.slug==='jira-worklog-assistant';
    window.history.pushState({fromPortfolio:true},'',jira?jiraBroQuickLookPath:intentQuickLookPath);
    if(jira)setShowJiraBroQuickLook(true);else setShowQuickLook(true);
  };
  const closeJiraBroQuickLook=()=>{
    if(window.history.state?.fromPortfolio){window.history.back();return;}
    window.location.assign('/#projects');
  };
  const closeQuickLook=()=>{
    if(window.history.state?.fromPortfolio){window.history.back();return;}
    window.history.replaceState({},'', '/');
    setShowQuickLook(false);
  };
  const dissolve={duration:reducedMotion?0:.2,ease:'easeInOut' as const};
  const archiveSlug=getArchiveSlug(archiveRoute);
  return <><AnimatePresence mode="wait" initial={false}>{showAdapt
    ? <motion.div key="adapt-icon-finder" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><AdaptIconFinder/></motion.div>
    : showJiraBroQuickLook
    ? <motion.div key="jirabro-quick-look" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><JiraBroQuickLook onBack={closeJiraBroQuickLook}/></motion.div>
    : showJiraBro
    ? <motion.div key="jirabro-case-study" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><JiraBroCaseStudy/></motion.div>
    : showQuickLook
    ? <motion.div key="quick-look" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><IntentQuickLook onBack={closeQuickLook}/></motion.div>
    : isIntentCaseStudyPath(archiveRoute)
    ? <motion.div key="intent-case-study" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><IntentCaseStudy/></motion.div>
    : archiveSlug
    ? <motion.div key={archiveSlug} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><ArchiveProjectPage slug={archiveSlug}/></motion.div>
    : archiveRoute==='/projects'
    ? <motion.div key="projects-listing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><ArchiveListing/></motion.div>
    : <motion.div key="portfolio" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={dissolve}><main><Hero/><HomeMarquees/><About/><Services/><section id="projects" className="projects"><FadeIn><h2 className="hero-heading">Featured Projects</h2></FadeIn>{featuredProjects.map((project,index)=><ProjectCard key={project.slug} project={project} index={index} onOpen={setProject} onQuickLook={openQuickLook}/>)}</section><footer id="contact"><p>Have something in mind?</p><h2 className="hero-heading">Let's create.</h2><p>Contact details coming soon.</p><a href="#">Back to top ↑</a></footer></main><dialog ref={dialog} onCancel={()=>setProject(null)} onClick={e=>{if(e.target===dialog.current)setProject(null)}}><button className="close" onClick={()=>setProject(null)} aria-label="Close project"><X/></button>{project!==null&&<><p className="category">{project.category}</p><h3>{project.title}</h3><p className="preview-note">{project.description}</p><div className="modal-thumbnail"><ProjectThumbnail project={project}/></div></>}</dialog></motion.div>}
  </AnimatePresence><ImageViewer/></>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
