import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  totalLessons = 0,
  completedLessons = 0,
  currentStreak = 0,
  totalStars = 0,
  achievements = [],
  className = '' 
}) => {
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const level = Math.floor(completedLessons / 5) + 1;
  const nextLevelProgress = completedLessons % 5;

  return (
    <div className={`bg-card border border-border rounded-tribal p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Learning Progress
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            నేర్చుకునే పురోగతి
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-sm font-mono text-success font-medium">
            Level {level}
          </span>
        </div>
      </div>
      {/* Main Progress Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${progressPercentage * 2.83} 283`}
              className="text-primary smooth-transition"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-heading font-bold text-primary">
              {progressPercentage}%
            </span>
            <span className="text-xs font-caption text-muted-foreground">
              Complete
            </span>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Completed Lessons */}
        <div className="bg-muted/50 rounded-tribal p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {completedLessons}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            Lessons Done
          </p>
        </div>

        {/* Current Streak */}
        <div className="bg-muted/50 rounded-tribal p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Flame" size={20} className="text-warning" />
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {currentStreak}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            Day Streak
          </p>
        </div>

        {/* Total Stars */}
        <div className="bg-muted/50 rounded-tribal p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Star" size={20} className="text-warning fill-current" />
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {totalStars}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            Stars Earned
          </p>
        </div>

        {/* Next Level */}
        <div className="bg-muted/50 rounded-tribal p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Target" size={20} className="text-success" />
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {5 - nextLevelProgress}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            To Level {level + 1}
          </p>
        </div>
      </div>
      {/* Level Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Level {level} Progress</span>
          <span className="text-sm font-mono text-foreground">
            {nextLevelProgress}/5
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full smooth-transition"
            style={{ width: `${(nextLevelProgress / 5) * 100}%` }}
          />
        </div>
      </div>
      {/* Recent Achievements */}
      {achievements?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-heading font-medium text-foreground">
            Recent Achievements
          </h4>
          <div className="space-y-2">
            {achievements?.slice(0, 3)?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-tribal-sm">
                <div className="flex-shrink-0">
                  <Icon name="Award" size={16} className="text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {achievement?.title}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {achievement?.titleTelugu}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-xs font-mono text-muted-foreground">
                    {achievement?.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-tribal text-center">
        <Icon name="Heart" size={20} className="text-primary mx-auto mb-2" />
        <p className="text-sm font-medium text-primary">
          {progressPercentage < 25 
            ? "Great start! Keep learning every day!"
            : progressPercentage < 50
            ? "You're making excellent progress!"
            : progressPercentage < 75
            ? "Amazing work! You're more than halfway there!" :"Outstanding! You're almost done!"}
        </p>
        <p className="text-xs font-caption text-primary/80 mt-1">
          {progressPercentage < 25 
            ? "మంచి మొదలు! ప్రతిరోజూ నేర్చుకోండి!"
            : progressPercentage < 50
            ? "మీరు అద్భుతమైన పురోగతి సాధిస్తున్నారు!"
            : progressPercentage < 75
            ? "అద్భుతమైన పని! మీరు సగానికి మించి ఉన్నారు!" :"అద్భుతం! మీరు దాదాపు పూర్తి చేశారు!"}
        </p>
      </div>
      {/* Cultural Pattern Overlay */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
    </div>
  );
};

export default ProgressTracker;