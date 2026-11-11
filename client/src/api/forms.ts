import { apiClient } from './client';

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  message: string;
}

export interface EnquiryPayload {
  eventType: string;
  services: string[];
  eventDate?: string;
  location: string;
  guestCount?: string;
  budgetRange?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialNotes?: string;
}

export const submitContact = async (payload: ContactPayload) => {
  const response = await apiClient.post('/contact', payload);
  return response.data as { success: boolean; id: string };
};

export const submitEnquiry = async (payload: EnquiryPayload) => {
  const response = await apiClient.post('/enquiries', payload);
  return response.data as { success: boolean; enquiryNumber: string };
};
