import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { TeamMember } from '../types';
import { teamMemberApi } from '../services/api';

interface TeamMemberContextType {
  teamMembers: TeamMember[];
  loading: boolean;
  error: string | null;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<boolean>;
  updateTeamMember: (member: TeamMember) => Promise<boolean>;
  deleteTeamMember: (id: number) => Promise<boolean>;
}

const TeamMemberContext = createContext<TeamMemberContextType | undefined>(undefined);

export const TeamMemberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load team members on component mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      const response = await teamMemberApi.getAllTeamMembers();
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setTeamMembers(response.data);
      }
      
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  const addTeamMember = async (member: Omit<TeamMember, 'id'>): Promise<boolean> => {
    const response = await teamMemberApi.createTeamMember(member);
    
    if (response.error) {
      setError(response.error);
      return false;
    }
    
    if (response.data) {
      setTeamMembers([...teamMembers, response.data]);
      return true;
    }
    
    return false;
  };

  const updateTeamMember = async (updated: TeamMember): Promise<boolean> => {
    const response = await teamMemberApi.updateTeamMember(updated);
    
    if (response.error) {
      setError(response.error);
      return false;
    }
    
    if (response.data) {
      setTeamMembers(teamMembers.map(m => (m.id === updated.id ? response.data! : m)));
      return true;
    }
    
    return false;
  };

  const deleteTeamMember = async (id: number): Promise<boolean> => {
    const response = await teamMemberApi.deleteTeamMember(id);
    
    if (response.error) {
      setError(response.error);
      return false;
    }
    
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    return true;
  };
    
  return (
    <TeamMemberContext.Provider 
      value={{ 
        teamMembers, 
        loading, 
        error, 
        addTeamMember, 
        updateTeamMember, 
        deleteTeamMember 
      }}
    >
      {children}
    </TeamMemberContext.Provider>
  );
};

export const useTeamMembers = () => {
  const context = useContext(TeamMemberContext);
  if (context === undefined) {
    throw new Error('useTeamMembers must be used within a TeamMemberProvider');
  }
  return context;
};
