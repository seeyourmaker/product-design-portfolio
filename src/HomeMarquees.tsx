import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'framer-motion';
import {gsap} from 'gsap';
import {homeTestimonials,type HomeTestimonial} from './data/homeTestimonials';
import './HomeMarquees.css';

const toolGroups = [
  ['spline','webflow','blender','midjourney'],
  ['figma','cursor','codex','claude'],
  ['firebase','stitch','framer','obsidian'],
  ['canva','vercel','loveable','bolt'],
  ['photoshop','lightroom','illustrator','after effects'],
] as const;

const toolNames: Record<string,string> = {
  'after effects':'After Effects', bolt:'Bolt', canva:'Canva', claude:'Claude',
  codex:'Codex', cursor:'Cursor', figma:'Figma', firebase:'Firebase',
  framer:'Framer', illustrator:'Illustrator', lightroom:'Lightroom',
  loveable:'Lovable', midjourney:'Midjourney', obsidian:'Obsidian',
  photoshop:'Photoshop', spline:'Spline', stitch:'Stitch',
  vercel:'Vercel', webflow:'Webflow', blender:'Blender',
};

type RowKind = 'tools' | 'testimonials';
type RowProps = {kind:RowKind; reduced:boolean};

function useIntentionalHover() {
  const distance = useRef(0);
  const triggered = useRef(false);
  return {
    reset: () => {distance.current = 0; triggered.current = false;},
    moved: (event:React.PointerEvent) => {
      if (event.pointerType !== 'mouse' || triggered.current) return false;
      distance.current += Math.hypot(event.movementX,event.movementY);
      if (distance.current < 5) return false;
      triggered.current = true;
      return true;
    },
  };
}

function ToolIcon({name,decorative,reduced}:{name:string;decorative:boolean;reduced:boolean}) {
  const bounce = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const hover = useIntentionalHover();
  useEffect(() => () => {timeline.current?.kill();}, []);
  const animate = () => {
    if (reduced || !bounce.current) return;
    timeline.current?.kill();
    gsap.set(bounce.current,{y:0});
    timeline.current = gsap.timeline()
      .to(bounce.current,{y:-40,duration:.19,ease:'power2.out'})
      .to(bounce.current,{y:0,duration:.2,ease:'power2.in'})
      .to(bounce.current,{y:-20,duration:.14,ease:'power2.out'})
      .to(bounce.current,{y:0,duration:.14,ease:'power2.in'})
      .to(bounce.current,{y:-8,duration:.1,ease:'power2.out'})
      .to(bounce.current,{y:0,duration:.13,ease:'power2.in'});
  };
  return <div className="home-tool" onPointerEnter={hover.reset} onPointerLeave={hover.reset} onPointerMove={event=>{if(hover.moved(event))animate();}}>
    <div className="home-tool-bounce" ref={bounce}>
      <img src={`/marque/tools/${encodeURIComponent(name)}.png`} alt={decorative?'':toolNames[name]} draggable="false" />
    </div>
  </div>;
}

function TestimonialCard({item,decorative,reduced,cardKey,touchActive,onTouchCard}:{item:HomeTestimonial;decorative:boolean;reduced:boolean;cardKey:string;touchActive:string|null;onTouchCard:(key:string)=>void}) {
  const original = useRef<HTMLSpanElement>(null);
  const unfiltered = useRef<HTMLSpanElement>(null);
  const revealed = useRef(false);
  const [isRevealed,setIsRevealed]=useState(false);
  const hover = useIntentionalHover();
  useLayoutEffect(() => {
    gsap.set(original.current,{y:0,yPercent:0});
    gsap.set(unfiltered.current,{y:0,yPercent:100});
    return () => {gsap.killTweensOf([original.current,unfiltered.current]);};
  }, []);
  const setRevealed = (next:boolean) => {
    revealed.current = next;
    setIsRevealed(next);
    if (!original.current || !unfiltered.current) return;
    if (reduced) {
      gsap.killTweensOf([original.current,unfiltered.current]);
      gsap.set(original.current,{yPercent:next?-100:0});
      gsap.set(unfiltered.current,{yPercent:next?0:100});
    } else {
      gsap.to(original.current,{yPercent:next?-100:0,duration:.6,ease:'power3.inOut',overwrite:true});
      gsap.to(unfiltered.current,{yPercent:next?0:100,duration:.6,ease:'power3.inOut',overwrite:true});
    }
  };
  useEffect(()=>{
    if(window.matchMedia('(hover: none)').matches)setRevealed(touchActive===cardKey);
  },[touchActive,cardKey]);
  useEffect(()=>{
    if(reduced&&original.current&&unfiltered.current){
      gsap.killTweensOf([original.current,unfiltered.current]);
      gsap.set(original.current,{yPercent:revealed.current?-100:0});
      gsap.set(unfiltered.current,{yPercent:revealed.current?0:100});
    }
  },[reduced]);
  const accessibleText=isRevealed
    ? `The unfiltered version: ${item.unfiltered??'humorous alternative pending'}. Press Enter or Space to show the original.`
    : `${item.author?`Testimonial from ${item.author}`:`Testimonial ${item.id.slice(-2)}`}: ${item.original??'approved quote pending'}. Press Enter or Space to show the unfiltered version.`;
  return <button className="home-testimonial" type="button" tabIndex={decorative?-1:0}
    aria-label={accessibleText}
    aria-pressed={isRevealed}
    onPointerEnter={hover.reset}
    onPointerMove={event=>{if(hover.moved(event))setRevealed(true);}}
    onPointerLeave={event=>{hover.reset();if(event.pointerType==='mouse')setRevealed(false);}}
    onClick={event=>{if(event.detail===0)return;if(window.matchMedia('(hover: none)').matches)onTouchCard(cardKey);else setRevealed(!revealed.current);}}
    onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();setRevealed(false);}else if(event.key==='Enter'||event.key===' '){event.preventDefault();setRevealed(!revealed.current);}}}>
    <span className="home-testimonial-surface">
      <span className="home-testimonial-eyebrow">{item.original?'WHAT THEY SAID':'TESTIMONIAL COPY PENDING'}</span>
      <span className="home-testimonial-reveal">
        <span className="home-testimonial-panel home-testimonial-panel--original" ref={original} aria-hidden={isRevealed}>
          <span className="home-testimonial-quote">{item.original?`“${item.original}”`:'Approved quote to be supplied'}</span>
        </span>
        <span className="home-testimonial-panel home-testimonial-panel--unfiltered" ref={unfiltered} aria-hidden={!isRevealed}>
          <span className="home-testimonial-unfiltered-label">THE UNFILTERED VERSION</span>
          <span className="home-testimonial-quote">{item.unfiltered?`“${item.unfiltered}”`:'Humorous alternative to be supplied'}</span>
        </span>
      </span>
      <span className="home-testimonial-byline">{item.author?<><strong>{item.author}</strong>{item.role&&<span>{item.role}</span>}</>:'Awaiting approved testimonial'}</span>
    </span>
  </button>;
}

function MarqueeRow({kind,reduced}:RowProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween|null>(null);
  const width = useRef(0);
  const savedProgress = useRef(0);
  const [copies,setCopies] = useState(2);
  const [touchActive,setTouchActive]=useState<string|null>(null);
  const pausedByTouch = useRef(false);
  const hovering = useRef(false);
  const focused = useRef(false);
  const duration = kind==='tools'?37.5:50;
  const updateSpeed = useCallback((target:number) => {
    if(!loop.current || reduced)return;
    gsap.to(loop.current,{timeScale:target,duration:target? .35:.25,ease:'power2.out',overwrite:true});
  },[reduced]);
  const refreshPause = useCallback(() => {
    updateSpeed(hovering.current||focused.current||pausedByTouch.current?0:1);
  },[updateSpeed]);

  useEffect(() => {
    const element=track.current, set=firstSet.current, container=viewport.current;
    if(!element||!set||!container)return;
    if(reduced){loop.current?.kill();loop.current=null;gsap.set(element,{clearProps:'transform'});return;}
    const measure=()=>{
      const nextWidth=set.getBoundingClientRect().width;
      if(nextWidth<=0)return;
      const nextCopies=Math.max(2,Math.ceil(container.clientWidth/nextWidth)+1);
      if(nextCopies!==copies){setCopies(nextCopies);return;}
      if(Math.abs(nextWidth-width.current)<.5 && loop.current)return;
      const progress=loop.current?.progress()??savedProgress.current;
      if(loop.current){gsap.killTweensOf(loop.current);loop.current.kill();}
      width.current=nextWidth;
      loop.current=gsap.fromTo(element,
        {x:kind==='tools'?-nextWidth:0},
        {x:kind==='tools'?0:-nextWidth,duration,ease:'none',repeat:-1,paused:true}
      );
      loop.current.progress(progress).play();
      if(hovering.current||focused.current||pausedByTouch.current)loop.current.timeScale(0);
    };
    measure();
    const observer=new ResizeObserver(measure);
    observer.observe(set);observer.observe(container);
    return()=>{observer.disconnect();if(loop.current){savedProgress.current=loop.current.progress();gsap.killTweensOf(loop.current);loop.current.kill();loop.current=null;}};
  },[copies,duration,kind,reduced]);

  useEffect(()=>{
    if(kind!=='testimonials')return;
    const outside=(event:PointerEvent)=>{
      if(event.pointerType!=='touch'||viewport.current?.contains(event.target as Node))return;
      pausedByTouch.current=false;
      focused.current=false;
      setTouchActive(null);
      const active=document.activeElement;
      if(active&&viewport.current?.contains(active))(active as HTMLElement).blur();
      if(loop.current){
        gsap.killTweensOf(loop.current);
        loop.current.timeScale(0).play();
      }
      updateSpeed(1);
    };
    document.addEventListener('pointerdown',outside);
    return()=>document.removeEventListener('pointerdown',outside);
  },[kind,updateSpeed]);

  const onTouchCard=(key:string)=>{
    pausedByTouch.current=true;
    setTouchActive(current=>current===key?null:key);
    if(loop.current){gsap.killTweensOf(loop.current);loop.current.pause();}
  };
  const onFocus=(event:React.FocusEvent<HTMLDivElement>)=>{
    focused.current=true;refreshPause();
    if(kind!=='testimonials'||!loop.current||!viewport.current||!firstSet.current)return;
    const card=(event.target as HTMLElement).closest('.home-testimonial');
    if(!card||!firstSet.current.contains(card))return;
    const view=viewport.current.getBoundingClientRect(), rect=card.getBoundingClientRect();
    const current=Number(gsap.getProperty(track.current,'x'))||0;
    const delta=rect.left<view.left+16 ? view.left+24-rect.left : rect.right>view.right-16 ? view.right-24-rect.right : 0;
    if(delta){
      const desired=gsap.utils.clamp(-width.current,0,current+delta);
      loop.current.progress(-desired/width.current);
    }
  };
  const onBlur=(event:React.FocusEvent<HTMLDivElement>)=>{
    if(event.currentTarget.contains(event.relatedTarget as Node))return;
    focused.current=false;refreshPause();
  };
  return <div className={`home-marquee-row home-marquee-row--${kind}${reduced?' home-marquee-row--reduced':''}`}>
    <div className="home-marquee-viewport" ref={viewport} tabIndex={kind==='tools'?0:undefined}
      aria-label={kind==='tools'?'Design and development tools. Focus to pause the row.':'Testimonials. Focus a card to pause; press Enter or Space to reveal the alternate quote.'}
      onFocusCapture={onFocus} onBlurCapture={onBlur}
      onPointerEnter={event=>{if(event.pointerType==='mouse'){hovering.current=true;refreshPause();}}}
      onPointerLeave={event=>{if(event.pointerType==='mouse'){hovering.current=false;refreshPause();}}}>
      <div className="home-marquee-track" ref={track}>
        {Array.from({length:reduced?1:copies},(_,copy)=><div className="home-marquee-set" key={`${kind}-${copy}`} ref={copy===0?firstSet:undefined} aria-hidden={copy>0?'true':undefined}>
          {kind==='tools' ? toolGroups.map((group,index)=><div className="home-tool-board" key={`${copy}-board-${index}`}>{group.map(name=><ToolIcon key={`${copy}-${name}`} name={name} decorative={copy>0} reduced={reduced}/>)}</div>)
            : homeTestimonials.map(item=><TestimonialCard key={`${copy}-${item.id}`} item={item} decorative={copy>0} reduced={reduced} cardKey={`${copy}-${item.id}`} touchActive={touchActive} onTouchCard={onTouchCard}/>)}
        </div>)}
      </div>
    </div>
  </div>;
}

export function HomeMarquees(){
  const reduced=useReducedMotion()===true;
  return <section className="marquee home-marquees" aria-label="Tools and testimonials">
    <MarqueeRow kind="tools" reduced={reduced}/>
    <MarqueeRow kind="testimonials" reduced={reduced}/>
  </section>;
}
