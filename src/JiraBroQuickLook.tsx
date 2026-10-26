import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,Code2,Layers,ShieldCheck} from 'lucide-react';
import './JiraBroQuickLook.css';

export const jiraBroQuickLookPath='/projects/jira-worklog-assistant/quick-look';
export const isJiraBroQuickLookPath=(path:string)=>path.replace(/\/$/,'')===jiraBroQuickLookPath;
type Slide={name:string;eyebrow:string;title:string;copy:string};
const slides:Slide[]=[
  {name:'The idea',eyebrow:'JiraBro · AI × product design × engineering',title:'I wanted a Jira chatbot. So I built one.',copy:'JiraBro turns a natural-language work update into a Jira worklog the person can review before submitting. I designed and built the assistant from a small local proof of concept into a working web product.'},
  {name:'The friction',eyebrow:'The job to be done',title:'A small task had too many steps.',copy:'Logging time meant finding an issue, entering a duration, writing a comment, and doing it again for the next task. I asked whether a person could simply describe the work instead.'},
  {name:'The detour',eyebrow:'Constraint → experiment',title:'Teams was the destination. A browser was the starting point.',copy:'The first idea lived inside Microsoft Teams, but organizational permissions blocked an early test. I moved the core interaction into a local browser and terminal proof of concept so I could learn from a working flow.'},
  {name:'The evolution',eyebrow:'Designing by building',title:'From remembering commands to describing work.',copy:'The early assistant worked, but it expected command-style input. I iterated in code toward a clearer web experience with suggestions, quick actions, session context, and a natural-language composer.'},
  {name:'The guardrail',eyebrow:'AI with accountability',title:'The assistant proposes. The person approves.',copy:'I designed phase-aware AI instructions for interpreting the request. JiraBro selects an available local or configured cloud model, then checks the structured result. Conversational writes require a reviewed draft and human confirmation.'},
  {name:'The product',eyebrow:'Beyond one worklog',title:'A useful assistant grew around the core job.',copy:'As I tested the interaction, the web product gained quick logging, timers, bulk logging, and supporting productivity views. Building the behavior and interface together helped me see which next step needed to be clearer.'},
  {name:'Back to Teams',eyebrow:'Full circle',title:'The original idea found a way back.',copy:"After I demonstrated JiraBro at an innovation forum, I adapted the web assistant’s processing logic for a Teams bot. The integration is implemented and locally tested; organizational publication is in progress."},
  {name:'What I learned',eyebrow:'Reflection',title:'Build the smallest useful version.',copy:'A permission constraint created a testable path. Each working iteration exposed a clearer interaction problem, and the confirmation step kept the person in control when AI could act on work records.'},
];
function Screenshot({legacy=false}:{legacy?:boolean}){
  return <a className="jbql-screenshot" href={`/jirabro/${legacy?'legacy':'web-v2'}.png`} data-image-viewer aria-label={`Open full-size ${legacy?'legacy':'V2'} JiraBro screenshot`}><img src={`/jirabro/${legacy?'legacy':'web-v2'}.png`} width={legacy?640:1440} height={legacy?440:900} alt={legacy?'Actual legacy JiraBro UI with command input and a plain response area.':'Actual JiraBro V2 UI: Quick Log, suggestions, session context, quick actions, and a natural-language composer.'}/><span className="jbql-expand"><ArrowUpRight size={15} aria-hidden="true"/> Full size</span></a>;
}
type DiagramKind='manual'|'detour';
type Step={name:string;sub:string;detail:string;accent?:boolean};
const manual:Step[]=[{name:'Find the issue',sub:'Choose a Jira task',detail:'Find the right Jira issue.'},{name:'Enter a duration',sub:'Record time worked',detail:'Enter the duration of the work.'},{name:'Write a comment',sub:'Describe the work',detail:'Write a comment describing what you did.'},{name:'Repeat for each task',sub:'Start the process again',detail:'Repeat these steps for the next task.'}];
const detour:Step[]=[{name:'Teams idea',sub:'Permissions blocked testing',detail:'Start where work conversations happen; organizational permissions block the early test.'},{name:'Local proof of concept',sub:'Test the core interaction',detail:'Use a browser and terminal to test interpretation, review, and submission.',accent:true},{name:'Web assistant',sub:'Iterate the working product',detail:'Refine the interface and behavior through working iterations.'}];
function Diagram({kind}:{kind:DiagramKind}){
  const items=kind==='manual'?manual:detour;
  const slug=`jbql-${kind}`,width=1056,height=240;
  const nodeWidth=kind==='manual'?224:320,gap=32,start=16;
  const caption=kind==='manual'?'Illustrative task flow · no measured time savings.':'Product sequence only · no dates or elapsed time implied.';
  return <figure className={`jbql-diagram jbql-diagram--${kind}`} aria-labelledby={`${slug}-caption`}>
    <div className="jbql-figure-top"><span>{kind==='manual'?'The manual worklog':'A smaller surface to learn on'}</span><span>Conceptual diagram</span></div>
    <div className="jbql-diagram-scroll" data-local-pan>
      <svg viewBox={`0 0 ${width} ${height}`} style={{minWidth:width}} role="img" aria-labelledby={`${slug}-title ${slug}-desc`}>
        <title id={`${slug}-title`}>{kind==='manual'?'The manual worklog process':'The path from Teams idea to web assistant'}</title>
        <desc id={`${slug}-desc`}>{items.map(i=>i.detail).join(' ')}</desc>
        <defs><marker id={`${slug}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="#aab8bf" strokeWidth="1.3"/></marker></defs>
        {items.slice(0,-1).map((_,i)=><line key={i} x1={start+i*(nodeWidth+gap)+nodeWidth} y1="100" x2={start+(i+1)*(nodeWidth+gap)-4} y2="100" stroke="#aab8bf" strokeWidth="1.5" markerEnd={`url(#${slug}-arrow)`}/>)}
        {items.map((n,i)=><g key={n.name} className={n.accent?'jbql-svg-focal':undefined}><rect x={start+i*(nodeWidth+gap)} y="52" width={nodeWidth} height="96" rx="6" fill={n.accent?'#192b28':'#151818'} stroke={n.accent?'#83e0cf':'#67777e'}/><text x={start+i*(nodeWidth+gap)+16} y="40" fill="#aab8bf" fontSize="12" letterSpacing="1.5">{String(i+1).padStart(2,'0')}</text><text x={start+i*(nodeWidth+gap)+16} y="92" fill={n.accent?'#83e0cf':'#d7e2ea'} fontSize="22" fontWeight="500">{n.name}</text><text x={start+i*(nodeWidth+gap)+16} y="120" fill="#aab8bf" fontSize="15">{n.sub}</text></g>)}
        <text x="16" y="208" fill="#aab8bf" fontSize="15">{kind==='manual'?'The same interaction repeats across tasks.':'The constraint changed the route. The core job stayed the same.'}</text>
      </svg>
    </div>
    <ol className="jbql-diagram-mobile">{items.map((n,i)=><li key={n.name} className={n.accent?'is-focal':''}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{n.name}</strong><p>{n.detail}</p></div></li>)}</ol>
    <figcaption id={`${slug}-caption`}>{caption}</figcaption>
  </figure>;
}
function AiGuardrail(){
  const layers=[
    {label:'01 / UNDERSTAND',heading:'Shape a useful intent',steps:[['Instructions','Phase-aware intents and slot rules'],['Model selection','Eligible Ollama or configured cloud'],['Structured result','JSON parsed and schema-checked']]},
    {label:'02 / ACT SAFELY',heading:'Keep the person in control',steps:[['Validate','Resolve issue and required details'],['Review','Confirm or cancel a proposed write'],['Jira result','Report actual success or error']]},
  ];
  return <figure className="jbql-ai-flow" aria-labelledby="jbql-ai-caption"><div className="jbql-figure-top"><span>AI instructions + safeguards</span><span>Conceptual diagram</span></div><div className="jbql-ai-layers">{layers.map(layer=><div className="jbql-ai-layer" key={layer.label}><div className="jbql-ai-layer-heading"><span>{layer.label}</span><strong>{layer.heading}</strong></div><ol>{layer.steps.map(([title,detail])=><li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ol></div>)}</div><p className="jbql-ai-branches">Strict commands bypass the model. Missing details lead to clarification. Read-only requests do not need approval.</p><figcaption id="jbql-ai-caption">I designed the instructions and safeguards, not just the interface. Human confirmation applies to conversational writes.</figcaption></figure>;
}
function TeamsPreview(){
  return <figure className="jbql-teams"><div className="jbql-figure-top"><span>Teams integration preview</span><span>Mockup</span></div><div className="jbql-teams-window"><div className="jbql-teams-header"><span className="jbql-bot">JB</span><strong>JiraBro</strong><span>Personal chat</span></div><p className="jbql-teams-user">Log two hours on UX-1213 for testing</p><div className="jbql-teams-reply"><span>JIRABRO</span><p>Review worklog<br/><strong>UX-1213 · 2h</strong><br/>testing</p><div className="jbql-adaptive"><small>Choose an action</small><div><span>Confirm</span><span>Cancel</span></div></div></div></div><figcaption>Source-based mockup · chat replies and Adaptive Card actions. Illustrative input.</figcaption></figure>;
}
function SlideVisual({index}:{index:number}){
  if(index===0)return <figure className="jbql-cover-product"><div className="jbql-figure-top"><span><i/> Working web assistant</span><span>Actual product UI</span></div><Screenshot/><figcaption>Illustrative input · no live Jira session in this capture.</figcaption></figure>;
  if(index===1)return <><Diagram kind="manual"/><div className="jbql-request"><span className="jbql-label">What if I could just say…</span><blockquote>“Log two hours on DEMO-123 for testing.”</blockquote><span className="jbql-note">Illustrative request</span></div></>;
  if(index===2)return <><Diagram kind="detour"/><p className="jbql-takeaway">Prove the core job. Then find the right surface.</p></>;
  if(index===3)return <><div className="jbql-comparison"><figure><div className="jbql-comparison-label"><span>Before</span><strong>Remember the command.</strong></div><Screenshot legacy/><figcaption>Actual legacy interface</figcaption></figure><figure><div className="jbql-comparison-label"><span>After</span><strong>Describe the work.</strong></div><Screenshot/><figcaption>Actual V2 interface</figcaption></figure></div><p className="jbql-note">Actual product captures with illustrative input; no live Jira session.</p></>;
  if(index===4)return <AiGuardrail/>;
  if(index===5)return <><figure className="jbql-product-tour"><div className="jbql-tour-image"><Screenshot/><span className="jbql-pin jbql-pin--1" aria-hidden="true">1</span><span className="jbql-pin jbql-pin--2" aria-hidden="true">2</span><span className="jbql-pin jbql-pin--3" aria-hidden="true">3</span><span className="jbql-pin jbql-pin--4" aria-hidden="true">4</span></div><figcaption><span className="jbql-label">Actual V2 interface · illustrative input</span><ol>{[['Quick Log','A clear starting point.'],['Suggestions','Discover what to ask.'],['Session context','Keep the current work in view.'],['Quick actions','Find the next useful action.']].map(([t,d],i)=><li key={t}><span>{i+1}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}</ol></figcaption></figure><div className="jbql-feature-strip"><span>Built around the core job</span><p>Timers <b>·</b> Bulk logging <b>·</b> Supporting views</p></div></>;
  if(index===6)return <><div className="jbql-surfaces"><figure className="jbql-web-preview"><div className="jbql-figure-top"><span>Web assistant</span><span>Actual product UI</span></div><Screenshot/><figcaption>Existing web product · illustrative input.</figcaption></figure><TeamsPreview/></div><p className="jbql-status"><Check size={16} aria-hidden="true"/> Integration implemented and locally tested <span>Publication in progress</span></p></>;
  return <div className="jbql-reflection"><p className="jbql-reflection-line">Let it teach you<br/><em>what to design next.</em></p><ol>{[{icon:Code2,title:'Build to learn',copy:'Make the core interaction tangible.'},{icon:ShieldCheck,title:'Validate before acting',copy:'Keep the person in control of the write.'},{icon:Layers,title:'Reuse what works',copy:'Carry the interaction model across surfaces.'}].map(({icon:Icon,title,copy},i)=><li key={title}><span>0{i+1}</span><Icon size={22} aria-hidden="true"/><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol><div className="jbql-closing"><a className="jbql-primary" href="/projects/jira-worklog-assistant">Read the full case study <ArrowUpRight size={18} aria-hidden="true"/></a><a href="/#projects">Back to projects <ArrowRight size={17} aria-hidden="true"/></a></div></div>;
}
export function JiraBroQuickLook({onBack}:{onBack:()=>void}){
  const [active,setActive]=useState(0);
  const root=useRef<HTMLDivElement>(null),viewport=useRef<HTMLElement>(null),heading=useRef<HTMLHeadingElement>(null);
  const focusAfterChange=useRef(false);
  const slide=slides[active];
  useEffect(()=>{const title=document.title;document.title='JiraBro — Quick Look | Saurabh';return()=>{document.title=title};},[]);
  useEffect(()=>{
    viewport.current?.scrollTo({top:0,behavior:'instant'});
    if(focusAfterChange.current||document.activeElement===document.body){heading.current?.focus({preventScroll:true});focusAfterChange.current=false;}
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{const context=gsap.context(()=>{gsap.fromTo('.jbql-slide-heading, .jbql-slide-visual',{opacity:0,y:12},{opacity:1,y:0,duration:.4,stagger:.06,ease:'power2.out',clearProps:'all'});},root);return()=>context.revert();});
    return()=>media.revert();
  },[active]);
  useEffect(()=>{
    const navigate=(event:KeyboardEvent)=>{
      if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
      if(event.target instanceof Element&&event.target.closest('a,button,input,textarea,select,summary,[contenteditable="true"],[role="slider"],[role="tablist"],[data-local-pan]'))return;
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();focusAfterChange.current=true;setActive(n=>Math.max(0,Math.min(slides.length-1,n+(event.key==='ArrowRight'?1:-1))));}
    };
    window.addEventListener('keydown',navigate);return()=>window.removeEventListener('keydown',navigate);
  },[]);
  const changeSlide=(index:number)=>{if(index===active)return;focusAfterChange.current=index===0||index===slides.length-1;setActive(Math.max(0,Math.min(slides.length-1,index)));};
  return <div ref={root} className="jbql-page"><header className="jbql-header"><a href="/#projects" onClick={event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onBack();}}}><ArrowLeft size={15} aria-hidden="true"/> Back to portfolio</a><span className="jbql-project-label">JiraBro <span>/</span> Jira Worklog Assistant</span><span className="jbql-edition">Quick Look</span></header><main ref={viewport} className="jbql-viewport" id="jirabro-quick-look-content"><section key={active} className={`jbql-slide jbql-slide--${active+1}`} aria-roledescription="slide" aria-label={`${active+1} of ${slides.length}: ${slide.name}`}><div className="jbql-slide-heading"><p className="jbql-eyebrow"><span/>{String(active+1).padStart(2,'0')} / {slide.eyebrow}</p><h1 ref={heading} tabIndex={-1}>{active===0?<>I wanted a Jira chatbot.<br/><em>So I built one.</em></>:slide.title}</h1><p className="jbql-intro">{slide.copy}</p>{active===0&&<dl className="jbql-metadata"><div><dt>My role</dt><dd>Product concept · UX & interaction design<br/>AI-assisted development · Prototyping & validation</dd></div><div><dt>The experience</dt><dd>8 slides · About 2 minutes</dd></div></dl>}</div><div className="jbql-slide-visual"><SlideVisual index={active}/></div></section></main><nav className="jbql-navigation" aria-label="Quick Look slides"><div className="jbql-position" role="status" aria-live="polite" aria-atomic="true"><strong>{String(active+1).padStart(2,'0')}</strong><span>/ 08</span><span className="jbql-current-name">{slide.name}</span></div><div className="jbql-progress" role="group" aria-label="Choose a slide">{slides.map((s,i)=><button key={s.name} aria-label={`Slide ${i+1}: ${s.name}`} aria-current={i===active?'step':undefined} className={i<=active?'is-visited':''} onClick={()=>changeSlide(i)}><span/></button>)}</div><div className="jbql-nav-buttons"><button disabled={active===0} onClick={()=>changeSlide(active-1)} aria-controls="jirabro-quick-look-content"><ArrowLeft size={17} aria-hidden="true"/><span>Previous</span></button><button disabled={active===slides.length-1} onClick={()=>changeSlide(active+1)} aria-controls="jirabro-quick-look-content"><span>Next</span><ArrowRight size={17} aria-hidden="true"/></button></div></nav></div>;
}
