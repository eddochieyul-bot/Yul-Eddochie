export type PageRoute =
  | '/'
  | '/about'
  | '/vision-mission'
  | '/objectives'
  | '/constitution'
  | '/leadership'
  | '/governance'
  | '/programmes'
  | '/programmes/leadership-development'
  | '/programmes/youth-empowerment'
  | '/programmes/civic-engagement'
  | '/programmes/education-research'
  | '/programmes/environment'
  | '/programmes/entrepreneurship'
  | '/membership'
  | '/membership/categories'
  | '/membership/register'
  | '/chapters'
  | '/chapters/east-africa'
  | '/chapters/west-africa'
  | '/chapters/north-africa'
  | '/chapters/central-africa'
  | '/chapters/southern-africa'
  | '/partnerships'
  | '/news'
  | '/events'
  | '/gallery'
  | '/resources'
  | '/contact'
  | '/admin'
  | '/opportunities'
  | '/volunteer'
  | '/academy'
  | '/verify-certificate'
  | '/stories'
  | '/journey'
  | '/faq'
  | '/community'
  | '/team-apply'
  | '/videos'
  | string;

export interface NavItem {
  label: string;
  href: PageRoute;
  description?: string;
  children?: {
    label: string;
    href: PageRoute;
    description?: string;
  }[];
}

export interface LeadershipOfficer {
  id: string;
  office: string;
  title: string;
  constitutionalRole: string;
  holderName: string;
  status: 'active' | 'pending';
  portraitPlaceholder: string;
  shortBio: string;
  responsibilities: string[];
  department?: string;
}

export interface ObjectiveItem {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  keyTargets: string[];
}

export interface ProgrammeItem {
  id: string;
  slug: string;
  route: PageRoute;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDetails?: string;
  duration?: string;
  objectives: string[];
  pillars: string[];
  impactMetric: string;
  targetAudience: string;
  image: string;
}

export type Programme = ProgrammeItem;

export interface MembershipCategoryItem {
  id: string;
  title: string;
  tagline: string;
  ageBracket?: string;
  eligibility: string;
  benefits: string[];
  annualDues: string;
  votingRights: boolean;
  status: 'Open for Registration' | 'By Nomination / Conferment' | 'Institutional Application';
}

export interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  nationality: string;
  dateOfBirth: string;
  gender: string;
  educationalBackground: string;
  profession: string;
  chapterOfInterest: string;
  membershipCategory: string;
  motivationStatement: string;
  agreedToConstitution: boolean;
}

export interface RegionalChapterItem {
  id: string;
  slug: string;
  route: PageRoute;
  name: string;
  focalHub: string;
  countries: string[];
  coordinatorStatus?: string;
  coordinator?: string;
  regionalPriorities: string[];
  keyFocus?: string[];
  stats: {
    nations: number;
    activeFocalPoints: string;
  };
}

export type RegionalChapter = RegionalChapterItem;

export interface ConstitutionArticle {
  id: string;
  articleNumber: string;
  title: string;
  summary: string;
  clauses: {
    clauseNumber: string;
    text: string;
    subclauses?: string[];
  }[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Official Announcement' | 'Continental Summit' | 'Press Release' | 'Chapter Update';
  date: string;
  excerpt: string;
  content: string[];
  author: string;
  featured: boolean;
  readTime: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Continental Assembly' | 'Leadership Summit' | 'Virtual Webinar' | 'Regional Workshop';
  description: string;
  status: 'Upcoming' | 'Registration Open' | 'Concluded';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Constitution' | 'Policy Brief' | 'Annual Report' | 'Research Paper' | 'Governance Guide';
  fileSize: string;
  fileFormat?: string;
  format?: string;
  publishDate: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption?: string;
  description?: string;
  location: string;
  year?: string;
  date?: string;
}
