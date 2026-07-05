import axiosClient from "./axiosClient";
import type {
  CreateOrganizerAccountPayload,
  CreateOrganizerAccountResponse,
} from "../types/auth";

export const createOrganizerAccount = async (
  payload: CreateOrganizerAccountPayload
): Promise<CreateOrganizerAccountResponse> => {
  const { data } = await axiosClient.post<CreateOrganizerAccountResponse>(
    "/auth/organizer/signup",
    payload
  );
  return data;
};
