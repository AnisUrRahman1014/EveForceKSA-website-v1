export interface SocialLinks {
  x: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  vimeo: string;
}

export interface OrganizationProfileData {
  organizationName: string;
  tagline: string;
  logoDataUrl: string;
  coverDataUrl: string;
  about: string;
  website: string;
  yearEstablished: string;
  city: string;
  country: string;
  industry: string;
  social: SocialLinks;
  followers: string;
  rating: number;
  reviewCount: string;
  ratingBreakdown: { stars: number; count: number }[];
}

export const YEAR_OPTIONS = Array.from({ length: 40 }, (_, i) => String(2025 - i));

export const CITY_OPTIONS = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Khobar",
  "Mecca",
  "Medina",
  "Abha",
  "Tabuk",
];

export const COUNTRY_OPTIONS = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
];

export const INDUSTRY_OPTIONS = [
  "Event & Entertainment",
  "Music Festivals",
  "Corporate Events",
  "Sports & Recreation",
  "Weddings & Private Events",
  "Exhibitions & Trade Shows",
  "Hospitality & Tourism",
];
