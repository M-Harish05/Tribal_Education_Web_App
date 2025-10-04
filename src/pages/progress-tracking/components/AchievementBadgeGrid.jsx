import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadgeGrid = ({ achievements = [] }) => {
  const defaultAchievements = [
    {
      id: 1,
      title: "First Steps",
      titleTelugu: "మొదటి అడుగులు",
      description: "Completed first literacy lesson",
      descriptionTelugu: "మొదటి అక్షరాస్యత పాఠం పూర్తి చేశారు",
      icon: "BookOpen",
      color: "primary",
      earned: true,
      earnedDate: "2024-09-15",
      points: 50
    },
    {
      id: 2,
      title: "Week Warrior",
      titleTelugu: "వారం యోధుడు",
      description: "7-day learning streak",
      descriptionTelugu: "7 రోజుల నేర్చుకునే స్ట్రీక్",
      icon: "Flame",
      color: "warning",
      earned: true,
      earnedDate: "2024-09-22",
      points: 100
    },
    {
      id: 3,
      title: "Culture Keeper",
      titleTelugu: "సంస్కృతి కాపలాదారు",
      description: "Contributed traditional knowledge",
      descriptionTelugu: "సాంప్రదాయ జ్ఞానాన్ని అందించారు",
      icon: "Heart",
      color: "accent",
      earned: true,
      earnedDate: "2024-09-28",
      points: 150
    },
    {
      id: 4,
      title: "Skill Master",
      titleTelugu: "నైపుణ్య మాస్టర్",
      description: "Completed handicraft course",
      descriptionTelugu: "హస్తకళ కోర్సు పూర్తి చేశారు",
      icon: "Award",
      color: "success",
      earned: false,
      requiredProgress: 80,
      currentProgress: 65,
      points: 200
    },
    {
      id: 5,
      title: "Digital Pioneer",
      titleTelugu: "డిజిటల్ పయనీర్",
      description: "Master digital literacy skills",
      descriptionTelugu: "డిజిటల్ అక్షరాస్యత నైపుణ్యాలను నేర్చుకోండి",
      icon: "Smartphone",
      color: "secondary",
      earned: false,
      requiredProgress: 100,
      currentProgress: 30,
      points: 300
    },
    {
      id: 6,
      title: "Community Helper",
      titleTelugu: "కమ్యూనిటీ సహాయకుడు",
      description: "Help 5 community members learn",
      descriptionTelugu: "5 కమ్యూనిటీ సభ్యులకు నేర్చుకోవడంలో సహాయం చేయండి",
      icon: "Users",
      color: "primary",
      earned: false,
      requiredProgress: 5,
      currentProgress: 2,
      points: 250
    }
  ];

  const activeAchievements = achievements?.length > 0 ? achievements : defaultAchievements;

  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
      earned: 'bg-primary text-primary-foreground'
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20',
      earned: 'bg-secondary text-secondary-foreground'
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
      earned: 'bg-accent text-accent-foreground'
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      earned: 'bg-success text-success-foreground'
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20',
      earned: 'bg-warning text-warning-foreground'
    }
  };

  return (
    <div className="bg-card border border-border rounded-tribal p-6 shadow-tribal-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Achievements
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            అచీవ్‌మెంట్స్
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-warning" />
          <span className="text-sm font-mono font-medium text-foreground">
            {activeAchievements?.filter(a => a?.earned)?.length}/{activeAchievements?.length}
          </span>
        </div>
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeAchievements?.map((achievement) => {
          const styles = colorClasses?.[achievement?.color];
          
          return (
            <div
              key={achievement?.id}
              className={`relative border rounded-tribal p-4 smooth-transition hover:shadow-tribal-sm ${
                achievement?.earned
                  ? `${styles?.earned} shadow-tribal-sm`
                  : `bg-card ${styles?.border} hover:${styles?.bg}`
              }`}
            >
              {/* Badge Icon */}
              <div className="flex items-center justify-center mb-3">
                <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                  achievement?.earned 
                    ? 'bg-background/20' 
                    : styles?.bg
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={24} 
                    className={achievement?.earned ? 'text-current' : styles?.text}
                  />
                  {achievement?.earned && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-success-foreground" />
                    </div>
                  )}
                </div>
              </div>
              {/* Content */}
              <div className="text-center">
                <h3 className={`text-sm font-heading font-semibold mb-1 ${
                  achievement?.earned ? 'text-current' : 'text-foreground'
                }`}>
                  {achievement?.title}
                </h3>
                <p className={`text-xs font-caption mb-2 ${
                  achievement?.earned ? 'text-current opacity-90' : 'text-muted-foreground'
                }`}>
                  {achievement?.titleTelugu}
                </p>
                <p className={`text-xs leading-relaxed mb-3 ${
                  achievement?.earned ? 'text-current opacity-80' : 'text-muted-foreground'
                }`}>
                  {achievement?.description}
                </p>

                {/* Progress for unearned achievements */}
                {!achievement?.earned && achievement?.requiredProgress && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {achievement?.currentProgress}/{achievement?.requiredProgress}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-tribal h-1.5">
                      <div 
                        className={`h-1.5 ${styles?.text?.replace('text-', 'bg-')} rounded-tribal smooth-transition`}
                        style={{ 
                          width: `${Math.min((achievement?.currentProgress / achievement?.requiredProgress) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Points */}
                <div className="flex items-center justify-center space-x-1">
                  <Icon name="Star" size={12} className={achievement?.earned ? 'text-current' : 'text-warning'} />
                  <span className={`text-xs font-mono font-medium ${
                    achievement?.earned ? 'text-current' : 'text-foreground'
                  }`}>
                    {achievement?.points} pts
                  </span>
                </div>

                {/* Earned Date */}
                {achievement?.earned && achievement?.earnedDate && (
                  <div className="mt-2 text-xs opacity-75">
                    Earned: {new Date(achievement.earnedDate)?.toLocaleDateString()}
                  </div>
                )}
              </div>
              {/* Cultural Pattern Overlay */}
              <div className="absolute inset-0 tribal-pattern opacity-5 pointer-events-none rounded-tribal" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadgeGrid;