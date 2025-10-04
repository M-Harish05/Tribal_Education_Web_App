import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed Telugu Alphabets',
      titleTelugu: 'తెలుగు అక్షరాలు పూర్తయింది',
      description: 'Basic Literacy - Level 1',
      descriptionTelugu: 'ప్రాథమిక అక్షరాస్యత - స్థాయి 1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'CheckCircle',
      iconColor: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'achievement_earned',
      title: 'Earned "First Steps" Badge',
      titleTelugu: '"మొదటి అడుగులు" బ్యాడ్జ్ సంపాదించారు',
      description: 'Complete your first lesson',
      descriptionTelugu: 'మీ మొదటి పాఠాన్ని పూర్తి చేయండి',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: 'Award',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 3,
      type: 'scheme_notification',
      title: 'New Scheme Available',
      titleTelugu: 'కొత్త పథకం అందుబాటులో',
      description: 'PM-JANMAN Education Support',
      descriptionTelugu: 'PM-JANMAN విద్యా మద్దతు',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: 'FileText',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 4,
      type: 'community_interaction',
      title: 'Joined Study Group',
      titleTelugu: 'స్టడీ గ్రూప్‌లో చేరారు',
      description: 'Basic Literacy Learners',
      descriptionTelugu: 'ప్రాథమిక అక్షరాస్యత అభ్యాసకులు',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Users',
      iconColor: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 5,
      type: 'skill_progress',
      title: 'Handicraft Skills - 60% Complete',
      titleTelugu: 'హస్తకళ నైపుణ్యాలు - 60% పూర్తయింది',
      description: 'Traditional Weaving Module',
      descriptionTelugu: 'సాంప్రదాయ నేత మాడ్యూల్',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'TrendingUp',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return { english: 'Just now', telugu: 'ఇప్పుడే' };
    } else if (diffInHours < 24) {
      return { 
        english: `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`, 
        telugu: `${diffInHours} గంట${diffInHours > 1 ? 'లు' : ''} క్రితం` 
      };
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return { 
        english: `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`, 
        telugu: `${diffInDays} రోజు${diffInDays > 1 ? 'లు' : ''} క్రితం` 
      };
    }
  };

  return (
    <div className="bg-background rounded-tribal border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Recent Activity
          </h2>
          <p className="text-sm font-caption text-muted-foreground">
            ఇటీవలి కార్యకలాపాలు
          </p>
        </div>
        
        <Icon name="Activity" size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        {recentActivities?.map((activity) => {
          const timeAgo = formatTimeAgo(activity?.timestamp);
          
          return (
            <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-tribal hover:bg-muted/50 smooth-transition">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 ${activity?.bgColor} rounded-tribal flex items-center justify-center`}>
                <Icon name={activity?.icon} size={20} className={activity?.iconColor} />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-heading font-semibold text-foreground">
                      {activity?.title}
                    </h3>
                    <p className="text-sm font-caption text-muted-foreground">
                      {activity?.titleTelugu}
                    </p>
                    
                    <div className="mt-1 space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        {activity?.description}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground">
                        {activity?.descriptionTelugu}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 text-right">
                    <div className="text-xs text-muted-foreground">
                      {timeAgo?.english}
                    </div>
                    <div className="text-xs font-caption text-muted-foreground">
                      {timeAgo?.telugu}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Button */}
      <div className="mt-4 pt-4 border-t border-border text-center">
        <button className="text-sm text-primary hover:text-primary/80 font-medium smooth-transition">
          <span className="sm:hidden">అన్నీ చూడండి</span>
          <span className="hidden sm:inline">View All Activities</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;