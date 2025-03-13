import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 p-4 text-white">
        <Link to="/">
          <h1 className="text-2xl">Team Member Manager</h1>
        </Link>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 p-4 text-white text-center">
        Test Project
      </footer>
    </div>
  );
};

export default Layout;
