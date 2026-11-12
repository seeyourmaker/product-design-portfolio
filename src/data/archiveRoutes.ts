import {archiveProjectBySlug} from './archiveProjects';

export const archiveListingPath='/projects';
export const getArchiveSlug=(path:string)=>{
  const match=path.replace(/\/$/,'').match(/^\/projects\/([^/]+)$/);
  return match&&archiveProjectBySlug[match[1]]?match[1]:null;
};
