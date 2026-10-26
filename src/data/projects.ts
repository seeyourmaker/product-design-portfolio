export interface FeaturedProject {
  slug: string
  title: string
  category: string
  description: string
  navigationTarget: string
  thumbnail: {
    variant: 'catalog' | 'intent' | 'worklog' | 'icons'
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
    slug: 'catalog-curator-revamp',
    title: 'You cant always chat',
    category: 'Design · Re-imagining interaction',
    description: 'Changing the way we chat with AI assistants',
    navigationTarget: '/projects/catalog-curator-revamp',
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
]
