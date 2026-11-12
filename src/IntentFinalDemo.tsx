import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {AudioLines,CheckSquare2,Maximize2,Mic,MousePointer2,Pause,Play,Plus,RotateCcw,Send,Sparkles,ThumbsUp,X} from 'lucide-react';
import './IntentFinalDemo.css';

const prompt='Create a mobile phone service and add an approval step.';
const approvals=['Manager approval (AI recommendation)','HR approval','Facilities team approval','Other (Choose from the list)'];
const sections=['Service','Service parameters','Service details','Workflow','Questionnaire','Service Cost & Quantity'];

export function IntentFinalDemo(){
  const root=useRef<HTMLElement>(null);
  const timeline=useRef<gsap.core.Timeline|null>(null);
  const inputText=useRef<HTMLDivElement>(null);
  const countText=useRef<HTMLSpanElement>(null);
  const observer=useRef<IntersectionObserver|null>(null);
  const inView=useRef(false);
  const reduced=useRef(false);
  const manuallyPaused=useRef(false);
  const [isPaused,setIsPaused]=useState(false);
  const [isReduced,setIsReduced]=useState(false);

  useEffect(()=>{
    const node=root.current;if(!node)return;
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const q=(selector:string)=>node.querySelector<HTMLElement>(selector);
    const start=q('.ifd-view-start'),question=q('.ifd-view-question'),final=q('.ifd-view-final');
    const option=q('.ifd-radio-option:first-child'),radio=q('.ifd-radio-option:first-child .ifd-radio');
    const submit=q('.ifd-submit'),cursor=q('.ifd-cursor'),composer=q('.ifd-input-box');
    const area=q('.ifd-chat-area');
    const target=(element:HTMLElement|null)=>({
      x:()=>element&&area?element.getBoundingClientRect().left-area.getBoundingClientRect().left-area.clientWidth*.76+element.clientWidth*.2:0,
      y:()=>element&&area?element.getBoundingClientRect().top-area.getBoundingClientRect().top-area.clientHeight*.78+element.clientHeight*.5:0,
    });
    const typed={length:0};
    const write=()=>{const length=Math.round(typed.length);if(inputText.current)inputText.current.textContent=length?prompt.slice(0,length):'Ask a question';if(countText.current)countText.current.textContent=String(length)};
    const build=()=>{
      timeline.current?.kill();
      reduced.current=media.matches;
      setIsReduced(media.matches);
      if(media.matches){
        manuallyPaused.current=false;setIsPaused(false);
        gsap.set([start,question],{autoAlpha:0});gsap.set(final,{autoAlpha:1,y:0});
        gsap.set(cursor,{autoAlpha:0});gsap.set(composer,{boxShadow:'0 4px 16px #0007'});
        typed.length=0;write();return;
      }
      const tl=gsap.timeline({paused:true,repeat:-1,repeatDelay:.5,defaults:{ease:'power2.out'}});
      tl.set(start,{autoAlpha:1,y:0},0).set([question,final],{autoAlpha:0,y:12},0)
        .set(cursor,{autoAlpha:0,x:0,y:0,scale:1},0)
        .set(option,{backgroundColor:'transparent'},0)
        .set(radio,{borderColor:'#91849a',backgroundColor:'#151318',boxShadow:'none'},0)
        .set(submit,{backgroundColor:'#201b26',color:'#cf9aef'},0)
        .set(composer,{borderColor:'#795987'},0)
        .to(typed,{length:prompt.length,duration:3,ease:'none',onUpdate:write},1)
        .to(composer,{borderColor:'#cf9aef',boxShadow:'0 0 0 3px #cf9aef33,0 4px 16px #0007',duration:.25},4.1)
        .to(start,{autoAlpha:0,y:-12,duration:.55},5)
        .call(()=>{typed.length=0;write()},[],5.25)
        .to(question,{autoAlpha:1,y:0,duration:.65},5.25)
        .fromTo('.ifd-view-question .ifd-message-user',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.5},5.35)
        .fromTo('.ifd-view-question .ifd-message-assistant',{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.7},6.5)
        .fromTo('.ifd-view-question .ifd-form',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.65},8)
        .to(cursor,{autoAlpha:1,duration:.2},13.5)
        .to(cursor,{...target(option),duration:1.7,ease:'power1.inOut'},13.7)
        .to(option,{backgroundColor:'#30203c',duration:.25},15.7)
        .to(cursor,{scale:.84,duration:.12},16.6)
        .to(radio,{borderColor:'#cf9aef',backgroundColor:'#cf9aef',boxShadow:'inset 0 0 0 3px #151318',duration:.25},16.7)
        .to(cursor,{scale:1,duration:.16},16.85)
        .to(option,{backgroundColor:'transparent',duration:.35},17.2)
        .to(cursor,{...target(submit),duration:1.7,ease:'power1.inOut'},21.5)
        .to(submit,{backgroundColor:'#cf9aef',color:'#1b1221',duration:.2},23.1)
        .to(cursor,{scale:.84,duration:.12},23.3)
        .to(cursor,{scale:1,autoAlpha:0,duration:.3},23.55)
        .to(question,{autoAlpha:0,y:-12,duration:.7},25)
        .to(final,{autoAlpha:1,y:0,duration:.8},25.25)
        .fromTo('.ifd-view-final .ifd-message-assistant',{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.75},26.1)
        .fromTo('.ifd-accordion-row',{autoAlpha:0,y:7},{autoAlpha:1,y:0,duration:.35,stagger:.2},27.1)
        .to(final,{autoAlpha:0,y:-8,duration:.6},36.6)
        .to(start,{autoAlpha:1,y:0,duration:.65},37)
        .to(typed,{length:0,duration:.1,ease:'none',onUpdate:write},37.4)
        .to(composer,{borderColor:'#795987',boxShadow:'0 4px 16px #0007',duration:.3},37.4)
        .to({}, {duration:1.2});
      timeline.current=tl;
      if(inView.current&&!manuallyPaused.current)tl.play();
    };
    build();
    const onMotion=()=>build();media.addEventListener('change',onMotion);
    observer.current=new IntersectionObserver(([entry])=>{inView.current=entry.isIntersecting;if(!reduced.current){if(inView.current&&!manuallyPaused.current)timeline.current?.play();else timeline.current?.pause()}},{threshold:.25});
    observer.current.observe(node);
    return()=>{observer.current?.disconnect();observer.current=null;media.removeEventListener('change',onMotion);timeline.current?.kill();timeline.current=null;gsap.killTweensOf(typed)};
  },[]);
  const togglePause=()=>{if(reduced.current)return;manuallyPaused.current=!manuallyPaused.current;setIsPaused(manuallyPaused.current);if(manuallyPaused.current)timeline.current?.pause();else if(inView.current)timeline.current?.play()};
  const replay=()=>{if(reduced.current)return;manuallyPaused.current=false;setIsPaused(false);timeline.current?.restart();if(!inView.current)timeline.current?.pause()};

  return <section className="ifd-section" ref={root} id="ic-final-demo" aria-label="Intent Identification final UI demonstration">
    <div className="ifd-intro"><span className="ic-label">Final UI demonstration</span><h2>From a request to a service draft.</h2><p>Illustrative Catalog Curator interaction. The assistant asks for a consequential approval choice before preparing a draft.</p></div>
    <div className="ifd-stage"><div className="ifd-figma-app">
      <header className="ifd-header"><span>Catalog Assistant</span><div><Maximize2 size={17} aria-hidden="true"/><X size={19} aria-hidden="true"/></div></header>
      <main className="ifd-chat-area">
        <div className="ifd-view ifd-view-start"><div className="ifd-welcome"><h3>Service creation powered by AI</h3><p>Write a description of your service, and I'll draft an outline for you to review and adjust. You can specify details such as lines of business, languages, and approval or fulfillment request. If you need help, click "Guide me" prompt suggestion, and I'll walk you through the steps.</p><button type="button">Guide Me</button></div></div>
        <div className="ifd-view ifd-view-question"><div className="ifd-conversation"><div className="ifd-message-user"><time>11:08 AM</time><div className="ifd-user-row"><div className="ifd-user-bubble">{prompt}</div><span className="ifd-avatar" aria-label="User profile image unavailable"/></div></div><div className="ifd-message-assistant"><div className="ifd-sparkle"><Sparkles size={20} strokeWidth={1.7} aria-hidden="true"/></div><div className="ifd-assistant-content"><div className="ifd-sender">Catalog Curator <time>11:08 AM</time></div><div className="ifd-question-card"><p className="ifd-question-lead"><CheckSquare2 size={14} aria-hidden="true"/> I've prepared your mobile phone service draft.</p><div className="ifd-form"><p>Could you please tell me which approval you'd like to link before we move forward?</p><div className="ifd-radio-options" role="group" aria-label="Approval choices">{approvals.map(item=><div className="ifd-radio-option" key={item}><span className="ifd-radio"/>{item}</div>)}</div><button type="button" className="ifd-submit">Submit</button></div><small className="ifd-count">1 of 10 <span/></small></div><div className="ifd-feedback"><ThumbsUp size={14} aria-hidden="true"/></div></div></div></div></div>
        <div className="ifd-view ifd-view-final"><div className="ifd-conversation is-final"><div className="ifd-message-user"><time>13:01</time><div className="ifd-user-row"><div className="ifd-user-bubble">{prompt}</div><span className="ifd-avatar" aria-label="User profile image unavailable"/></div></div><div className="ifd-message-assistant"><div className="ifd-sparkle"><Sparkles size={20} strokeWidth={1.7} aria-hidden="true"/></div><div className="ifd-assistant-content"><div className="ifd-sender">Catalog Curator <time>13:02</time></div><div className="ifd-response"><p className="ifd-response-lead"><CheckSquare2 size={14} aria-hidden="true"/> I allocated <strong>Manager Approval</strong> to your mobile phone service and here's your full service draft</p><div className="ifd-accordion">{sections.map((title,i)=><div key={title} className="ifd-accordion-row"><div><strong>{title}</strong>{i===0&&<small>Mobile Phone request | English (en-us)</small>}</div><span aria-hidden="true">⌄</span></div>)}</div><p className="ifd-response-foot">Review the details above. When you're ready, select Create service or type 'create service' to confirm, or simply continue editing the service.</p></div><div className="ifd-feedback"><ThumbsUp size={14} aria-hidden="true"/></div></div></div></div></div>
        <MousePointer2 className="ifd-cursor" size={23} fill="white" strokeWidth={1.5} aria-hidden="true"/>
      </main>
      <footer className="ifd-input-area"><div className="ifd-input-box"><div className="ifd-input-text" ref={inputText}>Ask a question</div><div className="ifd-input-actions"><Plus size={17} aria-hidden="true"/><div><AudioLines size={15} aria-hidden="true"/><Mic size={15} aria-hidden="true"/><Send className="ifd-send-icon" size={15} aria-hidden="true"/></div></div></div><div className="ifd-input-foot"><span><span ref={countText}>0</span> / 2000</span><span><Sparkles size={10} aria-hidden="true"/> Results do not reflect BMC Helix, Inc.’s views. <u>Privacy notice</u></span></div></footer>
    </div></div>
    <div className="ifd-controls"><span>Start <span aria-hidden="true">→</span> Clarify <span aria-hidden="true">→</span> Response</span><div className="ifd-control-buttons"><button type="button" onClick={togglePause} aria-label={isPaused?'Resume final UI demonstration':'Pause final UI demonstration'} aria-pressed={isPaused} disabled={isReduced}>{isPaused?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>} {isPaused?'Resume':'Pause'}</button><button type="button" onClick={replay} aria-label="Replay final UI demonstration"><RotateCcw size={15} aria-hidden="true"/> Replay</button></div></div>
  </section>;
}
