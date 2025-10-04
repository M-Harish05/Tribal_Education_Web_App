import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicatorBadge from '../../../components/ui/ProgressIndicatorBadge';

const LearningModuleCard = ({ 
  title, 
  titleTelugu, 
  description, 
  descriptionTelugu, 
  icon, 
  progress = 0, 
  totalLessons = 10, 
  completedLessons = 0,
  route,
  bgGradient = "from-primary/20 to-primary/10",
  iconColor = "text-primary",
  isNew = false,
  estimatedTime = "2-3 weeks"
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`relative bg-gradient-to-br ${bgGradient} rounded-tribal border border-border p-6 hover:shadow-tribal-lg smooth-transition cursor-pointer group tribal-pattern`}
         onClick={handleCardClick}>
      
      {/* New Badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded-tribal-sm">
          NEW
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`flex-shrink-0 w-16 h-16 bg-background rounded-tribal flex items-center justify-center ${iconColor} group-hover:scale-110 smooth-transition`}>
          <Icon name={icon} size={32} />
        </div>
        
        <div className="ml-4 flex-1">
          <ProgressIndicatorBadge 
            progress={completedLessons} 
            total={totalLessons}
            size="sm"
            className="mb-2"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary smooth-transition">
            {title}
          </h3>
          <p className="text-lg font-caption text-muted-foreground">
            {titleTelugu}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <p className="text-sm text-foreground leading-relaxed">
            {description}
          </p>
          <p className="text-sm font-caption text-muted-foreground leading-relaxed">
            {descriptionTelugu}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={14} />
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{estimatedTime}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-mono font-bold text-primary">
              {Math.round((completedLessons / totalLessons) * 100)}%
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground smooth-transition"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            <span className="sm:hidden">కొనసాగించండి</span>
            <span className="hidden sm:inline">Continue Learning</span>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 smooth-transition">
        <Icon name={icon} size={48} className={iconColor} />
      </div>
    </div>
  );
};

export default LearningModuleCard;