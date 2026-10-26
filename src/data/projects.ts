export type Category = 'product' | 'marketing' | 'design';

export interface Project {
  id: string;
  title: string;
  date: string;
  cat: Category;
  kind: string;
  teaser: string;
  summary: string;
  body: string[];
  tags: string[];
  featured?: boolean;
  /** Files attached on LinkedIn, saved to /public/projects/<id>/<slug>/NN.jpg (+ cover.jpg) */
  files?: Enclosure[];
  link?: { label: string; href: string; note: string; logo?: string };
}

export interface Enclosure {
  slug: string;
  title: string;
  kind: 'deck' | 'image';
  pages: number;
  w: number;
  h: number;
}

export const categories: Record<Category, string> = {
  product: 'Product',
  marketing: 'Marketing',
  design: 'Design',
};

// Newest first. Source: LinkedIn → Projects.
export const projects: Project[] = [
  {
    id: 'calmcampus',
    title: 'CalmCampus',
    date: 'Apr 2026 — now',
    cat: 'product',
    kind: 'Startup · KICK Challenge finalist',
    teaser: 'A privacy-first app that spots student burnout early.',
    summary: 'A privacy-first mobile app that spots early signs of student stress and burnout, before they escalate.',
    body: [
      'Developed for the KU Leuven KICK Challenge 2026, where it reached the finals with a preventive approach to student wellbeing. The app builds a personal baseline from signals already on a student’s phone (typing patterns, app usage, screen-on time and sleep rhythms) and on-device AI flags meaningful changes that may point to elevated stress. Raw data never leaves the device, so it is designed to be GDPR-native and privacy-preserving.',
      'When warning signs appear, it offers evidence-based micro-interventions: breathing exercises, mindfulness prompts, break reminders, peer-connection nudges and, when needed, referrals to campus counselling. Through a university licensing model, students use it for free while institutions receive anonymised wellbeing insights.',
      'By combining passive sensing, on-device AI, federated learning and university integration, CalmCampus moves student mental health support from reactive to preventive.',
    ],
    tags: ['Pitch & Presentation', 'Entrepreneurship', 'On-device AI', 'Federated learning', 'GDPR'],
    files: [
      { slug: 'pitch-deck', title: 'Pitch deck', kind: 'deck', pages: 8, w: 1280, h: 720 },
      { slug: 'selection-email', title: 'KICK selection email', kind: 'image', pages: 1, w: 1280, h: 778 },
    ],
    link: { label: 'CalmCampus website', href: 'https://cc.braunf.com/', note: 'cc.braunf.com', logo: '/projects/calmcampus/logo.svg' },
    featured: true,
  },
  {
    id: 'ray-jules-tactics',
    title: 'Ray & Jules: strategy & tactics',
    date: 'Apr — Jun 2026',
    cat: 'marketing',
    kind: 'Strategic marketing course',
    teaser: 'Three strategies for a solar-roasted coffee brand.',
    summary: 'Three alternative strategies for a solar-roasted Belgian coffee brand. One was chosen and built into a marketing mix.',
    body: [
      'A follow-up to our analysis of Ray & Jules, a Belgian coffee brand that roasts premium coffee with solar energy. Starting from an updated SWOT, we developed three strategies, each built around its own buyer persona, positioning statement and core idea: becoming the reference standard for home-espresso enthusiasts; making sustainability visible, provable and comparable for eco-conscious drinkers; and removing every barrier to switching for supermarket coffee buyers ready to upgrade.',
      'After presenting the options and refining them with our lecturer’s feedback, we picked one strategy and developed it into first ideas for the full marketing mix (product, price, place, promotion) and the KPIs to measure it. We finished with an original video.',
    ],
    tags: ['Marketing strategy', 'Buyer personas', 'Positioning', 'KPIs'],
    files: [
      { slug: 'strategy-deck', title: 'Strategy & tactics deck', kind: 'deck', pages: 23, w: 1280, h: 720 },
    ],
  },
  {
    id: 'study-far-far-away',
    title: '“Study Far Far Away”',
    date: 'Feb — Jun 2026',
    cat: 'marketing',
    kind: 'Digital marketing campaign',
    teaser: 'A fairytale campaign for international students.',
    summary: 'A fairytale-style campaign to attract international students to a Business Management programme.',
    body: [
      'A semester-long group project for the BME programme at UC Leuven-Limburg. We audited the programme’s website and socials, chose the theme “Study in Europe for International Students” and built a persona: Manon, an 18-year-old French high-school student who wants “a real, fun international experience, not just a semester abroad.” Keyword research (Semrush, Ahrefs, AnswerThePublic, Google Trends, Reddit social listening) fed a topic cluster and an SEO-optimised website: one pillar page linking to four cluster pages. I wrote the pillar page and checked the site’s SEO.',
      'The campaign tells each student’s journey as a fairytale across the customer journey, from September to the May info session: awareness (“She dreamed to study beyond borders…”) with trend-based TikToks and Reels, consideration (“…And she did”) with day-in-the-life videos, carousels and a testimonial, and conversion (“…And so can you!”) with a campus tour and info-session sign-ups. We used generative AI responsibly for brainstorming, wording and website support, and I oversaw how the group applied it.',
    ],
    tags: ['Digital marketing', 'SEO', 'Content strategy', 'Semrush', 'Social media'],
    files: [
      { slug: 'campaign-deck', title: 'Campaign deck', kind: 'deck', pages: 48, w: 1280, h: 720 },
    ],
  },
  {
    id: 'ray-jules-plan',
    title: 'Ray & Jules: strategic plan',
    date: 'Mar — May 2026',
    cat: 'marketing',
    kind: 'Strategic marketing course',
    teaser: 'A full strategic analysis of a coffee brand.',
    summary: 'A full strategic analysis of a sustainable coffee brand, ending in a SWOT and growth recommendations.',
    body: [
      'We met every Friday and did every part of the analysis together, so each of us could present and defend the whole plan in the oral Q&A. Internally we mapped positioning with the Abell model, reviewed the marketing mix and assessed brand equity with Keller’s CBBE pyramid. We built two personas, a sustainability-driven current buyer and a convenience-and-price-driven potential buyer, and compared them with value curves and a perceptual map.',
      'Externally we analysed distribution at macro, meso and micro level, compared Ray & Jules with a direct competitor (Wide Awake) and an indirect one (Nespresso), and used TrendWatching to pick one trend as an opportunity and one as a threat. The SWOT showed strong differentiation through roasting technology and sustainability, but low awareness, premium pricing and heavy reliance on direct-to-consumer sales. Our conclusion: expand beyond the niche, become more visible in everyday life and be present where people actually buy coffee.',
    ],
    tags: ['Marketing strategy', 'SWOT', 'Brand equity', 'Competitor analysis'],
    files: [
      { slug: 'strategic-plan', title: 'Strategic marketing plan', kind: 'deck', pages: 28, w: 1280, h: 720 },
    ],
  },
  {
    id: 'next-level-challenge',
    title: 'Next Level Challenge',
    date: 'Mar 2026',
    cat: 'product',
    kind: '24-hour hackathon',
    teaser: 'An AI investment app, built in 24 hours.',
    summary: 'An AI investment app that adapts its interface and advice to each individual user.',
    body: [
      'A 24-hour hackathon organised by NEXT Leuven, working on a real-world case by InvestSuite. We built an AI-powered investment app using the Claude API that dynamically adapts its interface and recommendations to the individual user.',
      'Scored 80/100 overall (40/50 technical, 40/50 business), with jury feedback highlighting great design and strong product thinking.',
    ],
    tags: ['Product design', 'Pitching ideas', 'Claude API'],
    files: [
      { slug: 'hackathon', title: 'Hackathon', kind: 'image', pages: 1, w: 1280, h: 960 },
      { slug: 'feedback', title: 'Jury feedback', kind: 'image', pages: 1, w: 1280, h: 745 },
    ],
    link: { label: 'GitHub repository', href: 'https://github.com/hack-florian/Next-Level-Challenge', note: 'Next-Level-Challenge' },
    featured: true,
  },
  {
    id: 'food-and-mood',
    title: 'Food & Mood',
    date: 'Nov 2025 — Jan 2026',
    cat: 'design',
    kind: 'Brand identity & graphic design',
    teaser: 'A mood-driven restaurant brand, start to finish.',
    summary: 'A mood-driven restaurant concept, taken from first idea to print and digital ads.',
    body: [
      'A project for the Brand Identity and Graphic Design course. Food & Mood is a restaurant concept designed to create a more personalised dining experience. My teammate and I took the brand from concept to execution: brand story, visual identity, logo, colour palette, typography, illustrations, UI concept, mockups, and print and digital advertising assets.',
      'The aim was to translate emotion and atmosphere into one cohesive, engaging brand experience.',
    ],
    tags: ['Brand identity', 'Typography', 'Product design', 'Illustration'],
    files: [
      { slug: 'presentation', title: 'Presentation', kind: 'deck', pages: 17, w: 1280, h: 720 },
      { slug: 'brand-book', title: 'Brand book', kind: 'deck', pages: 17, w: 1280, h: 904 },
    ],
    featured: true,
  },
  {
    id: 'ben-and-jerrys',
    title: 'Ben & Jerry’s alter ego',
    date: 'Nov 2025',
    cat: 'design',
    kind: 'Photoshop · brand archetypes',
    teaser: 'The Jester meets the Ruler.',
    summary: 'The Jester meets the Ruler: a playful ice-cream brand reimagined as premium and authoritative.',
    body: [
      'I was given Ben & Jerry’s and a contrasting archetype, The Ruler, and had to reimagine the brand as its alter ego. Today the brand is playful, irreverent and full of humour, closest to the Jester. The Ruler stands for control, status, quality and authority.',
      'Starting from an existing ad (bright blue and green, cartoon cows, a pun headline), I rebuilt it in Photoshop as a high-end ad: a soft, muted pastel landscape, a matte taupe pint with a gold lid and lettering (Madagascar Vanilla), an elegant arched serif wordmark with “much more than ice cream” underneath, and a new tagline in refined red script: “For those who know quality when they taste it.” The result shifts the brand’s story from humour to prestige and expertise, presented as a before-and-after mock-up with a short explanation of the archetype shift.',
    ],
    tags: ['Adobe Photoshop', 'Graphic design', 'Brand archetypes'],
    files: [
      { slug: 'mockup', title: 'Before & after mock-up', kind: 'image', pages: 1, w: 1280, h: 1036 },
    ],
    featured: true,
  },
  {
    id: 'snow-white',
    title: 'Snow White, in type only',
    date: 'Oct 2025',
    cat: 'design',
    kind: 'Photoshop · typographic carousel',
    teaser: 'A fairytale told in type and colour only.',
    summary: 'The whole fairytale told in five Instagram slides using only typography and colour.',
    body: [
      'A five-slide Instagram carousel (1080 × 1350 px) built from type and colour alone, with no images, icons or illustrations. “Mirror mirror” forms an oval frame around the Queen’s question; the letters of “RUN” scatter diagonally across dark forest green; “Home Sweet Home” repeats in a doubled, offset script; the poisoned apple is shaped entirely from the word “apple” in sharp blackletter; and the story ends in a heart drawn from the word “kiss.”',
      'Colour psychology guided each scene (deep purple and gold for the Queen’s vanity, red on dark green for danger, warm cream and brown for comfort, red on cold blue for the poison, soft yellow and pink for the happy ending) and the typefaces move with the mood from elegant serifs to rough hand-cut letters and gothic forms. I also made a short animated GIF on the Photoshop timeline. Made entirely without generative AI.',
    ],
    tags: ['Typography', 'Adobe Photoshop', 'Colour psychology', 'Graphic design'],
    files: [
      { slug: 'carousel', title: 'Carousel slides', kind: 'deck', pages: 5, w: 1024, h: 1280 },
    ],
    featured: true,
  },
  {
    id: 'nike-posters',
    title: 'Nike poster campaign',
    date: 'Sep 2025',
    cat: 'design',
    kind: 'Photoshop · poster series',
    teaser: 'Three posters about diversity in sport.',
    summary: 'Three posters for a Nike campaign about diversity in sport: swimming, football and tennis.',
    body: [
      'We began by researching Nike’s existing advertising and building a mood board. Each poster focuses on a different sport: an athlete is cut out and placed on a matching background, both turned black and white, with a single accent colour (turquoise, neon yellow, or the yellow of a tennis ball). Every poster carries “Just do it.”, “New collection out now” and nike.com, all set in Futura PT.',
      'Each composition takes its own approach. The swimming poster is quiet and focused, the football poster uses the pitch markings as its layout grid, and the tennis poster spreads the slogan around the player to follow her movement. Worked entirely without generative AI.',
    ],
    tags: ['Adobe Photoshop', 'Composition', 'Campaign design', 'Moodboards'],
    files: [
      { slug: 'posters', title: 'The three posters', kind: 'deck', pages: 3, w: 905, h: 1280 },
    ],
  },
  {
    id: 'immoscoop',
    title: 'Immoscoop campaign',
    date: 'May 2025',
    cat: 'marketing',
    kind: 'Boosterweek · team project',
    teaser: 'A campaign for a real estate platform.',
    summary: 'A one-week communication strategy for a Belgian real estate platform, built by a fictional agency.',
    body: [
      'Five of us set up a fictional agency, House of Vision, and built a full communication strategy for Immoscoop, positioning it as a “caretaker” in the home search so it replaces the Immoweb reflex as people’s first step.',
      'We targeted “The Busy Bees” (Belgian families with young children), set three SMART objectives using the DAGMAR model, and compared Immoscoop with Immoweb, Zimmo and Immovlan using Semrush data and a perceptual map. A benefit ladder built around the map-drawing tool led to the message “Where the growth of your family begins.” Each visual shows a family and a custom search zone drawn around the places that matter to them, and the media plan combined social posts, commuter-route billboards and radio.',
    ],
    tags: ['Marketing strategy', 'Campaign planning', 'Semrush', 'Teamwork'],
    files: [
      { slug: 'campaign-deck', title: 'Campaign deck', kind: 'deck', pages: 43, w: 1280, h: 720 },
    ],
  },
  {
    id: 'engels-logistics',
    title: 'Engels Logistics analysis',
    date: 'Dec 2024',
    cat: 'marketing',
    kind: 'Boosterweek · marketing environment',
    teaser: 'The marketing world of a logistics firm.',
    summary: 'A marketing environment analysis of a European sustainable-logistics supplier, ending in two ideas.',
    body: [
      'In a cross-class team of four, we analysed the marketing environment of Engels Logistics, a European supplier of sustainable logistics and waste-management solutions, starting with an interview with the company. The analysis covered the micro-environment (financials, internal culture, strategy and marketing), the meso-environment (customers, suppliers, intermediaries and competitors, using Porter’s Five Forces and a 4P comparison with Sulo and Transoplast) and the macro-environment (EU legislation, sustainability, e-commerce and tech advancements).',
      'We also looked at CSR: the SDGs the company pursues (9, 12, 13, 17), its circular-economy efforts and some questionable practices in the sector. A SWOT summarised the findings, and from it we proposed two sustainable marketing ideas: a sustainability-focused rebrand (“Driving Sustainability”) and an educational blog with a carbon footprint calculator.',
    ],
    tags: ['Market analysis', 'Porter’s Five Forces', 'SWOT', 'Sustainability'],
    files: [
      { slug: 'analysis', title: 'Marketing environment analysis', kind: 'deck', pages: 15, w: 1200, h: 675 },
    ],
  },
];
