import json, html
from pathlib import Path
root=Path(__file__).resolve().parents[1]
INK='#d7e2ea'; MUTED='#aab0bd'; PAPER='#151318'; ACCENT='#cf9aef'; LINE='#8f879a'
def text(x,y,lines,size=16,color=INK,anchor='middle'):
 if isinstance(lines,str): lines=[lines]
 return '<text x="%s" y="%s" text-anchor="%s" fill="%s" font-size="%s">'%(x,y,anchor,color,size)+''.join('<tspan x="%s" dy="%s">%s</tspan>'%(x,0 if i==0 else 23,html.escape(t)) for i,t in enumerate(lines))+'</text>'
def box(x,y,w,h,lines,accent=False,oval=False):
 return '<rect x="%s" y="%s" width="%s" height="%s" rx="%s" fill="%s" stroke="%s"/>'%(x,y,w,h,20 if oval else 8,'#282030' if accent else PAPER,ACCENT if accent else LINE)+text(x+w/2,y+h/2-((len(lines)-1)*23/2)+6,lines)
def diamond(x,y,w,h,lines,accent=False):
 return '<path d="M %s %s L %s %s L %s %s L %s %s Z" fill="%s" stroke="%s"/>'%(x+w/2,y,x+w,y+h/2,x+w/2,y+h,x,y+h/2,'#282030' if accent else PAPER,ACCENT if accent else LINE)+text(x+w/2,y+h/2-((len(lines)-1)*23/2)+6,lines)
def arrow(d,slug): return '<path d="%s" fill="none" stroke="%s" stroke-width="1.5" marker-end="url(#%s-arrow)"/>'%(d,LINE,slug)
def label(x,y,s): return '<rect x="%s" y="%s" width="48" height="28" fill="%s"/>'%(x-24,y-19,PAPER)+text(x,y,s,12,MUTED)
def svg(slug,title,desc,height,body):
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 %s" role="img" aria-labelledby="%s-title %s-desc" style="font-family:Kanit,sans-serif;width:100%%;min-width:960px;display:block"><title id="%s-title">%s</title><desc id="%s-desc">%s</desc><defs><marker id="%s-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="%s"/></marker></defs>%s</svg>'%(height,slug,slug,slug,title,slug,desc,slug,LINE,body)
s='intent-decision'
# Preserve all meaningful source gates; collapse only pass-through Continue nodes.
b=''.join(arrow(d,s) for d in [
'M 400 88 V 120','M 400 216 V 256','M 400 320 V 360','M 560 408 H 680','M 400 456 V 496','M 400 592 V 632','M 400 728 V 768','M 400 864 V 904','M 560 952 H 680','M 400 1000 V 1040',
'M 240 680 H 72 Q 64 680 64 688 V 1080 Q 64 1088 72 1088 H 260',
'M 240 816 H 136 Q 128 816 128 824 V 1064 Q 128 1072 136 1072 H 260',
'M 800 992 V 1112 Q 800 1120 792 1120 H 540'])
b+=''.join(label(x,y,t) for x,y,t in [(400,240,'Yes'),(620,412,'No'),(400,480,'Yes'),(400,616,'Yes'),(400,752,'No'),(400,888,'Yes'),(400,1024,'Yes'),(620,956,'No'),(180,684,'Yes'),(184,820,'No')])
b+=box(280,32,240,56,['User prompt'],oval=True)
b+=diamond(240,120,320,96,['Is the request','understood?'])
b+=box(240,256,320,64,['Identify meaningful','requirements'])
b+=diamond(240,360,320,96,['Are capabilities and','entities supported?'])
b+=box(680,368,240,80,['Unsupported','Explain the limitation'])
b+=diamond(240,496,320,96,['Can the requirement','be resolved?'])
b+=diamond(240,632,320,96,['Is there a safe /','default interpretation?'])
b+=diamond(240,768,320,96,['Would ambiguity materially','change the service?'],True)
b+=diamond(240,904,320,96,['Can it be uniquely','resolved?'])
b+=box(680,912,240,80,['Clarification required','Ask one question'],True)
b+=box(260,1040,280,96,['Ready to generate','Generate service'],oval=True)
b+=text(48,1192,'Diamond = decision     Rounded rectangle = action / outcome',12,MUTED,'start')
decision=svg(s,'The pre-generation decision framework','Understand the request and establish support, then check resolution, safe defaults, material ambiguity and unique resolution before generating or asking one question; unsupported capabilities stop generation.',1224,b)
s='intent-iteration'
b=arrow('M 316 136 H 356',s)+arrow('M 628 136 H 668',s)
for x,w,step,heading,lines in [(40,276,'EXPLORED','Prompt Dissector',['Expose the decisions','Hidden cost: more architecture']),(356,272,'REFINED APPROACH','AI instructions',['Retain the useful reasoning','Reduce mechanism complexity']),(668,252,'DEVELOPMENT INTEGRATION','Jev + engineering',['Evaluate structured decisions','Exact release scope unverified'])]:
 b+=text(x,52,step,12,ACCENT if x==356 else MUTED,'start')
 b+=box(x,84,w,104,[heading],x==356)
 b+=text(x,232,lines,14,MUTED,'start')
b+=text(40,308,'Design evolution • Undated sequence, not an implementation timeline',12,MUTED,'start')
iteration=svg(s,'Simplifying the mechanism','Prompt Dissector was explored, AI instructions refined the approach, and Jev was evaluated and integrated with engineering in development; this is an undated design evolution.',340,b)
s='intent-architecture'
b=''.join(arrow(d,s) for d in ['M 240 112 H 312','M 640 112 H 712','M 752 168 V 232 Q 752 240 744 240 H 168 Q 160 240 160 248 V 312','M 800 168 V 256 Q 800 264 792 264 H 480 Q 472 264 472 272 V 312','M 848 168 V 312','M 160 392 V 448 Q 160 456 168 456 H 336','M 472 392 V 424'])
b+=box(40,64,200,96,['User request'],oval=True)
b+=box(312,64,328,96,['Intent understanding','Refined AI instructions'])
b+=box(712,56,208,112,['Pre-generation','decision layer'],True)
b+=box(40,312,240,80,['Generate'])
b+=box(352,312,240,80,['Ask one question'])
b+=box(680,312,240,80,['Explain unsupported','Stop this generation'])
b+=box(336,424,272,80,['Catalog Curator','Service draft'],True)
b+=text(40,552,'Jev involvement is conceptual here; actual placement and runtime topology are unverified.',14,MUTED,'start')
b+=text(40,588,'Solid arrows = conceptual interaction paths • No production API or schema is implied',12,MUTED,'start')
architecture=svg(s,'Conceptual interaction model','A request passes through intent understanding and a pre-generation decision layer; generate and clarified requests lead to a Catalog Curator draft, while unsupported generation stops.',620,b)
data={'decision':decision,'iteration':iteration,'architecture':architecture}
(root/'src/data/intentDiagrams.json').write_text(json.dumps(data,indent=2))
d=(root/'docs/intent-full-diagrams');d.mkdir(exist_ok=True)
for key,value in data.items():
 (d/(key+'.html')).write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Intent Identification — '+key+'</title><style>body{margin:0;padding:32px;background:'+PAPER+';color:'+INK+';font-family:Kanit,sans-serif}h1{font-size:28px;font-weight:500}.diagram{overflow-x:auto;width:100%}svg{width:100%;min-width:960px}@media print{.diagram{overflow:visible}svg{min-width:0}}</style><h1>Intent Identification / '+key+'</h1><div class="diagram" tabindex="0" role="region" aria-label="Scrollable '+key+' diagram">'+value+'</div></html>')
