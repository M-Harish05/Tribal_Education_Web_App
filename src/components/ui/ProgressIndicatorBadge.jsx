import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicatorBadge = ({ 
  progress = 0, 
  total = 100, 
  achievements = 0, 
  size = 'default',
  showPercentage = true,
  className = '' 
}) => {
  const percentage = Math.round((progress / total) * 100);
  const stars = Math.min(Math.floor(percentage / 20), 5); // 5 stars max, 1 star per 20%

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const starSize = {
    sm: 12,
    default: 14,
    lg: 16
  };

  return (
    <div className={`inline-flex items-center space-x-2 bg-muted rounded-tribal border border-border ${sizeClasses?.[size]} ${className}`}>
      {/* Progress Stars */}
      <div className="flex items-center space-x-0.5">
        {[...Array(5)]?.map((_, index) => (
          <Icon
            key={index}
            name="Star"
            size={starSize?.[size]}
            className={`${
              index < stars 
                ? 'text-warning fill-current' :'text-muted-foreground'
            } smooth-transition`}
          />
        ))}
      </div>
      {/* Progress Percentage */}
      {showPercentage && (
        <span className="font-mono font-medium text-foreground">
          {percentage}%
        </span>
      )}
      {/* Achievement Badge */}
      {achievements > 0 && (
        <div className="flex items-center space-x-1 bg-success text-success-foreground rounded-tribal-sm px-2 py-0.5">
          <Icon name="Award" size={starSize?.[size]} />
          <span className="font-mono text-xs font-medium">
            {achievements}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicatorBadge;