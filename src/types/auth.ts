export type OrganizerAccountType = "organizer" | "client";

export interface CreateOrganizerAccountPayload {
  accountType: OrganizerAccountType;
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  contactNumber: string;
  organizationWebsite?: string;
  password: string;
  companyOrigin: string;
}

export interface CreateOrganizerAccountResponse {
  success: boolean;
  message: string;
  userId?: string;
}
