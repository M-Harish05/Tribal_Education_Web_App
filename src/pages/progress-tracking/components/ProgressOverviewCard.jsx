import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverviewCard = ({ 
  totalProgress = 68, 
  completedModules = 12, 
  totalModules = 18,
  currentStreak = 7,
  totalAchievements = 15
}) => {
  const progressPercentage = Math.round((completedModules / totalModules) * 100);
  const stars = Math.min(Math.floor(totalProgress / 20), 5);

  return (
    <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-md relative overflow-hidden">
      {/* Cultural Pattern Background */}
      <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Learning Progress
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              నేర్చుకునే పురోగతి
            </p>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="Star"
                size={20}
                className={`${
                  index < stars 
                    ? 'text-warning fill-current' :'text-muted-foreground'
                } smooth-transition`}
              />
            ))}
          </div>
        </div>

        {/* Main Progress Circle */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="var(--color-muted)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="var(--color-primary)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${totalProgress * 3.14} 314`}
                strokeLinecap="round"
                className="smooth-transition"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-heading font-bold text-primary">
                {totalProgress}%
              </span>
              <span className="text-xs font-caption text-muted-foreground">
                పూర్తయింది
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-tribal mx-auto mb-2">
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
            <div className="text-lg font-heading font-semibold text-foreground">
              {completedModules}/{totalModules}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              మాడ్యూల్స్
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-tribal mx-auto mb-2">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <div className="text-lg font-heading font-semibold text-foreground">
              {currentStreak}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              రోజుల స్ట్రీక్
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-tribal mx-auto mb-2">
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <div className="text-lg font-heading font-semibold text-foreground">
              {totalAchievements}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              అచీవ్‌మెంట్స్
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewCard;