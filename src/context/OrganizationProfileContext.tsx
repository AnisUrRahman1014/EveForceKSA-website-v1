import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OrganizationProfileData, SocialLinks } from "../types/organization";
import mldLogo from "../assets/MLD.svg";
import profileCover from "../assets/images/profile-cover.jpg";

const DEFAULT_PROFILE: OrganizationProfileData = {
  organizationName: "MDLBEAST",
  tagline: "Entertainment & Events | Music, Culture & Experiences",
  logoDataUrl: mldLogo,
  coverDataUrl: profileCover,
  about: "",
  website: "www.mdlbeast.com",
  yearEstablished: "2019",
  city: "Riyadh",
  country: "Saudi Arabia",
  industry: "Event & Entertainment",
  social: {
    x: "https://x.com/mdlbeast",
    instagram: "https://instagram.com/mdlbeast",
    facebook: "https://facebook.com/mdlbeast",
    linkedin: "https://linkedin.com/company/mdlbeast",
    youtube: "https://youtube.com/@mdlbeast",
    vimeo: "",
  },
  followers: "3.1k",
  rating: 4.8,
  reviewCount: "1.2K",
  ratingBreakdown: [
    { stars: 5, count: 932 },
    { stars: 4, count: 198 },
    { stars: 3, count: 52 },
    { stars: 2, count: 6 },
    { stars: 1, count: 0 },
  ],
};

interface OrganizationProfileContextValue {
  profile: OrganizationProfileData;
  setProfile: (patch: Partial<OrganizationProfileData>) => void;
  setSocial: (patch: Partial<SocialLinks>) => void;
  isComplete: boolean;
}

const OrganizationProfileContext = createContext<OrganizationProfileContextValue | undefined>(
  undefined
);

export const OrganizationProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<OrganizationProfileData>(DEFAULT_PROFILE);

  const setProfile = useCallback((patch: Partial<OrganizationProfileData>) => {
    setProfileState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setSocial = useCallback((patch: Partial<SocialLinks>) => {
    setProfileState((prev) => ({ ...prev, social: { ...prev.social, ...patch } }));
  }, []);

  const isComplete = Boolean(profile.organizationName && profile.about);

  const value = useMemo(
    () => ({ profile, setProfile, setSocial, isComplete }),
    [profile, setProfile, setSocial, isComplete]
  );

  return (
    <OrganizationProfileContext.Provider value={value}>
      {children}
    </OrganizationProfileContext.Provider>
  );
};

export const useOrganizationProfile = () => {
  const ctx = useContext(OrganizationProfileContext);
  if (!ctx) {
    throw new Error("useOrganizationProfile must be used within an OrganizationProfileProvider");
  }
  return ctx;
};
