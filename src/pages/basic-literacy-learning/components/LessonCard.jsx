import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LessonCard = ({ 
  lesson, 
  isActive = false, 
  isCompleted = false, 
  isLocked = false, 
  onClick,
  className = '' 
}) => {
  const getStatusIcon = () => {
    if (isCompleted) return 'CheckCircle';
    if (isActive) return 'Play';
    if (isLocked) return 'Lock';
    return 'Circle';
  };

  const getStatusColor = () => {
    if (isCompleted) return 'text-success';
    if (isActive) return 'text-primary';
    if (isLocked) return 'text-muted-foreground';
    return 'text-muted-foreground';
  };

  return (
    <div className={`relative bg-card border border-border rounded-tribal p-4 smooth-transition ${
      isActive ? 'ring-2 ring-primary shadow-tribal-md' : 'hover:shadow-tribal-sm'
    } ${isLocked ? 'opacity-60' : ''} ${className}`}>
      {/* Status Badge */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center">
        <Icon 
          name={getStatusIcon()} 
          size={16} 
          className={getStatusColor()}
        />
      </div>
      {/* Lesson Image */}
      <div className="relative mb-3 overflow-hidden rounded-tribal-sm">
        <Image
          src={lesson?.image}
          alt={lesson?.title}
          className="w-full h-32 object-cover"
        />
        {lesson?.duration && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-tribal-sm">
            <span className="text-xs font-mono text-foreground">
              {lesson?.duration}
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-foreground text-sm">
          {lesson?.title}
        </h3>
        <p className="text-xs font-caption text-muted-foreground">
          {lesson?.titleTelugu}
        </p>
        
        {lesson?.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {lesson?.description}
          </p>
        )}

        {/* Progress Bar */}
        {lesson?.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-mono text-foreground">
                {lesson?.progress}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full smooth-transition"
                style={{ width: `${lesson?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={isActive ? "default" : "outline"}
          size="sm"
          onClick={onClick}
          disabled={isLocked}
          className="w-full mt-3"
          iconName={isCompleted ? "RotateCcw" : "Play"}
          iconPosition="left"
          iconSize={14}
        >
          {isCompleted ? 'Review' : isActive ? 'Continue' : 'Start'}
        </Button>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default LessonCard;