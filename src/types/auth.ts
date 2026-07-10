export interface CreateOrganizerAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  password: string;
  companyOrigin: string;
}

export interface CreateOrganizerAccountResponse {
  success: boolean;
  message: string;
  userId?: string;
}
