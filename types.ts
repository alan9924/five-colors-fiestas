export interface NavItem {
  label: string;
  href: string;
}

export interface PartyPlanRequest {
  ageGroup: string;
  theme: string;
  guests: number;
}

export interface GeneratedPlan {
  schedule: string[];
  games: string[];
  tips: string;
}