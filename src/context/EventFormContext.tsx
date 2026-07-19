import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { EventDetailsData, EventRole } from "../types/event";

const DEFAULT_DETAILS: EventDetailsData = {
  eventName: "",
  category: "",
  city: "",
  location: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  languages: [],
  description: "",
  expirationDate: "",
  expirationTime: "",
  requirements: [
    "Minimum Age (18+)",
    "Work Authorization",
    "NDA Acceptance",
    "Full Event Availability",
    "Previous Event Experience",
    "Security Clearance",
  ],
  perks: [
    "VIP Access",
    "Crew Meals",
    "Staff Lounge",
    "Networking",
    "Refreshments",
    "Parking Pass",
  ],
};

export type HiringMode = "self" | "eveforce";

interface EventFormContextValue {
  details: EventDetailsData;
  setDetails: (patch: Partial<EventDetailsData>) => void;
  roles: EventRole[];
  addRole: (role: EventRole) => void;
  updateRole: (id: string, patch: Partial<EventRole>) => void;
  removeRole: (id: string) => void;
  hiringMode: HiringMode;
  setHiringMode: (mode: HiringMode) => void;
  referenceNumber: string;
  setReferenceNumber: (val: string) => void;
  reset: () => void;
}

const EventFormContext = createContext<EventFormContextValue | undefined>(undefined);

export const EventFormProvider = ({ children }: { children: ReactNode }) => {
  const [details, setDetailsState] = useState<EventDetailsData>(DEFAULT_DETAILS);
  const [roles, setRoles] = useState<EventRole[]>([]);
  const [hiringMode, setHiringMode] = useState<HiringMode>("self");
  const [referenceNumber, setReferenceNumber] = useState("");

  const setDetails = useCallback((patch: Partial<EventDetailsData>) => {
    setDetailsState((prev) => ({ ...prev, ...patch }));
  }, []);

  const addRole = useCallback((role: EventRole) => {
    setRoles((prev) => [...prev, role]);
  }, []);

  const updateRole = useCallback((id: string, patch: Partial<EventRole>) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const removeRole = useCallback((id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const reset = useCallback(() => {
    setDetailsState(DEFAULT_DETAILS);
    setRoles([]);
    setHiringMode("self");
    setReferenceNumber("");
  }, []);

  const value = useMemo(
    () => ({
      details,
      setDetails,
      roles,
      addRole,
      updateRole,
      removeRole,
      hiringMode,
      setHiringMode,
      referenceNumber,
      setReferenceNumber,
      reset,
    }),
    [details, setDetails, roles, addRole, updateRole, removeRole, hiringMode, referenceNumber, reset]
  );

  return <EventFormContext.Provider value={value}>{children}</EventFormContext.Provider>;
};

export const useEventForm = () => {
  const ctx = useContext(EventFormContext);
  if (!ctx) {
    throw new Error("useEventForm must be used within an EventFormProvider");
  }
  return ctx;
};
