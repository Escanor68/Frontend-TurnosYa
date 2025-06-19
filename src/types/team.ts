export interface TeamMember {
  id: string;
  name: string;
  profileImage?: string;
  role?: string;
}

export interface Match {
  id: string;
  date: string;
  fieldId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  opponent?: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  upcomingMatches: Match[];
  createdAt?: string;
  updatedAt?: string;
}
