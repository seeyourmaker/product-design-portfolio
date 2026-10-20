import {useEffect,useRef,useState,type RefObject} from 'react';
import {gsap} from 'gsap';

type MotionStatus = 'off' | 'permission' | 'waiting' | 'active' | 'denied' | 'unavailable';
type PermissionedOrientationEvent = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

const maxX=14;
const maxY=10;
const clamp=(value:number,limit:number)=>Math.max(-limit,Math.min(limit,value));
const angleDelta=(value:number,origin:number)=>((value-origin+540)%360)-180;
const screenAngle=()=>window.screen.orientation?.angle ?? (window as Window & {orientation?:number}).orientation ?? 0;

export function useMobileAvatarMotion(avatarRef:RefObject<HTMLDivElement>,shadowRef:RefObject<HTMLDivElement>,reduced:boolean|null){
  const [status,setStatus]=useState<MotionStatus>('off');
  const enableRef=useRef<(()=>void)|null>(null);

  useEffect(()=>{
    const avatar=avatarRef.current;
    const shadow=shadowRef.current;
    if(!avatar||!window.matchMedia('(hover: none) and (pointer: coarse)').matches||reduced){
      setStatus('off');
      return;
    }

    let disposed=false;
    let sensorActive=false;
    let listening=false;
    let frame=0;
    let lastFrame=0;
    let timeout=0;
    let baseline:{beta:number,gamma:number}|null=null;
    let touchStart:{x:number,y:number}|null=null;
    const current={x:0,y:0};
    const target={x:0,y:0};
    const draw=(time:number)=>{
      frame=0;
      const blend=1-Math.exp(-(lastFrame?time-lastFrame:16)/85);
      lastFrame=time;
      current.x+=(target.x-current.x)*blend;
      current.y+=(target.y-current.y)*blend;
      gsap.set(avatar,{x:current.x,y:current.y});
      if(shadow){
        shadow.style.transform=`translateX(calc(-50% + ${current.x}px)) scale(${Math.max(.35,1+current.y/900)})`;
        shadow.style.opacity=String(Math.max(.35,Math.min(1,.7+current.y/300)));
      }
      if(Math.abs(target.x-current.x)>.05||Math.abs(target.y-current.y)>.05)frame=requestAnimationFrame(draw);
      else lastFrame=0;
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
    const reset=()=>{target.x=0;target.y=0;schedule();};
    const onOrientation=(event:DeviceOrientationEvent)=>{
      if(typeof event.beta!=='number'||typeof event.gamma!=='number')return;
      if(!sensorActive){
        sensorActive=true;
        window.clearTimeout(timeout);
        setStatus('active');
        touchStart=null;
      }
      if(!baseline){baseline={beta:event.beta,gamma:event.gamma};reset();return;}
      const beta=angleDelta(event.beta,baseline.beta);
      const gamma=angleDelta(event.gamma,baseline.gamma);
      const angle=screenAngle()*Math.PI/180;
      target.x=clamp((gamma*Math.cos(angle)+beta*Math.sin(angle))*.55,maxX);
      target.y=clamp((beta*Math.cos(angle)-gamma*Math.sin(angle))*.4,maxY);
      schedule();
    };
    const onScreenChange=()=>{baseline=null;reset();};
    const onTouchStart=(event:TouchEvent)=>{
      if(sensorActive)return;
      const touch=event.touches[0];
      if(touch)touchStart={x:touch.clientX,y:touch.clientY};
    };
    const onTouchMove=(event:TouchEvent)=>{
      if(sensorActive||!touchStart)return;
      const touch=event.touches[0];
      if(!touch)return;
      target.x=clamp((touch.clientX-touchStart.x)*.18,maxX);
      target.y=clamp((touch.clientY-touchStart.y)*.14,maxY);
      schedule();
    };
    const onTouchEnd=()=>{touchStart=null;if(!sensorActive)reset();};
    const listen=()=>{
      if(listening)return;
      listening=true;
      setStatus('waiting');
      window.addEventListener('deviceorientation',onOrientation,{passive:true});
      timeout=window.setTimeout(()=>{if(!sensorActive)setStatus('unavailable');},2500);
    };

    avatar.addEventListener('touchstart',onTouchStart,{passive:true});
    avatar.addEventListener('touchmove',onTouchMove,{passive:true});
    avatar.addEventListener('touchend',onTouchEnd,{passive:true});
    avatar.addEventListener('touchcancel',onTouchEnd,{passive:true});
    window.addEventListener('orientationchange',onScreenChange);
    window.screen.orientation?.addEventListener('change',onScreenChange);

    if(!window.isSecureContext||!('DeviceOrientationEvent' in window))setStatus('unavailable');
    else{
      const orientationEvent=window.DeviceOrientationEvent as PermissionedOrientationEvent;
      if(typeof orientationEvent.requestPermission==='function'){
        setStatus('permission');
        enableRef.current=()=>{
          setStatus('waiting');
          try{
            orientationEvent.requestPermission!().then(permission=>{
              if(disposed)return;
              if(permission==='granted')listen();
              else setStatus('denied');
            }).catch(()=>{if(!disposed)setStatus('denied');});
          }catch{if(!disposed)setStatus('denied');}
        };
      }else listen();
    }

    return ()=>{
      disposed=true;
      enableRef.current=null;
      window.clearTimeout(timeout);
      if(frame)cancelAnimationFrame(frame);
      if(listening)window.removeEventListener('deviceorientation',onOrientation);
      window.removeEventListener('orientationchange',onScreenChange);
      window.screen.orientation?.removeEventListener('change',onScreenChange);
      avatar.removeEventListener('touchstart',onTouchStart);
      avatar.removeEventListener('touchmove',onTouchMove);
      avatar.removeEventListener('touchend',onTouchEnd);
      avatar.removeEventListener('touchcancel',onTouchEnd);
      gsap.set(avatar,{x:0,y:0});
      if(shadow){shadow.style.transform='translateX(calc(-50% + 0px)) scale(1)';shadow.style.opacity='.7';}
    };
  },[avatarRef,shadowRef,reduced]);

  return {status,enableMotion:()=>enableRef.current?.()};
}
