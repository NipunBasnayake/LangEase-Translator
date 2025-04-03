import React from 'react';

const HoverButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      className={`hover-button d-flex align-items-center ${className || ''}`}
      onClick={onClick}
    >
      <i className={`bi ${icon} me-2`}></i>
      <span className="hover-label">{label}</span>
    </button>
  );
};

export default HoverButton;