import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Allow animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'error':
        return 'bi-exclamation-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      default:
        return 'bi-check-circle-fill';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#10b981';
    }
  };

  return (
    <div
      className={`position-fixed bottom-0 end-0 p-3 ${isVisible ? 'fade-in' : 'fade-out'}`}
      style={{ zIndex: 1050 }}
    >
      <div
        className="d-flex align-items-center text-white px-3 py-2 rounded shadow-lg"
        style={{
          backgroundColor: getBackgroundColor(),
          minWidth: '250px',
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      >
        <i className={`bi ${getIcon()} me-2`}></i>
        <div>{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white ms-auto"
          onClick={() => {
            setIsVisible(false);
            if (onClose) setTimeout(onClose, 300);
          }}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;