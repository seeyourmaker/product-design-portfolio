import {useEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,GitBranch,MessageCircle,ShieldCheck,Sparkles,Square,Pause,Play,RotateCcw,X,Waypoints} from 'lucide-react';
import {IntentInterpretation,IntentResponseExperience,IntentUnderstanding} from './IntentThumbnails';
import './IntentQuickLook.css';

export const intentQuickLookPath = '/projects/intent-identification/quick-look';

const slides = [
  {name:'Introduction',eyebrow:'AI experience design · Intent Identification',title:'Inside the Mind of an AI',copy:'What happens between a user asking an AI to create something—and the AI deciding what to do? I redesigned how Catalog Curator interprets requests, handles uncertainty, and prepares safer service drafts.'},
  {name:'Before vs. After',eyebrow:'02 / The interaction',title:'From immediate generation to intent-aware guidance.',copy:'A detailed configuration is useful when the request is ready. When material choices remain unresolved, generating first leaves the user to inspect a large draft and untangle its assumptions. It also results in larger token consumption.'},
  {name:'Why intent comes first',eyebrow:'03 / Why intent comes first',title:"The problem wasn’t prompt length. It was deciding when to act.",copy:'A long request can be clear. A short request can hide a critical decision. The assistant needed a way to distinguish the two before creating a service.'},
  {name:'The decision framework',eyebrow:'04 / Designing the decision framework',title:'Three decisions. No guesswork.',copy:'I designed a pre-generation guardrail around the existing intent system. It checks whether the request can be safely resolved, needs one targeted clarification, or asks for an unsupported capability.'},
  {name:'Understanding the request',eyebrow:'05 / Understanding the request',title:'One prompt. Multiple intents.',copy:'Intent Identification maps natural language to meaningful product actions. I independently drove the UX research, framework, and interaction design: recognizing each action was the starting point for deciding whether it was safe to proceed.'},
  {name:'Conversation design',eyebrow:'06 / From decision to conversation',title:'Ask less. Get it right.',copy:'The decision should shape the conversation: a clear request gets a draft, a consequential ambiguity gets one focused question, and an unsupported feature gets an honest limitation with a useful next step.'},
  {name:'Iteration + Jev',eyebrow:'07 / What changed in the approach',title:'Less overthinking. Better decisions.',copy:'Prompt Dissector exposed how requests could be broken down, but the prototype wasn’t implemented as the intended solution. Engineering translated useful patterns into AI instructions. We refined decision questions and proposed Jev as a structured decision layer; engineering integrated it into the development environment.'},
  {name:'Outcomes + reflection',eyebrow:'08 / Outcomes + reflection',title:'Better first drafts. Fewer wasted tokens.',copy:'A three-outcome framework. More purposeful conversations. A practical path from prototype to development integration. The goal wasn’t to make AI ask more questions. It was to make it ask the right question only when necessary.'},
];

const outcomes=[
  {tone:'clear',label:'Ready to generate',action:'Generate a draft',description:'Clear requirements or documented safe defaults.',icon:Check},
  {tone:'ambiguous',label:'Clarification required',action:'Ask one question',description:'An unresolved ambiguity would change the draft.',icon:MessageCircle},
  {tone:'unsupported',label:'Unsupported',action:'Explain a limitation',description:'Capability is not established as supported. Do not fabricate.',icon:ShieldCheck},
];

function Outcomes({compact=false}:{compact?:boolean}){
  return <div className={`ql-outcomes${compact?' ql-outcomes--compact':''}`}>{outcomes.map(({tone,label,action,description,icon:Icon})=><div className={`ql-outcome ql-tone--${tone}`} key={tone}><span className="ql-status"><Icon size={14} aria-hidden="true"/>{label}</span><strong>{action}</strong>{!compact&&<p>{description}</p>}</div>)}</div>;
}

function HeroVisual(){
  return <figure className="ql-hero-visual" aria-label="Designed decision behavior: a user request is understood, checked for safe action, then drafted when ready.">
    <div className="ql-orbit ql-orbit--one"/><div className="ql-orbit ql-orbit--two"/>
    <div className="ql-hero-request"><MessageCircle size={17} aria-hidden="true"/><span>User request</span><p>“Create a laptop request service…”</p></div>
    <div className="ql-hero-link" aria-hidden="true"/>
    <div className="ql-hero-understand"><Waypoints size={21} aria-hidden="true"/><span>Understand</span><small>Recognize the intent</small></div>
    <div className="ql-hero-link" aria-hidden="true"/>
    <div className="ql-hero-decide"><span className="ql-mini">The design intervention</span><GitBranch size={32} aria-hidden="true"/><strong>Decide</strong><p>Is it safe to act?</p><div><span>Clear</span><span>Ambiguous</span><span>Unsupported</span></div></div>
    <div className="ql-hero-link ql-hero-link--after" aria-hidden="true"/><div className="ql-hero-draft"><Sparkles size={18} aria-hidden="true"/><span>Draft</span><small>When ready to generate</small></div>
    <figcaption>A visualization of designed behavior.</figcaption>
  </figure>;
}

function ProductOverview(){
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  return <><button ref={trigger} className="ql-product-link" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}>BMC Helix Catalog Curator <ArrowUpRight size={13} aria-hidden="true"/></button>
    <dialog ref={dialog} className="ql-product-dialog" aria-labelledby="ql-product-title" onKeyDown={event=>{if(event.key==='Tab'){event.preventDefault();dialog.current?.querySelector<HTMLButtonElement>('button')?.focus()}}} onClose={()=>trigger.current?.focus()} onClick={event=>{if(event.target===dialog.current){const bounds=dialog.current.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.current.close()}}}>
      <button autoFocus className="ql-dialog-close" onClick={()=>dialog.current?.close()} aria-label="Close product overview"><X size={20}/></button><span className="ql-mini">Product overview</span><h2 id="ql-product-title">A conversation into a service.</h2><p>BMC Helix Catalog Curator helps catalog teams create and manage service offerings through an AI-assisted conversation. A request can involve service details, questions, approvals, and fulfillment. This project focuses on understanding that request before generating a service draft.</p>
    </dialog></>;
}

// Fictional content. The screenshot informs the structure, never the underlying data.
const configuration=[
  {title:'Service Parameters',columns:['Attribute','Value'],rows:[['Multiple languages','Disabled'],['Requested locale','English'],['Logo','Default service icon']]},
  {title:'Service Attributes',columns:['Attribute','English'],rows:[['Service name','Book a collaboration room'],['Template','Workspace services'],['Version','Draft 1.0']]},
  {title:'Service Profile',columns:['Attribute','Value'],rows:[['Category','Workplace'],['Fulfillment type','Internal workflow'],['Tags','room, booking, workspace, site'],['Media','None'],['Service excerpt','Find a room across available sites.'],['Service description','Choose a site, date, and room for your next team meeting.']]},
  {title:'Service Workflow',columns:['Attribute','Value'],rows:[['Workflow name','Room booking fulfillment'],['Approval requirement','None assumed'],['Fulfillment requirement','Work order']]},
  {title:'Questionnaire (English)',columns:['ID','Label','Question type','Additional details'],rows:[['Q1','Site','Dropdown','Required · North / South workspace'],['Q2','Meeting date','Date field','Required · Future dates'],['Q3','Start time','Time field','Required'],['Q4','End time','Time field','Required'],['Q5','Attendees','Integer field','Required · Minimum 1'],['Q6','Meeting room','Dropdown','Required · Available rooms'],['Q7','Meeting purpose','Text area','Optional']]},
  {title:'Service Cost & Quantity',columns:['Attribute','Value'],rows:[['Payment type','Free'],['Price','0'],['Quantity','One reservation']]},
];

function BeforeExperience(){
  const scroll=useRef<HTMLDivElement>(null);
  const [playing,setPlaying]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [replay,setReplay]=useState(0);
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop=()=>{if(preference.matches)setPlaying(false)};
    preference.addEventListener('change',stop);
    return()=>preference.removeEventListener('change',stop);
  },[]);
  useEffect(()=>{
    if(!playing)return;
    let frame=0,previous=0,elapsed=0;
    const tick=(time:number)=>{
      const element=scroll.current;
      if(!element)return;
      const delta=previous?Math.min(time-previous,64):0;previous=time;elapsed+=delta;
      if(elapsed>1200)element.scrollTop+=delta*.065;
      if(elapsed>1200&&element.scrollTop>=element.scrollHeight-element.clientHeight-1){setPlaying(false);return}
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  },[playing,replay]);
  return <div className="ql-before-demo">
    <div className="ql-demo-toolbar"><span><Sparkles size={13} aria-hidden="true"/>Catalog Curator <small>Fictional data</small></span><div><button aria-label={playing?'Pause response animation':'Play response animation'} onClick={()=>setPlaying(value=>!value)}>{playing?<Pause size={15}/>:<Play size={15}/>}</button><button aria-label="Replay response animation" onClick={()=>{scroll.current?.scrollTo({top:0,behavior:'instant' as ScrollBehavior});setReplay(value=>value+1);setPlaying(true)}}><RotateCcw size={15}/></button></div></div>
    <div ref={scroll} className="ql-before-scroll" tabIndex={0} role="region" aria-label="Fictional service configuration response. Scroll to read all six sections." data-local-pan onPointerDown={()=>setPlaying(false)} onWheel={()=>setPlaying(false)} onKeyDown={()=>setPlaying(false)} onFocus={()=>setPlaying(false)}>
      <div className="ql-before-prompt">Create a service to reserve meeting rooms. There should be an option to choose from different sites.</div>
      <div className="ql-config-response"><span className="ql-config-label"><Sparkles size={14} aria-hidden="true"/>Service configuration</span>{configuration.map(section=><section key={section.title}><h3>{section.title}</h3><div className="ql-table-scroll" role="region" tabIndex={0} aria-label={`${section.title} table; scroll horizontally if needed`}><table><thead><tr>{section.columns.map(column=><th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{section.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div></section>)}<p>Review the details above. Create the service or continue editing the draft.</p><span className="ql-demo-create">Create service</span></div>
    </div><div className="ql-demo-footer"><span>6 sections · one generated draft</span><span>{playing?'Auto-scrolling':'Paused · scroll to explore'}</span></div>
  </div>;
}

function Comparison(){
  return <><div className="ql-comparison">
    <article className="ql-comparison-panel"><div className="ql-comparison-label"><span>Before</span><small>Existing interaction</small></div><BeforeExperience/><p className="ql-comparison-caption">Generate first, leaving the user to inspect a large draft.</p></article>
    <article className="ql-comparison-panel ql-comparison-panel--after"><div className="ql-comparison-label"><span>After</span><small>Design direction</small></div><div className="ql-after-slot" data-after-mockup-slot><span className="ql-mini">Final UI pending</span><div className="ql-mockup-outline" aria-hidden="true"><Square size={36} strokeWidth={1}/><span/></div><h2>Understand first.<br/>Then create.</h2><p>Redesigned experience — final mockup to be added.</p><div className="ql-behavior-preview"><span className="ql-mini">Conceptual behavior</span><p>Interpret request <span>→</span> Check for material ambiguity <span>→</span> Ask one meaningful question or generate an appropriate draft</p></div></div><p className="ql-comparison-caption">Understand intent first; clarify only when necessary, then generate the right response.</p></article>
  </div><p className="ql-takeaway">Clear requests can go straight to a complete draft.</p></>;
}

function IntentDecision(){
  return <div className="ql-intent-decision"><div className="ql-decision-context"><span className="ql-mini">Complexity ≠ ambiguity</span><p>Many requirements can be explicit.<br/>A few words can leave a consequential choice open.</p></div><div className="ql-material-question"><GitBranch size={24} aria-hidden="true"/><h2>Is it safe to act on this request?</h2><p>Check support, safe defaults, and the impact of a wrong assumption.</p></div><div className="ql-decision-connectors" aria-hidden="true"><span/><span/><span/></div><Outcomes/><p className="ql-decision-foot">Unsupported integrations require an honest limitation. Missing detail alone doesn’t justify another question.</p></div>;
}

function FrameworkDetail(){
  return <details className="ql-detail"><summary><span><GitBranch size={16} aria-hidden="true"/>Explore the decision logic</span><span className="ql-detail-hint">Five classifications → three decisions</span></summary><div className="ql-detail-content">
    <p className="ql-mini">Simplified from the workshop decision tree</p>
    <ol className="ql-decision-sequence"><li><b>01</b><div><strong>Understand the request</strong><p>Identify the meaningful requirements.</p></div></li><li><b>02</b><div><strong>Establish support</strong><p>Check relevant capabilities and entities.</p></div><span className="ql-branch ql-tone--unsupported">Unsupported → do not fabricate</span></li><li><b>03</b><div><strong>Resolve safely</strong><p>Use an established interpretation or documented safe default.</p></div><span className="ql-branch ql-tone--clear">Resolved → generate</span></li><li><b>04</b><div><strong>Check the consequence</strong><p>Would an unresolved choice materially change the service?</p></div><span className="ql-branch ql-tone--ambiguous">Material ambiguity → ask one question</span></li></ol>
    <p className="ql-detail-note">No material ambiguity, or a uniquely resolved interpretation → proceed. If several ambiguities matter, ask about the highest-impact one.</p>
    <dl className="ql-classifications">{[['Clear','Explicit and sufficiently resolved.'],['Safe default','Missing detail; documented default exists.'],['Ambiguous','Several plausible interpretations; clarify if consequential.'],['Unsupported','Capability gap; do not invent support.'],['Unknown','No safe resolution or default; assess material impact.']].map(([term,definition])=><div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
  </div></details>;
}

function Conversations(){
  const examples=[
    {tone:'clear',label:'Clear',title:'Guest parking',description:'Generate a service draft using safe defaults, then allow editing.',foot:'A useful starting point',icon:Check},
    {tone:'ambiguous',label:'Ambiguous',title:'Mobile phone approval',description:'Clarify approval workflow selection before preparing the draft.',foot:'One meaningful choice',icon:MessageCircle},
    {tone:'unsupported',label:'Unsupported',title:'Proprietary asset database sync',description:'Explain the integration limit. Offer a supported draft or revised requirements.',foot:'Preserve the supported scope',icon:ShieldCheck},
  ];
  return <div className="ql-conversations">{examples.map(({tone,label,title,description,foot,icon:Icon})=><article className={`ql-conversation ql-tone--${tone}`} key={tone}><span className="ql-status"><Icon size={14} aria-hidden="true"/>{label}</span><h2>{title}</h2><p>{description}</p><span className="ql-conversation-foot">{foot}<ArrowUpRight size={16} aria-hidden="true"/></span></article>)}</div>;
}

function Iteration(){
  return <div className="ql-iteration"><ol className="ql-evolution">{[
    ['01','Prompt Dissector','Prototype · not implemented','Made the request breakdown tangible.'],
    ['02','AI instructions','Adopted approach','Engineering translated useful reasoning patterns.'],
    ['03','Jev decision layer','Evaluated → proposed → integrated in dev','Structured the decision questions before generation.'],
  ].map(([number,title,status,description])=><li key={number}><span className="ql-evolution-number">{number}</span><span className="ql-evolution-arrow" aria-hidden="true">→</span><h2>{title}</h2><span className="ql-evolution-status">{status}</span><p>{description}</p></li>)}</ol>
    <div className="ql-question-design"><div><span className="ql-mini">The questions we refined</span><h2>A safety check<br/>before generation.</h2><p>Between intent understanding and service generation.</p></div><ol>{['Do we understand the request and its meaningful requirements?','Are the requested capabilities and entities supported or safely resolvable?','Would an unresolved ambiguity materially change the generated service?'].map((q,i)=><li key={q}><span>0{i+1}</span>{q}</li>)}</ol></div>
    <div className="ql-decision-outputs"><span>Decision outputs</span><b className="ql-tone--clear">Generate</b><b className="ql-tone--ambiguous">Ask one question</b><b className="ql-tone--unsupported">Stop unsupported generation</b></div>
  </div>;
}

function Results(){
  return <div className="ql-results"><figure className="ql-metric"><div className="ql-metric-top"><span className="ql-mini">Initial-prompt handling</span><span className="ql-test-label"><span/>Reported development testing</span></div><div className="ql-metric-values"><div><span>Before</span><strong>~60k</strong></div><ArrowRight className="ql-metric-arrow" strokeWidth={1} aria-hidden="true"/><div><span>After</span><strong>~20k</strong></div><div className="ql-metric-reduction"><b>~67%</b><span>fewer tokens</span></div></div><div className="ql-metric-bars" aria-hidden="true"><span/><span/></div><figcaption>Tokens used for initial prompts, including “Hello” and “What can you do?” The reported reduction reflects combined prompt, decision, and instruction improvements; it is not attributed solely to Jev.</figcaption><p className="ql-metric-caveat">A typical complete service-creation flow previously used ~80k–100k tokens. Its optimized total has not been established. Test conditions and token-count methodology still require owner verification.</p></figure>
    <div className="ql-result-tiles">{[['01','A clearer decision framework','Generate · clarify · unsupported'],['02','Purposeful conversations','Clear · ambiguous · unsupported patterns'],['03','A practical iteration','Prototype → instructions → Jev in dev']].map(([n,t,d])=><div key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>)}</div>
    <div className="ql-closing"><p>The right question.<br/><em>Only when necessary.</em></p><div><button className="ql-future-cta" disabled>View full case study <ArrowUpRight size={17} aria-hidden="true"/></button><span>Full case study · coming later</span></div></div>
  </div>;
}

function MigratedVisual({kind,children}:{kind:string,children:ReactNode}){
  const wrapper=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    // Play the component's existing hover timeline once on presentation entry.
    // Its own reduced-motion guard and hover/focus handlers remain unchanged.
    const frame=requestAnimationFrame(()=>wrapper.current?.querySelector('.intent-thumbnail')?.dispatchEvent(new Event('pointerenter')));
    return()=>cancelAnimationFrame(frame);
  },[]);
  return <div className="ql-migrated-container"><div ref={wrapper} className={`ql-migrated ql-migrated--${kind}`} tabIndex={kind==='interpretation'?0:undefined} role={kind==='interpretation'?'region':undefined} aria-label={kind==='interpretation'?'Intent relationship map; scroll horizontally on small screens':undefined} data-local-pan={kind==='interpretation'||undefined}>{children}</div>{kind==='interpretation'&&<p className="ql-graph-hint">Swipe to explore the map · arrow keys when focused</p>}</div>;
}

function SlideVisual({index}:{index:number}){
  switch(index){
    case 0:return <HeroVisual/>;
    case 1:return <Comparison/>;
    case 2:return <IntentDecision/>;
    case 3:return <><div className="ql-framework"><MigratedVisual kind="interpretation"><IntentInterpretation/></MigratedVisual><Outcomes/></div><FrameworkDetail/><p className="ql-takeaway">Complexity is not a decision outcome.</p></>;
    case 4:return <><MigratedVisual kind="understanding"><IntentUnderstanding/></MigratedVisual><p className="ql-takeaway">Recognize the actions. Then check whether they can be resolved safely.</p></>;
    case 5:return <><p className="ql-pattern-note">Earlier response exploration · retained design study, not the pending final After UI. Deliverables below describe design aims; hallucination and cognitive-load reductions were not measured.</p><MigratedVisual kind="response"><IntentResponseExperience/></MigratedVisual><details className="ql-detail"><summary><span><MessageCircle size={16} aria-hidden="true"/>Explore the three conversation patterns</span></summary><Conversations/><aside className="ql-clarification-example"><span className="ql-mini">Designed clarification · mobile phone scenario</span><p>“How would you like to configure the approval workflow?”</p><div><span>AI recommendation</span><span>Choose an existing workflow</span></div></aside><p className="ql-pattern-note">Final conversation mockups are pending. These describe intended behavior, not shipped capability.</p></details></>;
    case 6:return <Iteration/>;
    default:return <Results/>;
  }
}

export function IntentQuickLook({onBack}:{onBack:()=>void}) {
  const [active,setActive]=useState(0);
  const viewport=useRef<HTMLElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const slide=slides[active];
  useEffect(()=>{
    const previousTitle=document.title;
    document.title='Intent Identification — Quick Look';
    return()=>{document.title=previousTitle};
  },[]);
  useEffect(()=>{
    viewport.current?.scrollTo({top:0,behavior:'instant' as ScrollBehavior});
    if(document.activeElement===document.body)heading.current?.focus({preventScroll:true});
  },[active]);
  useEffect(()=>{
    const navigate=(event:KeyboardEvent)=>{
      if(document.querySelector('.ql-product-dialog[open]'))return;
      if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
      const target=event.target;
      if(target instanceof Element&&target.closest('a,button,input,textarea,select,summary,[contenteditable="true"],[role="slider"],[role="tablist"],[data-local-pan]'))return;
      if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
        event.preventDefault();setActive(current=>Math.max(0,Math.min(slides.length-1,current+(event.key==='ArrowRight'?1:-1))));
      }
    };
    window.addEventListener('keydown',navigate);
    return()=>window.removeEventListener('keydown',navigate);
  },[]);
  const changeSlide=(index:number)=>{
    setActive(index);
    // A navigation button may become disabled at either end of the deck.
    if(index===0||index===slides.length-1)requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}));
  };
  return <div className="ql-page">
    <header className="ql-header"><a href="/" onClick={event=>{if(event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();onBack()}}}><ArrowLeft size={15} aria-hidden="true"/>Back to portfolio</a><span className="ql-project-label">Catalog Curator <span>/</span> Intent Identification</span><span className="ql-edition">Quick Look</span></header>
    <main ref={viewport} className="ql-viewport" id="quick-look-content">
      <section key={active} className={`ql-slide ql-slide--${active+1}`} aria-roledescription="slide" aria-label={`${active+1} of ${slides.length}: ${slide.name}`}>
        <div className="ql-slide-heading"><p className="ql-eyebrow"><span/>{slide.eyebrow}</p><h1 ref={heading} tabIndex={-1}>{slide.title}</h1><p className="ql-intro">{slide.copy}</p>{active===0&&<dl className="ql-metadata"><div><dt>Role</dt><dd>Product Designer</dd></div><div><dt>Focus</dt><dd>UX research · Intent framework<br/>Conversation design</dd></div><div><dt>Product</dt><dd><ProductOverview/></dd></div></dl>}</div>
        <div className="ql-slide-visual"><SlideVisual index={active}/></div>
        {active===0&&<div className="ql-cover-note"><span>From an AI that always tries to generate</span><ArrowRight size={17} aria-hidden="true"/><strong>To an AI that knows when to clarify.</strong></div>}
      </section>
    </main>
    <div className="ql-navigation"><div className="ql-navigation-inner"><div className="ql-position" role="status" aria-live="polite" aria-atomic="true"><strong>{String(active+1).padStart(2,'0')}</strong><span>/ 08</span><span className="ql-current-name">{slide.name}</span></div><div className="ql-progress" role="group" aria-label="Choose a slide">{slides.map((item,index)=><button key={item.name} aria-label={`Slide ${index+1}: ${item.name}`} aria-current={active===index?'step':undefined} className={index<=active?'is-visited':''} onClick={()=>changeSlide(index)}><span/></button>)}</div><div className="ql-nav-buttons"><button disabled={active===0} onClick={()=>changeSlide(active-1)} aria-controls="quick-look-content"><ArrowLeft size={17} aria-hidden="true"/><span>Previous</span></button><button disabled={active===slides.length-1} onClick={()=>changeSlide(active+1)} aria-controls="quick-look-content"><span>Next</span><ArrowRight size={17} aria-hidden="true"/></button></div></div></div>
  </div>;
}
