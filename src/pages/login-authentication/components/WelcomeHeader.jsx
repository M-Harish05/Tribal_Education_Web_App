import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo and Title */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-tribal text-primary-foreground shadow-tribal-md">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12"
            fill="currentColor"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            గిరిజన విద్యా పోర్టల్
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Tribal Education Portal
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-3 max-w-md mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Heart" size={20} className="text-accent" />
          <h2 className="text-xl font-heading font-semibold text-foreground">
            స్వాగతం / Welcome
          </h2>
          <Icon name="Heart" size={20} className="text-accent" />
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          మీ విద్యా ప్రయాణం ప్రారంభించడానికి మొబైల్ నంబర్‌తో లాగిన్ అవ్వండి
        </p>
        <p className="text-xs text-muted-foreground">
          Login with your mobile number to start your educational journey
        </p>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-6">
        <div className="flex flex-col items-center space-y-2 p-3 bg-muted/30 rounded-tribal">
          <Icon name="BookOpen" size={24} className="text-primary" />
          <span className="text-xs font-caption text-muted-foreground">నేర్చుకోండి</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3 bg-muted/30 rounded-tribal">
          <Icon name="Users" size={24} className="text-secondary" />
          <span className="text-xs font-caption text-muted-foreground">కమ్యూనిటీ</span>
        </div>
        <div className="flex flex-col items-center space-y-2 p-3 bg-muted/30 rounded-tribal">
          <Icon name="Award" size={24} className="text-accent" />
          <span className="text-xs font-caption text-muted-foreground">సర్టిఫికేట్</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;