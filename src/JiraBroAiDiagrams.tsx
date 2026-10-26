import './JiraBroAiDiagrams.css';

type Node={x:number;y:number;w:number;h:number;title:string;detail:string;focal?:boolean};
const modelNodes:Node[]=[
  {x:24,y:96,w:152,h:80,title:'Request',detail:'text or command'},
  {x:216,y:96,w:176,h:80,title:'Strict resolver',detail:'known command?'},
  {x:440,y:96,w:176,h:80,title:'Provider mode',detail:'auto / local / cloud'},
  {x:664,y:32,w:240,h:80,title:'Local Ollama cascade',detail:'fast → strong if needed'},
  {x:944,y:32,w:224,h:80,title:'Quality check',detail:'parse · slots · clarify',focal:true},
  {x:944,y:224,w:224,h:80,title:'Cloud chain',detail:'configured providers only'},
  {x:944,y:400,w:224,h:80,title:'Structured intent',detail:'ready for validation'},
  {x:216,y:344,w:176,h:80,title:'Direct command',detail:'model bypass'},
];
const actionNodes:Node[]=[
  {x:32,y:80,w:248,h:96,title:'Request + context',detail:'phase · issue · prior user'},
  {x:368,y:32,w:240,h:96,title:'Semantic instructions',detail:'allowed intents · slot rules',focal:true},
  {x:368,y:176,w:240,h:96,title:'Compact user prompt',detail:'relevant state + request'},
  {x:720,y:104,w:240,h:96,title:'Selected model',detail:'local or configured cloud'},
  {x:1000,y:104,w:248,h:96,title:'JSON + schema',detail:'parse or clarify'},
  {x:1000,y:280,w:248,h:96,title:'Normalize + resolve',detail:'issue · date · duration'},
  {x:720,y:280,w:240,h:96,title:'Deterministic validation',detail:'check required details'},
  {x:368,y:456,w:240,h:96,title:'Review + confirm',detail:'human approval for writes',focal:true},
  {x:720,y:456,w:240,h:96,title:'Jira API + result',detail:'actual success or error'},
];
function Boxes({nodes}:{nodes:Node[]}){return <>{nodes.map(n=><g key={n.title}><rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill={n.focal?'#192b28':'#151818'} stroke={n.focal?'#83e0cf':'#67777e'}/><text x={n.x+16} y={n.y+34} fill={n.focal?'#83e0cf':'#d7e2ea'} fontSize="18" fontWeight="500">{n.title}</text><text x={n.x+16} y={n.y+60} fill="#aab8bf" fontSize="13">{n.detail}</text></g>)}</>}
function ArrowDefs({id}:{id:string}){return <defs><marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="#aab8bf" strokeWidth="1.3"/></marker></defs>}
function Line({d,marker,dashed=false}:{d:string;marker:string;dashed?:boolean}){return <path d={d} fill="none" stroke="#aab8bf" strokeWidth="1.5" strokeDasharray={dashed?'5 4':undefined} markerEnd={`url(#${marker})`}/>}
function MobilePath({items}:{items:{title:string;body:string;note?:string}[]}){return <ol className="jbai-mobile">{items.map((item,i)=><li key={item.title}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{item.title}</strong><p>{item.body}</p>{item.note&&<small>{item.note}</small>}</div></li>)}</ol>}
export function ModelRoutingDiagram(){const marker='jbai-routing-arrow';return <figure className="jbai-figure" aria-labelledby="jbai-routing-caption"><div className="jbai-top"><span>01 / MODEL ROUTING</span><span>Conditional paths · conceptual architecture</span></div><div className="jbai-canvas"><svg viewBox="0 0 1200 520" role="img" aria-labelledby="jbai-routing-title jbai-routing-desc"><title id="jbai-routing-title">How JiraBro routes a request to an intent extractor</title><desc id="jbai-routing-desc">Strict commands bypass models. Other requests use the configured provider mode. Auto mode can try a reachable local Ollama fast model, escalate to a stronger local model on poor extraction, and then try configured cloud providers. The output is a structured intent for validation.</desc><ArrowDefs id={marker}/>
  <Line d="M176 136 H212" marker={marker}/><Line d="M392 136 H436" marker={marker}/><Line d="M304 176 V340" marker={marker} dashed/>
  <Line d="M616 128 H636 Q644 128 644 120 V80 Q644 72 652 72 H660" marker={marker}/>
  <Line d="M616 144 H628 Q636 144 636 152 V256 Q636 264 644 264 H940" marker={marker} dashed/>
  <Line d="M904 72 H940" marker={marker}/><Line d="M1056 112 V220" marker={marker} dashed/>
  <Line d="M1168 72 H1176 Q1184 72 1184 80 V432 Q1184 440 1176 440 H1172" marker={marker}/>
  <Line d="M1056 304 V396" marker={marker}/>
  <Boxes nodes={modelNodes}/>
  <text x="24" y="505" fill="#aab8bf" fontSize="14">Auto: local only when preferred, reachable and available · cloud only when configured</text>
</svg></div><MobilePath items={[{title:'Strict command check',body:'Known commands run through the deterministic command handler.',note:'No model call for matched commands.'},{title:'Provider selection',body:'Configuration chooses auto, Ollama, or a named cloud provider.'},{title:'Local attempt when eligible',body:'Auto mode may try Ollama fast, then stronger local extraction if parsing or useful slots fail.'},{title:'Quality and cloud fallback',body:'If the local result still needs escalation, auto mode can try configured cloud providers in priority order.'},{title:'Structured intent',body:'The selected extraction path returns an intent for downstream validation.'}]}/><figcaption id="jbai-routing-caption">The local branch is conditional; Gemini, OpenAI and Anthropic are configured cloud options. A strict command does not enter this model path.</figcaption></figure>}
export function SafeActionDiagram(){const marker='jbai-action-arrow';return <figure className="jbai-figure" aria-labelledby="jbai-action-caption"><div className="jbai-top"><span>02 / INSTRUCTIONS → ACTION</span><span>Conversational write path · conceptual architecture</span></div><div className="jbai-canvas"><svg viewBox="0 0 1280 640" role="img" aria-labelledby="jbai-action-title jbai-action-desc"><title id="jbai-action-title">How AI instructions become a reviewed Jira action</title><desc id="jbai-action-desc">The request and compact context shape phase-aware semantic instructions and a user prompt. The selected model returns JSON, which is parsed, normalized and validated. Missing details lead to clarification. For a conversational write, the user reviews and confirms a draft before Jira is called; cancellation discards it. The API response determines the reported result.</desc><ArrowDefs id={marker}/>
  <Line d="M280 112 H320 Q328 112 328 104 V88 Q328 80 336 80 H364" marker={marker}/>
  <Line d="M280 144 H336 Q344 144 344 152 V216 H364" marker={marker}/>
  <Line d="M608 80 H656 Q664 80 664 88 V136 Q664 144 672 144 H716" marker={marker}/>
  <Line d="M608 224 H680 Q688 224 688 216 V176 H716" marker={marker}/>
  <Line d="M960 152 H996" marker={marker}/><Line d="M1124 200 V276" marker={marker}/>
  <Line d="M1000 328 H964" marker={marker}/>
  <Line d="M720 328 H680 Q672 328 672 336 V416 Q672 424 664 424 H496 Q488 424 488 432 V452" marker={marker}/>
  <Line d="M608 504 H716" marker={marker}/>
  <Line d="M840 376 V412" marker={marker} dashed/><Line d="M488 552 V588" marker={marker} dashed/>
  <Boxes nodes={actionNodes}/>
  <text x="764" y="433" fill="#aab8bf" fontSize="13">Missing detail → clarify</text>
  <text x="368" y="611" fill="#aab8bf" fontSize="13">Cancel → discard draft</text>
  <text x="976" y="508" fill="#aab8bf" fontSize="13">API outcome decides result</text>
</svg></div><MobilePath items={[{title:'Keep context small',body:'Use the session phase, active issue and latest earlier user message, capped at 200 characters.'},{title:'Design the instructions',body:'A shared semantic contract lists phase-allowed intents and slot rules; the compact user prompt carries relevant state and the new request.'},{title:'Select a model',body:'The configured routing path chooses eligible local or cloud extraction.'},{title:'Parse and check',body:'Parse JSON, validate the intent schema, normalize the worklog, resolve its issue and validate required details.',note:'Invalid or missing details lead to clarification.'},{title:'Review before a write',body:'A conversational worklog becomes a draft. The person confirms it or cancels to discard it.',note:'Read-only requests do not require this approval step.'},{title:'Act and report',body:'Only a confirmed write calls Jira; the actual API response determines success or error.'}]}/><figcaption id="jbai-action-caption">The confirmation branch shown is for conversational writes. Read-only actions can return without a draft; cancellation discards a pending write.</figcaption></figure>}
