import {
  LeadershipOfficer,
  ObjectiveItem,
  ProgrammeItem,
  MembershipCategoryItem,
  RegionalChapterItem,
  ConstitutionArticle,
  NewsArticle,
  EventItem,
  ResourceItem,
  GalleryItem,
} from '../types';

export const AYLA_INFO = {
  name: "Africa's Young Leaders Association",
  acronym: "AYLA",
  motto: "Young Minds. Bold Vision. United Africa.",
  tagline: "Uniting, empowering and equipping young African leaders to drive meaningful change across communities, nations and the continent.",
  foundedYear: "2024",
  adoptionDate: "Official Constitution Adopted",
  headquarters: "Continental Secretariat — Liaison Hubs in Nairobi, Accra, Addis Ababa & Johannesburg",
  email: "aylafrica.org@gmail.com",
  mediaEmail: "aylafrica.org@gmail.com",
  phone: "+254 751 113 277",
  phoneTel: "+254751113277",
  website: "aylafrica.org",
  websiteUrl: "https://aylafrica.org",
  socialHandle: "@ayla.africa",
  officialFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd96IKbbyBeVbfmNfkTEhwNkwiPiVWJFYoRST7vk6uyC6knzQ/viewform?usp=header",
  officialFormEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd96IKbbyBeVbfmNfkTEhwNkwiPiVWJFYoRST7vk6uyC6knzQ/viewform?embedded=true",
  socials: {
    handle: "@ayla.africa",
    instagram: "https://www.instagram.com/ayla.africa/",
    twitter: "https://x.com/AYLA_Africa",
    linkedin: "https://www.linkedin.com/company/ayla-org/",
    facebook: "https://www.facebook.com/profile.php?id=61575939513424",
    tiktok: "https://www.tiktok.com/@ayla.africa",
  },
  vision: "To be the premier continental platform empowering a unified, ethical, and innovative generation of young African leaders driving sustainable socio-economic and political transformation across Africa and the global diaspora.",
  mission: "To unite, inspire, and equip young African leaders through transformative leadership development, civic engagement, Pan-African collaboration, policy advocacy, and community-driven initiatives to shape a prosperous, democratic, and self-reliant Africa.",
  values: [
    {
      title: "Ethical Leadership & Integrity",
      description: "Upholding the highest standards of moral courage, public accountability, transparency, and selfless service in all organizational spheres.",
    },
    {
      title: "Pan-African Solidarity",
      description: "Championing cross-border brotherhood, cultural affinity, and unified African solutions to continental challenges, bridging linguistic and national barriers.",
    },
    {
      title: "Inclusivity & Equity",
      description: "Ensuring unimpeded representation for women, youth with disabilities, rural communities, marginalized populations, and the diaspora.",
    },
    {
      title: "Innovation & Excellence",
      description: "Fostering transformative thinking, digital fluency, evidence-based policy research, and modern institutional agility.",
    },
    {
      title: "Accountability & Stewardship",
      description: "Exercising prudent management of institutional assets, democratic governance, constitutional fidelity, and rigorous self-evaluation.",
    },
  ],
};

export interface SocialPlatformInfo {
  id: string;
  name: string;
  shortName: string;
  handle: string;
  url: string;
  description: string;
}

export const OFFICIAL_SOCIAL_CHANNELS: SocialPlatformInfo[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    shortName: 'Instagram',
    handle: '@ayla.africa',
    url: 'https://www.instagram.com/ayla.africa/',
    description: 'Youth leader spotlights, photo reels & grassroots stories',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    shortName: 'X',
    handle: '@AYLA_Africa',
    url: 'https://x.com/AYLA_Africa',
    description: 'Official communiqués, live assembly updates & statements',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    handle: 'AYLA Africa',
    url: 'https://www.linkedin.com/company/ayla-org/',
    description: 'Professional fellowships, career mobilities & policy briefs',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'Facebook',
    handle: 'AYLA Africa',
    url: 'https://www.facebook.com/profile.php?id=61575939513424',
    description: 'Pan-African civic community forum & event broadcasts',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    shortName: 'TikTok',
    handle: '@ayla.africa',
    url: 'https://www.tiktok.com/@ayla.africa',
    description: 'Youth advocacy shorts, cultural showcases & campaigns',
  },
];

export const IMPACT_METRICS = [
  {
    label: "Countries Reached",
    value: "35+",
    note: "Active chapters & focal points across African Union regions",
    editableKey: "countries_reached",
  },
  {
    label: "Young Leaders Network",
    value: "12,000+",
    note: "Registered members and academy participants",
    editableKey: "young_leaders",
  },
  {
    label: "Regional Chapters",
    value: "6",
    note: "East, West, North, Central, Southern & Diaspora",
    editableKey: "regional_chapters",
  },
  {
    label: "Programmes Active",
    value: "9",
    note: "Continental leadership & empowerment initiatives",
    editableKey: "programmes_active",
  },
  {
    label: "Strategic Partners",
    value: "Coming Soon",
    note: "Institutional MoUs in formal onboarding",
    editableKey: "strategic_partners",
  },
];

export const OBJECTIVES: ObjectiveItem[] = [
  {
    id: "obj-1",
    number: 1,
    title: "Leadership Development",
    shortDescription: "Cultivate visionary, principled, and ethically grounded youth leadership across public, civic, and private sectors.",
    fullDescription: "Design and implement comprehensive leadership academies, mentorship pipelines, and executive masterclasses tailored to continental dynamics, governance challenges, and democratic institutional strengthening.",
    iconName: "Award",
    keyTargets: [
      "AYLA Continental Leadership Academy cohort deployment",
      "Executive mentorship by veteran African statesmen and scholars",
      "Ethical governance curriculum grounded in African jurisprudence",
    ],
  },
  {
    id: "obj-2",
    number: 2,
    title: "Civic Engagement",
    shortDescription: "Empower youth with civic consciousness, democratic literacy, and active participation in continental governance.",
    fullDescription: "Promote electoral integrity, constitutional education, public policy scrutiny, and structured youth dialogue with regional and continental policy bodies including the African Union and regional economic communities.",
    iconName: "Vote",
    keyTargets: [
      "National youth voter education and civic participation campaigns",
      "Shadow policy review papers presented to legislative assemblies",
      "Youth representation in local and national governance dialogues",
    ],
  },
  {
    id: "obj-3",
    number: 3,
    title: "Youth Empowerment",
    shortDescription: "Unlock socio-economic potential through skills acceleration, digital mastery, and career incubation.",
    fullDescription: "Equip young Africans with future-ready skills, high-value technical capabilities, and vocational proficiency to counteract youth underemployment and foster continental self-reliance.",
    iconName: "Zap",
    keyTargets: [
      "Pan-African digital skills and technology bootcamps",
      "Cross-border internship exchanges across member states",
      "Career incubation desks linking graduates with industry",
    ],
  },
  {
    id: "obj-4",
    number: 4,
    title: "Pan-African Unity",
    shortDescription: "Strengthen continental integration, eliminate regional fragmentation, and mobilize the global diaspora.",
    fullDescription: "Bridge historical, linguistic, and colonial divides by orchestrating cross-border youth summits, cultural diplomacy, language exchanges, and diaspora repatriation initiatives.",
    iconName: "Globe",
    keyTargets: [
      "Annual All-African Youth Continental Assembly",
      "Bilingual fellowship programs (Anglophone, Francophone, Lusophone)",
      "Structured diaspora youth leadership bridge and investment network",
    ],
  },
  {
    id: "obj-5",
    number: 5,
    title: "Education & Research",
    shortDescription: "Advance educational access, critical inquiry, indigenous knowledge systems, and youth-led research.",
    fullDescription: "Publish empirical research on youth demographic trends, higher education reform, curriculum decolonization, and policy briefs that inform continental decision-makers.",
    iconName: "BookOpen",
    keyTargets: [
      "AYLA Pan-African Youth Research Journal & policy briefs",
      "Scholarship awareness desks for underrepresented scholars",
      "Advocacy for STEM and humanities parity across higher education",
    ],
  },
  {
    id: "obj-6",
    number: 6,
    title: "Gender & Social Inclusion",
    shortDescription: "Dismantle structural barriers to achieve full parity for women and vulnerable youth cohorts.",
    fullDescription: "Champion transformative female leadership programs, enforce affirmative representation quotas in all governance organs, and protect youth with disabilities from civic marginalization.",
    iconName: "Users",
    keyTargets: [
      "50/50 gender parity mandate across all AYLA executive bodies",
      "Women in Governance and Public Administration Fellowship",
      "Disability-inclusive accessibility across all digital and physical events",
    ],
  },
  {
    id: "obj-7",
    number: 7,
    title: "Health & Well-being",
    shortDescription: "Advocate for universal healthcare, mental health resilience, and adolescent wellbeing.",
    fullDescription: "Tackle continental health disparities through youth-led public health mobilization, mental health de-stigmatization, reproductive health literacy, and health equity campaigns.",
    iconName: "HeartPulse",
    keyTargets: [
      "Continental youth mental wellness hotline and peer circles",
      "Community healthcare outreach in rural and underserved townships",
      "Youth advocacy for regional manufacturing of medical vaccines",
    ],
  },
  {
    id: "obj-8",
    number: 8,
    title: "Environmental Sustainability",
    shortDescription: "Drive grassroots climate action, renewable energy advocacy, and ecological restoration.",
    fullDescription: "Mobilize African youth at the vanguard of climate justice, clean energy transition, regenerative agriculture, and continental treaty advocacy ahead of global climate summits.",
    iconName: "Leaf",
    keyTargets: [
      "Great Green Wall youth tree-planting and afforestation drives",
      "Green entrepreneurship grants for circular economy startups",
      "African Youth Climate Declaration presented to AU & COP meetings",
    ],
  },
  {
    id: "obj-9",
    number: 9,
    title: "Strategic Partnerships",
    shortDescription: "Build multilateral alliances with regional bodies, academic institutions, and development organs.",
    fullDescription: "Formulate bilateral MoUs with the African Union Commission, ECOWAS, EAC, SADC, civil society coalitions, and private sector leaders to scale youth-led interventions.",
    iconName: "Handshake",
    keyTargets: [
      "Formal consultative status with regional economic communities",
      "Academic research partnerships with premier African universities",
      "Public-private coalition on youth job creation and capital access",
    ],
  },
  {
    id: "obj-10",
    number: 10,
    title: "Monitoring & Accountability",
    shortDescription: "Enforce rigorous institutional stewardship, performance evaluation, and constitutional compliance.",
    fullDescription: "Subject all programmatic activities, chapter operations, and financial accounts to independent auditing, transparent member reporting, and strict ethical oversight.",
    iconName: "CheckCircle2",
    keyTargets: [
      "Annual public release of independently audited financial statements",
      "Open General Assembly constitutional compliance assessments",
      "Decentralized performance scorecards for regional chapters",
    ],
  },
];

export const LEADERSHIP_OFFICERS: LeadershipOfficer[] = [
  {
    id: "lead-president",
    office: "Office of the President",
    title: "President & Chairperson of the Executive Council",
    constitutionalRole: "Chief Executive Officer & Head of the Association",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-01",
    shortBio: "The President serves as the principal visionary, diplomatic envoy, and administrative head of the Association pursuant to Article 7 of the AYLA Constitution, presiding over the Executive Council and Continental Assemblies.",
    responsibilities: [
      "Presides over all meetings of the Executive Council and General Assembly",
      "Represents the Association in all diplomatic, governmental, and multilateral forums",
      "Ensures faithful execution of the Constitution and resolutions of the General Assembly",
      "Serves as chief custodian of AYLA's institutional vision and strategic integrity",
    ],
    department: "Executive Bureau",
  },
  {
    id: "lead-vp",
    office: "Office of the Vice President",
    title: "Vice President",
    constitutionalRole: "Deputy Chief Executive & Strategic Affairs Lead",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-02",
    shortBio: "Assists the President in all executive functions, oversees inter-regional chapter alignment, and assumes presidential responsibilities in the absence or incapacity of the President.",
    responsibilities: [
      "Deputizes the President in all ceremonial, executive, and legislative functions",
      "Coordinates regional chapters across East, West, North, Central, and Southern Africa",
      "Oversees special continental task forces and emergency interventions",
      "Supervises the Youth Inclusion and Gender Parity Directorate",
    ],
    department: "Executive Bureau",
  },
  {
    id: "lead-sec-gen",
    office: "Office of the Secretary General",
    title: "Secretary General",
    constitutionalRole: "Chief Custodian of Records & Secretariat Head",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-03",
    shortBio: "Maintains all official records, oversees statutory correspondence, issues assembly convocations, and ensures meticulous institutional documentation under Article 7.",
    responsibilities: [
      "Maintains the official register of members and statutory minute books",
      "Issues official notices and convocations for General Assemblies and Council sessions",
      "Coordinates administrative workflows across standing committees and directorates",
      "Serves as official signatory to legal charters, covenants, and institutional agreements",
    ],
    department: "Secretariat",
  },
  {
    id: "lead-global-ambassador",
    office: "Office of the Global Ambassador",
    title: "Global Ambassador",
    constitutionalRole: "Chief Diplomatic Envoy & Diaspora Liaison",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-04",
    shortBio: "Directs AYLA's international diplomacy, fosters diaspora youth integration, and cultivates multilateral alliances with continental and global developmental institutions.",
    responsibilities: [
      "Leads diplomatic representation to the African Union, United Nations, and global platforms",
      "Coordinates diaspora youth chapters across the Americas, Europe, Asia, and Caribbean",
      "Spearheads global youth cultural diplomacy and academic exchange partnerships",
      "Mobilizes diaspora talent and foreign direct investment for youth-led ventures",
    ],
    department: "International Affairs",
  },
  {
    id: "lead-treasurer",
    office: "Office of the Executive Treasurer",
    title: "Executive Treasurer",
    constitutionalRole: "Chief Financial Officer & Asset Custodian",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-05",
    shortBio: "Manages the Association's financial assets, oversees budgetary discipline, coordinates statutory audits, and ensures absolute financial transparency in accordance with Article 12.",
    responsibilities: [
      "Prepares annual consolidated continental budgets and financial projections",
      "Maintains all official bank accounts, fiscal instruments, and revenue ledgers",
      "Submits quarterly fiscal accountability reports to the Executive Council",
      "Facilitates independent external audits and publishes annual financial statements",
    ],
    department: "Finance & Accounts",
  },
  {
    id: "lead-dir-gen",
    office: "Office of the Director General",
    title: "Director General",
    constitutionalRole: "Chief Operating Officer & Head of Daily Administration",
    holderName: "Profile Coming Soon",
    status: "pending",
    portraitPlaceholder: "EC-06",
    shortBio: "Directs daily administrative operations of the Continental Secretariat, manages full-time professional personnel, and oversees project delivery across all continental programmes.",
    responsibilities: [
      "Leads the operational execution of all continental programmes and initiatives",
      "Supervises departmental directors, regional desks, and administrative staff",
      "Manages procurement, logistics, communications, and digital infrastructure",
      "Translates Executive Council policy directives into verifiable programmatic milestones",
    ],
    department: "Operational Secretariat",
  },
];

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: "prog-leadership-dev",
    slug: "leadership-development",
    route: "/programmes/leadership-development",
    title: "AYLA Continental Leadership Academy",
    subtitle: "Nurturing ethical, visionary African statesmen and civic architects",
    category: "Flagship Academy",
    description: "An intensive fellowship combining rigorous governance training, moral leadership philosophy, public policy simulation, and executive mentorship from distinguished African leaders.",
    objectives: [
      "Equip fellows with strategic decision-making frameworks and public administration acumen",
      "Foster Pan-African geopolitical fluency and negotiation capability",
      "Instill unshakeable constitutional reverence, integrity, and anti-corruption ethics",
    ],
    pillars: [
      "Ethical Governance & Anti-Corruption",
      "Public Policy Analysis & Statecraft",
      "Diplomatic Negotiation & Crisis Management",
      "Transformational Community Service",
    ],
    impactMetric: "Target: 500 Fellows Annually",
    targetAudience: "Emerging leaders aged 20-35 with demonstrated civic leadership track records",
    image: "leadership",
  },
  {
    id: "prog-youth-empowerment",
    slug: "youth-empowerment",
    route: "/programmes/youth-empowerment",
    title: "Pan-African Youth Empowerment Initiative",
    subtitle: "Accelerating technical capabilities, vocational excellence, and career mobility",
    category: "Empowerment & Skills",
    description: "Democratizing access to high-value skills across artificial intelligence, green technologies, agribusiness value chains, and digital enterprise to secure youth economic independence.",
    objectives: [
      "Bridge the technical skills gap between university curricula and contemporary industry demands",
      "Deploy localized coding and digital product development bootcamps across 5 AU regions",
      "Facilitate pan-continental credentialing recognized by regional employer networks",
    ],
    pillars: [
      "Advanced Digital Literacy & Tech Fluency",
      "Vocational Apprenticeships & Craftsmanship",
      "Creative Industries & Digital Arts",
      "Career Acceleration & Global Placement",
    ],
    impactMetric: "Target: 25,000 Trained Youth",
    targetAudience: "Underemployed graduates, technical scholars, and self-taught youth builders",
    image: "empowerment",
  },
  {
    id: "prog-civic-engagement",
    slug: "civic-engagement",
    route: "/programmes/civic-engagement",
    title: "Continental Civic Literacy & Democratic Governance",
    subtitle: "Strengthening democratic institutions through enlightened youth citizenry",
    category: "Governance & Democracy",
    description: "Championing civic literacy, voter education, youth legislative caucuses, and constructive policy co-creation between youth assemblies and national parliaments.",
    objectives: [
      "Increase informed youth participation in electoral cycles and constitutional referenda",
      "Establish non-partisan Youth Shadow Parliaments in national chapter capitals",
      "Produce citizen-led scorecards monitoring national budget allocations for youth services",
    ],
    pillars: [
      "Constitutional Literacy & Human Rights",
      "Electoral Integrity & Peaceful Participation",
      "Public Budget Scrutiny & Social Audits",
      "Legislative Advocacy & Policy Drafting",
    ],
    impactMetric: "Target: 54 Nation Coverage",
    targetAudience: "Civic activists, youth parliamentarians, law scholars, and community organizers",
    image: "civic",
  },
  {
    id: "prog-education-research",
    slug: "education-research",
    route: "/programmes/education-research",
    title: "Africa Youth Research & Innovation Lab",
    subtitle: "Evidence-based policy insights and indigenous intellectual property",
    category: "Research & Academia",
    description: "A premier think-tank producing empirical whitepapers on African youth demographics, AfCFTA trade impacts, artificial intelligence governance, and pedagogical reform.",
    objectives: [
      "Generate credible, peer-reviewed empirical datasets authored by young African researchers",
      "Provide policy advisory briefs directly to the African Union Commission and UNECA",
      "Democratize research grants for graduate students tackling pressing continental bottlenecks",
    ],
    pillars: [
      "Demographic & Labor Market Forecasting",
      "AfCFTA Youth Cross-Border Trade Barriers",
      "Curriculum Modernization & Decolonization",
      "Open Data & Public Policy Repositories",
    ],
    impactMetric: "Target: 12 Whitepapers / Year",
    targetAudience: "Postgraduate researchers, academic institutions, think-tanks, and policy analysts",
    image: "research",
  },
  {
    id: "prog-environment",
    slug: "environment",
    route: "/programmes/environment",
    title: "Continental Climate Action & Ecological Resilience",
    subtitle: "Mobilizing youth for renewable innovation, reforestation, and climate justice",
    category: "Climate & Sustainability",
    description: "Mobilizing youth brigades to counter desertification, scale off-grid clean energy solutions, champion circular economy principles, and articulate unified African climate demands.",
    objectives: [
      "Plant 10 million indigenous trees across degraded Sahelian and equatorial ecosystems",
      "Incubate youth-founded clean-tech startups providing rural solar and water solutions",
      "Draft and advance the African Youth Common Position at international climate conferences",
    ],
    pillars: [
      "Ecological Restoration & Afforestation",
      "Clean Energy Transition & Microgrids",
      "Circular Economy & Waste Upcycling",
      "Climate Diplomacy & Climate Finance Advocacy",
    ],
    impactMetric: "Target: 10M Trees Seeded",
    targetAudience: "Environmental scientists, agrarian youth, clean energy innovators, and climate activists",
    image: "environment",
  },
  {
    id: "prog-entrepreneurship",
    slug: "entrepreneurship",
    route: "/programmes/entrepreneurship",
    title: "Pan-African Youth Enterprise Accelerator (PAYEA)",
    subtitle: "Scaling high-growth ventures across borders under AfCFTA",
    category: "Entrepreneurship",
    description: "Catalyzing venture creation by connecting seed-stage youth enterprises with cross-border market linkages, regulatory advisory under AfCFTA, and angel capital syndicates.",
    objectives: [
      "Support 1,000 youth-led high-impact enterprises to establish cross-border regional trade",
      "Provide investor-readiness bootcamps and legal incorporation support",
      "Deploy non-extractive seed catalytic grants for female and rural founders",
    ],
    pillars: [
      "Cross-Border AfCFTA Trade Facilitation",
      "Fintech, Agritech & Healthtech Incubation",
      "Investor Pitch Showcases & Catalytic Capital",
      "Executive Mentorship with African Industrialists",
    ],
    impactMetric: "Target: $5M Seed Unlocked",
    targetAudience: "Founders, agricultural producers, technology builders, and micro-entrepreneurs",
    image: "entrepreneurship",
  },
];

export const MEMBERSHIP_CATEGORIES: MembershipCategoryItem[] = [
  {
    id: "mem-ordinary",
    title: "Ordinary Members",
    tagline: "The core engine of active young leaders across Africa",
    ageBracket: "18 – 35 Years",
    eligibility: "Open to all African citizens and youth of African descent aged 18 to 35 who affirm allegiance to the AYLA Constitution, commit to active participation in local/national chapters, and uphold ethical conduct.",
    benefits: [
      "Full voting and electoral candidacy rights at Chapter and Continental Assemblies",
      "Priority eligibility for the AYLA Continental Leadership Academy fellowship",
      "Direct access to the AYLA digital member portal, networking forums, and masterclasses",
      "Official digital membership credential and physical verifiable identification card",
      "Eligibility to serve on constitutional committees and specialized working departments",
    ],
    annualDues: "Subsidized Chapter Dues (Localized per country chapter)",
    votingRights: true,
    status: "Open for Registration",
  },
  {
    id: "mem-junior",
    title: "Junior Members",
    tagline: "Cultivating young minds in secondary and high schools",
    ageBracket: "15 – 17 Years",
    eligibility: "Young Africans enrolled in secondary or high schools who demonstrate early leadership acumen, academic curiosity, and community service. Requires parental or school counselor consent.",
    benefits: [
      "Participation in AYLA Interschool Model African Union debates",
      "Access to junior mentorship circles with University Chapter alumni",
      "Foundational civic literacy and ethical leadership modules",
      "Certificate of Junior Civic Service upon completion of volunteer hours",
    ],
    annualDues: "Exempt / Free of Charge",
    votingRights: false,
    status: "Open for Registration",
  },
  {
    id: "mem-associate",
    title: "Associate Members",
    tagline: "Experienced mentors, alumni and allies above age 35",
    ageBracket: "36+ Years or Non-African Allies",
    eligibility: "Experienced professionals, institutional leaders, and allies aged above 35 or non-citizens who support AYLA's mission and wish to contribute technical expertise, mentorship, or financial patronage.",
    benefits: [
      "Advisory participation in thematic panels and leadership colloquiums",
      "Direct channel to mentor high-potential young leaders across the continent",
      "Invitations to executive symposiums, diplomatic banquets, and annual galas",
      "Quarterly institutional intelligence briefings and research journals",
    ],
    annualDues: "Voluntary Advisory Sustaining Contribution",
    votingRights: false,
    status: "Open for Registration",
  },
  {
    id: "mem-corporate",
    title: "Corporate & Institutional Members",
    tagline: "Universities, enterprises, and multilateral institutions",
    eligibility: "Registered corporations, higher education institutions, development foundations, and civil society bodies seeking institutional collaboration aligned with youth leadership and continental development.",
    benefits: [
      "Strategic talent recruitment access to top-tier AYLA fellowship graduates",
      "Co-branding and partnership visibility at continental summits and assemblies",
      "Direct involvement in CSR alignment, research commissioning, and policy seminars",
      "Institutional delegation privileges at the Continental Youth Assembly",
    ],
    annualDues: "Institutional Tiered Partnership Dues",
    votingRights: false,
    status: "Institutional Application",
  },
  {
    id: "mem-honorary",
    title: "Honorary Members",
    tagline: "Distinguished statesmen, scholars, and continental champions",
    eligibility: "Conferred exclusively by resolution of the Executive Council and ratified by the General Assembly upon eminent African statesmen, Nobel laureates, scholars, or philanthropists of exceptional distinction.",
    benefits: [
      "Lifetime honorary recognition as a Patron or Friend of the African Youth",
      "Permanent seat in the Council of Elders / High Advisory Colloquium",
      "Keynote honors at all continental summits and constitutional anniversaries",
      "Presidential commendation and archive inscription in AYLA Hall of Honor",
    ],
    annualDues: "Honorary Conferment (No Dues)",
    votingRights: false,
    status: "By Nomination / Conferment",
  },
  {
    id: "mem-founding",
    title: "Founding Members",
    tagline: "The original signatories and conveners of AYLA",
    eligibility: "The original cohort of conveners and signatories who ratified the inaugural AYLA Constitution and established the foundation of the Association.",
    benefits: [
      "Permanent historical recognition in the preamble records of the Association",
      "Permanent consultative status with the Executive Council on constitutional matters",
      "Full lifelong voting and participatory rights in all statutory assemblies",
      "Privilege of initiating constitutional amendment review petitions",
    ],
    annualDues: "Perpetual Charter Members",
    votingRights: true,
    status: "By Nomination / Conferment",
  },
];

export const REGIONAL_CHAPTERS: RegionalChapterItem[] = [
  {
    id: "chap-east",
    slug: "east-africa",
    route: "/chapters/east-africa",
    name: "East Africa Chapter",
    focalHub: "Nairobi, Kenya / Kigali, Rwanda / Dar es Salaam, Tanzania",
    countries: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Burundi",
      "South Sudan",
      "Ethiopia",
      "Somalia",
      "Eritrea",
      "Djibouti",
      "Seychelles",
      "Comoros",
    ],
    coordinatorStatus: "Regional Coordinating Bureau in Formation",
    regionalPriorities: [
      "EAC Youth Integration and cross-border mobility protocol",
      "Digital tech ecosystem strengthening (Silicon Savannah youth linkages)",
      "Agribusiness supply-chain modernization and climate-resilient farming",
    ],
    stats: {
      nations: 12,
      activeFocalPoints: "Active in 8 Capital Hubs",
    },
  },
  {
    id: "chap-west",
    slug: "west-africa",
    route: "/chapters/west-africa",
    name: "West Africa Chapter",
    focalHub: "Accra, Ghana / Abuja, Nigeria / Dakar, Senegal",
    countries: [
      "Nigeria",
      "Ghana",
      "Senegal",
      "Côte d'Ivoire",
      "Sierra Leone",
      "Liberia",
      "The Gambia",
      "Benin",
      "Togo",
      "Guinea",
      "Guinea-Bissau",
      "Cabo Verde",
      "Mali",
      "Burkina Faso",
      "Niger",
    ],
    coordinatorStatus: "Regional Coordinating Bureau in Formation",
    regionalPriorities: [
      "ECOWAS youth protocol implementation and border facilitation",
      "Democratic resilience, peaceful election monitoring, and counter-polarization",
      "Creative economy, Afrobeats cultural diplomacy, and digital film innovation",
    ],
    stats: {
      nations: 15,
      activeFocalPoints: "Active in 11 Capital Hubs",
    },
  },
  {
    id: "chap-north",
    slug: "north-africa",
    route: "/chapters/north-africa",
    name: "North Africa Chapter",
    focalHub: "Cairo, Egypt / Tunis, Tunisia / Rabat, Morocco",
    countries: [
      "Egypt",
      "Morocco",
      "Tunisia",
      "Algeria",
      "Libya",
      "Sudan",
      "Mauritania",
    ],
    coordinatorStatus: "Regional Coordinating Bureau in Formation",
    regionalPriorities: [
      "Trans-Saharan youth dialogue and multilingual academic bridges",
      "Water security, green hydrogen technologies, and desert reclamation",
      "Higher education research alliances across Mediterranean and Sub-Saharan universities",
    ],
    stats: {
      nations: 7,
      activeFocalPoints: "Active in 5 Capital Hubs",
    },
  },
  {
    id: "chap-central",
    slug: "central-africa",
    route: "/chapters/central-africa",
    name: "Central Africa Chapter",
    focalHub: "Yaoundé, Cameroon / Kinshasa, DR Congo / Libreville, Gabon",
    countries: [
      "Cameroon",
      "DR Congo",
      "Republic of the Congo",
      "Gabon",
      "Equatorial Guinea",
      "Central African Republic",
      "Chad",
      "São Tomé and Príncipe",
    ],
    coordinatorStatus: "Regional Coordinating Bureau in Formation",
    regionalPriorities: [
      "Congo Basin conservation and indigenous forest youth wardens",
      "Peace-building and community conflict resolution in border territories",
      "Bilingualism (French, English, Portuguese) and regional trade corridors",
    ],
    stats: {
      nations: 8,
      activeFocalPoints: "Active in 6 Capital Hubs",
    },
  },
  {
    id: "chap-southern",
    slug: "southern-africa",
    route: "/chapters/southern-africa",
    name: "Southern Africa Chapter",
    focalHub: "Johannesburg, South Africa / Lusaka, Zambia / Gaborone, Botswana",
    countries: [
      "South Africa",
      "Zimbabwe",
      "Zambia",
      "Botswana",
      "Namibia",
      "Mozambique",
      "Angola",
      "Malawi",
      "Madagascar",
      "Lesotho",
      "Eswatini",
      "Mauritius",
    ],
    coordinatorStatus: "Regional Coordinating Bureau in Formation",
    regionalPriorities: [
      "SADC youth employment guarantee and mining value-addition equity",
      "Renewable solar and wind energy transition and green industrialization",
      "Constitutional rule of law and anti-corruption youth watchdog networks",
    ],
    stats: {
      nations: 12,
      activeFocalPoints: "Active in 9 Capital Hubs",
    },
  },
  {
    id: "chap-diaspora",
    slug: "diaspora",
    route: "/chapters",
    name: "Global Diaspora Directorate (AU 6th Region)",
    focalHub: "London, UK / Washington DC, USA / Paris, France / Toronto, Canada",
    countries: [
      "United Kingdom",
      "United States",
      "Canada",
      "France",
      "Germany",
      "Brazil & Caribbean",
      "Middle East & Asia Hubs",
    ],
    coordinatorStatus: "Global Diaspora Coordination Desk in Formation",
    regionalPriorities: [
      "Direct remittance transition into venture capital for youth-led ventures",
      "Knowledge repatriation, brain gain, and university virtual guest-lecturing",
      "Cultural diplomacy, heritage preservation, and global anti-racism solidarity",
    ],
    stats: {
      nations: 20,
      activeFocalPoints: "Global Hub Networks",
    },
  },
];

export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  {
    id: "art-preamble",
    articleNumber: "Preamble",
    title: "Solemn Declaration & Foundational Covenant",
    summary: "Affirms the collective resolve of young Africans to forge an indomitable, self-reliant, and ethically guided continent.",
    clauses: [
      {
        clauseNumber: "P.1",
        text: "WE, THE YOUNG PEOPLES OF AFRICA and the African Diaspora, acutely cognizant of our historical responsibilities as the demographic majority and vibrant heartbeat of our beloved continent;",
      },
      {
        clauseNumber: "P.2",
        text: "CONSCIOUS of the supreme sacrifices rendered by our forebears, anti-colonial freedom fighters, and pan-African luminaries in securing our sovereignty and human dignity;",
      },
      {
        clauseNumber: "P.3",
        text: "RESOLVED to cast aside borders, tribalism, and colonial divisions in pursuit of authentic continental integration, economic emancipation, and moral renaissance;",
      },
      {
        clauseNumber: "P.4",
        text: "DO HEREBY ENACT, ADOPT AND SOLEMNLY DEDICATE to ourselves, posterity, and the African Union, this Constitution of AFRICA'S YOUNG LEADERS ASSOCIATION (AYLA).",
      },
    ],
  },
  {
    id: "art-1",
    articleNumber: "Article 1",
    title: "Name, Motto, Identity & Head Office",
    summary: "Establishes legal identity, corporate seal, official motto, and administrative seat.",
    clauses: [
      {
        clauseNumber: "1.1",
        text: "The Organization shall be officially designated and known worldwide as 'AFRICA'S YOUNG LEADERS ASSOCIATION', herein abbreviated and referred to as 'AYLA'.",
      },
      {
        clauseNumber: "1.2",
        text: "The official Motto of the Association shall forever remain: 'Young Minds. Bold Vision. United Africa.'",
      },
      {
        clauseNumber: "1.3",
        text: "The official Emblem and Logo shall comprise the golden silhouette of the African continent encompassed within a deep navy shield, flanked by the stars of continental unity and the inscription of the Association's name and motto.",
      },
      {
        clauseNumber: "1.4",
        text: "The Continental Secretariat shall be situated within an African Union member capital as determined by the Executive Council, supported by decentralized Regional Chapter Secretariats.",
      },
    ],
  },
  {
    id: "art-2",
    articleNumber: "Article 2",
    title: "Supremacy of the Constitution",
    summary: "Guarantees that this Constitution is the supreme law of the Association binding upon all organs, officers, and members.",
    clauses: [
      {
        clauseNumber: "2.1",
        text: "This Constitution is the supreme law of Africa's Young Leaders Association and binds all organs, chapters, officers, and individual members across all jurisdictions.",
      },
      {
        clauseNumber: "2.2",
        text: "Any by-law, chapter regulation, executive decree, or administrative act that is inconsistent with the provisions of this Constitution shall, to the extent of the inconsistency, be void and of no legal effect.",
      },
      {
        clauseNumber: "2.3",
        text: "Every member assumes a sacred duty to defend, uphold, and observe the values, provisions, and ideals enshrined in this Constitution at all times.",
      },
    ],
  },
  {
    id: "art-3",
    articleNumber: "Article 3",
    title: "Vision, Mission & Core Values",
    summary: "Articulates the overarching institutional doctrine, philosophical imperatives, and ethical pillars.",
    clauses: [
      {
        clauseNumber: "3.1",
        text: "Vision: To be the premier continental platform empowering a unified, ethical, and innovative generation of young African leaders driving sustainable socio-economic and political transformation across Africa and the global diaspora.",
      },
      {
        clauseNumber: "3.2",
        text: "Mission: To unite, inspire, and equip young African leaders through transformative leadership development, civic engagement, Pan-African collaboration, policy advocacy, and community-driven initiatives to shape a prosperous, democratic, and self-reliant Africa.",
      },
      {
        clauseNumber: "3.3",
        text: "Core Values: Ethical Leadership & Integrity; Pan-African Solidarity; Inclusivity & Equity; Innovation & Excellence; and Accountability & Stewardship.",
      },
    ],
  },
  {
    id: "art-4",
    articleNumber: "Article 4",
    title: "Aims and Core Objectives",
    summary: "Codifies the 10 constitutional objectives guiding programmatic allocation and continental interventions.",
    clauses: [
      {
        clauseNumber: "4.1",
        text: "Leadership Development: To identify, train, mentor, and deploy ethical youth leaders into public, corporate, and civil society service.",
      },
      {
        clauseNumber: "4.2",
        text: "Civic Engagement: To champion democratic literacy, voter awareness, human rights, and active policy participation across all member states.",
      },
      {
        clauseNumber: "4.3",
        text: "Youth Empowerment: To accelerate market-relevant digital, vocational, and scientific skills that eradicate youth underemployment.",
      },
      {
        clauseNumber: "4.4",
        text: "Pan-African Unity: To foster cross-border camaraderie, dismantle non-tariff borders, and mobilize the intellectual capital of the African diaspora.",
      },
      {
        clauseNumber: "4.5",
        text: "Education & Research: To sponsor rigorous youth-authored empirical research and advocate for equitable, modern educational systems.",
      },
      {
        clauseNumber: "4.6",
        text: "Gender & Social Inclusion: To enforce absolute gender parity (minimum 50% women representation) and champion opportunities for youth with disabilities.",
      },
      {
        clauseNumber: "4.7",
        text: "Health & Well-being: To advance universal healthcare access, mental health support, and public health preparedness.",
      },
      {
        clauseNumber: "4.8",
        text: "Environmental Sustainability: To mobilize grassroots conservation, afforestation, clean energy adoption, and continental climate justice advocacy.",
      },
      {
        clauseNumber: "4.9",
        text: "Strategic Partnerships: To forge multilateral covenants with the African Union, RECs, academic bodies, and developmental institutions.",
      },
      {
        clauseNumber: "4.10",
        text: "Monitoring & Accountability: To institutionalize transparency, independent annual financial audits, and open performance scorecards.",
      },
    ],
  },
  {
    id: "art-5",
    articleNumber: "Article 5",
    title: "Membership Categories, Rights & Obligations",
    summary: "Defines the 6 constitutional membership classifications, admission protocols, member privileges, and disciplinary cesser.",
    clauses: [
      {
        clauseNumber: "5.1",
        text: "The Association shall encompass six distinct membership classes: Ordinary Members, Junior Members, Associate Members, Corporate/Institutional Members, Honorary Members, and Founding Members.",
      },
      {
        clauseNumber: "5.2",
        text: "Ordinary Membership: Open to all African citizens and diaspora youth aged 18 to 35 years upon formal registration, code of conduct assent, and chapter enrollment.",
      },
      {
        clauseNumber: "5.3",
        text: "Rights of Ordinary Members: Shall possess the right to vote in statutory elections, stand for executive office if in good standing, access programmatic academies, and petition governance organs.",
      },
      {
        clauseNumber: "5.4",
        text: "Obligations: Every member shall pay prescribed chapter subscriptions, adhere to the Code of Conduct, preserve institutional unity, and actively advance AYLA's objectives.",
      },
      {
        clauseNumber: "5.5",
        text: "Cesser of Membership: Membership shall cease by voluntary resignation, attaining age threshold (transitioning to Associate tier), or expulsion on proven charges of gross misconduct.",
      },
    ],
  },
  {
    id: "art-6",
    articleNumber: "Article 6",
    title: "Governance Organs & Structure",
    summary: "Establishes the institutional hierarchy: General Assembly, Advisory Board, Executive Council, and Secretariat.",
    clauses: [
      {
        clauseNumber: "6.1",
        text: "The supreme governing authority of the Association shall reside in the All-African Youth Continental General Assembly, convened annually.",
      },
      {
        clauseNumber: "6.2",
        text: "The Advisory Board shall comprise eminent African statesmen, judicial luminaries, and scholar-patrons providing geopolitical oversight and moral counsel.",
      },
      {
        clauseNumber: "6.3",
        text: "The Executive Council shall serve as the apex executive and policy-implementing organ, accountable directly to the General Assembly.",
      },
      {
        clauseNumber: "6.4",
        text: "The Continental Secretariat, headed by the Director General, shall constitute the permanent administrative engine responsible for day-to-day operations.",
      },
    ],
  },
  {
    id: "art-7",
    articleNumber: "Article 7",
    title: "The Executive Council Offices",
    summary: "Codifies the six constitutional offices of the Executive Council and their respective statutory powers.",
    clauses: [
      {
        clauseNumber: "7.1",
        text: "The Executive Council shall be composed of: (a) The President; (b) The Vice President; (c) The Secretary General; (d) The Global Ambassador; (e) The Executive Treasurer; and (f) The Director General.",
      },
      {
        clauseNumber: "7.2",
        text: "The President: Chief Executive Officer; presides over Executive Council and Continental Assemblies; serves as official spokesperson and legal representative.",
      },
      {
        clauseNumber: "7.3",
        text: "The Vice President: Deputizes the President; coordinates regional chapters across the continent; oversees affirmative inclusion and special task forces.",
      },
      {
        clauseNumber: "7.4",
        text: "The Secretary General: Chief custodian of records, seal, minutes, and constitutional documentation; coordinates assembly notices and standing committees.",
      },
      {
        clauseNumber: "7.5",
        text: "The Global Ambassador: Chief diplomatic envoy; leads international alliances, African Union liaison, and worldwide diaspora engagement.",
      },
      {
        clauseNumber: "7.6",
        text: "The Executive Treasurer: Chief financial officer; directs budgetary discipline, fiscal accounts, bank instruments, and statutory external audits.",
      },
      {
        clauseNumber: "7.7",
        text: "The Director General: Chief operating officer; leads full-time Secretariat personnel, procurement, communications, and daily programme delivery.",
      },
    ],
  },
  {
    id: "art-8",
    articleNumber: "Article 8",
    title: "Standing Committees & Specialized Departments",
    summary: "Institutionalizes programmatic and regulatory oversight organs.",
    clauses: [
      {
        clauseNumber: "8.1",
        text: "There shall be established permanent Standing Committees: (a) Disciplinary & Ethics Committee; (b) Electoral Commission; (c) Finance, Audit & Risk Committee; (d) Constitutional Review Committee; and (e) Gender & Inclusion Committee.",
      },
      {
        clauseNumber: "8.2",
        text: "Secretariat Departments: Programmes & Strategy; Communications & Media; Membership & Chapter Affairs; Research & Policy; and Legal Affairs.",
      },
    ],
  },
  {
    id: "art-9",
    articleNumber: "Article 9",
    title: "Regional & National Chapters",
    summary: "Decentralized architecture spanning East, West, North, Central, Southern Africa, and the Diaspora.",
    clauses: [
      {
        clauseNumber: "9.1",
        text: "The Association shall organize operations into six recognized Regional Chapters aligned with the African Union regional blocs: East Africa, West Africa, North Africa, Central Africa, Southern Africa, and the Global Diaspora.",
      },
      {
        clauseNumber: "9.2",
        text: "National Chapters may be chartered in any African state or diaspora territory where a minimum of 50 active ordinary members in good standing petition the Executive Council.",
      },
      {
        clauseNumber: "9.3",
        text: "Chapter autonomy shall remain subject to the supreme authority of this Constitution and standardized operational policies promulgated by the Secretariat.",
      },
    ],
  },
  {
    id: "art-10",
    articleNumber: "Article 10",
    title: "Elections, Tenures & Electoral Integrity",
    summary: "Democratic balloting, non-renewable tenures, and independent electoral administration.",
    clauses: [
      {
        clauseNumber: "10.1",
        text: "All elected Executive Council officials shall serve a tenure of two (2) years, eligible for re-election for a maximum of one additional term.",
      },
      {
        clauseNumber: "10.2",
        text: "Elections shall be conducted through secret digital and in-person ballot administered by an independent five-member Electoral Commission appointed by the Advisory Board.",
      },
      {
        clauseNumber: "10.3",
        text: "No candidate who has faced criminal indictment, gross ethical sanction, or constitutional violation shall be eligible to contest any office.",
      },
    ],
  },
  {
    id: "art-11",
    articleNumber: "Article 11",
    title: "Meetings, Assemblies & Quorum",
    summary: "Rules of order for Continental Assemblies, Extraordinary Sessions, and voting thresholds.",
    clauses: [
      {
        clauseNumber: "11.1",
        text: "The All-African Youth Continental Assembly shall convene once every calendar year at a venue rotated across the five AU regions.",
      },
      {
        clauseNumber: "11.2",
        text: "Quorum for any valid General Assembly session shall require representation from at least one-third (1/3) of all recognized national chapters in good standing.",
      },
      {
        clauseNumber: "11.3",
        text: "Ordinary resolutions require a simple majority of accredited delegates present and voting; constitutional amendments require a two-thirds (2/3) supermajority.",
      },
    ],
  },
  {
    id: "art-12",
    articleNumber: "Article 12",
    title: "Financial Management, Audits & Asset Control",
    summary: "Prudent stewardship, banking signatories, and mandatory independent external audits.",
    clauses: [
      {
        clauseNumber: "12.1",
        text: "The Association's revenue shall derive from membership subscriptions, lawful grants, philantropic donations, partnership endowments, and publication revenues.",
      },
      {
        clauseNumber: "12.2",
        text: "All funds shall be maintained in reputable financial institutions under the name of 'Africa's Young Leaders Association'.",
      },
      {
        clauseNumber: "12.3",
        text: "Withdrawal instruments require dual mandatory signatures: The Executive Treasurer and either the President or Secretary General.",
      },
      {
        clauseNumber: "12.4",
        text: "Annual accounts shall be audited by an accredited independent firm of certified public accountants and published openly on the institutional portal within 90 days of fiscal close.",
      },
    ],
  },
  {
    id: "art-13",
    articleNumber: "Article 13",
    title: "Code of Conduct & Disciplinary Due Process",
    summary: "Moral requirements, conflict of interest safeguards, and fair hearing jurisprudence.",
    clauses: [
      {
        clauseNumber: "13.1",
        text: "Every member and official must demonstrate honesty, non-discrimination, political neutrality in official capacity, and zero tolerance for bribery or sexual harassment.",
      },
      {
        clauseNumber: "13.2",
        text: "Disciplinary petitions shall be adjudicated by the Disciplinary & Ethics Committee in full compliance with natural justice, allowing the respondent adequate notice and fair hearing.",
      },
      {
        clauseNumber: "13.3",
        text: "Penalties include formal censure, temporary suspension, removal from office, and permanent expulsion.",
      },
    ],
  },
  {
    id: "art-14",
    articleNumber: "Article 14",
    title: "Constitutional Amendments",
    summary: "Rigorous procedural safeguards ensuring stability while accommodating continental evolution.",
    clauses: [
      {
        clauseNumber: "14.1",
        text: "A proposed amendment may be initiated by: (a) Resolution of the Executive Council; or (b) Petition supported by at least ten (10) chartered National Chapters.",
      },
      {
        clauseNumber: "14.2",
        text: "Notice of proposed amendments must be circulated to all registered members at least sixty (60) days prior to the General Assembly.",
      },
      {
        clauseNumber: "14.3",
        text: "An amendment shall become effective only upon ratification by a two-thirds (2/3) affirmative vote of accredited delegates at the Continental Assembly.",
      },
    ],
  },
  {
    id: "art-15",
    articleNumber: "Article 15",
    title: "Dissolution & Asset Distribution",
    summary: "Protocols governing terminal dissolution and non-profit asset transfers.",
    clauses: [
      {
        clauseNumber: "15.1",
        text: "The Association may only be dissolved by a three-fourths (3/4) supermajority vote of all accredited national chapters convened in an Extraordinary Assembly called specifically for that purpose.",
      },
      {
        clauseNumber: "15.2",
        text: "Upon lawful dissolution and satisfaction of all liabilities, remaining assets shall not be distributed among members, but shall be transferred to recognized pan-African youth or educational non-profit charities.",
      },
    ],
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "AYLA Launches Continental Leadership Academy Cohort Applications Across 5 AU Regions",
    slug: "ayla-launches-continental-leadership-academy-cohort",
    category: "Official Announcement",
    date: "March 15, 2026",
    excerpt: "The Executive Council has officially opened applications for the inaugural cohort of the AYLA Continental Leadership Academy, targeting 500 emerging changemakers.",
    content: [
      "The Continental Secretariat of Africa's Young Leaders Association (AYLA) today announced the open call for nominations and applications for its flagship Continental Leadership Academy.",
      "Designed under the authoritative mandate of Article 4 of the AYLA Constitution, the Academy convenes 500 young Africans across East, West, North, Central, and Southern Africa and the Diaspora for 12 months of high-level statecraft simulation, ethics training, and policy formulation.",
      "Speaking during the virtual announcement from the Secretariat Hub, the Directorate emphasized that selected fellows will receive full institutional sponsorship, travel stipends for continental summits, and direct mentorship from former African heads of state and academic deans.",
    ],
    author: "AYLA Communications Directorate",
    featured: true,
    readTime: "4 min read",
  },
  {
    id: "news-2",
    title: "All-African Youth Continental Assembly Convening Date Announced: 'Uniting Our Generation'",
    slug: "all-african-youth-continental-assembly-announced",
    category: "Continental Summit",
    date: "February 28, 2026",
    excerpt: "Delegates from 35 nations will gather to deliberate on continental youth policy, youth employment under AfCFTA, and regional integration.",
    content: [
      "The Executive Council, pursuant to Article 11 of the Constitution, has issued the formal convocation for the upcoming All-African Youth Continental Assembly.",
      "Under the thematic banner 'Young Minds. Bold Vision. United Africa.', the 3-day assembly will gather accredited youth parliamentarians, chapter leaders, university delegates, and corporate partners.",
      "Key agenda items include the ratification of regional chapter coordinators, review of the continental youth charter, and presentation of the 2026 Youth Economic Outlook.",
    ],
    author: "Office of the Secretary General",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: "news-3",
    title: "AYLA Submits Comprehensive Youth Policy Memorandum to African Union Commission",
    slug: "ayla-submits-youth-policy-memorandum-to-au",
    category: "Press Release",
    date: "January 19, 2026",
    excerpt: "A 40-page whitepaper authored by AYLA's Research & Policy Directorate advocates for passport-free youth travel and cross-border tech enterprise grants.",
    content: [
      "In furtherance of Article 4 (Pan-African Unity & Strategic Partnerships), AYLA has officially transmitted a high-level policy memorandum to the African Union Commission Department of Health, Humanitarian Affairs and Social Development.",
      "The memorandum outlines actionable steps to eliminate non-tariff visa barriers for young entrepreneurs participating in the African Continental Free Trade Area (AfCFTA).",
      "The submission also requests formal observer and consultative status for AYLA within the AU youth advisory mechanisms.",
    ],
    author: "Directorate of Research & Policy",
    featured: false,
    readTime: "3 min read",
  },
  {
    id: "news-4",
    title: "Regional Chapter Charters Initiated in 15 African Nations Ahead of General Assembly",
    slug: "regional-chapter-charters-initiated-in-15-nations",
    category: "Chapter Update",
    date: "December 14, 2025",
    excerpt: "Interim steering committees established in Nairobi, Accra, Dakar, Johannesburg, Cairo, and Kigali to coordinate localized youth community drives.",
    content: [
      "The Directorate of Membership & Chapter Affairs has confirmed the provisional accreditation of 15 National Chapter steering committees following the threshold verification process under Article 9.",
      "These national hubs are spearheading grassroots civic literacy, local tree planting campaigns, and secondary school junior chapters.",
      "All registered ordinary members in these territories are encouraged to engage with their local coordinators.",
    ],
    author: "Directorate of Chapter Affairs",
    featured: false,
    readTime: "3 min read",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "All-African Youth Continental Assembly 2026",
    date: "August 20 – 23, 2026",
    time: "09:00 AM – 06:00 PM (EAT)",
    location: "Kigali Convention Centre, Rwanda & Virtual Plenary",
    type: "Continental Assembly",
    description: "The supreme statutory gathering of AYLA delegates, chapter leaders, and distinguished observers ratifying annual resolutions and electing council members.",
    status: "Registration Open",
  },
  {
    id: "evt-2",
    title: "AfCFTA Youth Trade & Innovation Summit",
    date: "May 14 – 16, 2026",
    time: "10:00 AM – 05:00 PM (GMT)",
    location: "Accra International Conference Centre, Ghana",
    type: "Leadership Summit",
    description: "Confronting cross-border logistics bottlenecks, venture financing, and digital commerce frameworks for young industrialists and tech founders.",
    status: "Upcoming",
  },
  {
    id: "evt-3",
    title: "Continental Youth Climate Action Colloquium",
    date: "June 05, 2026",
    time: "02:00 PM – 05:30 PM (CAT)",
    location: "Virtual Continental Broadcast & Regional Desks",
    type: "Virtual Webinar",
    description: "Uniting climate advocates to finalize the 2026 African Youth Climate Declaration ahead of international environmental negotiations.",
    status: "Upcoming",
  },
  {
    id: "evt-4",
    title: "AYLA East Africa Regional Youth Leadership Workshop",
    date: "July 08 – 10, 2026",
    time: "08:30 AM – 04:30 PM (EAT)",
    location: "University of Nairobi Towers, Kenya",
    type: "Regional Workshop",
    description: "Intensive 3-day civic literacy and leadership development boot camp for university student leaders and young civil society directors.",
    status: "Upcoming",
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    id: "res-const",
    title: "The Constitution of Africa's Young Leaders Association (AYLA)",
    category: "Constitution",
    fileSize: "1.4 MB",
    fileFormat: "PDF Document",
    publishDate: "2024 (Official Adoption Edition)",
    description: "The supreme governing instrument, outlining preamble, 15 articles, executive council offices, standing committees, and membership rights.",
  },
  {
    id: "res-rep-2025",
    title: "AYLA Continental Progress Report & Strategic Outlook (2025-2028)",
    category: "Annual Report",
    fileSize: "3.2 MB",
    fileFormat: "PDF Document",
    publishDate: "December 2025",
    description: "Comprehensive institutional milestone review, chapter deployments, audited fiscal allocations, and strategic roadmaps.",
  },
  {
    id: "res-brief-afcfta",
    title: "Policy Brief 04: Unlocking AfCFTA for Young Women & Tech Founders",
    category: "Policy Brief",
    fileSize: "850 KB",
    fileFormat: "PDF Document",
    publishDate: "February 2026",
    description: "Actionable recommendations on customs harmonization, digital identity interoperability, and cross-border seed funding.",
  },
  {
    id: "res-guide-chapter",
    title: "National & University Chapter Establishment Handbook",
    category: "Governance Guide",
    fileSize: "2.1 MB",
    fileFormat: "PDF Document",
    publishDate: "January 2026",
    description: "Operational manual detailing student chapter bylaws, community project models, election guidelines, and reporting protocols.",
  },
  {
    id: "res-paper-climate",
    title: "Research Paper: Youth-Led Ecological Restoration in the Sahel Belt",
    category: "Research Paper",
    fileSize: "2.8 MB",
    fileFormat: "PDF Document",
    publishDate: "November 2025",
    description: "Empirical study evaluating youth-managed community nurseries, rainwater harvesting micro-dams, and drought resilience.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "All-African Youth Summit Plenary Session",
    category: "Continental Summit",
    caption: "Delegates from 28 African nations deliberating on regional integration and youth statecraft.",
    location: "Kigali, Rwanda",
    year: "2025",
  },
  {
    id: "gal-2",
    title: "Continental Leadership Academy Cohort Colloquium",
    category: "Leadership Academy",
    caption: "Emerging public service leaders participating in interactive legislative debate simulation.",
    location: "Nairobi, Kenya",
    year: "2025",
  },
  {
    id: "gal-3",
    title: "Sahelian Afforestation Youth Brigade Drive",
    category: "Community Action",
    caption: "Over 5,000 native saplings planted by AYLA volunteers during environmental conservation weekend.",
    location: "Niamey & Dakar",
    year: "2025",
  },
  {
    id: "gal-4",
    title: "Cross-Border Youth Trade & Enterprise Masterclass",
    category: "Continental Summit",
    caption: "Young industrialists presenting cross-border logistics proposals to regional investors.",
    location: "Accra, Ghana",
    year: "2025",
  },
  {
    id: "gal-5",
    title: "Pan-African Cultural Exchange & Heritage Night",
    category: "Cultural Exchange",
    caption: "Celebrating the vibrant linguistic, artistic, and musical tapestry of our continental heritage.",
    location: "Johannesburg, South Africa",
    year: "2025",
  },
  {
    id: "gal-6",
    title: "Interschool Junior Leadership Model African Union",
    category: "Leadership Academy",
    caption: "High school scholars simulating the Peace and Security Council of the African Union.",
    location: "Addis Ababa, Ethiopia",
    year: "2026",
  },
];

export const STRATEGIC_PARTNERS = [
  {
    id: "partner-au",
    category: "Multilateral & Continental Organs",
    statusNote: "Strategic Engagement & Observer Accreditation Protocol in Progress",
    description: "Pan-African multilateral development frameworks, youth charters, and continental integration alignment.",
  },
  {
    id: "partner-acad",
    category: "Higher Education & Research Consortium",
    statusNote: "Inter-University Research & Academic Exchange MoUs in Development",
    description: "Partnering with premier universities across East, West, North, Central, and Southern Africa.",
  },
  {
    id: "partner-priv",
    category: "Pan-African Enterprise & Industrial Coalition",
    statusNote: "Youth Capital & Cross-Border Incubation Partners Onboarding",
    description: "Industry leaders fostering youth tech entrepreneurship, green manufacturing, and trade facilitation.",
  },
  {
    id: "partner-civic",
    category: "Civil Society & Democratic Governance Alliances",
    statusNote: "Coalition Alignment for Civic Literacy & Electoral Transparency",
    description: "Non-partisan civic organizations committed to constitutional literacy and democratic institutional strengthening.",
  },
];

// ==========================================
// UN SUSTAINABLE DEVELOPMENT GOALS (SDGs)
// ==========================================
export interface SdgInfo {
  number: number;
  name: string;
  shortName: string;
  color: string;
  description: string;
}

export const SDG_LIST: SdgInfo[] = [
  { number: 1, name: "SDG 1 — No Poverty", shortName: "No Poverty", color: "#E5243B", description: "End poverty in all its forms everywhere." },
  { number: 2, name: "SDG 2 — Zero Hunger", shortName: "Zero Hunger", color: "#DDA63A", description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture." },
  { number: 3, name: "SDG 3 — Good Health and Well-being", shortName: "Good Health", color: "#4C9F38", description: "Ensure healthy lives and promote well-being for all at all ages." },
  { number: 4, name: "SDG 4 — Quality Education", shortName: "Quality Education", color: "#C5192D", description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities." },
  { number: 5, name: "SDG 5 — Gender Equality", shortName: "Gender Equality", color: "#FF3A21", description: "Achieve gender equality and empower all women and girls across our continent." },
  { number: 8, name: "SDG 8 — Decent Work and Economic Growth", shortName: "Decent Work", color: "#A21942", description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment." },
  { number: 10, name: "SDG 10 — Reduced Inequalities", shortName: "Reduced Inequalities", color: "#DD1367", description: "Reduce inequality within and among African countries and communities." },
  { number: 13, name: "SDG 13 — Climate Action", shortName: "Climate Action", color: "#3F7E44", description: "Take urgent action to combat climate change, drought, and environmental degradation." },
  { number: 16, name: "SDG 16 — Peace, Justice and Strong Institutions", shortName: "Peace & Justice", color: "#00689D", description: "Promote peaceful and inclusive societies for sustainable development and build accountable institutions." },
  { number: 17, name: "SDG 17 — Partnerships for the Goals", shortName: "Partnerships", color: "#19486A", description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development." },
];

// ==========================================
// MEMBERSHIP BENEFITS & EXPECTATIONS
// ==========================================
export const MEMBER_BENEFITS = [
  {
    title: "Leadership Development & Mentorship",
    description: "Access structured fellowship tracks, executive governance masterclasses, and direct one-on-one mentorship with seasoned Pan-African diplomats, statesmen, and industry innovators.",
    icon: "award",
  },
  {
    title: "Capacity Building & Masterclasses",
    description: "Free participation in high-impact workshops covering public speaking, policy drafting, digital intelligence, and grassroots campaign design.",
    icon: "book",
  },
  {
    title: "Continental Networking & Solidarity",
    description: "Join an active network of thousands of young African leaders across East, West, North, Central, Southern Africa and the global diaspora.",
    icon: "users",
  },
  {
    title: "Programme & Assembly Participation",
    description: "Priority delegate access to annual Continental Assemblies, regional summits, parliamentary simulations, and cross-border innovation labs.",
    icon: "calendar",
  },
  {
    title: "Curated Opportunities Access",
    description: "Exclusive notification and institutional endorsement for continental scholarships, global fellowships, grants, and youth exchange initiatives.",
    icon: "compass",
  },
  {
    title: "Policy & Advocacy Platform",
    description: "Contribute directly to AYLA continental policy memorandums presented before regional economic communities, the African Union, and national parliaments.",
    icon: "file-text",
  },
  {
    title: "Democratic Voice & Governance Rights",
    description: "Exercise voting and petition rights under the AYLA Constitution to elect regional bureau leaders and shape organizational strategic priorities.",
    icon: "check-circle",
  },
  {
    title: "Grassroots Chapter Leadership",
    description: "Opportunity to establish or co-lead focal chapters in your university, municipality, or country, mobilizing peers for collective local impact.",
    icon: "map-pin",
  },
];

export const MEMBER_EXPECTATIONS = [
  {
    title: "Fidelity to the AYLA Constitution",
    description: "Strictly adhere to the provisions, institutional values, and democratic statutes articulated in the supreme Constitution of AYLA.",
  },
  {
    title: "Exemplary Moral Character & Integrity",
    description: "Demonstrate ethical leadership, transparency, mutual respect, and accountability in all professional and civic engagements.",
  },
  {
    title: "Active Contribution & Participation",
    description: "Engage consistently in local chapter assemblies, continental working groups, surveys, and civic initiatives.",
  },
  {
    title: "Pan-African Solidarity & Inclusion",
    description: "Respect all cultural, linguistic, regional, and gender backgrounds, maintaining a zero-tolerance policy for tribalism, chauvinism, or prejudice.",
  },
  {
    title: "Non-Partisan Institutional Dignity",
    description: "Safeguard AYLA's independent, non-partisan civil society character by never misrepresenting the Association for narrow partisan interests.",
  },
  {
    title: "Promotion of Continental Progress",
    description: "Actively champion the aspirations of the African Union Agenda 2063: a prosperous, integrated, and peaceful Africa driven by its own youth.",
  },
];

// ==========================================
// VOLUNTEER & TEAM AREAS
// ==========================================
export const VOLUNTEER_AREAS = [
  { id: 'Communications', label: 'Communications & Public Relations', description: 'Institutional messaging, newsletters, press releases, and editorial briefs.' },
  { id: 'Media', label: 'Media Production & Photography', description: 'Visual storytelling, video editing, podcast production, and photojournalism.' },
  { id: 'Research', label: 'Research & Policy Analysis', description: 'Continental policy papers, youth status surveys, and governance data.' },
  { id: 'Technology', label: 'Technology, Systems & Web', description: 'Web development, database administration, digital security, and mobile tools.' },
  { id: 'Events', label: 'Events & Protocol Coordination', description: 'Logistics, virtual summit hosting, venue arrangements, and delegate hospitality.' },
  { id: 'Programme Support', label: 'Programme Support & Delivery', description: 'Working with project directors on education, environment, and civic pillars.' },
  { id: 'Community Outreach', label: 'Community Outreach & Grassroots', description: 'Engaging high schools, community centers, and youth organizations.' },
  { id: 'Design', label: 'Design & Visual Branding', description: 'Brand assets, infographics, event banners, and publication layouts.' },
  { id: 'Translation', label: 'Translation & Multilingual Services', description: 'Translating communiqués into French, Portuguese, Arabic, and Swahili.' },
  { id: 'Regional Chapters', label: 'Regional Chapters Mobilization', description: 'Supporting country focal desks, chapter assemblies, and regional bureaus.' },
  { id: 'Youth Engagement', label: 'Youth Engagement & Partnerships', description: 'Liaising with university student unions and youth-led NGOs.' },
  { id: 'Administration', label: 'Administration & Secretariat Support', description: 'Documentation, scheduling, compliance, and archiving operations.' },
];

export const TEAM_AREAS = [
  { id: 'Communications', label: 'Communications & Public Relations' },
  { id: 'Technology', label: 'Technology & Digital Infrastructure' },
  { id: 'Finance', label: 'Finance & Resource Mobilization' },
  { id: 'Programmes', label: 'Programmes Strategy & Execution' },
  { id: 'Research', label: 'Policy Research & Continental Insights' },
  { id: 'Events', label: 'Events, Summits & Protocol' },
  { id: 'Membership', label: 'Membership Affairs & Chapter Registry' },
  { id: 'Regional Coordination', label: 'Regional Hubs & National Focal Desks' },
  { id: 'Youth Entrepreneurship', label: 'Youth Enterprise & Economic Empowerment' },
  { id: 'Environment', label: 'Climate Action & Environmental Stewardship' },
  { id: 'Education', label: 'Education, Skills & Academic Exchange' },
  { id: 'Culture & Heritage', label: 'Pan-African Culture, Arts & Heritage' },
  { id: 'Monitoring & Evaluation', label: 'Monitoring, Evaluation & Impact Assessment' },
];

// ==========================================
// INITIAL VERIFIED MILESTONES (OUR JOURNEY)
// ==========================================
export const INITIAL_MILESTONES = [
  {
    id: "ms-1",
    year: "2024",
    dateOrMonth: "October 2024",
    title: "Founding Declaration & Pan-African Inception",
    category: "Founding" as const,
    location: "Accra, Ghana & Nairobi, Kenya",
    description: "Young civic leaders, scholars, and youth advocates from across 14 African nations convened virtually and in consultative hubs to establish Africa's Young Leaders Association (AYLA) as an independent, youth-governed continental institution.",
    verified: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: "ms-2",
    year: "2024",
    dateOrMonth: "November 2024",
    title: "Adoption of the Supreme AYLA Constitution",
    category: "Constitution" as const,
    location: "Continental Consultative Assembly",
    description: "Unanimous formal adoption of the foundational AYLA Constitution, enshrining democratic separation of powers, the Executive Council, regional chapter autonomy, and strict ethical accountability frameworks.",
    verified: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: "ms-3",
    year: "2024",
    dateOrMonth: "December 2024",
    title: "Official Secretariat Establishment & Liaison Hubs",
    category: "Official Launch" as const,
    location: "Nairobi, Accra, Addis Ababa & Johannesburg",
    description: "Establishment of the permanent AYLA Continental Secretariat and initial liaison hubs to facilitate multi-regional coordination, institutional records, and administrative continuity.",
    verified: true,
    published: true,
    displayOrder: 3,
  },
  {
    id: "ms-4",
    year: "2025",
    dateOrMonth: "January 2025",
    title: "Launch of the First Continental Membership Drive",
    category: "First Membership Drive" as const,
    location: "Continental & Global Diaspora",
    description: "Rollout of the official AYLA membership registration platform across 5 African Union regions, establishing verified member registries and decentralized chapter focal networks.",
    verified: true,
    published: true,
    displayOrder: 4,
  },
  {
    id: "ms-5",
    year: "2025",
    dateOrMonth: "April 2025",
    title: "Chartering of 6 Regional Focal Bureaus",
    category: "Regional Expansion" as const,
    location: "East, West, North, Central, Southern & Diaspora",
    description: "Formal chartering of regional coordination structures covering East Africa, West Africa, North Africa, Central Africa, Southern Africa, and the global African diaspora.",
    verified: true,
    published: true,
    displayOrder: 5,
  },
  {
    id: "ms-6",
    year: "2025",
    dateOrMonth: "August 2025",
    title: "Inauguration of Flagship Continental Programmes",
    category: "Major Programmes" as const,
    location: "All Regional Hubs",
    description: "Commencement of core AYLA initiatives including the Pan-African Youth Leadership Academy, Civic Literacy Caravans, and the Green Africa Climate Action Taskforce.",
    verified: true,
    published: true,
    displayOrder: 6,
  },
  {
    id: "ms-7",
    year: "2026",
    dateOrMonth: "March 2026",
    title: "Digital Opportunities Hub & Leadership Academy Rollout",
    category: "Important Institutional Milestones" as const,
    location: "Pan-African Digital Infrastructure",
    description: "Launch of the unified AYLA Opportunities Hub, online verification system for official certificates, and enhanced open curricula for emerging continental changemakers.",
    verified: true,
    published: true,
    displayOrder: 7,
  },
];

// ==========================================
// INITIAL VERIFIED FAQS (10 CATEGORIES)
// ==========================================
export const INITIAL_FAQS = [
  // MEMBERSHIP
  {
    id: "faq-1",
    category: "MEMBERSHIP" as const,
    question: "How do I join AYLA?",
    answer: "You can apply directly through our secure Membership Portal on this website by completing the official registration form with your personal details, country of residence, chapter preference, and a brief motivation statement. Membership is open to young Africans aged 18 to 35 across the continent and diaspora.",
    displayOrder: 1,
    published: true,
  },
  {
    id: "faq-2",
    category: "MEMBERSHIP" as const,
    question: "Who is eligible to become an AYLA member?",
    answer: "Any African citizen or member of the African diaspora aged 18 to 35 who subscribes to the foundational values of AYLA, respects the AYLA Constitution, and demonstrates dedication to the socio-economic and ethical advancement of Africa is eligible.",
    displayOrder: 2,
    published: true,
  },
  {
    id: "faq-3",
    category: "MEMBERSHIP" as const,
    question: "How are membership applications reviewed?",
    answer: "Applications are processed by the Secretariat's Membership Affairs Directorate in coordination with the relevant regional chapter. The review ensures eligibility, verification of regional residency, and commitment to the AYLA Code of Conduct.",
    displayOrder: 3,
    published: true,
  },
  // PROGRAMMES
  {
    id: "faq-4",
    category: "PROGRAMMES" as const,
    question: "How do I participate in AYLA programmes?",
    answer: "Open calls for programme participation are published on our Programmes and Opportunities pages, as well as broadcast through our newsletter and official community channels. Registered members receive priority access to applications for flagship cohorts.",
    displayOrder: 4,
    published: true,
  },
  // LEADERSHIP
  {
    id: "faq-5",
    category: "LEADERSHIP" as const,
    question: "How is AYLA governed?",
    answer: "AYLA is governed constitutionally under a democratic separation of powers, featuring the General Assembly as the supreme deliberative body, the Executive Council as the administrative steering organ, and autonomous Regional Bureaus.",
    displayOrder: 5,
    published: true,
  },
  // CHAPTERS
  {
    id: "faq-6",
    category: "CHAPTERS" as const,
    question: "How can I start or join an AYLA chapter?",
    answer: "You can connect with existing regional chapters directly via our Chapters page. If your university or country does not yet have an active chapter, members in good standing can petition the Regional Bureau to charter a new focal chapter following the constitutional chartering guidelines.",
    displayOrder: 6,
    published: true,
  },
  // EVENTS
  {
    id: "faq-7",
    category: "EVENTS" as const,
    question: "Are AYLA events free to attend?",
    answer: "Most AYLA webinars, consultative assemblies, and community dialogues are free and open to youth. Certain specialized summits or residential leadership retreats may require advance registration or competitive scholarship application.",
    displayOrder: 7,
    published: true,
  },
  // OPPORTUNITIES
  {
    id: "faq-8",
    category: "OPPORTUNITIES" as const,
    question: "How can I access youth opportunities through AYLA?",
    answer: "Visit the AYLA Opportunities Hub on this website, where scholarships, fellowships, grants, internships, and youth conferences are curated and continuously verified by our research team. You can filter by category, region, and application deadline.",
    displayOrder: 8,
    published: true,
  },
  // VOLUNTEERING
  {
    id: "faq-9",
    category: "VOLUNTEERING" as const,
    question: "How can I volunteer with AYLA?",
    answer: "You can apply through our dedicated 'Volunteer with AYLA' section. Volunteering is open to anyone wishing to contribute skills in communications, research, technology, events, design, translation, or community outreach. Note that volunteering is distinct from formal constitutional membership.",
    displayOrder: 9,
    published: true,
  },
  // CERTIFICATES
  {
    id: "faq-10",
    category: "CERTIFICATES" as const,
    question: "Does AYLA provide certificates for programme completion?",
    answer: "Yes, AYLA issues digitally verifiable certificates for designated courses, leadership cohorts, and recognized volunteer service. Every certificate has an official AYLA Certificate Number that anyone can verify instantly via our public 'Verify Certificate' tool.",
    displayOrder: 10,
    published: true,
  },
  // PARTNERSHIPS
  {
    id: "faq-11",
    category: "PARTNERSHIPS" as const,
    question: "How can an organization partner with AYLA?",
    answer: "Universities, multilateral institutions, civil society organizations, and corporate partners can reach out via our Partnerships page or email the Secretariat at aylafrica.org@gmail.com to initiate formal memoranda of understanding.",
    displayOrder: 11,
    published: true,
  },
  // GENERAL
  {
    id: "faq-12",
    category: "GENERAL" as const,
    question: "How can I contact the AYLA Secretariat?",
    answer: "You can send an enquiry through our Contact page, selecting the specific reason for your message, or write directly to aylafrica.org@gmail.com. We also operate phone lines in Nairobi at +254 751 113 277.",
    displayOrder: 12,
    published: true,
  },
];

// ==========================================
// INITIAL LEADERSHIP ACADEMY COURSES
// ==========================================
export const INITIAL_ACADEMY_COURSES = [
  {
    id: "acad-1",
    title: "Ethical Leadership & Institutional Governance in Africa",
    description: "A foundational masterclass examining moral courage, anti-corruption frameworks, constitutional stewardship, and public accountability for future African administrators and civic leaders.",
    instructor: "AYLA Governance Directorate & Faculty Council",
    instructorTitle: "Senior Pan-African Civic Fellows",
    category: "Ethical Leadership" as const,
    duration: "6 Weeks (Self-Paced with Live Masterclasses)",
    deliveryMethod: "Online" as const,
    startDate: "May 2026",
    registrationDeadline: "April 25, 2026",
    eligibility: "Open to all registered AYLA members and African youth aged 18–35.",
    learningOutcomes: [
      "Master the principles of constitutional democracy and institutional integrity",
      "Develop frameworks for ethical decision-making in public office and civil society",
      "Analyze case studies of ethical governance across the African Union",
      "Design an integrity charter for your local community or organization",
    ],
    registrationButtonText: "Enroll in Masterclass",
    registrationUrl: "#/membership/register",
    relatedResources: ["AYLA Constitution (Article 4)", "African Youth Charter"],
    certificateAvailable: true,
    featured: true,
    published: true,
    displayOrder: 1,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "acad-2",
    title: "Pan-African Youth Civic Advocacy & Policy Drafting",
    description: "Learn the methodology of translating community grievances into actionable policy briefs, legislative petitions, and regional economic community submissions.",
    instructor: "Directorate of Research & Policy Alliances",
    instructorTitle: "Policy Researchers & Legal Practitioners",
    category: "Policy & Advocacy" as const,
    duration: "4 Weeks (Intensive Hybrid Cohort)",
    deliveryMethod: "Hybrid" as const,
    startDate: "June 2026",
    registrationDeadline: "May 20, 2026",
    eligibility: "Youth activists, university scholars, and grassroots chapter coordinators.",
    learningOutcomes: [
      "Draft standard policy briefs for municipal and national policymakers",
      "Navigate the African Union peace, security, and human rights mechanisms",
      "Execute evidence-based advocacy campaigns with measurable metrics",
    ],
    registrationButtonText: "Apply for Cohort",
    registrationUrl: "#/membership/register",
    relatedResources: ["AU Agenda 2063 Framework", "AYLA Policy Memorandum Template"],
    certificateAvailable: true,
    featured: true,
    published: true,
    displayOrder: 2,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "acad-3",
    title: "Digital Fluency, Artificial Intelligence & Pan-African Innovation",
    description: "Explore how artificial intelligence, data analytics, and digital infrastructure can solve agricultural, educational, and trade bottlenecks across the continent.",
    instructor: "AYLA Technology & Innovation Hub",
    instructorTitle: "Continental Tech Leaders & Data Scientists",
    category: "Artificial Intelligence" as const,
    duration: "5 Weeks (Online Hands-on Lab)",
    deliveryMethod: "Online" as const,
    startDate: "July 2026",
    registrationDeadline: "June 15, 2026",
    eligibility: "Young technologists, innovators, and entrepreneurs interested in applied AI.",
    learningOutcomes: [
      "Understand practical generative AI and data models for African contexts",
      "Address algorithmic bias and digital sovereignty on the continent",
      "Build a prototype solution for an African SDG challenge",
    ],
    registrationButtonText: "Join Tech Track",
    registrationUrl: "#/membership/register",
    relatedResources: ["African Union AI Strategy Guidelines"],
    certificateAvailable: true,
    featured: false,
    published: true,
    displayOrder: 3,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "acad-4",
    title: "Cross-Border Youth Entrepreneurship & AfCFTA Readiness",
    description: "Practical guidance on navigating the African Continental Free Trade Area (AfCFTA), cross-border logistics, payment corridors, and scaling youth enterprises.",
    instructor: "Directorate of Youth Enterprise & Industrial Development",
    instructorTitle: "Trade Specialists & Serial Founders",
    category: "Entrepreneurship" as const,
    duration: "4 Weeks (Interactive Seminars)",
    deliveryMethod: "Online" as const,
    startDate: "August 2026",
    registrationDeadline: "July 20, 2026",
    eligibility: "Early-stage founders, agricultural processors, and trade entrepreneurs.",
    learningOutcomes: [
      "Understand tariff schedules and certificates of origin under AfCFTA",
      "Structure multi-currency settlement and digital trade logistics",
      "Pitch effectively to Pan-African seed funds and angel networks",
    ],
    registrationButtonText: "Enroll in Trade Course",
    registrationUrl: "#/membership/register",
    relatedResources: ["AfCFTA Youth Protocol Brief"],
    certificateAvailable: true,
    featured: false,
    published: true,
    displayOrder: 4,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  },
];

// ==========================================
// INITIAL VERIFIED OPPORTUNITIES
// ==========================================
export const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "African Union Youth Volunteer Corps (AU-YVC) Continental Deployment",
    organization: "African Union Commission (AUC)",
    description: "The African Union Youth Volunteer Corps recruits young professionals from all 55 AU member states for professional placements across Africa to foster Pan-African solidarity, skills transfer, and institutional strengthening.",
    category: "Volunteer Opportunities" as const,
    country: "Continental (All 55 AU Member States)",
    region: "All African Union Regions",
    eligibility: "African citizens aged 18–35 with a post-secondary qualification and proven leadership track record.",
    applicationDeadline: "Rolling Application 2026",
    applicationOpeningDate: "January 2026",
    applicationLink: "https://au.int/en/youth-development",
    featuredImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    tags: ["African Union", "Continental", "Leadership", "Volunteer"],
    publishedDate: "2026-01-15",
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp-2",
    title: "Mandela Washington Fellowship for Young African Leaders",
    organization: "Young African Leaders Initiative (YALI)",
    description: "Flagship programme bringing accomplished young African leaders to United States universities for six weeks of academic coursework, leadership training, and professional networking across Business, Civic Leadership, and Public Management.",
    category: "Fellowships" as const,
    country: "Sub-Saharan Africa",
    region: "Sub-Saharan Africa",
    eligibility: "Leaders aged 25–35 with established records in civic engagement, public administration, or entrepreneurship.",
    applicationDeadline: "September 2026 (Annual Cycle)",
    applicationOpeningDate: "August 2026",
    applicationLink: "https://www.mandelawashingtonfellowship.org/",
    featuredImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    tags: ["Fellowship", "Civic Leadership", "YALI", "Public Management"],
    publishedDate: "2026-02-01",
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp-3",
    title: "Mo Ibrahim Foundation Leadership Fellowship Programme",
    organization: "Mo Ibrahim Foundation & AfDB / UNECA / ITC",
    description: "Designed to mentor future African leaders through direct work inside continental institutions such as the African Development Bank (AfDB) and the United Nations Economic Commission for Africa (UNECA).",
    category: "Leadership Opportunities" as const,
    country: "Abidjan, Addis Ababa & Geneva",
    region: "Continental & International",
    eligibility: "Young African professionals under the age of 40 with at least 7 years of relevant work experience and a Master's degree.",
    applicationDeadline: "October 2026",
    applicationOpeningDate: "July 2026",
    applicationLink: "https://mo.ibrahim.foundation/fellowships",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: ["Governance", "AfDB", "Policy", "Fellowship"],
    publishedDate: "2026-02-10",
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp-4",
    title: "Tony Elumelu Foundation Entrepreneurship Programme Grant",
    organization: "The Tony Elumelu Foundation (TEF)",
    description: "A transformative entrepreneurship catalyst providing young African founders across 54 countries with $5,000 non-refundable seed capital, world-class business mentorship, and 12 weeks of business training.",
    category: "Grants" as const,
    country: "All African Countries",
    region: "Pan-African",
    eligibility: "African entrepreneurs with innovative business ideas or early-stage businesses less than 5 years old.",
    applicationDeadline: "March 31, 2026",
    applicationOpeningDate: "January 1, 2026",
    applicationLink: "https://www.tonyelumelufoundation.org/",
    featuredImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Seed Capital", "Entrepreneurship", "Grant", "AfCFTA"],
    publishedDate: "2026-01-05",
    featured: true,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

// ==========================================
// INITIAL VERIFIED CERTIFICATES (FOR VERIFY TOOL)
// ==========================================
export const INITIAL_VERIFIED_CERTIFICATES = [
  {
    id: "cert-1",
    certificateNumber: "AYLA-2026-000001",
    verificationCode: "AYLA-VCODE-ETH-9921",
    recipientName: "Kofi Mensah Boateng",
    programme: "Executive Leadership & Pan-African Institutional Governance",
    certificateType: "Leadership Academy" as const,
    issueDate: "January 15, 2026",
    issuingAuthority: "AYLA Continental Secretariat — Office of the Secretary General",
    isValid: true,
    notes: "Official inaugural fellowship certificate verified with honours.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cert-2",
    certificateNumber: "AYLA-2026-000002",
    verificationCode: "AYLA-VCODE-VOL-8812",
    recipientName: "Amina Diallo",
    programme: "Continental Membership Affairs & Chapter Coordination Service",
    certificateType: "Volunteer Service" as const,
    issueDate: "February 20, 2026",
    issuingAuthority: "AYLA Executive Council & Directorates",
    isValid: true,
    notes: "Recognized for distinguished service in establishing West Africa Chapter bureaus.",
    createdAt: new Date().toISOString(),
  },
];

// ==========================================
// INITIAL VERIFIED STORIES (VOICES OF YOUNG AFRICA)
// ==========================================
export const INITIAL_STORIES = [
  {
    id: "story-1",
    title: "Building Cross-Border Unity: Why Pan-Africanism Belongs to Our Generation",
    slug: "building-cross-border-unity",
    personName: "Ngozi Adeleke",
    country: "Nigeria",
    chapter: "West Africa Focal Hub",
    role: "AYLA Chapter Ambassador & Civic Advocate",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    featuredImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    story: "Growing up in Lagos, national boundaries often felt like permanent barriers. Joining AYLA taught me that our generational destiny is inextricably shared. Through our weekly civic study circles, we connected with peers in Nairobi, Dakar, and Johannesburg, discovering that whether we discuss youth unemployment, clean energy, or transparent elections, our solutions must be continental. Today, our West Africa chapter has engaged over 800 high school and university students on constitutional literacy.",
    publicationDate: "2026-02-14",
    category: "Member Stories" as const,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "story-2",
    title: "Leading Climate Action in the Rift Valley: A Community Model",
    slug: "leading-climate-action-rift-valley",
    personName: "Kipchoge Kiprotich",
    country: "Kenya",
    chapter: "East Africa Focal Hub",
    role: "Green Africa Taskforce Coordinator",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    featuredImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    story: "In our rural farming belt, shifting rain patterns threaten food security every single harvest. Through AYLA's Green Africa Programme, our youth cluster organized tree planting nurseries and water harvesting workshops across 12 villages. By grounding environmental science in local community wisdom, we proved that youth are not merely waiting for continental summits—we are building resilience on the ground every day.",
    publicationDate: "2026-02-28",
    category: "Community Impact" as const,
    published: true,
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

// ==========================================
// INITIAL WATCH AYLA / VIDEOS
// ==========================================
export const INITIAL_VIDEOS = [
  {
    id: "vid-1",
    title: "AYLA Continental Manifesto & Founding Address",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Embeddable standard placeholder or AYLA briefing
    description: "The founding declaration and institutional vision of Africa's Young Leaders Association, setting forth our collective commitment to ethical leadership, constitutional integrity, and Pan-African unity.",
    thumbnail: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    category: "AYLA Institutional Video" as const,
    featured: true,
    published: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-2",
    title: "Simulating Continental Diplomacy: The Model African Union Assembly",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Highlights from the inaugural Pan-African Youth Parliamentary Simulation, where student delegates debated cross-border trade liberalization and regional security protocols.",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    category: "Event Recordings" as const,
    featured: true,
    published: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
  },
];

