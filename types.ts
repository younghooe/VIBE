export interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  insight: string;
  presentationUrl?: string; // PDF URL or Google Slides Embed URL
}

export interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
}

export interface ModalFormData {
  name: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}