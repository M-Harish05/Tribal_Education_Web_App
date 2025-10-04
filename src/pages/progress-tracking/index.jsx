import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VoiceNavigationButton from '../../components/ui/VoiceNavigationButton';
import OfflineStatusIndicator from '../../components/ui/OfflineStatusIndicator';
import NotificationAlertBanner from '../../components/ui/NotificationAlertBanner';

// Import all components
import ProgressOverviewCard from './components/ProgressOverviewCard';
import ModuleProgressCard from './components/ModuleProgressCard';
import AchievementBadgeGrid from './components/AchievementBadgeGrid';
import CertificationStatusCard from './components/CertificationStatusCard';
import CommunityLeaderboard from './components/CommunityLeaderboard';
import LearningGoalsCard from './components/LearningGoalsCard';

const ProgressTracking = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [activeView, setActiveView] = useState('overview');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'english';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Voice synthesis for progress reports
  const speakProgressReport = () => {
    if ('speechSynthesis' in window) {
      const text = currentLanguage === 'telugu' 
        ? "మీ నేर్చుకుन్నారు." :"Your learning progress: 68% completed. You have finished 12 modules and earned 15 achievements.";
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'telugu' ? 'te-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // Mock module data
  const moduleData = [
    {
      title: "Basic Literacy",
      titleTelugu: "ప్రాథమిక అक్షरాస్యత",
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      icon: "BookOpen",
      color: "primary",
      lastActivity: "2 hours ago",
      nextLesson: "Advanced Reading Comprehension",
      isLocked: false
    },
    {
      title: "Skill Development",
      titleTelugu: "नైపుణ్య అభివృద్ధి",
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
      icon: "Wrench",
      color: "secondary",
      lastActivity: "1 day ago",
      nextLesson: "Traditional Pottery Techniques",
      isLocked: false
    },
    {
      title: "Traditional Knowledge",
      titleTelugu: "సాంప్రదాయ జ్ఞాनం",
      progress: 45,
      totalLessons: 12,
      completedLessons: 5,
      icon: "Heart",
      color: "accent",
      lastActivity: "3 days ago",
      nextLesson: "Folk Songs and Stories",
      isLocked: false
    },
    {
      title: "Digital Literacy",
      titleTelugu: "డిజిటల్ అक్షरాస్యత",
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      icon: "Smartphone",
      color: "primary",
      lastActivity: null,
      nextLesson: null,
      isLocked: true
    }
  ];

  const viewTabs = [
    { id: 'overview', label: 'Overview', labelTelugu: 'అवలోకन', icon: 'BarChart3' },
    { id: 'modules', label: 'Modules', labelTelugu: 'మాड్యూల్స్', icon: 'BookOpen' },
    { id: 'achievements', label: 'Achievements', labelTelugu: 'అచీव్‌మెంట్స్', icon: 'Award' },
    { id: 'certifications', label: 'Certificates', labelTelugu: 'సर్టిఫికేట్లు', icon: 'FileText' },
    { id: 'community', label: 'Community', labelTelugu: 'కమ్యూन', icon: 'Users' },
    { id: 'goals', label: 'Goals', labelTelugu: 'లక్ష్యాలు', icon: 'Target' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      titleTelugu: 'కొత్త అచీव్‌మెంట్ అन్‌లాక్ అయింदి!',
      message: 'Congratulations! You have completed 7 consecutive days of learning.',
      messageTelugu: 'అభిनంदनలు! మీरు వरుసగా 7 రోజులు నేर్చుకుन్नారు.',
      priority: 'medium',
      actionText: 'View Achievement',
      actionTextTelugu: 'అచీव్‌మెంట్ చూడండి'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Notifications */}
        <div className="mb-6">
          <NotificationAlertBanner 
            notifications={notifications} 
            onDismiss={(id) => console.log('Dismiss notification:', id)}
          />
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              {currentLanguage === 'telugu' ? 'పుरోగతి ట్రాకింగ్' : 'Progress Tracking'}
            </h1>
            <p className="text-muted-foreground">
              {currentLanguage === 'telugu' ?'మీ నేर్చుకుन్नారు.' :'Track your learning journey and view your achievements'
              }
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <OfflineStatusIndicator />
            <Button
              variant="outline"
              onClick={speakProgressReport}
              iconName="Volume2"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              {currentLanguage === 'telugu' ? 'పుरోగతి విनండి' : 'Listen to Progress'}
            </Button>
            <Button
              variant="default"
              onClick={() => navigate('/dashboard-home')}
              iconName="Home"
              iconPosition="left"
              iconSize={16}
            >
              {currentLanguage === 'telugu' ? 'డ్యాష్‌बోర్డ్' : 'Dashboard'}
            </Button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {viewTabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeView === tab?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
                iconSize={16}
                className="whitespace-nowrap"
              >
                <span className="hidden sm:inline">
                  {currentLanguage === 'telugu' ? tab?.labelTelugu : tab?.label}
                </span>
                <span className="sm:hidden">
                  {currentLanguage === 'telugu' ? tab?.labelTelugu : tab?.label}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {/* Overview View */}
          {activeView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ProgressOverviewCard />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {moduleData?.slice(0, 4)?.map((module, index) => (
                    <ModuleProgressCard key={index} {...module} />
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <AchievementBadgeGrid />
                <LearningGoalsCard />
              </div>
            </div>
          )}

          {/* Modules View */}
          {activeView === 'modules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {moduleData?.map((module, index) => (
                <ModuleProgressCard key={index} {...module} />
              ))}
            </div>
          )}

          {/* Achievements View */}
          {activeView === 'achievements' && (
            <AchievementBadgeGrid />
          )}

          {/* Certifications View */}
          {activeView === 'certifications' && (
            <CertificationStatusCard />
          )}

          {/* Community View */}
          {activeView === 'community' && (
            <CommunityLeaderboard />
          )}

          {/* Goals View */}
          {activeView === 'goals' && (
            <LearningGoalsCard />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-card border border-border rounded-tribal p-6 shadow-tribal-md">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            {currentLanguage === 'telugu' ? 'త్వरిత చర్యలు' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/basic-literacy-learning')}
              iconName="BookOpen"
              iconPosition="left"
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === 'telugu' ? 'नేर్చుకోवడం కొनసాగించండి' : 'Continue Learning'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'telugu' ? 'మీ చిवरి పాఠాनికి తిरిగి వెళ్లండి' : 'Resume your last lesson'}
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/traditional-knowledge')}
              iconName="Heart"
              iconPosition="left"
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === 'telugu' ? 'సంస్కృతిनి అन్व్‌మెంట్ నేर్చుకుन్नారు.' : 'Explore Culture'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'telugu' ? 'సాంప్రदాయ జ్ఞాनాन్नి కनుగొनండి' : 'Discover traditional knowledge'}
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/government-schemes-hub')}
              iconName="FileText"
              iconPosition="left"
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === 'telugu' ? 'పథకాలు చూडంडి' : 'View Schemes'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'telugu' ? 'ప్రభుత్व పథకాలनు అन్व్‌మెంట్' : 'Explore government schemes'}
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => setActiveView('goals')}
              iconName="Target"
              iconPosition="left"
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === 'telugu' ? 'లక్ష్యాలు సెట్ చేయంडి' : 'Set Goals'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'telugu' ? 'కొత్త నేर్చుకుन్नారు.' : 'Add new learning goals'}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </main>
      <VoiceNavigationButton />
      {/* Cultural Pattern Background */}
      <div className="fixed inset-0 tribal-pattern opacity-5 pointer-events-none z-0" />
    </div>
  );
};

export default ProgressTracking;