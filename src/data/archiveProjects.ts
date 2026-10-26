export type ArchiveChapter = {
  label: string;
  title: string;
  copy: string;
  images: number[];
  caption?: string;
};

export type ArchiveProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  eyebrow: string;
  headline: string;
  lead: string;
  tags: string[];
  hero: number;
  source: string;
  sourceLabel: string;
  chapters: ArchiveChapter[];
};

export const archiveProjects: ArchiveProject[] = [
  {
    slug: 'farmer-logistics', title: 'Logistics Solutions for Farmers', category: 'Product design · System design', year: '2024',
    eyebrow: 'FARMERS + TRANSPORT', headline: 'A route from harvest to market.', lead: 'A concept for helping farmers with smaller yields arrange transport to nearby markets and warehouses.',
    tags: ['Research', 'Service concept', 'Prototype'], hero: 0,
    source: 'https://logistics-solutions-for--rptmr10.gamma.site/', sourceLabel: 'Original presentation',
    chapters: [
      {label: '01 / FIELDWORK', title: 'Start with the journey of the goods.', copy: 'The original case study documents conversations with farmers, truck drivers, market vendors, and contractors in Madhya Pradesh. It maps the handoffs around harvest, loading, transport, and sale.', images: [9, 10, 13, 16], caption: 'Field and transport photographs from the original presentation.'},
      {label: '02 / OPPORTUNITY', title: 'Connect small loads and empty returns.', copy: 'The proposed network explores shared deliveries between nearby farmers, direct connections to receivers, and return trips for vehicles that would otherwise travel empty.', images: [48, 49, 50, 51], caption: 'Original opportunity diagrams.'},
      {label: '03 / DESIGN', title: 'Design for online and offline access.', copy: 'The concept includes an offline registration form, information architecture for farmers and receivers, and mobile wireframes. The published prototype remains available from the original presentation.', images: [30, 31, 32, 33, 35, 36], caption: 'Original form, flows, and wireframes.'},
      {label: '04 / PROTOTYPE', title: 'Bring the concept into motion.', copy: 'The original presentation closes with an animated view of the proposed product. This is a prototype study, with no published deployment outcome.', images: [52], caption: 'Original final-product animation.'},
    ],
  },
  {
    slug: 'onverity-design-system', title: 'Onverity Design System', category: 'Design systems', year: '2024',
    eyebrow: 'ONE SYSTEM · MULTIPLE BRANDS', headline: 'Give every brand a shared foundation.', lead: 'A design system for Onverity, formerly Neighbourly, built from shared primitives across its sub-brands.',
    tags: ['Figma variables', 'Brand themes', 'Design tokens'], hero: 2,
    source: 'https://seeyourmaker.tumblr.com/complex-design-system', sourceLabel: 'Original case study',
    chapters: [
      {label: '01 / FOUNDATION', title: 'Find what the brands share.', copy: 'The team reviewed eight sub-brand style guides and defined common color, type, and icon primitives while keeping room for brand-specific expression.', images: [4, 5], caption: 'Brand structure and variable setup from the original story.'},
      {label: '02 / VARIABLES', title: 'Turn color tokens into usable themes.', copy: 'Colors were exported from Figma through Tokens Studio, reorganized as JSON, and imported back as variables. The case study describes splitting seven brands across two theme collections to work within the available Figma modes.', images: [6, 7, 8, 9], caption: 'Original export, variables, and theme collections.'},
      {label: '03 / APPLICATION', title: 'Carry the system into screens.', copy: 'The source shows the tokens applied to product UI and motion demonstrations. It credits Dexter Galindo, Christopher Martinez, and Chau Nguyen as collaborators.', images: [10, 11, 12], caption: 'Original UI captures and animated examples.'},
    ],
  },
  {
    slug: 'accessible-mobile-cover', title: 'Accessible Mobile Cover', category: 'Accessibility · Product concept', year: '2023',
    eyebrow: 'TACTILE ACCESS TO MESSAGES', headline: 'A phone cover imagined for private reading.', lead: 'A concept for a mobile cover that could present notifications and messages as temporary Braille on its back.',
    tags: ['Accessibility concept', 'Physical product', 'Prototype'], hero: 20,
    source: 'https://gamma.app/public/Accessible-Design-for-Special-Needs-3orbw1e2aah77hg', sourceLabel: 'Original presentation',
    chapters: [
      {label: '01 / PREMISE', title: 'Make information tactile.', copy: 'The proposal combines a Braille input surface, temporary raised output, a rechargeable battery, and phone pairing. These are proposed features, not a manufactured product.', images: [7, 8], caption: 'Early form explorations from the original presentation.'},
      {label: '02 / STRUCTURE', title: 'Map the interaction before polishing it.', copy: 'The source moves from task analysis and flows to low-fidelity phone screens, then to a visual prototype.', images: [5, 6, 9, 10, 11, 12], caption: 'Original mapping and early wireframes.'},
      {label: '03 / PROTOTYPE', title: 'Show the intended experience.', copy: 'High-fidelity screens and a final product image illustrate the interaction. The published case study describes the concept as awaiting further development.', images: [14, 17, 18, 19, 20], caption: 'Original prototype screens and final concept image.'},
    ],
  },
  {
    slug: 'smart-watch-strap', title: 'Smart Watch with LED Strap', category: 'Wearable · Product concept', year: '2023',
    eyebrow: 'A SCREEN BEYOND THE WATCH FACE', headline: 'Let the strap join the interface.', lead: 'A wearable concept that extends personalization, information, and music controls onto an illuminated watch strap.',
    tags: ['Wearable concept', 'Interaction design', 'Prototype'], hero: 2,
    source: 'https://gamma.app/public/Smart-Watch-with-LED-strap-jqswzh3376c6p3v', sourceLabel: 'Original presentation',
    chapters: [
      {label: '01 / FORM', title: 'Explore a strap that can change.', copy: 'The original presentation begins with physical-form and technology explorations, including rendered directions for a display integrated with the strap.', images: [1, 3, 4, 6], caption: 'Original form and information architecture studies.'},
      {label: '02 / USE', title: 'Move familiar tasks onto the wrist.', copy: 'The scenarios cover changing the strap appearance, viewing notifications, tracking activity, and following music lyrics. Wireframes test how these moments might fit the form.', images: [7, 8, 13, 14], caption: 'Original low-fidelity interaction screens.'},
      {label: '03 / DETAIL', title: 'A more expressive wearable UI.', copy: 'High-fidelity designs show alternate strap treatments and watch interactions. The work is presented as a concept rather than a released device.', images: [18, 20, 22, 25, 28], caption: 'Original high-fidelity explorations.'},
    ],
  },
  {
    slug: 'city-buddy', title: 'City Buddy', category: 'Mobility · App concept', year: '2023',
    eyebrow: 'PUBLIC TRANSPORT IN ONE PLACE', headline: 'Make city travel easier to piece together.', lead: 'A multimodal navigation app concept for people combining public transport and walking in familiar or unfamiliar cities.',
    tags: ['UX research', 'Journey mapping', 'App concept'], hero: 0,
    source: 'https://gamma.app/public/City-Buddy-kg0sz6eck3izjrx', sourceLabel: 'Original presentation',
    chapters: [
      {label: '01 / PROBLEM', title: 'Too many places to plan one trip.', copy: 'The source describes fragmented transport information and compares existing services such as Chalo and M-indicator.', images: [1, 2, 3], caption: 'Original presentation cover and service references.'},
      {label: '02 / RESEARCH', title: 'Ask commuters what they need.', copy: 'The case study records a seven-person group discussion. Participants emphasized schedules, real-time tracking, bookings, and route planning in one place.', images: [8], caption: 'Original user journey map.'},
      {label: '03 / DIRECTION', title: 'A single multimodal view.', copy: 'The proposed app brings route and transport choices together. The source includes personas, empathy maps, usability analysis, wireframes, and visual design work.', images: [0], caption: 'Original City Buddy app cover.'},
    ],
  },
  {
    slug: 'facebook-dark-theme', title: 'Facebook Dark Theme', category: 'UI motion concept', year: '2018',
    eyebrow: 'ONE INTERFACE · ANOTHER MOOD', headline: 'Reimagine Facebook after dark.', lead: 'A short animated visual exploration of a dark theme for the Facebook app.',
    tags: ['UI concept', 'Motion', 'Dark theme'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/179378651953', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / MOTION STUDY', title: 'The original interaction study.', copy: 'The Tumblr post contains an eight-second video and a poster frame. The concept is shown here as originally published.', images: [0, 1], caption: 'Original video poster and motion study.'}],
  },
  {
    slug: 'dominar-app', title: 'Dominar App', category: 'Connected product · App concept', year: '2018',
    eyebrow: 'MOTORCYCLE + MOBILE', headline: 'Put the ride in the rider’s hand.', lead: 'A visual app concept for Dominar riders, presented through registration, remote access, dashboard, and settings screens.',
    tags: ['App UI', 'Motorcycle', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/179378566937', sourceLabel: 'Original Tumblr post',
    chapters: [
      {label: '01 / CONNECT', title: 'Register the bike.', copy: 'The published sequence starts with a QR-based vehicle registration screen.', images: [1, 2], caption: 'Original registration screens and animation.'},
      {label: '02 / CONTROL', title: 'See and control the ride.', copy: 'The remaining visuals show remote access, performance information, and a settings overlay.', images: [3, 4, 5], caption: 'Original remote, dashboard, and settings designs.'},
    ],
  },
  {
    slug: 'get-going', title: 'Get Going', category: 'Fitness app · UI concept', year: '2018',
    eyebrow: 'FITNESS AT A GLANCE', headline: 'Make each day’s progress visible.', lead: 'A bright fitness app visual study with activity rings, daily goals, and reward cards.',
    tags: ['App UI', 'Fitness', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/174537325477', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / VISUAL STUDY', title: 'From welcome to activity.', copy: 'The original images show the app cover, a short style guide, and dashboard variations. No usage or launch outcome was published with the post.', images: [1, 2, 3], caption: 'Original Get Going app screens.'}],
  },
  {
    slug: 'bookie', title: 'Bookie', category: 'Ticket booking · UI concept', year: '2018',
    eyebrow: 'TICKETS IN A FEW TAPS', headline: 'Find a show. Keep the ticket close.', lead: 'An app UI visual study for discovering events and holding a booking on a phone.',
    tags: ['App UI', 'Tickets', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/174537198857', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / VISUAL STUDY', title: 'Discovery to booking.', copy: 'The published sequence includes a cover, style guide, animated browsing screens, and ticket or seat-selection views.', images: [1, 2, 3], caption: 'Original Bookie screens and GIF.'}],
  },
  {
    slug: 'skye-smartwatch', title: 'Skye Smartwatch UI', category: 'Wearable · UI concept', year: '2018',
    eyebrow: 'A COMPACT WATCH INTERFACE', headline: 'Small screens, clear moments.', lead: 'A smartwatch UI challenge exploring glanceable screens in a dark visual style.',
    tags: ['Wearable UI', 'Visual archive'], hero: 1,
    source: 'https://seeyourmaker.tumblr.com/post/174537102927', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / VISUAL STUDY', title: 'A set of watch-sized states.', copy: 'The original Tumblr post contains one animated cover and a sheet of smartwatch interface variations.', images: [0, 1], caption: 'Original Skye animation and screen study.'}],
  },
  {
    slug: 'you-fashion', title: 'YOU', category: 'Brand identity · Fashion', year: '2018',
    eyebrow: 'MAKE THE DIFFERENCE', headline: 'A bright identity for YOU.', lead: 'A fashion identity study built around a yellow wordmark, stationery, packaging, and campaign imagery.',
    tags: ['Brand identity', 'Campaign', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/174536387637', sourceLabel: 'Original Tumblr post',
    chapters: [
      {label: '01 / IDENTITY', title: 'A mark made to stand out.', copy: 'The published images show the wordmark applied to tags, bags, stationery, and apparel.', images: [1, 2], caption: 'Original identity applications.'},
      {label: '02 / CAMPAIGN', title: 'Carry the voice into imagery.', copy: 'Editorial compositions extend the identity with fashion photography and short campaign lines.', images: [3, 4, 5], caption: 'Original campaign visuals.'},
    ],
  },
  {
    slug: 'logofolio', title: 'Logofolio', category: 'Brand marks · Collection', year: '2018',
    eyebrow: 'A COLLECTION OF MARKS', headline: 'Many identities. One visual archive.', lead: 'A published collection of logo marks, including Avaviya, Jagatp Events, JewelSmart, Omara, UDENT, and YOU.',
    tags: ['Logos', 'Brand identity', 'Collection'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/174380983312', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / COLLECTION', title: 'Explore the marks.', copy: 'The original post is a gallery rather than a written case study. The marks are preserved in their published order below.', images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], caption: 'Original logo collection.'}],
  },
  {
    slug: 'udent', title: 'UDENT', category: 'Brand identity · Dental', year: '2018',
    eyebrow: 'THE TRUE TEST SMILE BACK', headline: 'A dental identity with a friendly signal.', lead: 'A blue dental brand mark applied across business cards, stationery, and presentation materials.',
    tags: ['Brand identity', 'Stationery', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/173729226922', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / APPLICATION', title: 'From mark to materials.', copy: 'The original post provides three brand visuals. It does not publish a brief, launch outcome, or business metrics.', images: [0, 1, 2], caption: 'Original UDENT identity applications.'}],
  },
  {
    slug: 'avaviya-reading', title: 'Avaviya Reading', category: 'Brand identity', year: '2018',
    eyebrow: 'GOOD VIBES IN GOLD', headline: 'An identity with a patterned presence.', lead: 'A gold geometric mark carried across cards, packaging, apparel, and stationery.',
    tags: ['Brand identity', 'Applications', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/173729150632', sourceLabel: 'Original Tumblr post',
    chapters: [{label: '01 / APPLICATION', title: 'The mark across touchpoints.', copy: 'The published gallery shows four identity applications. The source offers imagery without a written project narrative.', images: [0, 1, 2, 3], caption: 'Original Avaviya identity images.'}],
  },
  {
    slug: 'al-forno', title: 'Al Forno', category: 'Brand identity · Food', year: '2018',
    eyebrow: 'ALL ABOUT BAKING', headline: 'A bakery identity made for appetite.', lead: 'A red-and-black identity study with packaging, stationery, and launch-themed social graphics.',
    tags: ['Brand identity', 'Social graphics', 'Visual archive'], hero: 0,
    source: 'https://seeyourmaker.tumblr.com/post/173729144102', sourceLabel: 'Original Tumblr post',
    chapters: [
      {label: '01 / IDENTITY', title: 'A mark and a distinct palette.', copy: 'The original gallery opens with the logo, then applies it to cards and stationery.', images: [1, 2], caption: 'Original brand applications.'},
      {label: '02 / CAMPAIGN', title: 'Carry it into social posts.', copy: 'The remaining images are campaign-style graphics, including a New Year greeting and launch teasers. They are visual studies, not evidence of a launch.', images: [3, 4, 5, 6, 7], caption: 'Original social graphics.'},
    ],
  },
];

export const archiveProjectBySlug = Object.fromEntries(archiveProjects.map(project => [project.slug, project])) as Record<string, ArchiveProject>;
