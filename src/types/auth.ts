export interface CreateOrganizerAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  organizationEmail: string;
  password: string;
  companyOrigin: string;
}

export interface CreateOrganizerAccountResponse {
  success: boolean;
  message: string;
  userId?: string;
}
