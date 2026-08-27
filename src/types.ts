export type Language = 'en' | 'ar';

export interface CompanyInfo {
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  email: string;
  phone: string;
  whatsapp: string;
  locations: {
    city: string;
    cityAr: string;
    country: string;
    countryAr: string;
    address: string;
    addressAr: string;
  }[];
  workingHours: {
    days: string;
    daysAr: string;
    hours: string;
    hoursAr: string;
  };
  socials: {
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
}

export interface CredibilityStat {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  shortDesc: string;
  shortDescAr: string;
  fullDesc: string;
  fullDescAr: string;
  iconName: string;
  image: string;
  gallery?: string[];
  keyDeliverables: string[];
  keyDeliverablesAr: string[];
  businessImpact: string;
  businessImpactAr: string;
}

export interface CaseStudyData {
  client: string;
  clientAr: string;
  industry: string;
  industryAr: string;
  year: string;
  duration: string;
  summary: string;
  summaryAr: string;
  challenge: string;
  challengeAr: string;
  strategy: string;
  strategyAr: string;
  solution: string;
  solutionAr: string;
  execution: string[];
  executionAr: string[];
  results: {
    metric: string;
    metricAr: string;
    value: string;
    sublabel: string;
    sublabelAr: string;
  }[];
  chartData: {
    period: string;
    performance: number;
    baseline: number;
  }[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  galleryImages: string[];
}

export interface PortfolioProject {
  id: string;
  serviceId?: string;
  title: string;
  titleAr: string;
  client: string;
  clientAr: string;
  industry: string;
  industryAr: string;
  category: 'Branding' | 'Digital Marketing' | 'Social Media' | 'Content Creation' | 'Advertising' | 'Websites';
  categoryAr: string;
  image: string;
  featured: boolean;
  services: string[];
  servicesAr: string[];
  shortDesc: string;
  shortDescAr: string;
  description?: string;
  descriptionAr?: string;
  year?: string;
  statsHighlight?: {
    value: string;
    label: string;
    labelAr: string;
  };
  resultMetric: {
    value: string;
    label: string;
    labelAr: string;
  };
  caseStudy: CaseStudyData;
}

export interface FeaturedCaseStudyItem {
  id: string;
  client: string;
  clientAr: string;
  industry: string;
  industryAr: string;
  serviceCategory: string;
  serviceCategoryAr: string;
  title: string;
  titleAr: string;
  image: string;
  year?: string;
  services?: string[];
  servicesAr?: string[];
  challenge: string;
  challengeAr: string;
  solution: string;
  solutionAr: string;
  result: string;
  resultAr: string;
  metrics?: {
    label: string;
    labelAr: string;
    value: string;
  }[];
  stats: {
    metric: string;
    metricAr: string;
    value: string;
  }[];
  linkedProjectId?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  iconName: string;
  duration?: string;
  deliverable?: string;
  deliverableAr?: string;
  keyDeliverables: string[];
  keyDeliverablesAr: string[];
}

export interface WhyChooseUsPillar {
  id: string;
  number: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  iconName: string;
  highlight: string;
  highlightAr: string;
  proofPoint?: string;
  proofPointAr?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  nameAr: string;
  iconName: string;
  growthStat?: string;
  description: string;
  descriptionAr: string;
  solutions?: string[];
  solutionsAr?: string[];
  keySolutions: string[];
  keySolutionsAr: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  nameAr: string;
  position: string;
  positionAr: string;
  company: string;
  companyAr: string;
  avatar: string;
  rating: number;
  quote: string;
  quoteAr: string;
  projectCategory: string;
  projectCategoryAr: string;
  verifiedResult: string;
  verifiedResultAr: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  nameAr: string;
  industry: string;
  industryAr: string;
  category: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  category: string;
  categoryAr: string;
  date: string;
  readTime: string;
  readTimeAr: string;
  image: string;
}

export interface TeamMember {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  specialty?: string;
  avatar?: string;
  id?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface ProjectScopeEstimate {
  services: string[];
  industry: string;
  budgetRange: string;
  timeline: string;
  targetAudience: string;
  deliverables: string[];
  estimatedDays: number;
  recommendedPackage: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
