import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,X,ZoomIn,ZoomOut} from 'lucide-react';
import './ImageViewer.css';

type OpenImage={src:string;alt:string};
type ImageHistoryState=Record<string,unknown>&{__portfolioImage?:OpenImage};
type ScrollPosition={element:Element;top:number;left:number};

function imageInHistory():OpenImage|null{
  const entry=(window.history.state as ImageHistoryState|null)?.__portfolioImage;
  return entry&&typeof entry.src==='string'&&typeof entry.alt==='string'?entry:null;
}

export function ImageViewer(){
  const [image,setImage]=useState<OpenImage|null>(imageInHistory);
  const [actualSize,setActualSize]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLAnchorElement|null>(null);
  const originScroll=useRef<{x:number;y:number;ancestors:ScrollPosition[]}|null>(null);
  const previousScrollRestoration=useRef<ScrollRestoration|null>(null);

  useEffect(()=>{
    const open=(event:MouseEvent)=>{
      if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.defaultPrevented)return;
      if(!(event.target instanceof Element))return;
      const anchor=event.target.closest<HTMLAnchorElement>('a[data-image-viewer]');
      if(!anchor)return;
      event.preventDefault();
      trigger.current=anchor;
      const ancestors:ScrollPosition[]=[];
      for(let element=anchor.parentElement;element&&element!==document.body;element=element.parentElement){
        if(element.scrollHeight>element.clientHeight+1||element.scrollWidth>element.clientWidth+1)ancestors.push({element,top:element.scrollTop,left:element.scrollLeft});
      }
      originScroll.current={x:window.scrollX,y:window.scrollY,ancestors};
      previousScrollRestoration.current=window.history.scrollRestoration;
      window.history.scrollRestoration='manual';
      const next={src:anchor.href,alt:anchor.querySelector('img')?.alt||anchor.getAttribute('aria-label')||'Project image'};
      window.history.pushState({...window.history.state,__portfolioImage:next},'',window.location.href);
      setActualSize(false);
      setImage(next);
    };
    const sync=()=>{setActualSize(false);setImage(imageInHistory());};
    document.addEventListener('click',open);
    window.addEventListener('popstate',sync);
    return()=>{document.removeEventListener('click',open);window.removeEventListener('popstate',sync);};
  },[]);

  useEffect(()=>{
    const element=dialog.current;
    if(image){if(element&&!element.open)element.showModal();}
    else{
      if(element?.open)element.close();
      const anchor=trigger.current;
      if(anchor?.isConnected){
        anchor.focus({preventScroll:true});
        const position=originScroll.current;
        if(position)requestAnimationFrame(()=>requestAnimationFrame(()=>{
          window.scrollTo({left:position.x,top:position.y,behavior:'instant'});
          position.ancestors.forEach(({element,top,left})=>element.scrollTo({top,left,behavior:'instant'}));
          window.history.scrollRestoration=previousScrollRestoration.current||'auto';
          previousScrollRestoration.current=null;
        }));
      }
      else if(previousScrollRestoration.current){
        window.history.scrollRestoration=previousScrollRestoration.current;
        previousScrollRestoration.current=null;
      }
    }
  },[image]);

  const close=()=>{
    if(imageInHistory())window.history.back();
    else setImage(null);
  };

  return <dialog ref={dialog} className="portfolio-image-viewer" aria-label="Full-size project image" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===dialog.current)close();}}>
    {image&&<div className="portfolio-image-viewer-inner">
      <div className="portfolio-image-viewer-toolbar"><button type="button" onClick={close}><ArrowLeft size={18} aria-hidden="true"/> Back to project</button><span>Full-size image</span><div><button type="button" onClick={()=>setActualSize(value=>!value)} aria-label={actualSize?'Fit image to width':'View image at actual size'} title={actualSize?'Fit to width':'Actual size'}>{actualSize?<ZoomOut size={18} aria-hidden="true"/>:<ZoomIn size={18} aria-hidden="true"/>}</button><button type="button" onClick={close} aria-label="Close image"><X size={21} aria-hidden="true"/></button></div></div>
      <div className="portfolio-image-viewer-scroll"><img className={actualSize?'is-actual-size':''} src={image.src} alt={image.alt}/></div>
    </div>}
  </dialog>;
}
