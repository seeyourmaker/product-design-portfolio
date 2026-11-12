import {memo} from 'react';
import './HeroCircularText.css';

const terms = 'Product Design · User Experience · User Interface · UX Research · Design Thinking · Interaction Design · Visual Design · Product Strategy · Information Architecture · User Journeys · Wireframing · Prototyping · Usability Testing · User Flows · Empathy Mapping · Journey Mapping · Design Systems · Design Tokens · Component Libraries · Accessibility · Microinteractions · Design Patterns · Conversational UX · UX Writing · Product Discovery · Service Design · Design Iteration · Problem Solving · Human-Centered Design · User Behavior · Creative Coding · Motion Design · Interactive Experiences · Rapid Prototyping · Visual Storytelling · Scrollytelling · Design Engineering · Generative AI · Agentic AI · AI Copilots · Prompt Engineering · Context Engineering · Human-AI Interaction · Intelligent Automation · Natural Language Processing · Figma · FigJam · Photoshop · Illustrator · After Effects · HTML · CSS · JavaScript · TypeScript · React · Angular · GSAP · Framer Motion · Cursor · Codex'.split(' · ');

// Even radial spacing between the outer and inner Figma circles.
const outerDiameter = 1579;
const innerDiameter = 285;
const termCounts = [11, 10, 9, 8, 7, 5, 4, 4, 2];
const durations = [115, 105, 96, 87, 79, 71, 63, 55, 47];
const rings = termCounts.map((count, index) => ({
  diameter: outerDiameter - index * (outerDiameter - innerDiameter) / (termCounts.length - 1),
  count,
  duration: durations[index],
}));

export const HeroCircularText = memo(function HeroCircularText() {
  let start = 0;

  return <svg className="hero-circular-text" viewBox="0 0 1800 1800" aria-hidden="true" focusable="false">
    <defs>
      {rings.map(({diameter}, index) => {
        const radius = diameter / 2;
        return <path key={diameter} id={`hero-circle-${index}`} d={`M 900 ${900 - radius} A ${radius} ${radius} 0 1 1 899.99 ${900 - radius}`} />;
      })}
    </defs>
    {rings.map(({diameter, count, duration}, index) => {
      const group = terms.slice(start, start + count).join(' · ') + ' · ';
      start += count;
      const charactersNeeded = Math.ceil(Math.PI * diameter / (36 * .55));
      const content = group.repeat(Math.ceil(charactersNeeded / group.length) + 1);

      return <g key={diameter} className={`hero-circular-ring${index % 2 ? ' hero-circular-ring--reverse' : ''}`} style={{animationDuration: `${duration}s`}}>
        <text><textPath href={`#hero-circle-${index}`}>{content}</textPath></text>
      </g>;
    })}
  </svg>;
});
