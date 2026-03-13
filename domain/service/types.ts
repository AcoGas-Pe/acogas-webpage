/**
 * Service domain types – dynamic service detail pages.
 * Clean architecture: domain layer, no framework dependencies.
 */

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceApplication {
  industry: string;
  useCase: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

/**
 * Main Service data structure for dynamic service pages.
 */
export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  longDescription: string;
  heroImage?: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  applications: ServiceApplication[];
  faqs: ServiceFAQ[];
  relatedProducts: string[];
  ctaTitle: string;
  ctaDescription: string;
  metaTitle: string;
  metaDescription: string;
}
