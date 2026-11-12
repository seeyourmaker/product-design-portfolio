export interface FeaturedProject {
  slug: string
  title: string
  category: string
  description: string
  navigationTarget: string
  thumbnail: {
    variant: 'catalog' | 'intent' | 'worklog' | 'icons' | 'gigs'
    label: string
  }
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'intent-identification',
    title: 'Inside the Mind of an AI',
    category: 'AI · Intent identification',
    description: "Enhancing AI assistant's grasp of complex requests, including JEV and design.",
    navigationTarget: '/projects/intent-identification',
    thumbnail: { variant: 'intent', label: 'Intent Identification' },
  },
  {
    slug: 'redesigning-chat-experience',
    title: 'You can’t always chat',
    category: 'Design · Re-imagining interaction',
    description: 'Making AI conversations easier through structured choices, contextual components, and shortcuts.',
    navigationTarget: '/projects/redesigning-chat-experience',
    thumbnail: { variant: 'catalog', label: 'Ease up the experience!' },
  },
  {
    slug: 'jira-worklog-assistant',
    title: 'Jira Worklog Assistant',
    category: 'AI · Productivity',
    description: 'An AI-assisted Jira productivity tool built over a weekend.',
    navigationTarget: '/projects/jira-worklog-assistant',
    thumbnail: { variant: 'worklog', label: 'Worklog Assistant' },
  },
  {
    slug: 'adapt-icon-finder',
    title: 'ADAPT ICON FINDER',
    category: 'Figma Plugin · Icon Discovery',
    description: 'Find and reuse ADAPT icons without leaving Figma. A small internal plugin built with AI assistance.',
    navigationTarget: '/projects/adapt-icon-finder',
    thumbnail: { variant: 'icons', label: 'ADAPT ICON FINDER' },
  },
  {
    slug: 'local-gigs',
    title: 'Local Gigs',
    category: 'Independent music · Ticketing',
    description: 'A mobile-first gig discovery and booking concept built around independent artists, small venues, and direct UPI checkout.',
    navigationTarget: '/projects/local-gigs',
    thumbnail: { variant: 'gigs', label: 'LOCAL GIGS' },
  },
]
