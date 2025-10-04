import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicatorBadge from '../../../components/ui/ProgressIndicatorBadge';

const WelcomeHeader = ({ userName = "రాజు", currentStreak = 7, totalProgress = 65 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState({ english: '', telugu: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime?.getHours();
    if (hour < 12) {
      setGreeting({ english: 'Good Morning', telugu: 'శుభోదయం' });
    } else if (hour < 17) {
      setGreeting({ english: 'Good Afternoon', telugu: 'శుభ మధ్యాహ్నం' });
    } else {
      setGreeting({ english: 'Good Evening', telugu: 'శుభ సాయంత్రం' });
    }
  }, [currentTime]);

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-tribal p-6 mb-6 border border-border tribal-pattern">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Greeting Section */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary rounded-tribal flex items-center justify-center">
              <Icon name="User" size={32} className="text-primary-foreground" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <h1 className="text-2xl font-heading font-bold text-foreground">
                {greeting?.english}, {userName}!
              </h1>
              <span className="text-lg font-caption text-muted-foreground">
                {greeting?.telugu}, {userName}!
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1">
              Ready to continue your learning journey today?
            </p>
            <p className="text-sm font-caption text-muted-foreground">
              ఈరోజు మీ అభ్యాస ప్రయాణాన్ని కొనసాగించడానికి సిద్ధంగా ఉన్నారా?
            </p>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Current Streak */}
          <div className="flex items-center space-x-2 bg-background rounded-tribal px-4 py-2 border border-border">
            <Icon name="Flame" size={20} className="text-warning" />
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-foreground">
                {currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">
                Day Streak
              </div>
              <div className="text-xs font-caption text-muted-foreground">
                రోజుల వరుస
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center space-x-3">
            <ProgressIndicatorBadge 
              progress={totalProgress} 
              total={100}
              achievements={3}
              size="lg"
              className="bg-background border-border"
            />
          </div>
        </div>
      </div>
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-primary">
            12
          </div>
          <div className="text-xs text-muted-foreground">Lessons</div>
          <div className="text-xs font-caption text-muted-foreground">పాఠాలు</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-success">
            8
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
          <div className="text-xs font-caption text-muted-foreground">పూర్తయింది</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-warning">
            3
          </div>
          <div className="text-xs text-muted-foreground">Certificates</div>
          <div className="text-xs font-caption text-muted-foreground">సర్టిఫికేట్లు</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-mono font-bold text-secondary">
            45
          </div>
          <div className="text-xs text-muted-foreground">Points</div>
          <div className="text-xs font-caption text-muted-foreground">పాయింట్లు</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;