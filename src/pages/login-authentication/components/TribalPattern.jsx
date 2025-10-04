import React from 'react';

const TribalPattern = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main Tribal Pattern */}
      <div className="absolute inset-0 tribal-pattern opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-20">
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 w-20 h-20 opacity-15">
        <svg viewBox="0 0 80 80" className="w-full h-full text-secondary">
          <path d="M40 10 L60 30 L40 50 L20 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40 20 L50 30 L40 40 L30 30 Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-4 w-12 h-12 opacity-25 transform -translate-y-1/2">
        <svg viewBox="0 0 48 48" className="w-full h-full text-accent">
          <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-1/4 right-4 w-14 h-14 opacity-20">
        <svg viewBox="0 0 56 56" className="w-full h-full text-primary">
          <polygon points="28,8 48,20 48,36 28,48 8,36 8,20" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="28,16 40,22 40,34 28,40 16,34 16,22" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
};

export default TribalPattern;