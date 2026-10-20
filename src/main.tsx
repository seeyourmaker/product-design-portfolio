import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,useScroll,useTransform,useReducedMotion,MotionValue} from 'framer-motion';
import {ArrowUpRight,X} from 'lucide-react';
import {gsap} from 'gsap';
import {useMobileAvatarMotion} from './useMobileAvatarMotion';
import assets from './assets.json';
import './style.css';

function FadeIn({children,delay=0,y=30,x=0,className=''}:{children:React.ReactNode,delay?:number,y?:number,x?:number,className?:string}){return <motion.div className={className} initial={{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px',amount:0}} transition={{duration:.7,delay,ease:[.25,.1,.25,1]}}>{children}</motion.div>}
function ContactButton(){return <a className="contact-button" href="#contact">Contact Me</a>}
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
function Hero(){const [shadow,setShadow]=useState<MagnetPosition>({x:0,y:0,active:false});const shadowRef=useRef<HTMLDivElement>(null);return <section className="hero"><FadeIn y={-20}><nav>{['About','Expertise','Projects','Contact'].map((n,i)=><a key={n} href={['#about','#services','#projects','#contact'][i]}>{n}</a>)}</nav></FadeIn><div className="heading-wrap"><FadeIn delay={.15} y={40}><h1 className="hero-heading">Hi, I'm Saurabh</h1><h3 className="hero-subtitle">A Product Designer</h3></FadeIn></div><div className="hero-bottom"><FadeIn delay={.35} y={20}><p className="hero-intro">A PRODUCT DESIGNER CRAFTING<br/>INTUITIVE EXPERIENCES AT<br/>THE INTERSECTION OF UX &amp; AI.</p></FadeIn><FadeIn delay={.5} y={20}><a className="contact-button" href="#projects">Explore my work</a></FadeIn></div><div ref={shadowRef} className="hero-floor-shadow" aria-hidden="true" style={{transform:`translateX(calc(-50% + ${shadow.x}px)) scale(${Math.max(.35,1+shadow.y/900)})`,opacity:Math.max(.35,Math.min(1,.7+shadow.y/300))}}/><div className="portrait"><FadeIn delay={.6}><Magnet onMove={setShadow} shadowRef={shadowRef}><img src="/my_avatar_meditating.png" alt="Your meditating 3D avatar" fetchPriority="high"/></Magnet></FadeIn></div></section>}
function Marquee(){const ref=useRef<HTMLElement>(null);const {scrollY}=useScroll();const [top,setTop]=useState(0);useEffect(()=>{const measure=()=>setTop((ref.current?.getBoundingClientRect().top||0)+window.scrollY-window.innerHeight);measure();window.addEventListener('resize',measure);return()=>window.removeEventListener('resize',measure)},[]);const right=useTransform(scrollY,y=>(y-top)*.3-650);const left=useTransform(scrollY,y=>-((y-top)*.3)-200);return <section ref={ref} className="marquee" aria-label="Motion design inspiration">{[assets.marquee.slice(0,11),assets.marquee.slice(11)].map((row,i)=><motion.div className="marquee-row" key={i} style={{x:i?left:right,willChange:'transform'}}>{[...row,...row,...row].map((src,j)=><img key={j} src={src} alt="Motion design showcase" loading="lazy"/>)}</motion.div>)}</section>}
const about="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";
function Char({char,index,total,progress}:{char:string,index:number,total:number,progress:MotionValue<number>}){const opacity=useTransform(progress,[index/total,(index+1)/total],[.2,1]);return <motion.span style={{opacity}}>{char}</motion.span>}
function AnimatedText(){const ref=useRef<HTMLParagraphElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start 0.8','end 0.2']});let i=0;return <p ref={ref} className="about-text" aria-label={about}>{about.split(' ').map((word,w)=><span key={w} className="word" aria-hidden="true">{(word+' ').split('').map(char=><Char key={i} char={char} index={i++} total={about.length} progress={scrollYProgress}/>)}</span>)}</p>}
function About(){return <section id="about" className="about">{assets.decor.map((src,i)=><FadeIn key={src} className={`decor decor-${i}`} delay={.1+i*.05} x={i<2?-80:80} y={0}><img src={src} alt="" loading="lazy"/></FadeIn>)}<FadeIn><h2 className="hero-heading">About me</h2></FadeIn><AnimatedText/><ContactButton/></section>}
const services=[['3D Modeling','Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'],['Rendering','High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'],['Motion Design','Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'],['Branding','Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.'],['Web Design','Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.']];
function Services(){return <section id="services" className="services"><FadeIn><h2>Services</h2></FadeIn><div className="service-list">{services.map(([name,description],i)=><FadeIn key={name} delay={i*.1}><article className="service"><span className="number">0{i+1}</span><div><h3>{name}</h3><p>{description}</p></div></article></FadeIn>)}</div></section>}
const names=['Nextlevel Studio','Aura Brand Identity','Solaris Digital','Jira worklog assistant'];
function ProjectCard({index,onOpen}:{index:number,onOpen:(i:number)=>void}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});const scale=useTransform(scrollYProgress,[0,1],[1,1-(names.length-1-index)*.03]);return <div className="project-track" ref={ref}><motion.article className="project-card" style={{scale,top:`calc(var(--sticky-top) + ${index*28}px)`}}><div className="project-header"><span className="number">0{index+1}</span><div><p className="category">{index===3?'Personal project':index===1?'Personal':'Client'}</p><h3>{names[index]}</h3></div><button className="live-button" onClick={()=>onOpen(index)}>Live Project <ArrowUpRight size={17}/></button></div><div className="project-images"><div>{assets.projects.slice(index*3,index*3+2).map((src,i)=><img key={`${src}-${i}`} src={src} alt={`${names[index]} detail ${i+1}`} loading="lazy"/>)}</div><img src={assets.projects[index*3+2]} alt={`${names[index]} main visual`} loading="lazy"/></div></motion.article></div>}
function App(){const [project,setProject]=useState<number|null>(null);const dialog=useRef<HTMLDialogElement>(null);useEffect(()=>{if(project!==null)dialog.current?.showModal();else dialog.current?.close()},[project]);return <><main><Hero/><Marquee/><About/><Services/><section id="projects" className="projects"><FadeIn><h2 className="hero-heading">Project</h2></FadeIn>{names.map((n,i)=><ProjectCard key={n} index={i} onOpen={setProject}/>)}</section><footer id="contact"><p>Have something in mind?</p><h2 className="hero-heading">Let's create.</h2><p>Contact details coming soon.</p><a href="#">Back to top ↑</a></footer></main><dialog ref={dialog} onCancel={()=>setProject(null)} onClick={e=>{if(e.target===dialog.current)setProject(null)}}><button className="close" onClick={()=>setProject(null)} aria-label="Close project"><X/></button>{project!==null&&<><p className="category">Project preview</p><h3>{names[project]}</h3><p className="preview-note">Visual showcase from the supplied brief. A live project URL hasn’t been provided.</p>{assets.projects.slice(project*3,project*3+3).map((src,i)=><img key={`${src}-${i}`} src={src} alt={names[project]}/>)}</>}</dialog></>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
