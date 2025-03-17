import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTeamMembers } from '../context/TeamMemberContext';
import { TeamMember } from '../types';
import { 
  containerStyles, 
  pageHeadingStyles, 
  pageSubtextStyles,
  primaryButtonStyles,
  cardContainerStyles,
  headerContainerStyles
} from '../styles/theme';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { teamMembers, updateTeamMember, deleteTeamMember, loading, error, clearError } = useTeamMembers();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Clear any previous errors when the component mounts
    clearError();
    
    const member = teamMembers.find(m => m.id === Number(id));
    if (member) {
      setFormData(member);
    }
  }, [id, teamMembers, clearError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      setIsSubmitting(true);
      const success = await updateTeamMember(formData);
      setIsSubmitting(false);
      if (success) {
        navigate('/');
      }
    }
  };

  const handleDelete = async () => {
    if (formData) {
      // Confirm deletion
      const confirmDelete = window.confirm(`Are you sure you want to delete ${formData.first_name} ${formData.last_name}?`);
      if (!confirmDelete) return;
      
      setIsSubmitting(true);
      const success = await deleteTeamMember(formData.id);
      setIsSubmitting(false);
      if (success) {
        navigate('/');
      }
    }
  };

  if (loading) return (
    <Layout>
      <div className={containerStyles}>
        <p className="text-gray-600">Loading...</p>
      </div>
    </Layout>
  );

  if (!formData) return (
    <Layout>
      <div className={containerStyles}>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4" role="alert">
          <p>Team member not found. The requested member may have been removed or doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
          >
            Return to Team List
          </button>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={containerStyles}>
        {/* Page Header */}
        <div className={headerContainerStyles.replace('sm:items-center', '').replace('flex flex-col sm:flex-row justify-between', '')}>
          <h2 className={pageHeadingStyles}>Edit Team Member</h2>
          <p className={pageSubtextStyles}>
            Update details of the selected team member.
          </p>
        </div>

        {/* Error display component */}
        {error && (
          <div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" 
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className={`max-w-md ${cardContainerStyles.replace('cursor-pointer', '')}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-1">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="regular">Regular</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className={primaryButtonStyles.replace('sm:mt-0', '')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditPage;