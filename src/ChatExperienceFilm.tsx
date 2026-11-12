import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import './ChatExperienceFilm.css';

const media='/redesign-chat';

export function ChatExperienceFilm(){
  const root=useRef<HTMLDivElement>(null);
  const timeline=useRef<gsap.core.Timeline|null>(null);
  const [paused,setPaused]=useState(false);
  const [debugTime,setDebugTime]=useState(0);
  const debug=typeof window!=='undefined'&&new URLSearchParams(window.location.search).has('debug');

  useEffect(()=>{
    const element=root.current;
    if(!element)return;
    const mediaQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mediaQuery.matches)return;
    const context=gsap.context(()=>{
      const tl=gsap.timeline({repeat:-1,paused:true,defaults:{ease:'power3.inOut'}});
      timeline.current=tl;
      tl.set('.chat-film-shot',{autoAlpha:0})
        .set('.chat-film-caption',{autoAlpha:0,y:22,filter:'blur(10px)'})
        .set('.chat-film-focus',{autoAlpha:0,scale:.7})
        .set('.chat-film-end',{autoAlpha:0,y:28,filter:'blur(12px)'})
        .set('.chat-film-shot--old',{autoAlpha:1})
        .set('.chat-film-window',{xPercent:-5,scale:1.08,rotation:-1.4})
        .set('.chat-film-shot--detail',{yPercent:105})
        .set('.chat-film-shot--prompt',{clipPath:'inset(0 100% 0 0)'})
        .set('.chat-film-shot--review',{xPercent:110})
        .set('.chat-film-shot--published',{clipPath:'inset(0 0 100% 0)'})
        .set('.chat-film-shot--preview',{xPercent:110});

      // A single screen stays in the frame while the viewer follows the request.
      tl.to('.chat-film-window',{xPercent:0,scale:1,rotation:0,duration:4.6,ease:'power2.inOut'},0)
        .to('.chat-film-shot--old img',{yPercent:-14,duration:4.6,ease:'none'},0)
        .to('.chat-film-trace',{scaleX:.22,duration:4.5,ease:'none'},0)
        .to('.chat-film-caption--old',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.65},.65)
        .to('.chat-film-caption--old',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.45},4.4)
        .set('.chat-film-shot--detail',{autoAlpha:1},4.8)
        .to('.chat-film-shot--old',{yPercent:-104,duration:1.1,ease:'power3.inOut'},4.8)
        .to('.chat-film-shot--detail',{yPercent:0,duration:1.1,ease:'power3.inOut'},4.8)
        .to('.chat-film-shot--detail img',{yPercent:-8,duration:2.6,ease:'power1.inOut'},5.2)
        .to('.chat-film-trace',{scaleX:.32,duration:3.2,ease:'none'},4.8)
        .to('.chat-film-caption--problem',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.65},5.1)
        .to('.chat-film-caption--problem',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.4},7.65)
        .set('.chat-film-shot--prompt',{autoAlpha:1},8)
        .to('.chat-film-shot--prompt',{clipPath:'inset(0 0% 0 0)',duration:1.25,ease:'power4.inOut'},8)
        .to('.chat-film-window',{scale:1.055,xPercent:2,duration:4.2,ease:'power1.inOut'},8.5)
        .to('.chat-film-trace',{scaleX:.48,duration:5.2,ease:'none'},8)
        .to('.chat-film-caption--choice',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.55},8.85)
        .to('.chat-film-focus',{autoAlpha:1,scale:1,duration:.65,ease:'back.out(1.7)'},10.2)
        .to('.chat-film-focus',{autoAlpha:0,scale:1.4,duration:.7},12.25)
        .to('.chat-film-caption--choice',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.4},13.2)
        .set('.chat-film-shot--review',{autoAlpha:1},14)
        .to('.chat-film-shot--prompt',{xPercent:-110,duration:1.15,ease:'power4.inOut'},14)
        .to('.chat-film-shot--review',{xPercent:0,duration:1.15,ease:'power4.inOut'},14)
        .to('.chat-film-window',{scale:1,xPercent:0,duration:1.15},14)
        .to('.chat-film-shot--review img',{scale:1.12,transformOrigin:'53% 48%',duration:5.5,ease:'power1.inOut'},14.5)
        .to('.chat-film-trace',{scaleX:.68,duration:6,ease:'none'},14)
        .to('.chat-film-caption--review',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.6},15.1)
        .to('.chat-film-caption--review',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.4},20.5)
        .set('.chat-film-shot--published',{autoAlpha:1},21)
        .to('.chat-film-shot--published',{clipPath:'inset(0 0 0% 0)',duration:.9,ease:'power4.inOut'},21)
        .to('.chat-film-window',{scale:1.055,duration:3.2,ease:'power1.inOut'},21.5)
        .to('.chat-film-trace',{scaleX:.82,duration:3.7,ease:'none'},21)
        .to('.chat-film-caption--published',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.5},21.55)
        .to('.chat-film-caption--published',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.35},24.5)
        .set('.chat-film-shot--preview',{autoAlpha:1},25)
        .to('.chat-film-shot--published',{xPercent:-110,duration:.95,ease:'power4.inOut'},25)
        .to('.chat-film-shot--preview',{xPercent:0,duration:.95,ease:'power4.inOut'},25)
        .to('.chat-film-window',{scale:.92,xPercent:0,duration:3.3,ease:'power2.inOut'},25)
        .to('.chat-film-trace',{scaleX:1,duration:4.5,ease:'none'},25)
        .to('.chat-film-caption--preview',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.5},25.6)
        .to('.chat-film-caption--preview',{autoAlpha:0,y:-16,filter:'blur(8px)',duration:.4},27.05)
        .to('.chat-film-end',{autoAlpha:1,y:0,filter:'blur(0px)',duration:.75},27.3)
        .to('.chat-film-end',{autoAlpha:0,y:-14,filter:'blur(8px)',duration:.4},29.35)
        .to({}, {duration:.3});
      if(debug)tl.eventCallback('onUpdate',()=>setDebugTime(tl.time()));
      tl.play();
    },element);
    let wasPlaying=true;
    const onVisibility=()=>{const tl=timeline.current;if(!tl)return;if(document.hidden){wasPlaying=!tl.paused();tl.pause();}else if(wasPlaying)tl.play();};
    document.addEventListener('visibilitychange',onVisibility);
    return()=>{document.removeEventListener('visibilitychange',onVisibility);timeline.current=null;context.revert();};
  },[debug]);

  const togglePause=()=>{const tl=timeline.current;if(!tl)return;if(tl.paused()){tl.play();setPaused(false);}else{tl.pause();setPaused(true);}};
  const replay=()=>{timeline.current?.restart();setPaused(false);};

  return <div className="chat-film-wrap">
    <div className="chat-film" ref={root} tabIndex={0} role="img" aria-label="Animated editorial walkthrough: the old guest parking service response gives way to inline approval choices, a grouped draft, a published service card, and its preview" onKeyDown={event=>{if(event.code==='Space'){event.preventDefault();togglePause();}else if(event.key.toLowerCase()==='r'){replay();}}}>
      <div className="chat-film-atmosphere" aria-hidden="true"/>
      <div className="chat-film-topline" aria-hidden="true"><span>REDESIGNING CHAT EXPERIENCE</span><span>GUEST PARKING SERVICE</span></div>
      <div className="chat-film-window" aria-hidden="true">
        <div className="chat-film-shot chat-film-shot--old"><img src={`${media}/old-review.png`} alt=""/></div>
        <div className="chat-film-shot chat-film-shot--detail"><img src={`${media}/old-review-detail.png`} alt=""/></div>
        <div className="chat-film-shot chat-film-shot--prompt"><img src={`${media}/figma-prompt.png`} alt=""/><span className="chat-film-focus"/></div>
        <div className="chat-film-shot chat-film-shot--review"><img src={`${media}/figma-review.png`} alt=""/></div>
        <div className="chat-film-shot chat-film-shot--published"><img src={`${media}/figma-published.png`} alt=""/></div>
        <div className="chat-film-shot chat-film-shot--preview"><img src={`${media}/figma-service-preview.png`} alt=""/></div>
      </div>
      <div className="chat-film-caption chat-film-caption--old" aria-hidden="true">One request</div>
      <div className="chat-film-caption chat-film-caption--problem" aria-hidden="true">A long way to the next step</div>
      <div className="chat-film-caption chat-film-caption--choice" aria-hidden="true">Put the choice in the conversation</div>
      <div className="chat-film-caption chat-film-caption--review" aria-hidden="true">Make the draft visible</div>
      <div className="chat-film-caption chat-film-caption--published" aria-hidden="true">A service you can revisit</div>
      <div className="chat-film-caption chat-film-caption--preview" aria-hidden="true">Preview the result</div>
      <div className="chat-film-end" aria-hidden="true">You can’t always <em>chat.</em></div>
      <div className="chat-film-progress" aria-hidden="true"><span className="chat-film-trace"/></div>
      <div className="chat-film-reduced" aria-hidden="true"><img src={`${media}/figma-service-preview.png`} alt=""/><span>You can’t always <em>chat.</em></span></div>
    </div>
    <div className="chat-film-meta"><span>Editorial animation using original product captures and final Figma designs.</span><button type="button" onClick={togglePause}>{paused?'Play film':'Pause film'}</button></div>
    {debug&&<input className="chat-film-debug" type="range" min="0" max="30" step="0.01" value={debugTime} aria-label="Scrub film" onChange={event=>{const tl=timeline.current;if(tl){tl.pause();tl.time(Number(event.target.value));setPaused(true);setDebugTime(Number(event.target.value));}}}/>}
  </div>;
}
