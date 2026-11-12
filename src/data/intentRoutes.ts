export const intentCaseStudyPath='/projects/intent-identification';
export const isIntentCaseStudyPath=(path:string)=>[intentCaseStudyPath,`${intentCaseStudyPath}/full`].includes(path.replace(/\/$/,''));
export const intentQuickLookPath=`${intentCaseStudyPath}/quick-look`;
