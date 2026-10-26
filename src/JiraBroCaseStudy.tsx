import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ArrowLeft, ArrowUpRight} from 'lucide-react';
import {ModelRoutingDiagram,SafeActionDiagram} from './JiraBroAiDiagrams';
import './JiraBroCaseStudy.css';

export const jiraBroCaseStudyPath='/projects/jira-worklog-assistant';
export const isJiraBroPath=(path:string)=>[jiraBroCaseStudyPath,`${jiraBroCaseStudyPath}/full`].includes(path.replace(/\/$/,''));

const milestones=[
  ['Teams idea','Meet people where they work.'],
  ['Permissions blocker','Find a way to test independently.'],
  ['Local proof of concept','Prove the core worklog flow.'],
  ['Polished web app','Design through working iterations.'],
  ['Innovation forum','Share the product; gain permission.'],
  ['Back to Teams','Implemented · publication in progress.'],
];
function Diagram(){
  const items=milestones;
  const slug='jirabro-timeline';
  return <figure className="jb-diagram jb-diagram--timeline" aria-labelledby={`${slug}-caption`}>
    <div className="jb-figure-label"><span>THE PRODUCT EVOLUTION</span><span>Sequence only · no time scale</span></div>
    <svg className="jb-diagram-canvas" viewBox="0 0 960 280" role="img" aria-labelledby={`${slug}-title ${slug}-desc`}>
      <title id={`${slug}-title`}>The path back to Teams</title>
      <desc id={`${slug}-desc`}>Teams idea, permissions blocker, local proof of concept, polished web app, innovation forum, then Teams integration with publication in progress. Events are an undated sequence, not elapsed time.</desc>
        <line x1="36" y1="132" x2="796" y2="132" stroke="#aab8bf"/>
        {items.map(([name,sub],i)=>{const x=36+i*152,top=i%2===0;return <g key={name}>
          <line x1={x} y1={top?76:132} x2={x} y2={top?132:188} stroke="#aab8bf"/>
          <circle cx={x} cy="132" r={i===2||i===5?6:4} fill={i===2||i===5?'#83e0cf':'#d7e2ea'}/>
          <text x={x} y={top?40:220} fill={i===2||i===5?'#83e0cf':'#d7e2ea'} fontSize="16" fontWeight="500">{String(i+1).padStart(2,'0')}</text>
          <text x={x} y={top?64:244} fill="#d7e2ea" fontSize="16" fontWeight="500">{name==='Local proof of concept'?'Local POC':name}</text>
          <text x={x} y={top?88:268} fill="#aab8bf" fontSize="12">{['Original ambition','Access constrained','Test the core job','Iterate in code','Permission granted','Publication in progress'][i]}</text>
        </g>})}

    </svg>
    <ol className="jb-diagram-mobile">{items.map(([name,sub],i)=><li key={name}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{name}</strong><p>{sub}</p></div></li>)}</ol>
    <figcaption id={`${slug}-caption`}>A constraint changed the route, while the original ambition stayed intact.</figcaption>
  </figure>;
}
function ProductImage({legacy=false,compact=false}:{legacy?:boolean,compact?:boolean}){return <figure className={`jb-product-image${compact?' jb-product-image--compact':''}`}><a href={`/jirabro/${legacy?'legacy':'web-v2'}.png`} data-image-viewer aria-label={`Open full-size ${legacy?'legacy':'V2'} interface screenshot`}><img src={`/jirabro/${legacy?'legacy':'web-v2'}.png`} width={legacy?'640':'1440'} height={legacy?'440':'900'} alt={legacy?'Actual legacy JiraBro interface: a command input and plain response area.':'Actual JiraBro V2 interface with Quick Log, suggestions, session context, quick actions, and a natural-language composer.'} loading={compact?'lazy':'eager'}/></a><figcaption>{legacy?'BEFORE · Legacy web assistant. Remember the command.':'AFTER · V2 web assistant. Describe the work, discover the next action.'}</figcaption></figure>}
export function JiraBroCaseStudy(){
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const previousTitle=document.title;
    document.title='JiraBro — Building a useful AI assistant | Saurabh';
    window.scrollTo({top:0,behavior:'instant'});
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const elements=root.current?.querySelectorAll('.jb-reveal');
      if(!elements)return;
      // IntersectionObserver avoids adding a second scroll controller.
      const tweens:gsap.core.Tween[]=[];
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){tweens.push(gsap.fromTo(entry.target,{y:20,opacity:0},{y:0,opacity:1,duration:.6,clearProps:'all'}));observer.unobserve(entry.target);}}),{threshold:.08});
      elements.forEach(el=>observer.observe(el));
      return()=>{observer.disconnect();tweens.forEach(tween=>tween.kill());gsap.set(elements,{clearProps:'opacity,transform'});};
    },root);
    return()=>{media.revert();document.title=previousTitle;};
  },[]);
  return <main className="jb-case" ref={root} id="jb-top">
    <a className="jb-skip" href="#jb-story">Skip to the story</a>
    <nav className="jb-nav" aria-label="Case study"><a href="/#projects"><ArrowLeft size={16}/> All projects</a><a href="#jb-return">The return to Teams <span aria-hidden="true">↗</span></a></nav>
    <header className="jb-hero">
      <div className="jb-eyebrow">JIRABRO <span>INDEPENDENT PRODUCT EXPERIMENT</span></div>
      <h1>I wanted a Jira chatbot.<br/><em>So I built one.</em></h1>
      <div className="jb-hero-bottom"><p>What began as a Microsoft Teams idea became a working Jira productivity tool—through rapid prototyping, hands-on development, and a few unexpected constraints.</p><div className="jb-meta"><span>AI × PRODUCT DESIGN × ENGINEERING</span><span>Full case study · 2–3 min read</span></div></div>
      <div className="jb-role"><span>MY ROLE</span><p>Product concept · UX & interaction design · AI-assisted development · Prototyping & validation</p></div>
      <div className="jb-hero-visual"><div className="jb-visual-top"><span><i/> WORKING WEB ASSISTANT</span><span>Actual product UI · illustrative input</span></div><ProductImage/><div className="jb-prompt"><span>THE IDEA, IN ONE SENTENCE</span><p>“Log two hours on DEMO-123 for testing.”</p></div></div>
    </header>
    <article id="jb-story" className="jb-story" tabIndex={-1}>
      <section className="jb-section jb-split jb-reveal"><div className="jb-section-heading"><span className="jb-index">01 / THE FRICTION</span><h2>A small task.<br/>Too many steps.</h2></div><div className="jb-prose"><p>Logging time meant finding the right Jira issue, entering a duration, writing a comment, then repeating it across tasks. I wondered: could I just tell an assistant what I worked on?</p><p>My first idea was a chatbot inside Microsoft Teams, where work conversations already happened. The opportunity was to reduce the effort around logging work, while keeping the person responsible for what reached Jira.</p></div></section>
      <section className="jb-section jb-reveal"><div className="jb-split"><div className="jb-section-heading"><span className="jb-index">02 / THE DETOUR</span><h2>The blocker became<br/>the starting point.</h2></div><div className="jb-prose"><p>Teams required organizational permissions I didn’t yet have. I stripped the idea down: could a local assistant understand a worklog request and safely submit it to Jira?</p><p>A browser and terminal proof of concept let me test the interaction without waiting for Teams infrastructure. That smaller surface gave me something tangible to refine: the request, the response, and the moment a user commits a change.</p></div></div><Diagram/></section>
      <section className="jb-section jb-reveal"><div className="jb-split"><div className="jb-section-heading"><span className="jb-index">03 / DESIGNING BY BUILDING</span><h2>From a command<br/>to a conversation.</h2></div><div className="jb-prose"><p>The earliest version was functional but command-driven. Through direct coding and repeated testing, I shaped a clearer web experience: structured responses, quick actions, and explicit confirmation before conversational writes.</p><p>Timers, bulk logging, and supporting productivity views followed. The design evolved alongside the code. I could try an interaction, inspect its behavior, and adjust both the interface and the logic in the same iteration.</p></div></div><div className="jb-evolution"><ProductImage legacy compact/><ProductImage compact/></div><p className="jb-note">Actual interfaces captured locally with illustrative input; no live Jira session. Calendar uses fixtures by default; bulk submission requires working Jira connectivity.</p></section>
      <section className="jb-section jb-reveal"><div className="jb-split"><div className="jb-section-heading"><span className="jb-index">04 / AI WITH ACCOUNTABILITY</span><h2>Teaching JiraBro to<br/>understand the request.</h2></div><div className="jb-prose"><p>Understanding a sentence isn’t enough when an assistant can change real work records. I designed the instructions that tell the model what JiraBro can understand in each conversation phase, which details to extract, and when to ask for clarification.</p><p>JiraBro separates interpretation from deterministic validation and execution. A conversational worklog becomes a draft to review; the person authorizes the write. Read-only requests can return directly, and an API failure is reported as an error rather than invented success.</p></div></div><div className="jb-ai-instructions"><span className="jb-small-label">PROMPT DESIGN AS PRODUCT DESIGN</span><h3>Designing the AI’s Instructions</h3><div><p>The shared semantic contract defines phase-aware intents, required slots, and boundaries such as never inventing an issue key. A compact user prompt adds the current phase, active issue, and a short prior user message. These rules shape the experience before any interface component appears.</p><p>Provider selection is conditional: strict commands bypass the model; auto mode can try available local Ollama models, then configured cloud providers when extraction quality calls for it. Gemini is one supported provider, not a universal step. The parsed intent still has to pass schema checks, normalization, issue resolution, and validation before JiraBro proposes a write.</p></div></div><ModelRoutingDiagram/><SafeActionDiagram/></section>
      <section className="jb-section jb-reveal" id="jb-return"><div className="jb-split"><div className="jb-section-heading"><span className="jb-index">05 / FULL CIRCLE</span><h2>Back to the<br/>original ambition.</h2></div><div className="jb-prose"><p>Demonstrating JiraBro at my company’s innovation forum opened the path toward Teams publication. Using an REA-assisted workflow, I adapted the web assistant’s existing processing logic into a Teams bot.</p><p>The integration is implemented and locally tested. Organizational publication is still in progress. Reusing the processing logic preserves the interaction model across surfaces, while chat replies and Adaptive Card actions give it a Teams-specific presentation.</p></div></div><div className="jb-teams-comparison"><div><span className="jb-small-label">WEB / EXISTING PRODUCT</span><ProductImage compact/></div><figure className="jb-teams"><div className="jb-small-label">TEAMS / INTEGRATION PREVIEW · MOCKUP</div><div className="jb-teams-window"><div className="jb-teams-header"><span className="jb-bot-avatar">JB</span><strong>JiraBro</strong><span>Personal chat</span></div><p className="jb-teams-user">Log two hours on UX-1213 for testing</p><div className="jb-teams-reply"><span>JIRABRO</span><p>Review worklog<br/><strong>UX-1213 · 2h</strong><br/>testing</p><div className="jb-adaptive"><small>Choose an action</small><div><span>Confirm</span><span>Cancel</span></div></div></div></div><figcaption>Source-based preview: chat replies and Adaptive Card actions. Implemented, locally tested; publication in progress.</figcaption></figure></div></section>
      <section className="jb-reflection jb-reveal"><span className="jb-index">06 / WHAT I TOOK WITH ME</span><h2>Building can be<br/>a design method.</h2><p>A permission constraint pushed me toward a smaller, testable product. Each working iteration exposed the next interaction problem worth solving—and made conversational AI more useful, predictable, and accountable.</p><blockquote>Start with the job to be done. Build the smallest useful version. Let the constraints sharpen the design.</blockquote><ul><li>Build to learn</li><li>Validate before acting</li><li>Reuse what works</li></ul></section>
    </article>
    <aside className="jb-future"><span className="jb-small-label">UP NEXT</span><p>Interactive sandbox <span>— coming next.</span></p></aside>
    <footer className="jb-footer"><a href="/#projects"><ArrowLeft size={16}/> Back to projects</a><a href="#jb-top">Back to top <ArrowUpRight size={16}/></a></footer>
  </main>;
}
