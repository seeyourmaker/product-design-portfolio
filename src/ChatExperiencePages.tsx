import {useEffect} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {ChatExperienceFilm} from './ChatExperienceFilm';
import {chatExperiencePath,chatExperienceQuickLookPath} from './data/chatExperienceRoutes';
import './ChatExperiencePages.css';

const media='/redesign-chat';

function EvidenceImage({src,alt,caption,label,className='',priority=false}:{src:string;alt:string;caption:string;label:string;className?:string;priority?:boolean}){
  return <figure className={`chat-evidence ${className}`}>
    <a href={`${media}/${src}`} data-image-viewer aria-label={`Open full-size image: ${alt}`}>
      <img src={`${media}/${src}`} alt={alt} loading={priority?'eager':'lazy'}/>
      <span className="chat-evidence-open"><ArrowUpRight size={15} aria-hidden="true"/> View full size</span>
    </a>
    <figcaption><strong>{label}</strong><span>{caption}</span></figcaption>
  </figure>;
}

function OldUiAnatomy(){
  return <figure className="chat-anatomy" aria-labelledby="chat-anatomy-title">
    <div className="chat-anatomy-header"><strong id="chat-anatomy-title">EARLIER RESPONSE / GUEST PARKING SERVICE</strong><span>SCROLL ANATOMY</span></div>
    <div className="chat-anatomy-step">
      <a className="chat-anatomy-crop chat-anatomy-crop--top" href={`${media}/old-review.png`} data-image-viewer aria-label="Open the full earlier guest parking service response"><img src={`${media}/old-review.png`} alt="Earlier response with expanded service parameter, attribute, and profile tables" loading="lazy"/></a>
      <p className="chat-anatomy-caption"><span className="chat-anatomy-number">01</span><span>The generated draft opens as several expanded tables.</span></p>
    </div>
    <div className="chat-anatomy-connector" aria-hidden="true"><span>SCROLL TO CONTINUE</span><svg viewBox="0 0 24 48"><path d="M12 0v42m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></div>
    <div className="chat-anatomy-step">
      <a className="chat-anatomy-crop chat-anatomy-crop--bottom" href={`${media}/old-review-detail.png`} data-image-viewer aria-label="Open the lower portion of the earlier guest parking service response"><img src={`${media}/old-review-detail.png`} alt="Lower response showing questionnaire and cost details, a fulfillment issue, and Configure Fulfillment" loading="lazy"/></a>
      <p className="chat-anatomy-caption"><span className="chat-anatomy-number">02</span><span>Cost details, a fulfillment issue, and its action appear near the end.</span></p>
    </div>
    <figcaption className="chat-anatomy-source">Selected excerpts from the supplied product captures. Open either image to inspect the full view.</figcaption>
  </figure>;
}

function ChatExperienceQuickLook(){
  return <main className="chat-quick-bridge" id="chat-top">
    <nav className="chat-page-nav" aria-label="Project navigation"><a href="/projects"><ArrowLeft size={17} aria-hidden="true"/>All projects</a><span>REDESIGNING CHAT EXPERIENCE / QUICK LOOK</span><a href={chatExperiencePath}>Case study <ArrowRight size={16} aria-hidden="true"/></a></nav>
    <header className="chat-quick-intro"><span className="chat-study-kicker">QUICK LOOK / REDESIGN FILM</span><h1>You can’t always <em>chat.</em></h1><p>One guest parking service request, from the earlier response to a clearer path through approval, review, and preview.</p></header>
    <ChatExperienceFilm/>
    <div className="chat-quick-outro"><p>See the original captures and final designs side by side in the case study.</p><a className="chat-study-action" href={chatExperiencePath}>Explore the case study <ArrowUpRight size={18} aria-hidden="true"/></a></div>
  </main>;
}

function ChatExperienceCaseStudy(){
  return <main className="chat-study" id="chat-top">
    <a className="chat-study-skip" href="#chat-story">Skip to the story</a>
    <nav className="chat-page-nav" aria-label="Project navigation"><a href="/projects"><ArrowLeft size={17} aria-hidden="true"/>All projects</a><span>REDESIGNING CHAT EXPERIENCE / CASE STUDY</span><a href={chatExperienceQuickLookPath}>Quick Look <ArrowUpRight size={16} aria-hidden="true"/></a></nav>
    <header className="chat-study-hero">
      <div className="chat-study-hero-copy"><span className="chat-study-kicker">BMC HELIX · CATALOG ASSISTANT</span><h1>You can’t<br/><em>always<br/>chat.</em></h1><p>A shipped redesign that brings choices, review, and a clear result into the service-creation conversation.</p><a className="chat-study-action" href="#chat-story">Explore the redesign <ArrowRight size={18} aria-hidden="true"/></a></div>
      <div className="chat-study-hero-art"><EvidenceImage src="figma-prompt.png" alt="Final Catalog Assistant design asking which approval to link to a guest parking service, with visible radio choices" label="AFTER / FINAL DESIGN" caption="The assistant asks for a decision where it is needed." priority/></div>
      <dl className="chat-study-facts"><div><dt>MY ROLE</dt><dd>Product designer · redesign lead</dd></div><div><dt>TEAM</dt><dd>Three designers</dd></div><div><dt>STATUS</dt><dd>Shipped</dd></div></dl>
    </header>
    <article id="chat-story" className="chat-study-story" tabIndex={-1}>
      <section className="chat-study-intro" aria-labelledby="chat-task-title"><OldUiAnatomy/><div className="chat-study-task-copy"><span className="chat-study-index">THE TASK</span><h2 id="chat-task-title">One request.<br/>A clearer path.</h2><p className="chat-study-request">“Create a guest parking service and add an approval step.”</p><p>I led the redesign with two other designers. This example follows one service from the request through approval selection, draft review, and publication. The screens show the interaction changes; no measured usability or business result is claimed here.</p></div></section>
      <section className="chat-study-section" aria-labelledby="chat-before-title"><div className="chat-study-section-head"><span className="chat-study-index">01 / BEFORE</span><h2 id="chat-before-title">A conversation that<br/>ended in a table.</h2><p>The earlier assistant opened on a broad canvas. After a guest parking request, its response exposed service parameters, attributes, and questionnaire details in long tables. The information was present, but the next decision and the draft were difficult to see together in the captured view.</p></div><div className="chat-study-pair chat-study-pair--before"><EvidenceImage src="old-entry.png" alt="Earlier BMC Helix assistant entry screen with guidance in the middle of a large blank area and a composer at the bottom" label="BEFORE / PRODUCT CAPTURE" caption="The original entry view."/><EvidenceImage src="old-review.png" alt="Earlier BMC Helix assistant response showing guest parking service parameters and attributes as a long table" label="BEFORE / PRODUCT CAPTURE" caption="The service draft begins as a dense table."/></div><EvidenceImage src="old-review-detail.png" alt="Lower portion of the earlier guest parking service response with questionnaire rows, cost details, an issue notice, and a Configure Fulfillment button" label="BEFORE / CONTINUED" caption="Further down, questionnaire and fulfillment details continue in the same response." className="chat-study-detail"/></section>
      <section className="chat-study-section chat-study-section--choice" aria-labelledby="chat-choice-title"><div className="chat-study-section-head"><span className="chat-study-index">02 / THE DECISION</span><h2 id="chat-choice-title">Ask for a choice<br/>where it matters.</h2><p>Instead of relying on another free-form reply, the redesigned assistant presents approval options inside the conversation. A person can select the suggested Manager Approval or choose another path, including an approval from a list.</p></div><div className="chat-study-pair"><EvidenceImage src="figma-prompt.png" alt="Final design showing the guest parking request and an inline approval question with Manager, HR, Facilities, and Other options" label="AFTER / FINAL DESIGN" caption="A focused question offers visible options."/><EvidenceImage src="figma-choice.png" alt="Final design showing the Choose from the list path and a Select Approval dropdown within the conversation" label="AFTER / FINAL DESIGN" caption="The alternate path stays in context."/></div></section>
      <section className="chat-study-section" aria-labelledby="chat-review-title"><div className="chat-study-section-head"><span className="chat-study-index">03 / THE REVIEW</span><h2 id="chat-review-title">Make the draft<br/>easy to inspect.</h2><p>The earlier response displayed the generated data as one long table. The redesign groups the draft into Service, parameters, details, workflow, questionnaire, and cost sections. The person can review the relevant area and still has an explicit Create Service action.</p></div><div className="chat-study-compare"><EvidenceImage src="old-review.png" alt="Earlier guest parking service draft shown as a long table of parameters and attributes" label="BEFORE / PRODUCT CAPTURE" caption="A long, expanded response."/><div className="chat-study-compare-arrow" aria-hidden="true"><ArrowRight size={24}/></div><EvidenceImage src="figma-review.png" alt="Final guest parking service draft grouped into expandable sections with a Create Service button" label="AFTER / FINAL DESIGN" caption="A grouped draft with a visible next action."/></div></section>
      <section className="chat-study-section chat-study-section--finish" aria-labelledby="chat-finish-title"><div className="chat-study-section-head"><span className="chat-study-index">04 / THE RESULT</span><h2 id="chat-finish-title">Finish with a<br/>useful destination.</h2><p>After publication, the conversation presents the created Guest Parking Service as a card, with Preview and Edit Service actions. The flow ends with an object the person can recognize and revisit, rather than only a success sentence.</p></div><EvidenceImage src="figma-published.png" alt="Final Catalog Assistant design confirming publication of the Guest Parking Service with a service card, Preview button, and Edit Service action" label="AFTER / FINAL DESIGN" caption="The published service remains available to preview or edit." className="chat-study-finish-art"/></section>
      <section className="chat-study-section chat-study-section--preview" aria-labelledby="chat-preview-title"><div className="chat-study-section-head"><span className="chat-study-index">05 / THE PREVIEW</span><h2 id="chat-preview-title">See the service<br/>take shape.</h2><p>Choosing Preview from the published card opens the Guest Parking Service in Service Configuration beside Catalog Assistant. The service profile, workflow, questionnaire, cost, and service-level tabs are visible while the conversation remains in view.</p></div><EvidenceImage src="figma-service-preview.png" alt="Final service preview showing Guest Parking Service configuration with its profile and tabs on the left, beside the Catalog Assistant conversation and published-service card on the right" label="AFTER / FINAL DESIGN" caption="Preview shows the service beside the conversation that created it." className="chat-study-preview-art"/></section>
      <aside className="chat-study-note"><span className="chat-study-index">ABOUT THE EVIDENCE</span><p>The before images are captures of the earlier product. The after images are final Figma frames supplied for this shipped redesign. The guest parking task is the example shown throughout; no research findings, adoption figures, or measured UX outcomes have been supplied.</p></aside>
    </article>
    <footer className="chat-page-footer"><a href="/projects"><ArrowLeft size={17} aria-hidden="true"/>All projects</a><a href="#chat-top">Back to top ↑</a></footer>
  </main>;
}

export function ChatExperiencePage({quickLook=false}:{quickLook?:boolean}){
  useEffect(()=>{const previous=document.title;document.title=`${quickLook?'Quick Look':'Case Study'} | Redesigning Chat Experience | Saurabh`;window.scrollTo({top:0,behavior:'instant'});return()=>{document.title=previous}},[quickLook]);
  return quickLook?<ChatExperienceQuickLook/>:<ChatExperienceCaseStudy/>;
}
