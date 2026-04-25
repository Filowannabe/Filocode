export interface ClientFeedback {
  rating: number;
  reviewer: string;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CollaborationUrls {
  clientSite?: string;
  clientAppStore?: string;
  docbracesSite?: string;
}

export interface Collaboration {
  id: string;
  type: "collaboration";
  title: string;
  company: string;
  service: string;
  country: string;
  engagementModel: string;
  budget?: string;
  duration?: string;
  clientOverview: string;
  techStack: string[];
  servicesProvided: string[];
  results: string[];
  clientFeedback?: ClientFeedback[];
  faq?: FAQ[];
  urls: CollaborationUrls;
}

export interface CollaborationsData {
  metadata: {
    generatedAt: string;
    source: string;
    version: string;
    totalEntries: number;
  };
  collaborations: Collaboration[];
}
