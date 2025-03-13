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
  const { teamMembers, updateTeamMember, deleteTeamMember, loading, error } = useTeamMembers();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const member = teamMembers.find(m => m.id === Number(id));
    if (member) {
      setFormData(member);
    }
  }, [id, teamMembers]);

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
      <p>Loading...</p>
    </Layout>
  );

  if (!formData) return (
    <Layout>
      <p>Team member not found.</p>
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

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {/* Form Card */}
        <div className={`max-w-md ${cardContainerStyles.replace('cursor-pointer', '')}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
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
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
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
