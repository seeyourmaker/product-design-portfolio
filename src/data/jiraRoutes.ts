export const jiraBroCaseStudyPath='/projects/jira-worklog-assistant';
export const isJiraBroPath=(path:string)=>[jiraBroCaseStudyPath,`${jiraBroCaseStudyPath}/full`].includes(path.replace(/\/$/,''));
export const jiraBroQuickLookPath=`${jiraBroCaseStudyPath}/quick-look`;
export const isJiraBroQuickLookPath=(path:string)=>path.replace(/\/$/,'')===jiraBroQuickLookPath;
