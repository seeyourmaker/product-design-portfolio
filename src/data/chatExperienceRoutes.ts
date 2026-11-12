export const chatExperiencePath='/projects/redesigning-chat-experience';
export const chatExperienceQuickLookPath=`${chatExperiencePath}/quick-look`;
export const isChatExperiencePath=(path:string)=>[chatExperiencePath,`${chatExperiencePath}/full`].includes(path.replace(/\/$/,''));
export const isChatExperienceQuickLookPath=(path:string)=>path.replace(/\/$/,'')===chatExperienceQuickLookPath;
export function canonicalPortfolioPath(pathname:string){
  const clean=pathname.replace(/\/$/,'');
  if(clean==='/projects/catalog-curator-revamp'||clean==='/projects/catalog-curator-revamp/full')return chatExperiencePath;
  if(clean==='/projects/catalog-curator-revamp/quick-look')return chatExperienceQuickLookPath;
  return clean;
}
