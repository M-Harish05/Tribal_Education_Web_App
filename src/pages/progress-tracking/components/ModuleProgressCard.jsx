import React from 'react';
import Icon from '../../../components/AppIcon';

const ModuleProgressCard = ({ 
  title, 
  titleTelugu, 
  progress, 
  totalLessons, 
  completedLessons, 
  icon, 
  color = 'primary',
  lastActivity,
  nextLesson,
  isLocked = false
}) => {
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
      progress: 'bg-primary'
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20',
      progress: 'bg-secondary'
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
      progress: 'bg-accent'
    }
  };

  const styles = colorClasses?.[color];

  return (
    <div className={`bg-card border ${styles?.border} rounded-tribal p-4 shadow-tribal-sm hover:shadow-tribal-md smooth-transition ${
      isLocked ? 'opacity-60' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 ${styles?.bg} rounded-tribal`}>
            <Icon name={icon} size={20} className={styles?.text} />
          </div>
          <div>
            <h3 className="text-base font-heading font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-sm font-caption text-muted-foreground">
              {titleTelugu}
            </p>
          </div>
        </div>
        {isLocked && (
          <Icon name="Lock" size={16} className="text-muted-foreground" />
        )}
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm font-mono font-medium text-foreground">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-tribal h-2">
          <div 
            className={`h-2 ${styles?.progress} rounded-tribal smooth-transition`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-foreground">
              {completedLessons}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              పూర్తయిన పాఠాలు
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-foreground">
              {totalLessons}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              మొత్తం పాఠాలు
            </div>
          </div>
        </div>
      </div>
      {/* Last Activity */}
      {lastActivity && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Last activity: {lastActivity}
          </span>
        </div>
      )}
      {/* Next Lesson */}
      {nextLesson && !isLocked && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-tribal">
          <div>
            <div className="text-sm font-medium text-foreground">
              Next: {nextLesson}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              తదుపరి పాఠం
            </div>
          </div>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
        </div>
      )}
      {/* Locked Message */}
      {isLocked && (
        <div className="flex items-center justify-center p-3 bg-muted rounded-tribal">
          <div className="text-center">
            <Icon name="Lock" size={20} className="text-muted-foreground mb-1" />
            <div className="text-sm font-medium text-muted-foreground">
              Complete previous modules to unlock
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              అన్‌లాక్ చేయడానికి మునుపటి మాడ్యూల్స్ పూర్తి చేయండి
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleProgressCard;