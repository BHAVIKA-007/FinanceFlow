import React from 'react';
import './RoleToggle.css';

function RoleToggle({ role, onToggle }) {
  return (
    <div className="role-toggle">
      <label>
        <input
          type="checkbox"
          checked={role === 'Viewer'}
          onChange={onToggle}
        />
        Viewer Mode
      </label>
      <span>Role: {role}</span>
    </div>
  );
}

export default RoleToggle;