import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTeamMembers } from '../context/TeamMemberContext';
import { 
  containerStyles, 
  pageHeadingStyles, 
  primaryButtonStyles,
  cardContainerStyles
} from '../styles/theme';
import { TeamMember } from '../types';

const AddPage: React.FC = () => {
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    role: 'regular'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addTeamMember, error } = useTeamMembers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await addTeamMember(formData);
    setIsSubmitting(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className={containerStyles}>
        <h2 className={`${pageHeadingStyles} mb-4`}>Add Team Member</h2>
        
        {/* Error display component */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={`max-w-md ${cardContainerStyles.replace('cursor-pointer', '')}`}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="regular">Regular</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className={primaryButtonStyles.replace('sm:mt-0', '')}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPage;