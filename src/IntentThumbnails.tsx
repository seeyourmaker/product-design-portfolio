import {useEffect,useRef} from 'react';
import {gsap} from 'gsap';

export function IntentThumbnail({step}:{step:1|2|3}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const tile=ref.current;
    if(!tile||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const animated=tile.querySelectorAll('.intent-animated');
    const timeline=gsap.timeline({paused:true});
    timeline.fromTo(animated,{opacity:.55,y:8},{opacity:1,y:0,duration:.5,stagger:.1,ease:'power2.out'});
    timeline.fromTo(tile.querySelectorAll('.intent-connector'),{scaleX:0,transformOrigin:'left center'},{scaleX:1,duration:.35,stagger:.12,ease:'power1.out'},0);
    const activate=()=>timeline.restart();
    const mobile=window.matchMedia('(hover: none), (pointer: coarse)').matches;
    let observer:IntersectionObserver|undefined;
    if(mobile){observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){activate();observer?.disconnect()}},{threshold:.35});observer.observe(tile)}
    else{tile.addEventListener('pointerenter',activate);tile.addEventListener('focusin',activate)}
    return()=>{observer?.disconnect();tile.removeEventListener('pointerenter',activate);tile.removeEventListener('focusin',activate);timeline.kill()};
  },[]);
  const labels=['01 / Understanding','02 / Interpreting','03 / Responding'];
  const headlines=['One prompt. Multiple intents.','Making AI decisions visible.','From understanding to action.'];
  const descriptions=[
    'A prompt asks for a laptop request service with manager approval, a questionnaire, and IT fulfillment. The identified intents are create service, configure approval, add questionnaire, and set fulfillment.',
    'A visual intent map interprets a laptop request service prompt. It resolves service creation, questionnaire, and fulfillment, and flags approval for clarification.',
    'The assistant prepares a laptop request service, questionnaire, and fulfillment, then asks which approval workflow to use. Example choices are Default approval and Choose workflow. Deliverables include Token Efficiency, Decision Model, and Better Design.',
  ];
  return <div ref={ref} className={`project-thumbnail project-thumbnail--intent intent-thumbnail intent-thumbnail--${step}`} role="img" aria-label={`${labels[step-1]}. ${headlines[step-1]} ${descriptions[step-1]}`} tabIndex={0}>
    <div className="intent-topline"><span>{labels[step-1]}</span><h4>{headlines[step-1]}</h4></div>
    {step===1&&<><p className="intent-prompt intent-animated">Create a laptop request service with <mark>manager approval</mark>, <mark>a questionnaire</mark>, and <mark>IT fulfillment</mark>.</p><div className="intent-chips">{['Create service','Configure approval','Add questionnaire','Set fulfillment'].map((label,i)=><span key={label} className="intent-chip intent-animated"><b>0{i+1}</b>{label}</span>)}</div></>}
    {step===2&&<div className="intent-graph"><svg className="intent-lines" viewBox="0 0 400 130" preserveAspectRatio="none" aria-hidden="true"><path className="intent-connector" d="M200 18 C200 55 44 45 44 104"/><path className="intent-connector" d="M200 18 C200 55 148 45 148 104"/><path className="intent-connector" d="M200 18 C200 55 252 45 252 104"/><path className="intent-connector" d="M200 18 C200 55 356 45 356 104"/></svg><div className="intent-request-group"><p>Create a laptop request service with manager approval, a questionnaire, and IT fulfillment.</p><span className="intent-node intent-node--request intent-animated">User request</span></div><div className="intent-node-row">{['Create service','Approval','Questionnaire','Fulfillment'].map((label,i)=><div className="intent-node-group" key={label}><span className="intent-node intent-animated">{label}</span><small className="intent-status">{i===1?'Clarification':i===3?'Lookup':'Resolved'}</small></div>)}</div></div>}
    {step===3&&<section className="intent-stage intent-stage--response"><span className="intent-stage-label">Assistant response</span><p className="intent-animated">I've prepared your laptop request service. Which approval workflow would you like to use?</p><div className="intent-choices"><span>Default approval</span><span>Choose workflow</span></div></section>}
    {step===3&&<div className="intent-experience">
      <section className="intent-stage intent-stage--request"><span className="intent-stage-label">User request</span><p className="intent-animated">Create a laptop request service with manager approval, a questionnaire, and IT fulfillment.</p></section>
      <section className="intent-stage intent-stage--actions"><span className="intent-stage-label">Detected actions</span><ul>{['Create service','Add questionnaire','Configure approval','Set fulfillment'].map((label,i)=><li className="intent-animated" key={label}><b>{i===2?'?':'✓'}</b>{label}<small>{i===2?'Needs your choice':'Ready'}</small></li>)}</ul></section>
    </div>}
    {step===3&&<section className="intent-deliverables"><h5>Deliverables</h5><div>{[['Token Efficiency','Reduced token usage to improve communication between the agent and user.','/intent/token-efficiency.svg'],['Decision Model','An improved decision model to reduce hallucinations and strengthen intent identification.','/intent/decision-model.svg'],['Better Design','Reduced cognitive load through a hybrid interface that combines chat with point and click interactions.','/intent/better-design.svg']].map(([title,description,icon])=><article key={title}><span><img src={icon} alt="" width={40} height={40}/>{title}</span><p>{description}</p></article>)}</div></section>}
  </div>
}
export function IntentUnderstanding(){return <IntentThumbnail step={1}/>;}
export function IntentInterpretation(){return <IntentThumbnail step={2}/>;}
export function IntentResponseExperience(){return <IntentThumbnail step={3}/>;}

export function IntentResponseAnimation(){
  const video=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback=()=>{if(preference.matches)video.current?.pause();else video.current?.play().catch(()=>{});};
    syncPlayback();
    preference.addEventListener('change',syncPlayback);
    return()=>preference.removeEventListener('change',syncPlayback);
  },[]);
  return <div className="project-thumbnail intent-thumbnail intent-response-animation">
    <div className="intent-topline"><span>03 / Responding</span><h4>From understanding to action.</h4></div>
    <div className="intent-response-layout">
      <div className="intent-response-caption"><span>Request</span><h5>One prompt.<br/>Multiple needs.</h5><p>A laptop service, a questionnaire, and IT fulfillment.</p></div>
      <div className="intent-response-video"><video ref={video} src="/intent/chatbot-interface.webm" autoPlay loop muted playsInline aria-label="Chatbot interface animation"/></div>
      <div className="intent-response-caption"><span>Choice</span><h5>Clarify.<br/>Then continue.</h5><p>Select the approval workflow to complete the request.</p></div>
    </div>
  </div>;
}

export function IntentPortfolioColumn({firstOnly=false}:{firstOnly?:boolean}){
  const points=['One prompt','Multiple intents','Too much back and forth','Causing token waste and inconsistent results'];
  return <div className="intent-portfolio-column">
    <div className="intent-portfolio-tile intent-portfolio-tile--understanding" role="img" aria-label="01 / Understanding. One prompt. Multiple intents. Too much back and forth, causing token waste and inconsistent results.">
      <span className="intent-portfolio-label">01 / Understanding</span>
      <div className="intent-portfolio-points">{points.map(point=><div key={point}><img src="/intent/figma-arrow.svg" alt=""/><h4>{point}</h4></div>)}</div>
    </div>
    {!firstOnly&&<div className="intent-portfolio-tile intent-portfolio-tile--interpreting" role="img" aria-label="02 / Interpreting. Structuring AI decisions. Before: prompt, AI instructions and skills, respond. After: prompt, decompile, JEV, UX design, respond.">
      <span className="intent-portfolio-label">02 / Interpreting</span>
      <h4>Structuring AI decisions</h4>
      <div className="intent-portfolio-comparison">
        <div className="intent-portfolio-phase"><span>Before</span><div className="intent-portfolio-diagram intent-portfolio-diagram--before"><div className="intent-portfolio-box intent-portfolio-box--prompt">Prompt</div><div className="intent-portfolio-box intent-portfolio-box--center">AI<br/>instructions<br/>&amp; skills</div><div className="intent-portfolio-box intent-portfolio-box--respond">Respond</div></div></div>
        <div className="intent-portfolio-phase"><span>After</span><div className="intent-portfolio-diagram intent-portfolio-diagram--after"><div className="intent-portfolio-box intent-portfolio-box--prompt">Prompt</div><div className="intent-portfolio-box intent-portfolio-box--center">Decompile<br/><br/>JEV<br/><br/>UX design</div><div className="intent-portfolio-box intent-portfolio-box--respond">Respond</div></div></div>
      </div>
    </div>}
  </div>;
}
