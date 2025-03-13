import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTeamMembers } from '../context/TeamMemberContext';
import {
  containerStyles,
  headerContainerStyles,
  pageHeadingStyles,
  pageSubtextStyles,
  primaryButtonStyles,
  countTextStyles,
  gridLayoutStyles,
  cardContainerStyles,
  cardTitleStyles,
  cardTextStyles,
  adminBadgeStyles
} from '../styles/theme';

const ListPage: React.FC = () => {
  const { teamMembers } = useTeamMembers();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={containerStyles}>
        {/* Page Header */}
        <div className={headerContainerStyles}>
          <div>
            <h2 className={pageHeadingStyles}>Team Members</h2>
            <p className={pageSubtextStyles}>
              Manage your organization's team members here.
            </p>
          </div>
          <div
            onClick={() => navigate('/add')}                        
            className={primaryButtonStyles}
          >
            + Add Member
          </div>
        </div>

        {/* Team Member Count */}
        <p className={countTextStyles}>{`Total: ${teamMembers.length}`}</p>

        {/* Team Member Grid */}
        <div className={gridLayoutStyles}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={cardContainerStyles}
              onClick={() => navigate(`/edit/${member.id}`)}
            >
              <h3 className={cardTitleStyles}>
                {member.first_name} {member.last_name}{' '}
                {member.role === 'admin' && (
                  <span className={adminBadgeStyles}>
                    (Admin)
                  </span>
                )}
              </h3>
              <p className={cardTextStyles}>{member.email}</p>
              <p className={cardTextStyles}>{member.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListPage;
