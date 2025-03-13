import { TeamMember } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic fetch function with error handling
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || `Error: ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}

// Team Members API Service
export const teamMemberApi = {
  // Get all team members
  getAllTeamMembers: () => fetchApi<TeamMember[]>('/team-members'),
  
  // Get a single team member by ID
  getTeamMember: (id: number) => fetchApi<TeamMember>(`/team-members/${id}`),
  
  // Create a new team member
  createTeamMember: (member: Omit<TeamMember, 'id'>) => 
    fetchApi<TeamMember>('/team-members', {
      method: 'POST',
      body: JSON.stringify(member),
    }),
  
  // Update an existing team member
  updateTeamMember: (member: TeamMember) => 
    fetchApi<TeamMember>(`/team-members/${member.id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    }),
  
  // Delete a team member
  deleteTeamMember: (id: number) => 
    fetchApi<void>(`/team-members/${id}`, {
      method: 'DELETE',
    }),
};
