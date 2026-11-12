export type HomeTestimonial = {
  id: string;
  original: string | null;
  unfiltered: string | null;
  author: string | null;
  role: string | null;
};

export const homeTestimonials: HomeTestimonial[] = [
  {id:'sumit-seth',original:"Saurabh you're a rockstar! How are you always so ahead of everyone? Figma literally released agents last week! I'm loving these AI experiments that you are doing.",unfiltered:"He is lazy AF and that's why he finds easier ways and shortcuts to automate mundane tasks.",author:'Sumit Seth',role:'Director of UX · BMC Helix'},
  {id:'kaushik-shah',original:'Whenever I have an idea I run it through Saurabh before wasting my tokens on AI copilots or frontier AI models.',unfiltered:'He is my frontier model but he is never on time. His work is always ahead of the time. He meets deadlines but he will never come to office before me.',author:'Kaushik Shah',role:'Program Manager · BMC Helix'},
  {id:'dexter-galindo',original:'I would have never been able to scale up my design system to 32 brands. Saurabh made a significant contribution to our design system and it works flawlessly without having to buy an enterprise plan.',unfiltered:'With repeated design feedback, of course. That is how we managed to build such a big design system.',author:'Dexter Galindo',role:'UX Manager · Neighbourly'},
  {id:'shweta-bapat',original:'Saurabh brought the same attention to our online store that we put into our sarees. He cares about how the brand feels, right down to the smallest detail.',unfiltered:'Asked him to fix the website. Now even our buttons have standards.',author:'Shweta Bapat',role:'Co-founder · Sawenchi'},
  {id:'vaibhav-nigam',original:'Saurabh brought clarity to a complex battery monitoring system. He gave the interface the same care and attention as the technology behind it.',unfiltered:'Asked him to monitor batteries. He started monitoring the spacing between every label.',author:'Vaibhav Nigam',role:'Project Manager · Maxwell Energy'},
  {id:'akash-shetty',original:"Saurabh taught me how to bring structure to a project without losing sight of the people doing the work. Having him as both a mentor and my best friend means there's always someone I can turn to when things get messy.",unfiltered:'Mentor, best friend, and the reason I now ask “what’s the actual deadline?” before I say hello.',author:'Akash Shetty',role:'Performance Marketer and Project Manager · Good Game'},
];
