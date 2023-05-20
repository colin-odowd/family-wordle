import React from 'react';
import Header from './Header';

export default function AdminPage({ isAuthenticated }) {
  return (
    <div>
      < Header 
        isAuthenticated={isAuthenticated}
      />
      {/* Other content for the admin page */}
    </div>
  );
}