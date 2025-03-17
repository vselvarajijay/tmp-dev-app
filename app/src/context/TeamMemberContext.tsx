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
  clearError: () => void;
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
      setError(null); // Clear any previous errors
      const response = await teamMemberApi.getAllTeamMembers();
      

      debugger;
      if (response.error) {
        let errorMessage;
        if (typeof response.error === 'string') {
          errorMessage = response.error;
        } else if (response.error.detail) {
          errorMessage = response.error.detail;
        } else if (response.error.message) {
          errorMessage = response.error.message;
        } else if (response.error.data?.detail) {
          errorMessage = response.error.data.detail;
        } else if (response.error.data?.message) {
          errorMessage = response.error.data.message;
        } else {
          errorMessage = 'An unknown error occurred';
        }
        
        // Remove redundant "Error:" prefix if it exists
        errorMessage = errorMessage.replace(/^Error:\s+/i, '');
        setError(errorMessage);
      } else if (response.data) {
        setTeamMembers(response.data);
      }
      
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  const clearError = () => {
    setError(null);
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>): Promise<boolean> => {
    setError(null); // Clear any previous errors
    const response = await teamMemberApi.createTeamMember(member);
    
          if (response.error) {
      // Handle different error formats and strip redundant "Error:" prefixes
      let errorMessage = '';
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error.detail) {
        // Handle the specific case with a detail field
        errorMessage = response.error.detail;
      } else if (response.error.message) {
        errorMessage = response.error.message;
      } else if (response.error.data?.message) {
        errorMessage = response.error.data.message;
      } else if (response.error.data?.detail) {
        // Also check for detail in the data object
        errorMessage = response.error.data.detail;
      } else {
        errorMessage = 'Failed to add team member';
      }
      
      // Remove redundant "Error:" prefix if it exists
      errorMessage = errorMessage.replace(/^Error:\s+/i, '');
      setError(errorMessage);
      return false;
    }
    
    if (response.data) {
      setTeamMembers([...teamMembers, response.data]);
      return true;
    }
    
    return false;
  };

  const updateTeamMember = async (updated: TeamMember): Promise<boolean> => {
    setError(null); // Clear any previous errors
    const response = await teamMemberApi.updateTeamMember(updated);
    
          if (response.error) {
      // Handle different error formats and strip redundant "Error:" prefixes
      let errorMessage = '';
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error.detail) {
        // Handle the specific case with a detail field
        errorMessage = response.error.detail;
      } else if (response.error.message) {
        errorMessage = response.error.message;
      } else if (response.error.data?.message) {
        errorMessage = response.error.data.message;
      } else if (response.error.data?.detail) {
        // Also check for detail in the data object
        errorMessage = response.error.data.detail;
      } else {
        errorMessage = 'Failed to update team member';
      }
      
      // Remove redundant "Error:" prefix if it exists
      errorMessage = errorMessage.replace(/^Error:\s+/i, '');
      setError(errorMessage);
      return false;
    }
    
    if (response.data) {
      setTeamMembers(teamMembers.map(m => (m.id === updated.id ? response.data! : m)));
      return true;
    }
    
    return false;
  };

  const deleteTeamMember = async (id: number): Promise<boolean> => {
    setError(null); // Clear any previous errors
    const response = await teamMemberApi.deleteTeamMember(id);
    
          if (response.error) {
      // Handle different error formats and strip redundant "Error:" prefixes
      let errorMessage = '';
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error.detail) {
        // Handle the specific case with a detail field
        errorMessage = response.error.detail;
      } else if (response.error.message) {
        errorMessage = response.error.message;
      } else if (response.error.data?.message) {
        errorMessage = response.error.data.message;
      } else if (response.error.data?.detail) {
        // Also check for detail in the data object
        errorMessage = response.error.data.detail;
      } else {
        errorMessage = 'Failed to delete team member';
      }
      
      // Remove redundant "Error:" prefix if it exists
      errorMessage = errorMessage.replace(/^Error:\s+/i, '');
      setError(errorMessage);
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
        deleteTeamMember,
        clearError
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