import {useState} from 'react';
import {ArrowRight,Check,RotateCcw} from 'lucide-react';

type WorkflowKey='default'|'existing'|'recommended';
const workflows:Record<WorkflowKey,{label:string;description:string;name:string;reason:string;reply:string}>={
  default:{label:'Default approval workflow',description:'Use a documented default for this example.',name:'Manager approval',reason:'Example assumption: a documented manager-approval default is available.',reply:'Use the default approval workflow.'},
  existing:{label:'Custom approval workflow',description:'Select from list of custom workflows',name:'',reason:'',reply:'Use the selected custom workflow.'},
  recommended:{label:'AI-recommended workflow',description:'Review a recommendation for this service.',name:'Manager approval · recommended',reason:'Illustrative recommendation: manager approval addresses the requested approval step before fulfillment.',reply:'Use the AI-recommended workflow for this example.'},
};
const customWorkflows=['Mobile device approval','Manager review · Hardware','IT asset sign-off'];

export function IntentCaseDemos(){
  const [choice,setChoice]=useState<WorkflowKey|null>(null);
  const [customWorkflow,setCustomWorkflow]=useState(customWorkflows[0]);
  const workflow=choice?{...workflows[choice],name:choice==='existing'?customWorkflow:workflows[choice].name,reply:choice==='existing'?`Use the custom ${customWorkflow} workflow.`:workflows[choice].reply}:null;
  const diagramUrl = workflow
    ? '/intent/assistant-panel.html?workflow=' + encodeURIComponent(workflow.name)
    : '/intent/assistant-panel.html';
  return <div className="ic-demos">
    <div className="ic-demo-intro"><span className="ic-label">Demo 01 / Interactive clarification</span><h3>One question. A meaningful choice.</h3><p>Try an approval option. Watch the conversation and configuration respond to the same decision.</p></div>
    <div className="ic-exhibit" id="ic-clarification">
      <div className="ic-exhibit-bar"><span><i/>Interaction study / 01</span><span>Conceptual reconstruction</span></div>
      <div className="ic-clarify-layout">
        <div className="ic-conversation">
          <div className="ic-message ic-message-user"><span className="ic-label">Catalog administrator</span><p>Create a mobile phone service and add an <mark>approval step</mark>.</p></div>
          <div className="ic-assistant-label"><span>CC</span>Catalog Curator <small>Illustrative conversation</small></div>
          <p className="ic-question-context">“approval step” leaves the approval workflow unresolved. That choice changes the service draft.</p>
          <fieldset className="ic-options"><legend>Which approval workflow should this service use?</legend>{(['recommended','default','existing'] as WorkflowKey[]).map(key=><label className={`ic-option${choice===key?' is-selected':''}`} key={key}><input type="radio" name="ic-workflow" value={key} checked={choice===key} onChange={()=>setChoice(key)}/><span><strong>{workflows[key].label}</strong><small>{workflows[key].description}</small></span>{choice===key&&<Check size={17} aria-hidden="true"/>}</label>)}</fieldset>{choice==='existing'&&<label className="ic-custom-workflow">Custom workflow<select value={customWorkflow} onChange={event=>setCustomWorkflow(event.target.value)}>{customWorkflows.map(name=><option key={name} value={name}>{name}</option>)}</select></label>}
          <div className="ic-conversation-result" aria-live="polite" aria-atomic="true">{workflow?<><p className="ic-answer"><Check size={15} aria-hidden="true"/>{workflow.reply}</p><p>The approval choice is resolved for this example. I can now prepare a service draft with <strong>{workflow.name}</strong> before work order fulfillment.</p></>:<p className="ic-awaiting">Choose an option to resolve the approval decision.</p>}</div>
        </div>
        <aside className="ic-draft" aria-label="Live service configuration preview"><div className="ic-draft-heading"><span className="ic-label">Configuration preview</span><span className={`ic-status${workflow?' is-ready':''}`}>{workflow?'Choice resolved':'Awaiting a choice'}</span></div><h4>Mobile phone <br/>request</h4><p>Illustrative service draft</p><dl><div><dt>Service category</dt><dd>IT peripherals</dd></div><div className="ic-draft-workflow"><dt>Approval workflow</dt><dd>{workflow?.name||'Unresolved'}</dd></div><div><dt>Fulfillment</dt><dd>Work order, after approval</dd></div><div><dt>Decision</dt><dd>{workflow?'Ready to prepare a draft':'Clarification required'}</dd></div></dl><a href="#ic-configuration">View service draft diagram <ArrowRight size={16} aria-hidden="true"/></a><button className="ic-reset" type="button" onClick={()=>setChoice(null)} disabled={!choice}><RotateCcw size={14} aria-hidden="true"/>Reset example</button></aside>
      </div>
      <div className="ic-exhibit-note"><span>Design decision</span><p>Make the unresolved choice actionable. Keep the rest of the service in context.</p></div>
    </div>

    <section id="ic-configuration" className="ic-demo-intro">
      <h3>From a request to a service draft</h3>
      <p>The draft reflects the approval workflow selected above. The administrator can review each part of the draft before creating the service.</p>
      <a className="ic-inline-link" href={diagramUrl}>Open full diagram <ArrowRight size={16}/></a>
      <iframe title="Mobile phone service draft diagram" src={diagramUrl} loading="lazy" style={{width:'100%',height:'clamp(430px, 57vw, 660px)',border:0,marginTop:16}}/>
    </section>
  </div>;
}
