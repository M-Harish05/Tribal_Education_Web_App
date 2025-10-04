import React from 'react';
import Icon from './AppIcon';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary rounded-tribal flex items-center justify-center mx-auto mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Tribal Education Portal
          </h1>
          <p className="text-muted-foreground">
            గిరిజన విద్యా పోర్టల్
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin">
            <Icon name="Loader2" size={20} className="text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
