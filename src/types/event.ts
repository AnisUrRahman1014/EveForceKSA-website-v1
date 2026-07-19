export interface RoleRequirement {
  id: string;
  type: string;
  description: string;
}

export interface EventRole {
  id: string;
  roleType: string;
  staffCount: number;
  ratePerDay: number;
  days: string[];
  startTime: string;
  endTime: string;
  requirements: RoleRequirement[];
}

export interface EventDetailsData {
  eventName: string;
  category: string;
  city: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  languages: string[];
  description: string;
  expirationDate: string;
  expirationTime: string;
  requirements: string[];
  perks: string[];
}

export const ROLE_TYPES = [
  "Photographer",
  "Event Host",
  "Videographer",
  "Musician",
  "Stage Crew",
  "VIP Coordinator",
  "Catering Staff",
];

export const REQUIREMENT_TYPES = [
  "Gender",
  "Dress Code (Male)",
  "Dress Code (Female)",
  "Accessories",
  "Other",
];

export const EVENT_REQUIREMENT_OPTIONS = [
  "Minimum Age (18+)",
  "Valid National ID / Iqama",
  "Work Authorization",
  "Driving License",
  "Background Check",
  "NDA Acceptance",
  "Safety Briefing Required",
  "Previous Event Experience",
  "Full Event Availability",
  "Own Transportation",
  "Security Clearance",
  "Student ID (if applicable)",
];

export const EVENT_PERK_OPTIONS = [
  "VIP Access",
  "Media Pass",
  "Transportation",
  "Crew Meals",
  "Accomodation",
  "Staff Lounge",
  "Networking",
  "Certificates",
  "Refreshments",
  "Locker Access",
  "Parking Pass",
  "Wi-Fi Access",
];

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

export const CATEGORY_OPTIONS = [
  "Music Festival",
  "Conference",
  "Corporate Event",
  "Wedding",
  "Sports Event",
  "Exhibition",
  "Product Launch",
  "Private Party",
];

export const LANGUAGE_OPTIONS = ["English", "Arabic", "Urdu", "French", "Hindi"];

export const TIME_OPTIONS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

export const SCHEDULE_DAYS = [
  { key: "mon", label: "Mon", date: "26", month: "May" },
  { key: "tue", label: "Tue", date: "27", month: "May" },
  { key: "wed", label: "Wed", date: "28", month: "May" },
  { key: "thu", label: "Thurs", date: "29", month: "May" },
];
