/**
 * City domain types – dynamic city landing pages.
 * Clean architecture: domain layer, no framework dependencies.
 */

export interface CityHeroData {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  tertiaryAction?: { label: string; href: string };
}

export interface CityStat {
  value: string;
  label: string;
}

export interface CityFeature {
  title: string;
  description: string;
}

export interface CityTestimonial {
  name: string;
  company: string;
  quote: string;
  rating: number;
}

export interface CityIndustry {
  name: string;
  description: string;
}

/**
 * Main City data structure for dynamic city pages.
 * Each city has its own landing page with localized content.
 */
export interface City {
  slug: string;
  name: string;
  region: string;
  isLimaDistrict?: boolean;
  parentCity?: string;
  hero: CityHeroData;
  stats: CityStat[];
  features: CityFeature[];
  industries: CityIndustry[];
  testimonials: CityTestimonial[];
  mapEmbedUrl?: string;
  metaTitle: string;
  metaDescription: string;
}
