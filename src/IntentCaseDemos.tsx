import {useRef,useState,type KeyboardEvent} from 'react';
import {ArrowRight,Check,FileText,GitBranch,Layers,MessageCircle,RotateCcw,ShieldCheck} from 'lucide-react';

type WorkflowKey='default'|'existing'|'recommended';
const workflows:Record<WorkflowKey,{label:string;description:string;name:string;reason:string;reply:string}>={
  default:{label:'Default approval workflow',description:'Use a documented default for this example.',name:'Manager approval',reason:'Example assumption: a documented manager-approval default is available.',reply:'Use the default approval workflow.'},
  existing:{label:'Existing approval workflow',description:'Reuse the mobile approval from the research mockup.',name:'Approval 2314 — Mobile',reason:'The research mockup names this existing mobile workflow. Its availability here is illustrative.',reply:'Use the existing Approval 2314 — Mobile workflow.'},
  recommended:{label:'AI-recommended workflow',description:'Review a recommendation for this service.',name:'Manager approval · recommended',reason:'Illustrative recommendation: manager approval addresses the requested approval step before fulfillment.',reply:'Use the AI-recommended workflow for this example.'},
};
const sections=[{name:'Service Profile',icon:FileText},{name:'Questionnaire',icon:MessageCircle},{name:'Workflow',icon:GitBranch},{name:'Fulfillment',icon:Layers}];

export function IntentCaseDemos(){
  const [choice,setChoice]=useState<WorkflowKey|null>(null);
  const [active,setActive]=useState(0);
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const workflow=choice?workflows[choice]:null;
  function moveTab(event:KeyboardEvent<HTMLButtonElement>,index:number){
    let next=index;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%sections.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+sections.length-1)%sections.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=sections.length-1;
    else return;
    event.preventDefault();setActive(next);tabs.current[next]?.focus();
  }
  return <div className="ic-demos">
    <div className="ic-demo-intro"><span className="ic-label">Demo 01 / Interactive clarification</span><h3>One question. A meaningful choice.</h3><p>Try an approval option. Watch the conversation and configuration respond to the same decision.</p></div>
    <div className="ic-exhibit" id="ic-clarification">
      <div className="ic-exhibit-bar"><span><i/>Interaction study / 01</span><span>Conceptual reconstruction</span></div>
      <div className="ic-clarify-layout">
        <div className="ic-conversation">
          <div className="ic-message ic-message-user"><span className="ic-label">Catalog administrator</span><p>Create a mobile phone service requiring <mark>device approval</mark> before the request is fulfilled.</p></div>
          <div className="ic-assistant-label"><span>CC</span>Catalog Curator <small>Illustrative conversation</small></div>
          <p className="ic-question-context">“Device approval” leaves the approval workflow unresolved. That choice changes the service draft.</p>
          <fieldset className="ic-options"><legend>Which approval workflow should this service use?</legend>{(Object.keys(workflows) as WorkflowKey[]).map(key=><label className={`ic-option${choice===key?' is-selected':''}`} key={key}><input type="radio" name="ic-workflow" value={key} checked={choice===key} onChange={()=>setChoice(key)}/><span><strong>{workflows[key].label}</strong><small>{workflows[key].description}</small></span>{choice===key&&<Check size={17} aria-hidden="true"/>}</label>)}</fieldset>
          <div className="ic-conversation-result" aria-live="polite" aria-atomic="true">{workflow?<><p className="ic-answer"><Check size={15} aria-hidden="true"/>{workflow.reply}</p><p>The approval choice is resolved for this example. I can now prepare a service draft with <strong>{workflow.name}</strong> before work order fulfillment.</p></>:<p className="ic-awaiting">Choose an option to resolve the approval decision.</p>}</div>
        </div>
        <aside className="ic-draft" aria-label="Live service configuration preview"><div className="ic-draft-heading"><span className="ic-label">Configuration preview</span><span className={`ic-status${workflow?' is-ready':''}`}>{workflow?'Choice resolved':'Awaiting a choice'}</span></div><h4>Mobile phone <br/>request</h4><p>Illustrative service draft</p><dl><div><dt>Service category</dt><dd>IT peripherals</dd></div><div className="ic-draft-workflow"><dt>Approval workflow</dt><dd>{workflow?.name||'Unresolved'}</dd></div><div><dt>Fulfillment</dt><dd>Work order, after approval</dd></div><div><dt>Decision</dt><dd>{workflow?'Ready to prepare a draft':'Clarification required'}</dd></div></dl><p className="ic-draft-reason">{workflow?.reason||'No workflow is silently selected. One consequential choice is made visible before generation.'}</p><a href="#ic-configuration" onClick={()=>setActive(2)}>Inspect workflow <ArrowRight size={16} aria-hidden="true"/></a><button className="ic-reset" type="button" onClick={()=>setChoice(null)} disabled={!choice}><RotateCcw size={14} aria-hidden="true"/>Reset example</button></aside>
      </div>
      <div className="ic-exhibit-note"><span>Design decision</span><p>Make the unresolved choice actionable. Keep the rest of the service in context.</p></div>
    </div>
    <p className="ic-note">Local demonstration, with illustrative configuration values. The default option assumes a documented default exists; it is offered here to compare interaction paths. The research explores existing-workflow selection and AI recommendation. This reconstruction does not establish their availability in every released configuration.</p>

    <div className="ic-demo-intro" id="ic-configuration"><span className="ic-label">Demo 02 / Point-and-click configuration</span><h3>A draft you can understand in parts.</h3><p>Explore the service without reading one long response. The Workflow section carries your choice from Demo 01.</p></div>
    <div className="ic-exhibit"><div className="ic-exhibit-bar"><span><i/>Interaction study / 02</span><span>Conceptual reconstruction</span></div>
      <div className="ic-config-header"><div><span className="ic-label">Service configuration</span><h4>Mobile phone request</h4></div><span className="ic-status">Example draft</span></div>
      <div className="ic-config-layout"><div role="tablist" aria-label="Service configuration sections" className="ic-config-tabs">{sections.map(({name,icon:Icon},i)=><button key={name} ref={node=>{tabs.current[i]=node}} type="button" role="tab" id={`ic-tab-${i}`} aria-controls={`ic-panel-${i}`} aria-selected={active===i} tabIndex={active===i?0:-1} onKeyDown={event=>moveTab(event,i)} onClick={()=>setActive(i)}><Icon size={18} aria-hidden="true"/><span>{name}</span><ArrowRight size={14} aria-hidden="true"/></button>)}<p>Choose a section to see its details.<br/>Use arrow keys to move between tabs.</p></div>
        {sections.map((section,index)=><div className="ic-config-panel" hidden={active!==index} role="tabpanel" id={`ic-panel-${index}`} aria-labelledby={`ic-tab-${index}`} tabIndex={0} key={section.name}>
          <span className="ic-label">0{index+1} / {section.name}</span>
          {index===0&&<><h4>What is this service for?</h4><p className="ic-panel-lead">Request a mobile phone for work.</p><dl className="ic-fields"><div><dt>Service name</dt><dd>Mobile phone request</dd></div><div><dt>Category</dt><dd>IT peripherals</dd></div><div><dt>Tags</dt><dd>Mobile · Device · Hardware</dd></div></dl><DesignNote title="Start with the familiar">A concise profile gives the administrator something recognizable to review before inspecting configuration details.</DesignNote></>}
          {index===1&&<><h4>Ask the requester what matters.</h4><p className="ic-panel-lead">A preview of the questions in the research exploration.</p><ol className="ic-question-list">{[['Employee name','Text'],['Job role','Text'],['Business purpose','Long answer'],['Phone preference','Selection'],['Approving manager','Text'],['Required date','Date']].map(([name,type],i)=><li key={name}><span>{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><small>{type}</small></li>)}</ol><DesignNote title="Reveal detail at the point of need">Question labels are visible first. Technical field properties stay out of the primary reading path. Field types here are illustrative.</DesignNote></>}
          {index===2&&<><h4>{workflow?'An explicit approval choice.':'One decision is still open.'}</h4><p className="ic-panel-lead">{workflow?.name||'Approval workflow: unresolved'}</p><dl className="ic-fields"><div><dt>Selection source</dt><dd>{workflow?.label||'No option selected in Demo 01'}</dd></div><div><dt>Approval timing</dt><dd>Before fulfillment</dd></div><div><dt>Fulfillment requirement</dt><dd>Work order</dd></div></dl><DesignNote title="Keep the decision traceable">{workflow?.reason||'The preview preserves uncertainty instead of quietly inventing an approval workflow.'}</DesignNote><a className="ic-inline-link" href="#ic-clarification">{workflow?'Change the approval choice':'Resolve in Demo 01'} <ArrowRight size={15} aria-hidden="true"/></a></>}
          {index===3&&<><h4>Make the handoff visible.</h4><p className="ic-panel-lead">Work order fulfillment follows approval.</p><dl className="ic-fields"><div><dt>Fulfillment requirement</dt><dd>Work order</dd></div><div><dt>Prerequisite</dt><dd>Approval completed</dd></div><div><dt>External integrations</dt><dd>None included in this example</dd></div></dl><DesignNote title="Show the supported scope">The preview explains the handoff without inventing a proprietary integration or promising unverified automation.</DesignNote></>}
        </div>)}
      </div>
      <div className="ic-exhibit-note"><span>Design decision</span><p>Progressive disclosure separates the overview from the details, while preserving the connection between them.</p></div>
    </div><p className="ic-note">These two exhibits reconstruct interaction-design concepts in the portfolio’s visual language. They are not screenshots or pixel-perfect reproductions of the shipped UI. No live AI or product service is connected.</p>
  </div>;
}
function DesignNote({title,children}:{title:string;children:React.ReactNode}){return <aside className="ic-design-note"><ShieldCheck size={18} aria-hidden="true"/><div><strong>{title}</strong><p>{children}</p></div></aside>}
