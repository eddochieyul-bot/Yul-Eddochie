export type AdminRole =
  | 'super_admin'
  | 'admin'
  | 'editor'
  | 'content_admin'
  | 'events_admin'
  | 'communications_admin'
  | 'membership_admin';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

export interface CmsAdminProfile {
  id?: string;
  uid?: string;
  email: string;
  displayName: string;
  role: string;
  createdAt?: string;
  lastLogin?: string;
  active: boolean;
}

export interface CmsLeadershipOfficer {
  id: string;
  fullName: string;
  position: string;
  title?: string;
  constitutionalRole?: string;
  office?: string;
  department?: string;
  biography: string;
  profilePhoto: string;
  country: string;
  email?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  responsibilities?: string[];
  displayOrder: number;
  published: boolean;
  status?: 'active' | 'pending';
  updatedAt: string;
}

export interface CmsEvent {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  eventType: 'physical' | 'online' | 'hybrid';
  registrationUrl?: string;
  organizer?: string;
  contactInfo?: string;
  featured: boolean;
  published: boolean;
  status?: 'Upcoming' | 'Registration Open' | 'Concluded';
  createdAt: string;
}

export interface CmsNewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Official Announcement' | 'Continental Summit' | 'Press Release' | 'Chapter Update' | string;
  author: string;
  publishDate: string;
  excerpt: string;
  content: string; // Markdown or plain text paragraphs
  featuredImage?: string;
  featured: boolean;
  tags: string[];
  published: boolean;
  readTime?: string;
}

export interface CmsProgramme {
  id: string;
  slug: string;
  route?: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  programmeDetails?: string;
  fullDetails?: string;
  image: string;
  objectives: string[];
  pillars?: string[];
  impactMetric: string;
  targetAudience?: string;
  duration?: string;
  keyActivities?: string[];
  expectedOutcomes?: string[];
  howToParticipate?: string;
  sdgs?: number[];
  leadershipContact?: string;
  relatedResources?: string[];
  displayOrder: number;
  published: boolean;
}

export interface CmsGalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: string;
  imageUrl: string;
  date?: string;
  year?: string;
  location: string;
  displayOrder: number;
  published: boolean;
}

export interface CmsAnnouncement {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  isImportant: boolean;
  attachmentUrl?: string;
  linkUrl?: string;
  published: boolean;
}

export interface CmsResource {
  id: string;
  title: string;
  description: string;
  category: 'Constitution' | 'Policy Brief' | 'Annual Report' | 'Research Paper' | 'Governance Guide' | string;
  fileUrl: string;
  fileSize: string;
  fileFormat: string;
  publishDate: string;
  published: boolean;
}

export interface CmsChapter {
  id: string;
  region: string;
  country: string;
  chapterName: string;
  coordinator: string;
  contactInfo: string;
  description: string;
  imageUrl?: string;
  status: 'Active Focal Hub' | 'Chartering' | 'Regional Bureau';
  published: boolean;
  focalHub?: string;
  regionalPriorities?: string[];
  keyFocus?: string[];
}

export interface CmsSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string;
  subscribedAt: string;
  unsubscribedAt?: string;
  notes?: string;
}

export interface CmsCampaign {
  id: string;
  subject: string;
  headline: string;
  body: string;
  content?: string;
  featuredImage?: string;
  ctaButton?: string;
  ctaUrl?: string;
  footer?: string;
  status: 'draft' | 'sent';
  sentAt?: string;
  createdAt: string;
  recipientCount: number;
  recipients?: string[];
}

export type CmsNewsletterCampaign = CmsCampaign;

export interface CmsMembershipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  nationality: string;
  chapterOfInterest?: string;
  assignedChapter?: string;
  membershipCategory?: string;
  membershipTier?: string;
  membershipId?: string;
  approvedAt?: string;
  certificateIssuedAt?: string;
  certificateNumber?: string;
  motivationStatement?: string;
  status: 'pending' | 'reviewed' | 'approved';
  submittedAt: string;
  updatedAt?: string;
  lastEmailSentAt?: string;
  notes?: string;
  source?: string;
}

export interface CmsEmailDispatch {
  id: string;
  type: 'single' | 'mass';
  recipientEmail?: string;
  recipientName?: string;
  recipientCount?: number;
  targetGroup?: string;
  subject: string;
  body: string;
  templateUsed?: string;
  sentBy: string;
  sentAt: string;
  status: 'sent' | 'queued' | 'simulated';
}

export interface CmsContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  category?:
    | 'General Enquiry'
    | 'Membership'
    | 'Partnerships'
    | 'Media & Press'
    | 'Volunteering'
    | 'Programmes'
    | 'Opportunities'
    | 'Regional Chapters'
    | 'Leadership'
    | 'Other'
    | string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  notes?: string;
}

export interface CmsActivityLog {
  id: string;
  action: string;
  entity: string;
  description: string;
  adminEmail?: string;
  timestamp: string;
}

export interface CmsWebsiteSettings {
  notificationEmail: string;
  emergencyBannerEnabled: boolean;
  emergencyBannerText?: string;
  maintenanceMode: boolean;
  lastUpdated: string;
}

// 1. AYLA OPPORTUNITIES HUB
export type OpportunityCategory =
  | 'Scholarships'
  | 'Fellowships'
  | 'Internships'
  | 'Jobs & Careers'
  | 'Grants'
  | 'Competitions'
  | 'Conferences'
  | 'Training Opportunities'
  | 'Leadership Opportunities'
  | 'Volunteer Opportunities'
  | 'Exchange Programmes'
  | 'Other Youth Opportunities';

export interface CmsOpportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  category: OpportunityCategory;
  country: string;
  region: string;
  eligibility: string;
  applicationDeadline: string;
  applicationOpeningDate?: string;
  applicationLink: string;
  featuredImage?: string;
  tags: string[];
  publishedDate: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

// 2. VOLUNTEER WITH AYLA
export type VolunteerArea =
  | 'Communications'
  | 'Media'
  | 'Research'
  | 'Technology'
  | 'Events'
  | 'Programme Support'
  | 'Community Outreach'
  | 'Design'
  | 'Translation'
  | 'Regional Chapters'
  | 'Youth Engagement'
  | 'Administration';

export interface CmsVolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  skills: string;
  areaOfInterest: VolunteerArea | string;
  relevantExperience: string;
  availability: string;
  whyVolunteer: string;
  portfolioUrl?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'archived';
  notes?: string;
  submittedAt: string;
  updatedAt?: string;
}

// 3. AYLA LEADERSHIP ACADEMY
export type AcademyCategory =
  | 'Leadership Development'
  | 'Ethical Leadership'
  | 'Public Speaking'
  | 'Civic Leadership'
  | 'Governance'
  | 'Career Development'
  | 'Personal Branding'
  | 'Digital Skills'
  | 'Artificial Intelligence'
  | 'Entrepreneurship'
  | 'Innovation'
  | 'Policy & Advocacy'
  | 'Pan-African Leadership';

export interface CmsAcademyCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle?: string;
  category: AcademyCategory;
  duration: string;
  deliveryMethod: 'Online' | 'In-Person' | 'Hybrid';
  startDate: string;
  registrationDeadline: string;
  eligibility: string;
  learningOutcomes: string[];
  registrationButtonText?: string;
  registrationUrl: string;
  relatedResources?: string[];
  certificateAvailable: boolean;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  image?: string;
  createdAt: string;
}

// 4. AYLA CERTIFICATES
export type CertificateType =
  | 'Programme Participation'
  | 'Leadership Academy'
  | 'Volunteer Service'
  | 'Training'
  | 'Leadership'
  | 'Special Recognition';

export interface CmsCertificate {
  id: string;
  certificateNumber: string; // e.g. AYLA-2026-000001
  verificationCode: string;
  recipientName: string;
  programme: string;
  certificateType: CertificateType;
  issueDate: string;
  issuingAuthority: string;
  isValid: boolean;
  notes?: string;
  createdAt: string;
}

// 5. AYLA STORIES — VOICES OF YOUNG AFRICA
export type StoryCategory =
  | 'Member Stories'
  | 'Young Changemakers'
  | 'Chapter Stories'
  | 'Community Impact'
  | 'Leadership Stories'
  | 'Volunteer Stories'
  | 'Programme Stories'
  | 'Founder/Leadership Messages';

export interface CmsStory {
  id: string;
  title: string;
  slug: string;
  personName: string;
  country: string;
  chapter?: string;
  role: string;
  profileImage?: string;
  story: string;
  featuredImage?: string;
  publicationDate: string;
  category: StoryCategory;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

// 6. AYLA JOURNEY / TIMELINE
export type MilestoneCategory =
  | 'Founding'
  | 'Constitution'
  | 'Official Launch'
  | 'First Membership Drive'
  | 'Regional Expansion'
  | 'Major Programmes'
  | 'Major Summits'
  | 'Partnerships'
  | 'Important Institutional Milestones';

export interface CmsMilestone {
  id: string;
  year: string;
  dateOrMonth?: string;
  title: string;
  category: MilestoneCategory;
  description: string;
  location?: string;
  verified: boolean;
  published: boolean;
  displayOrder: number;
}

// 8. FAQ SYSTEM
export type FaqCategory =
  | 'MEMBERSHIP'
  | 'PROGRAMMES'
  | 'LEADERSHIP'
  | 'CHAPTERS'
  | 'EVENTS'
  | 'OPPORTUNITIES'
  | 'PARTNERSHIPS'
  | 'VOLUNTEERING'
  | 'CERTIFICATES'
  | 'GENERAL';

export interface CmsFaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  displayOrder: number;
  published: boolean;
}

// 9. AYLA COMMUNITY HUB
export interface CmsCommunityLink {
  id: string;
  platform: 'WhatsApp' | 'Telegram' | 'LinkedIn' | 'Instagram' | 'Facebook' | 'X' | 'TikTok' | 'Regional Hub' | string;
  name: string;
  url: string;
  handle?: string;
  description: string;
  region?: string;
  displayOrder: number;
  active: boolean;
}

// 12. AYLA IMPACT METRICS
export interface CmsImpactMetric {
  id: string;
  key: string;
  label: string;
  value: string;
  note: string;
  displayOrder: number;
  published: boolean;
}

// 13. JOIN THE AYLA TEAM
export type TeamDepartment =
  | 'Communications'
  | 'Technology'
  | 'Finance'
  | 'Programmes'
  | 'Research'
  | 'Events'
  | 'Membership'
  | 'Regional Coordination'
  | 'Youth Entrepreneurship'
  | 'Environment'
  | 'Education'
  | 'Culture & Heritage'
  | 'Monitoring & Evaluation';

export interface CmsTeamApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  department: TeamDepartment | string;
  experience: string;
  motivation: string;
  portfolioUrl?: string;
  availability: string;
  status: 'pending' | 'reviewed' | 'interview' | 'approved' | 'rejected' | 'archived';
  notes?: string;
  submittedAt: string;
  updatedAt?: string;
}

// 15. AYLA VIDEO / MEDIA STORIES (WATCH AYLA)
export type VideoCategory =
  | 'AYLA Institutional Video'
  | 'Leadership Messages'
  | 'Programme Videos'
  | 'Event Recordings'
  | 'Interviews'
  | 'Youth Stories'
  | 'Chapter Videos';

export interface CmsVideo {
  id: string;
  title: string;
  videoUrl: string; // YouTube or Vimeo URL
  description: string;
  thumbnail?: string;
  category: VideoCategory;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
}
